module.exports = {
  name: 'Quiz Recommender Blocks',
  features: [
    {
      name: '@quiz_analytics',
      path: [
        '/creativecloud/quiz-recommender.html',
      ],
      envs: '@adobe_prod @adobe_stage',
      tags: '@quiz-single-template',
    },
  ],
};
