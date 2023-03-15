module.exports = {
  name: 'Review',
  features: [
    {
      name: '@review_block',
      path: [
        '/acrobat/online/pdf-to-ppt',
        '/acrobat/online/pdf-editor',
      ],
      envs: '@dc_live',
      tags: '@frictionless @visual-compare',
    },
    {
      name: '@review_block',
      path: [
        '/acrobat/online/pdf-to-ppt.html',
        '/acrobat/online/pdf-editor.html',
      ],
      envs: '@adobe_prod',
      tags: '@frictionless',
    },
  ],
};
