module.exports = {
  name: 'Quiz Recommender Blocks',
  features: [
    {
      name: '@quiz_static_full',
      path: [
        '/creativecloud/quiz-recommender.html',
      ],
      envs: '@adobe_prod @adobe_stage',
      tags: '@quiz-single-template @quiz-single-flagship-photo @quiz-single-flagship-video @quiz-single-flagship-design @quiz-single-flagship-illustration @quiz-single-flagship-pdf @quiz-single-3D @quiz-double-template @quiz-triple-template',
    },
    {
      name: '@quiz_static_smoke',
      path: [
        '/creativecloud/quiz-recommender.html',
      ],
      envs: '@adobe_prod @adobe_stage',
      tags: '@quiz-single-template @quiz-single-flagship-photo @quiz-single-3D @quiz-double-template @quiz-triple-template',
    },
  ],
};
