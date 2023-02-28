module.exports = {
  name: 'Quiz Recommender Blocks',
  features: [
    {
      name: '@result_prod_full',
      path: [
        '/creativecloud/quiz-recommender/result.html#type=',
      ],
      envs: '@adobe_prod',
      tags: '@result-single-template',
    },
    {
      name: '@result_stage_full',
      path: [
        '/creativecloud/quiz-recommender/result.html#type=',
      ],
      envs: '@adobe_stage',
      tags: '@result-single-template',
    },
    {
      name: '@result_prod_smoke',
      path: [
        '/creativecloud/quiz-recommender/result.html#type=',
      ],
      envs: '@adobe_prod',
      tags: '@result-single-template',
    },
  ],
};
