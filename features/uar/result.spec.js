module.exports = {
  name: 'Quiz Recommender Blocks',
  features: [
    {
      tcid: '0',
      name: '@result single template',
      path: '/creativecloud/quiz-recommender/result.html#type=',
      tags: '@result-single-template @result-static',
      data: 'data/uar/quiz/result-single-template.json',
      envs: '@adobe_prod @adobe_stage',
    },
  ],
};
