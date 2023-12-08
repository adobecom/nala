export default class Merchcard {
  constructor(page, nth = 0) {
    this.page = page;
    // modal locators
    this.merchCard = this.page.locator('.merch-card').nth(nth);
    this.segment = this.page.locator('.merch-card.segment').nth(nth);
    this.sepcialOffers = this.page.locator('.merch-card.special-offers').nth(nth);
    this.plans = this.page.locator('.merch-card.plans').nth(nth);

    // inline price and strikethrough price
    this.inlinePrice1 = this.merchCard.locator('span.placeholder-resolved').nth(0);
    this.inlinePrice2 = this.merchCard.locator('span.placeholder-resolved').nth(1);
    this.price = this.inlinePrice1.locator('.price');
    this.priceCurrencySymbol = this.inlinePrice1.locator('.price-currency-symbol');
    this.priceInteger = this.inlinePrice1.locator('.price-integer');
    this.priceDecimalDelimiter = this.inlinePrice1.locator('.price-decimals-delimiter');
    this.priceDecimals = this.inlinePrice1.locator('.price-decimals');
    this.priceRecurrence = this.inlinePrice1.locator('.price-recurrence');

    this.strikethroughPrice = this.inlinePrice2.locator('.price');
    this.strikethroughPriceCurrencySymbol = this.inlinePrice2.locator('.price-currency-symbol');
    this.strikethroughPriceInteger = this.inlinePrice2.locator('.price-integer');
    this.strikethroughPriceDecimalDelimiter = this.inlinePrice2.locator('.price-decimals-delimiter');
    this.strikethroughPriceDecimals = this.inlinePrice2.locator('.price-decimals');
    this.strikethroughPriceRecurrence = this.inlinePrice2.locator('.price-recurrence');

    // merch-card segment locators
    this.segmentRibbon = this.merchCard.locator('.segment-badge');
    this.segmentTitle = this.segment.locator('h3[slot="heading-xs"]').nth(0);
    this.segmentDescription1 = this.segment.locator('div[slot="body-xs"] p').nth(0);
    this.segmentDescription2 = this.segment.locator('div[slot="body-xs"] p').nth(1);

    this.linkText1 = this.segmentDescription2.locator('a').nth(0);
    this.linkText2 = this.segmentDescription2.locator('a').nth(1);

    // merch-card special offers
    this.sepcialOffersImage = this.sepcialOffers.locator('div[slot="bg-image"] img');
    this.sepcialOffersRibbon = this.merchCard.locator('.special-offers-badge');
    this.sepcialOffersTitleH4 = this.sepcialOffers.locator('h5[slot="detail-m"]');
    this.sepcialOffersTitleH5 = this.sepcialOffers.locator('h4[slot="body-xss"]');
    this.sepcialOffersTitleH3 = this.sepcialOffers.locator('h3[slot="heading-xs"]');

    this.sepcialOffersDescription1 = this.sepcialOffers.locator('div[slot="body-xs"] p').nth(1);
    this.sepcialOffersDescription2 = this.sepcialOffers.locator('div[slot="body-xs"] p').nth(2);

    this.sepcialOffersDescription3 = this.sepcialOffers.locator('div[slot="body-xs"] p').nth(3);
    this.sepcialOffersLinkText3 = this.sepcialOffersDescription3.locator('a').nth(0);

    this.seeTermsTextLink = this.merchCard.locator('a:has-text("See terms")');

    // merch-card plans locators
    //this.productIcon = this.plans.locator('#shadow-root div.icons');
    this.productIcon = this.plans.locator('img');
    this.plansRibbon = this.plans.locator('.plans-badge');
    this.plansCardTitleH3 = this.plans.locator('h3[slot="heading-xs"]');
    this.plansCardTitleH5 = this.plans.locator('h5[slot="detail-m"]');
    this.plansCardDescription2 = this.plans.locator('div[slot="body-xs"] p').nth(2);
    this.seePlansTextLink = this.merchCard.locator('a:has-text("See plan & pricing details")');
    
    // merch-card footer sections
    this.footer = this.merchCard.locator('div[slot="footer"]');  
    this.footerCheckbox = this.page.locator('#stock-checkbox input[type="checkbox"]');
    this.footerCheckboxLabel = this.merchCard.locator('#stock-checkbox');
    this.secureTransactionIcon = this.merchCard.locator('.secure-transaction-icon');
    this.secureTransactionLabel = this.merchCard.locator('.secure-transaction-label');
    this.footerOutlineButton = this.merchCard.locator('a.con-button.outline'); 
    this.footerBlueButton = this.merchCard.locator('a.con-button.blue').nth(0);
    this.footerBlueButton2 = this.merchCard.locator('a.con-button.blue').nth(1);

    // merch-card attributes
    this.attributes = {
      'segmentRibbon': {
        'style': /background-color:\s*#EDCC2D;\s*color:\s*#000000;\s*/,
      },
      'specialOfferRibbon': {
        'style': /background-color:\s* #F68D2E;\s*color:\s*#000000;\s*/,
      },
      'plansRibbon': {
        'style': /background-color:\s*#EDCC2D;\s*color:\s*#000000;\s*/,
      },
    };
  }
}
