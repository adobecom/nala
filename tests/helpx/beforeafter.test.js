import { expect, test } from '@playwright/test';
import parse from '../../libs/parse.js';
import beforeafter from '../../features/helpx/beforeafter.spec.js';
import selectors from '../../selectors/helpx/beforeafter.selectors.js';

const { name, features } = parse(beforeafter);


test.beforeAll(async({browser})=>{
     const context = await browser.newContext();
     //await context.authenticate({hlx_auth_token:''});
    const page = await context.newPage();
    await page.setExtraHTTPHeaders({
        Authorization:'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijdzb2k4N3pkb3NJRnc4b19fbVR5a082QlVRNEZBVGhjaHlyNGZqY1dSbWcifQ.eyJlbWFpbCI6ImhlbGl4QGFkb2JlLmNvbSIsIm5hbWUiOiJIZWxpeCBBZG1pbiIsImlhdCI6MTY4OTkyNjExMiwiaXNzIjoiaHR0cHM6Ly9hZG1pbi5obHgucGFnZS8iLCJhdWQiOiI4M2EzNjM1NS1hZDE3LTRlZDAtODcwMS1lOTlhMzAyMGY4NmEiLCJzdWIiOiJhZG9iZWNvbS9oZWxweC1pbnRlcm5hbCIsImV4cCI6MTcyMTQ2MjExMiwianRpIjoiSDlxMW9aSGlveUZHREp6K0hEVkIrUlRDSnhTdXBzdkZxM3NwTDNZcFFVMXQifQ.X9vg21fTwViIiEmwvIpuGL3WIVfh1GlOoV3g7-5PBU_0vnX0XFJpV1EoQv4eO4BGp0fcVkr53BD2c0LVUO6SwnbmlBFL1QHwgvh9XrZpeUYDM2J6KSCXZgpWDTWxNCUHglBmmBfkK7bDPW_cqPgkLciakipT0Kq44qMhJbXETRZg4NS4vzMKI-gCLm3x0DoRNg8ijjnPhn9M5g8Yh1S8qk6F1F8OQzxOKMXoCMjfTgdfIKI179KMBNwGMAqbxd5EO2JyAcJs4FhxGoIPJyE1Fo3IFhNqb2c20DcctKGj0nI24zzrRaUmGlcddFfXiZ3ZBRpdSt7iWXY-UZNUSLZIzA'
    });
    const url = "https://helpx-internal.stage.adobe.com/automation/blocks/before-after-component.html";

})


test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(`${props.title} (Verify vertical movement )`, async ({}) => {
      const page = await webContext.newPage();
      await page.goto(props.url);
      const beforeafterVertical = await page.locator(selectors['@beforeafter-vertical']);
      await expect(beforeafterVertical).toBeVisible();
      //beforeafterVertical.click();
      
      beforeafterVertical.scrollTop -= 40;
      const beforeafterVerticalmoved = await page.locator(selectors['@beforeafter-vertical-moved']);
      await expect(beforeafterVerticalmoved).toBeVisible();
    });

  });
});




test(`${props.title} (Verify presence of procedure steps)`, async ({}) => {
  const page = await context.newPage();
  await page.goto(props.url);
  const procedureStep = await page.locator(selectors['@procedure-step']).first();
  await expect(procedureStep).toBeVisible();
});

test(`${props.title} (Verify presence of image)`, async ({}) => {
  const page = await context.newPage();
  await page.goto(props.url);
  const procedureImage = await page.locator(selectors['@procedure-image']).first();
  await expect(procedureImage).toBeVisible();
});

test(`${props.title} (Verify presence of bold text)`, async ({}) => {
  const page = await context.newPage();
  await page.goto(props.url);
  const procedureTxtBold = await page.locator(selectors['@procedure-text-bold']).first();
  await expect(procedureTxtBold).toBeVisible();
});
