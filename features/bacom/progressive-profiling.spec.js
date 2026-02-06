/**
 * BACOM Progressive Profiling Feature Definitions
 *
 * Test Coverage:
 * - Unknown user field visibility across all form types
 * - Known user pre-fill and progressive field behavior
 * - Form journeys: Short→Medium, Short→RFI, Medium→RFI
 *
 * Form Types:
 * - Short (Essential DX): Basic fields (Email, Name, Company, Country)
 * - Medium (Expanded DX): Basic + Job fields (JobTitle, FunctionalArea)
 * - RFI (Contact/Full): All fields including contact details
 *
 * Browser/Platform Requirements (Non-Functional):
 * - Chrome (Desktop) - Primary browser
 * - Firefox (Desktop)
 * - Safari/WebKit (Desktop)
 * Tests run on all 3 browsers via bacom.config.js projects
 *
 * Email Requirement:
 * - Use @adobetest.com emails (e.g., xiasun+test001@adobetest.com)
 */

module.exports = {
  name: 'BACOM Progressive Profiling',
  features: [
    // =========================================================================
    // UNKNOWN USER TESTS - Verify all fields are visible, no pre-fill
    // =========================================================================
    {
      tcid: '0',
      name: '@PP-Unknown-ShortForm-DX',
      url: 'https://business.adobe.com/resources/form-test-1-essential-dx-stage.html',
      description: 'Unknown user visits Short DX form - all Short fields visible, no pre-fill',
      tags: '@bacom @progressive-profiling @unknown @short @dx @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      formType: 'short',
      userState: 'unknown',
    },
    {
      tcid: '1',
      name: '@PP-Unknown-MediumForm-DX',
      url: 'https://business.adobe.com/resources/form-test-2-expanded-dx-stage.html',
      description: 'Unknown user visits Medium DX form - all Medium fields visible, no pre-fill',
      tags: '@bacom @progressive-profiling @unknown @medium @dx @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      formType: 'medium',
      userState: 'unknown',
    },
    {
      tcid: '2',
      name: '@PP-Unknown-RFIForm',
      url: 'https://business.adobe.com/resources/form-test-5-stage.html',
      description: 'Unknown user visits RFI form - all RFI fields visible, no pre-fill',
      tags: '@bacom @progressive-profiling @unknown @rfi @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      formType: 'rfi',
      userState: 'unknown',
    },

    // =========================================================================
    // JOURNEY TESTS - Short to Medium Form
    // =========================================================================
    {
      tcid: '3',
      name: '@PP-Journey-ShortToMedium',
      description: 'User fills Short DX form, then visits Medium DX form - basic fields pre-filled',
      tags: '@bacom @progressive-profiling @journey @short-to-medium @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      journey: {
        firstForm: {
          type: 'short',
          url: 'https://business.adobe.com/resources/form-test-1-essential-dx-stage.html',
        },
        secondForm: {
          type: 'medium',
          url: 'https://business.adobe.com/resources/form-test-2-expanded-dx-stage.html',
        },
      },
    },

    // =========================================================================
    // JOURNEY TESTS - Short to RFI Form
    // =========================================================================
    {
      tcid: '4',
      name: '@PP-Journey-ShortToRFI',
      description: 'User fills Short DX form, then visits RFI form - basic fields pre-filled',
      tags: '@bacom @progressive-profiling @journey @short-to-rfi @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      journey: {
        firstForm: {
          type: 'short',
          url: 'https://business.adobe.com/resources/form-test-1-essential-dx-stage.html',
        },
        secondForm: {
          type: 'rfi',
          url: 'https://business.adobe.com/resources/form-test-5-stage.html',
        },
      },
    },

    // =========================================================================
    // JOURNEY TESTS - Medium to RFI Form
    // =========================================================================
    {
      tcid: '5',
      name: '@PP-Journey-MediumToRFI',
      description: 'User fills Medium DX form, then visits RFI form',
      tags: '@bacom @progressive-profiling @journey @medium-to-rfi @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      journey: {
        firstForm: {
          type: 'medium',
          url: 'https://business.adobe.com/resources/form-test-2-expanded-dx-stage.html',
        },
        secondForm: {
          type: 'rfi',
          url: 'https://business.adobe.com/resources/form-test-5-stage.html',
        },
      },
    },

    // =========================================================================
    // FORM SUBMISSION TESTS - Verify form can be submitted successfully
    // =========================================================================
    {
      tcid: '6',
      name: '@PP-Submit-ShortForm',
      description: 'Submit Short DX form and verify redirect to thank you page',
      tags: '@bacom @progressive-profiling @submit @short @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      url: 'https://business.adobe.com/resources/form-test-1-essential-dx-stage.html',
      formType: 'short',
      testSubmission: true,
    },
    {
      tcid: '7',
      name: '@PP-Submit-MediumForm',
      description: 'Submit Medium DX form and verify redirect to thank you page',
      tags: '@bacom @progressive-profiling @submit @medium @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      url: 'https://business.adobe.com/resources/form-test-2-expanded-dx-stage.html',
      formType: 'medium',
      testSubmission: true,
    },
    {
      tcid: '8',
      name: '@PP-Submit-RFIForm',
      description: 'Submit RFI form and verify redirect to thank you page',
      tags: '@bacom @progressive-profiling @submit @rfi @smoke @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      url: 'https://business.adobe.com/resources/form-test-5-stage.html',
      formType: 'rfi',
      testSubmission: true,
    },

    // =========================================================================
    // EDGE CASE TESTS
    // =========================================================================
    {
      tcid: '9',
      name: '@PP-EdgeCase-ClearedCookies',
      description: 'Verify form behaves as unknown user after cookies are cleared',
      tags: '@bacom @progressive-profiling @edge-case @regression',
      data: 'data/bacom/progressive-profiling/test-data.yml',
      url: 'https://business.adobe.com/resources/form-test-2-expanded-dx-stage.html',
      formType: 'medium',
      testCookieClear: true,
    },
  ],
};
