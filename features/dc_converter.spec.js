module.exports = {
  name: 'DC Converter',
  features: [
    {
      name: '@converter',
      path: [
        '/acrobat/online/pdf-to-ppt',
        '/acrobat/online/pdf-to-jpg',
        '/acrobat/online/pdf-to-word',
        '/acrobat/online/pdf-to-excel',
        '/acrobat/online/convert-pdf',
        '/acrobat/online/ppt-to-pdf',
        '/acrobat/online/jpg-to-pdf',
        '/acrobat/online/word-to-pdf',
        '/acrobat/online/excel-to-pdf',
      ],
      envs: '@dc_preview @dc_prod',
      tags: '@pdf-converter',
    },
  ],
};
