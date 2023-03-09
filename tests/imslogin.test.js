import { expect, test } from '@playwright/test';
import imslogin from '../features/imslogin.spec.js';
import parse from '../features/parse.js';
import selectors from '../selectors/imslogin.selectors.js';
import ims from '../utils/imslogin.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(imslogin);

test.describe(`${name}`, () => {
  features.forEach((props) => {
    if (props.tag === '@gnav-signin' || props.tag === '@gnav-multi-signin') {
      test(props.title, async ({ page, context, browser }) => {
        await page.goto(props.url);

        // Sign-in
        await ims.clickSignin(page);

        if (props.tag === '@gnav-multi-signin') {
          const multiSigninBtn = page.locator(selectors['@gnav-multi-signin']);
          await expect(multiSigninBtn).toBeVisible();
          await multiSigninBtn.click();
        }

        if (props.url.includes('bacom--adobecom')) {
          await page.waitForURL('**/auth-stg1.services.adobe.com/en_US/index.html**/');
          await expect(page).toHaveURL(/.*auth-stg1.services.adobe.com/);
        } else {
          await page.waitForURL('**/auth.services.adobe.com/en_US/index.html**/');
          await expect(page).toHaveURL(/.*auth.services.adobe.com/);
        }
        await ims.fillOutSignInForm(props, page, context, browser);

        if (props.tag === '@gnav-multi-signin') {
          // Open App Launcher
          const appLauncher = page.locator(selectors['@gnav-app-launcher']);
          await expect(appLauncher).toBeVisible();
          await appLauncher.click();

          // Verify the list of apps is available and all are showing.
          const appsList = await page.locator(selectors['@app-launcher-list']).count();
          expect(appsList).toEqual(12);

          // Verify the apps can be clicked and navigated too.
          const ccApp = page.locator(selectors['@cc-app-launcher']);
          await expect(ccApp).toBeVisible();

          const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            await ccApp.click(), // Opens a new tab
          ]);
          await newPage.waitForLoadState();
          await newPage.waitForURL('https://creativecloud.adobe.com/?context=home_cc&locale=en');
          await expect(newPage).toHaveURL(/.*creativecloud.adobe.com\/\?context=home_cc&locale=en/);
        }

        // Sign-out

        // Chromium/WebKit issue on prod, Access Denied error happens unless on VPN.
        // Some type of state or permission is blocking the successful redirection of sign-out.
        // Once issue is fixed, this temporary conditional can be removed.
        // Issue only happens on WebKit when signing out from BACOM Prod environment.
        if ((browser.browserType().name() === 'firefox' && props.url.includes('business.adobe.com'))) {
          await page.locator(selectors['@gnav-profile-button']).click();
          const viewAccount = page.locator(selectors['@gnav-viewaccount']);
          expect(viewAccount).toBeVisible();
          const signoutBtn = page.locator(selectors['@gnav-signout']);
          expect(signoutBtn).toBeVisible();
          await signoutBtn.click();
          await page.waitForURL(`${props.url}#`);
          expect(page).toHaveURL(`${props.url}#`);

          const signinBtn = page.locator(selectors['@gnav-signin']);
          await expect(signinBtn).toBeVisible();
        }
      });
    }

    if (props.tag === '@gnav-multi-signin') {
      test(`${props.title} (Drop-Down Options Check)`, async ({ page }) => {
        await page.goto(props.url);

        // Sign-in
        await ims.clickSignin(page);
        const ecSigninBtn = page.locator(selectors['@gnav-ec-signin']);
        await expect(ecSigninBtn).toBeVisible();
        const commSigninBtn = page.locator(selectors['@gnav-comm-signin']);
        await expect(commSigninBtn).toBeVisible();
        await ecSigninBtn.click();
        await page.waitForURL(/.*auth.services.adobe.com\/en_US.*/);
        await expect(page).toHaveURL(/.*auth.services.adobe.com/);
      });
    }
  });
});
