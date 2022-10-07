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
      test(title, async ({ page }) => {
        await page.goto(props.url);

        //Sign-in
        let signinBtn = page.locator(selectors[props.tag]);
        await expect(signinBtn).toBeVisible();
        await signinBtn.click();
        await expect(page).toHaveTitle(/Adobe ID/);
        expect(page.url).toContain('https://auth-stg1.services.adobe.com/en_US/index.html');
        let heading = page.locator(selectors['@page-heading']);
        expect(heading).toBe(/a/);

        //Fill out Sign-in Form
        await page.locator(selectors['@email']).fill(credentials['@username']);
        const continueBtn = await page.locator(selectors['@continue-button']).click();
        heading = page.locator(selectors['@page-heading']);
        expect(heading).toBe(/Enter your password/);
        await page.locator(selectors['@password']).fill(credentials['@password']);
        await continueBtn.click();
        expect(page.title).toContain(/Princess Cruises entertains/);
        expect(page).toHaveURL(`${props.url}#`);

        //View Account AEM
        await page.locator(selectors['@gnav-profile-button']).click();
        let viewAccount = page.locator(selectors['@gnav-viewaccount']);
        await expect(viewAccount).toBeVisible();
        await viewAccount.click();
        expect(page.title).toContain(/Adobe Account/);
        expect(page.url).toContain(/account.adobe.com/);
        const greeting = page.locator(selectors['@greeting']);
        expect(greeting).toBe(/Welcome to your account, Tester1/);
        await page.locator(selectors['@account-vw-profile-button']).click();
        viewAccount = page.locator(selectors['@account-vw-viewaccount']);
        await expect(viewAccount).toBeVisible();

        //Sign-out Milo
        await page.goto(props.url);
        await page.locator(selectors['@gnav-profile-button']).click();
        const signoutBtn = page.locator(selectors['@gnav-signout']);
        expect(signoutBtn).toBeVisible();
        await signoutBtn.click();
        expect(page.title).toContain(/Princess Cruises entertains/);
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
    page.close();
  });
});
