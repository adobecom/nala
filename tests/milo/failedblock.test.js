/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { expect, test } = require('@playwright/test');
const failedBlock = require('../../features/milo/failedblock.spec.js');
const parse = require('../../features/parse.js');
const selectors = require('../../selectors/failedblock.selectors.js');

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(failedBlock);

/**
 * Slow/fast scroll JS evaluation method.
 * To be used in page.evaluate, i.e. page.evaluate(scroll, { direction: 'value', speed: 'value' });
 * @param direction string direction you want to scroll
 * @param speed string speed you would like to scroll. Options: slow, fast
*/
const scroll = async (args) => {
  const { direction, speed } = args;
  // eslint-disable-next-line no-promise-executor-return
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const scrollHeight = () => document.body.scrollHeight;
  const start = direction === 'down' ? 0 : scrollHeight();
  const shouldStop = (position) => (direction === 'down' ? position > scrollHeight() : position < 0);
  const increment = direction === 'down' ? 100 : -100;
  const delayTime = speed === 'slow' ? 30 : 5;
  console.error(start, shouldStop(start), increment);
  for (let i = start; !shouldStop(i); i += increment) {
    window.scrollTo(0, i);
    await delay(delayTime);
  }
};

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browser }) => {
      await page.goto(props.url);

      // Added scrolling for failed block JS to load.
      // Without it, test provides false count for validation checking.
      await page.evaluate(scroll, { direction: 'down', speed: 'slow' });
      await page.evaluate(scroll, { direction: 'up', speed: 'fast' });

      const locator = page.locator(selectors[props.tag]);
      const count = await locator.count();
      expect.soft(count).toEqual(0);
      if (count > 0) {
        const handles = await locator.elementHandles();
        for (const handlePromise of handles) {
          const handle = handlePromise;
          const reason = await handle.getAttribute('data-reason');
          console.log(`${browser.browserType().name()}: ${reason} on ${props.url}`);
        }
      }
    });
  });
});
