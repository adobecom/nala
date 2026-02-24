module.exports = {
  name: 'Primary Product Name Dropdown',
  features: [
    // =====================================================
    // FUNCTIONAL REQUIREMENTS - TC-001 to TC-005
    // =====================================================
    {
      tcid: '1',
      name: '@ppn-dropdown: Verify dropdown displays predefined values',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: {
        expectedProperties: ['primaryProductName', 'Footer-source'],
        placeholderProperty: 'Select property',
        placeholderValue: 'Select value',
      },
      tags: '@tc1 @ppn-dropdown @functional @smoke @regression @bacom',
    },
    {
      tcid: '2',
      name: '@ppn-dropdown: Verify author can select value from dropdown',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: {
        property: 'primaryProductName',
        valueToSelect: 'Adobe Acrobat',
      },
      tags: '@tc2 @ppn-dropdown @functional @smoke @regression @bacom',
    },
    {
      tcid: '3',
      name: '@ppn-dropdown: Verify free text input is not permitted',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: {
        property: 'primaryProductName',
        freeTextInput: 'InvalidCustomValue123',
      },
      tags: '@tc3 @ppn-dropdown @functional @smoke @regression @bacom',
    },
    {
      tcid: '4',
      name: '@ppn-dropdown: Verify selected value populates metadata field',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: {
        property: 'primaryProductName',
        valueToSelect: 'Adobe Creative Cloud',
      },
      tags: '@tc4 @ppn-dropdown @functional @smoke @regression @bacom',
    },
    {
      tcid: '5',
      name: '@ppn-dropdown: Verify metadata builder opens from library',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: {},
      tags: '@tc5 @ppn-dropdown @functional @smoke @regression @bacom',
    },

    // =====================================================
    // BUG REGRESSION TESTS - TC-006 to TC-009
    // =====================================================
    {
      tcid: '6',
      name: '@ppn-dropdown: Bug1 - No empty values in dropdown for properties with fewer values',
      path: '/drafts/nala/blocks/ppn-dropdown/multi-property',
      data: {
        propertyWithFewerValues: 'Footer-source',
        propertyWithMoreValues: 'primaryProductName',
      },
      tags: '@tc6 @ppn-dropdown @bug-regression @bug1 @regression @bacom',
    },
    {
      tcid: '7',
      name: '@ppn-dropdown: Bug2 - Value resets when switching properties',
      path: '/drafts/nala/blocks/ppn-dropdown/multi-property',
      data: {
        firstProperty: 'primaryProductName',
        firstValueIndex: 10,
        secondProperty: 'Footer-source',
        placeholderValue: 'Select value',
      },
      tags: '@tc7 @ppn-dropdown @bug-regression @bug2 @regression @bacom',
    },
    {
      tcid: '8',
      name: '@ppn-dropdown: Bug3 - Cannot add property without selecting valid value',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: { property: 'primaryProductName' },
      tags: '@tc8 @ppn-dropdown @bug-regression @bug3 @regression @bacom',
    },
    {
      tcid: '9',
      name: '@ppn-dropdown: Bug4 - Dropdown shows all values after placeholder selection flow',
      path: '/drafts/nala/blocks/ppn-dropdown/multi-property',
      data: {
        property: 'primaryProductName',
        placeholderProperty: 'Select property',
        placeholderValue: 'Select value',
      },
      tags: '@tc9 @ppn-dropdown @bug-regression @bug4 @deferred @regression @bacom',
    },

    // =====================================================
    // NON-FUNCTIONAL REQUIREMENTS - TC-010 to TC-011
    // =====================================================
    {
      tcid: '10',
      name: '@ppn-dropdown: Verify seamless integration within DA UI',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: {},
      tags: '@tc10 @ppn-dropdown @non-functional @integration @regression @bacom',
    },
    {
      tcid: '11',
      name: '@ppn-dropdown: Verify governance - dropdown cannot be circumvented',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: { property: 'primaryProductName' },
      tags: '@tc11 @ppn-dropdown @non-functional @governance @regression @bacom',
    },

    // =====================================================
    // EDGE CASES - TC-012 to TC-014
    // =====================================================
    {
      tcid: '12',
      name: '@ppn-dropdown: Verify multiple property-value pairs can be added',
      path: '/drafts/nala/blocks/ppn-dropdown/multi-property',
      data: {
        pairs: [
          { property: 'primaryProductName', value: 'Adobe Acrobat' },
          { property: 'Footer-source', value: 'bacom' },
        ],
      },
      tags: '@tc12 @ppn-dropdown @edge-case @regression @bacom',
    },
    {
      tcid: '13',
      name: '@ppn-dropdown: Verify property-value pair can be removed',
      path: '/drafts/nala/blocks/ppn-dropdown/basic',
      data: {
        property: 'primaryProductName',
        value: 'Adobe Acrobat',
      },
      tags: '@tc13 @ppn-dropdown @edge-case @regression @bacom',
    },
    {
      tcid: '14',
      name: '@ppn-dropdown: Verify metadata block error when in first section',
      path: '/drafts/nala/blocks/ppn-dropdown/first-section-error',
      data: {},
      tags: '@tc14 @ppn-dropdown @edge-case @negative @regression @bacom',
    },
  ],
};
