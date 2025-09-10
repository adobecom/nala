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
  ],
};
