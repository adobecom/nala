import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/downloadcomponent.spec.js';
import download from '../../selectors/helpx/downloadComponent.page.js';
import config from '../../configs/helpx.config.js';

let downloadComponent;
let page;
let downloadComponentTag = features[0].path;
let context;

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
  context = await browser.newContext();
  // Set the authorization token in the header
  await context.setExtraHTTPHeaders({ authorization: `token ${authToken}` });
  page = await context.newPage();
  downloadComponent = new download(page);
});

test.describe('Verify Download Component response from one column', () => {
  // Download Component Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });

    //verify PDF Download Component
    await expect(downloadComponent.b2downloadComponent).toBeVisible();
    await expect(downloadComponent.b2downloadComponentTitle).toBeVisible();
    await expect(downloadComponent.b2PDFdownloadComponent).toHaveAttribute(
      'href',
      /\/c4611_sample_explain\.pdf/
    );
    await expect(downloadComponent.b2PDFdownloadComponent).toHaveAttribute(
      'target',
      '_blank'
    );
    await expect(downloadComponent.b2PDFdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b2PDFdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b2PDFdownloadComponent).toHaveText(
      'Get pdf file'
    );

    //verify DOCX Download Component
    await expect(downloadComponent.b2DOCXdownloadComponent).toHaveAttribute(
      'href',
      /\/kt_session_on_regressiontestingandpublishedpagesofaem\.docx/
    );
    await expect(downloadComponent.b2DOCXdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b2DOCXdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b2DOCXdownloadComponent).toHaveText(
      'Get docx file'
    );

    //verify XLSX Download Component
    await expect(downloadComponent.b2XLSXdownloadComponent).toHaveAttribute(
      'href',
      /\/playlists1\.xlsx/
    );
    await expect(downloadComponent.b2XLSXdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b2XLSXdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b2XLSXdownloadComponent).toHaveText(
      'Get xlsx file'
    );
  });
});

