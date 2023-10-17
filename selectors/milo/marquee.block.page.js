import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';
import { getCSSObjects } from '../../libs/cssparser.js';

export default class Marquee {
  constructor(page) {
    this.page = page;
    // marquee types locators
    this.marquee = page.locator('.marquee').first();
    this.marqueeLight = page.locator('.marquee.light');
    this.marqueeSmall = page.locator('.marquee.small.dark');
    this.marqueeSmallLight = page.locator('.marquee.small.light');
    this.marqueeLarge = page.locator('.marquee.large');
    this.marqueeLargeLight = page.locator('.marquee.large.light');
    this.marqueeQuiet = page.locator('.marquee.quiet');
    this.marqueeInline = page.locator('.marquee.inline.dark');
    this.marqueeSplitSmall = page.locator('.marquee.split.small');
    this.marqueeSplitLarge = page.locator('.marquee.split.large');
    this.marqueeSplitLargeLight = page.locator('.marquee.split.one-third.large.light');
    this.marqueeSplitOneThirdLargeLight = page.locator('.marquee.split.one-third.large.light');
    this.marqueeSplitOneThird = page.locator('.marquee.split.one-third');
    this.marqueeSplitOneThirdSmallLight = page.locator('.marquee.split.one-third.small.light');

    // marque section(s) locators
    // marquee details
    this.detailM = this.marquee.locator('.detail-m');
    this.detailL = this.marquee.locator('.detail-l');
    this.brandImage = this.marquee.locator('.detail-m');

    // marquee headings
    this.headingXL = this.marquee.locator('.heading-xl');
    this.headingXXL = this.marquee.locator('.heading-xxl');

    // marquee body area
    this.bodyM = this.marquee.locator('.body-m');
    this.bodyXL = this.marquee.locator('.body-xl');

    // marquee actions area
    this.actionArea = this.marquee.locator('.action-area');
    this.outlineButton = this.marquee.locator('.con-button.outline');
    this.outlineButtonS = this.marquee.locator('.con-button.outline.button-s');
    this.outlineButtonM = this.marquee.locator('.con-button.outline.button-m');
    this.outlineButtonL = this.marquee.locator('.con-button.outline.button-l');
    this.outlineButtonXL = this.marquee.locator('.con-button.outline.button-xl');

    this.blueButton = this.marquee.locator('.con-button.blue');
    this.blueButtonL = this.marquee.locator('.con-button.blue.button-l');
    this.blueButtonXL = this.marquee.locator('.con-button.blue.button-xl');
    this.filledBlueButton = this.marquee.locator('.con-button.blue');
    this.filledButtonM = this.marquee.locator('.con-button.blue.button-s');
    this.filledButtonM = this.marquee.locator('.con-button.blue.button-m');
    this.filledButtonL = this.marquee.locator('.con-button.blue.button-l');
    this.filledButtonXL = this.marquee.locator('.con-button.blue.button-xl');

    this.actionLink1 = this.marquee.locator('a').nth(0);
    this.actionLink2 = this.marquee.locator('a').nth(1);

    // background images
    this.background = this.marquee.locator('.background');
    this.backgroundImage = this.marquee.locator('.background picture img');

    // foreground images
    this.foreground = this.marquee.locator('.foreground');
    this.foregroundImage = this.marquee.locator('div.foreground img');

    // media images
    this.mediaImage = this.marquee.locator('div.media img');

    // get milo css selectors or objects
    const currentDir = __dirname;
    this.variableCSSContent = fs.readFileSync(path.join(currentDir, '../../styles/variable.css'), 'utf8');
    this.blockCSSContent = fs.readFileSync(path.join(currentDir, '../../styles/marquee.css'), 'utf8');

    const {variableCSSObject, blockCSSObject } = getCSSObjects(this.variableCSSContent, this.blockCSSContent)
    this.variableCSSObject = variableCSSObject;
    this.blockCSSObject = blockCSSObject;

     // analytics and marquee attributes
    this.attProperties = {
      'daa-lh': {
        'daa-lh': 'b1|marquee|default|default',
      },
      'daa-im': {
        'daa-im': 'true',
      },
      'marquee-split-one-third-large-light': {
        'style': 'background: rgb(245, 245, 245);',
      },
      'marquee-split-one-third': {
        'style': 'background: rgb(0, 0, 0);',
      },
      'marquee-split-one-third-small-light': {
        'style': 'background: rgb(245, 245, 245);',
      },
      'background': {
        'width': '750',
        'height': '375',
      },
      'media': {
        'width': '600',
        'height': '300',
      },
      'media-split-small': {
        'width': '720',
        'height': '520',
      },
      'media-split-large': {
        'width': '720',
        'height': '520',
      },
      'media-split-one-third': {
        'width': '720',
        'height': '520',
      },
    };
  }

