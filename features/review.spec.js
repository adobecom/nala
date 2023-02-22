module.exports = {
  name: 'Review',
  features: [
    {
      name: '@review',
      path: [
        '/acrobat/online/pdf-to-ppt',
        '/acrobat/online/pdf-editor',
      ],
      envs: '@dc_preview',
      tags: '@frictionless',
    },
    {
      name: '@review',
      path: [
        '/acrobat/online/pdf-to-ppt.html',
        '/acrobat/online/pdf-editor.html',
      ],
      envs: '@adobe_prod',
      tags: '@frictionless',
    },
  ],
};
