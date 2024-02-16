export default class experiencefragemnt {
  constructor(page) {
    this.page = page;

    //XF test cases
    this.toc = page.locator("//div[contains(@class,'toc')][contains(@role,'tree')]")

    //TOC strcture 
    this.toclielements = page.locator("(//div[contains(@role,'tree')][contains(@class,'toc')]/descendant::ul)[1]/child::li");
    this.toclifirstelement = page.locator("((//div[contains(@role,'tree')][contains(@class,'toc')]/descendant::ul)[1]/child::li)[1][contains(@role,'treeitem')]");
    this.tocligroupelements = page.locator("//div[contains(@role,'tree')]/descendant::li[contains(@role,'group')][@aria-expanded='false']");

    //verify attribute value on click of toc
    this.tocFirstElement= page.locator("(//div[contains(@role,'tree')]/descendant::li)[2]");

    //verify TOC content after click
    this.tocSubHeading = page.locator("(//div[contains(@role,'tree')]/descendant::li)[2]/child::span")
    this.tocSubElementContents = page.locator("(//div[contains(@role,'tree')]/descendant::li)[2]/ul/li[contains(@role,'treeitem')]")
    this.tocSubElementFirstContent = page.locator("((//div[contains(@role,'tree')]/descendant::li)[2]/ul/li[contains(@role,'treeitem')])[1]")
    this.tocSubElementsAttributevalues = page.locator("((//div[contains(@role,'tree')]/descendant::li)[2]/ul/li[contains(@role,'treeitem')])[1]/child::a[contains(.,'Dream it. Make it.')][contains(@target,'_blank')]")
    

  }
}
