module.exports = {
  name: 'stickypromo',
    features: [
      {
        tcid: '0',
        name: '@stickypromo-page',
        path: '/drafts/Automation-PW/stickypromo?georouting=off',
        tags: '@cc @cc-stickypromo @cc-stickypromodisplay',
      },
      {
        tcid: '1',
        name: '@stickypromo-over-scroll',
        path: '/drafts/Automation-PW/stickypromo?georouting=off',
        tags: '@cc @cc-stickypromo @cc-stickypromoscroll',
      },
      {
        tcid: '2',
        name: '@stickypromo-priceCTA',
        path: '/drafts/Automation-PW/stickypromo?georouting=off',
        tags: '@cc @cc-stickypromo @cc-stickypriceCTA',
        data: {
          trialurl : 'https://www.adobe.com/products/photoshop.html#mini-plans-web-cta-photoshop-card',
          buynowurl : 'https://www.adobe.com/creativecloud/plans.html?plan=individual&filter=all&promoid=PYPVPZQK&mv=other'
        },
      },
    ],
  };
  