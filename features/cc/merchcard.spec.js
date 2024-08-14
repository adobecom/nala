module.exports = {
  name: 'merchcard',
    features: [
      {
        tcid: '0',
        name: '@merchcard-ui',
        path: '/drafts/Automation-PW/merchcard?georouting=off',
        tags: '@cc @cc-merchcard @cc-merchcardui',
      },
      {
        tcid: '1',
        name: '@merchcard-prices',
        path: '/drafts/Automation-PW/merchcard?georouting=off',
        tags: '@cc @cc-merchcard @cc-merchcardprices',
        urls : {
          freetrial : 'https://commerce.adobe.com/store/commitment',
          buynow : 'https://commerce.adobe.com/store/',
        }
      },
      {
        tcid: '2',
        name: '@merchcard-fragmentrefecence',
        path: '/drafts/Automation-PW/pricefragments?georouting=off',
        tags: '@cc @cc-merchcard @cc-merchcardrefernce',
       },
     ],
  };
  