import { expect, test } from '@playwright/test';
import carousel from '../features/carousel.spec.js';
import parse from '../features/parse.js';
import selectors from '../selectors/carousel.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(carousel);

async function checkClass(el, className, contain = true) {
  const elClasses = await el.getAttribute('class');

  if (contain) {
    await expect(elClasses).toContain(`${className}`);
  } else {
    await expect(elClasses).not.toContain(`${className}`);
  }
}

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page }) => {
      await page.goto(props.url);
      const previousButton = await page.locator(selectors['@previous']);
      const nextButton = await page.locator(selectors['@next']);
      const firstSlide = await page.locator(selectors['@firstSlide']);
      const secondSlide = await page.locator(selectors['@secondSlide']);
      const secondSlideIndicator = await page.locator(selectors['@secondSlideIndicator']);
      const secondSlideCta = page.locator(selectors['@secondSlideCta']);
      const expand = await page.locator(selectors['@expand']);
      const lightbox = await page.locator(selectors['@lightbox']);
      const testPage = await page.url();

      await previousButton.scrollIntoViewIfNeeded();

      // Previous and next button should switch slides
      await expect(firstSlide).toBeVisible();
      await checkClass(firstSlide, 'active');
      await checkClass(secondSlide, 'active', false);
      await nextButton.click();
      await checkClass(firstSlide, 'active', false);
      await checkClass(secondSlide, 'active');
      await previousButton.click();
      await checkClass(firstSlide, 'active');
      await checkClass(secondSlide, 'active', false);

      // Selecting the dot indicator switches to the corresponding slide
      await secondSlideIndicator.click();
      await checkClass(firstSlide, 'active', false);
      await checkClass(secondSlide, 'active');

      // Checking lightbox-active
      await expect(lightbox).not.toBeVisible();
      await expand.click();
      await expect(lightbox).toBeVisible();
      await checkClass(
        await page.locator(selectors['@carousel']),
        'lightbox-active',
      );

      // Buttons/links inside the slide should be clickable
      await secondSlideCta.click();
      await expect(page.url()).not.toBe(testPage);
    });
  });
});