test.describe('Verify Download Component response from two column', () => {
  // Download Component Sanity Checks:
  test(`${features[1].name}, ${features[1].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });

    // Verify PDF Download Component
    await expect(downloadComponent.b4downloadComponent).toBeVisible();
    await expect(downloadComponent.b4downloadComponentTitle).toBeVisible();
    await expect(downloadComponent.b4PDFdownloadComponent).toHaveAttribute(
      'href',
      /\/c4611_sample_explain\.pdf/
    );
    await expect(downloadComponent.b4PDFdownloadComponent).toHaveAttribute(
      'target',
      '_blank'
    );
    await expect(downloadComponent.b4PDFdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4PDFdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4PDFdownloadComponent).toHaveText(
      'Get pdf file---xxxxxxxxxxxxhhhhhhhhhhhhhhhhhhhhhhh'
    );

    // Verify DOCX Download Component
    await expect(downloadComponent.b4DOCXdownloadComponent).toHaveAttribute(
      'href',
      /\/kt_session_on_regressiontestingandpublishedpagesofaem\.docx/
    );
    await expect(downloadComponent.b4DOCXdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4DOCXdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4DOCXdownloadComponent).toHaveText(
      'Get docx file'
    );

    // Verify XLSX Download Component
    await expect(downloadComponent.b4XLSXdownloadComponent).toHaveAttribute(
      'href',
      /\/playlists1\.xlsx/
    );
    await expect(downloadComponent.b4XLSXdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4XLSXdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4XLSXdownloadComponent).toHaveText(
      'Get xlsx file'
    );

    // Verify XLS Download Component
    await expect(downloadComponent.b4XLSdownloadComponent).toHaveAttribute(
      'href',
      /\/file_example_XLS_10\.xls/
    );
    await expect(downloadComponent.b4XLSdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4XLSdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4XLSdownloadComponent).toHaveText(
      'Get xls file'
    );

    // Verify TXT Download Component
    await expect(downloadComponent.b4TXTdownloadComponent).toHaveAttribute(
      'href',
      /\/test_text_file_22\.txt/
    );
    await expect(downloadComponent.b4TXTdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4TXTdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4TXTdownloadComponent).toHaveText(
      'Get txt file'
    );

    // Verify EXE Download Component
    await expect(downloadComponent.b4EXEdownloadComponent).toHaveAttribute(
      'href',
      /\/Photoshop_Set-Up\.exe/
    );
    await expect(downloadComponent.b4EXEdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4EXEdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4EXEdownloadComponent).toHaveText(
      'Get exe file'
    );

    // Verify JPEG Download Component
    await expect(downloadComponent.b4JPEGdownloadComponent).toHaveAttribute(
      'href',
      /\/Waterfall\.jpeg/
    );
    await expect(downloadComponent.b4JPEGdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4JPEGdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4JPEGdownloadComponent).toHaveText(
      'Get jpeg file'
    );

    // Verify JPG Download Component
    await expect(downloadComponent.b4JPGdownloadComponent).toHaveAttribute(
      'href',
      /\/ps-workspace\.jpg/
    );
    await expect(downloadComponent.b4JPGdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4JPGdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4JPGdownloadComponent).toHaveText(
      'Get jpg file'
    );

    // Verify PNG Download Component
    await expect(downloadComponent.b4PNGdownloadComponent).toHaveAttribute(
      'href',
      /\/Test_PNG_Image_file\.png/
    );
    await expect(downloadComponent.b4PNGdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4PNGdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4PNGdownloadComponent).toHaveText(
      'Get png file'
    );

    // Verify ZIP Download Component
    await expect(downloadComponent.b4ZIPdownloadComponent).toHaveAttribute(
      'href',
      /\/pt_appicon_256\.svg\.zip/
    );
    await expect(downloadComponent.b4ZIPdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4ZIPdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4ZIPdownloadComponent).toHaveText(
      'Get zip file'
    );

    // Verify GIF Download Component
    await expect(downloadComponent.b4GIFdownloadComponent).toHaveAttribute(
      'href',
      /\/image885002\.gif/
    );
    await expect(downloadComponent.b4GIFdownloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4GIFdownloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4GIFdownloadComponent).toHaveText(
      'Get gif file'
    );

    // Verify MP4 Download Component
    await expect(downloadComponent.b4MP4downloadComponent).toHaveAttribute(
      'href',
      /\/ambient_video\.mp4/
    );
    await expect(downloadComponent.b4MP4downloadComponent).toHaveAttribute(
      'class',
      'download-button'
    );
    await expect(downloadComponent.b4MP4downloadComponent).toHaveAttribute(
      'download',
      'download'
    );
    await expect(downloadComponent.b4MP4downloadComponent).toHaveText(
      'Get mp4 file'
    );
  });
});

test.describe('Verify Download Component response from three column', () => {
  // Download Component Sanity Checks:
  test(`${features[2].name}, ${features[2].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });

        // Verify PDF Download Component
    await expect(downloadComponent.b6downloadComponent).toBeVisible();
    await expect(downloadComponent.b6downloadComponentTitle).toBeVisible();
    await expect(downloadComponent.b6PDFdownloadComponent).toHaveAttribute("href", /\/c4611_sample_explain\.pdf/);
    await expect(downloadComponent.b6PDFdownloadComponent).toHaveAttribute("target", "_blank");
    await expect(downloadComponent.b6PDFdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b6PDFdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b6PDFdownloadComponent).toHaveText("Get file");

    // Verify DOCX Download Component
    await expect(downloadComponent.b6DOCXdownloadComponent).toHaveAttribute("href", /\/kt_session_on_regressiontestingandpublishedpagesofaem\.docx/);
    await expect(downloadComponent.b6DOCXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b6DOCXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b6DOCXdownloadComponent).toHaveText("Get file");

    // Verify XLSX Download Component
    await expect(downloadComponent.b6XLSXdownloadComponent).toHaveAttribute("href", /\/playlists1\.xlsx/);
    await expect(downloadComponent.b6XLSXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b6XLSXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b6XLSXdownloadComponent).toHaveText("Get file");

    // Verify XLS Download Component
    await expect(downloadComponent.b6XLSdownloadComponent).toHaveAttribute("href", /\/file_example_XLS_10\.xls/);
    await expect(downloadComponent.b6XLSdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b6XLSdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b6XLSdownloadComponent).toHaveText("Get file");

    // Verify TXT Download Component
    await expect(downloadComponent.b6TXTdownloadComponent).toHaveAttribute("href", /\/HelpX_ROW_Sanity2023-5-11%2010_8_14\.txt/);
    await expect(downloadComponent.b6TXTdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b6TXTdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b6TXTdownloadComponent).toHaveText("Get file");

  });
});


