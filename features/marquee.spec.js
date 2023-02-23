module.exports = {
  name: 'Marquee',
  features: [
    {
      name: '@marquee',
      path: '/test/features/blocks/marquee',
      envs: '@milo_live @bacom_live',
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
      envs: '@bacom_live',
      tags: '@medium-button',
    },
  ],
};
