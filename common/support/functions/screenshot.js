import { hideElements, showElements } from './visibility';
import { uploadFile } from '../../../tools/s3_upload_file';
/**
 * Verify viewport screenshot after hiding certain elements.
 * @param {string} name of screenshot
 * @param {array} elementsToHide elements to hide and show
 * @param {array} bucket s3 bucket
 * @param {array} path in the s3 bucket
 */
export function verifyViewportScreenshot(
  name,
  elementsToHide,
  bucket,
  mismatchThreshold = 0
) {
  const success = browser.call(() =>
    new Promise((resolve, reject) => {
      hideElements(elementsToHide); // hides elements in the page.
      browser
        .checkScreen(`${browser.config.currentScenarioName}-${name}-${browser.config.currentLocale.locale || 'us'}`)
        .catch(reject)
        .then(resolve);
    })
      .then(checkResult => {
        showElements(elementsToHide); // shows elements in the page.

        const { actual, baseline, diff } = checkResult.folders;

        const localFiles = s3error =>
          Promise.all([
            Promise.resolve({ Location: actual }),
            Promise.resolve({ Location: baseline }),
            Promise.resolve({ Location: diff }),
            Promise.resolve(checkResult.misMatchPercentage),
            Promise.resolve(s3error) // s3 has failed
          ]);

        if (checkResult.misMatchPercentage > mismatchThreshold) {
          //Uploads to s3 storage.
          const credentilals = {
            s3secretkey: process.env.s3secretkey,
            s3accesskey: process.env.s3accesskey
          };
          if (credentilals.s3secretkey && credentilals.s3accesskey) {
            return Promise.all([
              uploadFile(
                actual,
                bucket,
                `actual-${checkResult.fileName}`,
                credentilals
              ),
              uploadFile(
                baseline,
                bucket,
                `baseline-${checkResult.fileName}`,
                credentilals
              ),
              uploadFile(
                diff,
                bucket,
                `diff-${checkResult.fileName}`,
                credentilals
              ),
              Promise.resolve(checkResult.misMatchPercentage)
            ]).catch(() => {
              return localFiles(true);
            });
          } else {
            return localFiles(true);
          }
        } else {
          return localFiles(false);
        }
      })
      .then(res => {
        const [
          actualUrl,
          baselineUrl,
          diffUrl,
          misMatchPercentage,
          s3error
        ] = res;
        if (s3error) {
          console.log('Screenshots could not be uploaded to s3');
        }
        if (misMatchPercentage > mismatchThreshold) {
          console.error(
            `Actual and baseline screenshots don\'t match: `,
            misMatchPercentage,
            '\n\n'
          );
        }
        console.error(
          'actual:',
          actualUrl.Location,
          '\n\n',
          'baseline:',
          baselineUrl.Location,
          '\n\n'
        );

        if (diffUrl.Location) {
          console.log('diff:', diffUrl.Location);
        }
        console.log(misMatchPercentage);//rm
        if(misMatchPercentage > mismatchThreshold){
          return false
        }
        return true
       
      })
  );
  expect(success).toEqual(true);
}