test.describe('Authoring download link after text column', () => {
  // Download Component Sanity Checks:
  test(`${features[3].name}, ${features[3].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });

        // Verify PDF Download Component
    await expect(downloadComponent.b8downloadComponent).toBeVisible();
    await expect(downloadComponent.b8downloadComponentTitle).toBeVisible();
    await expect(downloadComponent.b8PDFdownloadComponent).toHaveAttribute("href", /\/c4611_sample_explain\.pdf/);
    await expect(downloadComponent.b8PDFdownloadComponent).toHaveAttribute("target", "_blank");
    await expect(downloadComponent.b8PDFdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b8PDFdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b8PDFdownloadComponent).toHaveText("Get file");

    // Verify DOCX Download Component
    await expect(downloadComponent.b8DOCXdownloadComponent).toHaveAttribute("href", /\/kt_session_on_regressiontestingandpublishedpagesofaem\.docx/);
    await expect(downloadComponent.b8DOCXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b8DOCXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b8DOCXdownloadComponent).toHaveText("Get file");

    // Verify XLSX Download Component
    await expect(downloadComponent.b8XLSXdownloadComponent).toHaveAttribute("href", /\/playlists1\.xlsx/);
    await expect(downloadComponent.b8XLSXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b8XLSXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b8XLSXdownloadComponent).toHaveText("Get file");

    // Verify XLS Download Component
    await expect(downloadComponent.b8XLSdownloadComponent).toHaveAttribute("href", /\/file_example_XLS_10\.xls/);
    await expect(downloadComponent.b8XLSdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b8XLSdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b8XLSdownloadComponent).toHaveText("Get file");

    // Verify TXT Download Component
    await expect(downloadComponent.b8TXTdownloadComponent).toHaveAttribute("href", /\/HelpX_ROW_Sanity2023-5-11%2010_8_14\.txt/);
    await expect(downloadComponent.b8TXTdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b8TXTdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b8TXTdownloadComponent).toHaveText("Get file");

  });
});

test.describe('Authoring download component---in 3 columns—text column—download link---download link', () => {
  // Download Component Sanity Checks:
  test(`${features[4].name}, ${features[4].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });
    // Verify PDF Download Component
    await expect(downloadComponent.b10downloadComponent).toBeVisible();
    await expect(downloadComponent.b10downloadComponentTitle).toBeVisible();
    await expect(downloadComponent.b10PDFdownloadComponent).toHaveAttribute("href", /\/c4611_sample_explain\.pdf/);
    await expect(downloadComponent.b10PDFdownloadComponent).toHaveAttribute("target", "_blank");
    await expect(downloadComponent.b10PDFdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b10PDFdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b10PDFdownloadComponent).toHaveText("Get file");

    // Verify DOCX Download Component
    await expect(downloadComponent.b10DOCXdownloadComponent).toHaveAttribute("href", /\/kt_session_on_regressiontestingandpublishedpagesofaem\.docx/);
    await expect(downloadComponent.b10DOCXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b10DOCXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b10DOCXdownloadComponent).toHaveText("Get file");

    // Verify XLSX Download Component
    await expect(downloadComponent.b10XLSXdownloadComponent).toHaveAttribute("href", /\/playlists1\.xlsx/);
    await expect(downloadComponent.b10XLSXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b10XLSXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b10XLSXdownloadComponent).toHaveText("Get file");

    // Verify XLS Download Component
    await expect(downloadComponent.b10XLSdownloadComponent).toHaveAttribute("href", /\/file_example_XLS_10\.xls/);
    await expect(downloadComponent.b10XLSdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b10XLSdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b10XLSdownloadComponent).toHaveText("Get file");

    // Verify TXT Download Component
    await expect(downloadComponent.b10TXTdownloadComponent).toHaveAttribute("href", /\/HelpX_ROW_Sanity2023-5-11%2010_8_14\.txt/);
    await expect(downloadComponent.b10TXTdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b10TXTdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b10TXTdownloadComponent).toHaveText("Get file");


  });
});

