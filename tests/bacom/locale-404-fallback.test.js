import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/locale-404-fallback.spec.js';

/**
 * Test helper to verify redirect behavior
 * @param {string} baseURL - The base URL from config
 * @param {string} sourceUrl - The URL to request
 * @param {string} expectedBaseSite - The expected base site to redirect to (e.g., '/', '/de', '/fr')
 * @param {string} testPath - The test path being used
 * @param {boolean} isCompleteRedirect - Whether this is a complete site redirect (301 for any path)
 */
async function verifyRedirect(baseURL, sourceUrl, expectedBaseSite, testPath, isCompleteRedirect = false) {
  // Calculate expected URL for logging
  let expectedUrl;
  if (isCompleteRedirect) {
    expectedUrl = expectedBaseSite === '/'
      ? `${baseURL}/`
      : `${baseURL}${expectedBaseSite}/`;
  } else {
    expectedUrl = expectedBaseSite === '/'
      ? `${baseURL}${testPath}`
      : `${baseURL}${expectedBaseSite}${testPath}`;
  }

  console.info(`[Test URL]: ${sourceUrl}`);
  console.info(`[Expected Redirect]: ${expectedUrl}`);

  const response = await fetch(sourceUrl, {
    method: 'GET',
    redirect: 'manual',
  });

  const location = response.headers.get('location');
  console.info(`[Actual Redirect]: ${location}`);

  // For 404 fallback: expect 301 redirect
  // For complete redirects: expect 301 redirect
  expect(response.status, `Expected 301 redirect for ${sourceUrl}`).toBe(301);
  expect(location, `Expected location header for ${sourceUrl}`).toBeTruthy();

  if (isCompleteRedirect) {
    expect(
      location.startsWith(expectedUrl) || location === expectedUrl || location === `${baseURL}/`,
      `Expected redirect to ${expectedUrl}, got ${location}`,
    ).toBe(true);
  } else {
    expect(
      location,
      `Expected redirect to ${expectedUrl}, got ${location}`,
    ).toBe(expectedUrl);
  }
}

// Test 0: 404 fallback to root (/)
const test0 = features[0];
test.describe(`${test0.name} @${test0.tcid}`, () => {
  test0.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify 404 fallback: ${locale} -> ${baseSite} | tags: ${test0.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}${test0.testPath}`;
        await verifyRedirect(baseURL, sourceUrl, baseSite, test0.testPath, false);
      },
    );
  });
});

// Test 1: 404 fallback to German (/de)
const test1 = features[1];
test.describe(`${test1.name} @${test1.tcid}`, () => {
  test1.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify 404 fallback: ${locale} -> ${baseSite} | tags: ${test1.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}${test1.testPath}`;
        await verifyRedirect(baseURL, sourceUrl, baseSite, test1.testPath, false);
      },
    );
  });
});

// Test 2: 404 fallback to Spanish (/es)
const test2 = features[2];
test.describe(`${test2.name} @${test2.tcid}`, () => {
  test2.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify 404 fallback: ${locale} -> ${baseSite} | tags: ${test2.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}${test2.testPath}`;
        await verifyRedirect(baseURL, sourceUrl, baseSite, test2.testPath, false);
      },
    );
  });
});

// Test 3: 404 fallback to French (/fr)
const test3 = features[3];
test.describe(`${test3.name} @${test3.tcid}`, () => {
  test3.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify 404 fallback: ${locale} -> ${baseSite} | tags: ${test3.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}${test3.testPath}`;
        await verifyRedirect(baseURL, sourceUrl, baseSite, test3.testPath, false);
      },
    );
  });
});

// Test 4: 404 fallback to Italian (/it)
const test4 = features[4];
test.describe(`${test4.name} @${test4.tcid}`, () => {
  test4.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify 404 fallback: ${locale} -> ${baseSite} | tags: ${test4.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}${test4.testPath}`;
        await verifyRedirect(baseURL, sourceUrl, baseSite, test4.testPath, false);
      },
    );
  });
});

// Test 5: 404 fallback to Portuguese (/pt)
const test5 = features[5];
test.describe(`${test5.name} @${test5.tcid}`, () => {
  test5.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify 404 fallback: ${locale} -> ${baseSite} | tags: ${test5.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}${test5.testPath}`;
        await verifyRedirect(baseURL, sourceUrl, baseSite, test5.testPath, false);
      },
    );
  });
});

// Test 6: Complete 301 redirects to root
const test6 = features[6];
test.describe(`${test6.name} @${test6.tcid}`, () => {
  test6.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify complete 301 redirect: ${locale}/* -> ${baseSite} | tags: ${test6.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}${test6.testPath}`;
        await verifyRedirect(baseURL, sourceUrl, baseSite, test6.testPath, true);
      },
    );
  });

  // Additional test: verify the locale root also redirects
  test6.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify complete 301 redirect (root): ${locale}/ -> ${baseSite} | tags: ${test6.tags}`,
      async ({ baseURL }) => {
        const sourceUrl = `${baseURL}${locale}/`;
        const expectedUrl = baseSite === '/'
          ? `${baseURL}/`
          : `${baseURL}${baseSite}/`;

        console.info(`[Test URL]: ${sourceUrl}`);
        console.info(`[Expected Redirect]: ${expectedUrl}`);

        const response = await fetch(sourceUrl, {
          method: 'GET',
          redirect: 'manual',
        });

        const location = response.headers.get('location');
        console.info(`[Actual Redirect]: ${location}`);

        expect(response.status, `Expected 301 redirect for ${sourceUrl}`).toBe(301);
        expect(location, `Expected location header for ${sourceUrl}`).toBeTruthy();

        expect(
          location.startsWith(expectedUrl) || location === expectedUrl || location === `${baseURL}/`,
          `Expected redirect to ${expectedUrl}, got ${location}`,
        ).toBe(true);
      },
    );
  });
});
