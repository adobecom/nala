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
      envs: '@dc_preview',
      tags: '@pdf-converter',
    },
    {
      name: '@converter',
      path: [
        '/acrobat/online/pdf-to-ppt.html',
        '/acrobat/online/pdf-to-jpg.html',
        '/acrobat/online/pdf-to-word.html',
        '/acrobat/online/pdf-to-excel.html',
        '/acrobat/online/convert-pdf.html',
        '/acrobat/online/ppt-to-pdf.html',
        '/acrobat/online/jpg-to-pdf.html',
        '/acrobat/online/word-to-pdf.html',
        '/acrobat/online/excel-to-pdf.html',
      ],
      envs: '@dc_prod',
      tags: '@pdf-converter',
    },
  ],
};
