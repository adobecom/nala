/**
 * @description Pages that need signin after processing
 */
const signInNeededPages = [
    'sign-pdf',
    'request-signature',
    'pdf-to-jpg',
    'pdf-editor',
    'split-pdf',
    'add-pages-to-pdf'
];

/**
 * @description window.dc_hosted.verbToLimitsMap does not have same keys for
 * all the html file names therefore this mapping is needed
 */
const htmlFileName2VerbToLimitsMap = {
    'convert-pdf': 'createpdf',
    'rearrange-pdf': 'reorder-pages',
    'rotate-pdf': 'rotate-pages',
    'delete-pdf-pages': 'delete-pages',
    'password-protect-pdf': 'protect-pdf',
    'merge-pdf': 'combine-pdf'
};

/**
 * @return {boolean}
 * @description Return true if page needs sign in after processing is complete
 * @param {string} htmlFileName Name of the html file from browser
 */
const signInRequired = (htmlFileName) => {
    return signInNeededPages.includes(htmlFileName);
};

/**
 * @return {boolean}
 * @description Return true if limit of conversion is reached for anonymous user
 * @param {string} htmlFileName Name of the html file from browser
 */
const upsellReached = (htmlFileName) => {
    if (htmlFileName2VerbToLimitsMap.hasOwnProperty(htmlFileName)) {
        htmlFileName = htmlFileName2VerbToLimitsMap[htmlFileName];
    }
    const limitKey = browser.execute((fileName) => {
        return window.dc_hosted.verbToLimitsMap[fileName].limit;
    }, htmlFileName);
    const limitValue = browser.execute((key) => {
        return adobe_dc_sdk.info().limits.limits[key];
    }, limitKey);
    return limitValue <= 1;
};

/**
 * @return {boolean}
 * @description Checks weather sign in is required or limit of conversions is reached for anonymous user
 * @param {object} uploadPage Name of the html file from browser
 */
export const signInRequiredOrUpsellReached = (uploadPage) => {
    return signInRequired(uploadPage.htmlFileName) || upsellReached(uploadPage.htmlFileName)
};