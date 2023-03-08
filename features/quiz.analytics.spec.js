module.exports = {
  name: 'Quiz Recommender Blocks',
  features: [
    {
      name: '@quiz_prod_analytics',
      path: [
        '/creativecloud/quiz-recommender.html',
      ],
      envs: '@adobe_prod',
      tags: '@quiz-single-template',
    },
    {
      name: '@quiz_stage_analytics',
      path: [
        '/creativecloud/quiz-recommender.html',
      ],
      envs: '@adobe_stage',
      tags: '@quiz-single-template',
    },
  ],
};
