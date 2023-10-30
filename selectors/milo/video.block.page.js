export default class Video {
  constructor(page, nth=0) {
    this.page = page;

    // video locators
    this.section = this.page.locator('.section').nth(nth);
    this.content = this.page.locator('.content').nth(nth);
    this.video = this.page.locator('.content video');
    this.videoSource = this.video.locator('source');

    // video block attributes
    this.attributes = {
      'video.default': {
        'playsinline': '',
        'controls': '',
      },
      'video.source': {
        'type': 'video/mp4',
        'src': /.*.mp4/,
      },
      'video.autoplay': {
        'playsinline': '',
        'autoplay': '',
        'loop': '',
        'muted': ''
      },
      'video.autoplay.once': {
        'playsinline': '',
        'autoplay': '',        
        'muted': ''
      },
      'video.hover.play': {
        'playsinline': '',
        'autoplay': '',        
        'muted': '',
        'data-hoverplay': '',
        'data-mouseevent': 'true'
      },       
      'analytics': {
        'section.daa-lh': {
          'daa-lh': /s[1-9]/,
        },
        'content.daa-lh': {
          'daa-lh': /b[1-9]|content|default|default/,
        },         
      },     
    };
  }
}
