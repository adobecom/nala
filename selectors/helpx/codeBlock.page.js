export default class CodeBlock {
  constructor(page) {
    this.page = page;

    // CodeBlock Selectors:
    this.codeA3 = page.locator("//div[@class='code language-as3']");
    this.codeFusion = page.locator('div.language-coldfusion');
    this.codeC = page.locator('div.language-c');
    this.codeCss = page.locator('div.language-css');
    this.codeJava = page.locator('div.language-java');
    this.codeJS = page.locator('div.language-javascript');
    this.codePhp = page.locator('div.language-php');
    this.codePlain = page.locator('div.language-plain');
    this.codeSql = page.locator('div.language-sql');
    this.codeXml = page.locator('div.language-xml');
    this.codeMxml = page.locator('div.language-mxml');
    //language Selectors
    this.codeA3Num = page.locator('.language-as3.line-numbers');
    this.codeFusionNum = page.locator('.language-coldfusion.line-numbers');
    this.codeCNum = page.locator('.language-c.line-numbers');
    this.codeCssNum = page.locator('.language-css.line-numbers');
    this.codeJavaNum = page.locator('.language-java.line-numbers');
    this.codeJSNum = page.locator('.language-javascript.line-numbers');
    this.codePhpNum = page.locator('.language-php.line-numbers');
    this.codePlainNum = page.locator('.language-plain.line-numbers');
    this.codeSqlNum = page.locator('.language-sql.line-numbers');
    this.codeXmlNum = page.locator('.language-xml.line-numbers');
    this.codeMxmlNum = page.locator('.language-mxml.line-numbers');
    //Hidden Value Selectors
    this.codeHideDsktop = page.locator('.hidden-desktop');
    this.codeHideTablet = page.locator('.hidden-tablet');
    this.codeHideMobile = page.locator('.hidden-mobile');

    // quote blocks css
    this.cssProperties = {
      'codeHideDsktop': {
        'display': 'none',
      },
      'codeHideTablet': {
        'display': 'block',
      },
      'codeHideMobile': {
        'display': 'block',
      },
    };

    // quote blocks attributes
    this.attProperties = {
      'codeHideDsktop': { 'class': 'code language-javascript line-numbers hidden-desktop' },
      'codeHideTablet': { 'class': 'code language-php line-numbers hidden-tablet' },
      'codeHideMobile': { 'class': 'code language-sql line-numbers hidden-mobile' },
    };
  }
};
