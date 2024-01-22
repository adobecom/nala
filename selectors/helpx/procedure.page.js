export default class Procedure {
  constructor(page) {
    this.page = page;

    // Procedure Selectors:
    this.procedure = page.locator('.procedure');
    this.procedureStep = page.locator("//li[contains(@class,'step')]");
    this.procedureImage = page.locator("//li[@class='step']//descendant::picture/img");
    this.procedureTxtBold = page.locator('li[class=step] strong');

    //Procedure and Step Component
    //Title
    this.procedureTitle = page.locator("//h1[@id='procedure-and-step-component']");
    //First procedure Component
    this.procedureforb2 = page.locator("//div[contains(@daa-lh,'b2|procedure|nopzn|nopzn')]");
    this.procedureforb2Ol = page.locator("//div[@daa-lh='b2|procedure|nopzn|nopzn']/child::ol");
    this.procedureforb2liFirst = page.locator("//div[@daa-lh='b2|procedure|nopzn|nopzn']/child::ol/li[contains(@class,'step')][1]");
    

    //procedure is not case sensitive
    const xpathWithDaaLh = "//div[contains(@daa-lh, 'b4|procedure|nopzn|nopzn')]/ol[@class='stepList']/li[@class='step']/div[contains(text(), 'PROCEDURE-Capital letter')]";
    this.procedurecapitalLetter = page.locator(xpathWithDaaLh).first();
    const xpathForSecondElement = "//div[contains(@daa-lh, 'b5|procedure|nopzn|nopzn')]/ol[@class='stepList']/li[@class='step']/div[contains(.,'PROCEDURE- Capital Letter - Bold -Italic')]";
    this.secondProcedureElement = page.locator(xpathForSecondElement).first();

    const xpathForThirdElement = "//div[contains(@daa-lh, 'b6|procedure|nopzn|nopzn')]/ol[@class='stepList']/li[@class='step']//div[contains(.,'PROCEDURE-Capital Letter - Bold -Italic-Underline')]";
    this.thirdProcedureElement = page.locator(xpathForThirdElement).first();

    //Incorrect Procedure Name
    const xpathForFailedProcedure = "//div[contains(@class,'proedure')][contains(@data-failed,'true')][contains(@data-reason,'Failed loading proedure block.')]";
    this.failedProcedureElement = page.locator(xpathForFailedProcedure).first();

    //verify Draft Procedure
    const procedureDraft = "//li[contains(.,'Procedure Component with Draft Option')]/following-sibling::li[1][contains(.,'In Procedure Component, adding Text in the Step')]";
    this.draftProcedure = page.locator(procedureDraft).first();  

    //Text  in procedure
    this.textInProcedureComponent = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[1]/div/p[contains(.,'Some copy-paste features that you can try out with this latest updated workflow are given here.')]");
    this.StrongtextInProcedureComponent = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[2]/div/strong[contains(text(),'Continue')]");
    this.thirdStepLink = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[3]/div/strong/a[contains(@href,'https://account.adobe.com/plans')]");
    this.iconinprocedureComponet = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[6]/div/ol/li/span[contains(@class,'icon icon-objectives margin-left margin-right')]");
    this.notealertinprocedure = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[6]/child::div/child::div[contains(@class,'note alert')]");
    this.noteiconinprocedure = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[6]/child::div/child::div[contains(@class,'note alert')]/span[contains(@class,'note-icon')]");
    this.notecautionInprocedure = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[8]/div/div[contains(@class,'note caution')]");
    this.notetipinProcedure = page.locator("//div[contains(@daa-lh,'b11|procedure|nopzn|nopzn')]/ol/li[8]/div/div[contains(@class,'note tip')]");
  
    //Images in procedure
    this.webpImageinProcedure = page.locator("//div[@class='procedure']/ol[@class='stepList']/li[@class='step'][1]//img[@title='attach_email_mfa']");
    this.pngImageInprocedure = page.locator("(//img[@loading='lazy'])[1]");
    const xpathLocator = "//div[contains(@daa-lh,'b13|procedure|nopzn|nopzn')]/ol/li[3]/div/p/em[contains(text(),'Great. I will process this for you now')]";
    this.textBeforeImageInProcedure = page.locator(xpathLocator);
    this.imageafterTextInProcedure = page.locator(`${xpathLocator}/following::p[1]`);
    this.urlBasedURLInProcedure = page.locator("//div[contains(@daa-lh,'b13|procedure|nopzn|nopzn')]/ol/li[4]/descendant::a[contains(@href,'/automation/blocks/procedure/')]");


    //Videos In Procedure
    this.videoinprocedure = page.locator("//div[@class='procedure']//li[@class='step'][1]//video[@controls]");
    this.youtubevideoinprocedure = page.locator("//div[@class='procedure']//li[@class='step'][2]//iframe[contains(@src, 'youtube.com')]");

    //Download Component
    this.pdfforprocedure = page.locator("//div[@class='procedure']//li[@class='step'][1]//div[@class='download']//a[@class='download-button' and contains(@href, 'SKU%20search%20in%20Hendrix.pdf')]");
    this.xlsxforprocedure = page.locator("//div[@class='procedure']//li[@class='step'][2]//div[@class='download']//a[@class='download-button' and contains(@href, 'All%20Products_080213.xls')]");
    this.pptforprocedure = page.locator("//div[@class='procedure']//li[@class='step'][3]//div[@class='download']//a[@class='download-button' and contains(@href, 'cct_save_tagging-hendrix.pptx')]");

    //BeforeAfter component
    this.beforeafterfirst = page.locator("//input[@orient='vertical']");
    this.beforeaftersecond = page.locator("//div[@class='procedure']//li[@class='step'][2]//div[@class='before-after-slider hidden-tablet']");
    this.beforeafterthird = page.locator("//div[@class='procedure']//li[@class='step'][3]//div[@class='before-after-slider draft hidden-desktop hidden-mobile']");

    //code block component
   this.as3Inprocedure =  page.locator("//div[@class='procedure']//li[@class='step'][1]//div[@class='code language-as3']").first();
   this.cplusplusInprocedure =  page.locator("//div[@class='procedure']//li[@class='step'][2]//div[@class='code language-c++ line-numbers']").first();
   this.sqlInprocedure =  page.locator("//div[@class='procedure']//li[@class='step'][3]//div[@class='code language-sql draft']").first();

   //All components 
    this.codeBlock = page.locator("//div[@class='procedure']//li[@class='step'][1]//div[@class='code language-as3']").first();
    this.imageWithinProcedure = page.locator("//div[@class='procedure']//li[@class='step'][2]//h1[@id='image-within-procedure']/following-sibling::p/picture");
    this.ambientVideo = page.locator("//div[@class='procedure']//li[@class='step'][3]//p[contains(text(),'Ambient video')]").first();
    this.downloadSection = page.locator("//div[@class='procedure']//li[@class='step'][4]//div[@class='download']");
    this.miloVideo = page.locator("//div[@class='procedure']//li[@class='step'][5]//div[@class='milo-video']/iframe");
    this.beforeAfterSlider = page.locator("//div[@class='procedure']//li[@class='step'][6]//div[@class='before-after-slider hidden-mobile']");
    this.listWithLinks = page.locator("//div[@class='procedure']//li[@class='step'][7]//ul");
    this.noteUpdate = page.locator("//div[@class='procedure']//li[@class='step'][8]//div[@class='note alert']");
    this.noteAddReason = page.locator("//div[@class='procedure']//li[@class='step'][9]//div[@class='note caution']");

  }
}
