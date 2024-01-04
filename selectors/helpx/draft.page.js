export default class Draft {
  constructor(page) {
    this.page = page;

    // Draft Selectors:
    this.beforeAftr = page.locator('.before-after-slider');
    this.procedure = page.locator('.procedure');
    this.codeBlock = page.locator('.code');
    this.generic = page.locator('.generic');

    // draft blocks css
    this.cssProperties = {
      'beforeAftr': {
        'display': 'none',
      },
      'procedure': {
        'display': 'none',
      },
      'codeBlock': {
        'display': 'none',
      },
      'generic': {
        'display': 'none',
      },
    };

    // draft blocks attributes
    this.attProperties = {
      'beforeAftr': { 'class': 'before-after-slider vertical draft' },
      'procedure': { 'class': 'procedure draft' },
      'codeBlock': { 'class': 'code language-as3 line-numbers draft' },
      'generic': { 'class': 'generic draft class1 class2' },
    };  

    //draftPage for before after
    this.codeAs3LineNumbersDraft = page.locator("//div[@class='code language-as3 line-numbers draft']");
    this.beforeAfterSlider = page.locator("//div[@class='before-after-slider draft']").first();
    this.horizontalBeforeAfterSlider = page.locator("//div[@class='before-after-slider horizontal draft']");
    this.beforeAfterSliderDraft = page.locator("//div[@class='before-after-slider draft'][2]");
    this.beforeAfterSliderDraftHorizontal = page.locator("//div[@class='before-after-slider draft horizontal']");
    this.as3CodeSnippet = page.locator("//div[@class='code language-as3 line-numbers draft']");

    //draft page for codeblock
    this.codeColdFusionDraft = page.locator("//div[@class='code language-coldfusion draft']");
    this.codeCPlusPlusDraft = page.locator("//div[@class='code language-c draft']");
    this.codeCSSLineNumbersDraft = page.locator("//div[@class='code language-css draft line-number']");
    this.codeJavaLineNumbersDraft = page.locator("//div[@class='code draft language-java line-numbers']");
    this.codeJavaScriptDraft = page.locator("//div[@class='code language-javascript draft']");
    this.codePHPDraft = page.locator("//div[@class='code draft language-php']");
    this.codeSQLDraft = page.locator("//div[@class='code language-sql darft']");
    this.codeXMLDraft = page.locator("//div[@class='code language-xml draft']");
    this.codeShellDraft = page.locator("//div[@class='code draft language-shell']");
    this.codePlainDraft = page.locator("//div[@class='code language-plain draft']");

    //Draft Page for Generic
    this.genericComponentsDraft = page.locator("//h1[@id='generic-components-draft']");
    this.genericImageDraft1 = page.locator("//div[@class='generic draft'][1]");
    this.genericImageDraft2 = page.locator("//div[@class='generic draft'][2]");
    this.genericTextDraft = page.locator("//div[@class='generic draft'][3]");

  }
};
