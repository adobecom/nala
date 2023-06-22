exports.FedPub = class FedPub {
  constructor(page) {
    this.page = page;
    this.props = {
      fedPubTitle: 'The best camera settings for rain photography.',
      fedPubSubtitle1: 'Choose the right camera settings for a rainy day.',
      fedPubSubtitle2: 'Use Adobe photo editing software.',
      tryForFreeHref: 'https://www.adobe.com/creativecloud/photography.html#mini-plans-web-cta-photoshop-lightroom-card',
    };

    // FedPub Selectors:
    this.fedPubTitle = page.locator('h1#the-best-camera-settings-for-rain-photography');
    this.fedPubSubtitle1 = page.locator('h2#choose-the-right-camera-settings-for-a-rainy-day');
    this.fedPubSubtitle2 = page.locator('h2#use-adobe-photo-editing-software');
    this.tryForFreeButton = page.locator('a.con-button.button-m');
  }

  // >> FedPub methods declared below <<
};
