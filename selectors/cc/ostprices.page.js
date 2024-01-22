export default class ostprices {
  constructor(page) {
    this.page = page;
    // ccsubsciton currency format, price and buynow email CTA check out flows in US and Jp pages
    this.productName = page.locator('//em[contains(text(),"Creative cloud all apps :")]');
    this.usCurrencySymbol = page.locator('.price-currency-symbol');
    this.priceBeforeDelimiter = page.locator('.price-integer');
    this.priceAfterDelimiter = page.locator('.price-decimals');
    this.licenseCommitment = page.locator('.price-recurrence');
    this.numberofLicenses = page.locator('.price-unit-type');

    this.emailBuynowCta = page.locator('a.con-button[data-checkout-workflow-step="email"]').nth(0);
    this.emailBuynowCta2 = page.locator('a.con-button[data-checkout-workflow-step="email"]').nth(1);
    this.segmentationBuynowCta = page.locator('a[data-checkout-workflow-step="segmentation"]');
    this.bundleBuynowCta = page.locator('a[data-checkout-workflow-step="bundle"]');

    this.price = page.locator('//span[@class="price"]');
    this.jpProductPrice = page.locator('//span[@aria-label="10,280 &#20870; 毎月 ライセンスごと"]');
    this.jpCurrencySymbol = page.locator('.price-currency-symbol');

    // cc all apps price with segment CTA checkout
    this.productName1 = page.locator('//p[contains(text(),"CC Starting from(month) : ")]');
    this.ccPriceBeforeDelimiter = page.locator('.price-integer').first();
    this.ccPriceAfterDelimiter = page.locator('.price-decimals').first();
    this.ccLicenseCommitment = page.locator('.price-recurrence').first();
    this.ccNumberOfLicenses = page.locator('.price-unit-type').first();
    this.productName2 = page.locator('//p[contains(text(),"PS Purchase (year) : ")]');
    this.psPriceBeforeDelimiter = page.locator('.price-integer').last();
    this.psPriceAfterDelimiter = page.locator('.price-decimals').last();
    this.psLicenseCommitment = page.locator('.price-recurrence').last();
    this.psNumberOfLicenses = page.locator('.price-unit-type').last();

    this.cc_pricemonth_jp = page.locator('//span[@aria-label="5,891 &#20870; 毎月 ライセンスごと"]');
    this.ps_priceyear_jp = page.locator('//span[@aria-label="28,776 &#20870; 毎年 ライセンスごと"]');

    // Student teacher edition price checks
    this.SteProductName = page.locator('h2#adobe-light-room');
    this.SteLrPrice = page.locator('//span[@aria-label="US$4.44 per month per license"]');
    this.SteLrJpPrice = page.locator('//span[@aria-label="980 &#20870; 毎月 ライセンスごと"]');
    this.STEgetstarted_CTA = page.locator('//a[@daa-ll="Get started-1|Adobe Light room"]');

    // display of strike through prince, slection of bundle price for commerce store
    this.productName3 = page.locator('h3#creative-cloud');
    this.priceLabelActual = page.locator('//p[contains(text(),"Actual price : ")]');
    this.strikeThroughProperty = page.locator('//span[@data-template="priceStrikethrough"]');
    this.strikeThroughPrice = page.locator('//span[@aria-label="US$89.99 per month per license"]').first();
    this.strikeThroughPriceJp1 = page.locator('//span[@aria-label="9,346 &#20870; 毎月 ライセンスごと"]').first();
    this.priceLabelNow = page.locator('//p[contains(text(),"Now its: ")]');
    this.purchaseCTAbandle = page.locator('//a[@daa-ll="choose a plan-1|Actual price"]');

    // page has card layout with month , year prices and CTAs
    this.headingDiscription = page.locator('//h3[@slot="heading-xs"]').first();
    this.headingDiscription2 = page.locator('//h3[@slot="heading-xs"]').last();
    this.firstCardHeading = page.locator('//h3[contains(text(),"Individuals PS year subscription")]');
    this.individualPsPriceMonth = page.locator('//span[@aria-label="US$22.99 per month per license"]');
    this.individualPsPriceYear = page.locator('//span[@aria-label="US$263.88 per year per license"]');
    this.individualPsPriceMonthJP = page.locator('.price').nth(0);
    this.individualPsPriceYearJP = page.locator('.price').nth(1);
}
};
