/*
 * Mock geo location for onetrust
 * @param  {String}   geo String
 */
const geomock = geo => {
  try {
    let url = `https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location?proxy=set&country=${geo}`;
    browser.url(url);
    if (browser.capabilities.browserName === 'internet explorer') {
      let moreInfo = $('#moreInfoContainer a');
      let overrideLink = $('#overridelink');
      moreInfo.waitForEnabled();
      moreInfo.click();
      overrideLink.waitForEnabled();
      overrideLink.click();
    } else if (browser.capabilities.browserName === 'MicrosoftEdge') { 
      let moreInfo = $('#moreInformationDropdownLink');
      let overrideLink = $('#overridelink');
      moreInfo.waitForEnabled();
      moreInfo.click();
      overrideLink.waitForEnabled();
      overrideLink.click();     
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default geomock;