test.describe('Authoring download link in alternate column', () => {
  // Download Component Sanity Checks:
  test(`${features[5].name}, ${features[5].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });
   
        // Verify PDF Download Component
    await expect(downloadComponent.b12downloadComponent).toBeVisible();
    await expect(downloadComponent.b12downloadComponentTitle).toBeVisible();
    await expect(downloadComponent.b12PDFdownloadComponent).toHaveAttribute("href", /\/c4611_sample_explain\.pdf/);
    await expect(downloadComponent.b12PDFdownloadComponent).toHaveAttribute("target", "_blank");
    await expect(downloadComponent.b12PDFdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b12PDFdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b12PDFdownloadComponent).toHaveText("Get file");

    // Verify DOCX Download Component
    await expect(downloadComponent.b12DOCXdownloadComponent).toHaveAttribute("href", /\/kt_session_on_regressiontestingandpublishedpagesofaem\.docx/);
    await expect(downloadComponent.b12DOCXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b12DOCXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b12DOCXdownloadComponent).toHaveText("Get file");

    // Verify XLSX Download Component
    await expect(downloadComponent.b12XLSXdownloadComponent).toHaveAttribute("href", /\/playlists1\.xlsx/);
    await expect(downloadComponent.b12XLSXdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b12XLSXdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b12XLSXdownloadComponent).toHaveText("Get file");

    // Verify XLS Download Component
    await expect(downloadComponent.b12XLSdownloadComponent).toHaveAttribute("href", /\/file_example_XLS_10\.xls/);
    await expect(downloadComponent.b12XLSdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b12XLSdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b12XLSdownloadComponent).toHaveText("Get file");

    // Verify TXT Download Component
    await expect(downloadComponent.b12TXTdownloadComponent).toHaveAttribute("href", /\/HelpX_ROW_Sanity2023-5-11%2010_8_14\.txt/);
    await expect(downloadComponent.b12TXTdownloadComponent).toHaveAttribute("class", "download-button");
    await expect(downloadComponent.b12TXTdownloadComponent).toHaveAttribute("download", "download");
    await expect(downloadComponent.b12TXTdownloadComponent).toHaveText("Get file");



  });
});

test.describe('Download Section Component Authoring using one column with links and other column blank', () => {
  // Download Component Sanity Checks:
  test(`${features[6].name}, ${features[6].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });
   
              // Verify PDF download component is visible
      await expect(downloadComponent.b14PDFdownloadComponent).toBeVisible();

      // Verify DOCX download component is visible
      await expect(downloadComponent.b14DOCXdownloadComponent).toBeVisible();

      // Verify XLSX download component is visible
      await expect(downloadComponent.b14XLSXdownloadComponent).toBeVisible();


  });
});

test.describe('Download Section component link text length', () => {
  // Download Component Sanity Checks:
  test(`${features[7].name}, ${features[7].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });
   
          // Verify PDF download component is visible
          await expect(downloadComponent.b16PDFdownloadComponent).toBeVisible();

          // Verify DOCX download component is visible
          await expect(downloadComponent.b16DOCXdownloadComponent).toBeVisible();

          // Verify XLSX download component is visible
          await expect(downloadComponent.b16XLSXdownloadComponent).toBeVisible();





  });
});

test.describe('Download component ---Text in CAPITAL LETTER---- Bold + Italic + Underline[removed]', () => {
  // Download Component Sanity Checks:
  test(`${features[8].name}, ${features[8].tags}`, async ({}) => {
    //Go to Download Component Page
    await page.goto(`${config.use?.baseURL}${downloadComponentTag}`);
    await page.waitForLoadState('domcontentloaded');
    console.info(`[Test Page]: ${config.use?.baseURL}${downloadComponentTag}`);

    
    await test.step('Navigate to DownloadCompoent page', async () => {
      await expect(page).toHaveURL(
        `${config.use?.baseURL}${downloadComponentTag}`
      );
    });
   
      // Verify PDF download component is visible
      await expect(downloadComponent.b18PDFdownloadComponent).toBeVisible();

    });
});
