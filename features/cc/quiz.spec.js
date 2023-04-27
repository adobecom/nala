module.exports = {
  name: 'Quiz Recommender Blocks',
  features: [
    {
      tcid: '1',
      name: '@quiz single template',
      path: '/creativecloud/quiz-recommender.html',
      tags: '@quiz-single-template @quiz-static',
      data: 'data/cc/quiz/quiz-single-template.yml',
      envs: '@adobe_prod @adobe_stage',
    },
    {
      tcid: '2',
      name: '@quiz double template',
      path: '/creativecloud/quiz-recommender.html',
      tags: '@quiz-double-template @quiz-static',
      data: 'data/cc/quiz/quiz-double-template.yml',
      envs: '@adobe_prod @adobe_stage',
    },
    {
      tcid: '3',
      name: '@quiz triple template',
      path: '/creativecloud/quiz-recommender.html',
      tags: '@quiz-triple-template @quiz-static',
      data: 'data/cc/quiz/quiz-triple-template.yml',
      envs: '@adobe_prod @adobe_stage',
    },
    {
      tcid: '4',
      name: '@quiz single flagship photo',
      path: '/creativecloud/quiz-recommender.html',
      tags: '@quiz-single-flagship-photo @quiz-static',
      data: 'data/cc/quiz/quiz-single-flagship-photo.yml',
      envs: '@adobe_prod @adobe_stage',
    },
  ],
};
