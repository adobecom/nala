import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class ostprices {
  constructor(page) {
    this.page = page;
    // ccsubsciton currency format, price and buynow email CTA check out flows in US and Jp pages
    this.productname = page.locator('//em[text()="Creative cloud all apps :"]');
    this.uscountrycurrencysymbol = page.locator('.price-currency-symbol');
    this.pricebeforedelimiter = page.locator('.price-integer');
    this.priceafterdelimiter = page.locator('.price-decimals');
    this.licensecommitment = page.locator('.price-recurrence');
    this.numberoflicenses = page.locator('.price-unit-type');
    this.checkout_lable = page.locator('//p[text()="Check out (email, buy, ucv3 ) : "]');
    this.buynowcta = page.locator('//a[@daa-ll="Buy now-1|Make Create Amazing"]');
    this.price = page.locator('//span[@class="price"]');
    this.jpproductprice = page.locator('//span[@aria-label="10,280 &#20870; 毎月 ライセンスごと"]');
    this.jpcountrycurrencysymbol = page.locator('.price-currency-symbol');
    
    // cc all apps price with segment CTA checkout
    this.productname_1 = page.locator('//p[text()="CC Starting from(month) : "]');
    this.cc_pricebeforedelimiter = page.locator('.price-integer').first();
    this.cc_priceafterdelimiter = page.locator('.price-decimals').first();
    this.cc_licensecommitment = page.locator('.price-recurrence').first();
    this.cc_numberoflicenses = page.locator('.price-unit-type').first();
    this.productname_2 = page.locator('//p[text()="PS Purchase (year) : "]');
    this.ps_pricebeforedelimiter = page.locator('.price-integer').last();
    this.ps_priceafterdelimiter = page.locator('.price-decimals').last();
    this.ps_licensecommitment = page.locator('.price-recurrence').last();
    this.ps_numberoflicenses = page.locator('.price-unit-type').last();
    this.checkout_lablecheckout_lable = page.locator('//p[text()="CC Purchase (segment, ucv3) : "]');
    this.cc_buynowcta = page.locator('//a[@daa-ll="Buy now-1|Generative AI.This c"]');
    this.cc_pricemonth_jp = page.locator('//span[@aria-label="5,891 &#20870; 毎月 ライセンスごと"]');
    this.ps_priceyear_jp = page.locator('//span[@aria-label="28,776 &#20870; 毎年 ライセンスごと"]');

    // Student teccher edition price checks
    this.STEProductname = page.locator('h2#adobe-light-room');
    this.STE_LR_price = page.locator('//span[@aria-label="US$4.44 per month per license"]');
    this.STE_LR_JP_price = page.locator('//span[@aria-label="980 &#20870; 毎月 ライセンスごと"]');
    this.STEdisc = page.locator('//p[text()="This pages has Student and teacher discount prices for Light room for individual"]');
    this.STEgetstarted_CTA = page.locator('//a[@daa-ll="Get started-1|Adobe Light room"]');

    // display of strike through prince, slection of bundle price for commerce store
    this.producatname_3 = page.locator('h3#creative-cloud');
    this.product_discription = page.locator('//p[text()="This has CC full license strike through prices"]');
    this.pricelabel_actual = page.locator('//p[text()="Actual price : "]');
    this.strikethroughproperty = page.locator('//span[@data-template="priceStrikethrough"]');
    this.strikethrouthprice = page.locator('//span[@aria-label="US$89.99 per month per license"]').first();
    this.strikethroughprice_jp_1 = page.locator('//span[@aria-label="9,346 &#20870; 毎月 ライセンスごと"]').first();
    this.pricelabel_now = page.locator('//p[text()="Now its: "]');
    this.purchaseCTAbandle = page.locator('//a[@daa-ll="choose a plan-1|Actual price"]');
    this.strikethroughproductprice_jp = page.locator('//span[@aria-label="9,346 &#20870; per month per license"]');

    // page has card layout with month , year prices and CTAs
    this.headingdiscription = page.locator('//h3[@slot="heading-xs"]').first();
    this.headingdiscription2 = page.locator('//h3[@slot="heading-xs"]').last();
    this.firstcardheading = page.locator('//h3[text()="Individuals PS year subscription"]');
    this.secondcardheading = page.locator('//h3[text()="Individuals PS year subscription"]');
    this.individualPSpricemonth = page.locator('//span[@aria-label="US$22.99 per month per license"]');
    this.individualPSpriceyear = page.locator('//span[@aria-label="US$263.88 per year per license"]');
    this.individualPSpricemonth_jp = page.locator('//span[@aria-label="2,480 &#20870; 毎月 ライセンスごと"]');
    this.individualPSpriceyear_jp = page.locator('//span[@aria-label="26,160 &#20870; 毎年 ライセンスごと"]');
}
};
