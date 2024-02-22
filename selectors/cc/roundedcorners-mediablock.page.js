import { expect } from '@playwright/test';
import { WebUtil } from '../../libs/webutil.js';

export default class mediaroundedcorners {
  constructor(page) {
  this.page = page;
  // Media rounded corners styles for both images and madia block UI locators
  this.mediaRoundedCornerImageGroup = page.locator('.section.three-up.s-spacing');
  this.firstimagerow = this.mediaRoundedCornerImageGroup.locator('.media-row').nth(0);
  this.secondimagerow = this.mediaRoundedCornerImageGroup.locator('.media-row').nth(1);
  this.thirdimagerow = this.mediaRoundedCornerImageGroup.locator('.media-row').nth(2);
  this.image_SmallRoundedCorners = this.mediaRoundedCornerImageGroup.locator('//img[@src="./media_1dece42316bfd4504c3ea5b842c4d77c4a856c15f.jpeg?width=750&format=jpeg&optimize=medium"]');
  this.image_MediumRoundedCorners = this.mediaRoundedCornerImageGroup.locator('//img[@src="./media_19efb392a91d6125ecd0668f0587955d2f02f6fdd.jpeg?width=750&format=jpeg&optimize=medium"]');
  this.image_LargeRoundedCorners = this.mediaRoundedCornerImageGroup.locator('//img[@src="./media_156316900725a53043620ca12b5b029f2b0b54818.jpeg?width=750&format=jpeg&optimize=medium"]');
  this.mediaRoundedBlockGroup = page.locator('.section.two-up.s-spacing').first();
  this.firstMediaBlock = this.mediaRoundedBlockGroup.locator('.media.l-rounded-corners.con-block.has-bg');
  this.secondMediaBlock = this.mediaRoundedBlockGroup.locator('.media.large.dark.m-rounded-corners.s-rounded-corners-image.con-block.has-bg.media-reverse-mobile');
  this.imageWithInBlock = this.mediaRoundedBlockGroup.locator('//img[@src="./media_15701a692530b54cb77445d12a98ec8d5b498e188.jpeg?width=750&format=jpeg&optimize=medium"]');
  this.fullRoundedCornersBlock = page.locator('.media.l-rounded-corners.full-rounded-corners-image.con-block');
  this.fullRoundedcornerimage = this.fullRoundedCornersBlock.locator('//img[@src="./media_1f320de06e9c6a05dc899e773a62d93cf1149bb40.jpeg?width=750&format=jpeg&optimize=medium"]');
  // image & block rounded corner css property
  this.cssProperties = {
   'smallRoundedCorners': {
   'border-radius': '4px',
   },
   'mediumRoundedCorners': {
   'border-radius': '8px',
   },
   'largeRoundedCorners': {
   'border-radius': '16px',
   },
   'fullRoundedCorners': {
   'border-radius': '50%',
   },
  };
}
};
