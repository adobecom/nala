export default class Merchcard {
  constructor(page, nth = 0) {
    this.page = page;
    // modal locators
    this.merchCard = this.page.locator('.merch-card').nth(nth);
    this.segment = this.page.locator('.merch-card.segment').nth(nth);
    this.sepcialOffers = this.page.locator('.merch-card.special-offers').nth(nth);
    this.plans = this.page.locator('.merch-card.plans').nth(nth);

    // inline price and strikethrough price
    this.inlinePrice1 = this.merchCard.locator('inline-price').nth(0);
    this.inlinePrice2 = this.merchCard.locator('inline-price').nth(1);
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
    this.segmentRibbon = this.merchCard.locator('.consonant-SegmentBlade-ribbon');
    this.segmentTitle = this.segment.locator('.consonant-SegmentBlade-title').nth(0);
    this.segmentDescription1 = this.segment.locator('.consonant-SegmentBlade-description').nth(0);
    this.segmentDescription2 = this.segment.locator('.consonant-SegmentBlade-description').nth(1);

    this.linkText1 = this.segmentDescription2.locator('a').nth(0);
    this.linkText2 = this.segmentDescription2.locator('a').nth(1);

    // merch-card special offers
    this.sepcialOffersImage = this.sepcialOffers.locator('.consonant-SpecialOffers-img');
    this.sepcialOffersRibbon = this.merchCard.locator('.consonant-SpecialOffers-ribbon');
    this.sepcialOffersTitleH4 = this.sepcialOffers.locator('h4.consonant-SpecialOffers-title');
    this.sepcialOffersTitleH3 = this.sepcialOffers.locator('h3.consonant-SpecialOffers-title');

    this.sepcialOffersDescription1 = this.sepcialOffers.locator('.consonant-SpecialOffers-description').nth(0);
    this.sepcialOffersDescription2 = this.sepcialOffers.locator('.consonant-SpecialOffers-description').nth(1);

    this.sepcialOffersDescription3 = this.sepcialOffers.locator('.consonant-SpecialOffers-description').nth(2);
    this.sepcialOffersLinkText3 = this.sepcialOffersDescription3.locator('a').nth(0);

    this.seeTermsTextLink = this.merchCard.locator('a:has-text("See terms")');

    // merch-card plans locators
    this.productIcon = this.plans.locator('.consonant-MerchCard-ProductIcon');
    this.plansRibbon = this.plans.locator('.consonant-PlansCard-ribbon');
    this.plansCardTitleH3 = this.plans.locator('h3.consonant-PlansCard-title');
    this.plansCardTitleH5 = this.plans.locator('h5.consonant-PlansCard-title');
    this.plansCardDescription2 = this.plans.locator('.consonant-PlansCard-description').nth(1);
    this.seePlansTextLink = this.merchCard.locator('a:has-text("See plan & pricing details")');
    
    // merch-card footer sections
    this.footer = this.merchCard.locator('.consonant-CardFooter')    
    this.footerCheckbox = this.merchCard.locator('.checkbox-container .checkmark')
    this.footerCheckboxLabel = this.merchCard.locator('.checkbox-container .checkbox-label')
    this.secureTransactionIcon = this.merchCard.locator('.secure-transaction-icon')
    this.secureTransactionLabel = this.merchCard.locator('.secure-transaction-label')
    this.footerOutlineButton = this.merchCard.locator('a.con-button.outline'); 
    this.footerBlueButton = this.merchCard.locator('a.con-button.blue').nth(0);
    this.footerBlueButton2 = this.merchCard.locator('a.con-button.blue').nth(1);

    // merch-card attributes
    this.attributes = {
      'segmentRibbon': {
        'style': 'background-color: rgb(237, 204, 45); color: rgb(0, 0, 0);',
      },
      'specialOfferRibbon': {
        'style': 'background-color: rgb(246, 141, 46); color: rgb(0, 0, 0);',
      },
      'plansRibbon': {
        'style': 'background-color: rgb(246, 141, 46); color: rgb(0, 0, 0);',
      },
    };
  }
}
