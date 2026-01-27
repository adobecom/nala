module.exports = {
  name: 'BACOM Stage URL Check',
  features: [
    {
      tcid: '0',
      name: '@bacom-stage-url-check',
      baseURL: '@bacom_stage',
      tags: '@bacom-stage-url-check @bacom @stage @smoke',
      data: 'data/bacom/stage-urls.yml',
    },
  ],
};
