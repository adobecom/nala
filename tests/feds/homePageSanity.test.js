import { expect, test } from "@playwright/test";
import { features } from "../../features/feds/homePageSanity.spec";
import HomePageSanity from "../../selectors/feds/feds.homepagesanity.page.js"

test.describe('Home Page Component test suite', () => {

    test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[0].path}`);

        await test.step('Validating Argentina locale Home page', async () => {
            await page.goto(`${baseURL}${features[0].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect.soft(page).toHaveURL(`${baseURL}${features[0].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCC).toBeVisible();
            await expect(home.collegesAndUniversities).toBeVisible();
            await expect(home.viewPlansAndPrices).toBeVisible();
            await expect(home.photoshop).toBeVisible();
            await expect(home.AdobeStock).toBeVisible();
            await expect(home.photo).toBeVisible();
            await expect(home.pdf).toBeVisible();
            await expect(home.AIOverviewCC).toBeVisible();
            await expect(home.adobeFirefly).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobat).toBeVisible();
            await expect(home.acrobatPlansAndPricing).toBeVisible();
            await expect(home.acrobatReader).toBeVisible();
            await expect(home.companies).toBeVisible();
            await expect(home.homeAndPersonal).toBeVisible();
            await expect(home.AIOverviewDC).toBeVisible();
            await expect(home.AIinAcrobat).toBeVisible();
            await expect(home.pdfToWord).toBeVisible();
            await expect(home.wordToPDF).toBeVisible();
            await expect(home.developerResources).toBeVisible();
            await expect(home.eventsAndWebinars).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloud).toBeVisible();
            await expect(home.customerDataPlatform).toBeVisible();
            await expect(home.requestDemo).toBeVisible();
            await expect(home.Analytics).toBeVisible();
            await expect(home.experienceAssetManager).toBeVisible();
            await expect(home.AIOverviewEC).toBeVisible();
            await expect(home.senseiGenAI).toBeVisible();
            await expect(home.resourceCentre).toBeVisible();
            await expect(home.experienceCloudBlog).toBeVisible();
            await expect(home.training).toBeVisible();
            await expect(home.parteners).toBeVisible();
            await expect(home.adobeSummit).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentre).toBeVisible();
            await expect(home.downloadAndInstall).toBeVisible();
            await expect(home.contact).toBeVisible();
            await expect(home.manageMyAccount).toBeVisible();
            await expect(home.subscribeToAdobeStatus).toBeVisible();
            await expect(home.creativeCloudTutorials).toBeVisible();
            await expect(home.adobeExperienceLeague).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloud).toBeVisible();
            await expect(home.footerSeeAllProducts).toBeVisible();
            await expect(home.footerCreativeCloudForBusiness).toBeVisible();
            await expect(home.footerAcrobatForBusiness).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachers).toBeVisible();
            await expect(home.footerDigitalLearning).toBeVisible();
            await expect(home.footeriOSApps).toBeVisible();
            await expect(home.footerAndroidApps).toBeVisible();
            await expect(home.footerWhatIsExperienceCloud).toBeVisible();
            await expect(home.footerTermsOfUse).toBeVisible();
            await expect(home.footerDownloadAndInstall).toBeVisible();
            await expect(home.footerOriginalSoftware).toBeVisible();
            await expect(home.footerAdobeBlog).toBeVisible();
            await expect(home.footerAdobeDeveloper).toBeVisible();
            await expect(home.footerLogInToYourAccount).toBeVisible();
            await expect(home.footerAbout).toBeVisible();
            await expect(home.footerIntegrity).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[13].name}, ${features[13].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[13].path}`);

        await test.step('Validating United States Locale Home page', async () => {
            await page.goto(`${baseURL}${features[13].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[13].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCUS).toBeVisible();
            await expect(home.schoolsAndUniversitiesUS).toBeVisible();
            await expect(home.viewPlansAndPricesUS).toBeVisible();
            await expect(home.photoshopUS).toBeVisible();
            await expect(home.AdobeStockUS).toBeVisible();
            await expect(home.photoUS).toBeVisible();
            await expect(home.pdfUS).toBeVisible();
            await expect(home.AIOverviewCCUS).toBeVisible();
            await expect(home.adobeFireflyUS).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatUS).toBeVisible();
            await expect(home.acrobatPlansAndPricingUS).toBeVisible();
            await expect(home.acrobatReaderUS).toBeVisible();
            await expect(home.businessUS).toBeVisible();
            await expect(home.governmentUS).toBeVisible();
            await expect(home.AIOverviewDCUS).toBeVisible();
            await expect(home.AIinAcrobatUS).toBeVisible();
            await expect(home.pdfToWordUS).toBeVisible();
            await expect(home.wordToPDFUS).toBeVisible();
            await expect(home.developerResourcesUS).toBeVisible();
            await expect(home.eventsAndWebinarsUS).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudUS).toBeVisible();
            await expect(home.customerDataPlatformUS).toBeVisible();
            await expect(home.marketingAutomationUS).toBeVisible();
            await expect(home.viewAllProductsECUS).toBeVisible();
            await expect(home.adobeGenStudioUS).toBeVisible();
            await expect(home.AIAssistantUS).toBeVisible();
            await expect(home.adobeExperiencePlatformUS).toBeVisible();
            await expect(home.adobeGenAIUS).toBeVisible();
            await expect(home.findProductUS).toBeVisible();
            await expect(home.resourceCentreUS).toBeVisible();
            await expect(home.customerSuccessStoriesUS).toBeVisible();
            await expect(home.servicesAndSupportUS).toBeVisible();
            await expect(home.trainingUS).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreUS).toBeVisible();
            await expect(home.downloadAndInstallUS).toBeVisible();
            await expect(home.contactUS).toBeVisible();
            await expect(home.manageMyAccountUS).toBeVisible();
            await expect(home.subscribeToAdobeStatusUS).toBeVisible();
            await expect(home.creativeCloudTutorialsUS).toBeVisible();
            await expect(home.adobeExperienceLeagueUS).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudUS).toBeVisible();
            await expect(home.footerViewAllProductsUS).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessUS).toBeVisible();
            await expect(home.footerAcrobatForBusinessUS).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersUS).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsUS).toBeVisible();
            await expect(home.footerAppsforiOSUS).toBeVisible();
            await expect(home.footerAppsforAndroidUS).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudUS).toBeVisible();
            await expect(home.footerTermsOfUseUS).toBeVisible();
            await expect(home.footerDownloadAndInstallUS).toBeVisible();
            await expect(home.footerGenuineSoftwareUS).toBeVisible();
            await expect(home.footerAdobeBlogUS).toBeVisible();
            await expect(home.footerAdobeDeveloperUS).toBeVisible();
            await expect(home.footerLogInToYourAccountUS).toBeVisible();
            await expect(home.footerAboutUS).toBeVisible();
            await expect(home.footerIntegrityUS).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[25].name}, ${features[25].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[25].path}`);

        await test.step('Validating France Locale page', async () => {
            await page.goto(`${baseURL}${features[25].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[25].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.Tologin).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.individualsAndFreelancersFr).toBeVisible();
            await expect(home.seeTheFormulasAndPricesFr).toBeVisible();
            await expect(home.photoshopFr).toBeVisible();
            await expect(home.adobeStockFr).toBeVisible();
            await expect(home.photoEditingFr).toBeVisible();
            await expect(home.pdfFr).toBeVisible();
            await expect(home.adobeFireflyFr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await page.waitForLoadState('domcontentloaded');
            await expect(home.adobeAcrobatFr).toBeVisible();
            await expect(home.seeAllProductsFr).toBeVisible();
            await expect(home.SMEsAndLargeCompaniesFr).toBeVisible();
            await expect(home.IndividualsAndFrelancersFr).toBeVisible();
            await expect(home.AIProgramOverviewDCFr).toBeVisible();
            await expect(home.AIinAcrobatFr).toBeVisible();
            await expect(home.pdfToWordFr).toBeVisible();
            await expect(home.seeAllToolsFr).toBeVisible();
            await expect(home.developerResourcesFr).toBeVisible();
            await expect(home.articlesAndReportsFr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudFr).toBeVisible();
            await expect(home.insightsAndAudiencesFr).toBeVisible();
            await expect(home.b2bMarketingFr).toBeVisible();
            await expect(home.requestADemoFr).toBeVisible();
            await expect(home.AnalyticsFr).toBeVisible();
            await expect(home.experienceAssetManagerFr).toBeVisible();
            await expect(home.AIProgramOverviewFr).toBeVisible();
            await expect(home.senseiGenAIFr).toBeVisible();
            await expect(home.resourceCentreECFr).toBeVisible();
            await expect(home.customerTestimonialsFr).toBeVisible();
            await expect(home.servicesAndTechnicalSupportFr).toBeVisible();
            await expect(home.partenersFr).toBeVisible();
            await expect(home.adobeSummitFr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreFr).toBeVisible();
            await expect(home.downloadAndInstallFr).toBeVisible();
            await expect(home.contactUsFr).toBeVisible();
            await expect(home.formulaManagementFr).toBeVisible();
            await expect(home.subscribeToAdobeStatusFr).toBeVisible();
            await expect(home.creativeCloudTutorialsFr).toBeVisible();
            await expect(home.adobeExperienceLeagueFr).toBeVisible();
            await expect(home.programManagementFr).toBeVisible();
            await expect(home.showAllHelpTopicsFr).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudFr).toBeVisible();
            await expect(home.footerSeeAllProductsFr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessFr).toBeVisible();
            await expect(home.footerAcrobatForBusinessFr).toBeVisible();
            await expect(home.footerDiscountsForStudentsCommunityAndFacultyFr).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsFr).toBeVisible();
            await expect(home.footerAppsforiOSFr).toBeVisible();
            await expect(home.footerAppsforAndroidFr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudFr).toBeVisible();
            await expect(home.footerTermsOfUseFr).toBeVisible();
            await expect(home.footerDownloadAndInstallationFr).toBeVisible();
            await expect(home.footerApplicationAuthenticityFr).toBeVisible();
            await expect(home.footerAdobeBlogFr).toBeVisible();
            await expect(home.footerAdobeDeveloperFr).toBeVisible();
            await expect(home.footerSigninToYourAccountFr).toBeVisible();
            await expect(home.footerAboutFr).toBeVisible();
            await expect(home.footerIntegrityFr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[21].name}, ${features[21].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[21].path}`);

        await test.step('Validating Germany Locale page', async () => {
            await page.goto(`${baseURL}${features[21].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[21].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.Tologin).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.privateUsersAndFreelancersGr).toBeVisible();
            await expect(home.businessGr).toBeVisible();
            await expect(home.allOffersAndPricesGr).toBeVisible();
            await expect(home.photoshopGr).toBeVisible();
            await expect(home.adobeStockGr).toBeVisible();
            await expect(home.viewAllProductsGr).toBeVisible();
            await expect(home.photographyGr).toBeVisible();
            await expect(home.pdfGr).toBeVisible();
            await expect(home.AIOverviewCCGr).toBeVisible();
            await expect(home.adobeFireflyGr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatGr).toBeVisible();
            await expect(home.offerAndPricesGr).toBeVisible();
            await expect(home.pursueGr).toBeVisible();
            await expect(home.authoritiesGr).toBeVisible();
            await expect(home.AIOverviewDCGr).toBeVisible();
            await expect(home.AIinAcrobatGr).toBeVisible();
            await expect(home.pdfToWordGr).toBeVisible();
            await expect(home.viewAllOnlineToolsGr).toBeVisible();
            await expect(home.resourcesForDevelopmentGr).toBeVisible();
            await expect(home.articlesAndReportsGr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudGr).toBeVisible();
            await expect(home.insightsFromDataAndTargetGroupsGr).toBeVisible();
            await expect(home.b2bMarketingGr).toBeVisible();
            await expect(home.requestADemoGr).toBeVisible();
            await expect(home.AnalyticsGr).toBeVisible();
            await expect(home.experienceManagerAssetsGr).toBeVisible();
            await expect(home.AIOverviewECGr).toBeVisible();
            await expect(home.senseiGenAIGr).toBeVisible();
            await expect(home.resourceCentreECGr).toBeVisible();
            await expect(home.experienceCloudBlogGr).toBeVisible();
            await expect(home.servicesAndSupportGr).toBeVisible();
            await expect(home.partnerSupportGr).toBeVisible();
            await expect(home.adobeSummitGr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeHelpCentreGr).toBeVisible();
            await expect(home.downloadAndInstallGr).toBeVisible();
            await expect(home.contactGr).toBeVisible();
            await expect(home.manageMyAccountGr).toBeVisible();
            await expect(home.manageSubscriptionGr).toBeVisible();
            await expect(home.getInformationAboutTipsTutorialsAndSpecialOffersGr).toBeVisible();
            await expect(home.creativeCloudTutorialsGr).toBeVisible();
            await expect(home.adobeExperienceLeagueGr).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudGr).toBeVisible();
            await expect(home.footerviewAllProductsGr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessGr).toBeVisible();
            await expect(home.footerAcrobatForBusinessUsersGr).toBeVisible();
            await expect(home.footerDiscountsForPupilsStudentsAndTeachersGr).toBeVisible();
            await expect(home.footereLearningGr).toBeVisible();
            await expect(home.footermobileAppsForiOSGr).toBeVisible();
            await expect(home.footermobileAppdForAndroidGr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudGr).toBeVisible();
            await expect(home.footerTermsOfUseGr).toBeVisible();
            await expect(home.footerDownloadAndInstallGr).toBeVisible();
            await expect(home.footerOriginalAdobeSoftwareGr).toBeVisible();
            await expect(home.footerAdobeBlogGr).toBeVisible();
            await expect(home.footerAdobeDevelopersGr).toBeVisible();
            await expect(home.footerloginToYourAccountGr).toBeVisible();
            await expect(home.footerCancelContractsHereGr).toBeVisible();
            await expect(home.footerAboutAdobeGr).toBeVisible();
            await expect(home.footerIntegrityGr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[89].name}, ${features[89].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[89].path}`);

        await test.step('Validating Japan Locale page', async () => {
            await page.goto(`${baseURL}${features[89].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[89].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.Tologin).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCJp).toBeVisible();
            await expect(home.forPhotographersJp).toBeVisible();
            await expect(home.viewPlansAndPricesJp).toBeVisible();
            await expect(home.photoshopJp).toBeVisible();
            await expect(home.adobeFireflyJp).toBeVisible();
            await expect(home.photographyJp).toBeVisible();
            await expect(home.pdfJp).toBeVisible();
            await expect(home.AIOverviewCCJp).toBeVisible();
            await expect(home.adobeFireflyAIJp).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatJp).toBeVisible();
            await expect(home.acrobatPlansAndPricingJp).toBeVisible();
            await expect(home.seeAllProductsJp).toBeVisible();
            await expect(home.forCorporationsJp).toBeVisible();
            await expect(home.personalVersionJp).toBeVisible();
            await expect(home.AIOverViewJp).toBeVisible();
            await expect(home.acrobatAIJp).toBeVisible();
            await expect(home.convertPDFtoWordJp).toBeVisible();
            await expect(home.showAllToolsJp).toBeVisible();
            await expect(home.developerResourcesJp).toBeVisible();
            await expect(home.articlesAndReportsJp).toBeVisible();
            await expect(home.clickHereForConsultationDCJp).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudJp).toBeVisible();
            await expect(home.dataInsightsAndAudiencesJp).toBeVisible();
            await expect(home.introductionConsultationJp).toBeVisible();
            await expect(home.adobeAnalyticsJp).toBeVisible();
            await expect(home.adobeExperienceManagerAssetsJp).toBeVisible();
            await expect(home.AIOverviewECJp).toBeVisible();
            await expect(home.adobeSenseiGenAiECJp).toBeVisible();
            await expect(home.resourceCentreJp).toBeVisible();
            await expect(home.experienceCloudBlogJp).toBeVisible();
            await expect(home.servicesAndSupportJp).toBeVisible();
            await expect(home.partenerJp).toBeVisible();
            await expect(home.adobeSummitJp).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterJp).toBeVisible();
            await expect(home.downloadAndInstallJp).toBeVisible();
            await expect(home.inquiryJp).toBeVisible();
            await expect(home.accountManagementJp).toBeVisible();
            await expect(home.adobeStatusSubscriptionJp).toBeVisible();
            await expect(home.creativeCloudTutorialJp).toBeVisible();
            await expect(home.csmPortalJp).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudJp).toBeVisible();
            await expect(home.footerSeeAllProductsJp).toBeVisible();
            await expect(home.footerForCorporatesJp).toBeVisible();
            await expect(home.footerContactPhoneJp).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersJp).toBeVisible();
            await expect(home.footerDigitalLearningSolutionJp).toBeVisible();
            await expect(home.footeriOSVersionAppJp).toBeVisible();
            await expect(home.footerAndroidVersionAppsJp).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudJp).toBeVisible();
            await expect(home.footerTermsOfUseJp).toBeVisible();
            await expect(home.footerDownloadAndInstallJp).toBeVisible();
            await expect(home.footerGenuineSoftwareJp).toBeVisible();
            await expect(home.footerAdobeBlogJp).toBeVisible();
            await expect(home.footerAdobeDeveloperJp).toBeVisible();
            await expect(home.footerLogInToYourAccountJp).toBeVisible();
            await expect(home.footerAboutAdobeJp).toBeVisible();
            await expect(home.footerCorporateEthicsJp).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[30].name}, ${features[30].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[30].path}`);

        await test.step('Validating Italy Locale page', async () => {
            await page.goto(`${baseURL}${features[30].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[30].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.Tologin).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.privateUsersAndFreelancersIt).toBeVisible();
            await expect(home.viewPlansAndPricingIt).toBeVisible();
            await expect(home.photoshopIt).toBeVisible();
            await expect(home.adobeStockIt).toBeVisible();
            await expect(home.photoIt).toBeVisible();
            await expect(home.pdfIt).toBeVisible();
            await expect(home.aiOverviewCCIt).toBeVisible();
            await expect(home.adobeFireflyCCIt).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIt).toBeVisible();
            await expect(home.acrobatPlansAndPricingIt).toBeVisible();
            await expect(home.companiesIt).toBeVisible();
            await expect(home.homeAndPersonalUseIt).toBeVisible();
            await expect(home.aiOverviewIt).toBeVisible();
            await expect(home.aiInAcrobatIt).toBeVisible();
            await expect(home.fromPdfToWordIt).toBeVisible();
            await expect(home.viewAllToolsIt).toBeVisible();
            await expect(home.developerResourcesIt).toBeVisible();
            await expect(home.articlesAndReportsIt).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudIt).toBeVisible();
            await expect(home.audiencesAndDataInsightsIt).toBeVisible();
            await expect(home.requestADemoIt).toBeVisible();
            await expect(home.analyticsIt).toBeVisible();
            await expect(home.experienceManagerAssetsIt).toBeVisible();
            await expect(home.aiOverviewECIt).toBeVisible();
            await expect(home.senseiGenAiIt).toBeVisible();
            await expect(home.resourceCenterIt).toBeVisible();
            await expect(home.experienceCloudBlogIt).toBeVisible();
            await expect(home.servicesAndSupportIt).toBeVisible();
            await expect(home.partnerIt).toBeVisible();
            await expect(home.adobeSummitIt).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreIt).toBeVisible();
            await expect(home.downloadAndInstallIt).toBeVisible();
            await expect(home.contactIt).toBeVisible();
            await expect(home.accountManagementIt).toBeVisible();
            await expect(home.subscribeToAdobeStatusIt).toBeVisible();
            await expect(home.creativeCloudTutorialIt).toBeVisible();
            await expect(home.adobeExperienceLeagueIt).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudIt).toBeVisible();
            await expect(home.footerViewAllProductsIt).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessIt).toBeVisible();
            await expect(home.footerAcrobatForBusinessIt).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersIt).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsIt).toBeVisible();
            await expect(home.footerAppsForiOSIt).toBeVisible();
            await expect(home.footerAppsForAndroidIt).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudIt).toBeVisible();
            await expect(home.footerTermsOfUseIt).toBeVisible();
            await expect(home.footerDownloadAndInstallationIt).toBeVisible();
            await expect(home.footerauthenticSoftwareIt).toBeVisible();
            await expect(home.footerAdobeBlogIt).toBeVisible();
            await expect(home.footerAdobeDeveloperIt).toBeVisible();
            await expect(home.footerLogInToYourAccountIt).toBeVisible();
            await expect(home.footerInformationIt).toBeVisible();
            await expect(home.footerIntegrityIt).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[1].path}`);

        await test.step('Validating Brazil Locale page', async () => {
            await page.goto(`${baseURL}${features[1].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[1].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.Tologin).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.allAppsOverviewBr).toBeVisible();
            await expect(home.adobeStockBr).toBeVisible();
            await expect(home.seeAllProductsBr).toBeVisible();
            await expect(home.personalUseBr).toBeVisible();
            await expect(home.companiesBr).toBeVisible();
            await expect(home.seePlansAndPricesBr).toBeVisible();
            await expect(home.photographyBr).toBeVisible();
            await expect(home.pdfBr).toBeVisible();
            await expect(home.AIOverviewCCBr).toBeVisible();
            await expect(home.adobeFireflyCCBr).toBeVisible();
            await expect(home.seeSpecialOffersCCBr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatBr).toBeVisible();
            await expect(home.acrobatPlansAndPricingBr).toBeVisible();
            await expect(home.adobeReaderBr).toBeVisible();
            await expect(home.companiesDcBr).toBeVisible();
            await expect(home.governmentAgenciesDcBr).toBeVisible();
            await expect(home.aiOverviewDCBr).toBeVisible();
            await expect(home.aiInAcrobatDcBr).toBeVisible();
            await expect(home.pdfToWordBr).toBeVisible();
            await expect(home.seeAllToolsBr).toBeVisible();
            await expect(home.resourcesForDevelopersBr).toBeVisible();
            await expect(home.articlesAndReportsBr).toBeVisible();

            //Validating G-Nav Experience cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudBr).toBeVisible();
            await expect(home.dataAndAudienceInsightsBr).toBeVisible();
            await expect(home.requestAdemoBr).toBeVisible();
            await expect(home.AnalyticsBr).toBeVisible();
            await expect(home.experienceManagerAssetsBr).toBeVisible();
            await expect(home.senseiBr).toBeVisible();
            await expect(home.senseiGenAIBr).toBeVisible();
            await expect(home.resourceCenterBr).toBeVisible();
            await expect(home.experienceCloudBlogBr).toBeVisible();
            await expect(home.servicesAndSupportBr).toBeVisible();
            await expect(home.partnersBr).toBeVisible();
            await expect(home.adobeSummitBr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterBr).toBeVisible();
            await expect(home.downloadAndInstallBr).toBeVisible();
            await expect(home.contactUsBr).toBeVisible();
            await expect(home.manageMyAccountBr).toBeVisible();
            await expect(home.subscribeToAdobeStatusBr).toBeVisible();
            await expect(home.creativeCloudTutorialsBr).toBeVisible();
            await expect(home.adobeExperienceLeagueBr).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudBr).toBeVisible();
            await expect(home.footerSeeAllProductsBr).toBeVisible();
            await expect(home.footerCreativeCloudForEnterpriseBr).toBeVisible();
            await expect(home.footeracrobatForBusinessBr).toBeVisible();
            await expect(home.footerdiscountsForStudentsAndTeachersBr).toBeVisible();
            await expect(home.footerdigitalLearningSolutionsBr).toBeVisible();
            await expect(home.footeriOSappsBr).toBeVisible();
            await expect(home.footerAndroidappsBr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudBr).toBeVisible();
            await expect(home.footerTermsOfUseBr).toBeVisible();
            await expect(home.footerDownloadAndInstallBr).toBeVisible();
            await expect(home.footerOriginalSoftwareBr).toBeVisible();
            await expect(home.footerAdobeBlogBr).toBeVisible();
            await expect(home.footerAdobeDeveloperBr).toBeVisible();
            await expect(home.footerLoginToYourAccountBr).toBeVisible();
            await expect(home.footerAboutBr).toBeVisible();
            await expect(home.footerIntergityBr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();

        });
    });

    test(`${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[2].path}`);

        await test.step('Validating Canada English Locale page', async () => {
            await page.goto(`${baseURL}${features[2].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[2].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.signInButtonCa).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCCa).toBeVisible();
            await expect(home.schoolsAndUniversitiesCa).toBeVisible();
            await expect(home.viewPlansAndPricesCa).toBeVisible();
            await expect(home.photoshopCa).toBeVisible();
            await expect(home.AdobeStockCa).toBeVisible();
            await expect(home.photoCa).toBeVisible();
            await expect(home.pdfCa).toBeVisible();
            await expect(home.aiOverviewCCCa).toBeVisible();
            await expect(home.adobeFireflyCa).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatCa).toBeVisible();
            await expect(home.acrobatPlansAndPricingCa).toBeVisible();
            await expect(home.acrobatReaderCa).toBeVisible();
            await expect(home.BusinessCa).toBeVisible();
            await expect(home.governmentCa).toBeVisible();
            await expect(home.aiOverviewDCCa).toBeVisible();
            await expect(home.aiInAcrobatCa).toBeVisible();
            await expect(home.pdfToWordCa).toBeVisible();
            await expect(home.viewAllToolsCa).toBeVisible();
            await expect(home.developerResourcesCa).toBeVisible();
            await expect(home.articlesAndReportsCa).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudCa).toBeVisible();
            await expect(home.dataInsightsAndAudiencesCa).toBeVisible();
            await expect(home.requestDemoCa).toBeVisible();
            await expect(home.AnalyticsCa).toBeVisible();
            await expect(home.experienceManagerAssetCa).toBeVisible();
            await expect(home.aiOverviewECCa).toBeVisible();
            await expect(home.senseiGenAICa).toBeVisible();
            await expect(home.resourceCentreCa).toBeVisible();
            await expect(home.experienceCloudBlogCa).toBeVisible();
            await expect(home.trainingCa).toBeVisible();
            await expect(home.partenersCa).toBeVisible();
            await expect(home.adobeSummitCa).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreCa).toBeVisible();
            await expect(home.downloadAndInstallCa).toBeVisible();
            await expect(home.contactUsCa).toBeVisible();
            await expect(home.manageMyAccountCa).toBeVisible();
            await expect(home.subscribeToAdobeStatusCa).toBeVisible();
            await expect(home.creativeCloudTutorialsCa).toBeVisible();
            await expect(home.adobeExperienceLeagueCa).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudCa).toBeVisible();
            await expect(home.footerViewAllProductsCa).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessCa).toBeVisible();
            await expect(home.footerAcrobatForBusinessCa).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersCa).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsCa).toBeVisible();
            await expect(home.footerAppsForiOSCa).toBeVisible();
            await expect(home.footerAppsForAndroidCa).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudCa).toBeVisible();
            await expect(home.footerTermsOfUseCa).toBeVisible();
            await expect(home.footerDownloadAndInstallCa).toBeVisible();
            await expect(home.footerGenuineSoftwareCa).toBeVisible();
            await expect(home.footerAdobeBlogCa).toBeVisible();
            await expect(home.footerAdobeDeveloperCa).toBeVisible();
            await expect(home.footerLogInToYourAccountCa).toBeVisible();
            await expect(home.footerAboutCa).toBeVisible();
            await expect(home.footerIntegrityCa).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[3].name}, ${features[3].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[3].path}`);

        await test.step('Validating Canada French Locale page', async () => {
            await page.goto(`${baseURL}${features[3].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[3].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCCaFr).toBeVisible();
            await expect(home.schoolsAndUniversitiesCaFr).toBeVisible();
            await expect(home.seeTheFormulasAndPricesCaFr).toBeVisible();
            await expect(home.photoshopCaFr).toBeVisible();
            await expect(home.AdobeStockCaFr).toBeVisible();
            await expect(home.photographyCaFr).toBeVisible();
            await expect(home.pdfCaFr).toBeVisible();
            await expect(home.aiProgramOverviewCCCaFr).toBeVisible();
            await expect(home.adobeFireflyCaFr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatCaFr).toBeVisible();
            await expect(home.acrobatPlansAndPricingCaFr).toBeVisible();
            await expect(home.acrobatReaderCaFr).toBeVisible();
            await expect(home.BusinessCaFr).toBeVisible();
            await expect(home.administrationCaFr).toBeVisible();
            await expect(home.aiProgramOverviewDCCaFr).toBeVisible();
            await expect(home.aiInAcrobatCaFr).toBeVisible();
            await expect(home.pdfToWordCaFr).toBeVisible();
            await expect(home.seeAllToolsCaFr).toBeVisible();
            await expect(home.resourcesForDevelopmentSpecialistsCaFr).toBeVisible();
            await expect(home.articlesAndReportsCaFr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudCaFr).toBeVisible();
            await expect(home.dataAndAudienceInsightsCaFr).toBeVisible();
            await expect(home.requestDemoCaFr).toBeVisible();
            await expect(home.AnalyticsCaFr).toBeVisible();
            await expect(home.experienceManagerAssetsCaFr).toBeVisible();
            await expect(home.aiProgramOverviewECCaFr).toBeVisible();
            await expect(home.senseiGenAICaFr).toBeVisible();
            await expect(home.resourceCentreCaFr).toBeVisible();
            await expect(home.experienceCloudBlogCaFr).toBeVisible();
            await expect(home.trainingCaFr).toBeVisible();
            await expect(home.partenersCaFr).toBeVisible();
            await expect(home.adobeSummitCaFr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreCaFr).toBeVisible();
            await expect(home.downloadAndInstallCaFr).toBeVisible();
            await expect(home.contactUsCaFr).toBeVisible();
            await expect(home.accountManagementCaFr).toBeVisible();
            await expect(home.subscribeToAdobeStatusCaFr).toBeVisible();
            await expect(home.creativeCloudTutorialsCaFr).toBeVisible();
            await expect(home.adobeExperienceLeagueCaFr).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudCaFr).toBeVisible();
            await expect(home.footerSeeAllProductsCaFr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessCaFr).toBeVisible();
            await expect(home.footerAcrobatForBusinessCaFr).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndFacultyCaFr).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsCaFr).toBeVisible();
            await expect(home.footerAppsForiOSCaFr).toBeVisible();
            await expect(home.footerAppsForAndroidCaFr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudCaFr).toBeVisible();
            await expect(home.footerTermsOfUseCaFr).toBeVisible();
            await expect(home.footerDownloadAndInstallationCaFr).toBeVisible();
            await expect(home.footerApplicationAuthenticityCaFr).toBeVisible();
            await expect(home.footerAdobeBlogCaFr).toBeVisible();
            await expect(home.footerAdobeDeveloperCaFr).toBeVisible();
            await expect(home.footerLogInToYourAccountCaFr).toBeVisible();
            await expect(home.footerAboutCaFr).toBeVisible();
            await expect(home.footerIntegrityCaFr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[4].name}, ${features[4].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[4].path}`);

        await test.step('Validating Chile Locale page', async () => {
            await page.goto(`${baseURL}${features[4].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[4].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.discoverAllApplicationsCl).toBeVisible();
            await expect(home.adobeStockCl).toBeVisible();
            await expect(home.seeAllProductsCl).toBeVisible();
            await expect(home.IndividualsCl).toBeVisible();
            await expect(home.seePlansAndPricesCl).toBeVisible();
            await expect(home.photographyCl).toBeVisible();
            await expect(home.pdfCl).toBeVisible();
            await expect(home.AIOverviewCCCl).toBeVisible();
            await expect(home.adobeFirefly).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatCl).toBeVisible();
            await expect(home.acrobatPlansAndPricingCl).toBeVisible();
            await expect(home.acrobatReaderCl).toBeVisible();
            await expect(home.companiesCl).toBeVisible();
            await expect(home.homeAndPersonalUseCl).toBeVisible();
            await expect(home.aiOverviewDCCl).toBeVisible();
            await expect(home.aiInAcrobatCl).toBeVisible();
            await expect(home.fromPdfToWordCl).toBeVisible();
            await expect(home.fromWordToPDFCl).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsCl).toBeVisible();
            await expect(home.articlesAndReportsCl).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudCl).toBeVisible();
            await expect(home.dataAndAudienceInsightsCl).toBeVisible();
            await expect(home.requestADemoCl).toBeVisible();
            await expect(home.AnalyticsCl).toBeVisible();
            await expect(home.experienceManagerAssetsCl).toBeVisible();
            await expect(home.aiOverviewECCl).toBeVisible();
            await expect(home.senseiGenAICl).toBeVisible();
            await expect(home.resourceCentreCl).toBeVisible();
            await expect(home.experienceCloudBlogCl).toBeVisible();
            await expect(home.trainingCl).toBeVisible();
            await expect(home.partenersCl).toBeVisible();
            await expect(home.adobeSummitCl).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreCl).toBeVisible();
            await expect(home.downloadAndInstallCl).toBeVisible();
            await expect(home.contactCl).toBeVisible();
            await expect(home.manageMyAccountCl).toBeVisible();
            await expect(home.subscribeToAdobeStatusCl).toBeVisible();
            await expect(home.creativeCloudTutorialsCl).toBeVisible();
            await expect(home.adobeExperienceLeagueCl).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudCl).toBeVisible();
            await expect(home.footerSeeAllProductsCl).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesCl).toBeVisible();
            await expect(home.footerAcrobatForCompaniesCl).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersCl).toBeVisible();
            await expect(home.footerDigitalLearningCl).toBeVisible();
            await expect(home.footeriOSAppsCl).toBeVisible();
            await expect(home.footerAndroidAppsCl).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudCl).toBeVisible();
            await expect(home.footerTermsOfUseCl).toBeVisible();
            await expect(home.footerDownloadAndInstallCl).toBeVisible();
            await expect(home.footerOriginalSoftwareCl).toBeVisible();
            await expect(home.footerAdobeBlogCl).toBeVisible();
            await expect(home.footerAdobeDeveloperCl).toBeVisible();
            await expect(home.footerLogInToYourAccountCl).toBeVisible();
            await expect(home.footerAboutCl).toBeVisible();
            await expect(home.footerIntegrityCl).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();

        });
    });

    test(`${features[5].name}, ${features[5].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[5].path}`);

        await test.step('Validating Colombia Locale page', async () => {
            await page.goto(`${baseURL}${features[5].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[5].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCCo).toBeVisible();
            await expect(home.photographersCo).toBeVisible();
            await expect(home.seePlansAndPricesCo).toBeVisible();
            await expect(home.photoshopCo).toBeVisible();
            await expect(home.AdobeStockCo).toBeVisible();
            await expect(home.photoCo).toBeVisible();
            await expect(home.pdfCo).toBeVisible();
            await expect(home.aiOverviewCCCo).toBeVisible();
            await expect(home.adobeFireflyCo).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatCo).toBeVisible();
            await expect(home.acrobatPlansAndPricingCo).toBeVisible();
            await expect(home.acrobatReaderCo).toBeVisible();
            await expect(home.companiesCo).toBeVisible();
            await expect(home.homeAndPersonalUseCo).toBeVisible();
            await expect(home.aiOverviewDCCo).toBeVisible();
            await expect(home.aiInAcrobatCo).toBeVisible();
            await expect(home.fromPdfToWordCo).toBeVisible();
            await expect(home.fromWordToPDFCo).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsCo).toBeVisible();
            await expect(home.articlesAndReportsCo).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudCo).toBeVisible();
            await expect(home.dataAndAudienceInsightsCo).toBeVisible();
            await expect(home.requestDemoCo).toBeVisible();
            await expect(home.AnalyticsCo).toBeVisible();
            await expect(home.experienceManagerAssetsCo).toBeVisible();
            await expect(home.aiOverviewECCo).toBeVisible();
            await expect(home.senseiGenAICo).toBeVisible();
            await expect(home.resourceCentreCo).toBeVisible();
            await expect(home.experienceCloudBlogCo).toBeVisible();
            await expect(home.trainingCo).toBeVisible();
            await expect(home.partenersCo).toBeVisible();
            await expect(home.adobeSummitCo).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreCo).toBeVisible();
            await expect(home.downloadAndInstallCo).toBeVisible();
            await expect(home.contactCo).toBeVisible();
            await expect(home.manageMyAccountCo).toBeVisible();
            await expect(home.subscribeToAdobeStatusCo).toBeVisible();
            await expect(home.creativeCloudTutorialsCo).toBeVisible();
            await expect(home.adobeExperienceLeagueCo).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudCo).toBeVisible();
            await expect(home.footerSeeAllProductsCo).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesCo).toBeVisible();
            await expect(home.footerAcrobatForCompaniesCo).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersCo).toBeVisible();
            await expect(home.footerDigitalLearningCo).toBeVisible();
            await expect(home.footeriOSAppsCo).toBeVisible();
            await expect(home.footerAndroidAppsCo).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudCo).toBeVisible();
            await expect(home.footerTermsOfUseCo).toBeVisible();
            await expect(home.footerDownloadAndInstallCo).toBeVisible();
            await expect(home.footerOriginalSoftwareCo).toBeVisible();
            await expect(home.footerAdobeBlogCo).toBeVisible();
            await expect(home.footerAdobeDeveloperCo).toBeVisible();
            await expect(home.footerLogInToYourAccountCo).toBeVisible();
            await expect(home.footerAboutCo).toBeVisible();
            await expect(home.footerIntegrityCo).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[6].name}, ${features[6].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[6].path}`);

        await test.step('Validating Costa Rica Locale page', async () => {
            await page.goto(`${baseURL}${features[6].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[6].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCCr).toBeVisible();
            await expect(home.photographersCr).toBeVisible();
            await expect(home.seePlansAndPricesCr).toBeVisible();
            await expect(home.photoshopCr).toBeVisible();
            await expect(home.AdobeStockCr).toBeVisible();
            await expect(home.photoCr).toBeVisible();
            await expect(home.pdfCr).toBeVisible();
            await expect(home.aiOverviewCCCr).toBeVisible();
            await expect(home.adobeFireflyCr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatCr).toBeVisible();
            await expect(home.acrobatPlansAndPricingCr).toBeVisible();
            await expect(home.acrobatReaderCr).toBeVisible();
            await expect(home.companiesCr).toBeVisible();
            await expect(home.homeAndPersonalCr).toBeVisible();
            await expect(home.aiOverviewDCCr).toBeVisible();
            await expect(home.aiInAcrobatCr).toBeVisible();
            await expect(home.fromPdfToWordCr).toBeVisible();
            await expect(home.fromWordToPDFCr).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsCr).toBeVisible();
            await expect(home.articlesAndReportsCr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudCr).toBeVisible();
            await expect(home.dataAndAudienceInsightsCr).toBeVisible();
            await expect(home.requestDemoCr).toBeVisible();
            await expect(home.AnalyticsCr).toBeVisible();
            await expect(home.experienceManagerAssetsCr).toBeVisible();
            await expect(home.aiOverviewECCr).toBeVisible();
            await expect(home.senseiGenAICr).toBeVisible();
            await expect(home.resourceCentreCr).toBeVisible();
            await expect(home.experienceCloudBlogCr).toBeVisible();
            await expect(home.trainingCr).toBeVisible();
            await expect(home.partenersCr).toBeVisible();
            await expect(home.adobeSummitCr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreCr).toBeVisible();
            await expect(home.downloadAndInstallCr).toBeVisible();
            await expect(home.contactCr).toBeVisible();
            await expect(home.manageMyAccountCr).toBeVisible();
            await expect(home.subscribeToAdobeStatusCr).toBeVisible();
            await expect(home.creativeCloudTutorialsCr).toBeVisible();
            await expect(home.adobeExperienceLeagueCr).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudCr).toBeVisible();
            await expect(home.footerSeeAllProductsCr).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesCr).toBeVisible();
            await expect(home.footerAcrobatForCompaniesCr).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersCr).toBeVisible();
            await expect(home.footerDigitalLearningCr).toBeVisible();
            await expect(home.footeriOSAppsCr).toBeVisible();
            await expect(home.footerAndroidAppsCr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudCr).toBeVisible();
            await expect(home.footerTermsOfUseCr).toBeVisible();
            await expect(home.footerDownloadAndInstallCr).toBeVisible();
            await expect(home.footerOriginalSoftwareCr).toBeVisible();
            await expect(home.footerAdobeBlogCr).toBeVisible();
            await expect(home.footerAdobeDeveloperCr).toBeVisible();
            await expect(home.footerLogInToYourAccountCr).toBeVisible();
            await expect(home.footerAboutCr).toBeVisible();
            await expect(home.footerIntegrityCr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[7].name}, ${features[7].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[7].path}`);

        await test.step('Validating Ecuador Locale page', async () => {
            await page.goto(`${baseURL}${features[7].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[7].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCEc).toBeVisible();
            await expect(home.photographersEc).toBeVisible();
            await expect(home.seePlansAndPricesEc).toBeVisible();
            await expect(home.photoshopEc).toBeVisible();
            await expect(home.AdobeStockEc).toBeVisible();
            await expect(home.photoEc).toBeVisible();
            await expect(home.pdfEc).toBeVisible();
            await expect(home.aiOverviewCCEc).toBeVisible();
            await expect(home.adobeFireflyEc).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatEc).toBeVisible();
            await expect(home.acrobatPlansAndPricingEc).toBeVisible();
            await expect(home.acrobatReaderEc).toBeVisible();
            await expect(home.companiesEc).toBeVisible();
            await expect(home.homeAndPersonalUseEc).toBeVisible();
            await expect(home.aiOverviewDCEc).toBeVisible();
            await expect(home.aiInAcrobatEc).toBeVisible();
            await expect(home.fromPdfToWordEc).toBeVisible();
            await expect(home.fromWordToPDFEc).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsEc).toBeVisible();
            await expect(home.articlesAndReportsEc).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudEc).toBeVisible();
            await expect(home.dataAndAudienceInsightsEc).toBeVisible();
            await expect(home.requestDemoEc).toBeVisible();
            await expect(home.AnalyticsEc).toBeVisible();
            await expect(home.experienceAssetManagerEc).toBeVisible();
            await expect(home.aiOverviewECEc).toBeVisible();
            await expect(home.senseiGenAIEc).toBeVisible();
            await expect(home.resourceCentreEc).toBeVisible();
            await expect(home.experienceCloudBlogEc).toBeVisible();
            await expect(home.trainingEc).toBeVisible();
            await expect(home.partenersEc).toBeVisible();
            await expect(home.adobeSummitEc).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreEc).toBeVisible();
            await expect(home.downloadAndInstallEc).toBeVisible();
            await expect(home.contactEc).toBeVisible();
            await expect(home.manageMyAccountEc).toBeVisible();
            await expect(home.subscribeToAdobeStatusEc).toBeVisible();
            await expect(home.creativeCloudTutorialsEc).toBeVisible();
            await expect(home.adobeExperienceLeagueEc).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudEc).toBeVisible();
            await expect(home.footerSeeAllProductsEc).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesEc).toBeVisible();
            await expect(home.footerAcrobatForCompaniesEc).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersEc).toBeVisible();
            await expect(home.footerDigitalLearningEc).toBeVisible();
            await expect(home.footeriOSAppsEc).toBeVisible();
            await expect(home.footerAndroidAppsEc).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudEc).toBeVisible();
            await expect(home.footerTermsOfUseEc).toBeVisible();
            await expect(home.footerDownloadAndInstallEc).toBeVisible();
            await expect(home.footerOriginalSoftwareEc).toBeVisible();
            await expect(home.footerAdobeBlogEc).toBeVisible();
            await expect(home.footerAdobeDeveloperEc).toBeVisible();
            await expect(home.footerLogInToYourAccountEc).toBeVisible();
            await expect(home.footerAboutEc).toBeVisible();
            await expect(home.footerIntegrityEc).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[8].name}, ${features[8].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[8].path}`);

        await test.step('Validating Guatemala Locale page', async () => {
            await page.goto(`${baseURL}${features[8].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[8].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCGt).toBeVisible();
            await expect(home.photographersGt).toBeVisible();
            await expect(home.seePlansAndPricesGt).toBeVisible();
            await expect(home.photoshopGt).toBeVisible();
            await expect(home.AdobeStockGt).toBeVisible();
            await expect(home.photoGt).toBeVisible();
            await expect(home.pdfGt).toBeVisible();
            await expect(home.aiOverviewCCGt).toBeVisible();
            await expect(home.adobeFireflyGt).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatGt).toBeVisible();
            await expect(home.acrobatPlansAndPricingGt).toBeVisible();
            await expect(home.acrobatReaderGt).toBeVisible();
            await expect(home.companiesGt).toBeVisible();
            await expect(home.homeAndPersonalUseGt).toBeVisible();
            await expect(home.aiOverviewDCGt).toBeVisible();
            await expect(home.aiInAcrobatGt).toBeVisible();
            await expect(home.fromPdfToWordGt).toBeVisible();
            await expect(home.fromWordToPDFGt).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsGt).toBeVisible();
            await expect(home.articlesAndReportsGt).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudGt).toBeVisible();
            await expect(home.dataAndAudienceInsightsGt).toBeVisible();
            await expect(home.requestDemoGt).toBeVisible();
            await expect(home.AnalyticsGt).toBeVisible();
            await expect(home.experienceAssetManagerGt).toBeVisible();
            await expect(home.aiOverviewECGt).toBeVisible();
            await expect(home.senseiGenAIGt).toBeVisible();
            await expect(home.resourceCentreGt).toBeVisible();
            await expect(home.experienceCloudBlogGt).toBeVisible();
            await expect(home.trainingGt).toBeVisible();
            await expect(home.partenersGt).toBeVisible();
            await expect(home.adobeSummitGt).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreGt).toBeVisible();
            await expect(home.downloadAndInstallGt).toBeVisible();
            await expect(home.contactGt).toBeVisible();
            await expect(home.manageMyAccountGt).toBeVisible();
            await expect(home.subscribeToAdobeStatusGt).toBeVisible();
            await expect(home.creativeCloudTutorialsGt).toBeVisible();
            await expect(home.adobeExperienceLeagueGt).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudGt).toBeVisible();
            await expect(home.footerSeeAllProductsGt).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesGt).toBeVisible();
            await expect(home.footerAcrobatForCompaniesGt).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersGt).toBeVisible();
            await expect(home.footerDigitalLearningGt).toBeVisible();
            await expect(home.footeriOSAppsGt).toBeVisible();
            await expect(home.footerAndroidAppsGt).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudGt).toBeVisible();
            await expect(home.footerTermsOfUseGt).toBeVisible();
            await expect(home.footerDownloadAndInstallGt).toBeVisible();
            await expect(home.footerOriginalSoftwareGt).toBeVisible();
            await expect(home.footerAdobeBlogGt).toBeVisible();
            await expect(home.footerAdobeDeveloperGt).toBeVisible();
            await expect(home.footerLogInToYourAccountGt).toBeVisible();
            await expect(home.footerAboutGt).toBeVisible();
            await expect(home.footerIntegrityGt).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();

        });
    });

    test(`${features[9].name}, ${features[9].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[9].path}`);

        await test.step('Validating Latin-America Locale page', async () => {
            await page.goto(`${baseURL}${features[9].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[9].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCLa).toBeVisible();
            await expect(home.photographersLa).toBeVisible();
            await expect(home.seePlansAndPricesLa).toBeVisible();
            await expect(home.photoshopLa).toBeVisible();
            await expect(home.AdobeStockLa).toBeVisible();
            await expect(home.photoLa).toBeVisible();
            await expect(home.pdfLa).toBeVisible();
            await expect(home.aiOverviewCCLa).toBeVisible();
            await expect(home.adobeFireflyLa).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatLa).toBeVisible();
            await expect(home.acrobatPlansAndPricingLa).toBeVisible();
            await expect(home.acrobatReaderLa).toBeVisible();
            await expect(home.companiesLa).toBeVisible();
            await expect(home.homeAndPersonalUseLa).toBeVisible();
            await expect(home.aiOverviewDCLa).toBeVisible();
            await expect(home.aiInAcrobatLa).toBeVisible();
            await expect(home.fromPdfToWordLa).toBeVisible();
            await expect(home.fromWordToPDFLa).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsLa).toBeVisible();
            await expect(home.articlesAndReportsLa).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudLa).toBeVisible();
            await expect(home.dataAndAudienceInsightsLa).toBeVisible();
            await expect(home.requestDemoLa).toBeVisible();
            await expect(home.AnalyticsLa).toBeVisible();
            await expect(home.experienceAssetManagerLa).toBeVisible();
            await expect(home.aiOverviewECLa).toBeVisible();
            await expect(home.senseiGenAILa).toBeVisible();
            await expect(home.resourceCentreLa).toBeVisible();
            await expect(home.experienceCloudBlogLa).toBeVisible();
            await expect(home.trainingLa).toBeVisible();
            await expect(home.partenersLa).toBeVisible();
            await expect(home.adobeSummitLa).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreLa).toBeVisible();
            await expect(home.downloadAndInstallLa).toBeVisible();
            await expect(home.contactLa).toBeVisible();
            await expect(home.manageMyAccountLa).toBeVisible();
            await expect(home.subscribeToAdobeStatusLa).toBeVisible();
            await expect(home.creativeCloudTutorialsLa).toBeVisible();
            await expect(home.adobeExperienceLeagueLa).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudLa).toBeVisible();
            await expect(home.footerSeeAllProductsLa).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesLa).toBeVisible();
            await expect(home.footerAcrobatForCompaniesLa).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersLa).toBeVisible();
            await expect(home.footerDigitalLearningLa).toBeVisible();
            await expect(home.footeriOSAppsLa).toBeVisible();
            await expect(home.footerAndroidAppsLa).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudLa).toBeVisible();
            await expect(home.footerTermsOfUseLa).toBeVisible();
            await expect(home.footerDownloadAndInstallLa).toBeVisible();
            await expect(home.footerOriginalSoftwareLa).toBeVisible();
            await expect(home.footerAdobeBlogLa).toBeVisible();
            await expect(home.footerAdobeDeveloperLa).toBeVisible();
            await expect(home.footerLogInToYourAccountLa).toBeVisible();
            await expect(home.footerAboutLa).toBeVisible();
            await expect(home.footerIntegrityLa).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[10].name}, ${features[10].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[10].path}`);

        await test.step('Validating Mexico Locale page', async () => {
            await page.goto(`${baseURL}${features[10].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[10].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCMx).toBeVisible();
            await expect(home.photographersMx).toBeVisible();
            await expect(home.seePlansAndPricesMx).toBeVisible();
            await expect(home.photoshopMx).toBeVisible();
            await expect(home.AdobeStockMx).toBeVisible();
            await expect(home.photoMx).toBeVisible();
            await expect(home.pdfMx).toBeVisible();
            await expect(home.aiOverviewCCMx).toBeVisible();
            await expect(home.adobeFireflyMx).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatMx).toBeVisible();
            await expect(home.acrobatPlansAndPricingMx).toBeVisible();
            await expect(home.acrobatReaderMx).toBeVisible();
            await expect(home.companiesMx).toBeVisible();
            await expect(home.homeAndPersonalUseMx).toBeVisible();
            await expect(home.aiOverviewDCMx).toBeVisible();
            await expect(home.aiInAcrobatMx).toBeVisible();
            await expect(home.fromPdfToWordMx).toBeVisible();
            await expect(home.fromWordToPDFMx).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsMx).toBeVisible();
            await expect(home.articlesAndReportsMx).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudMx).toBeVisible();
            await expect(home.dataAndAudienceInsightsMx).toBeVisible();
            await expect(home.requestDemoMx).toBeVisible();
            await expect(home.AnalyticsMx).toBeVisible();
            await expect(home.experienceAssetManagerMx).toBeVisible();
            await expect(home.aiOverviewECMx).toBeVisible();
            await expect(home.senseiGenAIMx).toBeVisible();
            await expect(home.resourceCentreMx).toBeVisible();
            await expect(home.experienceCloudBlogMx).toBeVisible();
            await expect(home.trainingMx).toBeVisible();
            await expect(home.partenersMx).toBeVisible();
            await expect(home.adobeSummitMx).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreMx).toBeVisible();
            await expect(home.downloadAndInstallMx).toBeVisible();
            await expect(home.contactMx).toBeVisible();
            await expect(home.manageMyAccountMx).toBeVisible();
            await expect(home.subscribeToAdobeStatusMx).toBeVisible();
            await expect(home.creativeCloudTutorialsMx).toBeVisible();
            await expect(home.adobeExperienceLeagueMx).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudMx).toBeVisible();
            await expect(home.footerSeeAllProductsMx).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesMx).toBeVisible();
            await expect(home.footerAcrobatForCompaniesMx).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersMx).toBeVisible();
            await expect(home.footerDigitalLearningMx).toBeVisible();
            await expect(home.footeriOSAppsMx).toBeVisible();
            await expect(home.footerAndroidAppsMx).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudMx).toBeVisible();
            await expect(home.footerTermsOfUseMx).toBeVisible();
            await expect(home.footerDownloadAndInstallMx).toBeVisible();
            await expect(home.footerOriginalSoftwareMx).toBeVisible();
            await expect(home.footerAdobeBlogMx).toBeVisible();
            await expect(home.footerAdobeDeveloperMx).toBeVisible();
            await expect(home.footerLogInToYourAccountMx).toBeVisible();
            await expect(home.footerAboutMx).toBeVisible();
            await expect(home.footerIntegrityMx).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[11].name}, ${features[11].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[11].path}`);

        await test.step('Validating Peru Locale page', async () => {
            await page.goto(`${baseURL}${features[11].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[11].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCPe).toBeVisible();
            await expect(home.photographersPe).toBeVisible();
            await expect(home.seePlansAndPricesPe).toBeVisible();
            await expect(home.photoshopPe).toBeVisible();
            await expect(home.AdobeStockPe).toBeVisible();
            await expect(home.photoPe).toBeVisible();
            await expect(home.pdfPe).toBeVisible();
            await expect(home.aiOverviewCCPe).toBeVisible();
            await expect(home.adobeFireflyPe).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatPe).toBeVisible();
            await expect(home.acrobatPlansAndPricingPe).toBeVisible();
            await expect(home.acrobatReaderPe).toBeVisible();
            await expect(home.companiesPe).toBeVisible();
            await expect(home.homeAndPersonalUsePe).toBeVisible();
            await expect(home.aiOverviewDCPe).toBeVisible();
            await expect(home.aiInAcrobatPe).toBeVisible();
            await expect(home.fromPdfToWordPe).toBeVisible();
            await expect(home.fromWordToPDFPe).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsPe).toBeVisible();
            await expect(home.articlesAndReportsPe).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudPe).toBeVisible();
            await expect(home.dataAndAudienceInsightsPe).toBeVisible();
            await expect(home.requestDemoPe).toBeVisible();
            await expect(home.AnalyticsPe).toBeVisible();
            await expect(home.experienceAssetManagerPe).toBeVisible();
            await expect(home.aiOverviewECPe).toBeVisible();
            await expect(home.senseiGenAIPe).toBeVisible();
            await expect(home.resourceCentrePe).toBeVisible();
            await expect(home.experienceCloudBlogPe).toBeVisible();
            await expect(home.trainingPe).toBeVisible();
            await expect(home.partenersPe).toBeVisible();
            await expect(home.adobeSummitPe).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentrePe).toBeVisible();
            await expect(home.downloadAndInstallPe).toBeVisible();
            await expect(home.contactPe).toBeVisible();
            await expect(home.manageMyAccountPe).toBeVisible();
            await expect(home.subscribeToAdobeStatusPe).toBeVisible();
            await expect(home.creativeCloudTutorialsPe).toBeVisible();
            await expect(home.adobeExperienceLeaguePe).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudPe).toBeVisible();
            await expect(home.footerSeeAllProductsPe).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessPe).toBeVisible();
            await expect(home.footerAcrobatForBusinessPe).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersPe).toBeVisible();
            await expect(home.footerDigitalLearningPe).toBeVisible();
            await expect(home.footeriOSAppsPe).toBeVisible();
            await expect(home.footerAndroidAppsPe).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudPe).toBeVisible();
            await expect(home.footerTermsOfUsePe).toBeVisible();
            await expect(home.footerDownloadAndInstallPe).toBeVisible();
            await expect(home.footerOriginalSoftwarePe).toBeVisible();
            await expect(home.footerAdobeBlogPe).toBeVisible();
            await expect(home.footerAdobeDeveloperPe).toBeVisible();
            await expect(home.footerLogInToYourAccountPe).toBeVisible();
            await expect(home.footerAboutPe).toBeVisible();
            await expect(home.footerIntegrityPe).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[12].name}, ${features[12].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[12].path}`);

        await test.step('Validating Puerto Rico Locale page', async () => {
            await page.goto(`${baseURL}${features[12].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[12].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCPr).toBeVisible();
            await expect(home.photographersPr).toBeVisible();
            await expect(home.seePlansAndPricesPr).toBeVisible();
            await expect(home.photoshopPr).toBeVisible();
            await expect(home.AdobeStockPr).toBeVisible();
            await expect(home.photoPr).toBeVisible();
            await expect(home.pdfPr).toBeVisible();
            await expect(home.aiOverviewCCPr).toBeVisible();
            await expect(home.adobeFireflyPr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatPr).toBeVisible();
            await expect(home.acrobatPlansAndPricingPr).toBeVisible();
            await expect(home.acrobatReaderPr).toBeVisible();
            await expect(home.companiesPr).toBeVisible();
            await expect(home.homeAndPersonalUsePr).toBeVisible();
            await expect(home.aiOverviewDCPr).toBeVisible();
            await expect(home.aiInAcrobatPr).toBeVisible();
            await expect(home.fromPdfToWordPr).toBeVisible();
            await expect(home.fromWordToPDFPr).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsPr).toBeVisible();
            await expect(home.articlesAndReportsPr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudPr).toBeVisible();
            await expect(home.dataAndAudienceInsightsPr).toBeVisible();
            await expect(home.requestDemoPr).toBeVisible();
            await expect(home.AnalyticsPr).toBeVisible();
            await expect(home.experienceAssetManagerPr).toBeVisible();
            await expect(home.aiOverviewECPr).toBeVisible();
            await expect(home.senseiGenAIPr).toBeVisible();
            await expect(home.resourceCentrePr).toBeVisible();
            await expect(home.experienceCloudBlogPr).toBeVisible();
            await expect(home.trainingPr).toBeVisible();
            await expect(home.partenersPr).toBeVisible();
            await expect(home.adobeSummitPr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentrePr).toBeVisible();
            await expect(home.downloadAndInstallPr).toBeVisible();
            await expect(home.contactPr).toBeVisible();
            await expect(home.manageMyAccountPr).toBeVisible();
            await expect(home.subscribeToAdobeStatusPr).toBeVisible();
            await expect(home.creativeCloudTutorialsPr).toBeVisible();
            await expect(home.adobeExperienceLeaguePr).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudPr).toBeVisible();
            await expect(home.footerSeeAllProductsPr).toBeVisible();
            await expect(home.footerCreativeCloudForCompaniesPr).toBeVisible();
            await expect(home.footerAcrobatForCompaniesPr).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersPr).toBeVisible();
            await expect(home.footerDigitalLearningPr).toBeVisible();
            await expect(home.footeriOSAppsPr).toBeVisible();
            await expect(home.footerAndroidAppsPr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudPr).toBeVisible();
            await expect(home.footerTermsOfUsePr).toBeVisible();
            await expect(home.footerDownloadAndInstallPr).toBeVisible();
            await expect(home.footerOriginalSoftwarePr).toBeVisible();
            await expect(home.footerAdobeBlogPr).toBeVisible();
            await expect(home.footerAdobeDeveloperPr).toBeVisible();
            await expect(home.footerLogInToYourAccountPr).toBeVisible();
            await expect(home.footerAboutPr).toBeVisible();
            await expect(home.footerIntegrityPr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[14].name}, ${features[14].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[14].path}`);

        await test.step('Validating Africa-English Locale page', async () => {
            await page.goto(`${baseURL}${features[14].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[14].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.homeUsersAndFreelancersAf).toBeVisible();
            await expect(home.photographersAf).toBeVisible();
            await expect(home.viewPlansAndPricesAf).toBeVisible();
            await expect(home.photoshopAf).toBeVisible();
            await expect(home.AdobeStockAf).toBeVisible();
            await expect(home.photoAf).toBeVisible();
            await expect(home.pdfAf).toBeVisible();
            await expect(home.aiOverviewCCAf).toBeVisible();
            await expect(home.adobeFireflyAf).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatAf).toBeVisible();
            await expect(home.acrobatPlansAndPricingAf).toBeVisible();
            await expect(home.acrobatReaderAf).toBeVisible();
            await expect(home.businessAf).toBeVisible();
            await expect(home.governmentAf).toBeVisible();
            await expect(home.aiOverviewDCAf).toBeVisible();
            await expect(home.aiInAcrobatAf).toBeVisible();
            await expect(home.fromPdfToWordAf).toBeVisible();
            await expect(home.fromWordToPDFAf).toBeVisible();
            await expect(home.developerResourcesAf).toBeVisible();
            await expect(home.articlesAndReportsAf).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudAf).toBeVisible();
            await expect(home.dataInsightsAndAudiencesAf).toBeVisible();
            await expect(home.requestDemoAf).toBeVisible();
            await expect(home.AnalyticsAf).toBeVisible();
            await expect(home.experienceManagerAssetsAf).toBeVisible();
            await expect(home.aiOverviewECAf).toBeVisible();
            await expect(home.senseiGenAIAf).toBeVisible();
            await expect(home.resourceCentreAf).toBeVisible();
            await expect(home.experienceCloudBlogAf).toBeVisible();
            await expect(home.trainingAf).toBeVisible();
            await expect(home.partenersAf).toBeVisible();
            await expect(home.adobeSummitAf).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreAf).toBeVisible();
            await expect(home.downloadAndInstallAf).toBeVisible();
            await expect(home.contactAf).toBeVisible();
            await expect(home.manageMyAccountAF).toBeVisible();
            await expect(home.subscribeToAdobeStatusAf).toBeVisible();
            await expect(home.creativeCloudTutorialsAf).toBeVisible();
            await expect(home.adobeExperienceLeagueAf).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudAf).toBeVisible();
            await expect(home.footerViewAllProductsAf).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessAf).toBeVisible();
            await expect(home.footerAcrobatForBusinessAf).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersAf).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsAf).toBeVisible();
            await expect(home.footerAppsForiOSAf).toBeVisible();
            await expect(home.footerAppsForAndroisAf).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudAf).toBeVisible();
            await expect(home.footerTermsOfUseAf).toBeVisible();
            await expect(home.footerDownloadAndInstallAf).toBeVisible();
            await expect(home.footerGenuineSoftwareAf).toBeVisible();
            await expect(home.footerAdobeBlogAf).toBeVisible();
            await expect(home.footerAdobeDeveloperAf).toBeVisible();
            await expect(home.footerLogInToYourAccountAf).toBeVisible();
            await expect(home.footerAboutAf).toBeVisible();
            await expect(home.footerIntegrityAf).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[15].name}, ${features[15].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[15].path}`);

        await test.step('Validating Belgique-French Locale page', async () => {
            await page.goto(`${baseURL}${features[15].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[15].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCBeFr).toBeVisible();
            await expect(home.photographersBeFr).toBeVisible();
            await expect(home.seeTheFormulasAndPricesBeFr).toBeVisible();
            await expect(home.photoshopBeFr).toBeVisible();
            await expect(home.AdobeStockBeFr).toBeVisible();
            await expect(home.photographyBeFr).toBeVisible();
            await expect(home.pdfBeFr).toBeVisible();
            await expect(home.adobeFireflyBeFr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatBeFr).toBeVisible();
            await expect(home.acrobatPlansAndPricingBeFr).toBeVisible();
            await expect(home.acrobatReaderBeFr).toBeVisible();
            await expect(home.businessBeFr).toBeVisible();
            await expect(home.administrationBeFr).toBeVisible();
            await expect(home.aiProgrammingOverviewDCBeFr).toBeVisible();
            await expect(home.aiInAcrobatBeFr).toBeVisible();
            await expect(home.pdfToWordBeFr).toBeVisible();
            await expect(home.WordToPDFBeFr).toBeVisible();
            await expect(home.resourcesForDevelopmentSpecialistsBeFr).toBeVisible();
            await expect(home.articlesAndReportsBeFr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudBeFr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesBeFr).toBeVisible();
            await expect(home.requestDemoBeFr).toBeVisible();
            await expect(home.AnalyticsBeFr).toBeVisible();
            await expect(home.experienceManagerAssetsBeFr).toBeVisible();
            await expect(home.senseiDCBeFr).toBeVisible();
            await expect(home.senseiGenAIBeFr).toBeVisible();
            await expect(home.resourceCentreBeFr).toBeVisible();
            await expect(home.customerTestimonialsBeFr).toBeVisible();
            await expect(home.trainingBeFr).toBeVisible();
            await expect(home.partenersBeFr).toBeVisible();
            await expect(home.adobeSummitBeFr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreBeFr).toBeVisible();
            await expect(home.downloadAndInstallationBeFr).toBeVisible();
            await expect(home.contactUsBeFr).toBeVisible();
            await expect(home.accountManagementBeFr).toBeVisible();
            await expect(home.formulaManagementBeFr).toBeVisible();
            await expect(home.creativeCloudTutorialsBeFr).toBeVisible();
            await expect(home.adobeExperienceLeagueBeFr).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudBeFr).toBeVisible();
            await expect(home.footerSeeAllProductsBeFr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessBeFr).toBeVisible();
            await expect(home.footerAcrobatForBusinessBeFr).toBeVisible();
            await expect(home.footerDiscountsForStudentsCommunityAndFacultyBeFr).toBeVisible();
            await expect(home.footerDigitalTrainingSolutionsBeFr).toBeVisible();
            await expect(home.footerAppsForiOSBeFr).toBeVisible();
            await expect(home.footerAppsForAndroisBeFr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudBeFr).toBeVisible();
            await expect(home.footerTermsOfUseBeFr).toBeVisible();
            await expect(home.footerDownloadAndInstallBeFr).toBeVisible();
            await expect(home.footerApplicationAuthenticityBeFr).toBeVisible();
            await expect(home.footerAdobeBlogBeFr).toBeVisible();
            await expect(home.footerAdobeDeveloperBeFr).toBeVisible();
            await expect(home.footerSignInToYourAccountBeFr).toBeVisible();
            await expect(home.footerAboutBeFr).toBeVisible();
            await expect(home.footerIntegrityBeFr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[16].name}, ${features[16].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[16].path}`);

        await test.step('Validating Belgium-English Locale page', async () => {
            await page.goto(`${baseURL}${features[16].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[16].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCBeEn).toBeVisible();
            await expect(home.photographersBeEn).toBeVisible();
            await expect(home.viewPlansAndPricesBeEn).toBeVisible();
            await expect(home.photoshopBeEn).toBeVisible();
            await expect(home.AdobeStockBeEn).toBeVisible();
            await expect(home.photoBeEn).toBeVisible();
            await expect(home.pdfBeEn).toBeVisible();
            await expect(home.aiOverviewCCBeEn).toBeVisible();
            await expect(home.adobeFireflyBeEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatBeEn).toBeVisible();
            await expect(home.acrobatPlansAndPricingBeEn).toBeVisible();
            await expect(home.acrobatReaderBeEn).toBeVisible();
            await expect(home.businessBeEn).toBeVisible();
            await expect(home.governmentBeEn).toBeVisible();
            await expect(home.aiOverviewDCBeEn).toBeVisible();
            await expect(home.aiInAcrobatBeEn).toBeVisible();
            await expect(home.pdfToWordBeEn).toBeVisible();
            await expect(home.WordToPDFBeEn).toBeVisible();
            await expect(home.developerResourcesBeEn).toBeVisible();
            await expect(home.articlesAndReportsBeEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudBeEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesBeEn).toBeVisible();
            await expect(home.requestDemoBeEn).toBeVisible();
            await expect(home.AnalyticsBeEn).toBeVisible();
            await expect(home.experienceManagerAssetsBeEn).toBeVisible();
            await expect(home.aiOverviewBeEn).toBeVisible();
            await expect(home.senseiGenAIBeEn).toBeVisible();
            await expect(home.resourceCentreBeEn).toBeVisible();
            await expect(home.experienceCloudBlogBeEn).toBeVisible();
            await expect(home.trainingBeEn).toBeVisible();
            await expect(home.partenersBeEn).toBeVisible();
            await expect(home.adobeSummitBeEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreBeEn).toBeVisible();
            await expect(home.downloadAndInstallationBeEn).toBeVisible();
            await expect(home.contactUsBeEn).toBeVisible();
            await expect(home.accountManagementBeEn).toBeVisible();
            await expect(home.subscribeToAdobeStatusBeEn).toBeVisible();
            await expect(home.creativeCloudTutorialsBeEn).toBeVisible();
            await expect(home.adobeExperienceLeagueBeEn).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudBeEn).toBeVisible();
            await expect(home.footerViewAllProductsBeEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessBeEn).toBeVisible();
            await expect(home.footerAcrobatForBusinessBeEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersBeEn).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsBeEn).toBeVisible();
            await expect(home.footerAppsForiOSBeEn).toBeVisible();
            await expect(home.footerAppsForAndroisBeEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudBeEn).toBeVisible();
            await expect(home.footerTermsOfUseBeEn).toBeVisible();
            await expect(home.footerDownloadAndInstallBeEn).toBeVisible();
            await expect(home.footerGenuineSoftwareBeEn).toBeVisible();
            await expect(home.footerAdobeBlogBeEn).toBeVisible();
            await expect(home.footerAdobeDeveloperBeEn).toBeVisible();
            await expect(home.footerLogInToYourAccountBeEn).toBeVisible();
            await expect(home.footerAboutBeEn).toBeVisible();
            await expect(home.footerIntegrityBeEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[17].name}, ${features[17].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[17].path}`);

        await test.step('Validating Belgie-Nederlands Locale page', async () => {
            await page.goto(`${baseURL}${features[17].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[17].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCBeNl).toBeVisible();
            await expect(home.photographersBeNl).toBeVisible();
            await expect(home.viewMembershipAndPricesBeNl).toBeVisible();
            await expect(home.photoshopBeNl).toBeVisible();
            await expect(home.AdobeStockBeNl).toBeVisible();
            await expect(home.photoBeNl).toBeVisible();
            await expect(home.pdfBeNl).toBeVisible();
            await expect(home.overviewOfAICCBeNl).toBeVisible();
            await expect(home.adobeFireflyBeNl).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatBeNl).toBeVisible();
            await expect(home.membershipsAndPricingForAcrobatBeNl).toBeVisible();
            await expect(home.acrobatReaderBeNl).toBeVisible();
            await expect(home.businessBeNl).toBeVisible();
            await expect(home.governmentBeNl).toBeVisible();
            await expect(home.overviewOfAIDCBeNl).toBeVisible();
            await expect(home.aiInAcrobatBeNl).toBeVisible();
            await expect(home.pdfToWordBeNl).toBeVisible();
            await expect(home.WordToPDFBeNl).toBeVisible();
            await expect(home.developerResourcesBeNl).toBeVisible();
            await expect(home.articlesAndReportsBeNl).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudBeNl).toBeVisible();
            await expect(home.dataInsightsAndTargetGroupsBeNl).toBeVisible();
            await expect(home.requestDemoBeNl).toBeVisible();
            await expect(home.AnalyticsBeNl).toBeVisible();
            await expect(home.experienceManagerAssetsBeNl).toBeVisible();
            await expect(home.overviewOfAiBeNl).toBeVisible();
            await expect(home.senseiGenAIBeNl).toBeVisible();
            await expect(home.resourceCentreBeNl).toBeVisible();
            await expect(home.experienceCloudBlogBeNl).toBeVisible();
            await expect(home.trainingBeNl).toBeVisible();
            await expect(home.partenersBeNl).toBeVisible();
            await expect(home.adobeSummitBeNl).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreBeNl).toBeVisible();
            await expect(home.downloadAndInstallationBeNl).toBeVisible();
            await expect(home.contactBeNl).toBeVisible();
            await expect(home.manageMyAccountBeNl).toBeVisible();
            await expect(home.signInToAdobeStatusBeNl).toBeVisible();
            await expect(home.creativeCloudTutorialsBeNl).toBeVisible();
            await expect(home.adobeExperienceLeagueBeNl).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudBeNl).toBeVisible();
            await expect(home.footerViewAllProductsBeNl).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessBeNl).toBeVisible();
            await expect(home.footerAcrobatForBusinessBeNl).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersBeNl).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsBeNl).toBeVisible();
            await expect(home.footerAppsForiOSBeNl).toBeVisible();
            await expect(home.footerAppsForAndroisBeNl).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudBeNl).toBeVisible();
            await expect(home.footerTermsOfUseBeNl).toBeVisible();
            await expect(home.footerDownloadAndInstallBeNl).toBeVisible();
            await expect(home.footerLegitimateSoftwareBeNl).toBeVisible();
            await expect(home.footerAdobeBlogBeNl).toBeVisible();
            await expect(home.footerAdobeDeveloperBeNl).toBeVisible();
            await expect(home.footerSignInToYourAccountBeNl).toBeVisible();
            await expect(home.footerInfoBeNl).toBeVisible();
            await expect(home.footerIntegrityBeNl).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[18].name}, ${features[18].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[18].path}`);

        await test.step('Validating CIS-English Locale page', async () => {
            await page.goto(`${baseURL}${features[18].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[18].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating G-Nav
            await expect(home.creativeCloudPlansAndPricingCISEn).toBeVisible();
            await expect(home.specialOffersCISEn).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Footer
            await expect(home.footerCreativeCloudCISEn).toBeVisible();
            await expect(home.footerViewAllProductsCISEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessCISEn).toBeVisible();
            await expect(home.footerAcrobatForBusinessCISEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersCISEn).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsCISEn).toBeVisible();
            await expect(home.footerAppsForiOSCISEn).toBeVisible();
            await expect(home.footerAppsForAndroisCISEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudCISEn).toBeVisible();
            await expect(home.footerTermsOfUseCISEn).toBeVisible();
            await expect(home.footerDownloadAndInstallCISEn).toBeVisible();
            await expect(home.footerGenuineSoftwareCISEn).toBeVisible();
            await expect(home.footerAdobeBlogCISEn).toBeVisible();
            await expect(home.footerAdobeDeveloperCISEn).toBeVisible();
            await expect(home.footerLogInToYourAccountCISEn).toBeVisible();
            await expect(home.footerAboutCISEn).toBeVisible();
            await expect(home.footerIntegrityCISEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[19].name}, ${features[19].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[19].path}`);

        await test.step('Validating CIS-Russian Locale page', async () => {
            await page.goto(`${baseURL}${features[19].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[19].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating G-Nav
            await expect(home.creativeCloudPlansAndPricingCISRu).toBeVisible();
            await expect(home.specialOffersCISRu).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Footer
            await expect(home.footerCreativeCloudCISRu).toBeVisible();
            await expect(home.footerViewAllProductsCISRu).toBeVisible();
            await expect(home.footerCreativeCloudForOrganizationCISRu).toBeVisible();
            await expect(home.footerAcrobatForBusinessCISRu).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersCISRu).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsCISRu).toBeVisible();
            await expect(home.footeriOSAppsCISRu).toBeVisible();
            await expect(home.footerAndroidAppsCISRu).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudCISRu).toBeVisible();
            await expect(home.footerTermsOfUseCISRu).toBeVisible();
            await expect(home.footerDownloadAndInstallCISRu).toBeVisible();
            await expect(home.footerLicensedSoftwareCISRu).toBeVisible();
            await expect(home.footerAdobeBlogCISRu).toBeVisible();
            await expect(home.footerAdobeDeveloperCISRu).toBeVisible();
            await expect(home.footerLogInToYourAccountCISRu).toBeVisible();
            await expect(home.footerAboutUsCISRu).toBeVisible();
            await expect(home.footerBusinessEthicsCISRu).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[20].name}, ${features[20].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[20].path}`);

        await test.step('Validating Danmark Locale page', async () => {
            await page.goto(`${baseURL}${features[20].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[20].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.Tologin).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCDk).toBeVisible();
            await expect(home.photographersDk).toBeVisible();
            await expect(home.seeSubscriptionsAndPricesDk).toBeVisible();
            await expect(home.photoshopDk).toBeVisible();
            await expect(home.AdobeStockDk).toBeVisible();
            await expect(home.photoDk).toBeVisible();
            await expect(home.pdfDk).toBeVisible();
            await expect(home.aiOverviewCCDk).toBeVisible();
            await expect(home.adobeFireflyDk).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatDk).toBeVisible();
            await expect(home.acrobatSubscriptionAndPricesDk).toBeVisible();
            await expect(home.acrobatReaderDk).toBeVisible();
            await expect(home.professionDk).toBeVisible();
            await expect(home.publicAuthoritiesDk).toBeVisible();
            await expect(home.aiOverviewDCDk).toBeVisible();
            await expect(home.aiInAcrobatDk).toBeVisible();
            await expect(home.pdfToWordDk).toBeVisible();
            await expect(home.WordToPdfDk).toBeVisible();
            await expect(home.developerResourcesDk).toBeVisible();
            await expect(home.articlesAndReportsDk).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudDk).toBeVisible();
            await expect(home.dataKnowledgeAndAudienceDk).toBeVisible();
            await expect(home.requestDemoDk).toBeVisible();
            await expect(home.AnalyticsDk).toBeVisible();
            await expect(home.experienceManagerAssetsDk).toBeVisible();
            await expect(home.aiOverviewECDk).toBeVisible();
            await expect(home.senseiGenAIDk).toBeVisible();
            await expect(home.resourceCentreDk).toBeVisible();
            await expect(home.experienceCloudBlogDk).toBeVisible();
            await expect(home.servicesAndSupportDk).toBeVisible();
            await expect(home.partenersDk).toBeVisible();
            await expect(home.adobeSummitDk).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreDk).toBeVisible();
            await expect(home.downloadAndInstallationDk).toBeVisible();
            await expect(home.contactUsDk).toBeVisible();
            await expect(home.manageMyAccountDk).toBeVisible();
            await expect(home.subscribeToAdobeStatusDk).toBeVisible();
            await expect(home.creativeCloudTutorialsDk).toBeVisible();
            await expect(home.adobeExperienceLeagueDk).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudDk).toBeVisible();
            await expect(home.footerShowAllProductsDk).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessDk).toBeVisible();
            await expect(home.footerAcrobatForBusinessDk).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersDk).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsDk).toBeVisible();
            await expect(home.footeriOSAppsDk).toBeVisible();
            await expect(home.footerAndroidAppsDk).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudDk).toBeVisible();
            await expect(home.footerTermsOfUseDk).toBeVisible();
            await expect(home.footerDownloadAndInstallDk).toBeVisible();
            await expect(home.footerOriginalSoftwareDk).toBeVisible();
            await expect(home.footerAdobeBlogDk).toBeVisible();
            await expect(home.footerAdobeDeveloperDk).toBeVisible();
            await expect(home.footerLogInToYourAccountDk).toBeVisible();
            await expect(home.footerAboutDk).toBeVisible();
            await expect(home.footerIntegrityDk).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();

        });
    });

    test(`${features[22].name}, ${features[22].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[22].path}`);

        await test.step('Validating Eesti Locale page', async () => {
            await page.goto(`${baseURL}${features[22].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[22].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await expect(home.whatIsCCEe).toBeVisible();
            await expect(home.forPhotographersEe).toBeVisible();
            await expect(home.viewPackagesAndPricesEe).toBeVisible();
            await expect(home.photoshopEe).toBeVisible();
            await expect(home.AdobeStockEe).toBeVisible();
            await expect(home.photoEe).toBeVisible();
            await expect(home.pdfEe).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceEe).toBeVisible();
            await expect(home.adobeFireflyEe).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatEe).toBeVisible();
            await expect(home.acrobatPackagesAndPricingEe).toBeVisible();
            await expect(home.acrobatReaderEe).toBeVisible();
            await expect(home.companyEe).toBeVisible();
            await expect(home.homeAndPersonalEe).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceDcEe).toBeVisible();
            await expect(home.artificialIntelligenceInAcrobatDcEe).toBeVisible();
            await expect(home.pdfToWordFileEe).toBeVisible();
            await expect(home.wordFilToPdfEe).toBeVisible();
            await expect(home.resourcesForDevelopersEe).toBeVisible();
            await expect(home.articlesAndReportsEe).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudEe).toBeVisible();
            await expect(home.dataOverviewsAndTargetGroupsEe).toBeVisible();
            await expect(home.askForDemoEe).toBeVisible();
            await expect(home.AnalyticsEe).toBeVisible();
            await expect(home.experienceManagerAssetsEe).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceEcEe).toBeVisible();
            await expect(home.senseiGenAIEcEe).toBeVisible();
            await expect(home.resourceCentreEe).toBeVisible();
            await expect(home.experienceCloudBlogEe).toBeVisible();
            await expect(home.servicesAndSupportEe).toBeVisible();
            await expect(home.partenersEe).toBeVisible();
            await expect(home.adobeSummitEe).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreEe).toBeVisible();
            await expect(home.downloadAndInstallEe).toBeVisible();
            await expect(home.contactUsEe).toBeVisible();
            await expect(home.manageMyAccountEe).toBeVisible();
            await expect(home.subscribeToAdobeStatusEe).toBeVisible();
            await expect(home.creativeCloudGuidelinesEe).toBeVisible();
            await expect(home.adobeExperienceLeagueEe).toBeVisible();
            await home.gnavHelpX.click();

            //Footer
            await expect(home.footerCreativeCloudEe).toBeVisible();
            await expect(home.footerViewAllProductsEe).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessEe).toBeVisible();
            await expect(home.footerAcrobatForBusinessEe).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersEe).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsEe).toBeVisible();
            await expect(home.footeriOSAppsEe).toBeVisible();
            await expect(home.footerAndroidAppsEe).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudEe).toBeVisible();
            await expect(home.footerTermsOfUseEe).toBeVisible();
            await expect(home.footerDownloadAndInstallEe).toBeVisible();
            await expect(home.footerOriginalSoftwareEe).toBeVisible();
            await expect(home.footerAdobeBlogEe).toBeVisible();
            await expect(home.footerAdobeDeveloperEe).toBeVisible();
            await expect(home.footerLogInToYourAccountEe).toBeVisible();
            await expect(home.footerInformationEe).toBeVisible();
            await expect(home.footerCompletenessEe).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[23].name}, ${features[23].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[23].path}`);

        await test.step('Validating Egypt-English Locale Home page', async () => {
            await page.goto(`${baseURL}${features[23].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[23].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCEgEn).toBeVisible();
            await expect(home.schoolsAndUniversitiesEgEn).toBeVisible();
            await expect(home.viewPlansAndPricesEgEn).toBeVisible();
            await expect(home.photoshopEgEn).toBeVisible();
            await expect(home.AdobeStockEgEn).toBeVisible();
            await expect(home.photoEgEn).toBeVisible();
            await expect(home.pdfEgEn).toBeVisible();
            await expect(home.AIOverviewCCEgEn).toBeVisible();
            await expect(home.adobeFireflyEgEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatEgEn).toBeVisible();
            await expect(home.acrobatPlansAndPricingEgEn).toBeVisible();
            await expect(home.acrobatReaderEgEn).toBeVisible();
            await expect(home.businessEgEn).toBeVisible();
            await expect(home.governmentEgEn).toBeVisible();
            await expect(home.AIOverviewDCEgEn).toBeVisible();
            await expect(home.AIinAcrobatEgEn).toBeVisible();
            await expect(home.pdfToWordEgEn).toBeVisible();
            await expect(home.wordToPDFEgEn).toBeVisible();
            await expect(home.developerResourcesEgEn).toBeVisible();
            await expect(home.eventsAndWebinarsEgEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudEgEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesEgEn).toBeVisible();
            await expect(home.b2bMarketingEgEn).toBeVisible();
            await expect(home.requestADemoEgEn).toBeVisible();
            await expect(home.AnalyticsEgEn).toBeVisible();
            await expect(home.experienceManagerAssetsEgEn).toBeVisible();
            await expect(home.aiOverviewEgEn).toBeVisible();
            await expect(home.senseiGenAiEgEn).toBeVisible();
            await expect(home.resourceCentreEgEn).toBeVisible();
            await expect(home.servicesAndSupportEgEn).toBeVisible();
            await expect(home.partnersEgEn).toBeVisible();
            await expect(home.adobeSummitEgEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreEgEn).toBeVisible();
            await expect(home.downloadAndInstallEgEn).toBeVisible();
            await expect(home.contactUsEgEn).toBeVisible();
            await expect(home.manageMyAccountEgEn).toBeVisible();
            await expect(home.subscribeToAdobeStatusEgEn).toBeVisible();
            await expect(home.creativeCloudTutorialsEgEn).toBeVisible();
            await expect(home.adobeExperienceLeagueEgEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudEgEn).toBeVisible();
            await expect(home.footerViewAllProductsEgEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessEgEn).toBeVisible();
            await expect(home.footerAcrobatForBusinessEgEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersEgEn).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsEgEn).toBeVisible();
            await expect(home.footerAppsforiOSEgEn).toBeVisible();
            await expect(home.footerAppsforAndroidEgEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudEgEn).toBeVisible();
            await expect(home.footerTermsOfUseEgEn).toBeVisible();
            await expect(home.footerDownloadAndInstallEgEn).toBeVisible();
            await expect(home.footerGenuineSoftwareEgEn).toBeVisible();
            await expect(home.footerAdobeBlogEgEn).toBeVisible();
            await expect(home.footerAdobeDeveloperEgEn).toBeVisible();
            await expect(home.footerLogInToYourAccountEgEn).toBeVisible();
            await expect(home.footerAboutEgEn).toBeVisible();
            await expect(home.footerIntegrityEgEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[24].name}, ${features[24].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[24].path}`);

        await test.step('Validating Espana Locale Home page', async () => {
            await page.goto(`${baseURL}${features[24].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[24].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.discoverAllApplicationsEs).toBeVisible();
            await expect(home.adobeStockEs).toBeVisible();
            await expect(home.seeAllProductsEs).toBeVisible();
            await expect(home.individualsEs).toBeVisible();
            await expect(home.seePlansAndPricesEs).toBeVisible();
            await expect(home.photographyEs).toBeVisible();
            await expect(home.pdfEs).toBeVisible();
            await expect(home.AIOverviewCCEs).toBeVisible();
            await expect(home.adobeFireflyEs).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatEs).toBeVisible();
            await expect(home.acrobatPlansAndPricingEs).toBeVisible();
            await expect(home.acrobatReaderEs).toBeVisible();
            await expect(home.companyEs).toBeVisible();
            await expect(home.homeAndPersonalUseEs).toBeVisible();
            await expect(home.aiOverviewDCEs).toBeVisible();
            await expect(home.aiInAcrobatEs).toBeVisible();
            await expect(home.convertingFromPdfToWordEs).toBeVisible();
            await expect(home.convertingFromWordToPDFEs).toBeVisible();
            await expect(home.resourcesForDevelopmentTeamsEs).toBeVisible();
            await expect(home.articlesAndReportsEs).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudEs).toBeVisible();
            await expect(home.dataAndAudienceInsightsEs).toBeVisible();
            await expect(home.requestADemoEs).toBeVisible();
            await expect(home.analyticsEs).toBeVisible();
            await expect(home.experienceManagerAssetsEs).toBeVisible();
            await expect(home.aiOverviewECEs).toBeVisible();
            await expect(home.senseiGenAIEs).toBeVisible();
            await expect(home.resourceCentreEs).toBeVisible();
            await expect(home.experienceCloudBlogEs).toBeVisible();
            await expect(home.trainingEs).toBeVisible();
            await expect(home.partenersEs).toBeVisible();
            await expect(home.adobeSummitEs).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreEs).toBeVisible();
            await expect(home.downloadAndInstallEs).toBeVisible();
            await expect(home.contactEs).toBeVisible();
            await expect(home.manageMyAccountEs).toBeVisible();
            await expect(home.subscribeToAdobeStatusEs).toBeVisible();
            await expect(home.creativeCloudTutorialsEs).toBeVisible();
            await expect(home.adobeExperienceLeagueEs).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudEs).toBeVisible();
            await expect(home.footerSeeAllProductsEs).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessEs).toBeVisible();
            await expect(home.footerAcrobatForBusinessEs).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersEs).toBeVisible();
            await expect(home.footerDigitalLearningEs).toBeVisible();
            await expect(home.footeriOSAppsEs).toBeVisible();
            await expect(home.footerAndroidAppsEs).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudEs).toBeVisible();
            await expect(home.footerTermsOfUseEs).toBeVisible();
            await expect(home.footerDownloadAndInstallES).toBeVisible();
            await expect(home.footerOriginalSoftwareEs).toBeVisible();
            await expect(home.footerAdobeBlogEs).toBeVisible();
            await expect(home.footerAdobeDeveloperEs).toBeVisible();
            await expect(home.footerLogInEs).toBeVisible();
            await expect(home.footerAboutAdobeEs).toBeVisible();
            await expect(home.footerIntegrityEs).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[26].name}, ${features[26].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[26].path}`);

        await test.step('Validating Greece-English Home page', async () => {
            await page.goto(`${baseURL}${features[26].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[26].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCGrEn).toBeVisible();
            await expect(home.schoolsAndUniversitiesGrEn).toBeVisible();
            await expect(home.viewPlansAndPricesGrEn).toBeVisible();
            await expect(home.photoshopGrEn).toBeVisible();
            await expect(home.AdobeStockGrEn).toBeVisible();
            await expect(home.photoGrEn).toBeVisible();
            await expect(home.pdfGrEn).toBeVisible();
            await expect(home.AIOverviewCCGrEn).toBeVisible();
            await expect(home.adobeFireflyGrEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatGrEn).toBeVisible();
            await expect(home.acrobatPlansAndPricingGrEn).toBeVisible();
            await expect(home.acrobatReaderGrEn).toBeVisible();
            await expect(home.businessGrEn).toBeVisible();
            await expect(home.governmentGrEn).toBeVisible();
            await expect(home.aiOverviewDCGrEn).toBeVisible();
            await expect(home.aiInAcrobatGrEn).toBeVisible();
            await expect(home.pdfToWordGrEn).toBeVisible();
            await expect(home.wordToPDFGrEn).toBeVisible();
            await expect(home.developerResourcesGrEn).toBeVisible();
            await expect(home.eventsAndWebinarsGrEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudGrEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesGrEn).toBeVisible();
            await expect(home.b2bMarketingGrEn).toBeVisible();
            await expect(home.requestAdemoGrEn).toBeVisible();
            await expect(home.analyticsGrEn).toBeVisible();
            await expect(home.experienceManagerAssetsGrEn).toBeVisible();
            await expect(home.aiOverviewGrEn).toBeVisible();
            await expect(home.senseiGenAiGrEn).toBeVisible();
            await expect(home.resourceCentreGrEn).toBeVisible();
            await expect(home.experienceCloudBlogGrEn).toBeVisible();
            await expect(home.servicesAndSupportGrEn).toBeVisible();
            await expect(home.partnersGrEn).toBeVisible();
            await expect(home.aboutSummitGrEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreGrEn).toBeVisible();
            await expect(home.downloadAndInstallGrEn).toBeVisible();
            await expect(home.contactGrEn).toBeVisible();
            await expect(home.manageMyAccountGrEn).toBeVisible();
            await expect(home.subscribeToAdobeStatusGrEn).toBeVisible();
            await expect(home.creativeCloudTutorialsGrEn).toBeVisible();
            await expect(home.adobeExperienceLeagueGrEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudGrEn).toBeVisible();
            await expect(home.footerViewAllProductsGrEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessGrEn).toBeVisible();
            await expect(home.footerAcrobatForBusinessGrEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersGrEn).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsGrEn).toBeVisible();
            await expect(home.footerAppsforiOSGrEn).toBeVisible();
            await expect(home.footerAppsforAndroidGrEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudGrEn).toBeVisible();
            await expect(home.footerTermsOfUseGrEn).toBeVisible();
            await expect(home.footerDownloadAndInstallGrEn).toBeVisible();
            await expect(home.footerGenuineSoftwareGrEn).toBeVisible();
            await expect(home.footerAdobeBlogGrEn).toBeVisible();
            await expect(home.footerAdobeDeveloperGrEn).toBeVisible();
            await expect(home.footerLogInToYourAccountGrEn).toBeVisible();
            await expect(home.footerAboutGrEn).toBeVisible();
            await expect(home.footerIntegrityGrEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[27].name}, ${features[27].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[27].path}`);

        await test.step('Validating Greece Home page', async () => {
            await page.goto(`${baseURL}${features[27].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[27].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCGrEl).toBeVisible();
            await expect(home.schoolsAndUniversitiesGrEl).toBeVisible();
            await expect(home.viewProgramsAndPricesGrEl).toBeVisible();
            await expect(home.photoshopGrEl).toBeVisible();
            await expect(home.AdobeStockGrEl).toBeVisible();
            await expect(home.photoGrEl).toBeVisible();
            await expect(home.pdfGrEl).toBeVisible();
            await expect(home.AIOverviewCCGrEl).toBeVisible();
            await expect(home.adobeFireflyGrEl).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatGrEl).toBeVisible();
            await expect(home.acrobatProgramsAndPricingGrEl).toBeVisible();
            await expect(home.acrobatReaderGrEl).toBeVisible();
            await expect(home.businessGrEl).toBeVisible();
            await expect(home.homeAndPersonalUseGrEl).toBeVisible();
            await expect(home.aiOverviewDCGrEl).toBeVisible();
            await expect(home.aiInAcrobatGrEl).toBeVisible();
            await expect(home.pdfToWordGrEl).toBeVisible();
            await expect(home.wordToPDFGrEl).toBeVisible();
            await expect(home.developerResourcesGrEl).toBeVisible();
            await expect(home.eventsAndWebinarsGrEl).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudGrEl).toBeVisible();
            await expect(home.dataInsightsAndAudiencesGrEl).toBeVisible();
            await expect(home.b2bMarketingGrEl).toBeVisible();
            await expect(home.requestAdemoGrEl).toBeVisible();
            await expect(home.analyticsGrEl).toBeVisible();
            await expect(home.experienceManagerAssetsGrEl).toBeVisible();
            await expect(home.aiOverviewGrEl).toBeVisible();
            await expect(home.senseiGenAiGrEl).toBeVisible();
            await expect(home.resourceCentreGrEl).toBeVisible();
            await expect(home.experienceCloudBlogGrEl).toBeVisible();
            await expect(home.servicesAndSupportGrEl).toBeVisible();
            await expect(home.collaboratorsGrEl).toBeVisible();
            await expect(home.aboutSummitGrEl).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreGrEl).toBeVisible();
            await expect(home.downloadAndInstallGrEl).toBeVisible();
            await expect(home.contactGrEl).toBeVisible();
            await expect(home.manageMyAccountGrEl).toBeVisible();
            await expect(home.signupForAdobeStatusGrEl).toBeVisible();
            await expect(home.creativeCloudTutorialsGrEl).toBeVisible();
            await expect(home.adobeExperienceLeagueGrEl).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudGrEl).toBeVisible();
            await expect(home.footerSeeAllProductsGrEl).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessGrEl).toBeVisible();
            await expect(home.footerAcrobatForBusinessGrEl).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersGrEl).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsGrEl).toBeVisible();
            await expect(home.footerAppsforiOSGrEl).toBeVisible();
            await expect(home.footerAppsforAndroidGrEl).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudGrEl).toBeVisible();
            await expect(home.footerTermsOfUseGrEl).toBeVisible();
            await expect(home.footerDownloadAndInstallGrEl).toBeVisible();
            await expect(home.footerOriginalSoftwareGrEl).toBeVisible();
            await expect(home.footerAdobeBlogGrEl).toBeVisible();
            await expect(home.footerAdobeDeveloperGrEl).toBeVisible();
            await expect(home.footerSignInToYourAccountGrEl).toBeVisible();
            await expect(home.footerInformationGrEl).toBeVisible();
            await expect(home.footerIntegrityGrEl).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[28].name}, ${features[28].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[28].path}`);

        await test.step('Validating Ireland Home page', async () => {
            await page.goto(`${baseURL}${features[28].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[28].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCIe).toBeVisible();
            await expect(home.schoolsAndUniversitiesIe).toBeVisible();
            await expect(home.viewPlansAndPricingIe).toBeVisible();
            await expect(home.photoshopIe).toBeVisible();
            await expect(home.AdobeStockIe).toBeVisible();
            await expect(home.photoIe).toBeVisible();
            await expect(home.pdfIe).toBeVisible();
            await expect(home.AIOverviewCCIe).toBeVisible();
            await expect(home.adobeFireflyIe).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIe).toBeVisible(); 
            await expect(home.acrobatPlansAndPricingIe).toBeVisible();
            await expect(home.acrobatReaderIe).toBeVisible();
            await expect(home.businessIe).toBeVisible();
            await expect(home.homeAndPersonalIe).toBeVisible();
            await expect(home.aiOverviewDCIe).toBeVisible();
            await expect(home.aiInAcrobatIe).toBeVisible();
            await expect(home.pdfToWordIe).toBeVisible();
            await expect(home.wordToPDFIe).toBeVisible();
            await expect(home.developerResourcesIe).toBeVisible();
            await expect(home.articlesAndReportsIe).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudIe).toBeVisible();
            await expect(home.dataInsightsAndAudiencesIe).toBeVisible();
            await expect(home.b2bMarketingIe).toBeVisible();
            await expect(home.requestAdemoIe).toBeVisible();
            await expect(home.analyticsIe).toBeVisible();
            await expect(home.experienceManagerAssetsIe).toBeVisible();
            await expect(home.aiOverviewIe).toBeVisible();
            await expect(home.senseiGenAiIe).toBeVisible();
            await expect(home.resourceCentreIe).toBeVisible();
            await expect(home.experienceCloudBlogIe).toBeVisible();
            await expect(home.servicesAndSupportIe).toBeVisible();
            await expect(home.partnersIe).toBeVisible();
            await expect(home.aboutSummitIe).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreIe).toBeVisible();
            await expect(home.downloadAndInstallIe).toBeVisible();
            await expect(home.contactIe).toBeVisible();
            await expect(home.manageMyAccountIe).toBeVisible();
            await expect(home.subscribeToAdobeStatusIe).toBeVisible();
            await expect(home.creativeCloudTutorialsIe).toBeVisible();
            await expect(home.adobeExperienceLeagueIe).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudIe).toBeVisible();
            await expect(home.footerViewAllProductsIe).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessIe).toBeVisible();
            await expect(home.footerAcrobatForBusinessIe).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersIe).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsIe).toBeVisible();
            await expect(home.footerAppsforiOSIe).toBeVisible();
            await expect(home.footerAppsforAndroidIe).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudIe).toBeVisible();
            await expect(home.footerTermsOfUseIe).toBeVisible();
            await expect(home.footerDownloadAndInstallIe).toBeVisible();
            await expect(home.footerGenuineSoftwareIe).toBeVisible();
            await expect(home.footerAdobeBlogIe).toBeVisible();
            await expect(home.footerAdobeDeveloperIe).toBeVisible();
            await expect(home.footerLogInToYourAccountIe).toBeVisible();
            await expect(home.footerAboutIe).toBeVisible();
            await expect(home.footerIntegrityIe).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[29].name}, ${features[29].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[29].path}`);

        await test.step('Validating Israel-English Home page', async () => {
            await page.goto(`${baseURL}${features[29].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[29].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCIlEn).toBeVisible();
            await expect(home.schoolsAndUniversitiesIlEn).toBeVisible();
            await expect(home.viewPlansAndPricesIlEn).toBeVisible();
            await expect(home.photoshopIlEn).toBeVisible();
            await expect(home.AdobeStockIlEn).toBeVisible();
            await expect(home.photoIlEn).toBeVisible();
            await expect(home.pdfIlEn).toBeVisible();
            await expect(home.AIOverviewCCIlEn).toBeVisible();
            await expect(home.adobeFireflyIlEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIlEn).toBeVisible();
            await expect(home.acrobatPlansAndPricingIlEn).toBeVisible();
            await expect(home.acrobatReaderIlEn).toBeVisible();
            await expect(home.businessIlEn).toBeVisible();
            await expect(home.governmentIlEn).toBeVisible();
            await expect(home.AIOverviewDCIlEn).toBeVisible();
            await expect(home.AIinAcrobatIlEn).toBeVisible();
            await expect(home.pdfToWordIlEn).toBeVisible();
            await expect(home.wordToPDFIlEn).toBeVisible();
            await expect(home.developerResourcesIlEn).toBeVisible();
            await expect(home.eventsAndWebinarsIlEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudIlEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesIlEn).toBeVisible();
            await expect(home.b2bMarketingIlEn).toBeVisible();
            await expect(home.requestAdemoIlEn).toBeVisible();
            await expect(home.analyticsIlEn).toBeVisible();
            await expect(home.experienceManagerAssetsIlEn).toBeVisible();
            await expect(home.aiOverviewIlEn).toBeVisible();
            await expect(home.senseiGenAiIlEn).toBeVisible();
            await expect(home.resourceCentreIlEn).toBeVisible();
            await expect(home.experienceCloudBlogIlEn).toBeVisible();
            await expect(home.servicesAndSupportIlEn).toBeVisible();
            await expect(home.partnersIlEn).toBeVisible();
            await expect(home.aboutSummitIlEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreIlEn).toBeVisible();
            await expect(home.downloadAndInstallIlEn).toBeVisible();
            await expect(home.contactIlEn).toBeVisible();
            await expect(home.manageMyAccountIlEn).toBeVisible();
            await expect(home.subscribeToAdobeStatusIlEn).toBeVisible();
            await expect(home.creativeCloudTutorialsIlEn).toBeVisible();
            await expect(home.adobeExperienceLeagueIlEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudIlEn).toBeVisible();
            await expect(home.footerViewAllProductsIlEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessIlEn).toBeVisible();
            await expect(home.footerAcrobatForBusinessIlEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersIlEn).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsIlEn).toBeVisible();
            await expect(home.footerAppsforiOSIlEn).toBeVisible();
            await expect(home.footerAppsforAndroidIlEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudIlEn).toBeVisible();
            await expect(home.footerTermsOfUseIlEn).toBeVisible();
            await expect(home.footerDownloadAndInstallIlEn).toBeVisible();
            await expect(home.footerGenuineSoftwareIlEn).toBeVisible();
            await expect(home.footerAdobeBlogIlEn).toBeVisible();
            await expect(home.footerAdobeDeveloperIlEn).toBeVisible();
            await expect(home.footerLogInToYourAccountIlEn).toBeVisible();
            await expect(home.footerAboutIlEn).toBeVisible();
            await expect(home.footerIntegrityIlEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[31].name}, ${features[31].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[31].path}`);

        await test.step('Validating Kuwait-English Home page', async () => {
            await page.goto(`${baseURL}${features[31].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[31].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCKwEn).toBeVisible();
            await expect(home.schoolsAndUniversitiesKwEn).toBeVisible();
            await expect(home.viewPlansAndPricesKwEn).toBeVisible();
            await expect(home.photoshopKwEn).toBeVisible();
            await expect(home.AdobeStockKwEn).toBeVisible();
            await expect(home.photoKwEn).toBeVisible();
            await expect(home.pdfKwEn).toBeVisible();
            await expect(home.AIOverviewCCKwEn).toBeVisible();
            await expect(home.adobeFireflyKwEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatKwEn).toBeVisible();
            await expect(home.acrobatPlansAndPricingKwEn).toBeVisible();
            await expect(home.acrobatReaderKwEn).toBeVisible();
            await expect(home.businessKwEn).toBeVisible();
            await expect(home.governmentKwEn).toBeVisible();
            await expect(home.AIOverviewDCKwEn).toBeVisible();
            await expect(home.AIinAcrobatKwEn).toBeVisible();
            await expect(home.pdfToWordKwEn).toBeVisible();
            await expect(home.wordToPDFKwEn).toBeVisible();
            await expect(home.developerResourcesKwEn).toBeVisible();
            await expect(home.eventsAndWebinarsKwEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudKwEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesKwEn).toBeVisible();
            await expect(home.b2bMarketingKwEn).toBeVisible();
            await expect(home.requestAdemoKwEn).toBeVisible();
            await expect(home.analyticsKwEn).toBeVisible();
            await expect(home.experienceManagerAssetsKwEn).toBeVisible();
            await expect(home.aiOverviewKwEn).toBeVisible();
            await expect(home.senseiGenAiKwEn).toBeVisible();
            await expect(home.resourceCentreKwEn).toBeVisible();
            await expect(home.experienceCloudBlogKwEn).toBeVisible();
            await expect(home.servicesAndSupportKwEn).toBeVisible();
            await expect(home.partnersKwEn).toBeVisible();
            await expect(home.aboutSummitKwEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreKwEn).toBeVisible();
            await expect(home.downloadAndInstallKwEn).toBeVisible();
            await expect(home.contactKwEn).toBeVisible();
            await expect(home.manageMyAccountKwEn).toBeVisible();
            await expect(home.subscribeToAdobeStatusKwEn).toBeVisible();
            await expect(home.creativeCloudTutorialsKwEn).toBeVisible();
            await expect(home.adobeExperienceLeagueKwEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudKwEn).toBeVisible();
            await expect(home.footerViewAllProductsKwEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessKwEn).toBeVisible();
            await expect(home.footerAcrobatForBusinessKwEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersKwEn).toBeVisible();
            await expect(home.footerDigitalLearningSolutionsKwEn).toBeVisible();
            await expect(home.footerAppsforiOSKwEn).toBeVisible();
            await expect(home.footerAppsforAndroidKwEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudKwEn).toBeVisible();
            await expect(home.footerTermsOfUseKwEn).toBeVisible();
            await expect(home.footerDownloadAndInstallKwEn).toBeVisible();
            await expect(home.footerGenuineSoftwareKwEn).toBeVisible();
            await expect(home.footerAdobeBlogKwEn).toBeVisible();
            await expect(home.footerAdobeDeveloperKwEn).toBeVisible();
            await expect(home.footerLogInToYourAccountKwEn).toBeVisible();
            await expect(home.footerAboutKwEn).toBeVisible();
            await expect(home.footerIntegrityKwEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[32].name}, ${features[32].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[32].path}`);

        await test.step('Validating Latvija Home page', async () => {
            await page.goto(`${baseURL}${features[32].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[32].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCLv).toBeVisible();
            await expect(home.forSchoolsAndUniversitiesLv).toBeVisible();
            await expect(home.viewPlansAndPricesLv).toBeVisible();
            await expect(home.photoshopLv).toBeVisible();
            await expect(home.AdobeStockLv).toBeVisible();
            await expect(home.photoLv).toBeVisible();
            await expect(home.pdfLv).toBeVisible();
            await expect(home.miOverviewCCLv).toBeVisible();
            await expect(home.adobeFireflyLv).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatLv).toBeVisible();
            await expect(home.acrobatPlansAndPricingLv).toBeVisible();
            await expect(home.acrobatReaderLv).toBeVisible();
            await expect(home.forCompaniesLv).toBeVisible();
            await expect(home.forHomeAndPersonalUseLv).toBeVisible();
            await expect(home.miOverviewDCLv).toBeVisible();
            await expect(home.aiInAcrobatLv).toBeVisible();
            await expect(home.convertPdfFilesToWordFormatLv).toBeVisible();
            await expect(home.convertingWordFilesToPdfFormatLv).toBeVisible();
            await expect(home.developerResourcesLv).toBeVisible();
            await expect(home.eventsAndWebinarsLv).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudLv).toBeVisible();
            await expect(home.dataInsightsAndAudiencesLv).toBeVisible();
            await expect(home.b2bMarketingLv).toBeVisible();
            await expect(home.requestAdemoLv).toBeVisible();
            await expect(home.analyticsLv).toBeVisible();
            await expect(home.experienceManagerAssetsLv).toBeVisible();
            await expect(home.miOverviewLv).toBeVisible();
            await expect(home.senseiGenAiLv).toBeVisible();
            await expect(home.resourceCentreLv).toBeVisible();
            await expect(home.experienceCloudBlogLv).toBeVisible();
            await expect(home.servicesAndSupportLv).toBeVisible();
            await expect(home.partnersLv).toBeVisible();
            await expect(home.aboutSummitLv).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreLv).toBeVisible();
            await expect(home.downloadAndInstallLv).toBeVisible();
            await expect(home.contactUsLv).toBeVisible();
            await expect(home.manageMyAccountLv).toBeVisible();
            await expect(home.subscribeToAdobeStatusLv).toBeVisible();
            await expect(home.creativeCloudTutorialsLv).toBeVisible();
            await expect(home.adobeExperienceLeagueLv).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudLv).toBeVisible();
            await expect(home.footerViewAllProductsLv).toBeVisible();
            await expect(home.footerCreativeCloudForEnterpriseLv).toBeVisible();
            await expect(home.footerAcrobatForBusinessLv).toBeVisible();
            await expect(home.footerDiscountsForPupilsStudentsAndTeachersLv).toBeVisible();
            await expect(home.footerDigitalTrainingSolutionsLv).toBeVisible();
            await expect(home.footerAppsforiOSDevicesLv).toBeVisible();
            await expect(home.footerAppsforAndroidDevicesLv).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudLv).toBeVisible();
            await expect(home.footerTermsOfUseLv).toBeVisible();
            await expect(home.footerDownloadAndInstallLv).toBeVisible();
            await expect(home.footerOriginalSoftwareLv).toBeVisible();
            await expect(home.footerAdobeBlogLv).toBeVisible();
            await expect(home.footerAdobeDeveloperLv).toBeVisible();
            await expect(home.footerLogInToYourAccountLv).toBeVisible();
            await expect(home.footerAboutLv).toBeVisible();
            await expect(home.footerIntegrityLv).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[33].name}, ${features[33].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[33].path}`);

        await test.step('Validating Lietuva Home page', async () => {
            await page.goto(`${baseURL}${features[33].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[33].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCLt).toBeVisible();
            await expect(home.photoshopLt).toBeVisible();
            await expect(home.picturesLt).toBeVisible();
            await expect(home.aiOverviewCCLt).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatLt).toBeVisible();
            await expect(home.forCompaniesLt).toBeVisible();
            await expect(home.aiOverviewDCLt).toBeVisible();
            await expect(home.pdfToWordLt).toBeVisible();
            await expect(home.developerResourcesLt).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudLt).toBeVisible();
            await expect(home.dataInsightsAndAudiencesLt).toBeVisible();
            await expect(home.analyticsLt).toBeVisible();
            await expect(home.aiOverviewLt).toBeVisible();
            await expect(home.resourceCentreLt).toBeVisible();
            await expect(home.servicesAndSupportLt).toBeVisible();
            await expect(home.aboutSummitLt).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreLt).toBeVisible();
            await expect(home.manageMyAccountLt).toBeVisible();
            await expect(home.creativeCloudTrainingToolsLt).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudLt).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessLt).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersLt).toBeVisible();
            await expect(home.footerAppsforiOSLt).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudLt).toBeVisible();
            await expect(home.footerDownloadAndInstallLt).toBeVisible();
            await expect(home.footerAdobeBlogLt).toBeVisible();
            await expect(home.footerSignInToYourAccountLt).toBeVisible();
            await expect(home.footerAboutLt).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[34].name}, ${features[34].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[34].path}`);

        await test.step('Validating Luxembourg-Deutsch Home page', async () => {
            await page.goto(`${baseURL}${features[34].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[34].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCLuDe).toBeVisible();
            await expect(home.photoshopLuDe).toBeVisible();
            await expect(home.picturesLuDe).toBeVisible();
            await expect(home.aiOverviewCCLuDe).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatLuDe).toBeVisible();
            await expect(home.businessLuDe).toBeVisible();
            await expect(home.aiOverviewDCLuDe).toBeVisible();
            await expect(home.pdfToWordLuDe).toBeVisible();
            await expect(home.resourcesForDevelopmentLuDe).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudLuDe).toBeVisible();
            await expect(home.dataInsightsAndTargetGroupsLuDe).toBeVisible();
            await expect(home.analyticsLuDe).toBeVisible();
            await expect(home.aiOverviewLuDe).toBeVisible();
            await expect(home.resourceCentreLuDe).toBeVisible();
            await expect(home.servicesAndSupportLuDe).toBeVisible();
            await expect(home.aboutSummitLuDe).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreLuDe).toBeVisible();
            await expect(home.manageMyAccountLuDe).toBeVisible();
            await expect(home.creativeCloudTrainingToolsLuDe).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudLuDe).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessLuDe).toBeVisible();
            await expect(home.footerDiscountsForPupilsStudentsAndTeachersLuDe).toBeVisible();
            await expect(home.footerAppsforiOSLuDe).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudLuDe).toBeVisible();
            await expect(home.footerDownloadAndInstallLuDe).toBeVisible();
            await expect(home.footerAdobeBlogLuDe).toBeVisible();
            await expect(home.footerLogInToYourAccountLuDe).toBeVisible();
            await expect(home.footerAboutAboutLuDe).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[35].name}, ${features[35].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[35].path}`);

        await test.step('Validating Luxembourg-English Home page', async () => {
            await page.goto(`${baseURL}${features[35].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[35].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCLuEn).toBeVisible();
            await expect(home.photoLuEn).toBeVisible();
            await expect(home.picturesLuEn).toBeVisible();
            await expect(home.aiOverviewCCLuEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatLuEn).toBeVisible();
            await expect(home.businessLuEn).toBeVisible();
            await expect(home.aiOverviewDCLuEn).toBeVisible();
            await expect(home.pdfToWordLuEn).toBeVisible();
            await expect(home.resourcesForDevelopmentLuEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudLuEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesLuEn).toBeVisible();
            await expect(home.analyticsLuEn).toBeVisible();
            await expect(home.aiOverviewLuEn).toBeVisible();
            await expect(home.resourceCentreLuEn).toBeVisible();
            await expect(home.servicesAndSupportLuEn).toBeVisible();
            await expect(home.aboutSummitLuEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreLuEn).toBeVisible();
            await expect(home.manageMyAccountLuEn).toBeVisible();
            await expect(home.creativeCloudTutorialsLuEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudLuEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessLuEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersLuEn).toBeVisible();
            await expect(home.footerAppsforiOSLuEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudLuEn).toBeVisible();
            await expect(home.footerDownloadAndInstallLuEn).toBeVisible();
            await expect(home.footerAdobeBlogLuEn).toBeVisible();
            await expect(home.footerLogInToYourAccountLuEn).toBeVisible();
            await expect(home.footerAboutAboutLuEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[36].name}, ${features[36].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[36].path}`);

        await test.step('Validating Luxembourg-French Home page', async () => {
            await page.goto(`${baseURL}${features[36].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[36].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCLuFr).toBeVisible();
            await expect(home.photoshopLuFr).toBeVisible();
            await expect(home.photographyLuFr).toBeVisible();
            await expect(home.aiProgramOverviewCCLuFr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatLuFr).toBeVisible();
            await expect(home.businessLuFr).toBeVisible();
            await expect(home.aiProgramOverviewDCLuFr).toBeVisible();
            await expect(home.pdfToWordLuFr).toBeVisible();
            await expect(home.resourcesForDevelopmentSpecialistsLuFr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudLuFr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesLuFr).toBeVisible();
            await expect(home.analyticsLuFr).toBeVisible();
            await expect(home.aiProgramOverviewLuFr).toBeVisible();
            await expect(home.resourceCentreLuFr).toBeVisible();
            await expect(home.servicesAndTechnicalSupportLuFr).toBeVisible();
            await expect(home.aboutSummitLuFr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreLuFr).toBeVisible();
            await expect(home.accountManagementLuFr).toBeVisible();
            await expect(home.creativeCloudTutorialsLuFr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudLuFr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessLuFr).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersLuFr).toBeVisible();
            await expect(home.footerAppsforiOSLuFr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudLuFr).toBeVisible();
            await expect(home.footerDownloadAndInstallLuFr).toBeVisible();
            await expect(home.footerAdobeBlogLuFr).toBeVisible();
            await expect(home.footerSignInToYourAccountLuFr).toBeVisible();
            await expect(home.footerAboutAboutLuFr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[37].name}, ${features[37].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[37].path}`);

        await test.step('Validating Hungary Home page', async () => {
            await page.goto(`${baseURL}${features[37].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[37].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.introducingCreativeCloudHu).toBeVisible();
            await expect(home.photoshopHu).toBeVisible();
            await expect(home.photographyHu).toBeVisible();
            await expect(home.introductionToaiIntelligenceHu).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatHu).toBeVisible();
            await expect(home.forBusinessHu).toBeVisible();
            await expect(home.introductionToArtificialIntelligenceDCHu).toBeVisible();
            await expect(home.fromPdfToWordFileHu).toBeVisible();
            await expect(home.developerResourcesHu).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudHu).toBeVisible();
            await expect(home.dataInsightsAndTargetAudiencesHu).toBeVisible();
            await expect(home.analyzesHu).toBeVisible();
            await expect(home.introductionToArtificialIntelligenceHu).toBeVisible();
            await expect(home.sourceMaterialsHu).toBeVisible();
            await expect(home.servicesAndSupportHu).toBeVisible();
            await expect(home.aboutSummitHu).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreHu).toBeVisible();
            await expect(home.manageYourAccountHu).toBeVisible();
            await expect(home.creativeCloudTutorialsHu).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudHu).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessHu).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersHu).toBeVisible();
            await expect(home.footeriOSApplicationsHu).toBeVisible();
            await expect(home.footerWhatShouldYouKnowAboutExperienceCloudHu).toBeVisible();
            await expect(home.footerDownloadAndInstallHu).toBeVisible();
            await expect(home.footerAdobeBlogHu).toBeVisible();
            await expect(home.footerLogInToYourAccountHu).toBeVisible();
            await expect(home.footerDescriptionHu).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[38].name}, ${features[38].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[38].path}`);

        await test.step('Validating Middle East and North Africa-English Home page', async () => {
            await page.goto(`${baseURL}${features[38].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[38].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCMenaEn).toBeVisible();
            await expect(home.photoshopMenaEn).toBeVisible();
            await expect(home.photoMenaEn).toBeVisible();
            await expect(home.aiOverviewCCMenaEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatMenaEn).toBeVisible();
            await expect(home.businessMenaEn).toBeVisible();
            await expect(home.aiIntroductionMenaEn).toBeVisible();
            await expect(home.pdfToWordMenaEn).toBeVisible();
            await expect(home.developerResourcesMenaEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudMenaEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesMenaEn).toBeVisible();
            await expect(home.analyticsMenaEn).toBeVisible();
            await expect(home.aiOverviewMenaEn).toBeVisible();
            await expect(home.resourceCenterMenaEn).toBeVisible();
            await expect(home.servicesAndSupportMenaEn).toBeVisible();
            await expect(home.aboutSummitMenaEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreMenaEn).toBeVisible();
            await expect(home.manageMyAccountMenaEn).toBeVisible();
            await expect(home.creativeCloudTutorialsMenaEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudMenaEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessMenaEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersMenaEn).toBeVisible();
            await expect(home.footerAppsForiOSMenaEn).toBeVisible();
            await expect(home.footerWhatExperienceCloudMenaEn).toBeVisible();
            await expect(home.footerDownloadAndInstallMenaEn).toBeVisible();
            await expect(home.footerAdobeBlogMenaEn).toBeVisible();
            await expect(home.footerLogInToYourAccountMenaEn).toBeVisible();
            await expect(home.footerAboutMenaEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[39].name}, ${features[39].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[39].path}`);

        await test.step('Validating Nigeria Home page', async () => {
            await page.goto(`${baseURL}${features[39].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[39].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.homeUsersAndFreelancersNg).toBeVisible();
            await expect(home.photoshopNg).toBeVisible();
            await expect(home.photoNg).toBeVisible();
            await expect(home.aiOverviewCCNg).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatNg).toBeVisible();
            await expect(home.businessNg).toBeVisible();
            await expect(home.aiOverviewDCNg).toBeVisible();
            await expect(home.pdfToWordNg).toBeVisible();
            await expect(home.developerResourcesNg).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudNg).toBeVisible();
            await expect(home.dataInsightsAndAudiencesNg).toBeVisible();
            await expect(home.analyticsNg).toBeVisible();
            await expect(home.aiOverviewNg).toBeVisible();
            await expect(home.resourceCenterNg).toBeVisible();
            await expect(home.servicesAndSupportNg).toBeVisible();
            await expect(home.aboutSummitNg).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterNg).toBeVisible();
            await expect(home.manageMyAccountNg).toBeVisible();
            await expect(home.creativeCloudTutorialsNg).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudNg).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessNg).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersNg).toBeVisible();
            await expect(home.footerAppsForiOSNg).toBeVisible();
            await expect(home.footerWhatExperienceCloudNg).toBeVisible();
            await expect(home.footerDownloadAndInstallNg).toBeVisible();
            await expect(home.footerAdobeBlogNg).toBeVisible();
            await expect(home.footerLogInToYourAccountNg).toBeVisible();
            await expect(home.footerAboutNg).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[40].name}, ${features[40].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[40].path}`);

        await test.step('Validating Nederlands Home page', async () => {
            await page.goto(`${baseURL}${features[40].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[40].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCNl).toBeVisible();
            await expect(home.photoshopNl).toBeVisible();
            await expect(home.photoNl).toBeVisible();
            await expect(home.overviewOfAiCCNl).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatNl).toBeVisible();
            await expect(home.businessesNl).toBeVisible();
            await expect(home.overviewAiNl).toBeVisible();
            await expect(home.pdfToWordNl).toBeVisible();
            await expect(home.developerResourcesNl).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudNl).toBeVisible();
            await expect(home.dataInsightsAndTargetGroupsNl).toBeVisible();
            await expect(home.analyticsNl).toBeVisible();
            await expect(home.overviewOfAiECNl).toBeVisible();
            await expect(home.resourceCenterNl).toBeVisible();
            await expect(home.servicesAndSupportNl).toBeVisible();
            await expect(home.aboutSummitNl).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterNl).toBeVisible();
            await expect(home.manageMyAccountNl).toBeVisible();
            await expect(home.creativeCloudTutorialsNl).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudNl).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessNl).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersNl).toBeVisible();
            await expect(home.footerAppsForiOSNl).toBeVisible();
            await expect(home.footerWhatExperienceCloudNl).toBeVisible();
            await expect(home.footerDownloadAndInstallNl).toBeVisible();
            await expect(home.footerAdobeBlogNl).toBeVisible();
            await expect(home.footerSignInToYourAccountNl).toBeVisible();
            await expect(home.footerInfoNl).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[41].name}, ${features[41].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[41].path}`);

        await test.step('Validating Norway Home page', async () => {
            await page.goto(`${baseURL}${features[41].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[41].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCNo).toBeVisible();
            await expect(home.photoshopNo).toBeVisible();
            await expect(home.photoNo).toBeVisible();
            await expect(home.overviewOfAiCCNo).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatNo).toBeVisible();
            await expect(home.companiesNo).toBeVisible();
            await expect(home.aiOverviewNo).toBeVisible();
            await expect(home.pdfToWordNo).toBeVisible();
            await expect(home.developerResourcesNo).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudNo).toBeVisible();
            await expect(home.dataInsightsAndAudiencesNo).toBeVisible();
            await expect(home.analyticsNo).toBeVisible();
            await expect(home.aiOverviewEcNo).toBeVisible();
            await expect(home.resourceCenterNo).toBeVisible();
            await expect(home.servicesAndSupportNo).toBeVisible();
            await expect(home.aboutSummitNo).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterNo).toBeVisible();
            await expect(home.manageMyAccountNo).toBeVisible();
            await expect(home.creativeCloudTrainingMaterialsNo).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudNo).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessNo).toBeVisible();
            await expect(home.footerDiscountsForEducationCustomersNo).toBeVisible();
            await expect(home.footerAppsForiOSNo).toBeVisible();
            await expect(home.footerWhatExperienceCloudNo).toBeVisible();
            await expect(home.footerDownloadAndInstallNo).toBeVisible();
            await expect(home.footerAdobeBlogNo).toBeVisible();
            await expect(home.footerLogInToYourAccountNo).toBeVisible();
            await expect(home.footerAboutNo).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[42].name}, ${features[42].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[42].path}`);

        await test.step('Validating Poland Home page', async () => {
            await page.goto(`${baseURL}${features[42].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[42].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.homeUsersAndFreelancersPl).toBeVisible();
            await expect(home.photoshopPl).toBeVisible();
            await expect(home.photographyPl).toBeVisible();
            await expect(home.artificialIntelligenceAnOverviewPl).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatPl).toBeVisible();
            await expect(home.companiesPl).toBeVisible();
            await expect(home.artificialIntelligenceAnOverviewDcPl).toBeVisible();
            await expect(home.pdfToWorConvensionPl).toBeVisible();
            await expect(home.resourcesForDevelopersPl).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudPl).toBeVisible();
            await expect(home.dataAndAudienceAnalysisPl).toBeVisible();
            await expect(home.analyticsPl).toBeVisible();
            await expect(home.artificialIntelligencePl).toBeVisible();
            await expect(home.resourceCenterPl).toBeVisible();
            await expect(home.servicesAndSupportPl).toBeVisible();
            await expect(home.aboutSummitPl).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterPl).toBeVisible();
            await expect(home.manageYourAccountPl).toBeVisible();
            await expect(home.creativeCloudTutorialsPl).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudPl).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessPl).toBeVisible();
            await expect(home.footerDiscountsForTeachersPl).toBeVisible();
            await expect(home.footerAppsForiOSPl).toBeVisible();
            await expect(home.footerWhatExperienceCloudPl).toBeVisible();
            await expect(home.footerDownloadAndInstallPl).toBeVisible();
            await expect(home.footerAdobeBlogPl).toBeVisible();
            await expect(home.footerLogInToYourAccountPl).toBeVisible();
            await expect(home.footerInformationPl).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[43].name}, ${features[43].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[43].path}`);

        await test.step('Validating Portugal Home page', async () => {
            await page.goto(`${baseURL}${features[43].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[43].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCreativeCloudPt).toBeVisible();
            await expect(home.photoshopPt).toBeVisible();
            await expect(home.photographyPt).toBeVisible();
            await expect(home.aiOverviewCCPt).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatPt).toBeVisible();
            await expect(home.companiesPt).toBeVisible();
            await expect(home.aiOverviewDcPt).toBeVisible();
            await expect(home.pdfToWorPt).toBeVisible();
            await expect(home.resourcesDevelopersPt).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudPt).toBeVisible();
            await expect(home.dataAndAudienceInsightsPt).toBeVisible();
            await expect(home.analyticsPt).toBeVisible();
            await expect(home.aiOverviewECPt).toBeVisible();
            await expect(home.resourceCenterPt).toBeVisible();
            await expect(home.servicesAndSupportPt).toBeVisible();
            await expect(home.aboutSummitPt).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterPt).toBeVisible();
            await expect(home.manageYourAccountPt).toBeVisible();
            await expect(home.creativeCloudTutorialsPt).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudPt).toBeVisible();
            await expect(home.footerCreativeCloudForEnterprisePt).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersPt).toBeVisible();
            await expect(home.footerAppsForiOSPt).toBeVisible();
            await expect(home.footerWhatExperienceCloudPt).toBeVisible();
            await expect(home.footerDownloadAndInstallPt).toBeVisible();
            await expect(home.footerAdobeBlogPt).toBeVisible();
            await expect(home.footerLogInToYourAccountPt).toBeVisible();
            await expect(home.footerAboutPt).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[44].name}, ${features[44].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[44].path}`);

        await test.step('Validating Qatar-English Home page', async () => {
            await page.goto(`${baseURL}${features[44].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[44].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCQaEn).toBeVisible();
            await expect(home.photoshopQaEn).toBeVisible();
            await expect(home.photoQaEn).toBeVisible();
            await expect(home.aiOverviewCCQaEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatQaEn).toBeVisible();
            await expect(home.businessQaEn).toBeVisible();
            await expect(home.aiOverviewQaEn).toBeVisible();
            await expect(home.pdfToWordQaEn).toBeVisible();
            await expect(home.developerResourcesQaEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudQaEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesQaEn).toBeVisible();
            await expect(home.analyticsQaEn).toBeVisible();
            await expect(home.aiOverviewECQaEn).toBeVisible();
            await expect(home.resourceCenterQaEn).toBeVisible();
            await expect(home.servicesAndSupportQaEn).toBeVisible();
            await expect(home.aboutSummitQaEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreQaEn).toBeVisible();
            await expect(home.manageMyAccountQaEn).toBeVisible();
            await expect(home.creativeCloudTutorialsQaEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudQaEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessQaEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersQaEn).toBeVisible();
            await expect(home.footerAppsForiOSQaEn).toBeVisible();
            await expect(home.footerWhatExperienceCloudQaEn).toBeVisible();
            await expect(home.footerDownloadAndInstallQaEn).toBeVisible();
            await expect(home.footerAdobeBlogQaEn).toBeVisible();
            await expect(home.footerLogInToYourAccountQaEn).toBeVisible();
            await expect(home.footerAboutQaEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[45].name}, ${features[45].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[45].path}`);

        await test.step('Validating Romania Home page', async () => {
            await page.goto(`${baseURL}${features[45].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[45].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCRo).toBeVisible();
            await expect(home.photoshopRo).toBeVisible();
            await expect(home.photoRo).toBeVisible();
            await expect(home.artificialIntelligenceOverviewRo).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatRo).toBeVisible();
            await expect(home.companiesRo).toBeVisible();
            await expect(home.artificialIntelligenceOverviewDcRo).toBeVisible();
            await expect(home.pdfToWordRo).toBeVisible();
            await expect(home.developerResourcesRo).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudRo).toBeVisible();
            await expect(home.stasticalDataAndAudienceSegmentsRo).toBeVisible();
            await expect(home.analyticsRo).toBeVisible();
            await expect(home.artificialIntelligenceOverviewEcRo).toBeVisible();
            await expect(home.resourceCenterRo).toBeVisible();
            await expect(home.servicesAndSupportRo).toBeVisible();
            await expect(home.aboutSummitRo).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreRo).toBeVisible();
            await expect(home.personalAccountAdministratorRo).toBeVisible();
            await expect(home.creativeCloudTutorialsRo).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudRo).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessRo).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersRo).toBeVisible();
            await expect(home.footerAppsForiOSRo).toBeVisible();
            await expect(home.footerWhatExperienceCloudRo).toBeVisible();
            await expect(home.footerDownloadAndInstallRo).toBeVisible();
            await expect(home.footerAdobeBlogRo).toBeVisible();
            await expect(home.footerSignInToYourAccountRo).toBeVisible();
            await expect(home.footerAboutRo).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[46].name}, ${features[46].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[46].path}`);

        await test.step('Validating Saudi Arabia - English Home page', async () => {
            await page.goto(`${baseURL}${features[46].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[46].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCSaEn).toBeVisible();
            await expect(home.photoshopSaEn).toBeVisible();
            await expect(home.photoSaEn).toBeVisible();
            await expect(home.aiOverviewCCSaEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatSaEn).toBeVisible();
            await expect(home.businessSaEn).toBeVisible();
            await expect(home.aiOverviewSaEn).toBeVisible();
            await expect(home.pdfToWordSaEn).toBeVisible();
            await expect(home.developerResourcesSaEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudSaEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesSaEn).toBeVisible();
            await expect(home.analyticsSaEn).toBeVisible();
            await expect(home.aiOverviewECSaEn).toBeVisible();
            await expect(home.resourceCenterSaEn).toBeVisible();
            await expect(home.servicesAndSupportSaEn).toBeVisible();
            await expect(home.aboutSummitSaEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreSaEn).toBeVisible();
            await expect(home.manageMyAccountSaEn).toBeVisible();
            await expect(home.creativeCloudTutorialsSaEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudSaEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessSaEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersSaEn).toBeVisible();
            await expect(home.footerAppsForiOSSaEn).toBeVisible();
            await expect(home.footerWhatExperienceCloudSaEn).toBeVisible();
            await expect(home.footerDownloadAndInstallSaEn).toBeVisible();
            await expect(home.footerAdobeBlogSaEn).toBeVisible();
            await expect(home.footerLogInToYourAccountSaEn).toBeVisible();
            await expect(home.footerAboutSaEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[47].name}, ${features[47].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[47].path}`);

        await test.step('Validating Schweiz Locale page', async () => {
            await page.goto(`${baseURL}${features[47].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[47].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCChDe).toBeVisible();
            await expect(home.photoshopChDe).toBeVisible();
            await expect(home.photographyChDe).toBeVisible();
            await expect(home.aiOverviewCCChDe).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatChDe).toBeVisible();
            await expect(home.pursueCheDe).toBeVisible();
            await expect(home.aiOverviewDcChDe).toBeVisible();
            await expect(home.pdfToWordChDe).toBeVisible();
            await expect(home.resourcesForDevelopmentChDe).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudChDe).toBeVisible();
            await expect(home.dataInsightsAndTargetGroupsChDe).toBeVisible();
            await expect(home.analyticsChDe).toBeVisible();
            await expect(home.aiOverviewECChDe).toBeVisible();
            await expect(home.resourceCenterChDe).toBeVisible();
            await expect(home.servicesAndSupportChDe).toBeVisible();
            await expect(home.aboutSummitChDe).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreChDe).toBeVisible();
            await expect(home.manageAccountChDe).toBeVisible();
            await expect(home.creativeCloudTutorialsChDe).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudChDe).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessChDe).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersChDe).toBeVisible();
            await expect(home.footerAppsForiOSChDe).toBeVisible();
            await expect(home.footerWhatExperienceCloudChDe).toBeVisible();
            await expect(home.footerDownloadAndInstallChDe).toBeVisible();
            await expect(home.footerAdobeBlogChDe).toBeVisible();
            await expect(home.footerLogInToYourAccountChDe).toBeVisible();
            await expect(home.footerAboutChDe).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[48].name}, ${features[48].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[48].path}`);

        await test.step('Validating Slovenija Locale page', async () => {
            await page.goto(`${baseURL}${features[48].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[48].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCSi).toBeVisible();
            await expect(home.photoshopSi).toBeVisible();
            await expect(home.photoSi).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceSi).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatSi).toBeVisible();
            await expect(home.companySi).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceDcSi).toBeVisible();
            await expect(home.fromPdfToWordSi).toBeVisible();
            await expect(home.developerResourcesSi).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudSi).toBeVisible();
            await expect(home.dataInsightsAndAudiencesSi).toBeVisible();
            await expect(home.analyticsSi).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceEcSi).toBeVisible();
            await expect(home.resourceCenterSi).toBeVisible();
            await expect(home.resourceCenterSi).toBeVisible();
            await expect(home.aboutSummitSi).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreSi).toBeVisible();
            await expect(home.accountManagementSi).toBeVisible();
            await expect(home.creativeCloudTutorialsSi).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudSi).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessSi).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersSi).toBeVisible();
            await expect(home.footerAppsForiOSSi).toBeVisible();
            await expect(home.footerWhatExperienceCloudSi).toBeVisible();
            await expect(home.footerDownloadAndInstallSi).toBeVisible();
            await expect(home.footerAdobeBlogSi).toBeVisible();
            await expect(home.footerSignInToYourAccountSi).toBeVisible();
            await expect(home.footerBusinessCardSi).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[49].name}, ${features[49].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[49].path}`);

        await test.step('Validating Slovensko Locale page', async () => {
            await page.goto(`${baseURL}${features[49].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[49].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCSk).toBeVisible();
            await expect(home.photoshopSk).toBeVisible();
            await expect(home.photographySk).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceCcSk).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatSk).toBeVisible();
            await expect(home.companySk).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceDcSk).toBeVisible();
            await expect(home.fromPdfToWordFormatSk).toBeVisible();
            await expect(home.informationResourcesForDevelopersSk).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudSk).toBeVisible();
            await expect(home.dataOverviewsAndTargetGroupsSk).toBeVisible();
            await expect(home.analyticsSk).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceEcSk).toBeVisible();
            await expect(home.resourceCenterSk).toBeVisible();
            await expect(home.servicesAndSupportSk).toBeVisible();
            await expect(home.aboutSummitSk).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreSk).toBeVisible();
            await expect(home.accountManagementSk).toBeVisible();
            await expect(home.coursesForCreativeCloudSk).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudSk).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessSk).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersSk).toBeVisible();
            await expect(home.footerAppsForiOSSk).toBeVisible();
            await expect(home.footerWhatExperienceCloudSk).toBeVisible();
            await expect(home.footerDownloadAndInstallSk).toBeVisible();
            await expect(home.footerAdobeBlogSk).toBeVisible();
            await expect(home.footerSignInToYourAccountSk).toBeVisible();
            await expect(home.footerInformationSk).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[50].name}, ${features[50].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[50].path}`);

        await test.step('Validating South Africa Locale page', async () => {
            await page.goto(`${baseURL}${features[50].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[50].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.homeUsersAndFreelancersZa).toBeVisible();
            await expect(home.photoshopZa).toBeVisible();
            await expect(home.photoZa).toBeVisible();
            await expect(home.aiOverviewCcZa).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatZa).toBeVisible();
            await expect(home.businessZa).toBeVisible();
            await expect(home.aiOverviewDcZa).toBeVisible();
            await expect(home.pdfToWordZa).toBeVisible();
            await expect(home.developerResourcesZa).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudZa).toBeVisible();
            await expect(home.dataInsightsAndAudiencesZa).toBeVisible();
            await expect(home.analyticsZa).toBeVisible();
            await expect(home.aiOverviewEcZa).toBeVisible();
            await expect(home.resourceCenterZa).toBeVisible();
            await expect(home.servicesAndSupportZa).toBeVisible();
            await expect(home.aboutSummitZa).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreZa).toBeVisible();
            await expect(home.manageMyAccountZa).toBeVisible();
            await expect(home.creativeCloudTutorialsZa).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudZa).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessZa).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersZa).toBeVisible();
            await expect(home.footerAppsForiOSZa).toBeVisible();
            await expect(home.footerWhatExperienceCloudZa).toBeVisible();
            await expect(home.footerDownloadAndInstallZa).toBeVisible();
            await expect(home.footerAdobeBlogZa).toBeVisible();
            await expect(home.footerLogInToYourAccountZa).toBeVisible();
            await expect(home.footerAboutZa).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[51].name}, ${features[51].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[51].path}`);

        await test.step('Validating Switzerland Locale page', async () => {
            await page.goto(`${baseURL}${features[51].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[51].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCChFr).toBeVisible();
            await expect(home.photoshopChFr).toBeVisible();
            await expect(home.photographyChFr).toBeVisible();
            await expect(home.adobeFireflyChFr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatChFr).toBeVisible();
            await expect(home.businessesChFr).toBeVisible();
            await expect(home.aiProgramOverviewDcChFr).toBeVisible();
            await expect(home.pdfToWordChFr).toBeVisible();
            await expect(home.resourcesForDevelopmentSpecialistsChFr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudChFr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesChFr).toBeVisible();
            await expect(home.analyticsChFr).toBeVisible();
            await expect(home.senseiChFr).toBeVisible();
            await expect(home.resourceCenterChFr).toBeVisible();
            await expect(home.servicesAndTechnicalSupportChFr).toBeVisible();
            await expect(home.aboutSummitChFr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreChFr).toBeVisible();
            await expect(home.manageMyAccountChFr).toBeVisible();
            await expect(home.creativeCloudTutorialsChFr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudChFr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessChFr).toBeVisible();
            await expect(home.footerDiscountsForStudentsCommunityAndFacultyChFr).toBeVisible();
            await expect(home.footerAppsForiOSChFr).toBeVisible();
            await expect(home.footerWhatExperienceCloudChFr).toBeVisible();
            await expect(home.footerDownloadAndInstallChFr).toBeVisible();
            await expect(home.footerAdobeBlogChFr).toBeVisible();
            await expect(home.footerSignInToYourAccountChFr).toBeVisible();
            await expect(home.footerAboutChFr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[52].name}, ${features[52].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[52].path}`);

        await test.step('Validating Finland Locale page', async () => {
            await page.goto(`${baseURL}${features[52].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[52].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCFi).toBeVisible();
            await expect(home.photoshopFi).toBeVisible();
            await expect(home.photographsFi).toBeVisible();
            await expect(home.aiOverviewCCFi).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatFi).toBeVisible();
            await expect(home.companyFi).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceFi).toBeVisible();
            await expect(home.pdfToWordFormatFi).toBeVisible();
            await expect(home.resourcesForDevelopersFi).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudFi).toBeVisible();
            await expect(home.dataViewsAndAudiencesFi).toBeVisible();
            await expect(home.analyticsFi).toBeVisible();
            await expect(home.aiOverviewECFi).toBeVisible();
            await expect(home.resourceCenterFi).toBeVisible();
            await expect(home.servicesAndSupportFi).toBeVisible();
            await expect(home.aboutSummitFi).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreFi).toBeVisible();
            await expect(home.manageYourOwnAccountFi).toBeVisible();
            await expect(home.creativeCloudTutorialsFi).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudFi).toBeVisible();
            await expect(home.footerCreativeCloudBusinessFi).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersFi).toBeVisible();
            await expect(home.footerAppsForiOSFi).toBeVisible();
            await expect(home.footerWhatExperienceCloudFi).toBeVisible();
            await expect(home.footerDownloadAndInstallFi).toBeVisible();
            await expect(home.footerAdobeBlogFi).toBeVisible();
            await expect(home.footerSignInToYourAccountFi).toBeVisible();
            await expect(home.footerInformationFi).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[53].name}, ${features[53].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[53].path}`);

        await test.step('Validating Sverige Locale page', async () => {
            await page.goto(`${baseURL}${features[53].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[53].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCSe).toBeVisible();
            await expect(home.photoshopSe).toBeVisible();
            await expect(home.photoSe).toBeVisible();
            await expect(home.aiOverviewCCSe).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatSe).toBeVisible();
            await expect(home.businessSe).toBeVisible();
            await expect(home.anOverviewDcSe).toBeVisible();
            await expect(home.pdfToWordSe).toBeVisible();
            await expect(home.resourcesForDevelopersSe).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudSe).toBeVisible();
            await expect(home.dataInsightsAndAudiencesSe).toBeVisible();
            await expect(home.analyticsSe).toBeVisible();
            await expect(home.aiOverviewECSe).toBeVisible();
            await expect(home.resourceCenterSe).toBeVisible();
            await expect(home.servicesAndSupportSe).toBeVisible();
            await expect(home.aboutSummitSe).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCentreSe).toBeVisible();
            await expect(home.manageMyAccountSe).toBeVisible();
            await expect(home.creativeCloudTutorialsSe).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudSe).toBeVisible();
            await expect(home.footerCreativeCloudBusinessSe).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersSe).toBeVisible();
            await expect(home.footerAppsForiOSSe).toBeVisible();
            await expect(home.footerWhatExperienceCloudSe).toBeVisible();
            await expect(home.footerDownloadAndInstallSe).toBeVisible();
            await expect(home.footerAdobeBlogSe).toBeVisible();
            await expect(home.footerLogInToYourAccountSe).toBeVisible();
            await expect(home.footerIfSe).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[54].name}, ${features[54].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[54].path}`);

        await test.step('Validating Svizzera Locale page', async () => {
            await page.goto(`${baseURL}${features[54].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[54].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCChIt).toBeVisible();
            await expect(home.photoshopChIt).toBeVisible();
            await expect(home.photoChIt).toBeVisible();
            await expect(home.aiOverviewCCChIt).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatChIt).toBeVisible();
            await expect(home.companiesChIt).toBeVisible();
            await expect(home.aiOverviewDcChIt).toBeVisible();
            await expect(home.fromPdfToWordChIt).toBeVisible();
            await expect(home.developerResourcesChIt).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudChIt).toBeVisible();
            await expect(home.audiencesAndDataInsightsChIt).toBeVisible();
            await expect(home.analyticsChIt).toBeVisible();
            await expect(home.aiOverviewECChIt).toBeVisible();
            await expect(home.resourceCenterECChIt).toBeVisible();
            await expect(home.servicesAndSupportChIt).toBeVisible();
            await expect(home.aboutSummitChIt).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.resourceCenterChIt).toBeVisible();
            await expect(home.accountManagementChIt).toBeVisible();
            await expect(home.creativeCloudTutorialChIt).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudChIt).toBeVisible();
            await expect(home.footerCreativeCloudBusinessChIt).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersChIt).toBeVisible();
            await expect(home.footerAppsForiOSChIt).toBeVisible();
            await expect(home.footerWhatExperienceCloudChIt).toBeVisible();
            await expect(home.footerDownloadAndInstallChIt).toBeVisible();
            await expect(home.footerAdobeBlogChIt).toBeVisible();
            await expect(home.footerLogInToYourAccountChIt).toBeVisible();
            await expect(home.footerInformationChIt).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[55].name}, ${features[55].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[55].path}`);

        await test.step('Validating Turkey Locale page', async () => {
            await page.goto(`${baseURL}${features[55].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[55].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCTr).toBeVisible();
            await expect(home.photoshopTr).toBeVisible();
            await expect(home.photographTr).toBeVisible();
            await expect(home.artificialIntelligenceOverviewTr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatTr).toBeVisible();
            await expect(home.institutionsTr).toBeVisible();
            await expect(home.artificialIntelligenceOverviewDcTr).toBeVisible();
            await expect(home.fromPdfTr).toBeVisible();
            await expect(home.developerResourcesTr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudTr).toBeVisible();
            await expect(home.dataAnalyticsAndAudiencesTr).toBeVisible();
            await expect(home.analyticsTr).toBeVisible();
            await expect(home.artificialIntelligenceOverviewECTr).toBeVisible();
            await expect(home.resourceCenterECTr).toBeVisible();
            await expect(home.servicesAndSupportTr).toBeVisible();
            await expect(home.aboutSummitTr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterTr).toBeVisible();
            await expect(home.manageMyAccountTr).toBeVisible();
            await expect(home.creativeCloudTrainingTr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudTr).toBeVisible();
            await expect(home.footerCreativeCloudForEnterpriseTr).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersTr).toBeVisible();
            await expect(home.footeriOSAppsTr).toBeVisible();
            await expect(home.footerWhatExperienceCloudTr).toBeVisible();
            await expect(home.footerDownloadAndInstallTr).toBeVisible();
            await expect(home.footerAdobeBlogTr).toBeVisible();
            await expect(home.footerSignInToYourAccountTr).toBeVisible();
            await expect(home.footerAboutTr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[56].name}, ${features[56].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[56].path}`);

        await test.step('Validating United Arab Emirates - Enlish Locale page', async () => {
            await page.goto(`${baseURL}${features[56].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[56].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCAeEn).toBeVisible();
            await expect(home.photoshopAeEn).toBeVisible();
            await expect(home.photoAeEn).toBeVisible();
            await expect(home.aiOverviewCCAeEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatAeEN).toBeVisible();
            await expect(home.businessAeEn).toBeVisible();
            await expect(home.aiOverviewDCAeEn).toBeVisible();
            await expect(home.pdfToWordAeEn).toBeVisible();
            await expect(home.developerResourcesAeEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudAeEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesAeEn).toBeVisible();
            await expect(home.analyticsAeEn).toBeVisible();
            await expect(home.aiOverviewECAeEn).toBeVisible();
            await expect(home.resourceCenterECAeEn).toBeVisible();
            await expect(home.servicesAndSupportAeEn).toBeVisible();
            await expect(home.aboutSummitAeEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterAeEn).toBeVisible();
            await expect(home.manageMyAccountAeEn).toBeVisible();
            await expect(home.creativeCloudTrainingAeEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudAeEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessAeEn).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersAeEn).toBeVisible();
            await expect(home.footerAppsForiOSAeEn).toBeVisible();
            await expect(home.footerWhatExperienceCloudAeEn).toBeVisible();
            await expect(home.footerDownloadAndInstallAeEn).toBeVisible();
            await expect(home.footerAdobeBlogAeEn).toBeVisible();
            await expect(home.footerLogInToYourAccountAeEn).toBeVisible();
            await expect(home.footerAboutAeEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[57].name}, ${features[57].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[57].path}`);

        await test.step('Validating United Kingdom Locale page', async () => {
            await page.goto(`${baseURL}${features[57].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[57].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCUk).toBeVisible();
            await expect(home.individualsUk).toBeVisible();
            await expect(home.photoUk).toBeVisible();
            await expect(home.aiOverviewCCUk).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatUk).toBeVisible();
            await expect(home.businessUk).toBeVisible();
            await expect(home.aiOverviewDCUk).toBeVisible();
            await expect(home.pdfToWordUk).toBeVisible();
            await expect(home.developerResourcesUk).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudUk).toBeVisible();
            await expect(home.dataInsightsAndAudiencesUk).toBeVisible();
            await expect(home.analyticsUk).toBeVisible();
            await expect(home.aiOverviewECUk).toBeVisible();
            await expect(home.resourceCenterECUk).toBeVisible();
            await expect(home.servicesAndSupportUk).toBeVisible();
            await expect(home.aboutSummitUk).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterUk).toBeVisible();
            await expect(home.manageMyAccountUk).toBeVisible();
            await expect(home.creativeCloudTrainingUk).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudUk).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudUk).toBeVisible();
            await expect(home.footerDownloadAndInstallUk).toBeVisible();
            await expect(home.footerAdobeBlogUk).toBeVisible();
            await expect(home.footerLogInToYourAccountUk).toBeVisible();
            await expect(home.footerAboutUk).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[58].name}, ${features[58].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[58].path}`);

        await test.step('Validating Austria Locale page', async () => {
            await page.goto(`${baseURL}${features[58].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[58].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCAt).toBeVisible();
            await expect(home.photoshopAt).toBeVisible();
            await expect(home.photographyAt).toBeVisible();
            await expect(home.aiOverviewCCAt).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatAt).toBeVisible();
            await expect(home.pursueAt).toBeVisible();
            await expect(home.aiOverviewDCAt).toBeVisible();
            await expect(home.pdfToWordAt).toBeVisible();
            await expect(home.developerResourcesAt).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudAt).toBeVisible();
            await expect(home.dataInsightsAndTargetAt).toBeVisible();
            await expect(home.analyticsAt).toBeVisible();
            await expect(home.aiOverviewECAt).toBeVisible();
            await expect(home.resourceCenterECAt).toBeVisible();
            await expect(home.servicesAndSupportAt).toBeVisible();
            await expect(home.aboutSummitAt).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeHelpCenterAt).toBeVisible();
            await expect(home.manageAccountAt).toBeVisible();
            await expect(home.creativeCloudTrainingAt).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudAt).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessAt).toBeVisible();
            await expect(home.footerDiscountsForPupilsStudentsTeachersAt).toBeVisible();
            await expect(home.footerMobileAppsForiOSAt).toBeVisible();
            await expect(home.footerWhatIsExperienceClousAt).toBeVisible();
            await expect(home.footerDownloadAndInstallAt).toBeVisible();
            await expect(home.footerAdobeBlogAt).toBeVisible();
            await expect(home.footerLogInToYourAccountAt).toBeVisible();
            await expect(home.footerAboutAdobeAt).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[59].name}, ${features[59].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[59].path}`);

        await test.step('Validating Czech Republic Locale page', async () => {
            await page.goto(`${baseURL}${features[59].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[59].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCCz).toBeVisible(); 
            await expect(home.photoshopCz).toBeVisible();
            await expect(home.photoCz).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceCCCz).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatCz).toBeVisible();
            await expect(home.companiesCz).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceDCCz).toBeVisible();
            await expect(home.pdfToWordCz).toBeVisible();
            await expect(home.developerResourcesCz).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudCz).toBeVisible();
            await expect(home.dataOverviewAndTargetGroupsCz).toBeVisible();
            await expect(home.analyticsCz).toBeVisible();
            await expect(home.anOverviewOfArtificialIntelligenceECCz).toBeVisible();
            await expect(home.resourceCenterECCz).toBeVisible();
            await expect(home.servicesAndSupportCz).toBeVisible();
            await expect(home.aboutSummitCz).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterCz).toBeVisible();
            await expect(home.manageAccountCz).toBeVisible();
            await expect(home.tutorialsForCreativeCloudCz).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudCz).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessCz).toBeVisible();
            await expect(home.footerDiscountsForStudentsTeachersCz).toBeVisible();
            await expect(home.footerAppsForiOSCz).toBeVisible();
            await expect(home.footerWhatIsExperienceClousCz).toBeVisible();
            await expect(home.footerDownloadAndInstallCz).toBeVisible();
            await expect(home.footerAdobeBlogCz).toBeVisible();
            await expect(home.footerSignInToYourAccountCZ).toBeVisible();
            await expect(home.footerAboutUsCz).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[60].name}, ${features[60].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[60].path}`);

        await test.step('Validating Bulgaria Locale page', async () => {
            await page.goto(`${baseURL}${features[60].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[60].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCBg).toBeVisible();
            await expect(home.photoshopBg).toBeVisible();
            await expect(home.picturesBg).toBeVisible();
            await expect(home.aiOverviewCCBg).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatBg).toBeVisible();
            await expect(home.businessBg).toBeVisible();
            await expect(home.aiOverviewDcBg).toBeVisible();
            await expect(home.pdfToWordBg).toBeVisible();
            await expect(home.developerResourcesBg).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudBg).toBeVisible();
            await expect(home.informationAboutDataAndAudienceBg).toBeVisible();
            await expect(home.analyzesBg).toBeVisible();
            await expect(home.aiOverviewECBg).toBeVisible();
            await expect(home.resourceCenterBg).toBeVisible();
            await expect(home.servicesAndSupportBg).toBeVisible();
            await expect(home.aboutSummitBg).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterBg).toBeVisible();
            await expect(home.manageMyAccountBg).toBeVisible();
            await expect(home.creativeCloudTutorialsBg).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudBg).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessBg).toBeVisible();
            await expect(home.footerDiscountsForStudentsAndTeachersBg).toBeVisible();
            await expect(home.footerAppsForiOSBg).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudBg).toBeVisible();
            await expect(home.footerDownloadAndInstallBg).toBeVisible();
            await expect(home.footerBlogAtAdobeBg).toBeVisible();
            await expect(home.footerSignInToYourAccountBg).toBeVisible();
            await expect(home.footerRegardingBg).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[61].name}, ${features[61].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[61].path}`);

        await test.step('Validating Russia Locale page', async () => {
            await page.goto(`${baseURL}${features[61].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[61].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCRu).toBeVisible();
            await expect(home.photoshopRu).toBeVisible();
            await expect(home.photosRu).toBeVisible();
            await expect(home.aiReviewCCRu).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatRu).toBeVisible();
            await expect(home.businessRu).toBeVisible();
            await expect(home.aiReviewDcRu).toBeVisible();
            await expect(home.pdfToWordRu).toBeVisible();
            await expect(home.developerResourcesRu).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudRu).toBeVisible();
            await expect(home.analyticsAndAudienceRu).toBeVisible();
            await expect(home.analyticsRu).toBeVisible();
            await expect(home.aiReviewECRu).toBeVisible();
            await expect(home.resourceCenterRu).toBeVisible();
            await expect(home.servicesAndSupportRu).toBeVisible();
            await expect(home.aboutSummitRu).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterRu).toBeVisible();
            await expect(home.accountManagementRu).toBeVisible();
            await expect(home.creativeCloudTutorialsRu).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudRu).toBeVisible();
            await expect(home.footerCreativeCloudForOrganizationsRu).toBeVisible();
            await expect(home.footerSchoolsAndUniversitiesRu).toBeVisible();
            await expect(home.footeriOSAppsRu).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudRu).toBeVisible();
            await expect(home.footerDownloadAndInstallRu).toBeVisible();
            await expect(home.footerBlogAtAdobeRu).toBeVisible();
            await expect(home.footerLogInToYourAccountRu).toBeVisible();
            await expect(home.footerAboutUsRu).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[62].name}, ${features[62].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[62].path}`);

        await test.step('Validating Ukraine Locale page', async () => {
            await page.goto(`${baseURL}${features[62].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[62].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.homeUsersAndFreelancersUa).toBeVisible();
            await expect(home.photoshopUa).toBeVisible();
            await expect(home.photosUa).toBeVisible();
            await expect(home.overviewOfAiCCUa).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatUa).toBeVisible();
            await expect(home.businessUa).toBeVisible();
            await expect(home.overviewOfAiDcUa).toBeVisible();
            await expect(home.convertFromPdfToWordUa).toBeVisible();
            await expect(home.resourcesForDeveloperUa).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudUa).toBeVisible();
            await expect(home.dataAnalysisAndAudienceUa).toBeVisible();
            await expect(home.analyticsUa).toBeVisible();
            await expect(home.overviewOfAiEcUa).toBeVisible();
            await expect(home.resourceCenterUa).toBeVisible();
            await expect(home.servicesAndSupportUa).toBeVisible();
            await expect(home.aboutSummitUa).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterUa).toBeVisible();
            await expect(home.managingMyAccountUa).toBeVisible();
            await expect(home.creativeCloudGuidesUa).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudUa).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessUa).toBeVisible();
            await expect(home.footerDiscountForPupilsStudentsAndTeachersUa).toBeVisible();
            await expect(home.footerAppsForiOSUa).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudUa).toBeVisible();
            await expect(home.footerDownloadAndInstallUa).toBeVisible();
            await expect(home.footerBlogAtAdobeUa).toBeVisible();
            await expect(home.footerSignInToYourAccountUa).toBeVisible();
            await expect(home.footerAboutTheProgramUa).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[63].name}, ${features[63].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[63].path}`);

        await test.step('Validating Israel Hebrew Locale page', async () => {
            await page.goto(`${baseURL}${features[63].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[63].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCcIlHe).toBeVisible();
            await expect(home.photoshopIlHe).toBeVisible();
            await expect(home.ImageIlHe).toBeVisible();
            await expect(home.theArtificialIntelligenceReviewCcIlHe).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIlHe).toBeVisible();
            await expect(home.businessIlHe).toBeVisible();
            await expect(home.theArtificialIntelligenceReviewDcIlHe).toBeVisible();
            await expect(home.pdfToWordIlHe).toBeVisible();
            await expect(home.resourcesForDevelopersIlHe).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudIlHe).toBeVisible();
            await expect(home.dataAboutAudiencesInsightfulIlHe).toBeVisible();
            await expect(home.analyticsIlHe).toBeVisible();
            await expect(home.theArtificialIntelligenceReviewEcIlHe).toBeVisible();
            await expect(home.theResourceCenterIlHe).toBeVisible();
            await expect(home.servicesAndSupportIlHe).toBeVisible();
            await expect(home.aboutSummitIlHe).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterIlHe).toBeVisible();
            await expect(home.manageMyAccountIlHe).toBeVisible();
            await expect(home.creativeCloudTutorialsIlHe).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudIlHe).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessIlHe).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersIlHe).toBeVisible();
            await expect(home.footeriOSApplicationsIlHe).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudIlHe).toBeVisible();
            await expect(home.footerDownloadAndInstallIlHe).toBeVisible();
            await expect(home.footerTheAdobeBlogIlHe).toBeVisible();
            await expect(home.footerLogInToYourAccountIlHe).toBeVisible();
            await expect(home.footerAboutIlHe).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[64].name}, ${features[64].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[64].path}`);

        await test.step('Validating United Arab Emirates Locale page', async () => {
            await page.goto(`${baseURL}${features[64].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[64].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCAeAr).toBeVisible();
            await expect(home.photoshopAeAr).toBeVisible();
            await expect(home.thePicturesAeAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceCCAeAr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIlAeAr).toBeVisible();
            await expect(home.companiesAeAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceDCAeAr).toBeVisible();
            await expect(home.pdfToWordAeAr).toBeVisible();
            await expect(home.developerResourcesAeAr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudAeAr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesAeAr).toBeVisible();
            await expect(home.analyticsAeAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceECAeAr).toBeVisible();
            await expect(home.resourceCenterAeAr).toBeVisible();
            await expect(home.servicesAndSupportAeAr).toBeVisible();
            await expect(home.aboutSummitAeAr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterAeAr).toBeVisible();
            await expect(home.manageMyAccountAeAr).toBeVisible();
            await expect(home.creativeCloudTutorialsAeAr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudAeAr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessAeAr).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersAeAr).toBeVisible();
            await expect(home.footerApplicationsForiOSAeAr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudAeAr).toBeVisible();
            await expect(home.footerDownloadAndInstallAeAr).toBeVisible();
            await expect(home.footerTheAdobeBlogAeAr).toBeVisible();
            await expect(home.footerLogInToYourAccountAeAr).toBeVisible();
            await expect(home.footerBriefAeAr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[65].name}, ${features[65].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[65].path}`);

        await test.step('Validating Middle East And North Africa Locale page', async () => {
            await page.goto(`${baseURL}${features[65].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[65].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCMenaAr).toBeVisible();
            await expect(home.photoshopMenaAr).toBeVisible();
            await expect(home.thePictureMenaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceCCMenaAr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIlMenaAr).toBeVisible();
            await expect(home.companiesMenaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceDCMenaAr).toBeVisible();
            await expect(home.pdfToWordMenaAr).toBeVisible();
            await expect(home.developerResourcesMenaAr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudMenaAr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesMenaAr).toBeVisible();
            await expect(home.analyticsMenaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceECMenaAr).toBeVisible();
            await expect(home.resourceCenterMenaAr).toBeVisible();
            await expect(home.servicesAndSupportMenaAr).toBeVisible();
            await expect(home.aboutSummitMenaAr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterMenaAr).toBeVisible();
            await expect(home.manageMyAccountMenaAr).toBeVisible();
            await expect(home.creativeCloudTutorialsMenaAr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudMenaAr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessMenaAr).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersMenaAr).toBeVisible();
            await expect(home.footerApplicationsForiOSMenaAr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudMenaAr).toBeVisible();
            await expect(home.footerDownloadAndInstallMenaAr).toBeVisible();
            await expect(home.footerTheAdobeBlogMenaAr).toBeVisible();
            await expect(home.footerLogInToYourAccountMenaAr).toBeVisible();
            await expect(home.footerBriefMenaAr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[66].name}, ${features[66].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[66].path}`);

        await test.step('Validating Saudi Arabia Locale page', async () => {
            await page.goto(`${baseURL}${features[66].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[66].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCSaAr).toBeVisible();
            await expect(home.photoshopSaAr).toBeVisible();
            await expect(home.pictureSaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceCCSaAr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIlSaAr).toBeVisible();
            await expect(home.companiesSaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceDCSaAr).toBeVisible();
            await expect(home.pdfToWordSaAr).toBeVisible();
            await expect(home.developerResourcesSaAr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudSaAr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesSaAr).toBeVisible();
            await expect(home.analyticsSaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceECSaAr).toBeVisible();
            await expect(home.resourceCenterSaAr).toBeVisible();
            await expect(home.servicesAndSupportSaAr).toBeVisible();
            await expect(home.aboutSummitSaAr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterSaAr).toBeVisible();
            await expect(home.manageMyAccountSaAr).toBeVisible();
            await expect(home.creativeCloudTutorialsSaAr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudSaAr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessSaAr).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersSaAr).toBeVisible();
            await expect(home.footerApplicationsForiOSSaAr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudSaAr).toBeVisible();
            await expect(home.footerDownloadAndInstallSaAr).toBeVisible();
            await expect(home.footerAdobeBlogSaAr).toBeVisible();
            await expect(home.footerLogInToYourAccountSaAr).toBeVisible();
            await expect(home.footerBriefSaAr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[67].name}, ${features[67].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[67].path}`);

        await test.step('Validating Egypt Locale page', async () => {
            await page.goto(`${baseURL}${features[67].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[67].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCEgAr).toBeVisible();
            await expect(home.photoshopEgAr).toBeVisible();
            await expect(home.pictureEgAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceCCEgAr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatEgAr).toBeVisible();
            await expect(home.companiesEgAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceDCEgAr).toBeVisible();
            await expect(home.pdfToWordEgAr).toBeVisible();
            await expect(home.developerResourcesEgAr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudEgAr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesEgAr).toBeVisible();
            await expect(home.analyticsEgAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceECEgAr).toBeVisible();
            await expect(home.resourceCenterEgAr).toBeVisible();
            await expect(home.servicesAndSupportEgAr).toBeVisible();
            await expect(home.aboutSummitEgAr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterEgAr).toBeVisible();
            await expect(home.manageMyAccountEgAr).toBeVisible();
            await expect(home.creativeCloudTutorialsEgAr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudEgAr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessEgAr).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersEgAr).toBeVisible();
            await expect(home.footerApplicationsForiOSEgAr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudEgAr).toBeVisible();
            await expect(home.footerDownloadAndInstallEgAr).toBeVisible();
            await expect(home.footerAdobeBlogEgAr).toBeVisible();
            await expect(home.footerLogInToYourAccountEgAr).toBeVisible();
            await expect(home.footerBriefEgAr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[68].name}, ${features[68].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[68].path}`);

        await test.step('Validating Kuwait Locale page', async () => {
            await page.goto(`${baseURL}${features[68].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[68].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCKwAr).toBeVisible();
            await expect(home.photoshopKwAr).toBeVisible();
            await expect(home.pictureKwAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceCCKwAr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatKwAr).toBeVisible();
            await expect(home.companiesKwAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceDCKwAr).toBeVisible();
            await expect(home.pdfToWordKwAr).toBeVisible();
            await expect(home.developerResourcesKwAr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudKwAr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesKwAr).toBeVisible();
            await expect(home.analyticsKwAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceECKwAr).toBeVisible();
            await expect(home.resourceCenterKwAr).toBeVisible();
            await expect(home.servicesAndSupportKwAr).toBeVisible();
            await expect(home.aboutSummitKwAr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterKwAr).toBeVisible();
            await expect(home.manageMyAccountKwAr).toBeVisible();
            await expect(home.creativeCloudTutorialsKwAr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudKwAr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessKwAr).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersKwAr).toBeVisible();
            await expect(home.footerApplicationsForiOSKwAr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudKwAr).toBeVisible();
            await expect(home.footerDownloadAndInstallKwAr).toBeVisible();
            await expect(home.footerAdobeBlogKwAr).toBeVisible();
            await expect(home.footerLogInToYourAccountKwAr).toBeVisible();
            await expect(home.footerBriefKwAr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[69].name}, ${features[69].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[69].path}`);

        await test.step('Validating Qatar Locale page', async () => {
            await page.goto(`${baseURL}${features[69].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[69].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCQaAr).toBeVisible();
            await expect(home.photoshopQaAr).toBeVisible();
            await expect(home.pictureQaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceCCQaAr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatQaAr).toBeVisible();
            await expect(home.companiesQaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceDCQaAr).toBeVisible();
            await expect(home.pdfToWordQaAr).toBeVisible();
            await expect(home.developerResourcesQaAr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudQaAr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesQaAr).toBeVisible();
            await expect(home.analyticsQaAr).toBeVisible();
            await expect(home.aboutArtificialIntelligenceECQaAr).toBeVisible();
            await expect(home.resourceCenterQaAr).toBeVisible();
            await expect(home.servicesAndSupportQaAr).toBeVisible();
            await expect(home.aboutSummitQaAr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterQaAr).toBeVisible();
            await expect(home.manageMyAccountQaAr).toBeVisible();
            await expect(home.creativeCloudTutorialsQaAr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudQaAr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessQaAr).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersQaAr).toBeVisible();
            await expect(home.footerApplicationsForiOSQaAr).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudQaAr).toBeVisible();
            await expect(home.footerDownloadAndInstallQaAr).toBeVisible();
            await expect(home.footerAdobeBlogQaAr).toBeVisible();
            await expect(home.footerLogInToYourAccountQaAr).toBeVisible();
            await expect(home.footerBriefQaAr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[70].name}, ${features[70].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[70].path}`);

        await test.step('Validating Australia Locale page', async () => {
            await page.goto(`${baseURL}${features[70].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[70].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCAu).toBeVisible(); 
            await expect(home.photoshopAu).toBeVisible();
            await expect(home.photoAu).toBeVisible();
            await expect(home.aiOverviewCCAu).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatAu).toBeVisible();
            await expect(home.businessAu).toBeVisible();
            await expect(home.aiOverviewDCAu).toBeVisible();
            await expect(home.pdfToWordAu).toBeVisible();
            await expect(home.developerResourcesAu).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudAu).toBeVisible();
            await expect(home.dataInsightsAndAudiencesAu).toBeVisible();
            await expect(home.analyticsAu).toBeVisible();
            await expect(home.aiOverviewECAu).toBeVisible();
            await expect(home.resourceCenterAu).toBeVisible();
            await expect(home.servicesAndSupportAu).toBeVisible();
            await expect(home.aboutSummitAu).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterAu).toBeVisible();
            await expect(home.manageMyAccountAu).toBeVisible();
            await expect(home.creativeCloudTutorialsAu).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudAu).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessAu).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersAu).toBeVisible();
            await expect(home.footerAppsForiOSAu).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudAu).toBeVisible();
            await expect(home.footerDownloadAndInstallAu).toBeVisible();
            await expect(home.footerAdobeBlogAu).toBeVisible();
            await expect(home.footerLogInToYourAccountAu).toBeVisible();
            await expect(home.footerAboutAu).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[71].name}, ${features[71].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[71].path}`);

        await test.step('Validating Hong Kong S.A.R of China Locale page', async () => {
            await page.goto(`${baseURL}${features[71].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[71].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCHkEn).toBeVisible();
            await expect(home.photoshopHkEn).toBeVisible();
            await expect(home.photoHkEn).toBeVisible();
            await expect(home.aiOverviewCCHkEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatHkEn).toBeVisible();
            await expect(home.businessHkEn).toBeVisible();
            await expect(home.aiOverviewDCHkEn).toBeVisible();
            await expect(home.pdfToWordHkEn).toBeVisible();
            await expect(home.developerResourcesHkEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudHkEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesHkEn).toBeVisible();
            await expect(home.analyticsHkEn).toBeVisible();
            await expect(home.aiOverviewECHkEn).toBeVisible();
            await expect(home.resourceCenterHkEn).toBeVisible();
            await expect(home.servicesAndSupportHkEn).toBeVisible();
            await expect(home.aboutSummitHkEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterHkEn).toBeVisible();
            await expect(home.manageMyAccountHkEn).toBeVisible();
            await expect(home.creativeCloudTutorialsHkEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudHkEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessHkEn).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersHkEn).toBeVisible();
            await expect(home.footerAppsForiOSHkEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudHkEn).toBeVisible();
            await expect(home.footerDownloadAndInstallHkEn).toBeVisible();
            await expect(home.footerAdobeBlogHkEn).toBeVisible();
            await expect(home.footerLogInToYourAccountHkEn).toBeVisible();
            await expect(home.footerAboutHkEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[72].name}, ${features[72].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[72].path}`);

        await test.step('Validating India Locale page', async () => {
            await page.goto(`${baseURL}${features[72].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[72].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.removeBackgroundIn).toBeVisible();
            await expect(home.resumeIn).toBeVisible();
            await expect(home.creativeCloudIn).toBeVisible();
            await expect(home.adobeFireflyIn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIn).toBeVisible();
            await expect(home.smallBusinessIn).toBeVisible();
            await expect(home.aiOverviewDCIn).toBeVisible();
            await expect(home.pdfToWordIn).toBeVisible();
            await expect(home.developerResourcesIn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudIn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesIn).toBeVisible();
            await expect(home.analyticsIn).toBeVisible();
            await expect(home.aiOverviewECIn).toBeVisible();
            await expect(home.resourceCenterIn).toBeVisible();
            await expect(home.servicesAndSupportIn).toBeVisible();
            await expect(home.aboutSummitIn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterIn).toBeVisible();
            await expect(home.manageMyAccountIn).toBeVisible();
            await expect(home.creativeCloudTutorialsIn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudIn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessIn).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersIn).toBeVisible();
            await expect(home.footerAppsForiOSIn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudIn).toBeVisible();
            await expect(home.footerDownloadAndInstallIn).toBeVisible();
            await expect(home.footerAdobeBlogIn).toBeVisible();
            await expect(home.footerLogInToYourAccountIn).toBeVisible();
            await expect(home.footerAboutIn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[73].name}, ${features[73].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[73].path}`);

        await test.step('Validating Indonesia Locale page', async () => {
            await page.goto(`${baseURL}${features[73].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[73].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCIdId).toBeVisible();
            await expect(home.photoshopIdId).toBeVisible();
            await expect(home.photoIdId).toBeVisible();
            await expect(home.ikhtisarAiCCIdId).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIdId).toBeVisible();
            await expect(home.businessIdId).toBeVisible();
            await expect(home.ikhtisarAiDCIdId).toBeVisible();
            await expect(home.pdfIsWordIdId).toBeVisible();
            await expect(home.developerResourcesIdId).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudIdId).toBeVisible();
            await expect(home.dataAndAudienceInsightsIdId).toBeVisible();
            await expect(home.analyticsIdId).toBeVisible();
            await expect(home.senseiIdId).toBeVisible();
            await expect(home.resourceCenterIdId).toBeVisible();
            await expect(home.servicesAndSupportIdId).toBeVisible();
            await expect(home.aboutSummitIdId).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterIdId).toBeVisible();
            await expect(home.manageMyAccountIdId).toBeVisible();
            await expect(home.tutorialCreativeCloudIdId).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudIdId).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessIdId).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersIdId).toBeVisible();
            await expect(home.footerApplicationForiOSIdId).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudIdId).toBeVisible();
            await expect(home.footerDownloadAndInstallIdId).toBeVisible();
            await expect(home.footerBlogAdobeIdId).toBeVisible();
            await expect(home.footerLogInToYourAccountIdId).toBeVisible();
            await expect(home.footerAboutIdId).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[74].name}, ${features[74].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[74].path}`);

        await test.step('Validating Indonesia English Locale page', async () => {
            await page.goto(`${baseURL}${features[74].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[74].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCIdEn).toBeVisible();
            await expect(home.photoshopIdEn).toBeVisible();
            await expect(home.photoIdEn).toBeVisible();
            await expect(home.aiOverviewCCIdEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatIdEn).toBeVisible();
            await expect(home.businessIdEn).toBeVisible();
            await expect(home.aiOverviewDCIdEn).toBeVisible();
            await expect(home.pdfToWordIdEn).toBeVisible();
            await expect(home.developerResourcesIdEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudIdEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesIdEn).toBeVisible();
            await expect(home.analyticsIdEn).toBeVisible();
            await expect(home.aiOverviewECIdEn).toBeVisible();
            await expect(home.resourceCenterIdEn).toBeVisible();
            await expect(home.servicesAndSupportIdEn).toBeVisible();
            await expect(home.aboutSummitIdEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterIdEn).toBeVisible();
            await expect(home.manageMyAccountIdEn).toBeVisible();
            await expect(home.creativeCloudTutorialsIdEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudIdEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessIdEn).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersIdEn).toBeVisible();
            await expect(home.footerAppsForiOSIdEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudIdEn).toBeVisible();
            await expect(home.footerDownloadAndInstallIdEn).toBeVisible();
            await expect(home.footerAdobeBlogIdEn).toBeVisible();
            await expect(home.footerLogInToYourAccountIdEn).toBeVisible();
            await expect(home.footerAboutIdEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[75].name}, ${features[75].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[75].path}`);

        await test.step('Validating Malaysia Locale page', async () => {
            await page.goto(`${baseURL}${features[75].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[75].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCMyMs).toBeVisible();
            await expect(home.photoshopMyMs).toBeVisible();
            await expect(home.photoMyMs).toBeVisible();
            await expect(home.aiOverviewCCMyMs).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatMyMs).toBeVisible();
            await expect(home.businessMyMs).toBeVisible();
            await expect(home.aiOverviewDCMyMs).toBeVisible();
            await expect(home.pdfToWordMyMs).toBeVisible();
            await expect(home.developerResourcesMyMs).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudMyMs).toBeVisible();
            await expect(home.dataAndAudienceInsightsMyMs).toBeVisible();
            await expect(home.analyticsMyMs).toBeVisible();
            await expect(home.aiOverviewECMyMs).toBeVisible();
            await expect(home.libraryMyMs).toBeVisible();
            await expect(home.servicesAndSupportMyMs).toBeVisible();
            await expect(home.aboutSummitMyMs).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterMyMs).toBeVisible();
            await expect(home.manageMyAccountMyMs).toBeVisible();
            await expect(home.creativeCloudTutorialsMyMs).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudMyMs).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessMyMs).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersMyMs).toBeVisible();
            await expect(home.footerAppsForiOSMyMs).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudMyMs).toBeVisible();
            await expect(home.footerDownloadAndInstallMyMs).toBeVisible();
            await expect(home.footerAdobeBlogMyMs).toBeVisible();
            await expect(home.footerLogInToYourAccountMyMs).toBeVisible();
            await expect(home.footerAboutMyMs).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[76].name}, ${features[76].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[76].path}`);

        await test.step('Validating Malaysia - English Locale page', async () => {
            await page.goto(`${baseURL}${features[76].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[76].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCMyEn).toBeVisible();
            await expect(home.photoshopMyEn).toBeVisible();
            await expect(home.photoMyEn).toBeVisible();
            await expect(home.aiOverviewCCMyEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatMyEn).toBeVisible();
            await expect(home.businessMyEn).toBeVisible();
            await expect(home.aiOverviewDCMyEn).toBeVisible();
            await expect(home.pdfToWordMyEn).toBeVisible();
            await expect(home.developerResourcesMyEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudMyEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesMyEn).toBeVisible();
            await expect(home.analyticsMyEn).toBeVisible();
            await expect(home.aiOverviewECMyEn).toBeVisible();
            await expect(home.resourceCenterMyEn).toBeVisible();
            await expect(home.servicesAndSupportMyEn).toBeVisible();
            await expect(home.aboutSummitMyEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterMyEn).toBeVisible();
            await expect(home.manageMyAccountMyEn).toBeVisible();
            await expect(home.creativeCloudTutorialsMyEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudMyEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessMyEn).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersMyEn).toBeVisible();
            await expect(home.footerAppsForiOSMyEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudMyEn).toBeVisible();
            await expect(home.footerDownloadAndInstallMyEn).toBeVisible();
            await expect(home.footerAdobeBlogMyEn).toBeVisible();
            await expect(home.footerLogInToYourAccountMyEn).toBeVisible();
            await expect(home.footerAboutMyEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[77].name}, ${features[77].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[77].path}`);

        await test.step('Validating New Zealand Locale page', async () => {
            await page.goto(`${baseURL}${features[77].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[77].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCNz).toBeVisible();
            await expect(home.photoshopNz).toBeVisible();
            await expect(home.photoNz).toBeVisible();
            await expect(home.aiOverviewCCNz).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatNz).toBeVisible();
            await expect(home.businessNz).toBeVisible();
            await expect(home.aiOverviewDCNz).toBeVisible();
            await expect(home.pdfToWordNz).toBeVisible();
            await expect(home.developerResourcesNz).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudNz).toBeVisible();
            await expect(home.dataInsightsAndAudiencesNz).toBeVisible();
            await expect(home.analyticsNz).toBeVisible();
            await expect(home.aiOverviewECNz).toBeVisible();
            await expect(home.resourceCenterNz).toBeVisible();
            await expect(home.servicesAndSupportNz).toBeVisible();
            await expect(home.aboutSummitNz).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterNz).toBeVisible();
            await expect(home.manageMyAccountNz).toBeVisible();
            await expect(home.creativeCloudTutorialsNz).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudNz).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessNz).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersNz).toBeVisible();
            await expect(home.footerAppsForiOSNz).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudNz).toBeVisible();
            await expect(home.footerDownloadAndInstallNz).toBeVisible();
            await expect(home.footerAdobeBlogNz).toBeVisible();
            await expect(home.footerLogInToYourAccountNz).toBeVisible();
            await expect(home.footerAboutNz).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[78].name}, ${features[78].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[78].path}`);

        await test.step('Validating Philippines - English Locale page', async () => {
            await page.goto(`${baseURL}${features[78].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[78].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCPhEn).toBeVisible();
            await expect(home.photoshopPhEn).toBeVisible();
            await expect(home.photoPhEn).toBeVisible();
            await expect(home.aiOverviewCCPhEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatPhEn).toBeVisible();
            await expect(home.businessPhEn).toBeVisible();
            await expect(home.aiOverviewDCPhEn).toBeVisible();
            await expect(home.pdfToWordPhEn).toBeVisible();
            await expect(home.developerResourcesPhEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudPhEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesPhEn).toBeVisible();
            await expect(home.analyticsPhEn).toBeVisible();
            await expect(home.aiOverviewECPhEn).toBeVisible();
            await expect(home.resourceCenterPhEn).toBeVisible();
            await expect(home.servicesAndSupportPhEn).toBeVisible();
            await expect(home.aboutSummitPhEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterPhEn).toBeVisible();
            await expect(home.manageMyAccountPhEn).toBeVisible();
            await expect(home.creativeCloudTutorialsPhEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudPhEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessPhEn).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersPhEn).toBeVisible();
            await expect(home.footerAppsForiOSPhEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudPhEn).toBeVisible();
            await expect(home.footerDownloadAndInstallPhEn).toBeVisible();
            await expect(home.footerAdobeBlogPhEn).toBeVisible();
            await expect(home.footerLogInToYourAccountPhEn).toBeVisible();
            await expect(home.footerAboutPhEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[79].name}, ${features[79].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[79].path}`);

        await test.step('Validating Philippines Locale page', async () => {
            await page.goto(`${baseURL}${features[79].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[79].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCPhFil).toBeVisible();
            await expect(home.photoshopPhFil).toBeVisible();
            await expect(home.picturePhFil).toBeVisible();
            await expect(home.aiOverviewCCPhFil).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatPhFil).toBeVisible();
            await expect(home.businessPhFil).toBeVisible();
            await expect(home.aiOverviewDCPhFil).toBeVisible();
            await expect(home.convertPdfToWordPhFil).toBeVisible();
            await expect(home.developerResourcesPhFil).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudPhFil).toBeVisible();
            await expect(home.dataInsightsAndAudiencesPhFil).toBeVisible();
            await expect(home.analyticsPhFil).toBeVisible();
            await expect(home.aiOverviewECPhFil).toBeVisible();
            await expect(home.resourceCenterPhFil).toBeVisible();
            await expect(home.servicesAndSupportPhFil).toBeVisible();
            await expect(home.aboutSummitPhFil).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterPhFil).toBeVisible();
            await expect(home.manageMyAccountPhFil).toBeVisible();
            await expect(home.creativeCloudTutorialsPhFil).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudPhFil).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessPhFil).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersPhFil).toBeVisible();
            await expect(home.footerAppsForiOSPhFil).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudPhFil).toBeVisible();
            await expect(home.footerDownloadAndInstallPhFil).toBeVisible();
            await expect(home.footerAdobeBlogPhFil).toBeVisible();
            await expect(home.footerLogInToYourAccountPhFil).toBeVisible();
            await expect(home.footerAboutThisPhFil).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[80].name}, ${features[80].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[80].path}`);

        await test.step('Validating Singapore Locale page', async () => {
            await page.goto(`${baseURL}${features[80].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[80].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCSg).toBeVisible();
            await expect(home.photoshopSg).toBeVisible();
            await expect(home.photoSg).toBeVisible();
            await expect(home.aiOverviewCCSg).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatSg).toBeVisible();
            await expect(home.businessSg).toBeVisible();
            await expect(home.aiOverviewDCSg).toBeVisible();
            await expect(home.pdfToWordSg).toBeVisible();
            await expect(home.developerResourcesSg).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudSg).toBeVisible();
            await expect(home.dataInsightsAndAudiencesSg).toBeVisible();
            await expect(home.analyticsSg).toBeVisible();
            await expect(home.aiOverviewECSg).toBeVisible();
            await expect(home.resourceCenterSg).toBeVisible();
            await expect(home.servicesAndSupportSg).toBeVisible();
            await expect(home.aboutSummitSg).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterSg).toBeVisible();
            await expect(home.manageMyAccountSg).toBeVisible();
            await expect(home.creativeCloudTutorialsSg).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudSg).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessSg).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersSg).toBeVisible();
            await expect(home.footerAppsForiOSSg).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudSg).toBeVisible();
            await expect(home.footerDownloadAndInstallSg).toBeVisible();
            await expect(home.footerAdobeBlogSg).toBeVisible();
            await expect(home.footerLogInToYourAccountSg).toBeVisible();
            await expect(home.footerAboutSg).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[81].name}, ${features[81].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[81].path}`);

        await test.step('Validating Thailand - English Locale page', async () => {
            await page.goto(`${baseURL}${features[81].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[81].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCThEn).toBeVisible();
            await expect(home.photoshopThEn).toBeVisible();
            await expect(home.photoThEn).toBeVisible();
            await expect(home.aiOverviewCCThEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatThEn).toBeVisible();
            await expect(home.businessThEn).toBeVisible();
            await expect(home.aiOverviewDCThEn).toBeVisible();
            await expect(home.pdfToWordThEn).toBeVisible();
            await expect(home.developerResourcesThEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudThEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesThEn).toBeVisible();
            await expect(home.analyticsThEn).toBeVisible();
            await expect(home.aiOverviewECThEn).toBeVisible();
            await expect(home.resourceCenterThEn).toBeVisible();
            await expect(home.servicesAndSupportThEn).toBeVisible();
            await expect(home.aboutSummitThEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterThEn).toBeVisible();
            await expect(home.manageMyAccountThEn).toBeVisible();
            await expect(home.creativeCloudTutorialsThEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudThEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessThEn).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersThEn).toBeVisible();
            await expect(home.footerAppsForiOSThEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudThEn).toBeVisible();
            await expect(home.footerDownloadAndInstallThEn).toBeVisible();
            await expect(home.footerAdobeBlogThEn).toBeVisible();
            await expect(home.footerLogInToYourAccountThEn).toBeVisible();
            await expect(home.footerAboutThEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[82].name}, ${features[82].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[82].path}`);

        await test.step('Validating Vietnam - English Locale page', async () => {
            await page.goto(`${baseURL}${features[82].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[82].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCVnEn).toBeVisible();
            await expect(home.photoshopVnEn).toBeVisible();
            await expect(home.photoVnEn).toBeVisible();
            await expect(home.aiOverviewCCVnEn).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatVnEn).toBeVisible();
            await expect(home.businessVnEn).toBeVisible();
            await expect(home.aiOverviewDCVnEn).toBeVisible();
            await expect(home.pdfToWordVnEn).toBeVisible();
            await expect(home.developerResourcesVnEn).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudVnEn).toBeVisible();
            await expect(home.dataInsightsAndAudiencesVnEn).toBeVisible();
            await expect(home.analyticsVnEn).toBeVisible();
            await expect(home.aiOverviewECVnEn).toBeVisible();
            await expect(home.resourceCenterVnEn).toBeVisible();
            await expect(home.servicesAndSupportVnEn).toBeVisible();
            await expect(home.aboutSummitVnEn).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterVnEn).toBeVisible();
            await expect(home.manageMyAccountVnEn).toBeVisible();
            await expect(home.creativeCloudTutorialsVnEn).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudVnEn).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessVnEn).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersVnEn).toBeVisible();
            await expect(home.footerAppsForiOSVnEn).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudVnEn).toBeVisible();
            await expect(home.footerDownloadAndInstallVnEn).toBeVisible();
            await expect(home.footerAdobeBlogVnEn).toBeVisible();
            await expect(home.footerLogInToYourAccountVnEn).toBeVisible();
            await expect(home.footerAboutVnEn).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[83].name}, ${features[83].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[83].path}`);

        await test.step('Validating Vietnam Locale page', async () => {
            await page.goto(`${baseURL}${features[83].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[83].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCVnVi).toBeVisible();
            await expect(home.photoshopVnVi).toBeVisible();
            await expect(home.imageVnVi).toBeVisible();
            await expect(home.aiOverviewCCVnVi).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatVnVi).toBeVisible();
            await expect(home.enterpriseVnVi).toBeVisible();
            await expect(home.aiOverviewDCVnVi).toBeVisible();
            await expect(home.pdfToWordVnVi).toBeVisible();
            await expect(home.resourcesForDevelopersVnVi).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudVnVi).toBeVisible();
            await expect(home.insightsIntoDataAndTargetGroupVnVi).toBeVisible();
            await expect(home.analyticsVnVi).toBeVisible();
            await expect(home.aiOverviewECVnVi).toBeVisible();
            await expect(home.resourceCenterVnVi).toBeVisible();
            await expect(home.servicesAndSupportVnVi).toBeVisible();
            await expect(home.aboutSummitVnVi).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterVnVi).toBeVisible();
            await expect(home.manageMyAccountVnVi).toBeVisible();
            await expect(home.creativeCloudGuideVnVi).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudVnVi).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessVnVi).toBeVisible();
            await expect(home.footerDiscountForStudentsAndFacultyVnVi).toBeVisible();
            await expect(home.footerAppsForiOSVnVi).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudVnVi).toBeVisible();
            await expect(home.footerDownloadAndInstallVnVi).toBeVisible();
            await expect(home.footerAdobeBlogVnVi).toBeVisible();
            await expect(home.footerSignInToYourAccountVnVi).toBeVisible();
            await expect(home.footerIntroduceVnVi).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[84].name}, ${features[84].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[84].path}`);

        await test.step('Validating India - Hindi Locale page', async () => {
            await page.goto(`${baseURL}${features[84].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[84].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCInHi).toBeVisible();
            await expect(home.photoshopInHi).toBeVisible();
            await expect(home.photoInHi).toBeVisible();
            await expect(home.aiOverviewCCInHi).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatInHi).toBeVisible();
            await expect(home.businessInHi).toBeVisible();
            await expect(home.aiOverviewDCInHi).toBeVisible();
            await expect(home.pdfToWordInHi).toBeVisible();
            await expect(home.developerResourcesInHi).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudInHi).toBeVisible();
            await expect(home.dataInsightsAndAudiencesInHi).toBeVisible();
            await expect(home.analyticsInHi).toBeVisible();
            await expect(home.aiOverviewECInHi).toBeVisible();
            await expect(home.resourceCenterInHi).toBeVisible();
            await expect(home.servicesAndSupportInHi).toBeVisible();
            await expect(home.aboutSummitInHi).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterInHi).toBeVisible();
            await expect(home.manageMyAccountInHi).toBeVisible();
            await expect(home.creativeCloudTutorialsInHi).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudInHi).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessInHi).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersInHi).toBeVisible();
            await expect(home.footerAppsForiOSInHi).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudInHi).toBeVisible();
            await expect(home.footerDownloadAndInstallInHi).toBeVisible();
            await expect(home.footerAdobeBlogInHi).toBeVisible();
            await expect(home.footerLogInToYourAccountInHi).toBeVisible();
            await expect(home.footerIntroductionInHi).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[85].name}, ${features[85].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[85].path}`);

        await test.step('Validating Thailand Locale page', async () => {
            await page.goto(`${baseURL}${features[85].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[85].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCThTh).toBeVisible();
            await expect(home.photoshopThTh).toBeVisible();
            await expect(home.photoThTh).toBeVisible();
            await expect(home.aiOverviewCCThTh).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatThTh).toBeVisible();
            await expect(home.businessThTh).toBeVisible();
            await expect(home.aiOverviewDCThTh).toBeVisible();
            await expect(home.pdfToWordThTh).toBeVisible();
            await expect(home.developerResourcesThTh).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudThTh).toBeVisible();
            await expect(home.insightsAndTargetAudiencesThTh).toBeVisible();
            await expect(home.analyticsThTH).toBeVisible();
            await expect(home.aiOverviewECThTh).toBeVisible();
            await expect(home.resourceCenterThTh).toBeVisible();
            await expect(home.servicesAndSupportThTh).toBeVisible();
            await expect(home.aboutSummitThTh).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterThTh).toBeVisible();
            await expect(home.manageMyAccountThTh).toBeVisible();
            await expect(home.creativeCloudTutorialsThTh).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudThTh).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessThTh).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersThTh).toBeVisible();
            await expect(home.footerAppsForiOSThTh).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudThTH).toBeVisible();
            await expect(home.footerDownloadAndInstallThTH).toBeVisible();
            await expect(home.footerAdobeBlogThTh).toBeVisible();
            await expect(home.footerLogInToYourAccountThTh).toBeVisible();
            await expect(home.footerIntroductionThTh).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[86].name}, ${features[86].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[86].path}`);

        await test.step('Validating China Locale page', async () => {
            await page.goto(`${baseURL}${features[86].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[86].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.signInButton).toBeVisible();

            //Validating Footer
            await expect(home.footerAboutCh).toBeVisible();
            await expect(home.footerDownloadAndInstallCh).toBeVisible();
            await expect(home.footerLoginAccountCh).toBeVisible();
            await expect(home.changeRegion).toBeVisible();
            await expect(home.weibo).toBeVisible();
            await expect(home.copyright).toBeVisible();
        });
    });

    test(`${features[87].name}, ${features[87].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[87].path}`);

        await test.step('Validating Hong Kong Locale page', async () => {
            await page.goto(`${baseURL}${features[87].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[87].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.loginButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCHkZh).toBeVisible();
            await expect(home.photoshopHkZh).toBeVisible();
            await expect(home.photoHkZh).toBeVisible();
            await expect(home.aiOverviewCCHkZh).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatHkZh).toBeVisible();
            await expect(home.enterpriseHkZh).toBeVisible();
            await expect(home.aiOverviewDCHkZh).toBeVisible();
            await expect(home.pdfToWordHkZh).toBeVisible();
            await expect(home.developerResourcesHkZh).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudHkZh).toBeVisible();
            await expect(home.dataInsightsAndAudiencesHkZh).toBeVisible();
            await expect(home.analyticsHkZh).toBeVisible();
            await expect(home.aiOverviewECHkZh).toBeVisible();
            await expect(home.resourceCenterHkZh).toBeVisible();
            await expect(home.servicesAndSupportHkZh).toBeVisible();
            await expect(home.aboutSummitHkZh).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterHkZh).toBeVisible();
            await expect(home.manageMyAccountHkZh).toBeVisible();
            await expect(home.creativeCloudTutorialsHkZh).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudHkZh).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessHkZh).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersHkZh).toBeVisible();
            await expect(home.footerAppsForiOSHkZh).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudHkZh).toBeVisible();
            await expect(home.footerDownloadAndInstallHkZh).toBeVisible();
            await expect(home.footerAdobeBlogHkZh).toBeVisible();
            await expect(home.footerLogInToYourAccountHkZh).toBeVisible();
            await expect(home.footerAboutHkZh).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[88].name}, ${features[88].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[88].path}`);

        await test.step('Validating Taiwan Locale page', async () => {
            await page.goto(`${baseURL}${features[88].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[88].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.whatIsCCTw).toBeVisible();
            await expect(home.photoshopTw).toBeVisible();
            await expect(home.photoTw).toBeVisible();
            await expect(home.aiOverviewCCTw).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatTw).toBeVisible();
            await expect(home.enterpriseTw).toBeVisible();
            await expect(home.aiOverviewDCTw).toBeVisible();
            await expect(home.pdfToWordTw).toBeVisible();
            await expect(home.developerResourcesTw).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudTw).toBeVisible();
            await expect(home.dataInsightsAndAudiencesTw).toBeVisible();
            await expect(home.analyticsTw).toBeVisible();
            await expect(home.aiOverviewECTw).toBeVisible();
            await expect(home.resourceCenterTw).toBeVisible();
            await expect(home.servicesAndSupportTw).toBeVisible();
            await expect(home.aboutSummitTw).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterTw).toBeVisible();
            await expect(home.manageMyAccountTw).toBeVisible();
            await expect(home.creativeCloudTutorialsTw).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudTw).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessTw).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersTw).toBeVisible();
            await expect(home.footerAppsForiOSTw).toBeVisible();
            await expect(home.footerWhatIsExperienceCloudTw).toBeVisible();
            await expect(home.footerDownloadAndInstallTw).toBeVisible();
            await expect(home.footerAdobeBlogTw).toBeVisible();
            await expect(home.footerLogInToYourAccountTw).toBeVisible();
            await expect(home.footerAboutTw).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });

    test(`${features[90].name}, ${features[90].tags}`, async ({ page, baseURL }) => {
        const home = new HomePageSanity(page);
        console.info(`[FEDSInfo] Checking page: ${baseURL}${features[90].path}`);

        await test.step('Validating Korea Locale page', async () => {
            await page.goto(`${baseURL}${features[90].path}`);
            await page.waitForLoadState('domcontentloaded');
            await expect(page).toHaveURL(`${baseURL}${features[90].path}`);

            //Validating Brand logo and label
            await expect(home.adobelogo).toBeVisible();

            //Validating U-Nav
            await expect(home.appSwitcher).toBeVisible();
            await expect(home.signInButton).toBeVisible();

            //Validating G-Nav Creative Cloud
            await expect(home.gnavCC).toBeVisible();
            await home.gnavCC.click();
            await home.gnavCC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.introductionToCCKr).toBeVisible();
            await expect(home.photoshopKr).toBeVisible();
            await expect(home.pictureKr).toBeVisible();
            await expect(home.aiOverviewCCKr).toBeVisible();

            //Validating G-Nav Document cloud
            await home.gnavDC.click();
            await home.gnavDC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeAcrobatKr).toBeVisible();
            await expect(home.enterpriseKr).toBeVisible();
            await expect(home.aiOverviewDCKr).toBeVisible();
            await expect(home.pdfToWordKr).toBeVisible();
            await expect(home.developerResourcesKr).toBeVisible();

            //Validating G-Nav Experience Cloud
            await home.gnavEC.click();
            await home.gnavEC.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.adobeExperienceCloudKr).toBeVisible();
            await expect(home.dataInsightsAndAudiencesKr).toBeVisible();
            await expect(home.analyticsKr).toBeVisible();
            await expect(home.aiOverviewECKr).toBeVisible();
            await expect(home.resourceCenterKr).toBeVisible();
            await expect(home.servicesAndSupportKr).toBeVisible();
            await expect(home.aboutSummitKr).toBeVisible();

            //Validating G-Nav Help-X 
            await home.gnavHelpX.click();
            await home.gnavHelpX.waitFor({ state: 'visible', timeout: 5000 });
            await expect(home.helpCenterKr).toBeVisible();
            await expect(home.accountManagementKr).toBeVisible();
            await expect(home.creativeCloudTutorialsKr).toBeVisible();
            await home.gnavHelpX.click();

            //Validating Footer
            await expect(home.footerCreativeCloudKr).toBeVisible();
            await expect(home.footerCreativeCloudForBusinessKr).toBeVisible();
            await expect(home.footerDiscountForStudentsAndTeachersKr).toBeVisible();
            await expect(home.footerAppsForiOSKr).toBeVisible();
            await expect(home.footerIntroductionToExperienceCloudKr).toBeVisible();
            await expect(home.footerDownloadAndInstallKr).toBeVisible();
            await expect(home.footerAdobeBlogKr).toBeVisible();
            await expect(home.footerLogInToYourAccountKr).toBeVisible();
            await expect(home.footerInformationKr).toBeVisible();
            //Featued Products
            await expect(home.footerAdobeAcrobatReaderlogo).toBeVisible();
            await expect(home.footerAdobeExpresslogo).toBeVisible();
            await expect(home.footerPhotoshoplogo).toBeVisible();
            await expect(home.footerIllustratorlogo).toBeVisible();
            //ChangeRegion
            await expect(home.changeRegion).toBeVisible();
            await expect(home.facebookLogo).toBeVisible();
            await expect(home.instagramLogo).toBeVisible();
            await expect(home.twitterlogo).toBeVisible();
            await expect(home.linkedinLogo).toBeVisible();
            await expect(home.copyright).toBeVisible();
            await expect(home.privacyPolicy).toBeVisible();
            await expect(home.termsOfUse).toBeVisible();
            await expect(home.cookies).toBeVisible();
            await expect(home.protectMyPersonalData).toBeVisible();
            await expect(home.adChoices).toBeVisible();
        });
    });
});
