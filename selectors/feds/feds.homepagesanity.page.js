import { expect, test } from '@playwright/test';

export default class HomePageSanity {
    constructor(page) {
        this.page = page;

        // Brand Logo and Label
        this.adobelogo = page.locator('div.feds-brand-container');

        //U-Nav Elements
        this.appSwitcher = page.locator('.unav-comp-app-switcher');
        this.signInButton = page.locator('#unav-profile');
        this.loginButton = page.locator('.feds-signIn');
        this.Tologin = page.locator('div.profile-signed-out>button');
        this.signInButtonCa = page.locator("//button[@daa-ll='Sign In']");

        //Gnav Elements
        this.gnav = page.locator('#feds-nav-wrapper>div.feds-nav');
        this.gnavCC = this.gnav.locator('section.feds-navItem > button').nth(0);
        this.gnavDC = this.gnav.locator('section.feds-navItem > button').nth(1);
        this.gnavEC = this.gnav.locator('section.feds-navItem > button').nth(2);
        this.gnavHelpX = this.gnav.locator('section.feds-navItem > button').nth(3);

        // 1) Creative Cloud Elements
        //Argentina
        this.whatIsCC = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.collegesAndUniversities = page.locator("(//a[contains(@daa-ll,'Colegios y universidades')])[1]");
        this.viewPlansAndPrices = page.locator("//a[contains(@daa-ll,'Ver planes y precios') and @class='feds-cta feds-cta--primary']");
        this.photoshop = page.locator("//div[contains(@daa-lh,'Productos destacados')]//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.AdobeStock = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//descendant::div[@class='feds-navLink-content']");
        this.photo = page.locator("//div[@daa-lh='Explorar']//descendant::a[contains(@daa-ll,'Foto')]");
        this.pdf = page.locator("//div[@daa-lh='Explorar']//descendant::a[contains(@daa-ll,'PDF')]");
        this.AIOverviewCC = page.locator("(//div[@daa-lh='Inteligencia artificial']//descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFirefly = page.locator("(//div[@daa-lh='Inteligencia artificial']//descendant::a[contains(@daa-ll,'Adobe Firefly')])[1]");

        //United States
        this.whatIsCCUS = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.schoolsAndUniversitiesUS = page.locator("//a[contains(@daa-ll,'Schools and universities')]//div[@class='feds-navLink-content']");
        this.viewPlansAndPricesUS = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'View plans and pricing')]");
        this.photoshopUS = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockUS = page.locator("//a[contains(@daa-ll,'Adobe Stock')]/descendant::div[@class='feds-navLink-content']");
        this.photoUS = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.pdfUS = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'PDF')]");
        this.AIOverviewCCUS = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.adobeFireflyUS = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //France
        this.individualsAndFreelancersFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Particuliers et freelances')])[1]");
        this.seeTheFormulasAndPricesFr = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Voir les formules et tarifs')]");
        this.photoshopFr = page.locator("(//div[@class='feds-menu-column']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.adobeStockFr = page.locator("(//div[@class='feds-menu-column']/descendant::a[contains(@daa-ll,'Adobe Stock')])[1]");
        this.photoEditingFr = page.locator("//div[@class='feds-menu-column']/descendant::a[contains(@daa-ll,'Retouche photo')]");
        this.pdfFr = page.locator("//div[@daa-lh='Activités']/descendant::a[contains(@daa-ll,'PDF')]");
        this.adobeFireflyFr = page.locator("//div[@daa-lh='Nouveautés']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Germany
        this.privateUsersAndFreelancersGr = page.locator("//a[contains(@daa-ll,'Privatnutzer und Freiberufler')]");
        this.businessGr = page.locator("//a[contains(@daa-ll,'Business')]/descendant::div[@class='feds-navLink-content']");
        this.allOffersAndPricesGr = page.locator("//a[contains(@daa-ll,'Alle Angebote und Preise')]");
        this.photoshopGr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.adobeStockGr = page.locator("//a[contains(@daa-ll,'Adobe Stock')]/descendant::div[@class='feds-navLink-content']");
        this.viewAllProductsGr = page.locator("(//a[contains(@daa-ll,'Alle Produkte anzeigen')]//div[@class='feds-navLink-title'])[1]");
        this.photographyGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Fotografie')])[1]");
        this.pdfGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.AIOverviewCCGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'KI Überblick')])[1]");
        this.adobeFireflyGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Japan
        this.whatIsCCJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloudとは')]");
        this.forPhotographersJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'フォトグラファー向け')]");
        this.viewPlansAndPricesJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'プランと価格を見る')])[1]");
        this.photoshopJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.adobeFireflyJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Firefly')])[1]");
        this.photographyJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'写真')]");
        this.pdfJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.AIOverviewCCJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AIの概要')])[1]");
        this.adobeFireflyAIJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Firefly')])[2]");

        //Italy
        this.privateUsersAndFreelancersIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Utenti privati e liberi profes')]");
        this.viewPlansAndPricingIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Visualizza i piani e i prezzi')])[1]");
        this.photoshopIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.adobeStockIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Stock')])[1]");
        this.photoIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Foto')])[2]");
        this.pdfIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Panoramica IA')])[1]");
        this.adobeFireflyCCIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Brazil
        this.allAppsOverviewBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Visão geral de Todos os Apps')]");
        this.adobeStockBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Stock')])[1]");
        this.seeAllProductsBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Veja todos os produtos')])[1]");
        this.personalUseBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Uso pessoal')]");
        this.companiesBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Empresas')])[1]");
        this.seePlansAndPricesBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Veja os planos e preços')])[1]");
        this.photographyBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.AIOverviewCCBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Visão geral da IA')])[1]");
        this.adobeFireflyCCBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");
        this.seeSpecialOffersCCBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Veja as ofertas especiais')]");

        //Canada English
        this.whatIsCCCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Creative Cloud')]");
        this.schoolsAndUniversitiesCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Schools and universities')])[1]");
        this.viewPlansAndPricesCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View plans and pricing')])[1]");
        this.photoshopCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Stock')])[1]");
        this.photoCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Photo')])[3]");
        this.pdfCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.adobeFireflyCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Canada French
        this.whatIsCCCaFr = page.locator("//a[contains(@daa-ll,'Qu est ce que Creative Cloud')]");
        this.schoolsAndUniversitiesCaFr = page.locator("(//div[@class='feds-menu-section']//a[contains(@daa-ll,'Écoles et universités')])[1]");
        this.seeTheFormulasAndPricesCaFr = page.locator("//div[@class='feds-cta-wrapper']//a[contains(@daa-ll,'Voir les formules et les tarif')]");
        this.photoshopCaFr = page.locator("(//div[@class='feds-menu-items']//a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockCaFr = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//descendant::div[@class='feds-navLink-content']");
        this.photographyCaFr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photographie')])[1]");
        this.pdfCaFr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiProgramOverviewCCCaFr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Présentation du programme d IA')])[1]");
        this.adobeFireflyCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Chile
        this.discoverAllApplicationsCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Descubre Todas las Aplicacione')]");
        this.adobeStockCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Stock')])[1]");
        this.seeAllProductsCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[1]");
        this.IndividualsCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Individuos')]");
        this.seePlansAndPricesCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Ver planes y precios')])[1]");
        this.photographyCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Fotografía')])[1]");
        this.pdfCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.AIOverviewCCCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFirefly = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Colombia
        this.whatIsCCCo = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersCo = page.locator("(//a[contains(@daa-ll,'Fotógrafos')])[1]");
        this.seePlansAndPricesCo = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.photoshopCo = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockCo = page.locator("//a[contains(@daa-ll,'Adobe Stock')]/descendant::div[@class='feds-navLink-content']");
        this.photoCo = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfCo = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCCo = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Costa Rica
        this.whatIsCCCr = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersCr = page.locator("(//a[contains(@daa-ll,'Fotógrafos')])[1]");
        this.seePlansAndPricesCr = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.photoshopCr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockCr = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoCr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfCr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCCr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Ecuador
        this.whatIsCCEc = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersEc = page.locator("(//a[contains(@daa-ll,'Fotógrafos')])[1]");
        this.seePlansAndPricesEc = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.photoshopEc = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockEc = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoEc = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfEc = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCEc = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Guatemala
        this.whatIsCCGt = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersGt = page.locator("(//a[contains(@daa-ll,'Fotógrafos')])[1]");
        this.seePlansAndPricesGt = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.photoshopGt = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockGt = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoGt = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfGt = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCGt = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Latin-America
        this.whatIsCCLa = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersLa = page.locator("(//a[contains(@daa-ll,'Fotógrafos')])[1]");
        this.seePlansAndPricesLa = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.photoshopLa = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockLa = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoLa = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfLa = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCLa = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Mexico
        this.whatIsCCMx = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersMx = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.seePlansAndPricesMx = page.locator("//a[@daa-ll='Ver planes y precios-7']");
        this.photoshopMx = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockMx = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoMx = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfMx = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCMx = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Peru
        this.whatIsCCPe = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersPe = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.seePlansAndPricesPe = page.locator("//a[@daa-ll='Ver planes y precios-7']");
        this.photoshopPe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockPe = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoPe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfPe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCPe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyPe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Puerto Rico
        this.whatIsCCPr = page.locator("//a[contains(@daa-ll,'Qué es Creative Cloud')]");
        this.photographersPr = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver planes y precios')]");
        this.seePlansAndPricesPr = page.locator("//a[@daa-ll='Ver planes y precios-7']");
        this.photoshopPr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockPr = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoPr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Foto')])[1]");
        this.pdfPr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.aiOverviewCCPr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyPr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Africa-English
        this.homeUsersAndFreelancersAf = page.locator("//a[contains(@daa-ll,'Home users and freelancers')]");
        this.photographersAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Photographers')]");
        this.viewPlansAndPricesAf = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'View plans and pricing')]");
        this.photoshopAf = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockAf = page.locator("//a[contains(@daa-ll,'Adobe Stock')]/descendant::div[@class='feds-navLink-content']");
        this.photoAf = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.pdfAf = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'PDF')]");
        this.aiOverviewCCAf = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.adobeFireflyAf = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Belgique-French
        this.whatIsCCBeFr = page.locator("//a[contains(@daa-ll, 'Qu est ce que Creative Cloud')]");
        this.photographersBeFr = page.locator("//a[contains(@daa-ll, 'Photographes')]//descendant::div[@class='feds-navLink-content']");
        this.seeTheFormulasAndPricesBeFr = page.locator("//a[contains(@daa-ll, 'Voir les formules et tarifs')]//ancestor::div[@class='feds-cta-wrapper']");
        this.photoshopBeFr = page.locator("(//div[@class='feds-menu-items']//a[contains(@daa-ll,'Photoshop')])[1]");
        this.AdobeStockBeFr = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//descendant::div[@class='feds-navLink-content']");
        this.photographyBeFr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photographie')])[1]");
        this.pdfBeFr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.adobeFireflyBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Belgium-English
        this.whatIsCCBeEn = page.locator("//a[contains(@daa-ll, 'What is Creative Cloud')]");
        this.photographersBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'Photographers')]");
        this.viewPlansAndPricesBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'View plans and pricing')])[1]");
        this.photoshopBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'Photoshop')])[1]");
        this.AdobeStockBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'Adobe Stock')])[1]");
        this.photoBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'Photo')])[3]");
        this.pdfBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'PDF')])[1]");
        this.aiOverviewCCBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'AI Overview')])[1]");
        this.adobeFireflyBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll, 'Adobe Firefly')]");

        //Belgie-Nederlands
        this.whatIsCCBeNl = page.locator("//a[contains(@daa-ll, 'Wat is Creative Cloud')]");
        this.photographersBeNl = page.locator("//a[contains(@daa-ll, 'Fotografen') and @class='feds-navLink']");
        this.viewMembershipAndPricesBeNl = page.locator("//a[contains(@daa-ll, 'Lidmaatschappen en prijzen bek') and @class='feds-cta feds-cta--primary']");
        this.photoshopBeNl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Photoshop')])[1]");
        this.AdobeStockBeNl = page.locator("//a[contains(@daa-ll, 'Adobe Stock')]//descendant::div[@class='feds-navLink-content']");
        this.photoBeNl = page.locator("(//a[contains(@daa-ll, 'Foto') and @class='feds-navLink'])[2]");
        this.pdfBeNl = page.locator("(//a[contains(@daa-ll, 'PDF') and @class='feds-navLink'])[1]");
        this.overviewOfAICCBeNl = page.locator("(//a[contains(@daa-ll, 'Overzicht van AI') and @class='feds-navLink'])[1]");
        this.adobeFireflyBeNl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //CIS-English
        this.creativeCloudPlansAndPricingCISEn = page.locator("//a[contains(@daa-ll,'Creative Cloud Plans and Prici')]");
        this.specialOffersCISEn = page.locator("//a[contains(@daa-ll,'Special Offers')]");

        //CIS-Russian
        this.creativeCloudPlansAndPricingCISRu = page.locator("//a[contains(@daa-ll,'Планы и цены Creative Cloud')]");
        this.specialOffersCISRu = page.locator("//a[contains(@daa-ll,'Специальные предложения')]");

        //Danmark
        this.whatIsCCDk = page.locator("//a[contains(@daa-ll, 'Hvad er Creative Cloud')]");
        this.photographersDk = page.locator("(//a[contains(@daa-ll, 'Fotografer')])[1]");
        this.seeSubscriptionsAndPricesDk = page.locator("//a[contains(@daa-ll, 'Se abonnementer og priser')]//ancestor::div[@class='feds-cta-wrapper']");
        this.photoshopDk = page.locator("//div[@daa-lh='Omfattede produkter']//descendant::a[contains(@daa-ll, 'Photoshop')]");
        this.AdobeStockDk = page.locator("//div[@daa-lh='Omfattede produkter']//descendant::a[contains(@daa-ll, 'Adobe Stock')]");
        this.photoDk = page.locator("//div[@daa-lh='Udforsk']//descendant::a[contains(@daa-ll, 'Foto')]");
        this.pdfDk = page.locator("//div[@daa-lh='Udforsk']//descendant::a[contains(@daa-ll, 'PDF')]");
        this.aiOverviewCCDk = page.locator("//div[@daa-lh='Udforsk']//descendant::a[contains(@daa-ll, 'AI oversigt')]");
        this.adobeFireflyDk = page.locator("//div[@daa-lh='Udforsk']//descendant::a[contains(@daa-ll, 'Adobe Firefly')]");

        //Eesti
        this.whatIsCCEe = page.locator("//a[contains(@daa-ll, 'Mis on Creative Cloud')]");
        this.forPhotographersEe = page.locator("//a[contains(@daa-ll, 'Fotograafidele')]");
        this.viewPackagesAndPricesEe = page.locator("//div[@class='feds-cta-wrapper']//descendant::a[contains(@daa-ll, 'Kuva paketid ja hinnad')]");
        this.photoshopEe = page.locator("//div[@daa-lh='Esiletõstetud tooted']//descendant::a[contains(@daa-ll, 'Photoshop')]");
        this.AdobeStockEe = page.locator("//div[@daa-lh='Esiletõstetud tooted']//descendant::a[contains(@daa-ll, 'Adobe Stock')]");
        this.photoEe = page.locator("//div[@daa-lh='Uurige lähemalt']//descendant::a[contains(@daa-ll, 'Foto')]");
        this.pdfEe = page.locator("//div[@daa-lh='Uurige lähemalt']//descendant::a[contains(@daa-ll, 'PDF')]");
        this.anOverviewOfArtificialIntelligenceEe = page.locator("//div[@daa-lh='Uued versioonid']//descendant::a[contains(@daa-ll, 'Tehisintellekti ülevaade')]");
        this.adobeFireflyEe = page.locator("//div[@daa-lh='Uued versioonid']//descendant::a[contains(@daa-ll, 'Adobe Firefly')]");

        //Egypt-English
        this.whatIsCCEgEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.schoolsAndUniversitiesEgEn = page.locator("//a[contains(@daa-ll,'Schools and universities')]//div[@class='feds-navLink-content']");
        this.viewPlansAndPricesEgEn = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'View plans and pricing')]");
        this.photoshopEgEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockEgEn = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoEgEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.pdfEgEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'PDF')]");
        this.AIOverviewCCEgEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.adobeFireflyEgEn = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Espana
        this.discoverAllApplicationsEs = page.locator("//a[contains(@daa-ll,'Descubre Todas las Aplicacione')]");
        this.adobeStockEs = page.locator("//a[contains(@daa-ll,'Adobe Stock')]/descendant::div[@class='feds-navLink-content']");
        this.seeAllProductsEs = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Ver todos los productos')]");
        this.individualsEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Particulares')]");
        this.seePlansAndPricesEs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Ver planes y precios')])[1]");
        this.photographyEs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Fotografía')])[1]");
        this.pdfEs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.AIOverviewCCEs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[1]");
        this.adobeFireflyEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Greece-English
        this.whatIsCCGrEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.schoolsAndUniversitiesGrEn = page.locator("//a[contains(@daa-ll,'Schools and universities')]//div[@class='feds-navLink-content']");
        this.viewPlansAndPricesGrEn = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'View plans and pricing')]");
        this.photoshopGrEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockGrEn = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoGrEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.pdfGrEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'PDF')]");
        this.AIOverviewCCGrEn = page.locator("(//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'AI Overview')])");
        this.adobeFireflyGrEn = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Greece
        this.whatIsCCGrEl = page.locator("//a[contains(@daa-ll,'Τι είναι το Creative Cloud')]");
        this.schoolsAndUniversitiesGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Σχολεία και πανεπιστήμια')])[1]");
        this.viewProgramsAndPricesGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Προβολή προγραμμάτων και τιμών')])[1]");
        this.photoshopGrEl = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockGrEl = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//descendant::div[@class='feds-navLink-content']");
        this.photoGrEl = page.locator("(//a[contains(@daa-ll,'Φωτογραφία')])[1]");
        this.pdfGrEl = page.locator("(//a[contains(@daa-ll,'PDF')])[1]");
        this.AIOverviewCCGrEl = page.locator("(//a[contains(@daa-ll,'Επισκόπηση ΑΙ')])[1]");
        this.adobeFireflyGrEl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Ireland
        this.whatIsCCIe = page.locator("//a[contains(@daa-ll, 'What is Creative Cloud')]");
        this.schoolsAndUniversitiesIe = page.locator("(//a[contains(@daa-ll, 'Schools and universities')])[1]");
        this.viewPlansAndPricingIe = page.locator("(//a[contains(@daa-ll, 'View plans and pricing')])[1]");
        this.photoshopIe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Photoshop')])[1]");
        this.AdobeStockIe = page.locator("//a[contains(@daa-ll, 'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoIe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Photo')])[2]");
        this.pdfIe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'PDF')])[1]");
        this.AIOverviewCCIe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'AI Overview')])[1]");
        this.adobeFireflyIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Israel-English
        this.whatIsCCIlEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.schoolsAndUniversitiesIlEn = page.locator("//a[contains(@daa-ll,'Schools and universities')]//div[@class='feds-navLink-content']");
        this.viewPlansAndPricesIlEn = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'View plans and pricing')]");
        this.photoshopIlEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockIlEn = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//div[@class='feds-navLink-content']");
        this.photoIlEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.pdfIlEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'PDF')]");
        this.AIOverviewCCIlEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.adobeFireflyIlEn = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Kuwait-English
        this.whatIsCCKwEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.schoolsAndUniversitiesKwEn = page.locator("//a[contains(@daa-ll,'Schools and universities')]//div[@class='feds-navLink-content']");
        this.viewPlansAndPricesKwEn = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'View plans and pricing')]");
        this.photoshopKwEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockKwEn = page.locator("//a[contains(@daa-ll,'Adobe Stock')]//descendant::div[@class='feds-navLink-content']");
        this.photoKwEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.pdfKwEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'PDF')]");
        this.AIOverviewCCKwEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.adobeFireflyKwEn = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Latvija
        this.whatIsCCLv = page.locator("//a[contains(@daa-ll,'Kas ir Creative Cloud')]");
        this.forSchoolsAndUniversitiesLv = page.locator("(//a[contains(@daa-ll,'Skolām un universitātēm')])[1]");
        this.viewPlansAndPricesLv = page.locator("(//a[contains(@daa-ll,'Skatīt plānus un cenas')])[1]");
        this.photoshopLv = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.AdobeStockLv = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Stock')])[1]");
        this.photoLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Fotoattēli')]");
        this.pdfLv = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF')])[1]");
        this.miOverviewCCLv = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'MI pārskats')])[1]");
        this.adobeFireflyLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Lietuva
        this.whatIsCCLt = page.locator("//a[contains(@daa-ll,'Kas yra Creative Cloud')]");
        this.photoshopLt = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.picturesLt = page.locator("//a[contains(@daa-ll,'Nuotraukos')]");
        this.aiOverviewCCLt = page.locator("(//a[contains(@daa-ll,'DI apžvalga')])[1]");

        //Luxemberg-Deutsch
        this.whatIsCCLuDe = page.locator("//a[contains(@daa-ll,'Was ist Creative Cloud')]");
        this.photoshopLuDe = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.picturesLuDe = page.locator("//a[contains(@daa-ll,'Fotografie')]");
        this.aiOverviewCCLuDe = page.locator("(//a[contains(@daa-ll,'KI Überblick')])[1]");

        //Luxemberg-English
        this.whatIsCCLuEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoLuEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.picturesLuEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCLuEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");

        //Luxemberg-French
        this.whatIsCCLuFr = page.locator("//a[contains(@daa-ll,'Qu est ce que Creative Cloud')]");
        this.photoshopLuFr = page.locator("//div[@daa-lh='Produits à l honneur']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photographyLuFr = page.locator("//div[@daa-lh='Explorer']//descendant::a[contains(@daa-ll,'Photographie')]");
        this.aiProgramOverviewCCLuFr = page.locator("//div[@daa-lh='Nouvelles versions']//descendant::a[contains(@daa-ll,'Présentation du programme d IA')]");

        //Hungary
        this.introducingCreativeCloudHu = page.locator("//a[contains(@daa-ll,'A Creative Cloud bemutatása')]");
        this.photoshopHu = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographyHu = page.locator("//a[contains(@daa-ll,'Fotózás')]");
        this.introductionToaiIntelligenceHu = page.locator("(//a[contains(@daa-ll,'A mesterséges intelligencia be')])[1]");

        //Middle East and North Africa-English
        this.whatIsCCMenaEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopMenaEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoMenaEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCMenaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[1]");

        //Nigeria
        this.homeUsersAndFreelancersNg = page.locator("//a[contains(@daa-ll,'Home users and freelancers')]");
        this.photoshopNg = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoNg = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photo')])[1]");
        this.aiOverviewCCNg = page.locator("(//a[contains(@daa-ll,'AI Overview')])[1]");

        //Nederlands
        this.whatIsCCNl = page.locator("//a[contains(@daa-ll,'Wat is Creative Cloud')]");
        this.photoshopNl = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoNl = page.locator("(//a[contains(@daa-ll,'Foto')])[2]");
        this.overviewOfAiCCNl = page.locator("(//a[contains(@daa-ll,'Overzicht van AI')])[1]");

        //Norway
        this.whatIsCCNo = page.locator("//a[contains(@daa-ll,'Hva er Creative Cloud')]");
        this.photoshopNo = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoNo = page.locator("(//a[contains(@daa-ll,'Foto')])[2]");
        this.overviewOfAiCCNo = page.locator("(//a[contains(@daa-ll,'AI oversikt')])[1]");

        //Poland
        this.homeUsersAndFreelancersPl = page.locator("//a[contains(@daa-ll,'Użytkownicy domowi i freelance')]");
        this.photoshopPl = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographyPl = page.locator("(//a[contains(@daa-ll,'Fotografia')])[1]");
        this.artificialIntelligenceAnOverviewPl = page.locator("(//a[contains(@daa-ll,'Sztuczna inteligencja przegląd')])[1]");

        //Portugal
        this.whatIsCreativeCloudPt = page.locator("//a[contains(@daa-ll,'O que é a Creative Cloud')]");
        this.photoshopPt = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographyPt = page.locator("(//a[contains(@daa-ll,'Foto')])[1]");
        this.aiOverviewCCPt = page.locator("(//a[contains(@daa-ll,'Visão geral da IA')])[1]");

        //Qatar-English
        this.whatIsCCQaEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopQaEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoQaEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCQaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[1]");

        //Romania
        this.whatIsCCRo = page.locator("//a[contains(@daa-ll,'Ce este Creative Cloud')]");
        this.photoshopRo = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoRo = page.locator("(//a[contains(@daa-ll,'Foto')])[2]");
        this.artificialIntelligenceOverviewRo = page.locator("(//a[contains(@daa-ll,'Prezentare generală inteligenț')])[1]");

        //Saudi Arabia - English
        this.whatIsCCSaEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopSaEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoSaEn = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCSaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[1]");

        //Schweiz
        this.whatIsCCChDe = page.locator("//a[contains(@daa-ll,'Was ist Creative Cloud')]");
        this.photoshopChDe = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographyChDe = page.locator("//a[contains(@daa-ll,'Fotografie')]");
        this.aiOverviewCCChDe = page.locator("(//a[contains(@daa-ll,'KI Überblick')])[1]");

        //Slovenija
        this.whatIsCCSi = page.locator("//a[contains(@daa-ll,'Kaj je Creative Cloud')]");
        this.photoshopSi = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoSi = page.locator("(//a[contains(@daa-ll,'Fotografija')])[1]");
        this.anOverviewOfArtificialIntelligenceSi = page.locator("(//a[contains(@daa-ll,'Pregled umetne inteligence')])[1]");

        //Slovensko
        this.whatIsCCSk = page.locator("//a[contains(@daa-ll,'Čo je Creative Cloud')]");
        this.photoshopSk = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographySk = page.locator("(//a[contains(@daa-ll,'Fotografia')])[1]");
        this.anOverviewOfArtificialIntelligenceCcSk = page.locator("(//a[contains(@daa-ll,'Prehľad umelej inteligencie')])[1]");

        //South Africa
        this.homeUsersAndFreelancersZa = page.locator("//a[contains(@daa-ll,'Home users and freelancers')]");
        this.photoshopZa = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoZa = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Photo')])[1]");
        this.aiOverviewCcZa = page.locator("(//a[contains(@daa-ll,'AI Overview')])[1]");

        //Swiss
        this.whatIsCCChFr = page.locator("//a[contains(@daa-ll,'Qu est ce que Creative Cloud')]");
        this.photoshopChFr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographyChFr = page.locator("(//a[contains(@daa-ll,'Photographie')])[2]");
        this.adobeFireflyChFr = page.locator("//a[contains(@daa-ll,'Adobe Firefly')]");

        //Suomi
        this.whatIsCCFi = page.locator("//a[contains(@daa-ll,'Mikä on Creative Cloud')]");
        this.photoshopFi = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographsFi = page.locator("//a[contains(@daa-ll,'Valokuvat')]");
        this.aiOverviewCCFi = page.locator("(//a[contains(@daa-ll,'AI yleiskuvaus')])[1]");

        //Sverige
        this.whatIsCCSe = page.locator("//a[contains(@daa-ll,'Vad är Creative Cloud')]");
        this.photoshopSe = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoSe = page.locator("(//a[contains(@daa-ll,'Foto')])[2]");
        this.aiOverviewCCSe = page.locator("(//a[contains(@daa-ll,'AI översikt')])[1]");

        //Svizzera
        this.whatIsCCChIt = page.locator("//a[contains(@daa-ll,'Cos è Creative Cloud')]");
        this.photoshopChIt = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoChIt = page.locator("(//a[contains(@daa-ll,'Foto')])[2]");
        this.aiOverviewCCChIt = page.locator("(//a[contains(@daa-ll,'Panoramica IA')])[1]");

        //Turkey
        this.whatIsCCTr = page.locator("//a[contains(@daa-ll,'Creative Cloud nedir')]");
        this.photoshopTr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographTr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Fotoğraf')])[2]");
        this.artificialIntelligenceOverviewTr = page.locator("(//a[contains(@daa-ll,'Yapay Zekaya Genel Bakış')])[1]");

        //United Arab Emirates - English
        this.whatIsCCAeEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopAeEn = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoAeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Photo')])[3]");
        this.aiOverviewCCAeEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[1]");

        //United Kingdom
        this.whatIsCCUk = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.individualsUk = page.locator("//a[contains(@daa-ll,'Individuals')]");
        this.photoUk = page.locator("//div[@daa-lh='Explore']/descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCUk = page.locator("(//a[contains(@daa-ll,'AI Overview')])[1]");

        //Austria
        this.whatIsCCAt = page.locator("//a[contains(@daa-ll,'Was ist Creative Cloud')]");
        this.photoshopAt = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photographyAt = page.locator("//a[contains(@daa-ll,'Fotografie')]");
        this.aiOverviewCCAt = page.locator("(//a[contains(@daa-ll,'KI Überblick')])[1]");

        //Czech Republic
        this.whatIsCCCz = page.locator("//a[contains(@daa-ll,'Co je služba Creative Cloud')]");
        this.photoshopCz = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photoCz = page.locator("//a[contains(@daa-ll,'Fotografie')]");
        this.anOverviewOfArtificialIntelligenceCCCz = page.locator("(//a[contains(@daa-ll,'Přehled o umělé inteligenci')])[1]");

        //Bulgaria
        this.whatIsCCBg = page.locator("//a[contains(@daa-ll,'Какво представлява Creative Cl')]");
        this.photoshopBg = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.picturesBg = page.locator("//a[contains(@daa-ll,'Снимки')]");
        this.aiOverviewCCBg = page.locator("(//a[contains(@daa-ll,'Общ преглед на ИИ')])[1]");

        //Russia
        this.whatIsCCRu = page.locator("//a[contains(@daa-ll,'Что такое Creative Cloud')]");
        this.photoshopRu = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photosRu = page.locator("//a[contains(@daa-ll,'Фотографии')]");
        this.aiReviewCCRu = page.locator("(//a[contains(@daa-ll,'Обзор ИИ')])[1]");

        //Ukraine
        this.homeUsersAndFreelancersUa = page.locator("//a[contains(@daa-ll,'Домашні користувачі та фріланс')]");
        this.photoshopUa = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.photosUa = page.locator("(//a[contains(@daa-ll,'Фото')])[2]");
        this.overviewOfAiCCUa = page.locator("(//a[contains(@daa-ll,'Огляд ШІ')])[1]");

        //Israel Hebrew
        this.whatIsCcIlHe = page.locator("//a[contains(@daa-ll,'מהו Creative Cloud')]");
        this.photoshopIlHe = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.ImageIlHe = page.locator("//a[contains(@daa-ll,'תמונה')]");
        this.theArtificialIntelligenceReviewCcIlHe = page.locator("(//a[contains(@daa-ll,'סקירת הבינה המלאכותית')])[1]");

        //United Arab Emirates
        this.whatIsCCAeAr = page.locator("//a[contains(@daa-ll,'ما المقصود بـ Creative Cloud')]");
        this.photoshopAeAr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.thePicturesAeAr = page.locator("//a[contains(@daa-ll,'الصور')]");
        this.aboutArtificialIntelligenceCCAeAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[1]");

        //Middle East And North Africa
        this.whatIsCCMenaAr = page.locator("//a[contains(@daa-ll,'ما المقصود بـ Creative Cloud')]");
        this.photoshopMenaAr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.thePictureMenaAr = page.locator("//a[contains(@daa-ll,'صورة')]");
        this.aboutArtificialIntelligenceCCMenaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[1]");

        //Saudi Arabia
        this.whatIsCCSaAr = page.locator("//a[contains(@daa-ll,'ما المقصود بـ Creative Cloud')]");
        this.photoshopSaAr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.pictureSaAr = page.locator("//a[contains(@daa-ll,'صورة')]");
        this.aboutArtificialIntelligenceCCSaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[1]");

        //Egypt
        this.whatIsCCEgAr = page.locator("//a[contains(@daa-ll,'ما المقصود بـ Creative Cloud')]");
        this.photoshopEgAr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.pictureEgAr = page.locator("//a[contains(@daa-ll,'صورة')]");
        this.aboutArtificialIntelligenceCCEgAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[1]");

        //Kuwait
        this.whatIsCCKwAr = page.locator("//a[contains(@daa-ll,'ما المقصود بـ Creative Cloud')]");
        this.photoshopKwAr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.pictureKwAr = page.locator("//a[contains(@daa-ll,'صورة')]");
        this.aboutArtificialIntelligenceCCKwAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[1]");

        //Qatar
        this.whatIsCCQaAr = page.locator("//a[contains(@daa-ll,'ما المقصود بـ Creative Cloud')]");
        this.photoshopQaAr = page.locator("(//a[contains(@daa-ll,'Photoshop')]/descendant::div[@class='feds-navLink-content'])[1]");
        this.pictureQaAr = page.locator("//a[contains(@daa-ll,'صورة')]");
        this.aboutArtificialIntelligenceCCQaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[1]");

        //Australia
        this.whatIsCCAu = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopAu = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoAu = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCAu = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");

        //Hong Kong
        this.whatIsCCHkEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopHkEn = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoHkEn = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCHkEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");

        //India
        this.removeBackgroundIn = page.locator("//div[@daa-lh='Quick Actions']//descendant::a[contains(@daa-ll,'Remove Background')]");
        this.resumeIn = page.locator("//div[@daa-lh='Create New']//descendant::a[contains(@daa-ll,'Resume')]");
        this.creativeCloudIn = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.adobeFireflyIn = page.locator("//div[@daa-lh='New Releases']//descendant::a[contains(@daa-ll,'Adobe Firefly')]");

        //Indonesia
        this.whatIsCCIdId = page.locator("//a[contains(@daa-ll,'Apa itu Creative Cloud')]");
        this.photoshopIdId = page.locator("//div[@daa-lh='Produk unggulan']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoIdId = page.locator("//div[@daa-lh='Jelajahi']//descendant::a[contains(@daa-ll,'Foto')]");
        this.ikhtisarAiCCIdId = page.locator("(//div[@daa-lh='Kecerdasan Buatan']//descendant::a[contains(@daa-ll,'Ikhtisar AI')])[1]");

        //Indonesia - English
        this.whatIsCCIdEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopIdEn = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoIdEn = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCIdEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[1]");

        //Malaysia
        this.whatIsCCMyMs = page.locator("//a[contains(@daa-ll,'Apakah itu Creative Cloud')]");
        this.photoshopMyMs = page.locator("//div[@daa-lh='Produk pilihan']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoMyMs = page.locator("//div[@daa-lh='Terokai']//descendant::a[contains(@daa-ll,'Foto')]");
        this.aiOverviewCCMyMs = page.locator("(//a[contains(@daa-ll,'Gambaran keseluruhan AI')]//descendant::div[@class='feds-navLink-content'])[1]");

        //Malaysia - English
        this.whatIsCCMyEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopMyEn = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoMyEn = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCMyEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[1]");

        //New Zealand
        this.whatIsCCNz = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopNz = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoNz = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCNz = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[1]");

        //Philippines - English 
        this.whatIsCCPhEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopPhEn = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoPhEn = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCPhEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[1]");

        //Philippines
        this.whatIsCCPhFil = page.locator("//a[contains(@daa-ll,'Ano ang Creative Cloud')]");
        this.photoshopPhFil = page.locator("//div[@daa-lh='Mga na feature na produkto']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.picturePhFil = page.locator("//div[@daa-lh='Mag explore']//descendant::a[contains(@daa-ll,'Larawan')]");
        this.aiOverviewCCPhFil = page.locator("//a[contains(@daa-ll,'Pangkalahatang ideya ng AI-8')]//descendant::div[@class='feds-navLink-content']");

        //Singapore 
        this.whatIsCCSg = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopSg = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoSg = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCSg = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[1]");

        //Thailand - English 
        this.whatIsCCThEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopThEn = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoThEn = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCThEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[1]");

        //Vietnam - English 
        this.whatIsCCVnEn = page.locator("//a[contains(@daa-ll,'What is Creative Cloud')]");
        this.photoshopVnEn = page.locator("//div[@daa-lh='Featured products']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoVnEn = page.locator("//div[@daa-lh='Explore']//descendant::a[contains(@daa-ll,'Photo')]");
        this.aiOverviewCCVnEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[1]");

        //Vietnam
        this.whatIsCCVnVi = page.locator("//a[contains(@daa-ll,'Creative Cloud là gì')]");
        this.photoshopVnVi = page.locator("//div[@daa-lh='Sản phẩm nổi bật']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.imageVnVi = page.locator("//div[@daa-lh='Khám phá']//descendant::a[contains(@daa-ll,'Ảnh')]");
        this.aiOverviewCCVnVi = page.locator("(//a[contains(@daa-ll,'Tổng quan về AI')])[1]");

        //India - Hindi
        this.whatIsCCInHi = page.locator("//a[contains(@daa-ll,'Creative Cloud क्या है')]");
        this.photoshopInHi = page.locator("//div[@daa-lh='चुनिंदा उत्पाद']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoInHi = page.locator("//div[@daa-lh='एक्स्प्लोर करें']//descendant::a[contains(@daa-ll,'फ़ोटो')]");
        this.aiOverviewCCInHi = page.locator("(//a[contains(@daa-ll,'AI ओवरव्यू')])[1]");

        //Thailand 
        this.whatIsCCThTh = page.locator("//a[contains(@daa-ll,'Creative Cloud คืออะไร')]");
        this.photoshopThTh = page.locator("//div[@daa-lh='ผลิตภัณฑ์ที่โดดเด่น']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoThTh = page.locator("//div[@daa-lh='สำรวจ']//descendant::a[contains(@daa-ll,'ภาพถ่าย')]");
        this.aiOverviewCCThTh = page.locator("(//a[contains(@daa-ll,'ภาพรวม AI')])[1]");

        //Hong Kong
        this.whatIsCCHkZh = page.locator("//a[contains(@daa-ll,'什麼是 Creative Cloud')]");
        this.photoshopHkZh = page.locator("//div[@daa-lh='主要產品']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoHkZh = page.locator("//div[@daa-lh='探索']//descendant::a[contains(@daa-ll,'相片')]");
        this.aiOverviewCCHkZh = page.locator("(//a[contains(@daa-ll,'AI 概觀')])[1]");

        //Taiwan
        this.whatIsCCTw = page.locator("//a[contains(@daa-ll,'什麼是 Creative Cloud')]");
        this.photoshopTw = page.locator("//div[@daa-lh='主要產品']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.photoTw = page.locator("//div[@daa-lh='探索']//descendant::a[contains(@daa-ll,'相片')]");
        this.aiOverviewCCTw = page.locator("(//a[contains(@daa-ll,'AI 概觀')])[1]");

        //Korea
        this.introductionToCCKr = page.locator("//a[contains(@daa-ll,'Creative Cloud 소개')]");
        this.photoshopKr = page.locator("//div[@daa-lh='주요 제품']//descendant::a[contains(@daa-ll,'Photoshop')]");
        this.pictureKr = page.locator("//div[@daa-lh='살펴보기']//descendant::a[contains(@daa-ll,'사진')]");
        this.aiOverviewCCKr = page.locator("(//a[contains(@daa-ll,'AI 개요')])[1]");

        // 2) Document Cloud Elements (PDF & E-Signatures)
        //Argentina
        this.adobeAcrobat = page.locator("(//div[@class='feds-menu-items']//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricing = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReader = page.locator("//div[@class='feds-menu-items']//a[contains(@daa-ll,'Acrobat Reader')]");
        this.companies = page.locator("//div[@daa-lh='Comprar para']//descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonal = page.locator("//div[@daa-lh='Comprar para']//descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.AIOverviewDC = page.locator("(//div[@daa-lh='Inteligencia artificial']//descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.AIinAcrobat = page.locator("//div[@daa-lh='Inteligencia artificial']//descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.pdfToWord = page.locator("//div[@daa-lh='Herramientas online']//descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.wordToPDF = page.locator("//div[@daa-lh='Herramientas online']//descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.developerResources = page.locator("//div[@daa-lh='Recursos']//descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.eventsAndWebinars = page.locator("//div[@daa-lh='Recursos']//descendant::a[contains(@daa-ll,'Eventos y seminarios web')]");

        //United States
        this.adobeAcrobatUS = page.locator("(//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingUS = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderUS = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.businessUS = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.governmentUS = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Government')]");
        this.AIOverviewDCUS = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.AIinAcrobatUS = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordUS = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.wordToPDFUS = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'Word to PDF')]");
        this.developerResourcesUS = page.locator("//div[@daa-lh='Business Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.eventsAndWebinarsUS = page.locator("//div[@daa-lh='Business Resources']/descendant::a[contains(@daa-ll,'Events Webinars')]");

        //France
        this.adobeAcrobatFr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.seeAllProductsFr = page.locator("//div[@daa-lh='Nos applications PDF']/descendant::a[contains(@daa-ll,'Voir tous les produits')]");
        this.SMEsAndLargeCompaniesFr = page.locator("//div[@daa-lh='Nos solutions pour']/descendant::a[contains(@daa-ll,'PME et grandes entreprises')]");
        this.IndividualsAndFrelancersFr = page.locator("//div[@daa-lh='Nos solutions pour']/descendant::a[contains(@daa-ll,'Particuliers et freelances')]");
        this.AIProgramOverviewDCFr = page.locator("(//div[@daa-lh='Intelligence artificielle']/descendant::a[contains(@daa-ll,'Présentation du programme d IA')])[1]");
        this.AIinAcrobatFr = page.locator("//div[@daa-lh='Intelligence artificielle']/descendant::a[contains(@daa-ll,'L IA dans Acrobat')]");
        this.pdfToWordFr = page.locator("//div[@daa-lh='Outils en ligne']/descendant::a[contains(@daa-ll,'PDF en Word')]");
        this.seeAllToolsFr = page.locator("//div[@daa-lh='Outils en ligne']/descendant::a[contains(@daa-ll,'Voir tous les outils')]");
        this.developerResourcesFr = page.locator("//div[@daa-lh='Ressources pour les entreprise']/descendant::a[contains(@daa-ll,'Ressources pour les développeu')]");
        this.articlesAndReportsFr = page.locator("//div[@daa-lh='Ressources pour les entreprise']/descendant::a[contains(@daa-ll,'Articles et rapports')]");

        //Germany
        this.adobeAcrobatGr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.offerAndPricesGr = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Angebot und Preise')]");
        this.pursueGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Unternehmen')])[1]");
        this.authoritiesGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Behörden')]");
        this.AIOverviewDCGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'KI Überblick')])[2]");
        this.AIinAcrobatGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'KI in Acrobat')]");
        this.pdfToWordGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF in Word')]");
        this.viewAllOnlineToolsGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Alle Onlinetools anzeigen')]");
        this.resourcesForDevelopmentGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Ressourcen für die Entwicklung')]");
        this.articlesAndReportsGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artikel und Reports')]");

        //Japan
        this.adobeAcrobatJp = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobatのプランと価格')]");
        this.seeAllProductsJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'すべての製品を見る')])[2]");
        this.forCorporationsJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'法人向け')])[2]");
        this.personalVersionJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'個人版')]");
        this.AIOverViewJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AIの概要')])[2]");
        this.acrobatAIJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AcrobatのAI')]");
        this.convertPDFtoWordJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'PDFをWordに変換')]");
        this.showAllToolsJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'すべてのツールを表示')]");
        this.developerResourcesJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'デベロッパー向けリソース')]");
        this.articlesAndReportsJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'記事とレポート')]");
        this.clickHereForConsultationDCJp = page.locator("//div[@daa-lh='法人向けお問い合わせ']//descendant::a[contains(@daa-ll, '0120 693 724')]");

        //Italy
        this.adobeAcrobatIt = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Piani e prezzi Acrobat')]");
        this.companiesIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aziende')])[2]");
        this.homeAndPersonalUseIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Uso domestico e personale')]");
        this.aiOverviewIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Panoramica IA')])[2]");
        this.aiInAcrobatIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'IA in Acrobat')]");
        this.fromPdfToWordIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Da PDF a Word')]");
        this.viewAllToolsIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Visualizza tutti gli strumenti')]");
        this.developerResourcesIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Risorse per sviluppatori')]");
        this.articlesAndReportsIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Articoli e report')]");

        //Brazil
        this.adobeAcrobatBr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Planos e preços do Acrobat')]");
        this.adobeReaderBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.companiesDcBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Empresas')])[2]");
        this.governmentAgenciesDcBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Órgãos governamentais')]");
        this.aiOverviewDCBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Visão geral da IA')])[2]");
        this.aiInAcrobatDcBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'IA no Acrobat')]");
        this.pdfToWordBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'PDF em Word')]");
        this.seeAllToolsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Veja todas as ferramentas')]");
        this.resourcesForDevelopersBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Recursos para desenvolvedores')]");
        this.articlesAndReportsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Artigos e relatórios')]");

        //Canada English
        this.adobeAcrobatCa = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.BusinessCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Business')])[2]");
        this.governmentCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Government')]");
        this.aiOverviewDCCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.aiInAcrobatCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.viewAllToolsCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all tools')]");
        this.developerResourcesCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.articlesAndReportsCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Articles Reports')]");

        //Canada French
        this.adobeAcrobatCaFr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Formules et tarifs Acrobat')]");
        this.acrobatReaderCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.BusinessCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Entreprises')]");
        this.administrationCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Administration')]");
        this.aiProgramOverviewDCCaFr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Présentation du programme d IA')])[2]");
        this.aiInAcrobatCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'L IA dans Acrobat')]");
        this.pdfToWordCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF en Word')]");
        this.seeAllToolsCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Voir tous les outils')]");
        this.resourcesForDevelopmentSpecialistsCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Ressources pour les spécialist')]");
        this.articlesAndReportsCaFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Articles et rapports')]");

        //Chile
        this.adobeAcrobatCl = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingCl = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderCl = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')])[2]");
        this.homeAndPersonalUseCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCCl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsCl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Colombia
        this.adobeAcrobatCo = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingCo = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderCo = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalUseCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCCo = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsCo = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Costa Rica
        this.adobeAcrobatCr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingCr = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderCr = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCCr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsCr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Ecuador
        this.adobeAcrobatEc = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingEc = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderEc = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalUseEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCEc = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsEc = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Guatemala
        this.adobeAcrobatGt = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingGt = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderGt = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalUseGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCGt = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsGt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Latin-America
        this.adobeAcrobatLa = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingLa = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderLa = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalUseLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCLa = page.locator("//a[@daa-ll='Resumen de la IA-1']//descendant::div[@class='feds-navLink-content']");
        this.aiInAcrobatLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsLa = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Mexico
        this.adobeAcrobatMx = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatReaderMx = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalUseMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCMx = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsMx = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Peru
        this.adobeAcrobatPe = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingPe = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderPe = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesPe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalUsePe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCPe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatPe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordPe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFPe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsPe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsPe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Puerto Rico
        this.adobeAcrobatPr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingPr = page.locator("//a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderPr = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.companiesPr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresas')]");
        this.homeAndPersonalUsePr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCPr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatPr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.fromPdfToWordPr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De PDF a Word')]");
        this.fromWordToPDFPr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'De Word a PDF')]");
        this.resourcesForDevelopmentTeamsPr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsPr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Africa-English
        this.adobeAcrobatAf = page.locator("(//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingAf = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderAf = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.businessAf = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.governmentAf = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Government')]");
        this.aiOverviewDCAf = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.aiInAcrobatAf = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.fromPdfToWordAf = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.fromWordToPDFAf = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'Word to PDF')]");
        this.developerResourcesAf = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.articlesAndReportsAf = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Articles Reports')]");

        //Belgique-French
        this.adobeAcrobatBeFr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingBeFr = page.locator("//a[contains(@daa-ll,'Formules et tarifs Acrobat')]");
        this.acrobatReaderBeFr = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.businessBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Entreprises')]");
        this.administrationBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Administration')]");
        this.aiProgrammingOverviewDCBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Présentation du programme d IA')]");
        this.aiInAcrobatBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'L IA dans Acrobat')]");
        this.pdfToWordBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF en Word')]");
        this.WordToPDFBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Word en PDF')]");
        this.resourcesForDevelopmentSpecialistsBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Ressources pour les spécialist')]");
        this.articlesAndReportsBeFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Articles et rapports')]");

        //Belgium-English
        this.adobeAcrobatBeEn = page.locator("(//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingBeEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderBeEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.businessBeEn = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.governmentBeEn = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Government')]");
        this.aiOverviewDCBeEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.aiInAcrobatBeEn = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordBeEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.WordToPDFBeEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'Word to PDF')]");
        this.developerResourcesBeEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.articlesAndReportsBeEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Articles Reports')]");

        //Belgie-Nederlands
        this.adobeAcrobatBeNl = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.membershipsAndPricingForAcrobatBeNl = page.locator("(//a[contains(@daa-ll,'Lidmaatschappen en prijzen voo')])[1]");
        this.acrobatReaderBeNl = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.businessBeNl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Bedrijven')]");
        this.governmentBeNl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Overheid')]");
        this.overviewOfAIDCBeNl = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Overzicht van AI')])[2]");
        this.aiInAcrobatBeNl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordBeNl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF naar Word')]");
        this.WordToPDFBeNl = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Word naar PDF')]");
        this.developerResourcesBeNl = page.locator("//a[contains(@daa-ll,'Resources voor ontwikkelaars')]");
        this.articlesAndReportsBeNl = page.locator("//a[contains(@daa-ll,'Artikelen en rapporten')]");

        //Danmark
        this.adobeAcrobatDk = page.locator("//div[@daa-lh='Produkter']//descendant::a[contains(@daa-ll, 'Adobe Acrobat-1')]");
        this.acrobatSubscriptionAndPricesDk = page.locator("//div[@daa-lh='Produkter']//descendant::a[contains(@daa-ll, 'Acrobat abonnementer og priser')]");
        this.acrobatReaderDk = page.locator("//div[@daa-lh='Produkter']//descendant::a[contains(@daa-ll, 'Adobe Acrobat Sign')]");
        this.professionDk = page.locator("//div[@daa-lh='Køb for']//descendant::a[contains(@daa-ll, 'Erhverv')]");
        this.publicAuthoritiesDk = page.locator("//div[@daa-lh='Køb for']//descendant::a[contains(@daa-ll, 'Offentlige myndigheder')]");
        this.aiOverviewDCDk = page.locator("//div[@daa-lh='Kunstig intelligens']//descendant::a[contains(@daa-ll, 'AI oversigt-5')]");
        this.aiInAcrobatDk = page.locator("//div[@daa-lh='Kunstig intelligens']//descendant::a[contains(@daa-ll, 'AI i Acrobat')]");
        this.pdfToWordDk = page.locator("//div[@daa-lh='Online værktøj']//descendant::a[contains(@daa-ll, 'PDF til Word')]");
        this.WordToPdfDk = page.locator("//div[@daa-lh='Online værktøj']//descendant::a[contains(@daa-ll, 'Word til PDF')]");
        this.developerResourcesDk = page.locator("//div[@daa-lh='Forretningsressourcer']//descendant::a[contains(@daa-ll, 'Udviklerressourcer')]");
        this.articlesAndReportsDk = page.locator("//div[@daa-lh='Forretningsressourcer']//descendant::a[contains(@daa-ll, 'Artikler og rapporter')]");

        //Eesti
        this.adobeAcrobatEe = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPackagesAndPricingEe = page.locator("//div[@daa-lh='Tooted']//descendant::a[contains(@daa-ll, 'Acrobati paketid ja hinnad')]");
        this.acrobatReaderEe = page.locator("//div[@daa-lh='Tooted']//descendant::a[contains(@daa-ll, 'Acrobat Reader')]");
        this.companyEe = page.locator("//div[@daa-lh='Ostke']//descendant::a[contains(@daa-ll, 'Ettevõte')]");
        this.homeAndPersonalEe = page.locator("//div[@daa-lh='Ostke']//descendant::a[contains(@daa-ll, 'Kodu ja isiklik')]");
        this.anOverviewOfArtificialIntelligenceDcEe = page.locator("(//div[@daa-lh='Tehisintellekt']//descendant::a[contains(@daa-ll, 'Tehisintellekti ülevaade')])[1]");
        this.artificialIntelligenceInAcrobatDcEe = page.locator("//div[@daa-lh='Tehisintellekt']//descendant::a[contains(@daa-ll, 'Tehisintellekt Acrobatis')]");
        this.pdfToWordFileEe = page.locator("//div[@daa-lh='Veebipõhised tööriistad']//descendant::a[contains(@daa-ll, 'PDF fail Wordi failiks')]");
        this.wordFilToPdfEe = page.locator("//div[@daa-lh='Veebipõhised tööriistad']//descendant::a[contains(@daa-ll, 'Wordi fail PDF failiks')]");
        this.resourcesForDevelopersEe = page.locator("//div[@daa-lh='Äriressursid']//descendant::a[contains(@daa-ll, 'Ressursid arendajatele')]");
        this.articlesAndReportsEe = page.locator("//div[@daa-lh='Äriressursid']//descendant::a[contains(@daa-ll, 'Artiklid ja aruanded')]");

        //Egypt-English
        this.adobeAcrobatEgEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingEgEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderEgEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.businessEgEn = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.governmentEgEn = page.locator("(//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Government')])[1]");
        this.AIOverviewDCEgEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.AIinAcrobatEgEn = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordEgEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.wordToPDFEgEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'Word to PDF')]");
        this.developerResourcesEgEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.eventsAndWebinarsEgEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Events Webinars')]");

        //Espana
        this.adobeAcrobatEs = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Planes y precios de Acrobat')]");
        this.acrobatReaderEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.companyEs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Empresa')])[2]");
        this.homeAndPersonalUseEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uso doméstico y personal')]");
        this.aiOverviewDCEs = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[2]");
        this.aiInAcrobatEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'IA en Acrobat')]");
        this.convertingFromPdfToWordEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Conversión de PDF a Word')]");
        this.convertingFromWordToPDFEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Conversión de Word a PDF')]");
        this.resourcesForDevelopmentTeamsEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Recursos para equipos de desar')]");
        this.articlesAndReportsEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Artículos e informes')]");

        //Greece-English
        this.adobeAcrobatGrEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingGrEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderGrEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.businessGrEn = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.governmentGrEn = page.locator("(//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Government')])[1]");
        this.aiOverviewDCGrEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.aiInAcrobatGrEn = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordGrEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.wordToPDFGrEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'Word to PDF')]");
        this.developerResourcesGrEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.eventsAndWebinarsGrEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Events Webinars')]");

        //Greece
        this.adobeAcrobatGrEl = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatProgramsAndPricingGrEl = page.locator("//a[contains(@daa-ll,'Προγράμματα και τιμές Acrobat')]");
        this.acrobatReaderGrEl = page.locator("(//a[contains(@daa-ll,'Acrobat Reader')])[1]");
        this.businessGrEl = page.locator("(//a[contains(@daa-ll,'Επιχειρήσεις')])[2]");
        this.homeAndPersonalUseGrEl = page.locator("//a[contains(@daa-ll,'Οικιακή και προσωπική χρήση')]");
        this.aiOverviewDCGrEl = page.locator("(//a[contains(@daa-ll,'Επισκόπηση ΑΙ')])[2]");
        this.aiInAcrobatGrEl = page.locator("//a[contains(@daa-ll,'AI στο Acrobat')]");
        this.pdfToWordGrEl = page.locator("//a[contains(@daa-ll,'PDF σε Word')]");
        this.wordToPDFGrEl = page.locator("//a[contains(@daa-ll,'Word σε PDF')]");
        this.developerResourcesGrEl = page.locator("//a[contains(@daa-ll,'Πόροι για προγραμματιστές')]");
        this.eventsAndWebinarsGrEl = page.locator("//a[contains(@daa-ll,'Εκδηλώσεις και διαδικτυακά σεμ')]");

        //Ireland
        this.adobeAcrobatIe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Acrobat plans and pricing')]");
        this.acrobatReaderIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Acrobat Reader')]");
        this.businessIe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Business')])[1]");
        this.homeAndPersonalIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Home Personal')]");
        this.aiOverviewDCIe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'AI Overview')])[2]");
        this.aiInAcrobatIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'AI in Acrobat')]");
        this.pdfToWordIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'PDF to Word')]");
        this.wordToPDFIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Word to PDF')]");
        this.developerResourcesIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Developer resources')]");
        this.articlesAndReportsIe = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll, 'Articles Reports')]");

        //Israel-English
        this.adobeAcrobatIlEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingIlEn = page.locator("//a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderIlEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.businessIlEn = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.governmentIlEn = page.locator("(//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Government')])[1]");
        this.AIOverviewDCIlEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.AIinAcrobatIlEn = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordIlEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.wordToPDFIlEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'Word to PDF')]");
        this.developerResourcesIlEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.eventsAndWebinarsIlEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Events Webinars')]");

        //Kuwait-English
        this.adobeAcrobatKwEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingKwEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat plans and pricing')]");
        this.acrobatReaderKwEn = page.locator("//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.businessKwEn = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.governmentKwEn = page.locator("(//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Government')])[1]");
        this.AIOverviewDCKwEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.AIinAcrobatKwEn = page.locator("//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI in Acrobat')]");
        this.pdfToWordKwEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.wordToPDFKwEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'Word to PDF')]");
        this.developerResourcesKwEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");
        this.eventsAndWebinarsKwEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Events Webinars')]");

        //Latvija
        this.adobeAcrobatLv = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.acrobatPlansAndPricingLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Acrobat plāni un cenas')]");
        this.acrobatReaderLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Acrobat Reader')]");
        this.forCompaniesLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Uzņēmumiem')]");
        this.forHomeAndPersonalUseLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Mājai un personīgai lietošanai')]");
        this.miOverviewDCLv = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'MI pārskats')])[2]");
        this.aiInAcrobatLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'MI lietotnē Acrobat')]");
        this.convertPdfFilesToWordFormatLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'PDF failu pārvēršana Word form')]");
        this.convertingWordFilesToPdfFormatLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Word failu pārvēršana PDF form')]");
        this.developerResourcesLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Izstrādātāju resursi')]");
        this.eventsAndWebinarsLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Pasākumi un tīmekļsemināri')]");

        //Lietuva
        this.adobeAcrobatLt = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.forCompaniesLt = page.locator("(//a[contains(@daa-ll,'Įmonėms')])[1]");
        this.aiOverviewDCLt = page.locator("(//a[contains(@daa-ll,'DI apžvalga')])[2]");
        this.pdfToWordLt = page.locator("//a[contains(@daa-ll,'Iš PDF į Word')]");
        this.developerResourcesLt = page.locator("//a[contains(@daa-ll,'Kūrėjų ištekliai')]");

        //Luxembourg-Deutsch
        this.adobeAcrobatLuDe = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessLuDe = page.locator("(//a[contains(@daa-ll,'Business')])[1]");
        this.aiOverviewDCLuDe = page.locator("(//a[contains(@daa-ll,'KI Überblick')])[2]");
        this.pdfToWordLuDe = page.locator("//a[contains(@daa-ll,'PDF in Word')]");
        this.resourcesForDevelopmentLuDe = page.locator("//a[contains(@daa-ll,'Ressourcen für die Entwicklung')]");

        //Luxembourg-English
        this.adobeAcrobatLuEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessLuEn = page.locator("//div[@daa-lh='Shop for']/descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCLuEn = page.locator("(//div[@daa-lh='Artificial Intelligence']/descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordLuEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.resourcesForDevelopmentLuEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");

        //Luxembourg-French
        this.adobeAcrobatLuFr = page.locator("(//div[@daa-lh='Produits']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessLuFr = page.locator("//div[@daa-lh='Boutique pour']//descendant::a[contains(@daa-ll,'Entreprises')]");
        this.aiProgramOverviewDCLuFr = page.locator("//div[@daa-lh='Intelligence artificielle']//descendant::a[contains(@daa-ll,'Présentation du programme d IA-1')]//div[@class='feds-navLink-content']");
        this.pdfToWordLuFr = page.locator("//div[@daa-lh='Outils en ligne']//descendant::a[contains(@daa-ll,'PDF en Word')]");
        this.resourcesForDevelopmentSpecialistsLuFr = page.locator("//div[@daa-lh='Ressources']//descendant::a[contains(@daa-ll,'Ressources pour les spécialist')]");

        //Hungary
        this.adobeAcrobatHu = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.forBusinessHu = page.locator("(//a[contains(@daa-ll,'Vállalkozásoknak')])[2]");
        this.introductionToArtificialIntelligenceDCHu = page.locator("(//a[contains(@daa-ll,'A mesterséges intelligencia be')])[2]");
        this.fromPdfToWordFileHu = page.locator("//a[contains(@daa-ll,'PDF ből Word fájl')]");
        this.developerResourcesHu = page.locator("//a[contains(@daa-ll,'Fejlesztői forrásanyagok')]");

        //Middle East and North Africa - English
        this.adobeAcrobatMenaEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessMenaEn = page.locator("(//a[contains(@daa-ll,'Business')])[2]");
        this.aiIntroductionMenaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordMenaEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesMenaEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");

        //Nigeria
        this.adobeAcrobatNg = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessNg = page.locator("(//a[contains(@daa-ll,'Business')])[2]");
        this.aiOverviewDCNg = page.locator("(//a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordNg = page.locator("//a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesNg = page.locator("//a[contains(@daa-ll,'Developer resources')]");

        //Nederlands
        this.adobeAcrobatNl = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessesNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Bedrijven')])[2]");
        this.overviewAiNl = page.locator("(//a[contains(@daa-ll,'Overzicht van AI')])[2]");
        this.pdfToWordNl = page.locator("//a[contains(@daa-ll,'PDF naar Word')]");
        this.developerResourcesNl = page.locator("//a[contains(@daa-ll,'Resources voor ontwikkelaars')]");

        //Norway
        this.adobeAcrobatNo = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesNo = page.locator("(//a[contains(@daa-ll,'Bedrifter')])[2]");
        this.aiOverviewNo = page.locator("(//a[contains(@daa-ll,'AI oversikt')])[2]");
        this.pdfToWordNo = page.locator("//a[contains(@daa-ll,'PDF til Word')]");
        this.developerResourcesNo = page.locator("//a[contains(@daa-ll,'Utviklerressurser')]");

        //Poland
        this.adobeAcrobatPl = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesPl = page.locator("(//a[contains(@daa-ll,'Firmy')])[2]");
        this.artificialIntelligenceAnOverviewDcPl = page.locator("(//a[contains(@daa-ll,'Sztuczna inteligencja przegląd')])[2]");
        this.pdfToWorConvensionPl = page.locator("//a[contains(@daa-ll,'Konwersja PDF Word')]");
        this.resourcesForDevelopersPl = page.locator("//a[contains(@daa-ll,'Zasoby dla programistów')]");

        //Portugal
        this.adobeAcrobatPt = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesPt = page.locator("(//a[contains(@daa-ll,'Empresas')])[2]");
        this.aiOverviewDcPt = page.locator("(//a[contains(@daa-ll,'Visão geral da IA')])[2]");
        this.pdfToWorPt = page.locator("//a[contains(@daa-ll,'PDF em Word')]");
        this.resourcesDevelopersPt = page.locator("//a[contains(@daa-ll,'Recursos do desenvolvedor')]");

        //Qatar - English
        this.adobeAcrobatQaEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessQaEn = page.locator("(//a[contains(@daa-ll,'Business')])[2]");
        this.aiOverviewQaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordQaEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesQaEn = page.locator("//div[@daa-lh='Business Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");

        //Romania
        this.adobeAcrobatRo = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesRo = page.locator("(//a[contains(@daa-ll,'Companii')])[1]");
        this.artificialIntelligenceOverviewDcRo = page.locator("(//a[contains(@daa-ll,'Prezentare generală inteligenț')])[2]");
        this.pdfToWordRo = page.locator("//a[contains(@daa-ll,'PDF în Word')]");
        this.developerResourcesRo = page.locator("//a[contains(@daa-ll,'Resurse pentru dezvoltatori')]");

        //Saudi Arabia - English
        this.adobeAcrobatSaEn = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessSaEn = page.locator("(//a[contains(@daa-ll,'Business')])[2]");
        this.aiOverviewSaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordSaEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesSaEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");

        //Schweiz
        this.adobeAcrobatChDe = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.pursueCheDe = page.locator("(//a[contains(@daa-ll,'Unternehmen')])[1]");
        this.aiOverviewDcChDe = page.locator("(//a[contains(@daa-ll,'KI Überblick')])[2]");
        this.pdfToWordChDe = page.locator("//a[contains(@daa-ll,'PDF in Word')]");
        this.resourcesForDevelopmentChDe = page.locator("//a[contains(@daa-ll,'Ressourcen für die Entwicklung')]");

        //Slovenija
        this.adobeAcrobatSi = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companySi = page.locator("(//a[contains(@daa-ll,'Podjetje')])[2]");
        this.anOverviewOfArtificialIntelligenceDcSi = page.locator("(//a[contains(@daa-ll,'Pregled umetne inteligence')])[2]");
        this.fromPdfToWordSi = page.locator("//a[contains(@daa-ll,'Iz PDF v Word')]");
        this.developerResourcesSi = page.locator("//a[contains(@daa-ll,'Viri za razvijalce')]");

        //Slovensko
        this.adobeAcrobatSk = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companySk = page.locator("(//a[contains(@daa-ll,'Firmy')])[1]");
        this.anOverviewOfArtificialIntelligenceDcSk = page.locator("(//a[contains(@daa-ll,'Prehľad umelej inteligencie')])[2]");
        this.fromPdfToWordFormatSk = page.locator("//a[contains(@daa-ll,'PDF na formát programu Word')]");
        this.informationResourcesForDevelopersSk = page.locator("//a[contains(@daa-ll,'Zdroje informácií pre vývojáro')]");

        //South Africa
        this.adobeAcrobatZa = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessZa = page.locator("(//a[contains(@daa-ll,'Business')])[2]");
        this.aiOverviewDcZa = page.locator("(//a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordZa = page.locator("//a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesZa = page.locator("//a[contains(@daa-ll,'Developer resources')]");

        //Swiss
        this.adobeAcrobatChFr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessesChFr = page.locator("(//a[contains(@daa-ll,'Entreprises')])[1]");
        this.aiProgramOverviewDcChFr = page.locator("//a[contains(@daa-ll,'Présentation du programme d IA')]");
        this.pdfToWordChFr = page.locator("//a[contains(@daa-ll,'PDF en Word')]");
        this.resourcesForDevelopmentSpecialistsChFr = page.locator("//a[contains(@daa-ll,'Ressources pour les spécialist')]");

        //Suomi
        this.adobeAcrobatFi = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companyFi = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Yritys')])[1]");
        this.anOverviewOfArtificialIntelligenceFi = page.locator("(//a[contains(@daa-ll,'Tekoälyn yleiskuvaus')])[1]");
        this.pdfToWordFormatFi = page.locator("//a[contains(@daa-ll,'PDF Word muotoon')]");
        this.resourcesForDevelopersFi = page.locator("//a[contains(@daa-ll,'Resursseja kehittäjille')]");

        //Sverige
        this.adobeAcrobatSe = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessSe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Företag')])[1]");
        this.anOverviewDcSe = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'AI översikt')])[2]");
        this.pdfToWordSe = page.locator("//a[contains(@daa-ll,'Pdf till Word')]");
        this.resourcesForDevelopersSe = page.locator("//a[contains(@daa-ll,'Resurser för utvecklare')]");

        //Svizzera
        this.adobeAcrobatChIt = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesChIt = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Aziende')]");
        this.aiOverviewDcChIt = page.locator("(//a[contains(@daa-ll,'Panoramica IA')])[2]");
        this.fromPdfToWordChIt = page.locator("//a[contains(@daa-ll,'Da PDF a Word')]");
        this.developerResourcesChIt = page.locator("//a[contains(@daa-ll,'Risorse per sviluppatori')]");

        //Turkey
        this.adobeAcrobatTr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.institutionsTr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Kurumlar')])[1]");
        this.artificialIntelligenceOverviewDcTr = page.locator("(//a[contains(@daa-ll,'Yapay Zekaya Genel Bakış')])[2]");
        this.fromPdfTr = page.locator("//a[contains(@daa-ll,'PDF den Word e')]");
        this.developerResourcesTr = page.locator("//a[contains(@daa-ll,'Geliştirici kaynakları')]");

        //United Arab Emirates - English
        this.adobeAcrobatAeEN = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessAeEn = page.locator("(//a[contains(@daa-ll,'Business')])[2]");
        this.aiOverviewDCAeEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordAeEn = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesAeEn = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");

        //United Kingdom
        this.adobeAcrobatUk = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessUk = page.locator("(//a[contains(@daa-ll,'Business')])[2]");
        this.aiOverviewDCUk = page.locator("(//a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordUk = page.locator("//div[@daa-lh='Online Tools']/descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesUk = page.locator("//div[@daa-lh='Resources']/descendant::a[contains(@daa-ll,'Developer resources')]");

        //Austria
        this.adobeAcrobatAt = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.pursueAt = page.locator("(//a[contains(@daa-ll,'Unternehmen')])[1]");
        this.aiOverviewDCAt = page.locator("(//a[contains(@daa-ll,'KI Überblick')])[2]");
        this.pdfToWordAt = page.locator("//a[contains(@daa-ll,'PDF in Word')]");
        this.developerResourcesAt = page.locator("//a[contains(@daa-ll,'Ressourcen für die Entwicklung')]");

        //Czech Republic
        this.adobeAcrobatCz = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesCz = page.locator("(//a[contains(@daa-ll,'Firmy')])[2]");
        this.anOverviewOfArtificialIntelligenceDCCz = page.locator("(//a[contains(@daa-ll,'Přehled o umělé inteligenci')])[2]");
        this.pdfToWordCz = page.locator("//a[contains(@daa-ll,'PDF na Word')]");
        this.developerResourcesCz = page.locator("//a[contains(@daa-ll,'Zdroje pro vývojáře')]");

        //Bulgaria
        this.adobeAcrobatBg = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessBg = page.locator("(//a[contains(@daa-ll,'Бизнес')])[2]");
        this.aiOverviewDcBg = page.locator("(//a[contains(@daa-ll,'Общ преглед на ИИ')])[2]");
        this.pdfToWordBg = page.locator("//a[contains(@daa-ll,'PDF в Word')]");
        this.developerResourcesBg = page.locator("//a[contains(@daa-ll,'Ресурси за разработчици')]");

        //Russia
        this.adobeAcrobatRu = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessRu = page.locator("//a[contains(@daa-ll,'Бизнесу')]");
        this.aiReviewDcRu = page.locator("(//a[contains(@daa-ll,'Обзор ИИ')])[2]");
        this.pdfToWordRu = page.locator("//a[contains(@daa-ll,'PDF в Word')]");
        this.developerResourcesRu = page.locator("//a[contains(@daa-ll,'Ресурсы для разработчиков')]");

        //Ukraine
        this.adobeAcrobatUa = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessUa = page.locator("(//a[contains(@daa-ll,'Бізнес')])[2]");
        this.overviewOfAiDcUa = page.locator("(//a[contains(@daa-ll,'Огляд ШІ')])[2]");
        this.convertFromPdfToWordUa = page.locator("//a[contains(@daa-ll,'Перетворення з PDF на Word')]");
        this.resourcesForDeveloperUa = page.locator("//a[contains(@daa-ll,'Ресурси для розробників')]");

        //Israel Hebrew
        this.adobeAcrobatIlHe = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessIlHe = page.locator("//div[@daa-lh='רכישה של']//descendant::a[contains(@daa-ll,'עסקים')]");
        this.theArtificialIntelligenceReviewDcIlHe = page.locator("(//a[contains(@daa-ll,'סקירת הבינה המלאכותית')])[2]");
        this.pdfToWordIlHe = page.locator("//a[contains(@daa-ll,'PDF ל Word')]");
        this.resourcesForDevelopersIlHe = page.locator("//a[contains(@daa-ll,'משאבים למפתחים')]");

        //United Arab Emirates
        this.adobeAcrobatIlAeAr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesAeAr = page.locator("(//a[contains(@daa-ll,'الشركات')])[2]");
        this.aboutArtificialIntelligenceDCAeAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[2]");
        this.pdfToWordAeAr = page.locator("//a[contains(@daa-ll,'PDF إلى Word')]");
        this.developerResourcesAeAr = page.locator("//a[contains(@daa-ll,'موارد المطور')]");

        //Middle East and North Africa
        this.adobeAcrobatIlMenaAr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesMenaAr = page.locator("(//a[contains(@daa-ll,'الشركات')])[2]");
        this.aboutArtificialIntelligenceDCMenaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[2]");
        this.pdfToWordMenaAr = page.locator("//a[contains(@daa-ll,'PDF إلى Word')]");
        this.developerResourcesMenaAr = page.locator("//a[contains(@daa-ll,'موارد المطور')]");

        //Saudi Arabia
        this.adobeAcrobatIlSaAr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesSaAr = page.locator("(//a[contains(@daa-ll,'الشركات')])[2]");
        this.aboutArtificialIntelligenceDCSaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[2]");
        this.pdfToWordSaAr = page.locator("//a[contains(@daa-ll,'PDF إلى Word')]");
        this.developerResourcesSaAr = page.locator("//a[contains(@daa-ll,'موارد المطور')]");

        //Egypt
        this.adobeAcrobatEgAr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesEgAr = page.locator("(//a[contains(@daa-ll,'الشركات')])[2]");
        this.aboutArtificialIntelligenceDCEgAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[2]");
        this.pdfToWordEgAr = page.locator("//a[contains(@daa-ll,'PDF إلى Word')]");
        this.developerResourcesEgAr = page.locator("//a[contains(@daa-ll,'موارد المطور')]");

        //Kuwait
        this.adobeAcrobatKwAr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesKwAr = page.locator("//div[@daa-lh='تسوق من أجل']//descendant::a[contains(@daa-ll,'الشركات')]");
        this.aboutArtificialIntelligenceDCKwAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[2]");
        this.pdfToWordKwAr = page.locator("//a[contains(@daa-ll,'PDF إلى Word')]");
        this.developerResourcesKwAr = page.locator("//a[contains(@daa-ll,'موارد المطور')]");

        //Qatar
        this.adobeAcrobatQaAr = page.locator("(//a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.companiesQaAr = page.locator("//div[@daa-lh='تسوق من أجل']//descendant::a[contains(@daa-ll,'الشركات')]");
        this.aboutArtificialIntelligenceDCQaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[2]");
        this.pdfToWordQaAr = page.locator("//a[contains(@daa-ll,'PDF إلى Word')]");
        this.developerResourcesQaAr = page.locator("//a[contains(@daa-ll,'موارد المطور')]");

        //Australia
        this.adobeAcrobatAu = page.locator("(//div[@daa-lh='Products']/descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessAu = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCAu = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordAu = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesAu = page.locator("//div[@daa-lh='Business Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //Hong Kong
        this.adobeAcrobatHkEn = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessHkEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCHkEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordHkEn = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesHkEn = page.locator("//div[@daa-lh='Business Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //India
        this.adobeAcrobatIn = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.smallBusinessIn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Small Business')]");
        this.aiOverviewDCIn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[1]");
        this.pdfToWordIn = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesIn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //Indonesia
        this.adobeAcrobatIdId = page.locator("(//div[@daa-lh='Produk']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessIdId = page.locator("//div[@daa-lh='Belanja']//descendant::a[contains(@daa-ll,'Bisnis')]");
        this.ikhtisarAiDCIdId = page.locator("(//div[@daa-lh='Kecerdasan Buatan']//descendant::a[contains(@daa-ll,'Ikhtisar AI')])[2]");
        this.pdfIsWordIdId = page.locator("//div[@daa-lh='Alat Online']//descendant::a[contains(@daa-ll,'PDF ke Word')]");
        this.developerResourcesIdId = page.locator("//div[@daa-lh='Sumber Daya']//descendant::a[contains(@daa-ll,'Sumber daya pengembang')]");

        //Indonesia - English
        this.adobeAcrobatIdEn = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessIdEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCIdEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.pdfToWordIdEn = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesIdEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //Malaysia
        this.adobeAcrobatMyMs = page.locator("(//div[@daa-lh='Produk']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessMyMs = page.locator("//div[@daa-lh='Beli untuk']//descendant::a[contains(@daa-ll,'Perniagaan')]");
        this.aiOverviewDCMyMs = page.locator("(//div[@daa-lh='Kecerdasan Buatan']//descendant::a[contains(@daa-ll,'Gambaran keseluruhan AI')])[2]");
        this.pdfToWordMyMs = page.locator("//div[@daa-lh='Alat Dalam Talian']//descendant::a[contains(@daa-ll,'PDF kepada Word')]");
        this.developerResourcesMyMs = page.locator("//div[@daa-lh='Sumber']//descendant::a[contains(@daa-ll,'Sumber pembangun')]");

        //Malaysia - English
        this.adobeAcrobatMyEn = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessMyEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCMyEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordMyEn = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesMyEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //New Zealand
        this.adobeAcrobatNz = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessNz = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCNz = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordNz = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesNz = page.locator("//div[@daa-lh='Business Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //Philippines - English
        this.adobeAcrobatPhEn = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessPhEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCPhEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordPhEn = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesPhEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //Philippines
        this.adobeAcrobatPhFil = page.locator("(//div[@daa-lh='Mga Produkto']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessPhFil = page.locator("//div[@daa-lh='Bumili para sa']//descendant::a[contains(@daa-ll,'Negosyo')]");
        this.aiOverviewDCPhFil = page.locator("(//a[contains(@daa-ll,'Pangkalahatang ideya ng AI')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.convertPdfToWordPhFil = page.locator("//div[@daa-lh='Mga Online na Tool']//descendant::a[contains(@daa-ll,'Gawing Word ang PDF')]");
        this.developerResourcesPhFil = page.locator("//div[@daa-lh='Mga Resource']//descendant::a[contains(@daa-ll,'Mga resource ng developer')]");

        //Singapore
        this.adobeAcrobatSg = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessSg = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCSg = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordSg = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesSg = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //Thailand - English
        this.adobeAcrobatThEn = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessThEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCThEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordThEn = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesThEn = page.locator("//div[@daa-lh='Business Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //vietnam - English
        this.adobeAcrobatVnEn = page.locator("(//div[@daa-lh='Products']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessVnEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Business')]");
        this.aiOverviewDCVnEn = page.locator("(//a[contains(@daa-ll,'AI Overview')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordVnEn = page.locator("//div[@daa-lh='Online Tools']//descendant::a[contains(@daa-ll,'PDF to Word')]");
        this.developerResourcesVnEn = page.locator("//div[@daa-lh='Business Resources']//descendant::a[contains(@daa-ll,'Developer resources')]");

        //vietnam
        this.adobeAcrobatVnVi = page.locator("(//div[@daa-lh='Sản phẩm']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.enterpriseVnVi = page.locator("//div[@daa-lh='Mua']//descendant::a[contains(@daa-ll,'Doanh nghiệp')]");
        this.aiOverviewDCVnVi = page.locator("(//a[contains(@daa-ll,'Tổng quan về AI')])[2]");
        this.pdfToWordVnVi = page.locator("//div[@daa-lh='Các công cụ trực tuyến']//descendant::a[contains(@daa-ll,'PDF sang Word')]");
        this.resourcesForDevelopersVnVi = page.locator("//div[@daa-lh='Tài nguyên cho doanh nghiệp']//descendant::a[contains(@daa-ll,'Tài nguyên cho nhà phát triển')]");

        //India - Hindi
        this.adobeAcrobatInHi = page.locator("(//div[@daa-lh='प्रोडक्ट्स']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessInHi = page.locator("//div[@daa-lh='इनकी खरीदारी करें']//descendant::a[contains(@daa-ll,'बिज़नेस')]");
        this.aiOverviewDCInHi = page.locator("(//a[contains(@daa-ll,'AI ओवरव्यू')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordInHi = page.locator("//div[@daa-lh='ऑनलाइन टूल्स']//descendant::a[contains(@daa-ll,'PDF से Word')]");
        this.developerResourcesInHi = page.locator("//div[@daa-lh='बिज़नेस रिसोर्सेज़']//descendant::a[contains(@daa-ll,'डेवलपर रिसोर्सेज़')]");

        //Thailand
        this.adobeAcrobatThTh = page.locator("(//div[@daa-lh='ผลิตภัณฑ์']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.businessThTh = page.locator("//div[@daa-lh='เลือกซื้อสำหรับ']//descendant::a[contains(@daa-ll,'ธุรกิจ')]");
        this.aiOverviewDCThTh = page.locator("(//a[contains(@daa-ll,'ภาพรวม AI')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordThTh = page.locator("//div[@daa-lh='เครื่องมือออนไลน์']//descendant::a[contains(@daa-ll,'PDF เป็น Word')]");
        this.developerResourcesThTh = page.locator("//div[@daa-lh='ทรัพยากรสำหรับธุรกิจ']//descendant::a[contains(@daa-ll,'ทรัพยากรสำหรับผู้พัฒนา')]");

        //Hong Kong
        this.adobeAcrobatHkZh = page.locator("(//div[@daa-lh='產品']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.enterpriseHkZh = page.locator("//div[@daa-lh='購買對象']//descendant::a[contains(@daa-ll,'企業')]");
        this.aiOverviewDCHkZh = page.locator("(//a[contains(@daa-ll,'AI 概觀')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordHkZh = page.locator("//div[@daa-lh='線上工具']//descendant::a[contains(@daa-ll,'PDF 轉 Word')]");
        this.developerResourcesHkZh = page.locator("//div[@daa-lh='商業資源']//descendant::a[contains(@daa-ll,'開發人員資源')]");

        //Taiwan
        this.adobeAcrobatTw = page.locator("(//div[@daa-lh='產品']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.enterpriseTw = page.locator("//div[@daa-lh='購買對象']//descendant::a[contains(@daa-ll,'企業')]");
        this.aiOverviewDCTw = page.locator("(//a[contains(@daa-ll,'AI 概觀')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordTw = page.locator("//div[@daa-lh='線上工具']//descendant::a[contains(@daa-ll,'PDF 轉 Word')]");
        this.developerResourcesTw = page.locator("//div[@daa-lh='商業資源']//descendant::a[contains(@daa-ll,'開發人員資源')]");

        //Korea
        this.adobeAcrobatKr = page.locator("(//div[@daa-lh='제품']//descendant::a[contains(@daa-ll,'Adobe Acrobat')])[1]");
        this.enterpriseKr = page.locator("//div[@daa-lh='구매 대상']//descendant::a[contains(@daa-ll,'기업')]");
        this.aiOverviewDCKr = page.locator("(//a[contains(@daa-ll,'AI 개요')]//descendant::div[@class='feds-navLink-content'])[2]");
        this.pdfToWordKr = page.locator("//div[@daa-lh='온라인 툴']//descendant::a[contains(@daa-ll,'PDF를 Word로')]");
        this.developerResourcesKr = page.locator("//div[@daa-lh='비즈니스 리소스']//descendant::a[contains(@daa-ll,'개발자 리소스')]");

        // 3) Experience Cloud Elements (Marketing & Commerce)
        //Argentina
        this.adobeExperienceCloud = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.customerDataPlatform = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemo = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.Analytics = page.locator("(//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManager = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.AIOverviewEC = page.locator("(//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAI = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentre = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlog = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.training = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Capacitación')]");
        this.parteners = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummit = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //United States
        this.adobeExperienceCloudUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.customerDataPlatformUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Customer data platform CDP')]");
        this.marketingAutomationUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Marketing automation')]");
        this.viewAllProductsECUS = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'View all products')]");
        this.adobeGenStudioUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe GenStudio')]");
        this.AIAssistantUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'AI Assistant')]");
        this.adobeExperiencePlatformUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Experience Platform')]");
        this.adobeGenAIUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe GenAI')]");
        this.findProductUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Find product')]");
        this.resourceCentreUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resource center')]");
        this.customerSuccessStoriesUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Customer success stories')]");
        this.servicesAndSupportUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.trainingUS = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Training')]");

        //France
        this.adobeExperienceCloudFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.insightsAndAudiencesFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Insights et audiences')]");
        this.b2bMarketingFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Marketing B2B')]");
        this.requestADemoFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Demander une démonstration')]");
        this.AnalyticsFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManagerFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.AIProgramOverviewFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Présentation du programme d IA')])[2]");
        this.senseiGenAIFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreECFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centre de ressources')]");
        this.customerTestimonialsFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Témoignages client')]");
        this.servicesAndTechnicalSupportFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services et assistance techniq')]");
        this.partenersFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partenaires')]");
        this.adobeSummitFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Germany
        this.adobeExperienceCloudGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.insightsFromDataAndTargetGroupsGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Erkenntnisse aus Daten und Zie')]");
        this.b2bMarketingGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'B2B Marketing')]");
        this.requestADemoGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Demo anfordern')]");
        this.AnalyticsGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.AIOverviewECGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'KI Überblick')])[3]");
        this.senseiGenAIGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreECGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Resource Center')]");
        this.experienceCloudBlogGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Experience Cloud Blog')]");
        this.servicesAndSupportGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Services und Support')]");
        this.partnerSupportGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Partner')]");
        this.adobeSummitGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Japan
        this.adobeExperienceCloudJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'データのインサイトとオーディエンス')]");
        this.introductionConsultationJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'導入の相談')]");
        this.adobeAnalyticsJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Analytics')])[1]");
        this.adobeExperienceManagerAssetsJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Manager Asset')]");
        this.AIOverviewECJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AIの概要')])[3]");
        this.adobeSenseiGenAiECJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe SenseiGenAI')]");
        this.resourceCentreJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'リソースセンター')]");
        this.experienceCloudBlogJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloudブログ')]");
        this.servicesAndSupportJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'サービスとサポート')]");
        this.partenerJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'パートナー')]");
        this.adobeSummitJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Italy
        this.adobeExperienceCloudIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.audiencesAndDataInsightsIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Pubblico e approfondimenti sui')]");
        this.requestADemoIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Richiedi una demo')]");
        this.analyticsIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Panoramica IA')])[3]");
        this.senseiGenAiIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCenterIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro risorse')]");
        this.experienceCloudBlogIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog di Experience Cloud')]");
        this.servicesAndSupportIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Servizi e supporto')]");
        this.partnerIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partner')]");
        this.adobeSummitIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Brazil
        this.adobeExperienceCloudBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Insights de dados e públicos')]");
        this.requestAdemoBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicite uma demo')]");
        this.AnalyticsBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.senseiBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei')])[1]");
        this.senseiGenAIBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCenterBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog da Experience Cloud')]");
        this.servicesAndSupportBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Serviços e suporte')]");
        this.partnersBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Parceiros')]");
        this.adobeSummitBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Canada English
        this.adobeExperienceCloudCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.requestDemoCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Request a demo')]");
        this.AnalyticsCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.senseiGenAICa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCentreCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource center')]");
        this.experienceCloudBlogCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloud Blog')]");
        this.trainingCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Training')]");
        this.partenersCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Canada French
        this.adobeExperienceCloudCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Insights sur les données et su')]");
        this.requestDemoCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Demander une démonstration')]");
        this.AnalyticsCaFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiProgramOverviewECCaFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Présentation du programme d IA')])[3]");
        this.senseiGenAICaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centre de ressources')]");
        this.experienceCloudBlogCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blogue Experience Cloud')]");
        this.trainingCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Formation')]");
        this.partenersCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partenaires')]");
        this.adobeSummitCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Chile
        this.adobeExperienceCloudCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestADemoCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsCl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECCl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAICl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Colombia
        this.adobeExperienceCloudCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsCo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECCo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAICo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Costa Rica
        this.adobeExperienceCloudCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsCr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECCr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAICr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Ecuador
        this.adobeExperienceCloudEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsEc = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManagerEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECEc = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAIEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Guatemala
        this.adobeExperienceCloudGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsGt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManagerGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECGt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAIGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Latin-America
        this.adobeExperienceCloudLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsLa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManagerLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECLa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAILa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Mexico
        this.adobeExperienceCloudMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsMx = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManagerMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECMx = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAIMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Peru
        this.adobeExperienceCloudPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsPe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManagerPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECPe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAIPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentrePe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Peurto Rico
        this.adobeExperienceCloudPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestDemoPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.AnalyticsPr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceAssetManagerPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECPr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAIPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentrePr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Capacitación')]");
        this.partenersPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Africa-English
        this.adobeExperienceCloudAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.requestDemoAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Request a demo')]");
        this.AnalyticsAf = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsAf = page.locator("//a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECAf = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.senseiGenAIAf = page.locator("//a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreAf = page.locator("//a[contains(@daa-ll,'Resource centre')]");
        this.experienceCloudBlogAf = page.locator("//a[contains(@daa-ll,'Experience Cloud Blog')]");
        this.trainingAf = page.locator("//a[contains(@daa-ll,'Training')]");
        this.partenersAf = page.locator("//a[contains(@daa-ll,'Partners')]");
        this.adobeSummitAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Belgique-French
        this.adobeExperienceCloudBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Insights sur les données et au')]");
        this.requestDemoBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Demander une démonstration')]");
        this.AnalyticsBeFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.senseiDCBeFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei')])[1]");
        this.senseiGenAIBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centre de ressources')]");
        this.customerTestimonialsBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Témoignages client')]");
        this.trainingBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Formation')]");
        this.partenersBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partenaires')]");
        this.adobeSummitBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Belgium-English
        this.adobeExperienceCloudBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.requestDemoBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Request a demo')]");
        this.AnalyticsBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.senseiGenAIBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource centre')]");
        this.experienceCloudBlogBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloud Blog')]");
        this.trainingBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Training')]");
        this.partenersBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Belgie-Nederlands
        this.adobeExperienceCloudBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndTargetGroupsBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data inzichten en doelgroepen')]");
        this.requestDemoBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Demo aanvragen')]");
        this.AnalyticsBeNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.overviewOfAiBeNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Overzicht van AI')])[3]");
        this.senseiGenAIBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource Center')]");
        this.experienceCloudBlogBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloud blog')]");
        this.trainingBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Training')]");
        this.partenersBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Danmark
        this.adobeExperienceCloudDk = page.locator("//a[contains(@daa-ll, 'Adobe Experience Cloud')]");
        this.dataKnowledgeAndAudienceDk = page.locator("//a[contains(@daa-ll, 'Dataviden og publikum')]");
        this.requestDemoDk = page.locator("//a[contains(@daa-ll, 'Anmod om en demo')]");
        this.AnalyticsDk = page.locator("(//div[@daa-lh='Produkter']//descendant::a[contains(@daa-ll, 'Analytics')])[1]");
        this.experienceManagerAssetsDk = page.locator("//div[@daa-lh='Produkter']//descendant::a[contains(@daa-ll, 'Experience Manager Assets DAM')]");
        this.aiOverviewECDk = page.locator("(//div[@daa-lh='Kunstig intelligens']//descendant::a[contains(@daa-ll, 'AI oversigt')])[2]");
        this.senseiGenAIDk = page.locator("//div[@daa-lh='Kunstig intelligens']//descendant::a[contains(@daa-ll, 'Sensei GenAI')]");
        this.resourceCentreDk = page.locator("//div[@daa-lh='Ressourcer']//descendant::a[contains(@daa-ll, 'Resource Center')]");
        this.experienceCloudBlogDk = page.locator("//div[@daa-lh='Ressourcer']//descendant::a[contains(@daa-ll, 'Oplev Cloud blog')]");
        this.servicesAndSupportDk = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll, 'Tjenester og support')]");
        this.partenersDk = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll, 'Partnere')]");
        this.adobeSummitDk = page.locator("//div[@daa-lh='Arrangementer']//descendant::a[contains(@daa-ll, 'Adobe topmøde')]");

        //Eesti
        this.adobeExperienceCloudEe = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll, 'Adobe Experience Cloud')]");
        this.dataOverviewsAndTargetGroupsEe = page.locator("//div[@daa-lh='Lahendused']//descendant::a[contains(@daa-ll, 'Andmeülevaated ja sihtrühmad')]");
        this.askForDemoEe = page.locator("//div[@daa-lh='Lahendused']//descendant::a[contains(@daa-ll, 'Küsige demo')]");
        this.AnalyticsEe = page.locator("(//div[@daa-lh='Tooted']//descendant::a[contains(@daa-ll, 'Analytics')])[1]");
        this.experienceManagerAssetsEe = page.locator("//div[@daa-lh='Tooted']//descendant::a[contains(@daa-ll, 'Experience Manager Assets DAM')]");
        this.anOverviewOfArtificialIntelligenceEcEe = page.locator("//div[@daa-lh='Tehisintellekt']//descendant::a[contains(@daa-ll, 'Tehisintellekti ülevaade-1')]");
        this.senseiGenAIEcEe = page.locator("//div[@daa-lh='Tehisintellekt']//descendant::a[contains(@daa-ll, 'Sensei GenAI')]");
        this.resourceCentreEe = page.locator("//div[@daa-lh='Ressursid']//descendant::a[contains(@daa-ll, 'Ressursikeskus')]");
        this.experienceCloudBlogEe = page.locator("//div[@daa-lh='Ressursid']//descendant::a[contains(@daa-ll, 'Experience Cloudi ajaveeb')]");
        this.servicesAndSupportEe = page.locator("//div[@daa-lh='Tugi']//descendant::a[contains(@daa-ll, 'Teenused ja tugi')]");
        this.partenersEe = page.locator("//div[@daa-lh='Tugi']//descendant::a[contains(@daa-ll, 'Partnerid')]");
        this.adobeSummitEe = page.locator("//div[@daa-lh='Sündmused']//descendant::a[contains(@daa-ll, 'Adobe Summit')]");

        //Egytp-English
        this.adobeExperienceCloudEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.b2bMarketingEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'B2B Marketing')]");
        this.requestADemoEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Request a demo')]");
        this.AnalyticsEgEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewEgEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.senseiGenAiEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.partnersEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Espana
        this.adobeExperienceCloudEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Información de datos y audienc')]");
        this.requestADemoEs = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Solicitar una demostración')]");
        this.analyticsEs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewECEs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resumen de la IA')])[3]");
        this.senseiGenAIEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de recursos')]");
        this.experienceCloudBlogEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Experience Cloud')]");
        this.trainingEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Formación')]");
        this.partenersEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.adobeSummitEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Greece-English
        this.adobeExperienceCloudGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.b2bMarketingGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'B2B Marketing')]");
        this.requestAdemoGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Request a demo')]");
        this.analyticsGrEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewGrEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.senseiGenAiGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource centre')]");
        this.experienceCloudBlogGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloud Blog')]");
        this.servicesAndSupportGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.partnersGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.aboutSummitGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Greece
        this.adobeExperienceCloudGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Πληροφορίες δεδομένων και κοιν')]"); 
        this.b2bMarketingGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Μάρκετινγκ B2B')]");
        this.requestAdemoGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ζητήστε επίδειξη')]");
        this.analyticsGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Επισκόπηση ΑΙ')])[3]");
        this.senseiGenAiGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Κέντρο πόρων')]");
        this.experienceCloudBlogGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ιστολόγιο Experience Cloud')]");
        this.servicesAndSupportGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Υπηρεσίες και υποστήριξη')]");
        this.collaboratorsGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Συνεργάτες')]");
        this.aboutSummitGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Ireland
        this.adobeExperienceCloudIe = page.locator("//a[contains(@daa-ll, 'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesIe = page.locator("//a[contains(@daa-ll, 'Data insights audiences')]");
        this.b2bMarketingIe = page.locator("//a[contains(@daa-ll, 'B2B Marketing')]");
        this.requestAdemoIe = page.locator("//a[contains(@daa-ll, 'Request a demo')]");
        this.analyticsIe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsIe = page.locator("//a[contains(@daa-ll, 'Experience Manager Assets DAM')]");
        this.aiOverviewIe = page.locator("(//a[contains(@daa-ll, 'AI Overview')])[3]");
        this.senseiGenAiIe = page.locator("//a[contains(@daa-ll, 'Sensei GenAI')]");
        this.resourceCentreIe = page.locator("//a[contains(@daa-ll, 'Resource centre')]");
        this.experienceCloudBlogIe = page.locator("//a[contains(@daa-ll, 'Experience Cloud Blog')]");
        this.servicesAndSupportIe = page.locator("//a[contains(@daa-ll, 'Services and support')]");
        this.partnersIe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.aboutSummitIe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Israel-English
        this.adobeExperienceCloudIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.b2bMarketingIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'B2B Marketing')]");
        this.requestAdemoIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Request a demo')]");
        this.analyticsIlEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewIlEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.senseiGenAiIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource center')]");
        this.experienceCloudBlogIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloud Blog')]");
        this.servicesAndSupportIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.partnersIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.aboutSummitIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Kuwait-English
        this.adobeExperienceCloudKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.b2bMarketingKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'B2B Marketing')]");
        this.requestAdemoKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Request a demo')]");
        this.analyticsKwEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.aiOverviewKwEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.senseiGenAiKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource centre')]");
        this.experienceCloudBlogKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloud Blog')]");
        this.servicesAndSupportKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.partnersKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Partners')]");
        this.aboutSummitKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Latvija
        this.adobeExperienceCloudLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesLv = page.locator("//a[@daa-ll='Datu ieskati un auditorijas-2']");
        this.b2bMarketingLv = page.locator("//a[@daa-ll='Starpuzņēmumu mārketings-8']");
        this.requestAdemoLv = page.locator("//a[@daa-ll='Pieprasīt demonstrāciju-9']");
        this.analyticsLv = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.experienceManagerAssetsLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Manager Assets DAM')]");
        this.miOverviewLv = page.locator("//a[@daa-ll='MI pārskats-1']");
        this.senseiGenAiLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sensei GenAI')]");
        this.resourceCentreLv = page.locator("//a[@daa-ll='Resursu centrs-4']");
        this.experienceCloudBlogLv = page.locator("//a[@daa-ll='Experience Cloud emuārs-6']");
        this.servicesAndSupportLv = page.locator("//a[@daa-ll='Pakalpojumi un atbalsts-1']");
        this.partnersLv = page.locator("//a[@daa-ll='Partneri-4']");
        this.aboutSummitLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Lietuva
        this.adobeExperienceCloudLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesLt = page.locator("//a[contains(@daa-ll,'Duomenų įžvalgos ir auditorijo')]");
        this.analyticsLt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewLt = page.locator("(//a[contains(@daa-ll,'DI apžvalga')])[3]");
        this.resourceCentreLt = page.locator("//a[contains(@daa-ll,'Išteklių centras')]");
        this.servicesAndSupportLt = page.locator("//a[contains(@daa-ll,'Paslaugos ir palaikymas')]");
        this.aboutSummitLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Luxembourg-Deutsch
        this.adobeExperienceCloudLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndTargetGroupsLuDe = page.locator("//a[contains(@daa-ll,'Datenerkenntnisse und Zielgrup')]");
        this.analyticsLuDe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewLuDe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'KI Überblick')])[3]");
        this.resourceCentreLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Resource Center')]");
        this.servicesAndSupportLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services und Support')]");
        this.aboutSummitLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Luxembourg-English
        this.adobeExperienceCloudLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsLuEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewLuEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCentreLuEn = page.locator("//a[@daa-ll='Resource centre-4']");
        this.servicesAndSupportLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Luxembourg-French
        this.adobeExperienceCloudLuFr = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesLuFr = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Insights sur les données et au')]");
        this.analyticsLuFr = page.locator("(//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiProgramOverviewLuFr = page.locator("//a[@daa-ll='Présentation du programme d IA-1' and @href='/ai/overview.html']");
        this.resourceCentreLuFr = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Centre de ressources')]");
        this.servicesAndTechnicalSupportLuFr = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Services et assistance techniq')]");
        this.aboutSummitLuFr = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Hungary
        this.adobeExperienceCloudHu = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndTargetAudiencesHu = page.locator("//a[contains(@daa-ll,'Adatelemzések és célközönségek')]");
        this.analyzesHu = page.locator("//a[contains(@daa-ll,'Elemzések')]");
        this.introductionToArtificialIntelligenceHu = page.locator("(//a[contains(@daa-ll,'A mesterséges intelligencia be')])[3]");
        this.sourceMaterialsHu = page.locator("//a[contains(@daa-ll,'Forrásanyagok')]");
        this.servicesAndSupportHu = page.locator("//a[contains(@daa-ll,'Szolgáltatások és támogatás')]");
        this.aboutSummitHu = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Middle East and North Africa - English
        this.adobeExperienceCloudMenaEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesMenaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsMenaEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewMenaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterMenaEn = page.locator("//a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportMenaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitMenaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Nigeria
        this.adobeExperienceCloudNg = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesNg = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsNg = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewNg = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterNg = page.locator("//a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportNg = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitNg = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Nederlands
        this.adobeExperienceCloudNl = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndTargetGroupsNl = page.locator("//a[contains(@daa-ll,'Data inzichten en doelgroepen')]");
        this.analyticsNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.overviewOfAiECNl = page.locator("(//a[contains(@daa-ll,'Overzicht van AI')])[3]");
        this.resourceCenterNl = page.locator("//a[contains(@daa-ll,'Resource Center')]");
        this.servicesAndSupportNl = page.locator("//a[contains(@daa-ll,'Services en ondersteuning')]");
        this.aboutSummitNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Norway
        this.adobeExperienceCloudNo = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesNo = page.locator("//a[contains(@daa-ll,'Datainnsikt og publikum')]");
        this.analyticsNo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewEcNo = page.locator("(//a[contains(@daa-ll,'AI oversikt')])[3]");
        this.resourceCenterNo = page.locator("//a[contains(@daa-ll,'Resource Center')]");
        this.servicesAndSupportNo = page.locator("//a[contains(@daa-ll,'Tjenester og brukerstøtte')]");
        this.aboutSummitNo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Poland
        this.adobeExperienceCloudPl = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceAnalysisPl = page.locator("//a[contains(@daa-ll,'Analiza danych i odbiorców')]");
        this.analyticsPl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.artificialIntelligencePl = page.locator("(//a[contains(@daa-ll,'Sztuczna inteligencja przegląd')])[3]");
        this.resourceCenterPl = page.locator("//a[contains(@daa-ll,'Centrum zasobów')]");
        this.servicesAndSupportPl = page.locator("//a[contains(@daa-ll,'Usługi i pomoc techniczna')]");
        this.aboutSummitPl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Portugal
        this.adobeExperienceCloudPt = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsPt = page.locator("//a[contains(@daa-ll,'Insights de dados e públicos')]");
        this.analyticsPt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECPt = page.locator("(//a[contains(@daa-ll,'Visão geral da IA')])[3]");
        this.resourceCenterPt = page.locator("//a[contains(@daa-ll,'Centro de recursos')]");
        this.servicesAndSupportPt = page.locator("//a[contains(@daa-ll,'Serviços e suporte')]");
        this.aboutSummitPt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Qatar - English
        this.adobeExperienceCloudQaEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesQaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsQaEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECQaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterQaEn = page.locator("//a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportQaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitQaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Romania
        this.adobeExperienceCloudRo = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.stasticalDataAndAudienceSegmentsRo = page.locator("//a[contains(@daa-ll,'Date statistice și segmente de')]");
        this.analyticsRo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.artificialIntelligenceOverviewEcRo = page.locator("(//a[contains(@daa-ll,'Prezentare generală inteligenț')])[3]");
        this.resourceCenterRo = page.locator("//a[contains(@daa-ll,'Centru de resurse')]");
        this.servicesAndSupportRo = page.locator("//a[contains(@daa-ll,'Servicii și asistență')]");
        this.aboutSummitRo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Saudi Arabia - English
        this.adobeExperienceCloudSaEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesSaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsSaEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECSaEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterSaEn = page.locator("//a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportSaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitSaEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Schweiz
        this.adobeExperienceCloudChDe = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndTargetGroupsChDe = page.locator("//a[contains(@daa-ll,'Datenerkenntnisse und Zielgrup')]");
        this.analyticsChDe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECChDe = page.locator("(//a[contains(@daa-ll,'KI Überblick')])[3]");
        this.resourceCenterChDe = page.locator("//a[contains(@daa-ll,'Resource Center')]");
        this.servicesAndSupportChDe = page.locator("//a[contains(@daa-ll,'Services und Support')]");
        this.aboutSummitChDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Slovenija
        this.adobeExperienceCloudSi = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesSi = page.locator("//a[contains(@daa-ll,'Podatkovni vpogledi in občinst')]");
        this.analyticsSi = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.anOverviewOfArtificialIntelligenceEcSi = page.locator("(//a[contains(@daa-ll,'Pregled umetne inteligence')])[3]");
        this.resourceCenterSi = page.locator("//a[contains(@daa-ll,'Središče za sredstva')]");
        this.servicesAndSupportSi = page.locator("//a[contains(@daa-ll,'Storitve in podpora')]");
        this.aboutSummitSi = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Slovensko
        this.adobeExperienceCloudSk = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataOverviewsAndTargetGroupsSk = page.locator("//a[contains(@daa-ll,'Prehľady údajov a cieľové skup')]");
        this.analyticsSk = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.anOverviewOfArtificialIntelligenceEcSk = page.locator("(//a[contains(@daa-ll,'Prehľad umelej inteligencie')])[3]");
        this.resourceCenterSk = page.locator("//a[contains(@daa-ll,'Centrum zdrojov')]");
        this.servicesAndSupportSk = page.locator("//a[contains(@daa-ll,'Služby a podpora')]");
        this.aboutSummitSk = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //South Africa
        this.adobeExperienceCloudZa = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesZa = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsZa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewEcZa = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterZa = page.locator("//a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportZa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitZa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Swiss
        this.adobeExperienceCloudChFr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesChFr = page.locator("//a[contains(@daa-ll,'Insights sur les données et au')]");
        this.analyticsChFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.senseiChFr = page.locator("(//a[contains(@daa-ll,'Sensei')])[1]");
        this.resourceCenterChFr = page.locator("//a[contains(@daa-ll,'Centre de ressources')]");
        this.servicesAndTechnicalSupportChFr = page.locator("//a[contains(@daa-ll,'Services et assistance techniq')]");
        this.aboutSummitChFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Suomi
        this.adobeExperienceCloudFi = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataViewsAndAudiencesFi = page.locator("//a[contains(@daa-ll,'Tietonäkemykset ja yleisöt')]");
        this.analyticsFi = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECFi = page.locator("(//a[contains(@daa-ll,'AI yleiskuvaus')])[2]");
        this.resourceCenterFi = page.locator("//a[contains(@daa-ll,'Resurssikeskus')]");
        this.servicesAndSupportFi = page.locator("//a[contains(@daa-ll,'Palvelut ja tuki')]");
        this.aboutSummitFi = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Sverige
        this.adobeExperienceCloudSe = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesSe = page.locator("//a[contains(@daa-ll,'Datainsikter och målgrupper')]");
        this.analyticsSe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECSe = page.locator("(//a[contains(@daa-ll,'AI översikt')])[3]");
        this.resourceCenterSe = page.locator("//a[contains(@daa-ll,'Resurscenter')]");
        this.servicesAndSupportSe = page.locator("//a[contains(@daa-ll,'Tjänster och support')]");
        this.aboutSummitSe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Svizzera
        this.adobeExperienceCloudChIt = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.audiencesAndDataInsightsChIt = page.locator("//a[contains(@daa-ll,'Pubblico e approfondimenti sui')]");
        this.analyticsChIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECChIt = page.locator("(//a[contains(@daa-ll,'Panoramica IA')])[3]");
        this.resourceCenterECChIt = page.locator("(//a[contains(@daa-ll,'Centro risorse')])[1]");
        this.servicesAndSupportChIt = page.locator("//a[contains(@daa-ll,'Servizi e supporto')]");
        this.aboutSummitChIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Turkey
        this.adobeExperienceCloudTr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAnalyticsAndAudiencesTr = page.locator("//a[contains(@daa-ll,'Veri analizleri ve kitleler')]");
        this.analyticsTr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.artificialIntelligenceOverviewECTr = page.locator("(//a[contains(@daa-ll,'Yapay Zekaya Genel Bakış')])[3]");
        this.resourceCenterECTr = page.locator("//a[contains(@daa-ll,'Kaynak merkezi')]");
        this.servicesAndSupportTr = page.locator("//a[contains(@daa-ll,'Hizmetler ve destek')]");
        this.aboutSummitTr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //United Arab Emirates - English
        this.adobeExperienceCloudAeEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesAeEn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsAeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECAeEn = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterECAeEn = page.locator("//a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportAeEn = page.locator("//a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitAeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //United Emirates
        this.adobeExperienceCloudUk = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesUk = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsUk = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECUk = page.locator("(//a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterECUk = page.locator("//a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportUk = page.locator("//a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitUk = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Austria
        this.adobeExperienceCloudAt = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndTargetAt = page.locator("//a[contains(@daa-ll,'Datenerkenntnisse und Zielgrup')]");
        this.analyticsAt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECAt = page.locator("//a[contains(@daa-ll,'KI Überblick-1') and @href='/ai/overview.html']");
        this.resourceCenterECAt = page.locator("//a[contains(@daa-ll,'Resource Center')]");
        this.servicesAndSupportAt = page.locator("//a[contains(@daa-ll,'Services und Support')]");
        this.aboutSummitAt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Czech Republic
        this.adobeExperienceCloudCz = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataOverviewAndTargetGroupsCz = page.locator("//a[contains(@daa-ll,'Přehledy dat a cílové skupiny')]");
        this.analyticsCz = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.anOverviewOfArtificialIntelligenceECCz = page.locator("(//a[contains(@daa-ll,'Přehled o umělé inteligenci')])[3]");
        this.resourceCenterECCz = page.locator("//a[contains(@daa-ll,'Centrum zdrojů')]");
        this.servicesAndSupportCz = page.locator("//a[contains(@daa-ll,'Služby a podpora')]");
        this.aboutSummitCz = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Bulgaria
        this.adobeExperienceCloudBg = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.informationAboutDataAndAudienceBg = page.locator("//a[contains(@daa-ll,'Информация за данни и аудитори')]");
        this.analyzesBg = page.locator("(//a[contains(@daa-ll,'Анализи')])[1]");
        this.aiOverviewECBg = page.locator("(//a[contains(@daa-ll,'Общ преглед на ИИ')])[3]");
        this.resourceCenterBg = page.locator("//a[contains(@daa-ll,'Център за ресурси')]");
        this.servicesAndSupportBg = page.locator("//a[contains(@daa-ll,'Услуги и поддръжка')]");
        this.aboutSummitBg = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Russia
        this.adobeExperienceCloudRu = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.analyticsAndAudienceRu = page.locator("//a[contains(@daa-ll,'Аналитические данные и аудитор')]");
        this.analyticsRu = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiReviewECRu = page.locator("(//a[contains(@daa-ll,'Обзор ИИ')])[3]");
        this.resourceCenterRu = page.locator("//a[contains(@daa-ll,'Центр ресурсов')]");
        this.servicesAndSupportRu = page.locator("//a[contains(@daa-ll,'Сервисы и поддержка')]");
        this.aboutSummitRu = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Ukraine
        this.adobeExperienceCloudUa = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAnalysisAndAudienceUa = page.locator("//a[contains(@daa-ll,'Аналіз даних і аудиторія')]");
        this.analyticsUa = page.locator("(//a[contains(@daa-ll,'Аналітика')])[1]");
        this.overviewOfAiEcUa = page.locator("(//a[contains(@daa-ll,'Огляд ШІ')])[3]");
        this.resourceCenterUa = page.locator("//a[contains(@daa-ll,'Центр ресурсів')]");
        this.servicesAndSupportUa = page.locator("//a[contains(@daa-ll,'Обслуговування й підтримка')]");
        this.aboutSummitUa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Israel Hebrew
        this.adobeExperienceCloudIlHe = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAboutAudiencesInsightfulIlHe = page.locator("//a[contains(@daa-ll,'קהלים תובנות לגבי נתונים')]");
        this.analyticsIlHe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.theArtificialIntelligenceReviewEcIlHe = page.locator("(//a[contains(@daa-ll,'סקירת הבינה המלאכותית')])[3]");
        this.theResourceCenterIlHe = page.locator("//a[contains(@daa-ll,'מרכז המשאבים')]");
        this.servicesAndSupportIlHe = page.locator("//a[contains(@daa-ll,'שירותים ותמיכה')]");
        this.aboutSummitIlHe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //United Arab Emirates
        this.adobeExperienceCloudAeAr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesAeAr = page.locator("//a[contains(@daa-ll,'رؤى البيانات والجماهير')]");
        this.analyticsAeAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aboutArtificialIntelligenceECAeAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[3]");
        this.resourceCenterAeAr = page.locator("//a[contains(@daa-ll,'مركز الموارد')]");
        this.servicesAndSupportAeAr = page.locator("//a[contains(@daa-ll,'الخدمات والدعم')]");
        this.aboutSummitAeAr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Middle East and North Africa
        this.adobeExperienceCloudMenaAr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesMenaAr = page.locator("//a[contains(@daa-ll,'رؤى البيانات والجماهير')]");
        this.analyticsMenaAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aboutArtificialIntelligenceECMenaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[3]");
        this.resourceCenterMenaAr = page.locator("//a[contains(@daa-ll,'مركز الموارد')]");
        this.servicesAndSupportMenaAr = page.locator("//a[contains(@daa-ll,'الخدمات والدعم')]");
        this.aboutSummitMenaAr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Saudi Arabia
        this.adobeExperienceCloudSaAr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesSaAr = page.locator("//a[contains(@daa-ll,'رؤى البيانات والجماهير')]");
        this.analyticsSaAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aboutArtificialIntelligenceECSaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[3]");
        this.resourceCenterSaAr = page.locator("//a[contains(@daa-ll,'مركز الموارد')]");
        this.servicesAndSupportSaAr = page.locator("//a[contains(@daa-ll,'الخدمات والدعم')]");
        this.aboutSummitSaAr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Egypt
        this.adobeExperienceCloudEgAr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesEgAr = page.locator("//a[contains(@daa-ll,'رؤى البيانات والجماهير')]");
        this.analyticsEgAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aboutArtificialIntelligenceECEgAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[3]");
        this.resourceCenterEgAr = page.locator("//a[contains(@daa-ll,'مركز الموارد')]");
        this.servicesAndSupportEgAr = page.locator("//a[contains(@daa-ll,'الخدمات والدعم')]");
        this.aboutSummitEgAr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Kuwait
        this.adobeExperienceCloudKwAr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesKwAr = page.locator("//a[contains(@daa-ll,'رؤى البيانات والجماهير')]");
        this.analyticsKwAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aboutArtificialIntelligenceECKwAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[3]");
        this.resourceCenterKwAr = page.locator("//a[contains(@daa-ll,'مركز الموارد')]");
        this.servicesAndSupportKwAr = page.locator("//a[contains(@daa-ll,'الخدمات والدعم')]");
        this.aboutSummitKwAr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Qatar
        this.adobeExperienceCloudQaAr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesQaAr = page.locator("//a[contains(@daa-ll,'رؤى البيانات والجماهير')]");
        this.analyticsQaAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aboutArtificialIntelligenceECQaAr = page.locator("(//a[contains(@daa-ll,'نبذة عن الذكاء الاصطناعي')])[3]");
        this.resourceCenterQaAr = page.locator("//a[contains(@daa-ll,'مركز الموارد')]");
        this.servicesAndSupportQaAr = page.locator("//a[contains(@daa-ll,'الخدمات والدعم')]");
        this.aboutSummitQaAr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Australia
        this.adobeExperienceCloudAu = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesAu = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsAu = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECAu = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterAu = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportAu = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitAu = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Hong Kong
        this.adobeExperienceCloudHkEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesHkEn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsHkEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECHkEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterHkEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportHkEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitHkEn = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //India
        this.adobeExperienceCloudIn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesIn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsIn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECIn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[2]");
        this.resourceCenterIn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportIn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitIn = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Indonesia
        this.adobeExperienceCloudIdId = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsIdId = page.locator("//a[contains(@daa-ll,'Wawasan data audiens')]");
        this.analyticsIdId = page.locator("(//div[@daa-lh='Produk']//descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.senseiIdId = page.locator("(//div[@daa-lh='Kecerdasan Buatan']//descendant::a[contains(@daa-ll,'Sensei')])[1]");
        this.resourceCenterIdId = page.locator("//div[@daa-lh='Sumber Daya']//descendant::a[contains(@daa-ll,'Pusat sumber daya')]");
        this.servicesAndSupportIdId = page.locator("//div[@daa-lh='Dukungan']//descendant::a[contains(@daa-ll,'Layanan dan dukungan')]");
        this.aboutSummitIdId = page.locator("//div[@daa-lh='Acara']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Indonesia - English
        this.adobeExperienceCloudIdEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesIdEn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsIdEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECIdEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterIdEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportIdEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitIdEn = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Malaysia
        this.adobeExperienceCloudMyMs = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataAndAudienceInsightsMyMs = page.locator("//a[contains(@daa-ll,'Pencerapan data khalayak')]");
        this.analyticsMyMs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECMyMs = page.locator("(//div[@daa-lh='Kecerdasan Buatan']//descendant::a[contains(@daa-ll,'Gambaran keseluruhan AI')])[3]");
        this.libraryMyMs = page.locator("//div[@daa-lh='Sumber']//descendant::a[contains(@daa-ll,'Pusat sumber')]");
        this.servicesAndSupportMyMs = page.locator("//div[@daa-lh='Sokongan']//descendant::a[contains(@daa-ll,'Perkhidmatan dan sokongan')]");
        this.aboutSummitMyMs = page.locator("//div[@daa-lh='Acara']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Malaysia - English
        this.adobeExperienceCloudMyEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesMyEn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsMyEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECMyEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterMyEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportMyEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitMyEn = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //New Zealand
        this.adobeExperienceCloudNz = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesNz = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsNz = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECNz = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterNz = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportNz = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitNz = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Philippines - English
        this.adobeExperienceCloudPhEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesPhEn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsPhEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECPhEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterPhEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportPhEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitPhEn = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Philippines
        this.adobeExperienceCloudPhFil = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesPhFil = page.locator("//a[contains(@daa-ll,'Mga data insight at audience')]");
        this.analyticsPhFil = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECPhFil = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'Pangkalahatang ideya ng AI')])[3]");
        this.resourceCenterPhFil = page.locator("//div[@daa-lh='Mga Resource']//descendant::a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportPhFil = page.locator("//div[@daa-lh='Suporta']//descendant::a[contains(@daa-ll,'Mga serbisyo at suporta')]");
        this.aboutSummitPhFil = page.locator("//div[@daa-lh='Mga Event']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Singapore
        this.adobeExperienceCloudSg = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesSg = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsSg = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECSg = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterSg = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource centre')]");
        this.servicesAndSupportSg = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitSg = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Thailand - English
        this.adobeExperienceCloudThEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesThEn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsThEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECThEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterThEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportThEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitThEn = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Vietnam - English
        this.adobeExperienceCloudVnEn = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesVnEn = page.locator("//a[contains(@daa-ll,'Data insights audiences')]");
        this.analyticsVnEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECVnEn = page.locator("(//div[@daa-lh='Artificial Intelligence']//descendant::a[contains(@daa-ll,'AI Overview')])[3]");
        this.resourceCenterVnEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Resource center')]");
        this.servicesAndSupportVnEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Services and support')]");
        this.aboutSummitVnEn = page.locator("//div[@daa-lh='Events']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Vietnam
        this.adobeExperienceCloudVnVi = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.insightsIntoDataAndTargetGroupVnVi = page.locator("//a[contains(@daa-ll,'Thông tin chuyên sâu về dữ liệ')]");
        this.analyticsVnVi = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECVnVi = page.locator("(//div[@daa-lh='Trí tuệ nhân tạo']//descendant::a[contains(@daa-ll,'Tổng quan về AI')])[3]");
        this.resourceCenterVnVi = page.locator("//div[@daa-lh='Tài nguyên']//descendant::a[contains(@daa-ll,'Trung tâm tài nguyên')]");
        this.servicesAndSupportVnVi = page.locator("//div[@daa-lh='Hỗ trợ']//descendant::a[contains(@daa-ll,'Dịch vụ và hỗ trợ')]");
        this.aboutSummitVnVi = page.locator("//div[@daa-lh='Sự kiện']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //India - Hindi
        this.adobeExperienceCloudInHi = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesInHi = page.locator("//a[contains(@daa-ll,'डेटा इनसाइट्स एवं ऑडिएंसेज़')]");
        this.analyticsInHi = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECInHi = page.locator("(//a[contains(@daa-ll,'AI ओवरव्यू')])[3]");
        this.resourceCenterInHi = page.locator("//div[@daa-lh='रिसोर्सेज़']//descendant::a[contains(@daa-ll,'रिसोर्स सेंटर')]");
        this.servicesAndSupportInHi = page.locator("//div[@daa-lh='सपोर्ट']//descendant::a[contains(@daa-ll,'सर्विसेज़ और सपोर्ट')]");
        this.aboutSummitInHi = page.locator("//div[@daa-lh='ईवेंट्स']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Thailand
        this.adobeExperienceCloudThTh = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.insightsAndTargetAudiencesThTh = page.locator("//a[contains(@daa-ll,'ข้อมูลเชิงลึกและกลุ่มเป้าหมาย')]");
        this.analyticsThTH = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECThTh = page.locator("(//a[contains(@daa-ll,'ภาพรวม AI')])[3]");
        this.resourceCenterThTh = page.locator("//div[@daa-lh='ทรัพยากร']//descendant::a[contains(@daa-ll,'ศูนย์ทรัพยากร')]");
        this.servicesAndSupportThTh = page.locator("//div[@daa-lh='การสนับสนุน']//descendant::a[contains(@daa-ll,'บริการและการสนับสนุน')]");
        this.aboutSummitThTh = page.locator("//div[@daa-lh='กิจกรรม']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Hong Kong
        this.adobeExperienceCloudHkZh = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesHkZh = page.locator("//a[contains(@daa-ll,'數據見解與受眾')]");
        this.analyticsHkZh = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECHkZh = page.locator("(//a[contains(@daa-ll,'AI 概觀')])[3]");
        this.resourceCenterHkZh = page.locator("//div[@daa-lh='資源']//descendant::a[contains(@daa-ll,'資源中心')]");
        this.servicesAndSupportHkZh = page.locator("//div[@daa-lh='支援']//descendant::a[contains(@daa-ll,'服務與支援')]");
        this.aboutSummitHkZh = page.locator("//div[@daa-lh='活動']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Hong Kong
        this.adobeExperienceCloudTw = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesTw = page.locator("//a[contains(@daa-ll,'數據見解與受眾')]");
        this.analyticsTw = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECTw = page.locator("(//a[contains(@daa-ll,'AI 概觀')])[3]");
        this.resourceCenterTw = page.locator("//div[@daa-lh='資源']//descendant::a[contains(@daa-ll,'資源中心')]");
        this.servicesAndSupportTw = page.locator("//div[@daa-lh='支援']//descendant::a[contains(@daa-ll,'服務與支援')]");
        this.aboutSummitTw = page.locator("//div[@daa-lh='活動']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        //Korea
        this.adobeExperienceCloudKr = page.locator("//a[contains(@daa-ll,'Adobe Experience Cloud')]");
        this.dataInsightsAndAudiencesKr = page.locator("//a[contains(@daa-ll,'데이터 인사이트 및 고객')]");
        this.analyticsKr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Analytics')])[1]");
        this.aiOverviewECKr = page.locator("(//a[contains(@daa-ll,'AI 개요')])[3]");
        this.resourceCenterKr = page.locator("//div[@daa-lh='리소스']//descendant::a[contains(@daa-ll,'리소스 센터')]");
        this.servicesAndSupportKr = page.locator("//div[@daa-lh='지원']//descendant::a[contains(@daa-ll,'서비스 및 지원')]");
        this.aboutSummitKr = page.locator("//div[@daa-lh='이벤트']//descendant::a[contains(@daa-ll,'Adobe Summit')]");

        // 4) Help X Elements (Help & Support)
        //Argentina
        this.helpCentre = page.locator("//div[@daa-lh='Ayuda y asistencia técnica']//descendant::a[contains(@daa-ll,'Centro de ayuda')]");
        this.downloadAndInstall = page.locator("//div[@daa-lh='Ayuda y asistencia técnica']//descendant::a[contains(@daa-ll,'Descargar e instalar')]");
        this.contact = page.locator("//div[@daa-lh='Ayuda y asistencia técnica']//descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccount = page.locator("//div[@daa-lh='Tareas comunes']//descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatus = page.locator("//div[@daa-lh='Tareas comunes']//descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorials = page.locator("//div[@daa-lh='Recursos para el aprendizaje']//descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeague = page.locator("//div[@daa-lh='Recursos para el aprendizaje']//descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //United States
        this.helpCentreUS = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.downloadAndInstallUS = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.contactUS = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.manageMyAccountUS = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusUS = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsUS = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueUS = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //France
        this.helpCentreFr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Centre d aide')])[1]");
        this.downloadAndInstallFr = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Téléchargement et installation')]");
        this.contactUsFr = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll,'Nous contacter')]");
        this.formulaManagementFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Gestion de la formule')]");
        this.subscribeToAdobeStatusFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'S abonner à Adobe Status')]");
        this.creativeCloudTutorialsFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Tutoriels Creative Cloud')]");
        this.adobeExperienceLeagueFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");
        this.programManagementFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Gestion du programme')]");
        this.showAllHelpTopicsFr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Afficher tous les sujets d aid')]");

        //Germany
        this.adobeHelpCentreGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Hilfezentrum von Adobe')])[1]");
        this.downloadAndInstallGr = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Download und Installation')])[1]");
        this.contactGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Kontakt')]");
        this.manageMyAccountGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Konto verwalten')]");
        this.manageSubscriptionGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Abo verwalten')]");
        this.getInformationAboutTipsTutorialsAndSpecialOffersGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Erhalte Informationen zu Tipps')]");
        this.creativeCloudTutorialsGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Creative Cloud Tutorials')]");
        this.adobeExperienceLeagueGr = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Japan
        this.helpCenterJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'ヘルプセンター')])[1]");
        this.downloadAndInstallJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'ダウンロードとインストール')])[1]");
        this.inquiryJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'お問い合わせ')])[1]");
        this.accountManagementJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'アカウント管理')]");
        this.adobeStatusSubscriptionJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Statusの購読')]");
        this.creativeCloudTutorialJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloudチュートリアル')]");
        this.csmPortalJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'CSM ポータル')]");

        //Italy
        this.helpCentreIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Help Center')])[1]");
        this.downloadAndInstallIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download e installazione')])[1]");
        this.contactIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contatti')]");
        this.accountManagementIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestione account')]");
        this.subscribeToAdobeStatusIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Abbonati ad Adobe Status')]");
        this.creativeCloudTutorialIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutorial su Creative Cloud')]");
        this.adobeExperienceLeagueIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Brazil
        this.helpCenterBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de Ajuda')])[1]");
        this.downloadAndInstallBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Baixar e instalar')])[1]");
        this.contactUsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Fale conosco')]");
        this.manageMyAccountBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gerenciar minha conta')]");
        this.subscribeToAdobeStatusBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Assinar o Adobe Status')]");
        this.creativeCloudTutorialsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriais da Creative Cloud')]");
        this.adobeExperienceLeagueBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Canada English
        this.helpCentreCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Help Center')])[1]");
        this.downloadAndInstallCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[1]");
        this.contactUsCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.manageMyAccountCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Canada French
        this.helpCentreCaFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centre d aide')])[1]");
        this.downloadAndInstallCaFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Téléchargement et installation')])[1]");
        this.contactUsCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Nous contacter')]");
        this.accountManagementCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestion du compte')]");
        this.subscribeToAdobeStatusCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'S abonner à Adobe Status')]");
        this.creativeCloudTutorialsCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriels Creative Cloud')]");
        this.adobeExperienceLeagueCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Chile
        this.helpCentreCl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallCl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Colombia
        this.helpCentreCo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallCo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Costa Rica
        this.helpCentreCr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallCr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Ecuador
        this.helpCentreEc = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallEc = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Guatemala
        this.helpCentreGt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallGt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Latin-America
        this.helpCentreLa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallLa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Mexico
        this.helpCentreMx = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallMx = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Peru
        this.helpCentrePe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallPe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeaguePe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Peurto Rico
        this.helpCentrePr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallPr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeaguePr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Africa-English
        this.helpCentreAf = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.downloadAndInstallAf = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.contactAf = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.manageMyAccountAF = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusAf = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsAf = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Belgique-French
        this.helpCentreBeFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centre d aide')])[1]");
        this.downloadAndInstallationBeFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Téléchargement et installation')])[1]");
        this.contactUsBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Nous contacter')]");
        this.accountManagementBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestion du compte')]");
        this.formulaManagementBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestion de la formule')]");
        this.creativeCloudTutorialsBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriels Creative Cloud')]");
        this.adobeExperienceLeagueBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Belgium-English
        this.helpCentreBeEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.downloadAndInstallationBeEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.contactUsBeEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.accountManagementBeEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusBeEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsBeEn = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Belgie-Nederlands
        this.helpCentreBeNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Help Center')])[1]");
        this.downloadAndInstallationBeNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Downloaden en installeren')])[1]");
        this.contactBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contact opnemen')]");
        this.manageMyAccountBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Mijn account beheren')]");
        this.signInToAdobeStatusBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aanmelden bij Adobe Status')]");
        this.creativeCloudTutorialsBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueBeNl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Danmark
        this.helpCentreDk = page.locator("//div[@daa-lh='Hjælp og support']//descendant::a[contains(@daa-ll, 'Hjælpecenter')]");
        this.downloadAndInstallationDk = page.locator("//div[@daa-lh='Hjælp og support']//descendant::a[contains(@daa-ll, 'Download og installér')]");
        this.contactUsDk = page.locator("//div[@daa-lh='Hjælp og support']//descendant::a[contains(@daa-ll, 'Kontakt os')]");
        this.manageMyAccountDk = page.locator("//div[@daa-lh='Almindelige opgaver']//descendant::a[contains(@daa-ll, 'Administrer min konto')]");
        this.subscribeToAdobeStatusDk = page.locator("//div[@daa-lh='Almindelige opgaver']//descendant::a[contains(@daa-ll, 'Abonnér på Adobe Status')]");
        this.creativeCloudTutorialsDk = page.locator("//div[@daa-lh='Læringsressourcer']//descendant::a[contains(@daa-ll, 'Creative Cloud selvstudier')]");
        this.adobeExperienceLeagueDk = page.locator("//div[@daa-lh='Læringsressourcer']//descendant::a[contains(@daa-ll, 'Adobe Experience League')]");

        //Eesti
        this.helpCentreEe = page.locator("//div[@daa-lh='Abi ja tugi']//descendant::a[contains(@daa-ll, 'Abikeskus')]");
        this.downloadAndInstallEe = page.locator("//div[@class='feds-cta-wrapper']//descendant::a[contains(@daa-ll, 'Allalaadimine ja installimine')]");
        this.contactUsEe = page.locator("//div[@class='feds-cta-wrapper']//descendant::a[contains(@daa-ll, 'Võtke meiega ühendust')]");
        this.manageMyAccountEe = page.locator("//div[@daa-lh='Igapäevased ülesanded']//descendant::a[contains(@daa-ll, 'Oma konto haldamine')]");
        this.subscribeToAdobeStatusEe = page.locator("//div[@daa-lh='Igapäevased ülesanded']//descendant::a[contains(@daa-ll, 'Tellige Adobe Status')]");
        this.creativeCloudGuidelinesEe = page.locator("//div[@daa-lh='Õppematerjalid']//descendant::a[contains(@daa-ll, 'Creative Cloudi juhised')]");
        this.adobeExperienceLeagueEe = page.locator("//div[@daa-lh='Õppematerjalid']//descendant::a[contains(@daa-ll, 'Adobe Experience League')]");

        //Egytp-English
        this.helpCentreEgEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.downloadAndInstallEgEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.contactUsEgEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.manageMyAccountEgEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusEgEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsEgEn = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Espana
        this.helpCentreEs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[1]");
        this.downloadAndInstallEs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[1]");
        this.contactEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Contacto')]");
        this.manageMyAccountEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Gestionar mi cuenta')]");
        this.subscribeToAdobeStatusEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Suscríbete a Adobe Status')]");
        this.creativeCloudTutorialsEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tutoriales de Creative Cloud')]");
        this.adobeExperienceLeagueEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Greece-English
        this.helpCentreGrEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.downloadAndInstallGrEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.contactGrEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.manageMyAccountGrEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusGrEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsGrEn = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Greece
        this.helpCentreGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Κέντρο βοήθειας')])[1]");
        this.downloadAndInstallGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Λήψη και εγκατάσταση')])[1]");
        this.contactGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Επικοινωνία')]");
        this.manageMyAccountGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Διαχείριση του λογαριασμού μου')]");
        this.signupForAdobeStatusGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Εγγραφείτε στο Adobe Status')]");
        this.creativeCloudTutorialsGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Προγράμματα εκμάθησης του Crea')]");
        this.adobeExperienceLeagueGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Israel
        this.helpCentreIe = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.downloadAndInstallIe = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll, 'Download and install')]");
        this.contactIe = page.locator("//div[@class='feds-cta-wrapper']/descendant::a[contains(@daa-ll, 'Contact us')]");
        this.manageMyAccountIe = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusIe = page.locator("//a[contains(@daa-ll, 'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsIe = page.locator("//a[contains(@daa-ll, 'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueIe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Israel-English
        this.helpCentreIlEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.downloadAndInstallIlEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.contactIlEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.manageMyAccountIlEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusIlEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsIlEn = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Kuwait-English
        this.helpCentreKwEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.downloadAndInstallKwEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Download and install')]");
        this.contactKwEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Contact us')]");
        this.manageMyAccountKwEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Manage my account')]");
        this.subscribeToAdobeStatusKwEn = page.locator("//div[@daa-lh='Common tasks']/descendant::a[contains(@daa-ll,'Subscribe to Adobe Status')]");
        this.creativeCloudTutorialsKwEn = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");
        this.adobeExperienceLeagueKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Latvija
        this.helpCentreLv = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Palīdzības centrs')])[1]");
        this.downloadAndInstallLv = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Lejupielāde un instalēšana')])[1]");
        this.contactUsLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Sazinieties ar mums')]");
        this.manageMyAccountLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Pārvaldīt manu kontu')]");
        this.subscribeToAdobeStatusLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Abonēt Adobe Status')]");
        this.creativeCloudTutorialsLv = page.locator("//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Creative Cloud pamācības')]");
        this.adobeExperienceLeagueLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Experience League')]");

        //Lietuva
        this.helpCentreLt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Žinyno centras')])[1]");
        this.manageMyAccountLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Tvarkyti mano paskyrą')]");
        this.creativeCloudTrainingToolsLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud mokymo priemonė')]");

        //Luxembourg-Deutsch
        this.helpCentreLuDe = page.locator("(//a[contains(@daa-ll,'Hilfezentrum von Adobe')])[1]");
        this.manageMyAccountLuDe = page.locator("//a[contains(@daa-ll,'Konto verwalten')]");
        this.creativeCloudTrainingToolsLuDe = page.locator("//div[@daa-lh='Training']/descendant::a[contains(@daa-ll,'Creative Cloud Tutorials')]");

        //Luxembourg-English
        this.helpCentreLuEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.manageMyAccountLuEn = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsLuEn = page.locator("//div[@daa-lh='Learning resources']/descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Luxembourg-French
        this.helpCentreLuFr = page.locator("(//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Centre d aide')])[1]");
        this.accountManagementLuFr = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Gestion du compte')]");
        this.creativeCloudTutorialsLuFr = page.locator("//div[@class='feds-menu-section']//descendant::a[contains(@daa-ll,'Tutoriels Creative Cloud')]");

        //Hungary
        this.helpCentreHu = page.locator("(//a[contains(@daa-ll,'Súgóközpont')])[1]");
        this.manageYourAccountHu = page.locator("//a[contains(@daa-ll,'Saját fiók kezelése')]");
        this.creativeCloudTutorialsHu = page.locator("//a[contains(@daa-ll,'Creative Cloud oktatóanyagok')]");

        //Middle East and North Africa - English
        this.helpCentreMenaEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountMenaEn = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsMenaEn = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Nigeria
        this.helpCenterNg = page.locator("(//a[contains(@daa-ll,'Help Centre')])[1]");
        this.manageMyAccountNg = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsNg = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Nederlands
        this.helpCenterNl = page.locator("//div[@daa-lh='Help en ondersteuning']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountNl = page.locator("//a[contains(@daa-ll,'Mijn account beheren')]");
        this.creativeCloudTutorialsNl = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Norway
        this.helpCenterNo = page.locator("(//a[contains(@daa-ll,'Hjelpesenter')])[1]");
        this.manageMyAccountNo = page.locator("//a[contains(@daa-ll,'Håndter min konto')]");
        this.creativeCloudTrainingMaterialsNo = page.locator("//a[contains(@daa-ll,'Creative Cloud opplæringsmater')]");

        //Poland
        this.helpCenterPl = page.locator("//div[@daa-lh='Pomoc i obsługa techniczna']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageYourAccountPl = page.locator("//a[contains(@daa-ll,'Zarządzaj kontem')]");
        this.creativeCloudTutorialsPl = page.locator("//a[contains(@daa-ll,'Samouczki dotyczące usługi Cre')]");

        //Portugal
        this.helpCenterPt = page.locator("(//a[contains(@daa-ll,'Centro de Ajuda')])[1]");
        this.manageYourAccountPt = page.locator("//a[contains(@daa-ll,'Gerenciar minha conta')]");
        this.creativeCloudTutorialsPt = page.locator("//a[contains(@daa-ll,'Tutoriais da Creative Cloud')]");

        //Qatar-English
        this.helpCentreQaEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountQaEn = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsQaEn = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Romania
        this.helpCentreRo = page.locator("(//a[contains(@daa-ll,'Centru de asistență')])[1]");
        this.personalAccountAdministratorRo = page.locator("//a[contains(@daa-ll,'Administrare cont personal')]");
        this.creativeCloudTutorialsRo = page.locator("//a[contains(@daa-ll,'Tutoriale Creative Cloud')]");

        //Saudi Arabia-English
        this.helpCentreSaEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountSaEn = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsSaEn = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Schweiz
        this.helpCentreChDe = page.locator("(//a[contains(@daa-ll,'Hilfezentrum von Adobe')])[1]");
        this.manageAccountChDe = page.locator("//a[contains(@daa-ll,'Konto verwalten')]");
        this.creativeCloudTutorialsChDe = page.locator("//a[contains(@daa-ll,'Creative Cloud Tutorials')]");

        //Slovenija
        this.helpCentreSi = page.locator("(//a[contains(@daa-ll,'Center za pomoč')])[1]");
        this.accountManagementSi = page.locator("//a[contains(@daa-ll,'Upravljanje računa')]");
        this.creativeCloudTutorialsSi = page.locator("//a[contains(@daa-ll,'Vadnice za Creative Cloud')]");

        //Slovensko
        this.helpCentreSk = page.locator("(//a[contains(@daa-ll,'Centrum pomoci')])[1]");
        this.accountManagementSk = page.locator("//a[contains(@daa-ll,'Správa konta')]");
        this.coursesForCreativeCloudSk = page.locator("//a[contains(@daa-ll,'Kurzy pre Creative Cloud')]");

        //South Africa
        this.helpCentreZa = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Centre')]");
        this.manageMyAccountZa = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsZa = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Swiss
        this.helpCentreChFr = page.locator("(//a[contains(@daa-ll,'Centre d aide')])[1]");
        this.manageMyAccountChFr = page.locator("//a[contains(@daa-ll,'Gestion du compte')]");
        this.creativeCloudTutorialsChFr = page.locator("//a[contains(@daa-ll,'Tutoriels Creative Cloud')]");

        //Suomi
        this.helpCentreFi = page.locator("//div[@daa-lh='Apu ja tuki']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageYourOwnAccountFi = page.locator("//a[contains(@daa-ll,'Oman tilin hallinta')]");
        this.creativeCloudTutorialsFi = page.locator("//a[contains(@daa-ll,'Creative Cloud opastusohjelmat')]");

        //Svergie
        this.helpCentreSe = page.locator("//div[@daa-lh='Hjälp och support']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountSe = page.locator("//a[contains(@daa-ll,'Hantera mitt konto')]");
        this.creativeCloudTutorialsSe = page.locator("//a[contains(@daa-ll,'Självstudiekurser för Creative')]");

        //Svizzera
        this.resourceCenterChIt = page.locator("(//a[contains(@daa-ll,'Centro risorse')])[2]");
        this.accountManagementChIt = page.locator("//a[contains(@daa-ll,'Gestione account')]");
        this.creativeCloudTutorialChIt = page.locator("//a[contains(@daa-ll,'Tutorial su Creative Cloud')]");

        //Turkey
        this.helpCenterTr = page.locator("(//a[contains(@daa-ll,'Yardım Merkezi')])[1]");
        this.manageMyAccountTr = page.locator("//a[contains(@daa-ll,'Hesabımı yönet')]");
        this.creativeCloudTrainingTr = page.locator("//a[contains(@daa-ll,'Creative Cloud eğitimleri')]");

        //United Arab Emirates - English
        this.helpCenterAeEn = page.locator("//div[@daa-lh='Help and support']/descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountAeEn = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTrainingAeEn = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //United Kingdom
        this.helpCenterUk = page.locator("(//a[contains(@daa-ll,'Help Centre')])[1]");
        this.manageMyAccountUk = page.locator("//a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTrainingUk = page.locator("//a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Austria
        this.adobeHelpCenterAt = page.locator("(//a[contains(@daa-ll,'Hilfezentrum von Adobe')])[1]");
        this.manageAccountAt = page.locator("//a[contains(@daa-ll,'Konto verwalten')]");
        this.creativeCloudTrainingAt = page.locator("//a[contains(@daa-ll,'Creative Cloud Tutorials')]");

        //Czech Republic
        this.helpCenterCz = page.locator("(//a[contains(@daa-ll,'Centrum nápovědy')])[1]");
        this.manageAccountCz = page.locator("//a[contains(@daa-ll,'Spravovat účet')]");
        this.tutorialsForCreativeCloudCz = page.locator("//a[contains(@daa-ll,'Výukové lekce pro Creative Clo')]");

        //Bulgaria
        this.helpCenterBg = page.locator("(//a[contains(@daa-ll,'Помощен център')])[1]");
        this.manageMyAccountBg = page.locator("//a[contains(@daa-ll,'Управление на моя акаунт')]");
        this.creativeCloudTutorialsBg = page.locator("//a[contains(@daa-ll,'Самоучители за Creative Cloud')]");

        //Russia
        this.helpCenterRu = page.locator("(//a[contains(@daa-ll,'Справочный центр')])[1]");
        this.accountManagementRu = page.locator("//a[contains(@daa-ll,'Управление учетной записью')]");
        this.creativeCloudTutorialsRu = page.locator("//a[contains(@daa-ll,'Учебные пособия по Creative Cl')]");

        //Ukraine
        this.helpCenterUa = page.locator("(//a[contains(@daa-ll,'Центр довідки')])[1]");
        this.managingMyAccountUa = page.locator("//a[contains(@daa-ll,'Керування моїм обліковим запис')]");
        this.creativeCloudGuidesUa = page.locator("//a[contains(@daa-ll,'Посібники Creative Cloud')]");

        //Israel Hebrew
        this.helpCenterIlHe = page.locator("(//a[contains(@daa-ll,'מרכז העזרה')])[1]");
        this.manageMyAccountIlHe = page.locator("//a[contains(@daa-ll,'ניהול החשבון שלי')]");
        this.creativeCloudTutorialsIlHe = page.locator("//a[contains(@daa-ll,'ערכות לימוד של Creative Cloud')]");

        //United Arab Emirates
        this.helpCenterAeAr = page.locator("(//a[contains(@daa-ll,'مركز المساعدة')])[1]");
        this.manageMyAccountAeAr = page.locator("//a[contains(@daa-ll,'إدارة حسابي')]");
        this.creativeCloudTutorialsAeAr = page.locator("//a[contains(@daa-ll,'البرامج التعليمية لـ Creative')]");

        //Middle East And North Africa
        this.helpCenterMenaAr = page.locator("(//a[contains(@daa-ll,'مركز المساعدة')])[1]");
        this.manageMyAccountMenaAr = page.locator("//a[contains(@daa-ll,'إدارة حسابي')]");
        this.creativeCloudTutorialsMenaAr = page.locator("//a[contains(@daa-ll,'البرامج التعليمية لـ Creative')]");

        //Saudi Arabia
        this.helpCenterSaAr = page.locator("(//a[contains(@daa-ll,'مركز المساعدة')])[1]");
        this.manageMyAccountSaAr = page.locator("//a[contains(@daa-ll,'إدارة حسابي')]");
        this.creativeCloudTutorialsSaAr = page.locator("//a[contains(@daa-ll,'البرامج التعليمية لـ Creative')]");

        //Egypt
        this.helpCenterEgAr = page.locator("(//a[contains(@daa-ll,'مركز المساعدة')])[1]");
        this.manageMyAccountEgAr = page.locator("//a[contains(@daa-ll,'إدارة حسابي')]");
        this.creativeCloudTutorialsEgAr = page.locator("//a[contains(@daa-ll,'البرامج التعليمية لـ Creative')]");

        //Kuwait
        this.helpCenterKwAr = page.locator("(//a[contains(@daa-ll,'مركز المساعدة')])[1]");
        this.manageMyAccountKwAr = page.locator("//a[contains(@daa-ll,'إدارة حسابي')]");
        this.creativeCloudTutorialsKwAr = page.locator("//a[contains(@daa-ll,'البرامج التعليمية لـ Creative')]");

        //Qatar
        this.helpCenterQaAr = page.locator("(//a[contains(@daa-ll,'مركز المساعدة')])[1]");
        this.manageMyAccountQaAr = page.locator("//a[contains(@daa-ll,'إدارة حسابي')]");
        this.creativeCloudTutorialsQaAr = page.locator("//a[contains(@daa-ll,'البرامج التعليمية لـ Creative')]");

        //Australia
        this.helpCenterAu = page.locator("//div[@daa-lh='Help and support']//descendant::a[contains(@daa-ll,'Help Centre')]");
        this.manageMyAccountAu = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsAu = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Hong Kong
        this.helpCenterHkEn = page.locator("//div[@daa-lh='Help and support']//descendant::a[contains(@daa-ll,'Help Centre')]");
        this.manageMyAccountHkEn = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsHkEn = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //India
        this.helpCenterIn = page.locator("//div[@daa-lh='Help and support']//descendant::a[contains(@daa-ll,'Help Centre')]");
        this.manageMyAccountIn = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsIn = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Indonesia
        this.helpCenterIdId = page.locator("//div[@daa-lh='Bantuan dan dukungan']//descendant::a[contains(@daa-ll,'Pusat Bantuan')]");
        this.manageMyAccountIdId = page.locator("//div[@daa-lh='Tugas umum']//descendant::a[contains(@daa-ll,'Kelola akun saya')]");
        this.tutorialCreativeCloudIdId = page.locator("//div[@daa-lh='Sumber daya pembelajaran']//descendant::a[contains(@daa-ll,'Tutorial Creative Cloud')]");

        //Indonesia - English
        this.helpCenterIdEn = page.locator("//div[@daa-lh='Help and support']//descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountIdEn = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsIdEn = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Malaysia
        this.helpCenterMyMs = page.locator("//div[@daa-lh='Bantuan dan sokongan']//descendant::a[contains(@daa-ll,'Pusat Bantuan')]");
        this.manageMyAccountMyMs = page.locator("//div[@daa-lh='Tugas biasa']//descendant::a[contains(@daa-ll,'Urus akaun saya')]");
        this.creativeCloudTutorialsMyMs = page.locator("//div[@daa-lh='Sumber pembelajaran']//descendant::a[contains(@daa-ll,'Tutorial Creative Cloud')]");

        //Malaysia - English
        this.helpCenterMyEn = page.locator("//div[@daa-lh='Help and support']//descendant::a[contains(@daa-ll,'Help Centre')]");
        this.manageMyAccountMyEn = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsMyEn = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //New Zealand
        this.helpCenterNz = page.locator("//div[@daa-lh='Help and support']//descendant::a[contains(@daa-ll,'Help Centre')]");
        this.manageMyAccountNz = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsNz = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Philippines - English
        this.helpCenterPhEn = page.locator("//div[@daa-lh='Help and support']//descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountPhEn = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsPhEn = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Philippines
        this.helpCenterPhFil = page.locator("//div[@daa-lh='Tulong at suporta']//descendant::a[contains(@daa-ll,'Help Center')]");
        this.manageMyAccountPhFil = page.locator("//div[@daa-lh='Mga karaniwang gawain']//descendant::a[contains(@daa-ll,'I manage ang account ko')]");
        this.creativeCloudTutorialsPhFil = page.locator("//div[@daa-lh='Mga resource para sa pag aaral']//descendant::a[contains(@daa-ll,'Mga tutorial sa Creative Cloud')]");

        //Singapore
        this.helpCenterSg = page.locator("//a[contains(@daa-ll,'Help Centre')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountSg = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsSg = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Thailand - English
        this.helpCenterThEn = page.locator("//a[contains(@daa-ll,'Help Center')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountThEn = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsThEn = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Vietnam - English
        this.helpCenterVnEn = page.locator("//a[contains(@daa-ll,'Help Center')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountVnEn = page.locator("//div[@daa-lh='Common tasks']//descendant::a[contains(@daa-ll,'Manage my account')]");
        this.creativeCloudTutorialsVnEn = page.locator("//div[@daa-lh='Learning resources']//descendant::a[contains(@daa-ll,'Creative Cloud tutorials')]");

        //Vietnam
        this.helpCenterVnVi = page.locator("//a[contains(@daa-ll,'Trung tâm trợ giúp')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountVnVi = page.locator("//div[@daa-lh='Các tác vụ phổ biến']//descendant::a[contains(@daa-ll,'Quản lý tài khoản của tôi')]");
        this.creativeCloudGuideVnVi = page.locator("//div[@daa-lh='Tài nguyên học tập']//descendant::a[contains(@daa-ll,'Hướng dẫn về Creative Cloud')]");

        //India - Hindi
        this.helpCenterInHi = page.locator("//a[contains(@daa-ll,'मदद केंद्र')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountInHi = page.locator("//div[@daa-lh='सामान्य काम']//descendant::a[contains(@daa-ll,'मेरा अकाउंट मैनेज करें')]");
        this.creativeCloudTutorialsInHi = page.locator("//div[@daa-lh='लर्निंग रिसोर्सेज़']//descendant::a[contains(@daa-ll,'Creative Cloud ट्यूटोरियल्स')]");

        //Thailand
        this.helpCenterThTh = page.locator("//a[contains(@daa-ll,'Help Center')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountThTh = page.locator("//div[@daa-lh='งานทั่วไป']//descendant::a[contains(@daa-ll,'จัดการบัญชีของฉัน')]");
        this.creativeCloudTutorialsThTh = page.locator("//div[@daa-lh='ทรัพยากรการเรียนรู้']//descendant::a[contains(@daa-ll,'บทช่วยสอน Creative Cloud')]");

        //Hong Kong
        this.helpCenterHkZh = page.locator("//a[contains(@daa-ll,'支援中心')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountHkZh = page.locator("//div[@daa-lh='一般工作']//descendant::a[contains(@daa-ll,'管理我的帳戶')]");
        this.creativeCloudTutorialsHkZh = page.locator("//div[@daa-lh='學習資源']//descendant::a[contains(@daa-ll,'Creative Cloud 教學課程')]");

        //Taiwan
        this.helpCenterTw = page.locator("//a[contains(@daa-ll,'支援中心')]//descendant::div[@class='feds-navLink-content']");
        this.manageMyAccountTw = page.locator("//div[@daa-lh='一般工作']//descendant::a[contains(@daa-ll,'管理我的帳戶')]");
        this.creativeCloudTutorialsTw = page.locator("//div[@daa-lh='學習資源']//descendant::a[contains(@daa-ll,'Creative Cloud 教學課程')]");

        //Korea
        this.helpCenterKr = page.locator("//a[contains(@daa-ll,'도움말 센터')]//descendant::div[@class='feds-navLink-content']");
        this.accountManagementKr = page.locator("//div[@daa-lh='일반 작업']//descendant::a[contains(@daa-ll,'계정 관리')]");
        this.creativeCloudTutorialsKr = page.locator("//div[@daa-lh='학습 리소스']//descendant::a[contains(@daa-ll,'Creative Cloud 튜토리얼')]");

        //Footer Elements 
        //Argentina
        this.footerCreativeCloud = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProducts = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForBusiness = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañía')]");
        this.footerAcrobatForBusiness = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachers = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y')]");
        this.footerDigitalLearning = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSApps = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidApps = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloud = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUse = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstall = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[2]");
        this.footerOriginalSoftware = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlog = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloper = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccount = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAbout = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrity = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Unites States
        this.footerCreativeCloudUS = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]"); 
        this.footerViewAllProductsUS = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for business')]");
        this.footerDiscountsForStudentsAndTeachersUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digital Learning Solutions')]");
        this.footerAppsforiOSUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerAppsforAndroidUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for Android')]");
        this.footerWhatIsExperienceCloudUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerTermsOfUseUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Terms of Use')]");
        this.footerDownloadAndInstallUS = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerGenuineSoftwareUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Genuine software')]");
        this.footerAdobeBlogUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");
        this.footerIntegrityUS = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrity')]");

        //France
        this.footerCreativeCloudFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerSeeAllProductsFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Voir tous les produits')])[4]");
        this.footerCreativeCloudForBusinessFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud pour les entrep')]");
        this.footerAcrobatForBusinessFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat pour les entreprises')]");
        this.footerDiscountsForStudentsCommunityAndFacultyFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Remises pour la communauté étu')]");
        this.footerDigitalLearningSolutionsFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solutions de formation digital')]");
        this.footerAppsforiOSFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Applications pour iOS')]");
        this.footerAppsforAndroidFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Applications pour Android')]");
        this.footerWhatIsExperienceCloudFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qu est ce qu Experience Cloud')]");
        this.footerTermsOfUseFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Conditions d utilisation')]");
        this.footerDownloadAndInstallationFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Téléchargement et installation')])[2]");
        this.footerApplicationAuthenticityFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Authenticité des applications')]");
        this.footerAdobeBlogFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog Adobe')]");
        this.footerAdobeDeveloperFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerSigninToYourAccountFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Connectez vous à votre compte')]");
        this.footerAboutFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'À propos de')]");
        this.footerIntegrityFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Intégrité')]");

        //Germany
        this.footerCreativeCloudGr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerviewAllProductsGr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Alle Produkte anzeigen')])[4]");
        this.footerCreativeCloudForBusinessGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud für Business')]");
        this.footerAcrobatForBusinessUsersGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat für Business Anwender')]");
        this.footerDiscountsForPupilsStudentsAndTeachersGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Rabatte für Schüler Studierend')]");
        this.footereLearningGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'E Learning')]");
        this.footermobileAppsForiOSGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Mobile Apps für iOS')]");
        this.footermobileAppdForAndroidGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Mobile Apps für Android')]");
        this.footerWhatIsExperienceCloudGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Was ist Experience Cloud')]");
        this.footerTermsOfUseGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Nutzungsbedingungen')]");
        this.footerDownloadAndInstallGr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download und Installation')])[2]");
        this.footerOriginalAdobeSoftwareGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Original Adobe Software')]");
        this.footerAdobeBlogGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDevelopersGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerloginToYourAccountGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Anmeldung bei deinem Konto')]");
        this.footerCancelContractsHereGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Verträge hier kündigen')]");
        this.footerAboutAdobeGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Über Adobe')]");
        this.footerIntegrityGr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrität')]");

        //Japan
        this.footerCreativeCloudJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[4]");
        this.footerSeeAllProductsJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'すべての製品を見る')])[4]");
        this.footerForCorporatesJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'法人向け')])[3]");
        this.footerContactPhoneJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'お問い合わせ電話・フォーム')]");
        this.footerDiscountsForStudentsAndTeachersJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'学生および教職員向けの割引')]");
        this.footerDigitalLearningSolutionJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'デジタルラーニングソリューション')]");
        this.footeriOSVersionAppJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'iOS版アプリ')]");
        this.footerAndroidVersionAppsJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Android版アプリ')]");
        this.footerWhatIsExperienceCloudJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Experience Cloudの構成内容')]");
        this.footerTermsOfUseJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'利用条件')]");
        this.footerDownloadAndInstallJp = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'ダウンロードとインストール')])[2]");
        this.footerGenuineSoftwareJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'正規ソフトウェア')]");
        this.footerAdobeBlogJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'お使いのアカウントでログイン')]");
        this.footerAboutAdobeJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'アドビについて')]");
        this.footerCorporateEthicsJp = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'企業倫理')]");

        //Italy
        this.footerCreativeCloudIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerViewAllProductsIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Visualizza tutti i prodotti')])[4]");
        this.footerCreativeCloudForBusinessIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud per aziende')]");
        this.footerAcrobatForBusinessIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for business')]");
        this.footerDiscountsForStudentsAndTeachersIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sconti per studenti e docenti')]");
        this.footerDigitalLearningSolutionsIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Soluzioni di digital learning')]");
        this.footerAppsForiOSIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'App per iOS')]");
        this.footerAppsForAndroidIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'App per Android')]");
        this.footerWhatIsExperienceCloudIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Cos è Experience Cloud')]");
        this.footerTermsOfUseIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Condizioni di utilizzo')]");
        this.footerDownloadAndInstallationIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download e installazione')])[2]");
        this.footerauthenticSoftwareIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software autentico')]");
        this.footerAdobeBlogIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog di Adobe')]");
        this.footerAdobeDeveloperIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Accedi al tuo account')]");
        this.footerInformationIt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Informazioni')])[2]");
        this.footerIntegrityIt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrità')]");

        //Brazil
        this.footerCreativeCloudBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerSeeAllProductsBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Veja todos os produtos')])[4]");
        this.footerCreativeCloudForEnterpriseBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para empresas')]");
        this.footeracrobatForBusinessBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para empresas')]");
        this.footerdiscountsForStudentsAndTeachersBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descontos para estudantes e pr')]");
        this.footerdigitalLearningSolutionsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Soluções de aprendizado digita')]");
        this.footeriOSappsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicativos para iOS')]");
        this.footerAndroidappsBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicativos para Android')]");
        this.footerWhatIsExperienceCloudBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'O que é a Experience Cloud')]");
        this.footerTermsOfUseBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Termos de uso')]");
        this.footerDownloadAndInstallBr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Baixar e instalar')])[2]");
        this.footerOriginalSoftwareBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog da Adobe')]");
        this.footerAdobeDeveloperBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLoginToYourAccountBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Fazer logon em sua conta')]");
        this.footerAboutBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Sobre')]");
        this.footerIntergityBr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridade')]");

        //Canada English
        this.footerCreativeCloudCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digital Learning Solutions')]");
        this.footerAppsForiOSCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerAppsForAndroidCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for Android')]");
        this.footerWhatIsExperienceCloudCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerTermsOfUseCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Terms of Use')]");
        this.footerDownloadAndInstallCa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerGenuineSoftwareCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Genuine software')]");
        this.footerAdobeBlogCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");
        this.footerIntegrityCa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrity')]");

        //Canada French
        this.footerCreativeCloudCaFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsCaFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Voir tous les produits')])[4]");
        this.footerCreativeCloudForBusinessCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud pour les entrep')]");
        this.footerAcrobatForBusinessCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat pour les entreprises')]");
        this.footerDiscountsForStudentsAndFacultyCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Remises pour la communauté étu')]");
        this.footerDigitalLearningSolutionsCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solutions de formation numériq')]");
        this.footerAppsForiOSCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Applications pour iOS')]");
        this.footerAppsForAndroidCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Applications pour Android')]");
        this.footerWhatIsExperienceCloudCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qu est ce qu Experience Cloud')]");
        this.footerTermsOfUseCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Conditions d utilisation')]");
        this.footerDownloadAndInstallationCaFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Téléchargement et installation')])[2]");
        this.footerApplicationAuthenticityCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Authenticité des applications')]");
        this.footerAdobeBlogCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blogue Adobe')]");
        this.footerAdobeDeveloperCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Connectez vous à votre compte')]");
        this.footerAboutCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'À propos de')]");
        this.footerIntegrityCaFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Intégrité')]");

        //Chile
        this.footerCreativeCloudCl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerSeeAllProductsCl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallCl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwareCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityCl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Colombia
        this.footerCreativeCloudCo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsCo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallCo = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwareCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityCo = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Costa Rica
        this.footerCreativeCloudCr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsCr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallCr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwareCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityCr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Ecuador
        this.footerCreativeCloudEc = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsEc = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallEc = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwareEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityEc = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Guatemala
        this.footerCreativeCloudGt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsGt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallGt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwareGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityGt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Latin-America
        this.footerCreativeCloudLa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsLa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallLa = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwareLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityLa = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Mexico
        this.footerCreativeCloudMx = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsMx = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallMx = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwareMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityMx = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Peru
        this.footerCreativeCloudPe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsPe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForBusinessPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para empresas')]");
        this.footerAcrobatForBusinessPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para empresas')]");
        this.footerDiscountsForStudentsAndTeachersPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y')]");
        this.footerDigitalLearningPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUsePe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallPe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwarePe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityPe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Peurto Rico
        this.footerCreativeCloudPr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsPr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForCompaniesPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para compañías')]");
        this.footerAcrobatForCompaniesPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para compañías')]");
        this.footerDiscountsForStudentsAndTeachersPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y ')]");
        this.footerDigitalLearningPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUsePr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Términos de uso')]");
        this.footerDownloadAndInstallPr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Centro de ayuda')])[2]");
        this.footerOriginalSoftwarePr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia la sesión en tu cuenta')]");
        this.footerAboutPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de')]");
        this.footerIntegrityPr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Africa-English
        this.footerCreativeCloudAf = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerViewAllProductsAf = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digital Learning Solutions')]");
        this.footerAppsForiOSAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerAppsForAndroisAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for Android')]");
        this.footerWhatIsExperienceCloudAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerTermsOfUseAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Terms of Use')]");
        this.footerDownloadAndInstallAf = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerGenuineSoftwareAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Genuine software')]");
        this.footerAdobeBlogAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");
        this.footerIntegrityAf = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrity')]");

        //Belgique-French
        this.footerCreativeCloudBeFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerSeeAllProductsBeFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Voir tous les produits')])[4]");
        this.footerCreativeCloudForBusinessBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud pour les entrep')]");
        this.footerAcrobatForBusinessBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat pour les entreprises')]");
        this.footerDiscountsForStudentsCommunityAndFacultyBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Remises pour la communauté étu')]");
        this.footerDigitalTrainingSolutionsBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Solutions de formation digital')]");
        this.footerAppsForiOSBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Applications pour iOS')]");
        this.footerAppsForAndroisBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Applications pour Android')]");
        this.footerWhatIsExperienceCloudBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qu est ce qu Experience Cloud')]");
        this.footerTermsOfUseBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Conditions d utilisation')]");
        this.footerDownloadAndInstallBeFr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Téléchargement et installation')])[2]");
        this.footerApplicationAuthenticityBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Authenticité des applications')]");
        this.footerAdobeBlogBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog Adobe')]");
        this.footerAdobeDeveloperBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerSignInToYourAccountBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Connectez vous à votre compte')]");
        this.footerAboutBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'À propos de')]");
        this.footerIntegrityBeFr = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Intégrité')]");

        //Belgium-English
        this.footerCreativeCloudBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsBeEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessBeEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessBeEn = page.locator("//a[contains(@daa-ll, 'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersBeEn = page.locator("//a[contains(@daa-ll, 'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsBeEn = page.locator("//a[contains(@daa-ll, 'Digital Learning Solutions')]");
        this.footerAppsForiOSBeEn = page.locator("//a[contains(@daa-ll, 'Apps for iOS')]");
        this.footerAppsForAndroisBeEn = page.locator("//a[contains(@daa-ll, 'Apps for Android')]");
        this.footerWhatIsExperienceCloudBeEn = page.locator("//a[contains(@daa-ll, 'What is Experience Cloud')]");
        this.footerTermsOfUseBeEn = page.locator("//a[contains(@daa-ll, 'Terms of Use') and @href='/go/experiencecloudterms']");
        this.footerDownloadAndInstallBeEn = page.locator("(//a[contains(@daa-ll, 'Download and install')])[2]");
        this.footerGenuineSoftwareBeEn = page.locator("//a[contains(@daa-ll, 'Genuine software')]");
        this.footerAdobeBlogBeEn = page.locator("//a[contains(@daa-ll, 'Adobe Blog')]");
        this.footerAdobeDeveloperBeEn = page.locator("//a[contains(@daa-ll, 'Adobe Developer')]");
        this.footerLogInToYourAccountBeEn = page.locator("//a[contains(@daa-ll, 'Log in to your account')]");
        this.footerAboutBeEn = page.locator("//a[contains(@daa-ll, 'About')]");
        this.footerIntegrityBeEn = page.locator("//a[contains(@daa-ll, 'Integrity')]");

        //Belgie-Nederlands
        this.footerCreativeCloudBeNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsBeNl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Alle producten bekijken')])[4]");
        this.footerCreativeCloudForBusinessBeNl = page.locator("//a[contains(@daa-ll, 'Creative Cloud voor bedrijven')]");
        this.footerAcrobatForBusinessBeNl = page.locator("//a[contains(@daa-ll, 'Acrobat voor bedrijven')]");
        this.footerDiscountsForStudentsAndTeachersBeNl = page.locator("//a[contains(@daa-ll, 'Kortingen voor studenten en do')]");
        this.footerDigitalLearningSolutionsBeNl = page.locator("//a[contains(@daa-ll, 'Digital Learning oplossingen')]");
        this.footerAppsForiOSBeNl = page.locator("//a[contains(@daa-ll, 'Apps voor iOS')]");
        this.footerAppsForAndroisBeNl = page.locator("//a[contains(@daa-ll, 'Apps voor Android')]");
        this.footerWhatIsExperienceCloudBeNl = page.locator("//a[contains(@daa-ll, 'Wat is Experience Cloud')]");
        this.footerTermsOfUseBeNl = page.locator("(//a[contains(@daa-ll, 'Gebruiksvoorwaarden')])[1]");
        this.footerDownloadAndInstallBeNl = page.locator("(//a[contains(@daa-ll, 'Downloaden en installeren')])[2]");
        this.footerLegitimateSoftwareBeNl = page.locator("//a[contains(@daa-ll, 'Legitieme software')]");
        this.footerAdobeBlogBeNl = page.locator("//a[contains(@daa-ll, 'Adobe blog')]");
        this.footerAdobeDeveloperBeNl = page.locator("//a[contains(@daa-ll, 'Adobe Developer')]");
        this.footerSignInToYourAccountBeNl = page.locator("//a[contains(@daa-ll, 'Meld je aan bij je account')]");
        this.footerInfoBeNl = page.locator("//a[contains(@daa-ll, 'Info')]");
        this.footerIntegrityBeNl = page.locator("//a[contains(@daa-ll, 'Integriteit')]");

        //CIS-English
        this.footerCreativeCloudCISEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[1]");
        this.footerViewAllProductsCISEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')]");
        this.footerCreativeCloudForBusinessCISEn = page.locator("//a[contains(@daa-ll, 'Creative Cloud for business')]");
        this.footerAcrobatForBusinessCISEn = page.locator("//a[contains(@daa-ll, 'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersCISEn = page.locator("//a[contains(@daa-ll, 'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsCISEn = page.locator("//a[contains(@daa-ll, 'Digital Learning Solutions')]");
        this.footerAppsForiOSCISEn = page.locator("//a[contains(@daa-ll, 'Apps for iOS')]");
        this.footerAppsForAndroisCISEn = page.locator("//a[contains(@daa-ll, 'Apps for Android')]");
        this.footerWhatIsExperienceCloudCISEn = page.locator("//a[contains(@daa-ll, 'What is Experience Cloud')]");
        this.footerTermsOfUseCISEn = page.locator("(//a[contains(@daa-ll, 'Terms of Use')])[1]");
        this.footerDownloadAndInstallCISEn = page.locator("//a[contains(@daa-ll, 'Download and install')]");
        this.footerGenuineSoftwareCISEn = page.locator("//a[contains(@daa-ll, 'Genuine software')]");
        this.footerAdobeBlogCISEn = page.locator("//a[contains(@daa-ll, 'Adobe Blog')]");
        this.footerAdobeDeveloperCISEn = page.locator("//a[contains(@daa-ll, 'Adobe Developer')]");
        this.footerLogInToYourAccountCISEn = page.locator("//a[contains(@daa-ll, 'Log in to your account')]");
        this.footerAboutCISEn = page.locator("//a[contains(@daa-ll, 'About')]");
        this.footerIntegrityCISEn = page.locator("//a[contains(@daa-ll, 'Integrity')]");

        //CIS-Russian
        this.footerCreativeCloudCISRu = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[1]");
        this.footerViewAllProductsCISRu = page.locator("//a[contains(@daa-ll, 'Все продукты')]");
        this.footerCreativeCloudForOrganizationCISRu = page.locator("(//a[contains(@daa-ll, 'Creative Cloud для организаций')])[1]");
        this.footerAcrobatForBusinessCISRu = page.locator("//a[contains(@daa-ll, 'Acrobat для бизнеса')]");
        this.footerDiscountsForStudentsAndTeachersCISRu = page.locator("//a[contains(@daa-ll, 'Скидки студентам и преподавате')]");
        this.footerDigitalLearningSolutionsCISRu = page.locator("//a[contains(@daa-ll, 'Решения для цифрового обучения')]");
        this.footeriOSAppsCISRu = page.locator("//a[contains(@daa-ll, 'Приложения для iOS')]");
        this.footerAndroidAppsCISRu = page.locator("//a[contains(@daa-ll, 'Приложения для Android')]");
        this.footerWhatIsExperienceCloudCISRu = page.locator("//a[contains(@daa-ll, 'Что такое Experience Cloud')]");
        this.footerTermsOfUseCISRu = page.locator("(//a[contains(@daa-ll, 'Условия использования')])[1]");
        this.footerDownloadAndInstallCISRu = page.locator("//a[contains(@daa-ll, 'Загрузка и установка')]");
        this.footerLicensedSoftwareCISRu = page.locator("//a[contains(@daa-ll, 'Лицензионное ПО')]");
        this.footerAdobeBlogCISRu = page.locator("//a[contains(@daa-ll, 'Блог Adobe')]");
        this.footerAdobeDeveloperCISRu = page.locator("//a[contains(@daa-ll, 'Adobe Developer')]");
        this.footerLogInToYourAccountCISRu = page.locator("//a[contains(@daa-ll, 'Вход в учетную запись')]");
        this.footerAboutUsCISRu = page.locator("//a[contains(@daa-ll, 'О нас')]");
        this.footerBusinessEthicsCISRu = page.locator("//a[contains(@daa-ll, 'Деловая этика')]");

        //Danmark
        this.footerCreativeCloudDk = page.locator("//div[@daa-lh='Køb for']//descendant::a[contains(@daa-ll, 'Creative Cloud')]");
        this.footerShowAllProductsDk = page.locator("//div[@daa-lh='Køb for']//descendant::a[contains(@daa-ll, 'Vis alle produkter')]");
        this.footerCreativeCloudForBusinessDk = page.locator("//div[@daa-lh='Til virksomheder']//descendant::a[contains(@daa-ll, 'Creative Cloud til virksomhede')]");
        this.footerAcrobatForBusinessDk = page.locator("//div[@daa-lh='Til virksomheder']//descendant::a[contains(@daa-ll, 'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersDk = page.locator("//div[@daa-lh='Til uddannelse']//descendant::a[contains(@daa-ll, 'Rabatter til studerende og lær')]");
        this.footerDigitalLearningSolutionsDk = page.locator("//div[@daa-lh='Til uddannelse']//descendant::a[contains(@daa-ll, 'Digitale læringsløsninger')]");
        this.footeriOSAppsDk = page.locator("//div[@daa-lh='Til mobile enheder']//descendant::a[contains(@daa-ll, 'Apps for iOS')]");
        this.footerAndroidAppsDk = page.locator("//div[@daa-lh='Til mobile enheder']//descendant::a[contains(@daa-ll, 'Apps for Android')]");
        this.footerWhatIsExperienceCloudDk = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll, 'Hvad er Experience Cloud')]");
        this.footerTermsOfUseDk = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll, 'Vilkår for anvendelse')]");
        this.footerDownloadAndInstallDk = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll, 'Download og installér')]");
        this.footerOriginalSoftwareDk = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll, 'Original software')]");
        this.footerAdobeBlogDk = page.locator("//div[@daa-lh='Ressourcer']//descendant::a[contains(@daa-ll, 'Adobe Blog')]");
        this.footerAdobeDeveloperDk = page.locator("//div[@daa-lh='Ressourcer']//descendant::a[contains(@daa-ll, 'Adobe Developer')]");
        this.footerLogInToYourAccountDk = page.locator("//div[@daa-lh='Adobe konto']//descendant::a[contains(@daa-ll, 'Log ind på din konto')]");
        this.footerAboutDk = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll, 'Om')]");
        this.footerIntegrityDk = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll, 'Integritet')]");

        //Eesti
        this.footerCreativeCloudEe = page.locator("//div[@daa-lh='Ostke']//descendant::a[contains(@daa-ll, 'Creative Cloud')]");
        this.footerViewAllProductsEe = page.locator("//div[@daa-lh='Ostke']//descendant::a[contains(@daa-ll, 'Vaadake kõiki tooteid')]");
        this.footerCreativeCloudForBusinessEe = page.locator("//div[@daa-lh='Ettevõtetele']//descendant::a[contains(@daa-ll, 'Creative Cloud ettevõtetele')]");
        this.footerAcrobatForBusinessEe = page.locator("//div[@daa-lh='Ettevõtetele']//descendant::a[contains(@daa-ll, 'Acrobat ettevõtetele')]");
        this.footerDiscountsForStudentsAndTeachersEe = page.locator("//div[@daa-lh='Hariduse jaoks']//descendant::a[contains(@daa-ll, 'Allahindlused õppuritele ja õp')]");
        this.footerDigitalLearningSolutionsEe = page.locator("//div[@daa-lh='Hariduse jaoks']//descendant::a[contains(@daa-ll, 'Digitaalse õppimise lahendused')]");
        this.footeriOSAppsEe = page.locator("//div[@daa-lh='Mobiilseadmetele']//descendant::a[contains(@daa-ll, 'Rakendused iOS ile')]");
        this.footerAndroidAppsEe = page.locator("//div[@daa-lh='Mobiilseadmetele']//descendant::a[contains(@daa-ll, 'Rakendused Androidile')]");
        this.footerWhatIsExperienceCloudEe = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll, 'Mis on Experience Cloud-1')]");
        this.footerTermsOfUseEe = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll, 'Kasutustingimused')]");
        this.footerDownloadAndInstallEe = page.locator("//div[@daa-lh='Tugi']//descendant::a[contains(@daa-ll, 'Allalaadimine ja installimine')]");
        this.footerOriginalSoftwareEe = page.locator("//div[@daa-lh='Tugi']//descendant::a[contains(@daa-ll, 'Originaaltarkvara')]");
        this.footerAdobeBlogEe = page.locator("//div[@daa-lh='Ressursid']//descendant::a[contains(@daa-ll, 'Adobe blogi')]");
        this.footerAdobeDeveloperEe = page.locator("//div[@daa-lh='Ressursid']//descendant::a[contains(@daa-ll, 'Adobe Developer')]");
        this.footerLogInToYourAccountEe = page.locator("//div[@daa-lh='Adobe konto']//descendant::a[contains(@daa-ll, 'Kontosse sisselogimine')]");
        this.footerInformationEe = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll, 'Teave')]");
        this.footerCompletenessEe = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll, 'Terviklikkus')]");

        //Egypt-English
        this.footerCreativeCloudEgEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsEgEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digital Learning Solutions')]");
        this.footerAppsforiOSEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerAppsforAndroidEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for Android')]");
        this.footerWhatIsExperienceCloudEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerTermsOfUseEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Terms of Use')]");
        this.footerDownloadAndInstallEgEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerGenuineSoftwareEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Genuine software')]");
        this.footerAdobeBlogEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");
        this.footerIntegrityEgEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrity')]");

        //Espana
        this.footerCreativeCloudEs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerSeeAllProductsEs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ver todos los productos')])[4]");
        this.footerCreativeCloudForBusinessEs = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud para empresas')])[1]");
        this.footerAcrobatForBusinessEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat para empresas')]");
        this.footerDiscountsForStudentsAndTeachersEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descuentos para estudiantes y')]");
        this.footerDigitalLearningEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aprendizaje digital')]");
        this.footeriOSAppsEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para iOS')]");
        this.footerAndroidAppsEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Aplicaciones para Android')]");
        this.footerWhatIsExperienceCloudEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Qué es Experience Cloud')]");
        this.footerTermsOfUseEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Condiciones de uso')]");
        this.footerDownloadAndInstallES = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Descargar e instalar')])[2]");
        this.footerOriginalSoftwareEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Software original')]");
        this.footerAdobeBlogEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Blog de Adobe')]");
        this.footerAdobeDeveloperEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Inicia sesión')]");
        this.footerAboutAdobeEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acerca de Adobe')]");
        this.footerIntegrityEs = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integridad')]");

        //Greece-English
        this.footerCreativeCloudGrEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsGrEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digital Learning Solutions')]");
        this.footerAppsforiOSGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerAppsforAndroidGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for Android')]");
        this.footerWhatIsExperienceCloudGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerTermsOfUseGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Terms of Use')]");
        this.footerDownloadAndInstallGrEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerGenuineSoftwareGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Genuine software')]");
        this.footerAdobeBlogGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");
        this.footerIntegrityGrEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrity')]");

        //Greece
        this.footerCreativeCloudGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerSeeAllProductsGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Δείτε όλα τα προϊόντα')])[2]");
        this.footerCreativeCloudForBusinessGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud για επιχειρήσει')]");
        this.footerAcrobatForBusinessGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat για επιχειρήσεις')]");
        this.footerDiscountsForStudentsAndTeachersGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Εκπτώσεις για σπουδαστές και κ')]");
        this.footerDigitalLearningSolutionsGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Λύσεις ψηφιακής εκμάθησης')]");
        this.footerAppsforiOSGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Εφαρμογές για iOS')]");
        this.footerAppsforAndroidGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Εφαρμογές για Android')]");
        this.footerWhatIsExperienceCloudGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Τι είναι το Experience Cloud')]");
        this.footerTermsOfUseGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Όροι χρήσης')]");
        this.footerDownloadAndInstallGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Λήψη και εγκατάσταση')])[2]");
        this.footerOriginalSoftwareGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Γνήσιο λογισμικό')]");
        this.footerAdobeBlogGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ιστολόγιο Adobe')]");
        this.footerAdobeDeveloperGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerSignInToYourAccountGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Συνδεθείτε στον λογαριασμό σας')]");
        this.footerInformationGrEl = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Πληροφορίες')])[2]");
        this.footerIntegrityGrEl = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Ακεραιότητα')]");

        //Ireland
        this.footerCreativeCloudIe = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll, 'Creative Cloud')]");
        this.footerViewAllProductsIe = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll, 'View all products')]");
        this.footerCreativeCloudForBusinessIe = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll, 'Creative Cloud for business')]");
        this.footerAcrobatForBusinessIe = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll, 'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersIe = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll, 'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsIe = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll, 'Digital Learning Solutions')]");
        this.footerAppsforiOSIe = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll, 'Apps for iOS')]");
        this.footerAppsforAndroidIe = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll, 'Apps for Android')]");
        this.footerWhatIsExperienceCloudIe = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll, 'What is Experience Cloud')]");
        this.footerTermsOfUseIe = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll, 'Terms of Use')]");
        this.footerDownloadAndInstallIe = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll, 'Download and install')]");
        this.footerGenuineSoftwareIe = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll, 'Genuine software')]");
        this.footerAdobeBlogIe = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll, 'Adobe Blog')]");
        this.footerAdobeDeveloperIe = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll, 'Adobe Developer')]");
        this.footerLogInToYourAccountIe = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll, 'Log in to your account')]");
        this.footerAboutIe = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll, 'About')]");
        this.footerIntegrityIe = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll, 'Integrity')]");

        //Israel-English
        this.footerCreativeCloudIlEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsIlEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digital Learning Solutions')]");
        this.footerAppsforiOSIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerAppsforAndroidIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for Android')]");
        this.footerWhatIsExperienceCloudIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerTermsOfUseIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Terms of Use')]");
        this.footerDownloadAndInstallIlEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerGenuineSoftwareIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Genuine software')]");
        this.footerAdobeBlogIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");
        this.footerIntegrityIlEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrity')]");

        //Kuwait-English
        this.footerCreativeCloudKwEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsKwEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'View all products')])[4]");
        this.footerCreativeCloudForBusinessKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerAcrobatForBusinessKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat for Business')]");
        this.footerDiscountsForStudentsAndTeachersKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerDigitalLearningSolutionsKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digital Learning Solutions')]");
        this.footerAppsforiOSKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerAppsforAndroidKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for Android')]");
        this.footerWhatIsExperienceCloudKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerTermsOfUseKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Terms of Use')]");
        this.footerDownloadAndInstallKwEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerGenuineSoftwareKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Genuine software')]");
        this.footerAdobeBlogKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerAdobeDeveloperKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");
        this.footerIntegrityKwEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integrity')]");

        //Latvija
        this.footerCreativeCloudLv = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerViewAllProductsLv = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Skatīt visus produktus')])[4]");
        this.footerCreativeCloudForEnterpriseLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud uzņēmumiem')]");
        this.footerAcrobatForBusinessLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Acrobat uzņēmumiem')]");
        this.footerDiscountsForPupilsStudentsAndTeachersLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Atlaides skolēniem studentiem')]");
        this.footerDigitalTrainingSolutionsLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Digitālie apmācību risinājumi')]");
        this.footerAppsforiOSDevicesLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Lietotnes iOS ierīcēm')]");
        this.footerAppsforAndroidDevicesLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Lietotnes Android ierīcēm')]");
        this.footerWhatIsExperienceCloudLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Kas ir Experience Cloud')]");
        this.footerTermsOfUseLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Lietošanas noteikumi')]");
        this.footerDownloadAndInstallLv = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Lejupielāde un instalēšana')])[2]");
        this.footerOriginalSoftwareLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Oriģinālā programmatūra')]");
        this.footerAdobeBlogLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe emuārs')]");
        this.footerAdobeDeveloperLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Developer')]");
        this.footerLogInToYourAccountLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Piesakieties savā kontā')]");
        this.footerAboutLv = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Par')])[2]");
        this.footerIntegrityLv = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Integritāte')]");

        //Lietuva
        this.footerCreativeCloudLt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerCreativeCloudForBusinessLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud verslui')]");
        this.footerDiscountsForStudentsAndTeachersLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Nuolaidos studentams ir dėstyt')]");
        this.footerAppsforiOSLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Programos skirtos iOS')]");
        this.footerWhatIsExperienceCloudLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Kas yra Experience Cloud')]");
        this.footerDownloadAndInstallLt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Atsisiųsti ir įdiegti')])[2]");
        this.footerAdobeBlogLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe tinklaraštis')]");
        this.footerSignInToYourAccountLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Prisijunkite prie savo paskyro')]");
        this.footerAboutLt = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apie')]");

        //Luxembourg-Deutsch
        this.footerCreativeCloudLuDe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerCreativeCloudForBusinessLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud für Business')]");
        this.footerDiscountsForPupilsStudentsAndTeachersLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Rabatte für Schüler Studierend')]");
        this.footerAppsforiOSLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Mobile Apps für iOS')]");
        this.footerWhatIsExperienceCloudLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Was ist Experience Cloud')]");
        this.footerDownloadAndInstallLuDe = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download und Installation')])[2]");
        this.footerAdobeBlogLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Anmeldung bei deinem Konto')]");
        this.footerAboutAboutLuDe = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Über Adobe')]");

        //Luxembourg-English
        this.footerCreativeCloudLuEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerCreativeCloudForBusinessLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountsForStudentsAndTeachersLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsforiOSLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallLuEn = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Download and install')])[2]");
        this.footerAdobeBlogLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutAboutLuEn = page.locator("//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'About')]");

        //Luxembourg-French
        this.footerCreativeCloudLuFr = page.locator("//div[@daa-lh='Boutique pour']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessLuFr = page.locator("//div[@daa-lh='Entreprises']//descendant::a[contains(@daa-ll,'Creative Cloud pour les entrep')]");
        this.footerDiscountsForStudentsAndTeachersLuFr = page.locator("//div[@daa-lh='Pour le secteur de l Éducation']//descendant::a[contains(@daa-ll,'Remises pour la communauté étu')]");
        this.footerAppsforiOSLuFr = page.locator("//div[@daa-lh='Pour les appareils mobiles']//descendant::a[contains(@daa-ll,'Applications pour iOS')]");
        this.footerWhatIsExperienceCloudLuFr = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Qu est ce qu Experience Cloud')]");
        this.footerDownloadAndInstallLuFr = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Téléchargement et installation')]");
        this.footerAdobeBlogLuFr = page.locator("//div[@daa-lh='Ressources']//descendant::a[contains(@daa-ll,'Blog Adobe')]");
        this.footerSignInToYourAccountLuFr = page.locator("//div[@daa-lh='Compte Adobe']//descendant::a[contains(@daa-ll,'Connectez vous à votre compte')]");
        this.footerAboutAboutLuFr = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'À propos de')]");

        //Hungary
        this.footerCreativeCloudHu = page.locator("(//div[@class='feds-menu-items']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerCreativeCloudForBusinessHu = page.locator("//a[contains(@daa-ll,'Creative Cloud üzleti felhaszn')]");
        this.footerDiscountsForStudentsAndTeachersHu = page.locator("//a[contains(@daa-ll,'Kedvezmények diákoknak és taná')]");
        this.footeriOSApplicationsHu = page.locator("//a[contains(@daa-ll,'iOS es alkalmazások')]");
        this.footerWhatShouldYouKnowAboutExperienceCloudHu = page.locator("//a[contains(@daa-ll,'Mit érdemes tudni az Experienc')]");
        this.footerDownloadAndInstallHu = page.locator("(//a[contains(@daa-ll,'Letöltés és telepítés')])[2]");
        this.footerAdobeBlogHu = page.locator("//a[contains(@daa-ll,'Adobe blog')]");
        this.footerLogInToYourAccountHu = page.locator("//a[contains(@daa-ll,'Bejelentkezés saját fiókba')]");
        this.footerDescriptionHu = page.locator("//a[contains(@daa-ll,'Ismertető')]");

        //Middle East and North Africa - English
        this.footerCreativeCloudMenaEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessMenaEn = page.locator("//a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountsForStudentsAndTeachersMenaEn = page.locator("//a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSMenaEn = page.locator("//a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatExperienceCloudMenaEn = page.locator("//a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallMenaEn = page.locator("(//a[contains(@daa-ll,'Download and install')])[2]");
        this.footerAdobeBlogMenaEn = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountMenaEn = page.locator("//a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutMenaEn = page.locator("//a[contains(@daa-ll,'About')]");

        //Nigeria
        this.footerCreativeCloudNg = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessNg = page.locator("//a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountsForStudentsAndTeachersNg = page.locator("//a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSNg = page.locator("//a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatExperienceCloudNg = page.locator("//a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallNg = page.locator("(//a[contains(@daa-ll,'Download and install')])[2]");
        this.footerAdobeBlogNg = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountNg = page.locator("//a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutNg = page.locator("//a[contains(@daa-ll,'About')]");

        //Nederlands
        this.footerCreativeCloudNl = page.locator("//div[@daa-lh='Shoppen voor']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessNl = page.locator("//a[contains(@daa-ll,'Creative Cloud voor bedrijven')]");
        this.footerDiscountsForStudentsAndTeachersNl = page.locator("//a[contains(@daa-ll,'Kortingen voor studenten en do')]");
        this.footerAppsForiOSNl = page.locator("//a[contains(@daa-ll,'Apps voor iOS')]");
        this.footerWhatExperienceCloudNl = page.locator("//a[contains(@daa-ll,'Wat is Experience Cloud')]");
        this.footerDownloadAndInstallNl = page.locator("(//a[contains(@daa-ll,'Downloaden en installeren')])[2]");
        this.footerAdobeBlogNl = page.locator("//a[contains(@daa-ll,'Adobe blog')]");
        this.footerSignInToYourAccountNl = page.locator("//a[contains(@daa-ll,'Meld je aan bij je account')]");
        this.footerInfoNl = page.locator("//a[contains(@daa-ll,'Info')]");

        //Norway
        this.footerCreativeCloudNo = page.locator("//div[@daa-lh='Kjøp']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessNo = page.locator("//a[contains(@daa-ll,'Creative Cloud for bedrifter')]");
        this.footerDiscountsForEducationCustomersNo = page.locator("//a[contains(@daa-ll,'Rabatter for utdanningskunder')]");
        this.footerAppsForiOSNo = page.locator("//a[contains(@daa-ll,'Applikasjoner for iOS')]");
        this.footerWhatExperienceCloudNo = page.locator("//a[contains(@daa-ll,'Hva er Experience Cloud')]");
        this.footerDownloadAndInstallNo = page.locator("(//a[contains(@daa-ll,'Laste ned og installere')])[2]");
        this.footerAdobeBlogNo = page.locator("//a[contains(@daa-ll,'Adobe blogg')]");
        this.footerLogInToYourAccountNo = page.locator("//a[contains(@daa-ll,'Logg på kontoen')]");
        this.footerAboutNo = page.locator("//a[contains(@daa-ll,'Om')]");

        //Poland
        this.footerCreativeCloudPl = page.locator("//div[@daa-lh='Kategorie sklepu']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessPl = page.locator("//a[contains(@daa-ll,'Creative Cloud dla firm')]");
        this.footerDiscountsForTeachersPl = page.locator("//a[contains(@daa-ll,'Rabaty dla uczniów i nauczycie')]");
        this.footerAppsForiOSPl = page.locator("//a[contains(@daa-ll,'Aplikacje dla systemu iOS')]");
        this.footerWhatExperienceCloudPl = page.locator("//a[contains(@daa-ll,'Co to jest Experience Cloud')]");
        this.footerDownloadAndInstallPl = page.locator("(//a[contains(@daa-ll,'Pobieranie i instalowanie')])[2]");
        this.footerAdobeBlogPl = page.locator("//a[contains(@daa-ll,'Blog firmy Adobe')]");
        this.footerLogInToYourAccountPl = page.locator("//a[contains(@daa-ll,'Zaloguj się na konto')]");
        this.footerInformationPl = page.locator("//a[contains(@daa-ll,'Informacje')]");

        //Portugal
        this.footerCreativeCloudPt = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[3]");
        this.footerCreativeCloudForEnterprisePt = page.locator("//a[contains(@daa-ll,'Creative Cloud para empresas')]");
        this.footerDiscountsForStudentsAndTeachersPt = page.locator("//a[contains(@daa-ll,'Descontos para estudantes e pr')]");
        this.footerAppsForiOSPt = page.locator("//a[contains(@daa-ll,'Aplicativos para iOS')]");
        this.footerWhatExperienceCloudPt = page.locator("//a[contains(@daa-ll,'O que é a Experience Cloud')]");
        this.footerDownloadAndInstallPt = page.locator("(//a[contains(@daa-ll,'Baixar e instalar')])[2]");
        this.footerAdobeBlogPt = page.locator("//a[contains(@daa-ll,'Blog da Adobe')]");
        this.footerLogInToYourAccountPt = page.locator("//a[contains(@daa-ll,'Fazer logon em sua conta')]");
        this.footerAboutPt = page.locator("//a[contains(@daa-ll,'Sobre')]");

        //Qatar - English
        this.footerCreativeCloudQaEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessQaEn = page.locator("//a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountsForStudentsAndTeachersQaEn = page.locator("//a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSQaEn = page.locator("//a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatExperienceCloudQaEn = page.locator("//a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallQaEn = page.locator("//a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogQaEn = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountQaEn = page.locator("//a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutQaEn = page.locator("//a[contains(@daa-ll,'About')]");

        //Romania
        this.footerCreativeCloudRo = page.locator("//div[@daa-lh='Cumpărați']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessRo = page.locator("//a[contains(@daa-ll,'Creative Cloud pentru afaceri')]");
        this.footerDiscountsForStudentsAndTeachersRo = page.locator("//a[contains(@daa-ll,'Reduceri pentru studenți și pr')]");
        this.footerAppsForiOSRo = page.locator("//a[contains(@daa-ll,'Aplicații pentru iOS')]");
        this.footerWhatExperienceCloudRo = page.locator("//a[contains(@daa-ll,'Ce este Experience Cloud')]");
        this.footerDownloadAndInstallRo = page.locator("(//a[contains(@daa-ll,'Descărcare și instalare')])[2]");
        this.footerAdobeBlogRo = page.locator("//a[contains(@daa-ll,'Blogul Adobe')]");
        this.footerSignInToYourAccountRo = page.locator("//a[contains(@daa-ll,'Conectați vă la cont')]");
        this.footerAboutRo = page.locator("//a[contains(@daa-ll,'Despre')]");

        //Saudi Arabia - English
        this.footerCreativeCloudSaEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessSaEn = page.locator("//a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountsForStudentsAndTeachersSaEn = page.locator("//a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSSaEn = page.locator("//a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatExperienceCloudSaEn = page.locator("//a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallSaEn = page.locator("(//a[contains(@daa-ll,'Download and install')])[2]");
        this.footerAdobeBlogSaEn = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountSaEn = page.locator("//a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutSaEn = page.locator("//a[contains(@daa-ll,'About')]");

        //Schweiz
        this.footerCreativeCloudChDe = page.locator("//div[@daa-lh='Produkte']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessChDe = page.locator("//a[contains(@daa-ll,'Creative Cloud für Business')]");
        this.footerDiscountsForStudentsAndTeachersChDe = page.locator("//a[contains(@daa-ll,'Rabatte für Schüler Studierend')]");
        this.footerAppsForiOSChDe = page.locator("//a[contains(@daa-ll,'Mobile Apps für iOS')]");
        this.footerWhatExperienceCloudChDe = page.locator("//a[contains(@daa-ll,'Was ist Experience Cloud')]");
        this.footerDownloadAndInstallChDe = page.locator("(//a[contains(@daa-ll,'Download und Installation')])[2]");
        this.footerAdobeBlogChDe = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountChDe = page.locator("//a[contains(@daa-ll,'Anmeldung bei deinem Konto')]");
        this.footerAboutChDe = page.locator("//a[contains(@daa-ll,'Über Adobe')]");

        //Slovenija
        this.footerCreativeCloudSi = page.locator("//div[@daa-lh='Nakupujte']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessSi = page.locator("(//a[contains(@daa-ll,'Creative Cloud za podjetja')])[1]");
        this.footerDiscountsForStudentsAndTeachersSi = page.locator("//a[contains(@daa-ll,'Popusti za učence in učitelje')]");
        this.footerAppsForiOSSi = page.locator("//a[contains(@daa-ll,'Programi za iOS')]");
        this.footerWhatExperienceCloudSi = page.locator("//a[contains(@daa-ll,'Kaj je Experience Cloud')]");
        this.footerDownloadAndInstallSi = page.locator("(//a[contains(@daa-ll,'Prenos in namestitev')])[2]");
        this.footerAdobeBlogSi = page.locator("//a[contains(@daa-ll,'Adobejev spletni dnevnik')]");
        this.footerSignInToYourAccountSi = page.locator("//a[contains(@daa-ll,'Vpišite se v račun')]");
        this.footerBusinessCardSi = page.locator("//a[contains(@daa-ll,'Vizitka')]");

        //Slovensko
        this.footerCreativeCloudSk = page.locator("//div[@daa-lh='Hľadáte']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessSk = page.locator("//a[contains(@daa-ll,'Creative Cloud pre firmy')]");
        this.footerDiscountsForStudentsAndTeachersSk = page.locator("//a[contains(@daa-ll,'Zľavy pre študentov a učiteľov')]");
        this.footerAppsForiOSSk = page.locator("//a[contains(@daa-ll,'Aplikácie pre iOS')]");
        this.footerWhatExperienceCloudSk = page.locator("//a[contains(@daa-ll,'Čo je Experience Cloud')]");
        this.footerDownloadAndInstallSk = page.locator("(//a[contains(@daa-ll,'Sťahovanie a inštalácia')])[2]");
        this.footerAdobeBlogSk = page.locator("//a[contains(@daa-ll,'Blog spoločnosti Adobe')]");
        this.footerSignInToYourAccountSk = page.locator("//a[contains(@daa-ll,'Prihláste sa do svojho konta')]");
        this.footerInformationSk = page.locator("(//a[contains(@daa-ll,'Informácie')])[1]");

        //South Africa
        this.footerCreativeCloudZa = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessZa = page.locator("//a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountsForStudentsAndTeachersZa = page.locator("//a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSZa = page.locator("//a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatExperienceCloudZa = page.locator("//a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallZa = page.locator("(//a[contains(@daa-ll,'Download and install')])[2]");
        this.footerAdobeBlogZa = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountZa = page.locator("//a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutZa = page.locator("//a[contains(@daa-ll,'About')]");

        //Swiss
        this.footerCreativeCloudChFr = page.locator("//div[@daa-lh='Boutique pour']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessChFr = page.locator("//a[contains(@daa-ll,'Creative Cloud pour les entrep')]");
        this.footerDiscountsForStudentsCommunityAndFacultyChFr = page.locator("//a[contains(@daa-ll,'Remises pour la communauté étu')]");
        this.footerAppsForiOSChFr = page.locator("//a[contains(@daa-ll,'Applications pour iOS')]");
        this.footerWhatExperienceCloudChFr = page.locator("//a[contains(@daa-ll,'Qu est ce qu Experience Cloud')]");
        this.footerDownloadAndInstallChFr = page.locator("(//a[contains(@daa-ll,'Téléchargement et installation')])[2]");
        this.footerAdobeBlogChFr = page.locator("//a[contains(@daa-ll,'Blog Adobe')]");
        this.footerSignInToYourAccountChFr = page.locator("//a[contains(@daa-ll,'Connectez vous à votre compte')]");
        this.footerAboutChFr = page.locator("//a[contains(@daa-ll,'À propos de')]");

        //Suomi
        this.footerCreativeCloudFi = page.locator("//div[@daa-lh='Osta']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudBusinessFi = page.locator("//a[contains(@daa-ll,'Creative Cloud yrityksille')]");
        this.footerDiscountsForStudentsAndTeachersFi = page.locator("//a[contains(@daa-ll,'Alennukset oppilaille ja opett')]");
        this.footerAppsForiOSFi = page.locator("//a[contains(@daa-ll,'iOS sovellukset')]");
        this.footerWhatExperienceCloudFi = page.locator("//a[contains(@daa-ll,'Mikä Experience Cloud on')]");
        this.footerDownloadAndInstallFi = page.locator("(//a[contains(@daa-ll,'Lataus ja asennus')])[2]");
        this.footerAdobeBlogFi = page.locator("//a[contains(@daa-ll,'Adobe blogi')]");
        this.footerSignInToYourAccountFi = page.locator("//a[contains(@daa-ll,'Kirjaudu tiliisi')]");
        this.footerInformationFi = page.locator("(//a[contains(@daa-ll,'Tietoja')])[1]");

        //Sverige
        this.footerCreativeCloudSe = page.locator("//div[@daa-lh='Köpalternativ']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudBusinessSe = page.locator("//a[contains(@daa-ll,'Creative Cloud för företag')]");
        this.footerDiscountsForStudentsAndTeachersSe = page.locator("//a[contains(@daa-ll,'Rabatter för studerande och lä')]");
        this.footerAppsForiOSSe = page.locator("//a[contains(@daa-ll,'Appar för iOS')]");
        this.footerWhatExperienceCloudSe = page.locator("//a[contains(@daa-ll,'Vad är Experience Cloud')]");
        this.footerDownloadAndInstallSe = page.locator("(//a[contains(@daa-ll,'Ladda ned och installera')])[2]");
        this.footerAdobeBlogSe = page.locator("//a[contains(@daa-ll,'Adobes blogg')]");
        this.footerLogInToYourAccountSe = page.locator("//a[contains(@daa-ll,'Logga in på kontot')]");
        this.footerIfSe = page.locator("//a[contains(@daa-ll,'Om')]");

        //Svizzera
        this.footerCreativeCloudChIt = page.locator("//div[@daa-lh='Acquista per']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudBusinessChIt = page.locator("//a[contains(@daa-ll,'Creative Cloud per aziende')]");
        this.footerDiscountsForStudentsAndTeachersChIt = page.locator("//a[contains(@daa-ll,'Sconti per studenti e docenti')]");
        this.footerAppsForiOSChIt = page.locator("//a[contains(@daa-ll,'App per iOS')]");
        this.footerWhatExperienceCloudChIt = page.locator("//a[contains(@daa-ll,'Cos è Experience Cloud')]");
        this.footerDownloadAndInstallChIt = page.locator("(//a[contains(@daa-ll,'Download e installazione')])[2]");
        this.footerAdobeBlogChIt = page.locator("//a[contains(@daa-ll,'Blog di Adobe')]");
        this.footerLogInToYourAccountChIt = page.locator("//a[contains(@daa-ll,'Accedi al tuo account')]");
        this.footerInformationChIt = page.locator("(//a[contains(@daa-ll,'Informazioni')])[2]");

        //Turkey
        this.footerCreativeCloudTr = page.locator("//div[@daa-lh='Alışveriş']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForEnterpriseTr = page.locator("//a[contains(@daa-ll,'Kurumlar için Creative Cloud')]");
        this.footerDiscountsForStudentsAndTeachersTr = page.locator("//a[contains(@daa-ll,'Öğrenciler ve öğretmenler için')]");
        this.footeriOSAppsTr = page.locator("//a[contains(@daa-ll,'iOS uygulamaları')]");
        this.footerWhatExperienceCloudTr = page.locator("//a[contains(@daa-ll,'Experience Cloud nedir')]");
        this.footerDownloadAndInstallTr = page.locator("(//a[contains(@daa-ll,'İndir ve yükle')])[2]");
        this.footerAdobeBlogTr = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerSignInToYourAccountTr = page.locator("//a[contains(@daa-ll,'Hesabınızda oturum açın')]");
        this.footerAboutTr = page.locator("//a[contains(@daa-ll,'Hakkında')]");

        //United Arab Emirates - English
        this.footerCreativeCloudAeEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessAeEn = page.locator("//a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountsForStudentsAndTeachersAeEn = page.locator("//a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSAeEn = page.locator("//a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatExperienceCloudAeEn = page.locator("//a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallAeEn = page.locator("(//a[contains(@daa-ll,'Download and install')])[2]");
        this.footerAdobeBlogAeEn = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountAeEn = page.locator("//a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutAeEn = page.locator("//a[contains(@daa-ll,'About')]");

        //United Kingdom
        this.footerCreativeCloudUk = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerWhatIsExperienceCloudUk = page.locator("//a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallUk = page.locator("(//a[contains(@daa-ll,'Download and install')])[2]");
        this.footerAdobeBlogUk = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountUk = page.locator("//a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutUk = page.locator("//a[contains(@daa-ll,'About')]");

        //Austria
        this.footerCreativeCloudAt = page.locator("//div[@daa-lh='Produkte']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessAt = page.locator("//a[contains(@daa-ll,'Creative Cloud für Business')]");
        this.footerDiscountsForPupilsStudentsTeachersAt = page.locator("//a[contains(@daa-ll,'Rabatte für Schüler Studierend')]");
        this.footerMobileAppsForiOSAt = page.locator("//a[contains(@daa-ll,'Mobile Apps für iOS')]");
        this.footerWhatIsExperienceClousAt = page.locator("//a[contains(@daa-ll,'Was ist Experience Cloud')]");
        this.footerDownloadAndInstallAt = page.locator("(//a[contains(@daa-ll,'Download und Installation')])[2]");
        this.footerAdobeBlogAt = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountAt = page.locator("//a[contains(@daa-ll,'Anmeldung bei deinem Konto')]");
        this.footerAboutAdobeAt = page.locator("//a[contains(@daa-ll,'Über Adobe')]");

        //Czech Republic
        this.footerCreativeCloudCz = page.locator("//div[@daa-lh='Nákupy']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessCz = page.locator("//a[contains(@daa-ll,'Creative Cloud pro firmy')]");
        this.footerDiscountsForStudentsTeachersCz = page.locator("//a[contains(@daa-ll,'Slevy pro studenty a učitele')]");
        this.footerAppsForiOSCz = page.locator("//a[contains(@daa-ll,'Aplikace pro iOS')]");
        this.footerWhatIsExperienceClousCz = page.locator("//a[contains(@daa-ll,'Co je Experience Cloud')]");
        this.footerDownloadAndInstallCz = page.locator("(//a[contains(@daa-ll,'Stažení a instalace')])[2]");
        this.footerAdobeBlogCz = page.locator("//a[contains(@daa-ll,'Adobe Blog')]");
        this.footerSignInToYourAccountCZ = page.locator("//a[contains(@daa-ll,'Přihlaste se ke svému účtu-8')]");
        this.footerAboutUsCz = page.locator("//a[contains(@daa-ll,'O nás')]");

        //Bulgaria
        this.footerCreativeCloudBg = page.locator("//div[@daa-lh='Пазарувайте']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessBg = page.locator("//a[contains(@daa-ll,'Creative Cloud за бизнеса')]");
        this.footerDiscountsForStudentsAndTeachersBg = page.locator("//a[contains(@daa-ll,'Отстъпка за учащи и преподават')]");
        this.footerAppsForiOSBg = page.locator("//a[contains(@daa-ll,'Приложения за iOS')]");
        this.footerWhatIsExperienceCloudBg = page.locator("//a[contains(@daa-ll,'Какво е Experience Cloud')]");
        this.footerDownloadAndInstallBg = page.locator("(//a[contains(@daa-ll,'Изтеглете и инсталирайте')])[2]");
        this.footerBlogAtAdobeBg = page.locator("//a[contains(@daa-ll,'Блог на Adobe')]");
        this.footerSignInToYourAccountBg = page.locator("//a[contains(@daa-ll,'Впишете се в акаунта си')]");
        this.footerRegardingBg = page.locator("//a[contains(@daa-ll,'Относно')]");

        //Russia
        this.footerCreativeCloudRu = page.locator("//div[@daa-lh='Приложения']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForOrganizationsRu = page.locator("(//a[contains(@daa-ll,'Creative Cloud для организаций')])[1]");
        this.footerSchoolsAndUniversitiesRu = page.locator("(//a[contains(@daa-ll,'Школ и университетов')])[2]");
        this.footeriOSAppsRu = page.locator("//a[contains(@daa-ll,'Приложения для iOS')]");
        this.footerWhatIsExperienceCloudRu = page.locator("//a[contains(@daa-ll,'Что такое Experience Cloud')]");
        this.footerDownloadAndInstallRu = page.locator("(//a[contains(@daa-ll,'Загрузка и установка')])[2]");
        this.footerBlogAtAdobeRu = page.locator("//a[contains(@daa-ll,'Блог Adobe')]");
        this.footerLogInToYourAccountRu = page.locator("//a[contains(@daa-ll,'Вход в учетную запись')]");
        this.footerAboutUsRu = page.locator("//a[contains(@daa-ll,'О нас')]");

        //Ukraine
        this.footerCreativeCloudUa = page.locator("//div[@daa-lh='Для покупців']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessUa = page.locator("//a[contains(@daa-ll,'Creative Cloud для бізнесу')]");
        this.footerDiscountForPupilsStudentsAndTeachersUa = page.locator("//a[contains(@daa-ll,'Знижки для учнів студентів і в')]");
        this.footerAppsForiOSUa = page.locator("//a[contains(@daa-ll,'Програми для iOS')]");
        this.footerWhatIsExperienceCloudUa = page.locator("//a[contains(@daa-ll,'Що таке Experience Cloud')]");
        this.footerDownloadAndInstallUa = page.locator("(//a[contains(@daa-ll,'Завантаження та встановлення')])[2]");
        this.footerBlogAtAdobeUa = page.locator("//a[contains(@daa-ll,'Блог Adobe')]");
        this.footerSignInToYourAccountUa = page.locator("//a[contains(@daa-ll,'Увійти до облікового запису')]");
        this.footerAboutTheProgramUa = page.locator("//a[contains(@daa-ll,'Про програму')]");

        //Israel Hebrew
        this.footerCreativeCloudIlHe = page.locator("//div[@daa-lh='רכישה עבור']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessIlHe = page.locator("//a[contains(@daa-ll,'Creative Cloud לעסקים')]");
        this.footerDiscountForStudentsAndTeachersIlHe = page.locator("//a[contains(@daa-ll,'הנחות לתלמידים ולמורים')]");
        this.footeriOSApplicationsIlHe = page.locator("//a[contains(@daa-ll,'יישומים ל iOS')]");
        this.footerWhatIsExperienceCloudIlHe = page.locator("//a[contains(@daa-ll,'מה זה Experience Cloud')]");
        this.footerDownloadAndInstallIlHe = page.locator("(//a[contains(@daa-ll,'הורדה והתקנה')])[2]");
        this.footerTheAdobeBlogIlHe = page.locator("//a[contains(@daa-ll,'הבלוג של Adobe')]");
        this.footerLogInToYourAccountIlHe = page.locator("//a[contains(@daa-ll,'להתחבר לחשבון שלך')]");
        this.footerAboutIlHe = page.locator("//a[contains(@daa-ll,'אודות')]");

        //United Arab Emirates
        this.footerCreativeCloudAeAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerCreativeCloudForBusinessAeAr = page.locator("//a[contains(@daa-ll,'Creative Cloud للشركات')]");
        this.footerDiscountForStudentsAndTeachersAeAr = page.locator("//a[contains(@daa-ll,'خصومات للطلاب والمعلمين')]");
        this.footerApplicationsForiOSAeAr = page.locator("//a[contains(@daa-ll,'تطبيقات لنظام التشغيل iOS')]");
        this.footerWhatIsExperienceCloudAeAr = page.locator("//a[contains(@daa-ll,'ما هو Experience Cloud')]");
        this.footerDownloadAndInstallAeAr = page.locator("(//a[contains(@daa-ll,'تنزيل وتثبيت')])[2]");
        this.footerTheAdobeBlogAeAr = page.locator("//a[contains(@daa-ll,'مدونة Adobe')]");
        this.footerLogInToYourAccountAeAr = page.locator("//a[contains(@daa-ll,'تسجيل الدخول إلى حسابك')]");
        this.footerBriefAeAr = page.locator("(//a[contains(@daa-ll,'نبذة')])[4]");

        //Middle East And North Africa
        this.footerCreativeCloudMenaAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerCreativeCloudForBusinessMenaAr = page.locator("//a[contains(@daa-ll,'Creative Cloud للشركات')]");
        this.footerDiscountForStudentsAndTeachersMenaAr = page.locator("//a[contains(@daa-ll,'خصومات للطلاب والمعلمين')]");
        this.footerApplicationsForiOSMenaAr = page.locator("//a[contains(@daa-ll,'تطبيقات لنظام التشغيل iOS')]");
        this.footerWhatIsExperienceCloudMenaAr = page.locator("//a[contains(@daa-ll,'ما هو Experience Cloud')]");
        this.footerDownloadAndInstallMenaAr = page.locator("(//a[contains(@daa-ll,'تنزيل وتثبيت')])[2]");
        this.footerTheAdobeBlogMenaAr = page.locator("//a[contains(@daa-ll,'مدونة Adobe')]");
        this.footerLogInToYourAccountMenaAr = page.locator("//a[contains(@daa-ll,'تسجيل الدخول إلى حسابك')]");
        this.footerBriefMenaAr = page.locator("(//a[contains(@daa-ll,'نبذة')])[4]");

        //Saudi Arabia
        this.footerCreativeCloudSaAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerCreativeCloudForBusinessSaAr = page.locator("//a[contains(@daa-ll,'Creative Cloud للشركات')]");
        this.footerDiscountForStudentsAndTeachersSaAr = page.locator("//a[contains(@daa-ll,'خصومات للطلاب والمعلمين')]");
        this.footerApplicationsForiOSSaAr = page.locator("//a[contains(@daa-ll,'تطبيقات لنظام التشغيل iOS')]");
        this.footerWhatIsExperienceCloudSaAr = page.locator("//a[contains(@daa-ll,'ما هو Experience Cloud')]");
        this.footerDownloadAndInstallSaAr = page.locator("(//a[contains(@daa-ll,'تنزيل وتثبيت')])[2]");
        this.footerAdobeBlogSaAr = page.locator("//a[contains(@daa-ll,'مدونة Adobe')]");
        this.footerLogInToYourAccountSaAr = page.locator("//a[contains(@daa-ll,'تسجيل الدخول إلى حسابك')]");
        this.footerBriefSaAr = page.locator("(//a[contains(@daa-ll,'نبذة')])[4]");

        //Egypt
        this.footerCreativeCloudEgAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerCreativeCloudForBusinessEgAr = page.locator("//a[contains(@daa-ll,'Creative Cloud للشركات')]");
        this.footerDiscountForStudentsAndTeachersEgAr = page.locator("//a[contains(@daa-ll,'خصومات للطلاب والمعلمين')]");
        this.footerApplicationsForiOSEgAr = page.locator("//a[contains(@daa-ll,'تطبيقات لنظام التشغيل iOS')]");
        this.footerWhatIsExperienceCloudEgAr = page.locator("//a[contains(@daa-ll,'ما هو Experience Cloud')]");
        this.footerDownloadAndInstallEgAr = page.locator("(//a[contains(@daa-ll,'تنزيل وتثبيت')])[2]");
        this.footerAdobeBlogEgAr = page.locator("//a[contains(@daa-ll,'مدونة Adobe')]");
        this.footerLogInToYourAccountEgAr = page.locator("//a[contains(@daa-ll,'تسجيل الدخول إلى حسابك')]");
        this.footerBriefEgAr = page.locator("(//a[contains(@daa-ll,'نبذة')])[4]");

        //Kuwait
        this.footerCreativeCloudKwAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerCreativeCloudForBusinessKwAr = page.locator("//a[contains(@daa-ll,'Creative Cloud للشركات')]");
        this.footerDiscountForStudentsAndTeachersKwAr = page.locator("//a[contains(@daa-ll,'خصومات للطلاب والمعلمين')]");
        this.footerApplicationsForiOSKwAr = page.locator("//a[contains(@daa-ll,'تطبيقات لنظام التشغيل iOS')]");
        this.footerWhatIsExperienceCloudKwAr = page.locator("//a[contains(@daa-ll,'ما هو Experience Cloud')]");
        this.footerDownloadAndInstallKwAr = page.locator("(//a[contains(@daa-ll,'تنزيل وتثبيت')])[2]");
        this.footerAdobeBlogKwAr = page.locator("//a[contains(@daa-ll,'مدونة Adobe')]");
        this.footerLogInToYourAccountKwAr = page.locator("//a[contains(@daa-ll,'تسجيل الدخول إلى حسابك')]");
        this.footerBriefKwAr = page.locator("(//a[contains(@daa-ll,'نبذة')])[4]");

        //Qatar
        this.footerCreativeCloudQaAr = page.locator("(//div[@class='feds-menu-section']/descendant::a[contains(@daa-ll,'Creative Cloud')])[2]");
        this.footerCreativeCloudForBusinessQaAr = page.locator("//a[contains(@daa-ll,'Creative Cloud للشركات')]");
        this.footerDiscountForStudentsAndTeachersQaAr = page.locator("//a[contains(@daa-ll,'خصومات للطلاب والمعلمين')]");
        this.footerApplicationsForiOSQaAr = page.locator("//a[contains(@daa-ll,'تطبيقات لنظام التشغيل iOS')]");
        this.footerWhatIsExperienceCloudQaAr = page.locator("//a[contains(@daa-ll,'ما هو Experience Cloud')]");
        this.footerDownloadAndInstallQaAr = page.locator("(//a[contains(@daa-ll,'تنزيل وتثبيت')])[2]");
        this.footerAdobeBlogQaAr = page.locator("//a[contains(@daa-ll,'مدونة Adobe')]");
        this.footerLogInToYourAccountQaAr = page.locator("//a[contains(@daa-ll,'تسجيل الدخول إلى حسابك')]");
        this.footerBriefQaAr = page.locator("(//a[contains(@daa-ll,'نبذة')])[4]");

        //Australia
        this.footerCreativeCloudAu = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessAu = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersAu = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSAu = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudAu = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallAu = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogAu = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountAu = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutAu = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Hong Kong
        this.footerCreativeCloudHkEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessHkEn = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersHkEn = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSHkEn = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudHkEn = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallHkEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogHkEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountHkEn = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutHkEn = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //India
        this.footerCreativeCloudIn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessIn = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersIn = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSIn = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudIn = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallIn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogIn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountIn = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutIn = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Indonesia
        this.footerCreativeCloudIdId = page.locator("//div[@daa-lh='Beli']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessIdId = page.locator("//div[@daa-lh='Untuk bisnis']//descendant::a[contains(@daa-ll,'Creative Cloud untuk bisnis')]");
        this.footerDiscountForStudentsAndTeachersIdId = page.locator("//div[@daa-lh='Untuk pendidikan']//descendant::a[contains(@daa-ll,'Diskon untuk siswa dan guru')]");
        this.footerApplicationForiOSIdId = page.locator("//div[@daa-lh='Untuk seluler']//descendant::a[contains(@daa-ll,'Aplikasi untuk iOS')]");
        this.footerWhatIsExperienceCloudIdId = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Apa itu Experience Cloud')]");
        this.footerDownloadAndInstallIdId = page.locator("//div[@daa-lh='Dukungan']//descendant::a[contains(@daa-ll,'Unduh dan instal')]");
        this.footerBlogAdobeIdId = page.locator("//div[@daa-lh='Sumber Daya']//descendant::a[contains(@daa-ll,'Blog Adobe')]");
        this.footerLogInToYourAccountIdId = page.locator("//div[@daa-lh='Akun Adobe']//descendant::a[contains(@daa-ll,'Log in ke akun Anda')]");
        this.footerAboutIdId = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'Tentang')]");

        //Indonesia - English
        this.footerCreativeCloudIdEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessIdEn = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersIdEn = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSIdEn = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudIdEn = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallIdEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogIdEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountIdEn = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutIdEn = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Malaysia
        this.footerCreativeCloudMyMs = page.locator("//div[@daa-lh='Beli untuk']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessMyMs = page.locator("//div[@daa-lh='Untuk perniagaan']//descendant::a[contains(@daa-ll,'Creative Cloud untuk perniagaa')]");
        this.footerDiscountForStudentsAndTeachersMyMs = page.locator("//div[@daa-lh='Untuk pendidikan']//descendant::a[contains(@daa-ll,'Diskaun untuk pelajar dan guru')]");
        this.footerAppsForiOSMyMs = page.locator("//div[@daa-lh='Untuk mudah alih']//descendant::a[contains(@daa-ll,'Aplikasi untuk iOS')]");
        this.footerWhatIsExperienceCloudMyMs = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Apakah itu Experience Cloud')]");
        this.footerDownloadAndInstallMyMs = page.locator("//div[@daa-lh='Sokongan']//descendant::a[contains(@daa-ll,'Muat turun dan pasang')]");
        this.footerAdobeBlogMyMs = page.locator("//div[@daa-lh='Sumber']//descendant::a[contains(@daa-ll,'Blog Adobe')]");
        this.footerLogInToYourAccountMyMs = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log masuk ke akaun anda')]");
        this.footerAboutMyMs = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'Perihal')]");

        //Malaysia - English
        this.footerCreativeCloudMyEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessMyEn = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersMyEn = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSMyEn = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudMyEn = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallMyEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogMyEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountMyEn = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutMyEn = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //New Zealand
        this.footerCreativeCloudNz = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessNz = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersNz = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSNz = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudNz = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallNz = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogNz = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountNz = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutNz = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Philippines - English
        this.footerCreativeCloudPhEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessPhEn = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersPhEn = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSPhEn = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudPhEn = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallPhEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogPhEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountPhEn = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutPhEn = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Philippines
        this.footerCreativeCloudPhFil = page.locator("//div[@daa-lh='Bumili ng']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessPhFil = page.locator("//div[@daa-lh='Para sa negosyo']//descendant::a[contains(@daa-ll,'Creative Cloud para sa negosyo')]");
        this.footerDiscountForStudentsAndTeachersPhFil = page.locator("//div[@daa-lh='Para sa edukasyon']//descendant::a[contains(@daa-ll,'Mga discount para sa mga estud')]");
        this.footerAppsForiOSPhFil = page.locator("//div[@daa-lh='Para sa mobile']//descendant::a[contains(@daa-ll,'Mga App para sa iOS')]");
        this.footerWhatIsExperienceCloudPhFil = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Ano ang Experience Cloud')]");
        this.footerDownloadAndInstallPhFil = page.locator("//div[@daa-lh='Suporta']//descendant::a[contains(@daa-ll,'I download at i install')]");
        this.footerAdobeBlogPhFil = page.locator("//div[@daa-lh='Mga Resource']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountPhFil = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Mag log in sa account mo')]");
        this.footerAboutThisPhFil = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'Tungkol Dito')]");

        //Singapore
        this.footerCreativeCloudSg = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessSg = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersSg = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSSg = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudSg = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallSg = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogSg = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountSg = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutSg = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Thailand - English
        this.footerCreativeCloudThEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessThEn = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersThEn = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSThEn = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudThEn = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallThEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogThEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountThEn = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutThEn = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Vietnam - English
        this.footerCreativeCloudVnEn = page.locator("//div[@daa-lh='Shop for']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessVnEn = page.locator("//div[@daa-lh='For business']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersVnEn = page.locator("//div[@daa-lh='For education']//descendant::a[contains(@daa-ll,'Discounts for students and tea')]");
        this.footerAppsForiOSVnEn = page.locator("//div[@daa-lh='For mobile']//descendant::a[contains(@daa-ll,'Apps for iOS')]");
        this.footerWhatIsExperienceCloudVnEn = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'What is Experience Cloud')]");
        this.footerDownloadAndInstallVnEn = page.locator("//div[@daa-lh='Support']//descendant::a[contains(@daa-ll,'Download and install')]");
        this.footerAdobeBlogVnEn = page.locator("//div[@daa-lh='Resources']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountVnEn = page.locator("//div[@daa-lh='Adobe Account']//descendant::a[contains(@daa-ll,'Log in to your account')]");
        this.footerAboutVnEn = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'About')]");

        //Vietnam
        this.footerCreativeCloudVnVi = page.locator("//div[@daa-lh='Mua']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessVnVi = page.locator("(//div[@daa-lh='Dành cho hoạt động kinh doanh']//descendant::a[contains(@daa-ll,'Creative Cloud dành cho doanh')])[1]");
        this.footerDiscountForStudentsAndFacultyVnVi = page.locator("//div[@daa-lh='Dành cho giáo dục']//descendant::a[contains(@daa-ll,'Chiết khấu cho sinh viên và gi')]");
        this.footerAppsForiOSVnVi = page.locator("//div[@daa-lh='Dành cho thiết bị di động']//descendant::a[contains(@daa-ll,'Ứng dụng cho iOS')]");
        this.footerWhatIsExperienceCloudVnVi = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Experience Cloud là gì')]");
        this.footerDownloadAndInstallVnVi = page.locator("//div[@daa-lh='Hỗ trợ']//descendant::a[contains(@daa-ll,'Tải xuống và cài đặt')]");
        this.footerAdobeBlogVnVi = page.locator("//div[@daa-lh='Tài nguyên']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerSignInToYourAccountVnVi = page.locator("//div[@daa-lh='Tài khoản Adobe']//descendant::a[contains(@daa-ll,'Đăng nhập tài khoản của bạn')]");
        this.footerIntroduceVnVi = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'Giới thiệu')]");

        //India - Hindi
        this.footerCreativeCloudInHi = page.locator("//div[@daa-lh='इसकी खरीदारी करें']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessInHi = page.locator("//div[@daa-lh='बिज़नेस के लिए']//descendant::a[contains(@daa-ll,'Creative Cloud बिज़नेस')]");
        this.footerDiscountForStudentsAndTeachersInHi = page.locator("//div[@daa-lh='एजुकेशन के लिए']//descendant::a[contains(@daa-ll,'स्टूडेंट्स और टीचर्स के लिए छू')]");
        this.footerAppsForiOSInHi = page.locator("//div[@daa-lh='मोबाइल के लिए']//descendant::a[contains(@daa-ll,'iOS के लिए ऐप')]");
        this.footerWhatIsExperienceCloudInHi = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Experience Cloud क्या है')]");
        this.footerDownloadAndInstallInHi = page.locator("//div[@daa-lh='सपोर्ट']//descendant::a[contains(@daa-ll,'डाउनलोड और इंस्टॉल करें')]");
        this.footerAdobeBlogInHi = page.locator("//div[@daa-lh='संसाधन']//descendant::a[contains(@daa-ll,'Adobe ब्लॉग')]");
        this.footerLogInToYourAccountInHi = page.locator("//div[@daa-lh='Adobe खाता']//descendant::a[contains(@daa-ll,'अपने खाते में लॉग इन करें')]");
        this.footerIntroductionInHi = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'परिचय')]");

        //Thailand
        this.footerCreativeCloudThTh = page.locator("//div[@daa-lh='เลือกซื้อ']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessThTh = page.locator("//div[@daa-lh='สำหรับธุรกิจ']//descendant::a[contains(@daa-ll,'Creative Cloud สำหรับธุรกิจ')]");
        this.footerDiscountForStudentsAndTeachersThTh = page.locator("//div[@daa-lh='สำหรับการศึกษา']//descendant::a[contains(@daa-ll,'ส่วนลดสำหรับนักเรียนนักศึกษาแล')]");
        this.footerAppsForiOSThTh = page.locator("//div[@daa-lh='สำหรับมือถือ']//descendant::a[contains(@daa-ll,'แอปสำหรับ iOS')]");
        this.footerWhatIsExperienceCloudThTH = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Experience Cloud คืออะไร')]");
        this.footerDownloadAndInstallThTH = page.locator("//div[@daa-lh='การสนับสนุน']//descendant::a[contains(@daa-ll,'ดาวน์โหลดและติดตั้ง')]");
        this.footerAdobeBlogThTh = page.locator("//div[@daa-lh='ทรัพยากร']//descendant::a[contains(@daa-ll,'Adobe Blog')]");
        this.footerLogInToYourAccountThTh = page.locator("//div[@daa-lh='บัญชี Adobe']//descendant::a[contains(@daa-ll,'ลงชื่อเข้าใช้บัญชีของคุณ')]");
        this.footerIntroductionThTh = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'เกี่ยวกับ')]");

        //Hong Kong
        this.footerCreativeCloudHkZh = page.locator("//div[@daa-lh='購買產品']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessHkZh = page.locator("//div[@daa-lh='適用於企業']//descendant::a[contains(@daa-ll,'適用於商業的 Creative Cloud')]");
        this.footerDiscountForStudentsAndTeachersHkZh = page.locator("//div[@daa-lh='適用於教育']//descendant::a[contains(@daa-ll,'學生與教師適用的折扣')]");
        this.footerAppsForiOSHkZh = page.locator("//div[@daa-lh='適用於行動裝置']//descendant::a[contains(@daa-ll,'iOS 版應用程式')]");
        this.footerWhatIsExperienceCloudHkZh = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'什麼是 Experience Cloud')]");
        this.footerDownloadAndInstallHkZh = page.locator("//div[@daa-lh='支援']//descendant::a[contains(@daa-ll,'下載及安裝')]");
        this.footerAdobeBlogHkZh = page.locator("//div[@daa-lh='資源']//descendant::a[contains(@daa-ll,'Adobe 部落格')]");
        this.footerLogInToYourAccountHkZh = page.locator("//div[@daa-lh='Adobe 帳戶']//descendant::a[contains(@daa-ll,'登入您的帳戶')]");
        this.footerAboutHkZh = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'關於')]");

        //China
        this.footerAboutCh = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'关于')]");
        this.footerDownloadAndInstallCh = page.locator("//div[@daa-lh='支持']//descendant::a[contains(@daa-ll,'下载和安装')]");
        this.footerLoginAccountCh = page.locator("//div[@daa-lh='Adobe 帐户']//descendant::a[contains(@daa-ll,'登录帐户')]");
        this.weibo = page.locator("//a[contains(@daa-ll,'weibo')]");

        //Taiwan
        this.footerCreativeCloudTw = page.locator("//div[@daa-lh='購買產品']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessTw = page.locator("//div[@daa-lh='適用於企業']//descendant::a[contains(@daa-ll,'適用於商業的 Creative Cloud')]");
        this.footerDiscountForStudentsAndTeachersTw = page.locator("//div[@daa-lh='適用於教育']//descendant::a[contains(@daa-ll,'學生與教師適用的折扣')]");
        this.footerAppsForiOSTw = page.locator("//div[@daa-lh='適用於行動裝置']//descendant::a[contains(@daa-ll,'iOS 版應用程式')]");
        this.footerWhatIsExperienceCloudTw = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'什麼是 Experience Cloud')]");
        this.footerDownloadAndInstallTw = page.locator("//div[@daa-lh='支援']//descendant::a[contains(@daa-ll,'下載及安裝')]");
        this.footerAdobeBlogTw = page.locator("//div[@daa-lh='資源']//descendant::a[contains(@daa-ll,'Adobe 部落格')]");
        this.footerLogInToYourAccountTw = page.locator("//div[@daa-lh='Adobe 帳戶']//descendant::a[contains(@daa-ll,'登入您的帳戶')]");
        this.footerAboutTw = page.locator("//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'關於')]");

        //Korea
        this.footerCreativeCloudKr = page.locator("//div[@daa-lh='구매 대상']//descendant::a[contains(@daa-ll,'Creative Cloud')]");
        this.footerCreativeCloudForBusinessKr = page.locator("//div[@daa-lh='기업용']//descendant::a[contains(@daa-ll,'Creative Cloud for business')]");
        this.footerDiscountForStudentsAndTeachersKr = page.locator("//div[@daa-lh='교육 기관용']//descendant::a[contains(@daa-ll,'학생 및 교사를 위한 할인')]");
        this.footerAppsForiOSKr = page.locator("//div[@daa-lh='모바일용']//descendant::a[contains(@daa-ll,'iOS용 앱')]");
        this.footerIntroductionToExperienceCloudKr = page.locator("//div[@daa-lh='Experience Cloud']//descendant::a[contains(@daa-ll,'Experience Cloud 소개')]");
        this.footerDownloadAndInstallKr = page.locator("//div[@daa-lh='지원']//descendant::a[contains(@daa-ll,'다운로드 및 설치')]");
        this.footerAdobeBlogKr = page.locator("//div[@daa-lh='리소스']//descendant::a[contains(@daa-ll,'Adobe 블로그')]");
        this.footerLogInToYourAccountKr = page.locator("//div[@daa-lh='Adobe 계정']//descendant::a[contains(@daa-ll,'내 계정으로 로그인')]");
        this.footerInformationKr = page.locator("(//div[@daa-lh='Adobe']//descendant::a[contains(@daa-ll,'정보')])[1]");

        //Don't make changes for the below code
        //Featured Products
        this.footerAdobeAcrobatReaderlogo = page.locator("//a[@daa-ll='Adobe Acrobat Reader']");
        this.footerAdobeExpresslogo = page.locator("//a[@daa-ll='Adobe Express']");
        this.footerPhotoshoplogo = page.locator("//a[@daa-ll='Photoshop']");
        this.footerIllustratorlogo = page.locator("//a[@daa-ll='Illustrator']");
        this.footerAdobeReaderlogo = page.locator("//a[@daa-ll='Acrobat Reader']");

        //Change Region and social media
        this.changeRegion = page.locator('div.feds-regionPicker-wrapper');
        this.facebookLogo = page.locator("//a[@daa-ll='facebook-1']");
        this.instagramLogo = page.locator("//a[@daa-ll='instagram-2']");
        this.twitterlogo = page.locator("//a[@daa-ll='twitter-3']");
        this.linkedinLogo = page.locator("//a[@daa-ll='linkedin-4']");
        this.copyright = page.locator('div.feds-footer-legalWrapper>p>span');
        this.privacyPolicy = page.locator('div.feds-footer-legalWrapper>p>a').nth(0);
        this.termsOfUse = page.locator('div.feds-footer-legalWrapper>p>a').nth(1);
        this.cookies = page.locator('div.feds-footer-legalWrapper>p>a').nth(2);
        this.protectMyPersonalData = page.locator('div.feds-footer-legalWrapper>p>a').nth(3);
        this.adChoices = page.locator('div.feds-footer-legalWrapper>p>a').nth(4);
    };
};