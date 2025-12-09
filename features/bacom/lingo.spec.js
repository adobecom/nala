module.exports = {
  name: 'BACOM Language-First Site (Lingo) Link Transformation',
  features: [
    // Test 0: Baseline GNav/Footer test
    {
      tcid: '0',
      name: '@BACOM-Lingo-GNav-Footer-Modal',
      path: 'gnav-footer-modal',
      tags: '@bacom @lingo @gnav @feds @header @footer @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 1: English US / (Root)
    {
      tcid: '1',
      name: '@BACOM-Lingo-English-US-Root',
      path: 'en-us',
      tags: '@bacom @lingo @link-transform @english @us @root @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 2: English India /in (Full Site)
    {
      tcid: '2',
      name: '@BACOM-Lingo-English-IN-India',
      path: 'en-in',
      tags: '@bacom @lingo @link-transform @english @in @india @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 3: Spanish Base /es
    {
      tcid: '3',
      name: '@BACOM-Lingo-Spanish-ES-Base',
      path: 'es',
      tags: '@bacom @lingo @link-transform @spanish @es @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 4: Spanish Regional /ar - .aem.live (query-index)
    {
      tcid: '4',
      name: '@BACOM-Lingo-Spanish-AR-Live',
      path: 'es-ar-live',
      tags: '@bacom @lingo @link-transform @spanish @ar @regional @live @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 5: Spanish Regional /ar - .aem.page (preview-index)
    {
      tcid: '5',
      name: '@BACOM-Lingo-Spanish-AR-Page',
      path: 'es-ar-page',
      tags: '@bacom @lingo @link-transform @spanish @ar @regional @page @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 6: Spanish Regional /mx - .aem.live (query-index)
    {
      tcid: '6',
      name: '@BACOM-Lingo-Spanish-MX-Live',
      path: 'es-mx-live',
      tags: '@bacom @lingo @link-transform @spanish @mx @regional @live @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 7: Spanish Regional /mx - .aem.page (preview-index)
    {
      tcid: '7',
      name: '@BACOM-Lingo-Spanish-MX-Page',
      path: 'es-mx-page',
      tags: '@bacom @lingo @link-transform @spanish @mx @regional @page @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 8: German Base /de
    {
      tcid: '8',
      name: '@BACOM-Lingo-German-DE-Base',
      path: 'de',
      tags: '@bacom @lingo @link-transform @german @de @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 9: German Regional /at - .aem.live (query-index)
    {
      tcid: '9',
      name: '@BACOM-Lingo-German-AT-Live',
      path: 'de-at-live',
      tags: '@bacom @lingo @link-transform @german @at @regional @live @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 10: German Regional /at - .aem.page (preview-index)
    {
      tcid: '10',
      name: '@BACOM-Lingo-German-AT-Page',
      path: 'de-at-page',
      tags: '@bacom @lingo @link-transform @german @at @regional @page @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 11: French Base /fr
    {
      tcid: '11',
      name: '@BACOM-Lingo-French-FR-Base',
      path: 'fr',
      tags: '@bacom @lingo @link-transform @french @fr @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 12: Italian /it
    {
      tcid: '12',
      name: '@BACOM-Lingo-Italian-IT',
      path: 'it',
      tags: '@bacom @lingo @link-transform @italian @it @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 13: Portuguese Base /pt
    {
      tcid: '13',
      name: '@BACOM-Lingo-Portuguese-PT-Base',
      path: 'pt',
      tags: '@bacom @lingo @link-transform @portuguese @pt @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 14: Japanese /jp (Full Site)
    {
      tcid: '14',
      name: '@BACOM-Lingo-Japanese-JP',
      path: 'jp',
      tags: '@bacom @lingo @link-transform @japanese @jp @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 15: Korean /kr (Full Site)
    {
      tcid: '15',
      name: '@BACOM-Lingo-Korean-KR',
      path: 'kr',
      tags: '@bacom @lingo @link-transform @korean @kr @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 16: English UK /uk (Full Site)
    {
      tcid: '16',
      name: '@BACOM-Lingo-English-UK',
      path: 'en-uk',
      tags: '@bacom @lingo @link-transform @english @uk @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // Test 17: English Australia /au (Full Site)
    {
      tcid: '17',
      name: '@BACOM-Lingo-English-AU',
      path: 'en-au',
      tags: '@bacom @lingo @link-transform @english @au @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
  ],
};
