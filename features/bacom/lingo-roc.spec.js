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
      name: '@BACOM-Lingo-ROC-ES-LA-Full',
      path: 'es-la-swap',
      tags: '@bacom @lingo @roc @spanish @la @full @smoke',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'Spanish → Latin America - FULL FEATURE (4 fragments)',
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
    // NEGATIVE TEST - Non-LATAM region on /es/ should NOT get /la/ fragments
    // =========================================================================
    {
      tcid: '7',
      name: '@BACOM-Lingo-ROC-ES-NonLATAM-Negative',
      path: 'es-non-latam-negative',
      tags: '@bacom @lingo @roc @spanish @negative @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'Spanish with akamaiLocale=us (non-LATAM) - should NOT see /la/ fragments',
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

    // =========================================================================
    // LATAM MEP-LINGO TESTS
    // When visiting /es/ with a LATAM GeoIP, mep-lingo should pull /la/ fragments
    // Tests all 16 LATAM GeoIP codes
    // =========================================================================
    {
      tcid: '9',
      name: '@BACOM-Lingo-ROC-ES-LATAM-MX',
      path: 'es-latam-mx',
      tags: '@bacom @lingo @roc @meplingo @latam @mx @smoke',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=mx → should pull /la/ fragments (FULL)',
    },
    {
      tcid: '10',
      name: '@BACOM-Lingo-ROC-ES-LATAM-AR',
      path: 'es-latam-ar',
      tags: '@bacom @lingo @roc @meplingo @latam @ar @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=ar → should pull /la/ fragments',
    },
    {
      tcid: '11',
      name: '@BACOM-Lingo-ROC-ES-LATAM-CL',
      path: 'es-latam-cl',
      tags: '@bacom @lingo @roc @meplingo @latam @cl @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=cl → should pull /la/ fragments',
    },
    {
      tcid: '12',
      name: '@BACOM-Lingo-ROC-ES-LATAM-CO',
      path: 'es-latam-co',
      tags: '@bacom @lingo @roc @meplingo @latam @co @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=co → should pull /la/ fragments',
    },
    {
      tcid: '13',
      name: '@BACOM-Lingo-ROC-ES-LATAM-PE',
      path: 'es-latam-pe',
      tags: '@bacom @lingo @roc @meplingo @latam @pe @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=pe → should pull /la/ fragments',
    },
    {
      tcid: '14',
      name: '@BACOM-Lingo-ROC-ES-LATAM-BO',
      path: 'es-latam-bo',
      tags: '@bacom @lingo @roc @meplingo @latam @bo @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=bo → should pull /la/ fragments',
    },
    {
      tcid: '15',
      name: '@BACOM-Lingo-ROC-ES-LATAM-CR',
      path: 'es-latam-cr',
      tags: '@bacom @lingo @roc @meplingo @latam @cr @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=cr → should pull /la/ fragments',
    },
    {
      tcid: '16',
      name: '@BACOM-Lingo-ROC-ES-LATAM-DO',
      path: 'es-latam-do',
      tags: '@bacom @lingo @roc @meplingo @latam @do @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=do → should pull /la/ fragments',
    },
    {
      tcid: '17',
      name: '@BACOM-Lingo-ROC-ES-LATAM-EC',
      path: 'es-latam-ec',
      tags: '@bacom @lingo @roc @meplingo @latam @ec @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=ec → should pull /la/ fragments',
    },
    {
      tcid: '18',
      name: '@BACOM-Lingo-ROC-ES-LATAM-GT',
      path: 'es-latam-gt',
      tags: '@bacom @lingo @roc @meplingo @latam @gt @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=gt → should pull /la/ fragments',
    },
    {
      tcid: '19',
      name: '@BACOM-Lingo-ROC-ES-LATAM-PA',
      path: 'es-latam-pa',
      tags: '@bacom @lingo @roc @meplingo @latam @pa @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=pa → should pull /la/ fragments',
    },
    {
      tcid: '20',
      name: '@BACOM-Lingo-ROC-ES-LATAM-PR',
      path: 'es-latam-pr',
      tags: '@bacom @lingo @roc @meplingo @latam @pr @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=pr → should pull /la/ fragments',
    },
    {
      tcid: '21',
      name: '@BACOM-Lingo-ROC-ES-LATAM-PY',
      path: 'es-latam-py',
      tags: '@bacom @lingo @roc @meplingo @latam @py @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=py → should pull /la/ fragments',
    },
    {
      tcid: '22',
      name: '@BACOM-Lingo-ROC-ES-LATAM-SV',
      path: 'es-latam-sv',
      tags: '@bacom @lingo @roc @meplingo @latam @sv @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=sv → should pull /la/ fragments',
    },
    {
      tcid: '23',
      name: '@BACOM-Lingo-ROC-ES-LATAM-UY',
      path: 'es-latam-uy',
      tags: '@bacom @lingo @roc @meplingo @latam @uy @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=uy → should pull /la/ fragments',
    },
    {
      tcid: '24',
      name: '@BACOM-Lingo-ROC-ES-LATAM-VE',
      path: 'es-latam-ve',
      tags: '@bacom @lingo @roc @meplingo @latam @ve @regression',
      data: 'data/bacom/lingo/roc-fragment-urls.yml',
      description: 'mep-lingo on /es/ + GeoIP=ve → should pull /la/ fragments',
    },
  ],
};
