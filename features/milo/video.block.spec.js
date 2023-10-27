module.exports = {
  FeatureName: 'Video Block',
  features: [
    {
      tcid: '0',
      name: '@Video Default',
      path: '/drafts/nala/blocks/video/default-video',
      data: {
        h2Text: 'Default video',
      },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '1',
      name: '@Video autoplay loop',
      path: '/drafts/nala/blocks/video/video-autoplay-loop',
      data: {
        h2Text: 'Autoplay enabled video',
      },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '2',
      name: '@Video autoplay loop once',
      path: '/drafts/nala/blocks/video/autoplay-loop-once',
      data: {
        h2Text: 'Autoplay once enabled video',
      },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '3',
      name: '@Video hover play',
      path: '/drafts/nala/blocks/video/video-hover-play',
      data: {
        h2Text: 'Hover play enabled video (combined with #_autoplay1 for feature to work)',
      },
      tags: '@video @smoke @regression @milo',
    },
  ],
};