  /**
 * Verifies the css, attributes, styles, of elements or sections of the specified marquee type.
 *
 * @param {string} marqueeType - The type of the marquee to verify.
 * Possible values are 'marquee (light)', 'marquee (small)', and 'marquee (small, light)'.
 * @returns {Promise<boolean>} - Returns true if the specified marquee type has the expected values.
 */
  async verifyMarquee(marqueeType, data) {
    switch (marqueeType) {
      case 'marquee (light)':
        // verify marquee visibility
        await expect(await this.marqueeLight).toBeVisible();

        // verify marquee content
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);
        await expect(await this.outlineButton).toContainText(data.outlineButtonText);
        await expect(await this.blueButton).toContainText(data.blueButtonText);
        
        // verify marquee css, class, and other attributes 
        expect(WebUtil.verifyCSS(this.marqueeLight, this.blockCSSObject['.marquee.light'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.headingXL, this.variableCSSObject['.heading-xxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.outlineButton, this.variableCSSObject['.con-button.button-l'])).toBeTruthy();

        expect(WebUtil.verifyAttributes(this.marqueeLight, this.attProperties['daa-lh'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.mediaImage, this.attProperties['media'])).toBeTruthy();          
  
        return true;

      case 'marquee (small)':
        // verify marquee visibility
        await expect(await this.marqueeSmall).toBeVisible();

        // verify marquee css, class, and other attributes                
        expect(WebUtil.verifyCSS(await this.headingXL, this.variableCSSObject['.heading-xxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(await this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();
        expect(WebUtil.verifyCSS(await this.blueButton, this.variableCSSObject['.con-button.button-l'])).toBeTruthy();
     
        expect(WebUtil.verifyAttributes(this.marqueeSmall, this.attProperties['daa-lh'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(await this.backgroundImage, this.attProperties['background'])).toBeTruthy();

        // verify marquee content
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);
        await expect(await this.blueButton).toContainText(data.blueButtonText)              

        return true;

      case 'marquee (small, light)':
        // verify marquee visibility, css, analytics and other attributes
        await expect(await this.marqueeSmallLight).toBeVisible();      

        // verify marquee css, class, and other attributes     
        expect(WebUtil.verifyCSS(this.marqueeSmallLight, this.blockCSSObject['.marquee.small'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.marqueeSmallLight, this.blockCSSObject['.marquee.light'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.outlineButton, this.variableCSSObject['.con-button.button-l'])).toBeTruthy();
        
        expect(WebUtil.verifyAttributes(this.marqueeSmallLight, this.attProperties['daa-lh'])).toBeTruthy();        
        expect(WebUtil.verifyAttributes(this.mediaImage, this.attProperties['media'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.backgroundImage, this.attProperties['background'])).toBeTruthy();

        // verify marquee content
        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);
        await expect(await this.outlineButton).toContainText(data.outlineButtonText);        
        await expect(await this.blueButton).toContainText(data.blueButtonText); 
        
        // marquee section visual comparision 
        expect.soft(await this.marqueeSmallLight.screenshot()).toMatchSnapshot({
          name: 'block-marquee-small-light.png',
        });         

        return true;

      case 'marquee (large)':
        // verify marquee visibility
        await expect(await this.marqueeLarge).toBeVisible();
        
        // verify marquee content
        await expect(await this.headingXXL).toContainText(data.h2Text);
        await expect(await this.bodyXL).toContainText(data.bodyText);
        await expect(await this.outlineButtonXL).toContainText(data.outlineButtonText);        
        await expect(await this.blueButtonXL).toContainText(data.blueButtonText);       
 
        return true;

      case 'marquee (large, light)':
        // verify marquee visibility
        await expect(await this.marqueeLargeLight).toBeVisible();

        // verify marquee css, class, and other attributes  
        expect(WebUtil.verifyCSS(this.marqueeLargeLight, this.blockCSSObject['.marquee.quiet'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.headingXXL, this.variableCSSObject['.heading-xxxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyXL, this.variableCSSObject['.body-xl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.outlineButtonXL, this.variableCSSObject['.con-button.button-xl'])).toBeTruthy();        

        // verify marquee content
        await expect(await this.headingXXL).toContainText(data.h2Text);
        await expect(await this.bodyXL).toContainText(data.bodyText);
        await expect(await this.outlineButtonXL).toContainText(data.outlineButtonText);        
        await expect(await this.blueButtonXL).toContainText(data.blueButtonText);    

        return true;

      case 'marquee (quiet)':
        // verify marquee visibility
        await expect(await this.marqueeQuiet).toBeVisible();

        // verify marquee css, class, and other attributes  
        expect(WebUtil.verifyCSS(this.marqueeQuiet, this.blockCSSObject['.marquee.quiet'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.headingXL, this.variableCSSObject['.heading-xxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.blueButton, this.variableCSSObject['.con-button.button-l'])).toBeTruthy();
          
        expect(WebUtil.verifyAttributes(this.marqueeQuiet, this.attProperties['daa-lh'])).toBeTruthy();

        // verify marquee content
        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);   
        await expect(await this.blueButton).toContainText(data.blueButtonText);
        
        // marquee section visual comparision         
        expect.soft(await this.marqueeQuiet.screenshot()).toMatchSnapshot({
          name: 'block-marquee-quiet.png',
        })         

        return true;

      case 'marquee (inline)':
        // verify marquee visibility
        await new Promise(resolve => setTimeout(resolve, 500));
        await expect(await this.marqueeInline).toBeVisible();

        // verify marquee css, class, and other attributes 
        expect(WebUtil.verifyCSS(this.marqueeInline, this.blockCSSObject['.marquee.inline'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.headingXL, this.variableCSSObject['.heading-xxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();

        expect(WebUtil.verifyAttributes(this.marqueeInline, this.attProperties['daa-lh'])).toBeTruthy();
       
        // verify marquee content
        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText); 
        
        // marquee section visual comparision 
        expect.soft(await this.marqueeInline.screenshot()).toMatchSnapshot({
          name: 'block-marquee-inline.png',
        })         

        return true;

      case 'marquee (split, small)':
        // marquee marquee visible
        await new Promise(resolve => setTimeout(resolve, 200));
        await expect(this.marqueeSplitSmall).toBeVisible();

        // verify marquee css, class, and other attributes   
        expect(WebUtil.verifyCSS(this.marqueeSplitSmall, this.blockCSSObject['.marquee.split'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.headingXL, this.variableCSSObject['.heading-xxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.outlineButton, this.variableCSSObject['.con-button.button-l'])).toBeTruthy();

        expect(WebUtil.verifyAttributes(this.marqueeSplitSmall, this.attProperties['daa-lh'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.mediaImage, this.attProperties['media-split-small'])).toBeTruthy();

        // verify marquee content
        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);
        await expect(await this.outlineButton).toContainText(data.outlineButtonText);      
        await expect(await this.blueButton).toContainText(data.blueButtonText);

        return true;

      case 'marquee (split, large)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(await this.marqueeSplitLarge).toBeVisible();

        expect(WebUtil.verifyCSS(this.headingXXL, this.variableCSSObject['.heading-xxxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyXL, this.variableCSSObject['.body-xl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.blueButtonXL, this.variableCSSObject['.con-button.button-xl'])).toBeTruthy();
        
        expect(WebUtil.verifyAttributes(this.marqueeSplitLarge, this.attProperties['daa-lh'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.mediaImage, this.attProperties['media-split-large'])).toBeTruthy();      

        // verify marquee content
        await expect(await this.detailL).toContainText(data.detailText);
        await expect(await this.headingXXL).toContainText(data.h2Text);
        await expect(await this.bodyXL).toContainText(data.bodyText);
        await expect(await this.blueButtonXL).toContainText(data.outlineButtonText);      
        await expect(await this.actionLink2).toContainText(data.linkText);

        return true;

      case 'marquee (split, one-third, large, light)':
        // marquee marquee visible, css, analytic and other attributes
        await new Promise(resolve => setTimeout(resolve, 500));
        await expect(this.marqueeSplitOneThirdLargeLight).toBeVisible();        

        expect(WebUtil.verifyCSS(this.headingXXL, this.variableCSSObject['.heading-xxxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyXL, this.variableCSSObject['.body-xl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.blueButtonXL, this.variableCSSObject['.con-button.button-xl'])).toBeTruthy();
       
        expect(WebUtil.verifyAttributes(this.marqueeSplitOneThirdLargeLight, this.attProperties['daa-lh'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.mediaImage, this.attProperties['media-split-one-third'])).toBeTruthy();

        // verify marquee content
        await expect(await this.detailL).toContainText(data.detailText);
        await expect(await this.headingXXL).toContainText(data.h2Text);
        await expect(await this.bodyXL).toContainText(data.bodyText);
        await expect(await this.blueButtonXL).toContainText(data.outlineButtonText);      
        await expect(await this.actionLink2).toContainText(data.linkText);

        return true;

      case 'marquee (split, one-third)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(this.marqueeSplitOneThird).toBeVisible();

        expect(WebUtil.verifyCSS(this.headingXL, this.variableCSSObject['.heading-xxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.blueButtonL, this.variableCSSObject['.con-button.button-l'])).toBeTruthy();        

        // verify attributes
        await new Promise(resolve => setTimeout(resolve, 200));
        expect(WebUtil.verifyAttributes(this.marqueeSplitOneThird, this.attProperties['daa-lh'])).toBeTruthy();
        expect(WebUtil.verifyAttributes(this.mediaImage, this.attProperties['media-split-one-third'])).toBeTruthy();       
        
        // verify marquee content
        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);
        await expect(await this.blueButtonL).toContainText(data.outlineButtonText);      
        await expect(await this.actionLink2).toContainText(data.linkText);        

        return true;

      case 'marquee (split, one-third, small, light)':
        // marquee marquee visible, css, analytic and other attributes
        await expect(this.marqueeSplitOneThirdSmallLight).toBeVisible();

        expect(WebUtil.verifyCSS(this.headingXL, this.variableCSSObject['.heading-xxl'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.bodyM, this.variableCSSObject['.body-m'])).toBeTruthy();
        expect(WebUtil.verifyCSS(this.blueButtonL, this.variableCSSObject['.con-button.button-l'])).toBeTruthy(); 
        
        expect(WebUtil.verifyAttributes(this.mediaImage, this.attProperties['media-split-one-third'])).toBeTruthy();

        // verify marquee content
        await expect(await this.detailM).toContainText(data.detailText);
        await expect(await this.headingXL).toContainText(data.h2Text);
        await expect(await this.bodyM).toContainText(data.bodyText);
        await expect(await this.blueButtonL).toContainText(data.outlineButtonText);      

        return true;
      default:
        throw new Error(`Unsupported marquee type: ${marqueeType}`);
    }
  }
};
