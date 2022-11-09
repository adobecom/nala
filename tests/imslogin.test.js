import { expect, test } from '@playwright/test';
import imslogin from '../features/imslogin.spec.js';
import parse from '../features/parse.js';
import selectors from '../selectors/imslogin.selectors.js';

// Parse the feature file into something flat that can be tested separately
const { name, features } = parse(imslogin);

// Test Utils
async function checkPageTitle(testTag, page) {
  if (testTag === '@gnav-multi-signin') {
    await expect(page).toHaveTitle(/Intro Text/);
  } else {
    await expect(page).toHaveTitle(/Princess Cruises entertains\.*.*/);
  }
}

async function clickSignin(page) {
  const signinBtn = page.locator(selectors['@gnav-signin']);
  await expect(signinBtn).toBeVisible();
  await signinBtn.click();
}

test.describe(`${name}`, () => {
  features.forEach((props) => {
    if (props.tag === '@gnav-signin' || props.tag === '@gnav-multi-signin') {
      test(props.title, async ({ page }) => {
        expect(process.env.IMS_EMAIL, 'ERROR: No environment variable for email provided for IMS Test.').toBeTruthy();
        expect(process.env.IMS_PASS, 'ERROR: No environment variable for password provided for IMS Test.').toBeTruthy();
        await page.goto(props.url);

        // Sign-in
        clickSignin(page);

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
        await expect(page).toHaveTitle(/Adobe ID/);
        let heading = await page.locator(selectors['@page-heading']).first().innerText();
        expect(heading).toBe('Sign in');

        // Fill out Sign-in Form
        await page.locator(selectors['@email']).fill(process.env.IMS_EMAIL);
        await page.locator(selectors['@email-continue-btn']).click();
        await expect(page.locator(selectors['@password-reset'])).toBeVisible({ timeout: 45000 }); // Timeout accounting for how long IMS Login AEM page takes to switch form
        heading = await page.locator(selectors['@page-heading'], { hasText: 'Enter your password' }).first().innerText();
        expect(heading).toBe('Enter your password');
        await page.locator(selectors['@password']).fill(process.env.IMS_PASS);
        await page.locator(selectors['@password-continue-btn']).click();
        await page.waitForURL(`${props.url}#`);
        await expect(page).toHaveURL(`${props.url}#`);

        checkPageTitle(props.tag, page);

        // Sign-out Milo
        await page.locator(selectors['@gnav-profile-button']).click();
        const viewAccount = page.locator(selectors['@gnav-viewaccount']);
        expect(viewAccount).toBeVisible();
        const signoutBtn = page.locator(selectors['@gnav-signout']);
        expect(signoutBtn).toBeVisible();
        await signoutBtn.click();
        await page.waitForURL(`${props.url}#`);
        expect(page).toHaveURL(`${props.url}#`);

        checkPageTitle(props.tag, page);

        const signinBtn = page.locator(selectors['@gnav-signin']);
        await expect(signinBtn).toBeVisible();
      });
    }

    if (props.tag === '@gnav-multi-signin') {
      test(`${props.title} (Drop-Down Options Check)`, async ({ page }) => {
        await page.goto(props.url);

        // Sign-in
        clickSignin(page);
        const ecSigninBtn = page.locator(selectors['@gnav-ec-signin']);
        await expect(ecSigninBtn).toBeVisible();
        const commSigninBtn = page.locator(selectors['@gnav-comm-signin']);
        await expect(commSigninBtn).toBeVisible();
        await ecSigninBtn.click();
        await page.waitForURL('**/auth.services.adobe.com/en_US/index.html**/');
        await expect(page).toHaveURL(/.*auth.services.adobe.com/);
      });
    }

    // if (props.tag === '@apple-signin') {
    //   test(props.title, async ({ page }) => {
    //     await page.goto(props.url);
    //     clickSignin(page);
    //   });
    // }

    // if (props.tag === '@google-signin') {
    //   test(props.title, async ({ page }) => {
    //     await page.goto(props.url);
    //     clickSignin(page);
    //   });
    // }

    // if (props.tag === '@facebook-signin') {
    //   test(props.title, async ({ page }) => {
    //     await page.goto(props.url);
    //     clickSignin(page);
    //   });
    // }
  });
});
