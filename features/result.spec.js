module.exports = {
  name: 'Quiz Recommender Blocks',
  features: [
    {
      name: '@result_full',
      path: [
        '/creativecloud/quiz-recommender/result.html#type=',
      ],
      envs: '@adobe_prod @adobe_stage',
      tags: '@result-single-template',
    },
    {
      name: '@result_smoke',
      path: [
        '/creativecloud/quiz-recommender/result.html#type=',
      ],
      envs: '@adobe_prod @adobe_stage',
      tags: '@result-single-template',
    },
  ],
};
