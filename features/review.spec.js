module.exports = {
  name: 'Review',
  features: [
    {
      name: '@review_block',
      path: [
        '/acrobat/online/pdf-to-ppt.html',
        '/acrobat/online/pdf-editor.html',
      ],
      envs: '@adobe_stage @adobe_prod',
      tags: '@frictionless',
    },
  ],
};
