module.exports = {
  name: 'BACOM Lingo ROC (Region Only Content) Fragment Swapping',
  features: [
    // =========================================================================
    // FULL FEATURE TESTS - All mep-lingo fragments (textmeplingoblock, swapblock, sectionreplacement, noroc)
    // =========================================================================
    {
      tcid: '0',
      name: '@BACOM-Lingo-ROC-FR-CH-Full',
      path: 'fr-ch-swap',
      tags: '@bacom @lingo @roc @french @ch_fr @full @smoke',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'French → Swiss French - FULL FEATURE (4 fragments)',
    },
    {
      tcid: '1',
      name: '@BACOM-Lingo-ROC-ES-MX-Full',
      path: 'es-mx-swap',
      tags: '@bacom @lingo @roc @spanish @mx @full @smoke',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'Spanish → Mexico - FULL FEATURE (4 fragments)',
    },

    // =========================================================================
    // BASIC TESTS - textmeplingoblock only
    // =========================================================================
    {
      tcid: '2',
      name: '@BACOM-Lingo-ROC-FR-CA-Basic',
      path: 'fr-ca-swap',
      tags: '@bacom @lingo @roc @french @ca_fr @basic @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'French → Canadian French - textmeplingoblock only',
    },
    {
      tcid: '3',
      name: '@BACOM-Lingo-ROC-DE-AT-Basic',
      path: 'de-at-swap',
      tags: '@bacom @lingo @roc @german @at @basic @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'German → Austria - textmeplingoblock only',
    },
    {
      tcid: '4',
      name: '@BACOM-Lingo-ROC-DE-CH-Basic',
      path: 'de-ch-swap',
      tags: '@bacom @lingo @roc @german @ch_de @basic @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'German → Swiss German - textmeplingoblock only',
    },
    {
      tcid: '5',
      name: '@BACOM-Lingo-ROC-IT-CH-Basic',
      path: 'it-ch-swap',
      tags: '@bacom @lingo @roc @italian @ch_it @basic @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'Italian → Swiss Italian - textmeplingoblock only',
    },
    {
      tcid: '6',
      name: '@BACOM-Lingo-ROC-PT-BR-Basic',
      path: 'pt-br-swap',
      tags: '@bacom @lingo @roc @portuguese @br @basic @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'Portuguese → Brazil - textmeplingoblock only',
    },

    // =========================================================================
    // NEGATIVE TEST - Wrong region should NOT swap
    // =========================================================================
    {
      tcid: '7',
      name: '@BACOM-Lingo-ROC-ES-AR-Negative',
      path: 'es-ar-negative',
      tags: '@bacom @lingo @roc @spanish @ar @negative @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'Spanish with akamaiLocale=ar - should NOT see /mx fragments',
    },

    // =========================================================================
    // MULTIPLE FRAGMENTS TEST - base-all page
    // =========================================================================
    {
      tcid: '8',
      name: '@BACOM-Lingo-ROC-FR-CH-Multi',
      path: 'fr-ch-multi',
      tags: '@bacom @lingo @roc @french @ch_fr @multi @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'French → Swiss French - Multiple fragments (base-all page)',
    },
  ],
};
