import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/codeBlock.spec.js';
import CodeBlock from '../../selectors/helpx/codeBlock.page.js';
import config from '../../configs/helpx.config.js';
const { WebUtil } = require('../../libs/webutil.js');



let codeBlk;
let page;


test.beforeAll(async ({ browser }) => {
  if (process.env.HLX_TKN !== undefined && process.env.HLX_TKN !== '') {
    // The environment variable is set and has a non-blank value
    console.log('Environment variable is set and not blank');
  } else {
    // The environment variable is either not set or has a blank value
    const errorMessage =
      "Environment variable 'HLX_TKN' is not set or blank. Please ensure it is properly configured.";
    throw new Error(errorMessage);
  }

  const authToken = process.env.HLX_TKN;
  const context = await browser.newContext();
  // Set the authorization token in the header
  await context.setExtraHTTPHeaders({ authorization: `token ${authToken}` });
  page = await context.newPage();
  codeBlk = new CodeBlock(page);
});

//sanity Code Block Test
test.describe('CodeBlock sanity test suite', () => {
  // CodeBlock Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({}) => {
    //Go to CodeBlock Page
    let codeblocktag = features[0].path;
    await page.goto(`${config.use?.baseURL}${codeblocktag}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblocktag}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblocktag}.html`);
    });

    // Check for different codeBlock formats present
    await expect(codeBlk.codeA3).toBeVisible();
    await expect(codeBlk.codeFusion).toBeVisible();
    await expect(codeBlk.codeC).toBeVisible();
    await expect(codeBlk.codeCss).toBeVisible();
    await expect(codeBlk.codeJava).toBeVisible();
    await expect(codeBlk.codeJS).toHaveCount(4);
    await expect(codeBlk.codePhp).toHaveCount(5);
    await expect(codeBlk.codePlain).toBeVisible();
    await expect(codeBlk.codeSql).toHaveCount(3);
    await expect(codeBlk.codeXml).toHaveCount(2);
    await expect(codeBlk.codeMxml).toBeVisible();

    //verify Code block css Properties
    expect(await WebUtil.verifyCSS(await codeBlk.codeHideDsktop.first(), codeBlk.cssProperties['codeHideDsktop'])).toBeTruthy();
    expect(await WebUtil.verifyCSS(await codeBlk.codeHideTablet.first(), codeBlk.cssProperties['codeHideTablet'])).toBeTruthy();
    expect(await WebUtil.verifyCSS(await codeBlk.codeHideMobile.first(), codeBlk.cssProperties['codeHideMobile'])).toBeTruthy();
    
    //Verify code Block Attribute Properties
    expect(await WebUtil.verifyAttributes(await codeBlk.codeHideDsktop.first(), codeBlk.attProperties['codeHideDsktop'])).toBeTruthy();
    expect(await WebUtil.verifyAttributes(await codeBlk.codeHideTablet.first(), codeBlk.attProperties['codeHideTablet'])).toBeTruthy();
    expect(await WebUtil.verifyAttributes(await codeBlk.codeHideMobile.first(), codeBlk.attProperties['codeHideMobile'])).toBeTruthy();
    

    //Check different InLineNumber codeBlock formats present
    await expect(codeBlk.codeJavaNum).toBeVisible();
    await expect(codeBlk.codeJSNum).toBeVisible();
    await expect(codeBlk.codePhpNum).toBeVisible();
    await expect(codeBlk.codeSqlNum).toBeVisible();

  });
});

let codeblockpage = features[1].path;

//Code Block Component without specifying the language
test.describe('Verify Code block without language name', ()=>{

  test(`${features[1].name}, ${features[1].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    //Verification
    await expect(codeBlk.d2CodeWithoutLanguage).toBeVisible();
    await expect(codeBlk.d2CodeWithoutLanguagePre).toBeVisible();
    await expect(codeBlk.d2CodeWithoutLanguagePreCodeLine1).toBeVisible();

  })

  
})

//Code language AS3- Title with all Small Letters
test.describe('Verify Code language AS3- Title with all Small Letters', ()=>{

  test(`${features[2].name}, ${features[2].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    //Verification
    await expect(codeBlk.d4CodeLangiageAS3).toBeVisible();
    await expect(codeBlk.d4CodeClikeinAS3).toBeVisible();
    await expect(codeBlk.d4classCodeToolbar).toBeVisible();
   // await expect(codeBlk.d4CopyCodeButton).toBeDisabled();

  })

  
})

