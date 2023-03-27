module.exports = {
  BlockName: 'Carousel block',
  features: [
    {
      tcid: '1',
      name: 'Carousel (container) ',
      path: '/drafts/nala/blocks/carousel/lightbox',
      tags: '@carousel @carousel-container @smoke @regression @milo',
      envs: '@milo-live milo-prod',
    },
    {
      tcid: '2',
      name: 'Carousel (lightbox) ',
      path: '/drafts/nala/blocks/carousel/fullpage-carousel',
      tags: '@carousel @carousel-container @smoke @regression @milo',
      envs: '@milo-live milo-prod',
    },
    {
      tcid: '3',
      name: 'Carousel Multi slide (show-2)',
      path: '/drafts/nala/blocks/carousel/carousel-show-2',
      tags: '@carousel @carousel-container @regression @milo',
      envs: '@milo-live milo-prod',
    },
  ],
};
