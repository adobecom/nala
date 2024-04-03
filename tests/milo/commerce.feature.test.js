import { expect, test } from '@playwright/test';
import { features } from '../../features/milo/commerce.spec.js';
import CommercePage from '../../selectors/milo/commerce.feature.page.js';
import FedsLogin from '../../selectors/feds/feds.login.page.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';

const miloLibs = process.env.MILO_LIBS || '';

let COMM;
test.beforeEach(async ({ page }) => { COMM = new CommercePage(page); });

test.describe('Commerce feature test suite', () => {
  // @Commerce-Price-Term - Validate price with term display
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[0].path}${miloLibs}`;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate regular price display', async () => {
      await COMM.price.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.price).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.price).toHaveAttribute('data-display-per-unit', 'false');
      await expect(COMM.price).toHaveAttribute('data-display-tax', 'false');
      expect(await COMM.price.innerText()).toContain('US$263.88');
      expect(await COMM.price.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.price.locator('.price-unit-type').innerText()).toBe('');
      expect(await COMM.price.locator('.price-tax-inclusivity').innerText()).toBe('');
    });

    await test.step('Validate optical price display', async () => {
      await COMM.priceOptical.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceOptical).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.priceOptical).toHaveAttribute('data-display-per-unit', 'false');
      await expect(COMM.priceOptical).toHaveAttribute('data-display-tax', 'false');
      expect(await COMM.priceOptical.innerText()).toContain('US$21.99');
      expect(await COMM.priceOptical.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.priceOptical.locator('.price-unit-type').innerText()).toBe('');
      expect(await COMM.priceOptical.locator('.price-tax-inclusivity').innerText()).toBe('');
    });

    await test.step('Validate strikethrough price display', async () => {
      await COMM.priceStrikethrough.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-per-unit', 'false');
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-tax', 'false');
      expect(await COMM.priceStrikethrough.innerText()).toContain('US$263.88');
      expect(await COMM.priceStrikethrough.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.priceStrikethrough.locator('.price-unit-type').innerText()).toBe('');
      expect(await COMM.priceStrikethrough.locator('.price-tax-inclusivity').innerText()).toBe('');
      const priceStyle = await COMM.priceStrikethrough.evaluate(
        (e) => window.getComputedStyle(e).getPropertyValue('text-decoration'),
      );
      expect(await priceStyle).toContain('line-through');
    });
  });

  // @Commerce-Price-Unit-Term - Validate price with term and unit display
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[1].path}${miloLibs}`;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate regular price display', async () => {
      await COMM.price.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.price).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.price).toHaveAttribute('data-display-per-unit', 'true');
      await expect(COMM.price).toHaveAttribute('data-display-tax', 'false');
      expect(await COMM.price.innerText()).toContain('US$263.88');
      expect(await COMM.price.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.price.locator('.price-unit-type').innerText()).not.toBe('');
      expect(await COMM.price.locator('.price-tax-inclusivity').innerText()).toBe('');
    });

    await test.step('Validate optical price display', async () => {
      await COMM.priceOptical.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceOptical).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.priceOptical).toHaveAttribute('data-display-per-unit', 'true');
      await expect(COMM.priceOptical).toHaveAttribute('data-display-tax', 'false');
      expect(await COMM.priceOptical.innerText()).toContain('US$21.99');
      expect(await COMM.priceOptical.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.priceOptical.locator('.price-unit-type').innerText()).not.toBe('');
      expect(await COMM.priceOptical.locator('.price-tax-inclusivity').innerText()).toBe('');
    });

    await test.step('Validate strikethrough price display', async () => {
      await COMM.priceStrikethrough.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-per-unit', 'true');
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-tax', 'false');
      expect(await COMM.priceStrikethrough.innerText()).toContain('US$263.88');
      expect(await COMM.priceStrikethrough.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.priceStrikethrough.locator('.price-unit-type').innerText()).not.toBe('');
      expect(await COMM.priceStrikethrough.locator('.price-tax-inclusivity').innerText()).toBe('');
      const priceStyle = await COMM.priceStrikethrough.evaluate(
        (e) => window.getComputedStyle(e).getPropertyValue('text-decoration'),
      );
      expect(await priceStyle).toContain('line-through');
    });
  });

  // @Commerce-Price-Taxlabel-Unit-Term - Validate price with term, unit and tax label display
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[2].path}${miloLibs}`;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate regular price display', async () => {
      await COMM.price.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.price).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.price).toHaveAttribute('data-display-per-unit', 'true');
      await expect(COMM.price).toHaveAttribute('data-display-tax', 'true');
      expect(await COMM.price.innerText()).toContain('US$263.88');
      expect(await COMM.price.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.price.locator('.price-unit-type').innerText()).not.toBe('');
      expect(await COMM.price.locator('.price-tax-inclusivity').innerText()).not.toBe('');
    });

    await test.step('Validate optical price display', async () => {
      await COMM.priceOptical.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceOptical).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.priceOptical).toHaveAttribute('data-display-per-unit', 'true');
      await expect(COMM.priceOptical).toHaveAttribute('data-display-tax', 'true');
      expect(await COMM.priceOptical.innerText()).toContain('US$21.99');
      expect(await COMM.priceOptical.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.priceOptical.locator('.price-unit-type').innerText()).not.toBe('');
      expect(await COMM.priceOptical.locator('.price-tax-inclusivity').innerText()).not.toBe('');
    });

    await test.step('Validate strikethrough price display', async () => {
      await COMM.priceStrikethrough.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-recurrence', 'true');
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-per-unit', 'true');
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-display-tax', 'true');
      expect(await COMM.priceStrikethrough.innerText()).toContain('US$263.88');
      expect(await COMM.priceStrikethrough.locator('.price-recurrence').innerText()).not.toBe('');
      expect(await COMM.priceStrikethrough.locator('.price-unit-type').innerText()).not.toBe('');
      expect(await COMM.priceStrikethrough.locator('.price-tax-inclusivity').innerText()).not.toBe('');
      const priceStyle = await COMM.priceStrikethrough.evaluate(
        (e) => window.getComputedStyle(e).getPropertyValue('text-decoration'),
      );
      expect(await priceStyle).toContain('line-through');
    });
  });

  // @Commerce-Promo - Validate price and CTAs have promo code applied
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[3].path}${miloLibs}`;
    const { data } = features[3];

    console.info('[Test Page]: ', testPage);

    await test.step('Go to the test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate regular price has promo', async () => {
      await COMM.price.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.price).toHaveAttribute('data-promotion-code', data.promo);
    });

    await test.step('Validate optical price has promo', async () => {
      await COMM.priceOptical.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceOptical).toHaveAttribute('data-promotion-code', data.promo);
    });

    await test.step('Validate strikethrough price has promo', async () => {
      await COMM.priceStrikethrough.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.priceStrikethrough).toHaveAttribute('data-promotion-code', data.promo);
    });

    await test.step('Validate Buy now CTA has promo', async () => {
      await COMM.buyNowCta.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.buyNowCta).toHaveAttribute('data-promotion-code', data.promo);
      await expect(COMM.buyNowCta).toHaveAttribute('href', new RegExp(`${data.promo}`));
    });

    await test.step('Validate Free Trial CTA has promo', async () => {
      await COMM.freeTrialCta.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.freeTrialCta).toHaveAttribute('data-promotion-code', data.promo);
      await expect(COMM.freeTrialCta).toHaveAttribute('href', new RegExp(`${data.promo}`));
    });
  });

  // @Commerce-Upgrade-Entitlement - Validate Upgrade commerce flow
  test(`${features[4].name}, ${features[4].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[4].path}${miloLibs}`;
    console.info('[Test Page]: ', testPage);

    const { data } = features[4];
    const Login = new FedsLogin(page);
    const Header = new FedsHeader(page);

    // Go to test example
    await test.step('Go to test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    // Login with Adobe test account:
    await test.step('Login with a valid Adobe account', async () => {
      await Header.signInButton.click();
      if (COMM.loginType.isVisible()) {
        await COMM.loginType.click();
      }
      await Login.loginOnAppForm(process.env.IMS_EMAIL_PAID_PS, process.env.IMS_PASS_PAID_PS);
    });

    // Validate Upgrade eligibility check w.r.t Buy CTA
    await test.step('Verify cc all apps card cta title', async () => {
      await page.waitForLoadState('domcontentloaded');
      await COMM.ccAllAppsCTA.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.ccAllAppsCTA).toHaveText(data.UpgradeCTATitle);
    });

    // Validate Upgrade eligibility check w.r.t Switch modal
    await test.step('Verify Switch modal launch for Upgrade', async () => {
      await COMM.ccAllAppsCTA.click();
      await COMM.switchModalIframe.waitFor({ state: 'visible', timeout: 30000 });
      await expect(COMM.switchModalIframe).toBeVisible();
    });
  });

  // @Commerce-Download-Entitlement - Validate Download commerce flow
  test(`${features[5].name}, ${features[5].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[5].path}${miloLibs}`;
    console.info('[Test Page]: ', testPage);
    const { data } = features[5];
    const Login = new FedsLogin(page);
    const Header = new FedsHeader(page);

    // Go to test example
    await test.step('Go to test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    // Login with Adobe test account:
    await test.step('Login with a valid Adobe account', async () => {
      await Header.signInButton.click();
      if (COMM.loginType.isVisible()) {
        await COMM.loginType.click();
      }
      await Login.loginOnAppForm(process.env.IMS_EMAIL_PAID_PS, process.env.IMS_PASS_PAID_PS);
    });

    // Validate Download eligibility check w.r.t Buy CTA
    await test.step('Verify photoshop card cta title', async () => {
      await page.waitForLoadState('domcontentloaded');
      await COMM.photoshopBuyCTA.waitFor({ state: 'visible', timeout: 10000 });
      await expect(COMM.photoshopBuyCTA).toHaveText(data.DownloadCTATitle);
      await expect(COMM.photoshopFreeCTA).toHaveText(data.TrialCTATitle);
    });

    // Validate Download eligibility check w.r.t download link
    await test.step('Verify download link for download', async () => {
      await COMM.photoshopBuyCTA.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page.url()).toContain(data.DownloadUrl);
    });
  });
});