//Code language AS3 -Title with all Capital Letters [CODE (LANGUAGE-AS3)
test.describe('//Code language AS3 -Title with all Capital Letters [CODE (LANGUAGE-AS3)', ()=>{

  test(`${features[3].name}, ${features[3].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    //Verification
    await expect(codeBlk.d6CodeLangiageAS3).toBeVisible();
    await expect(codeBlk.d6classCodeToolbar).toBeVisible();
    await expect(codeBlk.d6CodeClikeinAS3).toBeVisible();
    await expect(codeBlk.d6CodeLineAS3Small).toHaveCount(12);
    

  })

  
})


//Code language AS3 – with Line number
test.describe('Code language AS3 with Line number', ()=>{

  test(`${features[4].name}, ${features[4].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    //Verification
    await expect(codeBlk.d8CodeAS3WithLineNumbers).toBeVisible();
    await expect(codeBlk.d8classCodeToolbar).toBeVisible();
    await expect(codeBlk.d8CodeClikeinAS3).toBeVisible();
    await expect(codeBlk.d8CodeLineAS3LineNumber).toHaveCount(14);
    await expect(codeBlk.d8CopyCodeButton).toBeVisible();
    
    

  })

  
})

//Code language ColdFusion
test.describe('//Code language ColdFusion', ()=>{

  test(`${features[5].name}, ${features[5].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    //Verification
    await expect(codeBlk.d10ColdFusion).toBeVisible();
    await expect(codeBlk.d10classCodeToolbar).toBeVisible();
    await expect(codeBlk.d10CodeClikeinAS3).toBeVisible();
    await expect(codeBlk.d10CodeLineAS3LineNumber).toHaveCount(20);
    await expect(codeBlk.d10CopyCodeButton).toBeVisible();
    
    
    

  })

  
})

//Code language C Plus Plus
test.describe('//Code language C plus Plus', ()=>{

  test(`${features[6].name}, ${features[6].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    //Verification
    await expect(codeBlk.d12CPlusPlus).toBeVisible();
    await expect(codeBlk.d12classCodeToolbar).toBeVisible();
    await expect(codeBlk.d12CodeClikeinCplus).toBeVisible();
    await expect(codeBlk.d12CodeLineCplusLineNumber).toHaveCount(9);
    await expect(codeBlk.d12CopyCodeButton).toBeVisible();
    
    
    

  })

  
})

//Code language CSS
test.describe('//Code language CSS', ()=>{

  test(`${features[7].name}, ${features[7].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    // Verification for CSS code block
    await expect(codeBlk.d14Css).toBeVisible();
    await expect(codeBlk.d14ClassCodeToolbar).toBeVisible();
    await expect(codeBlk.d14CodeClikeinCss).toBeVisible();
    await expect(codeBlk.d14CodeLineCssLineNumber).toHaveCount(41);
    await expect(codeBlk.d14CopyCodeButton).toBeVisible(); 

  })

  
})


//Code language Java
test.describe('//Code language Java', ()=>{

  test(`${features[8].name}, ${features[8].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    // Verification for Java code block
    await expect(codeBlk.d16Java).toBeVisible();
    await expect(codeBlk.d16ClassCodeToolbar).toBeVisible();
    await expect(codeBlk.d16CodeClikeinJava).toBeVisible();
    await expect(codeBlk.d16CodeLineJavaLineNumber).toHaveCount(27);
    await expect(codeBlk.d16CopyCodeButton).toBeVisible();

  })

  
})

//Code language Javascript
test.describe('//Code language javascript', ()=>{

  test(`${features[9].name}, ${features[9].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    // Verification for JavaScript code block
    await expect(codeBlk.d18Javascript).toBeVisible();
    await expect(codeBlk.d18ClassCodeToolbar).toBeVisible();
    await expect(codeBlk.d18CodeClikeinJavascript).toBeVisible();
    await expect(codeBlk.d18CodeLineJavascriptLineNumber).toHaveCount(5);
    await expect(codeBlk.d18CopyCodeButton).toBeVisible();
  }) 
})


//Code language PHP
test.describe('//Code language PHP', ()=>{

  test(`${features[10].name}, ${features[10].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    // Verification for PHP code block
    await expect(codeBlk.d20PHP).toBeVisible();
    await expect(codeBlk.d20ClassCodeToolbar).toBeVisible();
    await expect(codeBlk.d20CodePhp).toBeVisible();
    await expect(codeBlk.d20CodeLinePhpLineNumber).toHaveCount(10);
    await expect(codeBlk.d20CopyCodeButton).toBeVisible();

  }) 
})

