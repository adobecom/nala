export default class vps {
  constructor(page) {
    this.page = page;

    // vps Selectors for hidden desktop
    this.vpsForHiddenDesktop = page.locator("//div[contains(@daa-lh,'b2|generic')][contains(@class,'generic hidden-desktop')]");
    this.vpsForImginHiddenDesktop = page.locator("//div[contains(@daa-lh,'b2|generic')][contains(@class,'generic hidden-desktop')]/descendant::picture/img");

    // vps Selectors for hidden Tablet
    this.vpsForHiddenTabletB4 = page.locator("//div[contains(@class, 'generic hidden-tablet')][contains(@daa-lh, 'b4|generic')]");
    this.vpsForImginHiddenTabletB4 = page.locator("//div[contains(@class, 'generic hidden-tablet')][contains(@daa-lh, 'b4|generic')]/div/div/picture/img");

    // XPath for the div with class 'generic hidden-mobile' and attribute 'daa-lh' containing the value 'b6|generic'
    this.vpsForHiddenMobileB6 = page.locator("//div[contains(@class, 'generic hidden-mobile')][contains(@daa-lh, 'b6|generic')]");
    this.vpsForImginHiddenMobileB6 = page.locator("//div[contains(@class, 'generic hidden-mobile')][contains(@daa-lh, 'b6|generic')]/div/div/picture/img");

    this.vpsForHiddenDesktopTabletB8 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-desktop') and contains(@class, 'hidden-tablet')][contains(@daa-lh, 'b8|generic')]");
    this.vpsForImginHiddenDesktopTabletB8 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-desktop') and contains(@class, 'hidden-tablet')][contains(@daa-lh, 'b8|generic')]/div/div/picture/img");

    this.vpsForHiddenDesktopMobileB10 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-desktop') and contains(@class, 'hidden-mobile')][contains(@daa-lh, 'b10|generic')]");
    this.vpsForImginHiddenDesktopMobileB10 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-desktop') and contains(@class, 'hidden-mobile')][contains(@daa-lh, 'b10|generic')]/div/div/picture/img");

    this.vpsForHiddenTabletMobileB12 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-tablet') and contains(@class, 'hidden-mobile')][contains(@daa-lh, 'b12|generic')]");
    this.vpsForImginHiddenTabletMobileB12 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-tablet') and contains(@class, 'hidden-mobile')][contains(@daa-lh, 'b12|generic')]/div/div/picture/img");

  
    this.vpsForHiddenTabletMobileDesktopB14 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-tablet') and contains(@class, 'hidden-mobile') and contains(@class, 'hidden-desktop')][contains(@daa-lh, 'b14|generic')]");
    this.vpsForImginHiddenTabletMobileDesktopB14 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-tablet') and contains(@class, 'hidden-mobile') and contains(@class, 'hidden-desktop')][contains(@daa-lh, 'b14|generic')]/div/div/picture/img");

    this.vpsForHiddenTabletMobileB26 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-tablet') and contains(@class, 'hidden-mobile')][contains(@daa-lh, 'b26|generic')]");
    this.linkForHiddenTabletMobileB26 = page.locator("//div[contains(@class, 'generic') and contains(@class, 'hidden-tablet') and contains(@class, 'hidden-mobile')][contains(@daa-lh, 'b26|generic')]/div/a");

  }
}
