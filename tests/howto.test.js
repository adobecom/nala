const { expect, test } = require('@playwright/test');
const parse = require('../features/parse');
const howtoSpec = require('../features/howto.spec');
const env = require('../utils/env')
const {HowTo} = require('../selectors/howto.selector')


// Parse the Howto-spec feature file into something flat that can be tested separately
const parsed = parse(howtoSpec);

// Annote the test name = feature name
test.describe(`${parsed.name}`, () => {

  // Iterate the features -> specs or test scenarios
  parsed.features.forEach((props) => {

    const title = `${props.name} ${props.env} ${props.tag} on ${props.url}`;
    const path = `${props.path}`
      
      // Define test name along with tags dynamically
      test(title, async ({ page }) => {

        // get the test page page
        let url = process.env.baseUrl+path

        // Navigate to the test page
        await page.goto(url)

        // Verify HotTo block
        const selector =  new HowTo(page);
        expect(await selector.howToHeading2.allTextContents(),'How to compress a PDF online (with schema)')
        expect(await selector.howToFourthAnswer.allTextContents(),'This is a test row.')

      });
  });
});