//Code language SQL
test.describe('//Code language SQL', ()=>{

  test(`${features[11].name}, ${features[11].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

    // Verification for SQL code block
    await expect(codeBlk.d22SQL).toBeVisible();
    await expect(codeBlk.d22ClassCodeToolbar).toBeVisible();
    await expect(codeBlk.d22CodeSql).toBeVisible();
    await expect(codeBlk.d22CodeLineSqlLineNumber).toHaveCount(6);
    await expect(codeBlk.d22CopyCodeButton).toBeVisible();


  }) 
})

//Code language MXML
test.describe('//Code language MXML', ()=>{

  test(`${features[12].name}, ${features[12].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

      // Verification for MXML code block
      await expect(codeBlk.d24MXML).toBeVisible();
      await expect(codeBlk.d24ClassCodeToolbar).toBeVisible();
      await expect(codeBlk.d24CodeXml).toBeVisible();
      await expect(codeBlk.d24CodeLineXmlLineNumber).toHaveCount( 7 );
      await expect(codeBlk.d24CopyCodeButton).toBeVisible();


  }) 
})


//Code language MXML
test.describe('//Code language XML', ()=>{

  test(`${features[13].name}, ${features[13].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });

      // Verification for XML code block
      await expect(codeBlk.d26XML).toBeVisible();
      await expect(codeBlk.d26ClassCodeToolbar).toBeVisible();
      await expect(codeBlk.d26CodeXml).toBeVisible();
      await expect(codeBlk.d26CodeLineXmlLineNumber).toHaveCount(8);
      await expect(codeBlk.d26CopyCodeButton).toBeVisible();
  }) 
})

//Code language Shell
test.describe('//Code language Shell', ()=>{

  test(`${features[14].name}, ${features[14].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });
      // Verification for Shell code block
      await expect(codeBlk.d28XML).toBeVisible();
      await expect(codeBlk.d28ClassCodeToolbar).toBeVisible();
      await expect(codeBlk.d28CodeShell).toBeVisible();
      await expect(codeBlk.d28CodeLineShellLineNumber).toHaveCount(30);
      await expect(codeBlk.d28CopyCodeButton).toBeVisible();

  }) 
})


//Code language Plain
test.describe('//Code language Plain', ()=>{

  test(`${features[15].name}, ${features[15].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });
      // Verification for Plain text code block
      await expect(codeBlk.d30Plain).toBeVisible();
      await expect(codeBlk.d30ClassCodeToolbar).toBeVisible();
      await expect(codeBlk.d30CodePlain).toBeVisible();
      await expect(codeBlk.d30CodeLinePlainLineNumber).toHaveCount(13);
      await expect(codeBlk.d30CopyCodeButton).toBeVisible();
  }) 
})


//Code language AS3 With Line Numbers
test.describe('//Code language AS3 with line number', ()=>{

  test(`${features[16].name}, ${features[16].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });


    // Verification for AS3 code block
      await expect(codeBlk.d32AS3WithLineNumber).toBeVisible();
      await expect(codeBlk.d32ClassCodeToolbar).toBeVisible();
      await expect(codeBlk.d32CodeAS3).toBeVisible();
      await expect(codeBlk.d32CodeAS3LineNumberIspresent).toHaveCSS("counter-reset","linenumber 0");
      await expect(codeBlk.d32CopyCodeButton).toBeVisible();



  }) 
})


