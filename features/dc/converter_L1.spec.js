module.exports = {
  name: 'Converter Component',
  features: [
    {
      name: '@DC-Converter-Checks',
      path: [
        '/acrobat/online/sign-pdf.html',
        '/acrobat/online/request-signature.html',
        '/acrobat/online/crop-pdf.html',
        '/acrobat/online/delete-pdf-pages.html',
        '/acrobat/online/rotate-pdf.html',
        '/acrobat/online/rearrange-pdf.html',
        '/acrobat/online/split-pdf.html',
        '/acrobat/online/add-pages-to-pdf.html',
        '/acrobat/online/extract-pdf-pages.html',
        '/acrobat/online/pdf-editor.html',
      ],
      envs: '@adobe_prod',
      tags: '@dc @frictionless',
    },
  ],
};
