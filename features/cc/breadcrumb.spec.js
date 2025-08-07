module.exports = {
  name: 'breadcrumb',
  features: [
    {
      tcid: '0',
      name: '@breadcrumb-display',
      path: '/drafts/Automation-PW/breadcrumb?georouting=off',
      tags: '@cc @cc-breadcrumb @cc-breadcrumbdisplay',
    },
    {
      tcid: '1',
      name: '@breadcrumb-displayfirstlevelcheck',
      path: '/drafts/Automation-PW/breadcrumb?georouting=off',
      tags: '@cc @cc-breadcrumb @cc-breadcrumbfirstlevellinkcheck',
      url: 'https://www.adobe.com/',
    },
    {
      tcid: '2',
      name: '@breadcrumb-displaypageparentlink',
      path: '/drafts/Automation-PW/breadcrumb?georouting=off',
      tags: '@cc @cc-breadcrumb @cc-breadcrumbparentlinkcheck',
      url: 'https://www.adobe.com/products/photoshop.html',
    },
  ],
};
