/*
 * Use text mapping to translate text
 * @param  {Object}   obj String or Array or Array of Array of String
 */
const localizeProp = (page, obj) => {
  if (Array.isArray(obj)) {
    return obj.map(x => localizeProp(page, x));
  }
  if (browser.config.localeProp && page in browser.config.localeProp) {
    return browser.config.localeProp[page][obj];
  } else {
    return browser.config.localePropDefault[page][obj];
  }
};

export default localizeProp;
