module.exports = {
  name: 'DC Converter',
  features: [
    {
      name: '@converter',
      path: [
        '/acrobat/online/pdf-to-ppt',
      ],
      envs: '@dc_preview',
      tags: '@pdf-converter',
    },
    {
      name: '@converter',
      path: [
        '/acrobat/online/pdf-to-ppt.html',
      ],
      envs: '@dc_prod',
      tags: '@pdf-converter',
    },
  ],
};
