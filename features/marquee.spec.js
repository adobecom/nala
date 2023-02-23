module.exports = {
  name: 'Marquee',
  features: [
    {
      name: '@marquee',
      path: '/test/features/blocks/marquee',
      envs: '@milo @bacom',
      tags: '@marquee-large',
    },
    {
      name: '@button',
      path: '/test/features/blocks/marquee',
      envs: '@milo_live',
      tags: '@large-button @medium-button @inline-button',
    },
    {
      name: '@button',
      path: '/customer-success-stories/princess-cruises-case-study',
      envs: '@bacom',
      tags: '@medium-button',
    },
  ],
};
