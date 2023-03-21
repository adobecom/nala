import { expect, test } from '@playwright/test';
import parse from '../../libs/parse.js';
import carousel from '../../features/milo/carousel.spec.js';
import selectors from '../../selectors/milo/carousel.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(carousel);

async function checkClass(el, className, contain = true) {
  const elClasses = await el.getAttribute('class');

  if (contain) {
    expect(elClasses).toContain(`${className}`);
  } else {
    expect(elClasses).not.toContain(`${className}`);
  }
}

test.describe(`${name}`, () => {
  features.forEach((props) => {
    test(props.title, async ({ page, browserName }) => {
      await page.goto(props.url);
      const previousButton = page.locator(selectors['@previous']);
      const nextButton = page.locator(selectors['@next']);
      const firstSlide = page.locator(selectors['@firstSlide']);
      const secondSlide = page.locator(selectors['@secondSlide']);
      const secondSlideIndicator = page.locator(selectors['@secondSlideIndicator']);
      const secondSlideCta = page.locator(selectors['@secondSlideCta']);
      const expand = page.locator(selectors['@expand']);
      const lightbox = page.locator(selectors['@lightbox']);
      const testPage = page.url();

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
        page.locator(selectors['@carousel']),
        'lightbox-active',
      );

      // Buttons/links inside the slide should be clickable
      // TODO: WebKit 16.4 build v1792 breaks button clicking functionality inside slide
      // Once bug is fixed, remove condition blocking the testing of WebKit for carousel buttons.
      if (browserName !== 'webkit') {
        await secondSlideCta.click();
        expect(page.url()).not.toBe(testPage);
      }
    });
  });
});
