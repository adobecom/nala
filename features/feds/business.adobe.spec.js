module.exports = {

  features: [
    {
      tcid: '0',
      name: '@USBusinessAdobePageGnavCheck',
      path: '/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeUS',
      country: 'United States',
      expectedLocale: 'United States', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '1',
      name: '@GermanyBusinessAdobePageCheck',
      path: '/de/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeGermany',
      country: 'Germany',
      expectedLocale: 'Germany', // fallback language
      redirectTo: '/de/',
    },
    {
      tcid: '2',
      name: '@FranceBusinessAdobePageCheck',
      path: '/fr/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeFrance',
      country: 'France',
      expectedLocale: 'France', // fallback language
      redirectTo: '/fr/',
    },
    {
      tcid: '3',
      name: '@ItalyBusinessAdobePageCheck',
      path: '/it/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeItaly',
      country: 'Italy',
      expectedLocale: 'Italy', // fallback language
      redirectTo: '/it/',
    },
    {
      tcid: '4',
      name: '@UnitedKingdomBusinessAdobePageCheck',
      path: '/uk/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeUnitedKingdom',
      country: 'United Kingdom',
      expectedLocale: 'United Kingdom', // fallback language
      redirectTo: '/uk/',
    },
    {
      tcid: '5',
      name: '@MiddleEastAndNorthAfricaBusinessAdobePageCheck',
      path: '/mena_en/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeMiddleEastAndNorthAfrica',
      country: 'Middle East And North Africa',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '6',
      name: '@JapanBusinessAdobePageCheck',
      path: '/jp/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeJapan',
      country: 'Japan',
      expectedLocale: 'Japan', // fallback language
      redirectTo: '/jp/',
    },

    {
      tcid: '7',
      name: '@SpainBusinessAdobePageCheck',
      path: '/es/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeSpain',
      country: 'Spain',
      expectedLocale: 'Spain', // fallback language
      redirectTo: '/es/',
    },
    {
      tcid: '8',
      name: '@CanadaEnglishBusinessAdobePageCheck',
      path: '/ca/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeCanadaEnglish',
      country: 'Canada English',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '9',
      name: '@KoreaBusinessAdobePageCheck',
      path: '/kr/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeKorea',
      country: 'Korea',
      expectedLocale: 'Korea', // fallback language
      redirectTo: '/kr/',
    },
    {
      tcid: '10',
      name: '@CanadaFrenchBusinessAdobePageCheck',
      path: '/ca_fr/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeCanadaFrench',
      country: 'Canada French',
      expectedLocale: 'France', // fallback language
      redirectTo: '/fr/',
    },
    {
      tcid: '11',
      name: '@PolandBusinessAdobePageCheck',
      path: '/pl/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobePoland',
      country: 'Poland',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '12',
      name: '@MexicoBusinessAdobePageCheck',
      path: '/mx/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeMexico',
      country: 'Mexico',
      expectedLocale: 'Spain', // fallback language
      redirectTo: '/es/',
    },
    {
      tcid: '13',
      name: '@AustraliaEnglishBusinessAdobePageCheck',
      path: '/au/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeAustraliaEnglish',
      country: 'AustraliaEnglish',
      expectedLocale: 'AustraliaEnglish', // fallback language
      redirectTo: '/au/',
    },
    {
      tcid: '14',
      name: '@IndonesiaBusinessAdobePageCheck',
      path: '/id_id/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeIndonesia',
      country: 'Indonesia',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '15',
      name: '@IndonesiaEnglishBusinessAdobePageCheck',
      path: '/id_en/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeIndonesiaEnglish',
      country: 'Indonesia English',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '16',
      name: '@TurkeyBusinessAdobePageCheck',
      path: '/tr/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeTurkey',
      country: 'Turkey',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '17',
      name: '@ThailandEnglishBusinessAdobePageCheck',
      path: '/th_en/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeThailandEnglish',
      country: 'Thailand English',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '18',
      name: '@ThailandBusinessAdobePageCheck',
      path: '/th_th/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeThailand',
      country: 'Thailand',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '19',
      name: '@SingaporeBusinessAdobePageCheck',
      path: '/sg/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobeSingapore',
      country: 'Singapore',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '20',
      name: '@PhilippineBusinessAdobePageCheck',
      path: '/ph_fil/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobePhilippines',
      country: 'Philippines',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },

    {
      tcid: '21',
      name: '@PhilippineEnglishBusinessAdobePageCheck',
      path: '/ph_en/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobePhilippinesEnglish',
      country: 'Philippines English',
      expectedLocale: 'US', // fallback language
      redirectTo: '/',
    },
    {
      tcid: '22',
      name: '@PortugueseBusinessAdobePageCheck',
      path: '/pt/?mep=off&&georouting=off#modal-hash',
      tags: '@BusinessAdobePageSanity @BusinessAdobePortugal',
      country: 'Portugal',
      expectedLocale: 'Portugal', // fallback language
      redirectTo: '/pt/',
    },
  ],
};
