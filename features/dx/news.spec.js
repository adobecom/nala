module.exports = {
  FeatureName: 'DX News page',
  features: [
    {
      tcid: '1',
      name: '@desc-regression-news-page-search',
      path: '/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @anonymous',
    },
    {
      tcid: '2',
      name: '@desc-regression-news-page-pagination-sort',
      path: '/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @anonymous',
    },
    {
      tcid: '3',
      name: '@desc-regression-news-page-filters',
      path: '/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @anonymous',
    },
    {
      tcid: '4',
      name: '@desc-regression-news-page-read-article',
      path: '/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @anonymous',
      expectedToSeeInURL: '/solutionpartners/drafts/automation/regression/caas-cards/automation-regression-card-no1',
    },
    {
      tcid: '5',
      name: '@desc-news-page-edge-cases',
      path: '/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @anonymous',
    },
    {
      tcid: '6',
      name: '@login-news-page-platinum-user',
      path: 'https://partners.stage.adobe.com/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @login @nopr',
      data: {
        partnerLevel: 'spp-platinum:',
        expectedToSeeInURL: '/solutionpartners/drafts/'
          + 'automation/regression/caas-cards/automation-regression-platinum-card-no1',
      },
    },
    {
      tcid: '7',
      name: '@login-news-page-gold-user',
      path: 'https://partners.stage.adobe.com/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @login @nopr',
      data: {
        partnerLevel: 'spp-gold:',
        resultTotal: 13,
        cardPartnerLevel: 'Automation regression news card SPP Gold no1',
        cardLevelAbove: 'Automation regression news card spp platinum no1',
      },
    },
    {
      tcid: '8',
      name: '@login-news-page-silver-user',
      path: 'https://partners.stage.adobe.com/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @login @nopr',
      data: {
        partnerLevel: 'spp-silver:',
        resultTotal: 12,
        cardPartnerLevel: 'Automation regression news card SPP Silver no1',
        cardLevelAbove: 'Automation regression news card spp gold no1',
      },
    },
    {
      tcid: '9',
      name: '@login-news-page-bronze-user',
      path: 'https://partners.stage.adobe.com/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @login @nopr',
      data: {
        partnerLevel: 'spp-bronze:',
        resultTotal: 11,
        cardPartnerLevel: 'Automation regression news card SPP Bronze no1',
        cardLevelAbove: 'Automation regression news card spp silver no1',
      },
    },
    {
      tcid: '10',
      name: '@login-news-page-community-user',
      path: 'https://partners.stage.adobe.com/solutionpartners/drafts/automation/regression/partner-news',
      tags: '@dx-news @regression @login @nopr',
      data: {
        partnerLevel: 'spp-community:',
        resultTotal: 10,
        cardPartnerLevel: 'Automation regression news card SPP Community no1',
        cardLevelAbove: 'Automation regression news card spp bronze no1',
      },
    },
    {
      tcid: '11',
      name: '@login-news-page-non-member-of-spp-user',
      path: 'https://partners.stage.adobe.com/solutionpartners/drafts/automation/regression/partner-news',
      baseURL: 'https://www.stage.adobe.com/partners.html',
      tags: '@dx-news @regression @login @nopr',
      partnerLevel: 'tpp-platinum:',
    },
  ],
};
