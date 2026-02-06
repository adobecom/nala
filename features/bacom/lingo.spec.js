module.exports = {
  name: 'BACOM Language-First Site (Lingo) Link Transformation',
  features: [
    // =========================================================================
    // GNav/Footer Test
    // =========================================================================
    {
      tcid: '0',
      name: '@BACOM-Lingo-GNav-Footer-Modal',
      path: 'gnav-footer-modal',
      tags: '@bacom @lingo @gnav @feds @header @footer @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // ENGLISH - Full Sites
    // =========================================================================
    {
      tcid: '1',
      name: '@BACOM-Lingo-English-US-Root',
      path: 'en-us',
      tags: '@bacom @lingo @link-transform @english @us @root @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '2',
      name: '@BACOM-Lingo-English-IN-India',
      path: 'en-in',
      tags: '@bacom @lingo @link-transform @english @in @india @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '3',
      name: '@BACOM-Lingo-English-UK',
      path: 'en-uk',
      tags: '@bacom @lingo @link-transform @english @uk @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '4',
      name: '@BACOM-Lingo-English-AU',
      path: 'en-au',
      tags: '@bacom @lingo @link-transform @english @au @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // ENGLISH - Regional Locales (404 fallback to root /)
    // =========================================================================
    {
      tcid: '5',
      name: '@BACOM-Lingo-English-NZ',
      path: 'en-nz',
      tags: '@bacom @lingo @link-transform @english @nz @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '6',
      name: '@BACOM-Lingo-English-CA',
      path: 'en-ca',
      tags: '@bacom @lingo @link-transform @english @ca @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '7',
      name: '@BACOM-Lingo-English-IE',
      path: 'en-ie',
      tags: '@bacom @lingo @link-transform @english @ie @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '8',
      name: '@BACOM-Lingo-English-SG',
      path: 'en-sg',
      tags: '@bacom @lingo @link-transform @english @sg @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '9',
      name: '@BACOM-Lingo-English-HK',
      path: 'en-hk_en',
      tags: '@bacom @lingo @link-transform @english @hk_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '10',
      name: '@BACOM-Lingo-English-AE',
      path: 'en-ae_en',
      tags: '@bacom @lingo @link-transform @english @ae_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '11',
      name: '@BACOM-Lingo-English-BE',
      path: 'en-be_en',
      tags: '@bacom @lingo @link-transform @english @be_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '12',
      name: '@BACOM-Lingo-English-NL',
      path: 'en-nl',
      tags: '@bacom @lingo @link-transform @english @nl @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '13',
      name: '@BACOM-Lingo-English-SE',
      path: 'en-se',
      tags: '@bacom @lingo @link-transform @english @se @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '14',
      name: '@BACOM-Lingo-English-DK',
      path: 'en-dk',
      tags: '@bacom @lingo @link-transform @english @dk @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '15',
      name: '@BACOM-Lingo-English-NO',
      path: 'en-no',
      tags: '@bacom @lingo @link-transform @english @no @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '16',
      name: '@BACOM-Lingo-English-FI',
      path: 'en-fi',
      tags: '@bacom @lingo @link-transform @english @fi @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '17',
      name: '@BACOM-Lingo-English-PL',
      path: 'en-pl',
      tags: '@bacom @lingo @link-transform @english @pl @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '18',
      name: '@BACOM-Lingo-English-CZ',
      path: 'en-cz',
      tags: '@bacom @lingo @link-transform @english @cz @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '19',
      name: '@BACOM-Lingo-English-RO',
      path: 'en-ro',
      tags: '@bacom @lingo @link-transform @english @ro @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '20',
      name: '@BACOM-Lingo-English-BG',
      path: 'en-bg',
      tags: '@bacom @lingo @link-transform @english @bg @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '21',
      name: '@BACOM-Lingo-English-GR',
      path: 'en-gr_en',
      tags: '@bacom @lingo @link-transform @english @gr_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '22',
      name: '@BACOM-Lingo-English-TR',
      path: 'en-tr',
      tags: '@bacom @lingo @link-transform @english @tr @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '23',
      name: '@BACOM-Lingo-English-IL',
      path: 'en-il_en',
      tags: '@bacom @lingo @link-transform @english @il_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '24',
      name: '@BACOM-Lingo-English-SA',
      path: 'en-sa_en',
      tags: '@bacom @lingo @link-transform @english @sa_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '25',
      name: '@BACOM-Lingo-English-MENA',
      path: 'en-mena_en',
      tags: '@bacom @lingo @link-transform @english @mena_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '26',
      name: '@BACOM-Lingo-English-Africa',
      path: 'en-africa',
      tags: '@bacom @lingo @link-transform @english @africa @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '27',
      name: '@BACOM-Lingo-English-RU',
      path: 'en-ru',
      tags: '@bacom @lingo @link-transform @english @ru @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '28',
      name: '@BACOM-Lingo-English-UA',
      path: 'en-ua',
      tags: '@bacom @lingo @link-transform @english @ua @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '29',
      name: '@BACOM-Lingo-English-EE',
      path: 'en-ee',
      tags: '@bacom @lingo @link-transform @english @ee @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '30',
      name: '@BACOM-Lingo-English-SK',
      path: 'en-sk',
      tags: '@bacom @lingo @link-transform @english @sk @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '31',
      name: '@BACOM-Lingo-English-SI',
      path: 'en-si',
      tags: '@bacom @lingo @link-transform @english @si @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '32',
      name: '@BACOM-Lingo-English-LU',
      path: 'en-lu_en',
      tags: '@bacom @lingo @link-transform @english @lu_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '33',
      name: '@BACOM-Lingo-English-CN',
      path: 'en-cn',
      tags: '@bacom @lingo @link-transform @english @cn @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '34',
      name: '@BACOM-Lingo-English-TW',
      path: 'en-tw',
      tags: '@bacom @lingo @link-transform @english @tw @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '35',
      name: '@BACOM-Lingo-English-ID',
      path: 'en-id_en',
      tags: '@bacom @lingo @link-transform @english @id_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '36',
      name: '@BACOM-Lingo-English-MY',
      path: 'en-my_en',
      tags: '@bacom @lingo @link-transform @english @my_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '37',
      name: '@BACOM-Lingo-English-PH',
      path: 'en-ph_en',
      tags: '@bacom @lingo @link-transform @english @ph_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '38',
      name: '@BACOM-Lingo-English-TH',
      path: 'en-th_en',
      tags: '@bacom @lingo @link-transform @english @th_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '39',
      name: '@BACOM-Lingo-English-VN',
      path: 'en-vn_en',
      tags: '@bacom @lingo @link-transform @english @vn_en @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // SPANISH - Base and Regional (404 fallback to /es)
    // =========================================================================
    {
      tcid: '40',
      name: '@BACOM-Lingo-Spanish-ES-Base',
      path: 'es',
      tags: '@bacom @lingo @link-transform @spanish @es @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '41',
      name: '@BACOM-Lingo-Spanish-AR',
      path: 'es-ar',
      tags: '@bacom @lingo @link-transform @spanish @ar @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '42',
      name: '@BACOM-Lingo-Spanish-MX',
      path: 'es-mx',
      tags: '@bacom @lingo @link-transform @spanish @mx @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '43',
      name: '@BACOM-Lingo-Spanish-CL',
      path: 'es-cl',
      tags: '@bacom @lingo @link-transform @spanish @cl @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '44',
      name: '@BACOM-Lingo-Spanish-CO',
      path: 'es-co',
      tags: '@bacom @lingo @link-transform @spanish @co @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '45',
      name: '@BACOM-Lingo-Spanish-LA',
      path: 'es-la',
      tags: '@bacom @lingo @link-transform @spanish @la @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '46',
      name: '@BACOM-Lingo-Spanish-PE',
      path: 'es-pe',
      tags: '@bacom @lingo @link-transform @spanish @pe @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // GERMAN - Base and Regional (404 fallback to /de)
    // =========================================================================
    {
      tcid: '47',
      name: '@BACOM-Lingo-German-DE-Base',
      path: 'de',
      tags: '@bacom @lingo @link-transform @german @de @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '48',
      name: '@BACOM-Lingo-German-AT',
      path: 'de-at',
      tags: '@bacom @lingo @link-transform @german @at @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '49',
      name: '@BACOM-Lingo-German-CH',
      path: 'de-ch_de',
      tags: '@bacom @lingo @link-transform @german @ch_de @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '50',
      name: '@BACOM-Lingo-German-LU',
      path: 'de-lu_de',
      tags: '@bacom @lingo @link-transform @german @lu_de @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // FRENCH - Base and Regional (404 fallback to /fr)
    // =========================================================================
    {
      tcid: '51',
      name: '@BACOM-Lingo-French-FR-Base',
      path: 'fr',
      tags: '@bacom @lingo @link-transform @french @fr @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '52',
      name: '@BACOM-Lingo-French-CA',
      path: 'fr-ca_fr',
      tags: '@bacom @lingo @link-transform @french @ca_fr @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '53',
      name: '@BACOM-Lingo-French-BE',
      path: 'fr-be_fr',
      tags: '@bacom @lingo @link-transform @french @be_fr @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '54',
      name: '@BACOM-Lingo-French-CH',
      path: 'fr-ch_fr',
      tags: '@bacom @lingo @link-transform @french @ch_fr @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '55',
      name: '@BACOM-Lingo-French-LU',
      path: 'fr-lu_fr',
      tags: '@bacom @lingo @link-transform @french @lu_fr @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // ITALIAN - Base and Regional (404 fallback to /it)
    // =========================================================================
    {
      tcid: '56',
      name: '@BACOM-Lingo-Italian-IT-Base',
      path: 'it',
      tags: '@bacom @lingo @link-transform @italian @it @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '57',
      name: '@BACOM-Lingo-Italian-CH',
      path: 'it-ch_it',
      tags: '@bacom @lingo @link-transform @italian @ch_it @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // PORTUGUESE - Base and Regional (404 fallback to /pt)
    // =========================================================================
    {
      tcid: '58',
      name: '@BACOM-Lingo-Portuguese-PT-Base',
      path: 'pt',
      tags: '@bacom @lingo @link-transform @portuguese @pt @base @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
    {
      tcid: '59',
      name: '@BACOM-Lingo-Portuguese-BR',
      path: 'pt-br',
      tags: '@bacom @lingo @link-transform @portuguese @br @regional @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // JAPANESE - Full Site
    // =========================================================================
    {
      tcid: '60',
      name: '@BACOM-Lingo-Japanese-JP',
      path: 'jp',
      tags: '@bacom @lingo @link-transform @japanese @jp @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },

    // =========================================================================
    // KOREAN - Full Site
    // =========================================================================
    {
      tcid: '61',
      name: '@BACOM-Lingo-Korean-KR',
      path: 'kr',
      tags: '@bacom @lingo @link-transform @korean @kr @fullsite @smoke @regression',
      data: 'data/bacom/gnav/lingo-urls.yml',
    },
  ],
};
