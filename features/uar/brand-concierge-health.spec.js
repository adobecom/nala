module.exports = {
  name: 'Brand Concierge Health Check',
  features: [
    {
      tcid: '0',
      name: '@brand-concierge-health-simple',
      env: '@adobe_stage',
      path: '/cc-shared/fragments/uar/brand-concierge/brand-concierge',
      tags: '@brand-concierge-health @photoshop @simple',
      data: null,
      timeout: 90000,
      description: 'Simple Photoshop chat test with network resilience and console error monitoring',
      prompt: 'give me a recommendation for Photoshop',
    },
    {
      tcid: '1',
      name: '@brand-concierge-health-ace1082',
      env: '@adobe_prod',
      path: '/cc-shared/fragments/tests/2025/q3/ace1082/brand-concierge',
      tags: '@brand-concierge-health @ace1082 @test',
      data: null,
      timeout: 90000,
      description: 'ACE1082 test page - Brand Concierge chat health check with network resilience monitoring',
      prompt: 'I want to touch up and enhance my photos',
    },
  ],
};
