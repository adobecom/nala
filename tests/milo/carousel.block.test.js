/* eslint-disable import/extensions */
/* eslint-disable import/named */
import { expect, test } from '@playwright/test';
import { Carousel } from '../../selectors/milo/carousel.block.page';

const CarouselSpec = require('../../features/milo/carousel.block.spec');

const { features } = CarouselSpec;

// Carousel blocks tests
test.describe('Milo Carousel block test suite', () => {
  // Test - 1
  test(`${features[0].name}, Tags: ${features[0].tags}`, async ({ page, baseURL }) => {
    const carousel = new Carousel(page);

    // test step-1
    await test.step('Go to Carousel block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');

      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    // test step-2
    await test.step('Verify Carousel container ', async () => {
      // verify carousel elements
      expect(await carousel.isCarouselDisplayed('carouselContainer')).toBeTruthy();

      // verify carousel slides count and active slide index
      expect(await carousel.getNumberOfSlides()).toBe(4);
      expect(await carousel.getCurrentSlideIndex()).toBe('0');

      // verify carousel indictor and active indicator
      expect(await carousel.areIndicatorsDisplayed()).toBeTruthy();
      expect(await carousel.getNumberOfIndicators()).toBe(4);
      expect(await carousel.getCurrentIndicatorIndex()).toBe('0');

      // verify carousel next and previous buttons
      expect(await carousel.isNextButtonlVisible()).toBeTruthy();
      expect(await carousel.isPreviousButtonlVisible()).toBeTruthy();
    });

    // test step-3
    await test.step('Perform carousel slides and controls operation and verify contents', async () => {
      // move to next slide by clicking next button and verify h2 tag header
      await carousel.moveToNextSlide();
      expect(await carousel.getCurrentSlideIndex()).toBe('1');
      expect(await carousel.getSlideText(1, 'h2', 'Orange Slices')).toBeTruthy();

      // move to 3rd slide by clicking indicator and verify h2 tag header
      await carousel.moveToIndicator(3);
      expect(await carousel.getCurrentIndicatorIndex()).toBe('0');
      expect(await carousel.getSlideText(3, 'h2', 'Apples')).toBeTruthy();
    });
  });

  // Spec-2 : Carousel (lightbox)
  test(`${features[1].name}, Tags : ${features[1].tags}`, async ({ page, baseURL }) => {
    const carousel = new Carousel(page);
    // const action = new WebInteraction(page);

    await test.step('Go to Carousel lightbox block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('Verify carousel with lightbox features ', async () => {
      expect(await carousel.isCarouselDisplayed('carouselLightbox')).toBeTruthy();

      // verify active slide and slides count
      expect(await carousel.getNumberOfSlides()).toBe(4);
      expect(await carousel.getCurrentSlideIndex()).toBe('0');

      // verify indicator visibility, count and index of active slide
      expect(await carousel.areIndicatorsDisplayed()).toBeTruthy();
      expect(await carousel.getNumberOfIndicators()).toBe(4);
      expect(await carousel.getCurrentIndicatorIndex()).toBe('0');

      expect(await carousel.isNextButtonlVisible()).toBeTruthy();
      expect(await carousel.isPreviousButtonlVisible()).toBeTruthy();

      // verify expand and close lightbox
      expect(await carousel.isLightboxExpandButtonVisible()).toBeTruthy();
      await carousel.expandLighboxModal();

      expect(await carousel.isLightboxCloseButtonVisible()).toBeTruthy();
      await carousel.closeLighboxModal();
    });
  });

  // Spec-3 : Carousel Multi slide (show-2)
  test(`${features[2].name}, Tags : ${features[2].tags}`, async ({ page, baseURL }) => {
    const carousel = new Carousel(page);

    // test step-1
    await test.step('Go to Carousel multi-slide show-2 block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    // test step-2
    await test.step('Verify multi slide carousel show-2 features ', async () => {
      expect(await carousel.isCarouselDisplayed('carouselShow-2')).toBeTruthy();

      // In multi-slide 2 number of slides will be n-slides +1 so it will be 5
      expect(await carousel.getNumberOfSlides()).toBe(5);
      expect(await carousel.getCurrentSlideIndex()).toBe('0');

      // In multi-slide carousel indicators are not shown
      expect(await carousel.areIndicatorsDisplayed()).toBeFalsy();

      expect(await carousel.isNextButtonlVisible()).toBeTruthy();
      expect(await carousel.isPreviousButtonlVisible()).toBeTruthy();
    });
    // test step-3
    await test.step('Perform carousel slides and controls operation and verify contents', async () => {
      // move to next slide by clicking next button and verify h2 tag header
      await carousel.moveToNextSlide();
      expect(await carousel.getSlideText(1, 'h2', 'Melon')).toBeTruthy();
    });
  });
});
