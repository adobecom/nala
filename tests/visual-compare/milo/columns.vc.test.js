/* eslint-disable no-await-in-loop */
import { expect, test } from '@playwright/test';
import columns from '../../../features/milo/columns.spec.js';
import parse from '../../../features/parse.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(columns);

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
    // Added condition when using feature spec file used in E2E tests
    // in order to choose urls for visual comparison.
    // This condition is not necessary if using separate feature spec files for visual comparisons.
    if (props.tag === '@visual-compare') {
      test(props.title, async ({ page }) => {
        await page.goto(props.url);
        await page.waitForLoadState('networkidle');

        // Added scrolling for lazy loaded images to initiate their load.
        await page.evaluate(scroll, { direction: 'down', speed: 'slow' });
        await page.evaluate(scroll, { direction: 'up', speed: 'fast' });

        await expect(page).toHaveScreenshot(`columns_${props.url}.png`, { fullPage: true, timeout: 30000 });
      });
    }
  });
});