//Code language Cold Fusion With Line Numbers
test.describe('//Code language Cold Fusion with line number', ()=>{

  test(`${features[17].name}, ${features[17].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });


          // Verification for ColdFusion code block
        await expect(codeBlk.d34ColdFusion).toBeVisible();
        await expect(codeBlk.d34ClassCodeToolbar).toBeVisible();
        await expect(codeBlk.d34CodeColdFusion).toBeVisible();
        await expect(codeBlk.d34CodeLineColdFusionLineNumber).toHaveCount( 20 );
        await expect(codeBlk.d34CopyCodeButton).toBeVisible();

        // Check the CSS property for ColdFusion code lines
        await expect(codeBlk.d34CodeFusionLineNumberIspresent).toHaveCSS("counter-reset", "linenumber 0");







  }) 
})


//Code language css With Line Numbers
test.describe('//Code language css with line number', ()=>{

  test(`${features[18].name}, ${features[18].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });


        // Check the CSS property for CSS code lines
        await expect(codeBlk.d38CodeCSSLineNumberIspresent).toHaveCSS("counter-reset", "linenumber 0");

        // Verification for CSS code block
        await expect(codeBlk.d38CSS).toBeVisible();
        await expect(codeBlk.d38ClassCodeToolbar).toBeVisible();
        await expect(codeBlk.d38CodeCSS).toBeVisible();
        await expect(codeBlk.d38CodeLineCSSLineNumber).toHaveCount(41);
        await expect(codeBlk.d38CopyCodeButton).toBeVisible();
  }) 
})

//Code language java With Line Numbers
test.describe('//Code language java with line number', ()=>{

  test(`${features[19].name}, ${features[19].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });


      // Check the CSS property for Java code lines
      await expect(codeBlk.d40CodeJavaLineNumberIsPresent).toHaveCSS("counter-reset", "linenumber 0");

      // Verification for Java code block
      await expect(codeBlk.d40JavaCode).toBeVisible();
      await expect(codeBlk.d40ClassCodeToolbar).toBeVisible();
      await expect(codeBlk.d40CodeJava).toBeVisible();
      await expect(codeBlk.d40CodeLineJavaLineNumber).toHaveCount(33);
      await expect(codeBlk.d40CopyCodeButton).toBeVisible();

  }) 
})

//Code language javascript With Line Numbers
test.describe('//Code language javascript with line number', ()=>{

  test(`${features[20].name}, ${features[20].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });


        // Check the CSS property for JavaScript code lines
        await expect(codeBlk.d42CodeJavaScriptLineNumberIsPresent).toHaveCSS("counter-reset", "linenumber 0");

        // Verification for JavaScript code block
        await expect(codeBlk.d42JavaScriptCode).toBeVisible();
        await expect(codeBlk.d42ClassCodeToolbar).toBeVisible();
        await expect(codeBlk.d42CodeJavaScript).toBeVisible();
        await expect(codeBlk.d42CodeLineJavaScriptLineNumber).toHaveCount(5);
        await expect(codeBlk.d42CopyCodeButton).toBeVisible();

  }) 
})

//Code language php With Line Numbers
test.describe('//Code language php with line number', ()=>{

  test(`${features[21].name}, ${features[21].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });


    // Check the CSS property for PHP code lines
    await expect(codeBlk.d44CodePhpLineNumberIsPresent).toHaveCSS("counter-reset", "linenumber 0");

    // Verification for PHP code block
    await expect(codeBlk.d44PhpCode).toBeVisible();
    await expect(codeBlk.d44ClassCodeToolbar).toBeVisible();
    await expect(codeBlk.d44CodePhp).toBeVisible();
    await expect(codeBlk.d44CodeLinePhpLineNumber).toHaveCount(10);
    await expect(codeBlk.d44CopyCodeButton).toBeVisible();


  }) 
})


//Code language sql With Line Numbers
test.describe('//Code language sql with line number', ()=>{

  test(`${features[22].name}, ${features[22].tags}`,async()=>{
    //Go to CodeBlock Page
    await page.goto(`${config.use?.baseURL}${codeblockpage}`);
    await page.waitForLoadState('networkidle');
    console.info(`[Test Page]: ${config.use?.baseURL}${codeblockpage}`);

    //verify its navigating to code block page only
    await test.step('Navigate to CodeBlock page', async () => {
      await expect(page).toHaveURL(`${config.use?.baseURL}${codeblockpage}`);
    });


    // Check the CSS property for SQL code lines
    await expect(codeBlk.d46CodeSqlLineNumberIsPresent).toHaveCSS("counter-reset", "linenumber 0");

    // Verification for SQL code block
    await expect(codeBlk.d46SqlCode).toBeVisible();
    await expect(codeBlk.d46ClassCodeToolbar).toBeVisible();
    await expect(codeBlk.d46CodeSql).toBeVisible();
    await expect(codeBlk.d46CodeLineSqlLineNumber).toHaveCount(6);
    await expect(codeBlk.d46CopyCodeButton).toBeVisible();



  }) 
})
