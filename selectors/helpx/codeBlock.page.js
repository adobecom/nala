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
    this.codeJSNum = page.locator('.language-javascript.line-numbers').first();
    this.codePhpNum = page.locator('.language-php.line-numbers').first();
    this.codePlainNum = page.locator('.language-plain.line-numbers').first();
    this.codeSqlNum = page.locator('.language-sql.line-numbers').first();
    this.codeXmlNum = page.locator('.language-xml.line-numbers').first();
    this.codeMxmlNum = page.locator('.language-mxml.line-numbers').first();
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


//Code Block Component without specifying the language
    this.d2CodeWithoutLanguage = page.locator("//div[contains(@daa-lh,'b2|code')][contains(@class,'code')]");
    this.d2CodeWithoutLanguagePre = page.locator("//div[contains(@daa-lh,'b2|code')][contains(@class,'code')]/descendant::pre");
    this.d2CodeWithoutLanguagePreCodeLine1 = page.locator("//div[contains(@daa-lh,'b2|code')][contains(@class,'code')]/descendant::pre/code/child::div[contains(@class,'line')][contains(text(),'function fib(n) {')]");

//Code language AS3- Title with all Small Letters
this.d4CodeLangiageAS3 = page.locator("//div[contains(@daa-lh,'b4|code')][contains(@class,'code language-as3')]");
this.d4classCodeToolbar = page.locator("//div[contains(@daa-lh,'b4|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]");
this.d4CodeClikeinAS3 = page.locator("//div[contains(@daa-lh,'b4|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d4CopyCodeButton = page.locator("(//button[contains(.,'Copy')][contains(@class,'copy-to-clipboard-button')])[1]")

//Code language AS3 -Title with all Capital Letters [CODE (LANGUAGE-AS3)
this.d6CodeLangiageAS3 = page.locator("//div[contains(@daa-lh,'b6|code')][contains(@class,'code language-as3')]");
this.d6classCodeToolbar = page.locator("//div[contains(@daa-lh,'b6|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]");
this.d6CodeClikeinAS3 = page.locator("//div[contains(@daa-lh,'b6|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d6CodeLineAS3Small = page.locator("//div[contains(@daa-lh,'b6|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d6CopyCodeButton = page.locator("(//button[contains(.,'Copy')][contains(@class,'copy-to-clipboard-button')])[1]")

//Code language AS3 – with Line number
this.d8CodeAS3WithLineNumbers  = page.locator("//div[contains(@class,'code language-as3 line-numbers')][contains(@daa-lh,'b8|code')]");
this.d8classCodeToolbar = page.locator("//div[contains(@daa-lh,'b8|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]");
this.d8CodeClikeinAS3 = page.locator("//div[contains(@daa-lh,'b8|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d8CodeLineAS3LineNumber = page.locator("//div[contains(@daa-lh,'b8|code')][contains(@class,'code language-as3')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d8CopyCodeButton = page.locator("(//button[contains(.,'Copy')][contains(@class,'copy-to-clipboard-button')])[1]")

//Code language ColdFusion
this.d10ColdFusion  = page.locator("//div[contains(@daa-lh,'b10|code')][contains(@class,'code language-coldfusion')]");
this.d10classCodeToolbar = page.locator("//div[contains(@daa-lh,'b10|code')][contains(@class,'code language-coldfusion')]/descendant::div[contains(@class,'code-toolbar')]");
this.d10CodeClikeinAS3 = page.locator("//div[contains(@daa-lh,'b10|code')][contains(@class,'code language-coldfusion')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d10CodeLineAS3LineNumber = page.locator("//div[contains(@daa-lh,'b10|code')][contains(@class,'code language-coldfusion')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d10CopyCodeButton = page.locator("//div[contains(@daa-lh,'b10|code')][contains(@class,'code language-coldfusion')]/descendant::button[contains(@class,'copy-to-clipboard-button')]")

//Code language C++
this.d12CPlusPlus  = page.locator("//div[contains(@daa-lh,'b12|code')][contains(@class,'code language-c')]");
this.d12classCodeToolbar = page.locator("//div[contains(@daa-lh,'b12|code')][contains(@class,'code language-c')]/descendant::div[contains(@class,'code-toolbar')]");
this.d12CodeClikeinCplus = page.locator("//div[contains(@daa-lh,'b12|code')][contains(@class,'code language-c')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-c')]");
this.d12CodeLineCplusLineNumber = page.locator("//div[contains(@daa-lh,'b12|code')][contains(@class,'code language-c')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-c')]/child::div[contains(@class,'line')]");
this.d12CopyCodeButton = page.locator("//div[contains(@daa-lh,'b12|code')][contains(@class,'code language-c')]/descendant::button[contains(@class,'copy-to-clipboard-button')]")


//CSS
this.d14Css = page.locator("//div[contains(@daa-lh,'b14|code')][contains(@class,'code language-css')]");
this.d14ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b14|code')][contains(@class,'code language-css')]/descendant::div[contains(@class,'code-toolbar')]");
this.d14CodeClikeinCss = page.locator("//div[contains(@daa-lh,'b14|code')][contains(@class,'code language-css')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-css')]");
this.d14CodeLineCssLineNumber = page.locator("//div[contains(@daa-lh,'b14|code')][contains(@class,'code language-css')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-css')]/child::div[contains(@class,'line')]");
this.d14CopyCodeButton = page.locator("//div[contains(@daa-lh,'b14|code')][contains(@class,'code language-css')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//Java
this.d16Java = page.locator("//div[contains(@daa-lh,'b16|code')][contains(@class,'code language-java line-numbers')]");
this.d16ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b16|code')][contains(@class,'code language-java line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d16CodeClikeinJava = page.locator("//div[contains(@daa-lh,'b16|code')][contains(@class,'code language-java line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d16CodeLineJavaLineNumber = page.locator("//div[contains(@daa-lh,'b16|code')][contains(@class,'code language-java line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d16CopyCodeButton = page.locator("//div[contains(@daa-lh,'b16|code')][contains(@class,'code language-java line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//javascript
this.d18Javascript = page.locator("//div[contains(@daa-lh,'b18|code')][contains(@class,'code language-javascript')]");
this.d18ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b18|code')][contains(@class,'code language-javascript')]/descendant::div[contains(@class,'code-toolbar')]");
this.d18CodeClikeinJavascript = page.locator("//div[contains(@daa-lh,'b18|code')][contains(@class,'code language-javascript')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d18CodeLineJavascriptLineNumber = page.locator("//div[contains(@daa-lh,'b18|code')][contains(@class,'code language-javascript')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d18CopyCodeButton = page.locator("//div[contains(@daa-lh,'b18|code')][contains(@class,'code language-javascript')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//PHP
this.d20PHP = page.locator("//div[contains(@daa-lh,'b20|code')][contains(@class,'code language-php')]");
this.d20ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b20|code')][contains(@class,'code language-php')]/descendant::div[contains(@class,'code-toolbar')]");
this.d20CodePhp = page.locator("//div[contains(@daa-lh,'b20|code')][contains(@class,'code language-php')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-php')]");
this.d20CodeLinePhpLineNumber = page.locator("//div[contains(@daa-lh,'b20|code')][contains(@class,'code language-php')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-php')]/child::div[contains(@class,'line')]");
this.d20CopyCodeButton = page.locator("//div[contains(@daa-lh,'b20|code')][contains(@class,'code language-php')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//SQL
this.d22SQL = page.locator("//div[contains(@daa-lh,'b22|code')][contains(@class,'code language-sql')]");
this.d22ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b22|code')][contains(@class,'code language-sql')]/descendant::div[contains(@class,'code-toolbar')]");
this.d22CodeSql = page.locator("//div[contains(@daa-lh,'b22|code')][contains(@class,'code language-sql')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-sql')]");
this.d22CodeLineSqlLineNumber = page.locator("//div[contains(@daa-lh,'b22|code')][contains(@class,'code language-sql')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-sql')]/child::div[contains(@class,'line')]");
this.d22CopyCodeButton = page.locator("//div[contains(@daa-lh,'b22|code')][contains(@class,'code language-sql')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//MXML
this.d24MXML = page.locator("//div[contains(@daa-lh,'b24|code')][contains(@class,'code language-mxml')]");
this.d24ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b24|code')][contains(@class,'code language-mxml')]/descendant::div[contains(@class,'code-toolbar')]");
this.d24CodeXml = page.locator("//div[contains(@daa-lh,'b24|code')][contains(@class,'code language-mxml')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-xml')]");
this.d24CodeLineXmlLineNumber = page.locator("//div[contains(@daa-lh,'b24|code')][contains(@class,'code language-mxml')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-xml')]/child::div[contains(@class,'line')]");
this.d24CopyCodeButton = page.locator("//div[contains(@daa-lh,'b24|code')][contains(@class,'code language-mxml')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//XML
this.d26XML = page.locator("//div[contains(@daa-lh,'b26|code')][contains(@class,'code language-xml')]");
this.d26ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b26|code')][contains(@class,'code language-xml')]/descendant::div[contains(@class,'code-toolbar')]");
this.d26CodeXml = page.locator("//div[contains(@daa-lh,'b26|code')][contains(@class,'code language-xml')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-xml')]");
this.d26CodeLineXmlLineNumber = page.locator("//div[contains(@daa-lh,'b26|code')][contains(@class,'code language-xml')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-xml')]/child::div[contains(@class,'line')]");
this.d26CopyCodeButton = page.locator("//div[contains(@daa-lh,'b26|code')][contains(@class,'code language-xml')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//Shell
this.d28XML = page.locator("//div[contains(@daa-lh,'b28|code')][contains(@class,'code language-shell')]");
this.d28ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b28|code')][contains(@class,'code language-shell')]/descendant::div[contains(@class,'code-toolbar')]");
this.d28CodeShell = page.locator("//div[contains(@daa-lh,'b28|code')][contains(@class,'code language-shell')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-shell')]");
this.d28CodeLineShellLineNumber = page.locator("//div[contains(@daa-lh,'b28|code')][contains(@class,'code language-shell')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-shell')]/child::div[contains(@class,'line')]");
this.d28CopyCodeButton = page.locator("//div[contains(@daa-lh,'b28|code')][contains(@class,'code language-shell')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//Plain
this.d30Plain = page.locator("//div[contains(@daa-lh,'b30|code')][contains(@class,'code language-plain')]");
this.d30ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b30|code')][contains(@class,'code language-plain')]/descendant::div[contains(@class,'code-toolbar')]");
this.d30CodePlain = page.locator("//div[contains(@daa-lh,'b30|code')][contains(@class,'code language-plain')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-plain')]");
this.d30CodeLinePlainLineNumber = page.locator("//div[contains(@daa-lh,'b30|code')][contains(@class,'code language-plain')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-plain')]/child::div[contains(@class,'line')]");
this.d30CopyCodeButton = page.locator("//div[contains(@daa-lh,'b30|code')][contains(@class,'code language-plain')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

//AS3 with Line Number
this.d32AS3WithLineNumber= page.locator("//div[contains(@daa-lh,'b32|code')][contains(@class,'code language-as3 line-numbers')]");
this.d32ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b32|code')][contains(@class,'code language-as3 line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d32CodeAS3 = page.locator("//div[contains(@daa-lh,'b32|code')][contains(@class,'code language-as3 line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d32CodeAS3LineNumberIspresent = page.locator("//div[contains(@daa-lh,'b32|code')][contains(@class,'code language-as3 line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre");
this.d32CodeLineAS3LineNumber = page.locator("//div[contains(@daa-lh,'b32|code')][contains(@class,'code language-as3 line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d32CopyCodeButton = page.locator("//div[contains(@daa-lh,'b32|code')][contains(@class,'code language-as3 line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");

// Cold Fusion
this.d34ColdFusion = page.locator("//div[contains(@daa-lh,'b34|code')][contains(@class,'code language-coldfusion line-numbers')]");
this.d34ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b34|code')][contains(@class,'code language-coldfusion line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d34CodeColdFusion = page.locator("//div[contains(@daa-lh,'b34|code')][contains(@class,'code language-coldfusion line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d34CodeLineColdFusionLineNumber = page.locator("//div[contains(@daa-lh,'b34|code')][contains(@class,'code language-coldfusion line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d34CopyCodeButton = page.locator("//div[contains(@daa-lh,'b34|code')][contains(@class,'code language-coldfusion line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");
this.d34CodeFusionLineNumberIspresent = page.locator("//div[contains(@daa-lh,'b34|code')][contains(@class,'code language-coldfusion line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre");

//CSS
this.d38CSS = page.locator("//div[contains(@daa-lh,'b38|code')][contains(@class,'code language-css line-numbers')]");
this.d38ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b38|code')][contains(@class,'code language-css line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d38CodeCSS = page.locator("//div[contains(@daa-lh,'b38|code')][contains(@class,'code language-css line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-css')]");
this.d38CodeLineCSSLineNumber = page.locator("//div[contains(@daa-lh,'b38|code')][contains(@class,'code language-css line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-css')]/child::div[contains(@class,'line')]");
this.d38CopyCodeButton = page.locator("//div[contains(@daa-lh,'b38|code')][contains(@class,'code language-css line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");
this.d38CodeCSSLineNumberIspresent = page.locator("//div[contains(@daa-lh,'b38|code')][contains(@class,'code language-css line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre");

this.d40JavaCode = page.locator("//div[contains(@daa-lh,'b40|code')][contains(@class,'code language-java line-numbers')]");
this.d40ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b40|code')][contains(@class,'code language-java line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d40CodeJava = page.locator("//div[contains(@daa-lh,'b40|code')][contains(@class,'code language-java line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d40CodeLineJavaLineNumber = page.locator("//div[contains(@daa-lh,'b40|code')][contains(@class,'code language-java line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d40CopyCodeButton = page.locator("//div[contains(@daa-lh,'b40|code')][contains(@class,'code language-java line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");
this.d40CodeJavaLineNumberIsPresent = page.locator("//div[contains(@daa-lh,'b40|code')][contains(@class,'code language-java line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre");

this.d42JavaScriptCode = page.locator("//div[contains(@daa-lh,'b42|code')][contains(@class,'code language-javascript line-numbers')]");
this.d42ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b42|code')][contains(@class,'code language-javascript line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d42CodeJavaScript = page.locator("//div[contains(@daa-lh,'b42|code')][contains(@class,'code language-javascript line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]");
this.d42CodeLineJavaScriptLineNumber = page.locator("//div[contains(@daa-lh,'b42|code')][contains(@class,'code language-javascript line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-clike')]/child::div[contains(@class,'line')]");
this.d42CopyCodeButton = page.locator("//div[contains(@daa-lh,'b42|code')][contains(@class,'code language-javascript line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");
this.d42CodeJavaScriptLineNumberIsPresent = page.locator("//div[contains(@daa-lh,'b42|code')][contains(@class,'code language-javascript line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre");

this.d44PhpCode = page.locator("//div[contains(@daa-lh,'b44|code')][contains(@class,'code language-php line-numbers')]");
this.d44ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b44|code')][contains(@class,'code language-php line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d44CodePhp = page.locator("//div[contains(@daa-lh,'b44|code')][contains(@class,'code language-php line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-php')]");
this.d44CodeLinePhpLineNumber = page.locator("//div[contains(@daa-lh,'b44|code')][contains(@class,'code language-php line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-php')]/child::div[contains(@class,'line')]");
this.d44CopyCodeButton = page.locator("//div[contains(@daa-lh,'b44|code')][contains(@class,'code language-php line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");
this.d44CodePhpLineNumberIsPresent = page.locator("//div[contains(@daa-lh,'b44|code')][contains(@class,'code language-php line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre");

this.d46SqlCode = page.locator("//div[contains(@daa-lh,'b46|code')][contains(@class,'code language-sql line-numbers')]");
this.d46ClassCodeToolbar = page.locator("//div[contains(@daa-lh,'b46|code')][contains(@class,'code language-sql line-numbers')]/descendant::div[contains(@class,'code-toolbar')]");
this.d46CodeSql = page.locator("//div[contains(@daa-lh,'b46|code')][contains(@class,'code language-sql line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-sql')]");
this.d46CodeLineSqlLineNumber = page.locator("//div[contains(@daa-lh,'b46|code')][contains(@class,'code language-sql line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre/child::code[contains(@class,'language-sql')]/child::div[contains(@class,'line')]");
this.d46CopyCodeButton = page.locator("//div[contains(@daa-lh,'b46|code')][contains(@class,'code language-sql line-numbers')]/descendant::button[contains(@class,'copy-to-clipboard-button')]");
this.d46CodeSqlLineNumberIsPresent = page.locator("//div[contains(@daa-lh,'b46|code')][contains(@class,'code language-sql line-numbers')]/descendant::div[contains(@class,'code-toolbar')]/child::pre");

  }
};
