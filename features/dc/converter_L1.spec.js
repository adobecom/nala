module.exports = {
  name: 'DC Converter',
  features: [
    {
      name: '@converter',
      path: [
        'acrobat/online/sign-pdf',
        'acrobat/online/request-signature',
        'acrobat/online/crop-pdf',
        'acrobat/online/delete-pdf-pages',
        'acrobat/online/rotate-pdf',
        'acrobat/online/rearrange-pdf',
        'acrobat/online/split-pdf',
        'acrobat/online/add-pages-to-pdf',
        'acrobat/online/extract-pdf-pages',
        'acrobat/online/pdf-editor',
      ],
      envs: '@dc_preview',
      tags: '@pdf-converter',
    },
    {
      name: '@converter',
      path: [
        'acrobat/online/sign-pdf.html',
        'acrobat/online/request-signature.html',
        'acrobat/online/crop-pdf.html',
        'acrobat/online/delete-pdf-pages.html',
        'acrobat/online/rotate-pdf.html',
        'acrobat/online/rearrange-pdf.html',
        'acrobat/online/split-pdf.html',
        'acrobat/online/add-pages-to-pdf.html',
        'acrobat/online/extract-pdf-pages.html',
        'acrobat/online/pdf-editor.html',
      ],
      envs: '@adobe_prod',
      tags: '@pdf-converter',
    },
  ],
};
