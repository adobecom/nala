export default class mobile {
  constructor(page) {
    this.page = page;
    this.branchBanner = page.locator('.branch-banner-ios');
    this.branchBannerAnimation = this.branchBanner.locator('.branch-animation').nth(0);
    this.branchBannerIcon = this.branchBanner.locator('.branch-banner-icon').nth(0);
    this.branchBannerDescription = this.branchBanner.locator('.branch-banner-details').nth(0);
    this.branchBannerProductRatings = this.branchBanner.locator('.branch-banner-stars').nth(0);
    this.branchBannerReviews = this.branchBanner.locator('.branch-banner-reviews').nth(0);
    this.branchProductCTA = page.locator('branch-mobile-action');
  }
}
