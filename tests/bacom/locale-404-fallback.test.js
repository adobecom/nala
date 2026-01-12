import { expect, test } from '@playwright/test';
import { features } from '../../features/bacom/locale-404-fallback.spec.js';

const BASE_URL = 'https://business.stage.adobe.com';

/**
 * Test helper to verify redirect behavior
 * @param {string} sourceUrl - The URL to request
 * @param {string} expectedBaseSite - The expected base site to redirect to (e.g., '/', '/de', '/fr')
 * @param {string} testPath - The test path being used
 * @param {boolean} isCompleteRedirect - Whether this is a complete site redirect (301 for any path)
 */
async function verifyRedirect(sourceUrl, expectedBaseSite, testPath, isCompleteRedirect = false) {
  const response = await fetch(sourceUrl, {
    method: 'GET',
    redirect: 'manual',
  });

  const location = response.headers.get('location');

  // For 404 fallback: expect 301 redirect
  // For complete redirects: expect 301 redirect
  expect(response.status, `Expected 301 redirect for ${sourceUrl}`).toBe(301);
  expect(location, `Expected location header for ${sourceUrl}`).toBeTruthy();

  if (isCompleteRedirect) {
    // For complete redirects, any path should redirect to the base site root
    const expectedUrl = expectedBaseSite === '/'
      ? `${BASE_URL}/`
      : `${BASE_URL}${expectedBaseSite}/`;
    expect(
      location.startsWith(expectedUrl) || location === expectedUrl || location === `${BASE_URL}/`,
      `Expected redirect to ${expectedUrl}, got ${location}`,
    ).toBe(true);
  } else {
    // For 404 fallback, the path should be preserved but locale changed
    // Handle root base site (/) to avoid double slashes
    const expectedUrl = expectedBaseSite === '/'
      ? `${BASE_URL}${testPath}`
      : `${BASE_URL}${expectedBaseSite}${testPath}`;
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
      async () => {
        const sourceUrl = `${BASE_URL}${locale}${test0.testPath}`;
        await verifyRedirect(sourceUrl, baseSite, test0.testPath, false);
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
      async () => {
        const sourceUrl = `${BASE_URL}${locale}${test1.testPath}`;
        await verifyRedirect(sourceUrl, baseSite, test1.testPath, false);
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
      async () => {
        const sourceUrl = `${BASE_URL}${locale}${test2.testPath}`;
        await verifyRedirect(sourceUrl, baseSite, test2.testPath, false);
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
      async () => {
        const sourceUrl = `${BASE_URL}${locale}${test3.testPath}`;
        await verifyRedirect(sourceUrl, baseSite, test3.testPath, false);
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
      async () => {
        const sourceUrl = `${BASE_URL}${locale}${test4.testPath}`;
        await verifyRedirect(sourceUrl, baseSite, test4.testPath, false);
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
      async () => {
        const sourceUrl = `${BASE_URL}${locale}${test5.testPath}`;
        await verifyRedirect(sourceUrl, baseSite, test5.testPath, false);
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
      async () => {
        const sourceUrl = `${BASE_URL}${locale}${test6.testPath}`;
        await verifyRedirect(sourceUrl, baseSite, test6.testPath, true);
      },
    );
  });

  // Additional test: verify the locale root also redirects
  test6.locales.forEach(({ locale, baseSite }) => {
    test(
      `Verify complete 301 redirect (root): ${locale}/ -> ${baseSite} | tags: ${test6.tags}`,
      async () => {
        const sourceUrl = `${BASE_URL}${locale}/`;
        const response = await fetch(sourceUrl, {
          method: 'GET',
          redirect: 'manual',
        });

        const location = response.headers.get('location');

        expect(response.status, `Expected 301 redirect for ${sourceUrl}`).toBe(301);
        expect(location, `Expected location header for ${sourceUrl}`).toBeTruthy();

        const expectedUrl = baseSite === '/'
          ? `${BASE_URL}/`
          : `${BASE_URL}${baseSite}/`;
        expect(
          location.startsWith(expectedUrl) || location === expectedUrl || location === `${BASE_URL}/`,
          `Expected redirect to ${expectedUrl}, got ${location}`,
        ).toBe(true);
      },
    );
  });
});

