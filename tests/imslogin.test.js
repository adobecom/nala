import { expect, test } from '@playwright/test';
import credentials from '../credentials/imslogin.creds';
import imslogin from '../features/imslogin.spec';
import parse from '../features/parse';
import selectors from '../selectors/imslogin.selectors';

// Parse the feature file into something flat that can be tested separately
const parsed = parse(imslogin);

test.describe(`${parsed.name}`, () => {
  parsed.features.forEach((props) => {
    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;

    if(props.tag === '@gnav-signin') {
      test(title, async ({ page, browser }) => {
        await page.goto(props.url);

        //Sign-in
        let signinBtn = page.locator(selectors[props.tag]);
        await expect(signinBtn).toBeVisible();
        await signinBtn.click();
        if(props.env == '@bacom') {
          await page.waitForURL('**\/auth-stg1.services.adobe.com/en_US/index.html**\/');
          await expect(page).toHaveURL(/.*auth-stg1.services.adobe.com/);
        } else {
          await page.waitForURL('**\/auth.services.adobe.com/en_US/index.html**\/');
          await expect(page).toHaveURL(/.*auth.services.adobe.com/);
        }
        await expect(page).toHaveTitle(/Adobe ID/);
        let heading = await page.locator(selectors['@page-heading']).first().innerText();
        expect(heading).toBe("Sign in");

        //Fill out Sign-in Form
        await page.locator(selectors['@email']).fill(credentials['@username']);
        await page.locator(selectors['@email-continue-btn']).click();
        if(browser.browserType().name() != 'firefox')
          await page.waitForURL(`**\/password`);
        heading = await page.locator(selectors['@page-heading'], { hasText: 'Enter your password' }).first().innerText();
        expect(heading).toBe("Enter your password");
        await page.locator(selectors['@password']).fill(credentials['@password']);
        await page.locator(selectors['@password-continue-btn']).click();
        await page.waitForURL(`${props.url}#`);
        await expect(page).toHaveTitle(/Princess Cruises entertains\.*.*/);
        await expect(page).toHaveURL(`${props.url}#`);

        //Sign-out Milo
        await page.locator(selectors['@gnav-profile-button']).click();
        const viewAccount = page.locator(selectors['@gnav-viewaccount']);
        const signoutBtn = page.locator(selectors['@gnav-signout']);
        expect(viewAccount).toBeVisible();
        expect(signoutBtn).toBeVisible();
        await signoutBtn.click();
        await page.waitForURL(`${props.url}#`);
        await expect(page).toHaveTitle(/Princess Cruises entertains\.*.*/);
        expect(page).toHaveURL(`${props.url}#`);
        signinBtn = page.locator(selectors[props.tag]);
        await expect(signinBtn).toBeVisible();
      });
    }

    // if(props.tag === '@apple-signin') {
    //   test(title, async ({ page }) => {
    //     await page.goto(props.url);
    //   });
    // }

    // if(props.tag === '@google-signin') {
    //   test(title, async ({ page }) => {
    //     await page.goto(props.url);
    //   });
    // }

    // if(props.tag === '@facebook-signin') {
    //   test(title, async ({ page }) => {
    //     await page.goto(props.url);
    //   });
    // }
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
