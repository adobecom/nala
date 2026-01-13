/* eslint-disable max-len */
import { expect } from '@playwright/test';
import FedsFooter from './feds.footer.page.js';

export default class BusinessPageSanity {
  constructor(page) {
    this.page = page;
    this.feds = new FedsFooter(page);

    // U-Nav Elements
    this.adobeForBusinessLogo = page.locator('.feds-brand-image');
    this.gnavProducts = page.locator('.feds-navItem').nth(0);
    this.gnavAI = page.locator('.feds-navItem').nth(1);
    this.gnavIndustries = page.locator('.feds-navItem').nth(2);
    this.gnavRoles = page.locator('.feds-navItem').nth(3);
    this.gnavResources = page.locator('.feds-navItem').nth(4);
    this.gnavSupport = page.locator('.feds-navItem').nth(5);
    this.getStarted = page.locator('.feds-navItem').nth(6);

    this.signInButton = page.locator('.feds-signIn');
    this.rightlogo = page.locator('.feds-logo');

    // Products Dropdown elements***
    this.featuredProducts = page.locator('[role="heading"]').nth(0);
    this.aiAndAgents = page.locator('[role="heading"]').nth(1);
    this.contentAndWorkflows = page.locator('[role="heading"]').nth(2);
    this.creativityAndDesign = page.locator('[role="heading"]').nth(3);
    this.dataAndAnalytics = page.locator('[role="heading"]').nth(4);
    this.campaignManagement = page.locator('[role="heading"]').nth(5);
    this.documentProductivity = page.locator('[role="heading"]').nth(6);
    this.ourPlatform = page.locator('[role="heading"]').nth(7);
    this.whatWeSolve = page.locator('[role="heading"]').nth(8);
    this.whatsNew = page.locator('[role="heading"]').nth(9);

    this.experientPlatform = page.locator('.feds-popup [href*="agent-orchestrator.html"]').nth(0);
    this.brandConcierge = page.locator('.feds-popup [href*="brand-concierge.html"]').nth(0);
    this.llmOptimizer = page.locator('.feds-popup [href*="llm-optimizer.html"]').nth(0);
    this.genstudioForPerformanceMarketing = page.locator('.feds-popup [href*="marketing.html"]').nth(0);
    this.experienceManagerSites = page.locator('.feds-popup [href*="aem-sites.html"]').nth(0);
    this.experienceManagerAssets = page.locator('.feds-popup [href*="assets.html"]');
    this.adobeCommerce = page.locator('.feds-popup [href*="commerce.html"]');
    this.workfront = page.locator('.feds-popup [href*="workfront.html"]');

    this.creativeCloud = page.locator('.feds-popup [href*="creativecloud-business.html"]');
    this.adobeExpress = page.locator('.feds-popup [href*="express-business.html"]');
    this.adobeFirefly = page.locator('.feds-popup [href*="firefly-business.html"]').nth(0);
    this.frameIO = page.locator('.feds-popup [href*="frameio-business.html"]');
    this.fireflyServices = page.locator('.feds-popup [href*="firefly-services.html"]').nth(0);
    this.realtimeCDP = page.locator('.feds-popup [href*="rtcdp.html"]');
    this.adobeAnalytics = page.locator('.feds-popup [href*="adobe-analytics.html"]');

    this.jouneyOptimizer = page.locator('.feds-popup [href*="journey-optimizer.html"]');
    this.journeyOptimizerB2BEdition = page.locator('.feds-popup [href*="journey-optimizer-b2b-edition.html"]');
    this.marketoEngage = page.locator('.feds-popup [href*="marketo.html"]');
    this.acrobatStudio = page.locator('.feds-popup [href*="acrobat-business.html"]').nth(0);
    this.adobeSign = page.locator('.feds-popup [href*="sign-solutions.html"]');

    this.viewAllProductsButton = page.locator('.feds-popup [href*="products.html"]');

    this.adobeExperiencePlatform = page.locator('.feds-popup [href*="adobe-experience-platform.html"]');
    this.personalization = page.locator('.feds-popup [href*="personalization-at-scale.html"]');
    this.contentSupplyChain = page.locator('.feds-popup [href*="content-supply-chain.html"]').nth(0);
    this.unifiedCustomerExperience = page.locator('.feds-popup [href*="unified-customer-experience.html"]');
    this.b2bGTMOrchestration = page.locator('.feds-popup [href*="b2b-marketing.html"]');
    this.fireflyCreativeProduction = page.locator('.feds-popup [href*="firefly-creative-production.html"]');
    this.fireflyFoundry = page.locator('.feds-popup [href*="firefly-foundry.html"]');

    // AI Dropdown Elements ***
    this.AIatAdobe = page.locator('.feds-menu-headline[role="heading"]').nth(4);
    this.featuredOffsprings = page.locator('.feds-menu-headline[role="heading"]').nth(5);
    this.resources1 = page.locator('.feds-menu-headline[role="heading"]').nth(6);
    // Promo
    this.promo1 = page.locator('.feds-promo').nth(0);
    this.promoContent1 = page.locator('.feds-promo-content').nth(0);
    this.promoCTA1 = page.locator('.feds-popup [href*="maximizing-your-ai-investment.html"]').nth(1);

    this.aiOverview = page.locator('.feds-popup [href*="/ai.html"]').nth(0);
    this.agentsAtAdobe = page.locator('.feds-popup [href*="agent-orchestrator.html"]').nth(1);
    this.ourFireflyApproach = page.locator('.feds-popup [href*="firefly-ai-approach.html"]');
    this.responsibleAI = page.locator('.feds-popup [href*="responsible-ai.html"]');

    this.adobeFirely = page.locator('.feds-popup [href*="firefly-business.html"]').nth(1);
    this.fireflyServices1 = page.locator('.feds-popup [href*="firefly-services.html"]').nth(1);
    this.customModels = page.locator('.feds-popup [href*="custom-models.html"]');
    this.experiencePlatformAgentOrchestrator = page.locator('.feds-popup [href*="agent-orchestrator.html"]').nth(2);
    this.llmOptimiser = page.locator('.feds-popup [href*="llm-optimizer.html"]').nth(1);
    this.brandConcierge1 = page.locator('.feds-popup [href*="brand-concierge.html"]').nth(1);
    this.acrobatStudio1 = page.locator('.feds-popup [href*="acrobat-business.html"]').nth(1);
    this.aiAssistant = page.locator('.feds-popup [href*="ai-assistant.html"]');

    this.allAiResources = page.locator('.feds-popup [href*="ai.html"]').nth(2);
    this.futureOfMakingWithAi = page.locator('.feds-popup [href*="future-of-marketing-in-the-era-of-ai-part-1"]').nth(0);
    this.howAdobeUsesAi = page.locator('.feds-popup [href*="generative-ai-solution.html"]');
    this.scaleContentCreation = page.locator('.feds-popup [href*="supercharge-your-content-supply-chain.html"]');
    this.howNFLUsesAi = page.locator('.feds-popup [href*="closer-to-the-game"]');

    this.aiOverviewCTA = page.locator('.feds-popup [href*="/ai.html"]').nth(2);
    this.aiOverviewCTAregion = page.locator('.feds-popup [href*="/ai.html"]').nth(1);

    // Industries Dropdown***
    this.industries = page.locator('.feds-menu-headline[role="heading"]').nth(7);
    this.resources2 = page.locator('.feds-menu-headline[role="heading"]').nth(8);
    this.featuredUseCases = page.locator('.feds-menu-headline[role="heading"]').nth(9);
    // Promo
    this.promo2 = page.locator('.feds-promo').nth(1);
    this.promoContent2 = page.locator('.feds-promo-content').nth(1);
    this.promoCTA2 = page.locator('.feds-popup [href*="engaging-fan-experiences.html"]').nth(2);
    this.promoCTA2region = page.locator('.feds-popup [href*="generative-ai"]').nth(2);

    this.financialServices = page.locator('.feds-popup [href*="financial-services.html"]');
    this.highTech = page.locator('.feds-popup [href*="high-tech.html"]');
    this.healthcareAndLife = page.locator('.feds-popup [href*="healthcare-life-sciences.html"]');
    this.government = page.locator('.feds-popup [href*="government.html"]');
    this.retail = page.locator('.feds-popup [href*="retail.html"]');
    this.manufacturing = page.locator('.feds-popup [href*="manufacturing.html"]');
    this.mediaAndEntertainment = page.locator('.feds-popup [href*="entertainment.html"]');
    this.Sports = page.locator('.feds-popup [href*="engaging-fan-experiences.html"]').nth(0);

    this.seeAllIndustries = page.locator('.feds-popup [href*="adobe-industries.html"]');

    this.resourceCenter1 = page.locator('.feds-popup [href*="main.html"]').nth(0);
    this.customerSuccessStories1 = page.locator('.feds-popup [href*="customer-success-stories.html"]').nth(0);
    this.analystReports1 = page.locator('.feds-popup [href*="reports.html"]').nth(0);
    this.webinars1 = page.locator('.feds-popup [href*="webinars.html"]').nth(0);

    this.prudential = page.locator('.feds-popup [href*="study.html"]').nth(0);
    this.qualcomm = page.locator('.feds-popup [href*="study.html"]').nth(1);
    this.lumen = page.locator('.feds-popup [href*="lumen.html"]');

    // Roles Dropdown***
    this.role = page.locator('.feds-menu-headline[role="heading"]').nth(10);
    this.masteringResources = page.locator('.feds-menu-headline[role="heading"]').nth(11);
    this.creativeResources = page.locator('.feds-menu-headline[role="heading"]').nth(12);
    this.itResources = page.locator('.feds-menu-headline[role="heading"]').nth(13);

    this.cmo = page.locator('.feds-popup [href*="cmo.html"]');
    this.cio = page.locator('.feds-popup [href*="cio.html"]');
    this.creativeLeader = page.locator('.feds-popup [href*="creative-decision-maker.html"]');
    this.marketingLeader = page.locator('.feds-popup [href*="marketing-leader.html"]');
    this.itLeader = page.locator('.feds-popup [href*="it-leader.html"]');

    this.futureOfMarketing = page.locator('.feds-popup [href*="future-of-marketing-in-the-era-of-ai-part-1"]').nth(1);
    this.turnContent = page.locator('.feds-popup [href*="growth-unlock-turning-content-into-a-growth-engine-with-ai"]');
    this.topCX = page.locator('.feds-popup [href*="initiatives-for-cmos.html"]');
    this.consumerAndmarket = page.locator('.feds-popup [href*="quarterly-report.html"]');

    this.creativeTrendsReports = page.locator('.feds-popup [href*="trends-report.html"]').nth(0);
    this.adobeScales = page.locator('.feds-popup [href*="content-and-creativity-with-ai.html"]');
    this.newellBrands = page.locator('.feds-popup [href*="newell-brands-reimagines-its-content-supply-chain-with-adobe"]');
    this.masteringText = page.locator('.feds-popup [href*="image-prompts.html"]');

    this.responsibleAIAdoption = page.locator('.feds-popup [href*="the-ai-inflection-point.html"]');
    this.topCX = page.locator('.feds-popup [href*="for-cios.html"]');
    this.roi = page.locator('.feds-popup [href*="for-enterprise.html"]');
    this.personalisation = page.locator('.feds-popup [href*="scale-report.html"]').nth(0);

    this.viewAllResourcesCTA = page.locator('.feds-popup [href*="main.html"]').nth(1);
    this.viewAllResourcesCTAregion = page.locator('.feds-popup [href*="main.html"]').nth(2);

    // Resources Dropdown****
    this.resources3 = page.locator('.feds-menu-headline[role="heading"]').nth(14);
    this.events = page.locator('.feds-menu-headline[role="heading"]').nth(15);
    this.trendingTopics = page.locator('.feds-menu-headline[role="heading"]').nth(16);

    // Promo
    this.promo3 = page.locator('.feds-promo').nth(2);
    this.promoContent3 = page.locator('.feds-promo-content').nth(2);
    this.promoCTA3 = page.locator('.feds-popup [href*="digital-trends-report"]').nth(2);

    this.custmerSuccessStories2 = page.locator('.feds-popup [href*="customer-success-stories"]').nth(4);
    this.analystReports2 = page.locator('.feds-popup [href*="reports"]').nth(2);
    this.adobeForBusinessBlog = page.locator('.feds-popup [href*="blog"]').nth(4);
    this.adobeForBusinessBlogRegion = page.locator('.feds-popup [href*="blog"]').nth(6);

    this.webinars2 = page.locator('.feds-popup [href*="webinars"]').nth(1);

    this.resourceCenter2CTA = page.locator('.feds-popup [href*="resources/main.html"]').nth(2);

    this.adobeSummit = page.locator('.feds-popup [href*="customer-success-stories"]').nth(4);
    this.adobeMax = page.locator('.feds-popup [href*="max.html"]');
    this.allBusinessEvents = page.locator('.feds-popup [href*="events.html"]');

    this.aiAndDigitalTrends1 = page.locator('.feds-popup [href*="digital-trends-report"]').nth(1);
    this.adobeConsumerInsights1 = page.locator('.feds-popup [href*="adobe-digital-insight"]').nth(1);
    this.personalizationAtScale1 = page.locator('.feds-popup [href*="personalization-at-scale-report"]').nth(1);
    this.expertInsights = page.locator('.feds-popup [href*="thought-leadership"]');

    // Support Dropdown
    this.experienceCloudSupport = page.locator('.feds-menu-headline[role="heading"]').nth(17);
    this.ccSupport = page.locator('.feds-menu-headline[role="heading"]').nth(18);
    this.Partners = page.locator('.feds-menu-headline[role="heading"]').nth(19);

    // Promo
    this.promo4 = page.locator('.feds-promo').nth(3);
    this.promoContent4 = page.locator('.feds-promo-content').nth(3);
    this.promoCTA4 = page.locator('.feds-popup [href*="main"]').nth(6);

    this.adobeSuccessPlans = page.locator('.feds-popup [href*="premier-support.html"]');
    this.adobeProfessionalServices = page.locator('.feds-popup [href*="main.html"]').nth(3);
    this.productDocumentation = page.locator('.feds-popup [href*="docs"]');
    this.communityForums = page.locator('.feds-popup [href*="communities"]');
    this.developerDocumention = page.locator('.feds-popup [href*="developer"]');

    this.supportOverviewCTA = page.locator('.feds-popup [href*="support/main"]');

    this.supportOverview2 = page.locator('.feds-popup [href*="helpx"]').nth(0);
    this.getStarted1 = page.locator('.feds-popup [href*="get-started.html"]');
    this.tutorials = page.locator('.feds-popup [href*="learn"]');
    this.creativeCommunity = page.locator('.feds-popup [href*="community"]');

    this.ourPartnerProgram = page.locator('.feds-popup [href*="partners"]').nth(0);
    this.partnerDirectory = page.locator('.feds-popup [href*="partners"]').nth(1);
    this.adobeExchange = page.locator('.feds-popup [href*="experiencecloud.html"]');
  }

  // U-NAV ELEMENTS VALIDATION
  async validatingUnavElements(country) {
    const elementsToCheck = [
      { element: this.adobeForBusinessLogo, conditions: { defaultVisibility: true } },
      { element: this.gnavProducts, conditions: { defaultVisibility: true } },
      { element: this.gnavAI, conditions: { defaultVisibility: true } },
      { element: this.gnavIndustries, conditions: { defaultVisibility: true } },
      { element: this.gnavRoles, conditions: { defaultVisibility: true } },
      { element: this.gnavResources, conditions: { defaultVisibility: true } },
      { element: this.gnavSupport, conditions: { defaultVisibility: true } },
      { element: this.getStarted, conditions: { defaultVisibility: true } },
      { element: this.rightlogo, conditions: { defaultVisibility: true } },
    ];

    for (const { element, conditions } of elementsToCheck) {
      if (conditions.includeCountries && conditions.includeCountries.includes(country)) {
        await expect(element).toBeVisible({ timeout: 10000 });
      } else if (conditions.excludeCountries && conditions.excludeCountries.includes(country)) {
        await expect(element).not.toBeVisible({ timeout: 10000 });
      } else if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }
  }

  // PRODUCTS DROPDOWN
  async validatingProductsElements() {
    // await this.page.waitForTimeout(10000);
    await this.gnavProducts.click({ timeout: 5000 });
    await this.page.waitForTimeout(5000);

    const headingElements = [
      this.aiAndAgents,
      this.contentAndWorkflows,
      this.creativityAndDesign,
      this.dataAndAnalytics,
      this.featuredProducts,
      this.campaignManagement,
      this.documentProductivity,
      this.ourPlatform,
      this.whatWeSolve,
      this.whatsNew];

    const clickableElements = [
      this.experientPlatform,
      this.brandConcierge,
      this.llmOptimizer,
      this.genstudioForPerformanceMarketing,
      this.experienceManagerSites,
      this.experienceManagerAssets,
      this.adobeCommerce,
      this.workfront,

      this.creativeCloud,
      this.adobeExpress,
      this.adobeFirefly,
      this.frameIO,
      this.fireflyServices,
      this.realtimeCDP,
      this.adobeAnalytics,

      this.jouneyOptimizer,
      this.journeyOptimizerB2BEdition,
      this.marketoEngage,
      this.acrobatStudio,
      this.adobeSign,

      this.viewAllProductsButton,

      this.adobeExperiencePlatform,
      this.personalization,
      this.contentSupplyChain,
      this.unifiedCustomerExperience,
      this.b2bGTMOrchestration,
      this.fireflyCreativeProduction,
      this.fireflyFoundry,
    ];
    for (const element of headingElements) {
      await expect(element).toBeVisible();
    }
    for (const element of clickableElements) {
      await expect(element).toBeVisible();
      await element.click({ trial: true });
    }

    await this.gnavProducts.click({ timeout: 5000 });
  }

  // AI DROPDOWN
  async validatingAiDropdownElements(country) {
    await this.gnavAI.click({ timeout: 5000 });
    await this.page.waitForTimeout(5000);

    const headingElements = [
      { element: this.AIatAdobe, conditions: { defaultVisibility: true } },
      { element: this.featuredOffsprings, conditions: { defaultVisibility: true } },
      { element: this.resources1, conditions: { defaultVisibility: true } },
    ];

    const clickableElements = [
      { element: this.promo1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoContent1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoCTA1, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.aiOverview, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.agentsAtAdobe, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.ourFireflyApproach, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.responsibleAI, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.adobeFirely, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.fireflyServices1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.customModels, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.experiencePlatformAgentOrchestrator, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.llmOptimiser, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.brandConcierge1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.acrobatStudio1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.aiAssistant, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.allAiResources, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.futureOfMakingWithAi, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.howAdobeUsesAi, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.scaleContentCreation, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.howNFLUsesAi, conditions: { defaultVisibility: true, clickable: true } },
      // eslint-disable-next-line max-len
      { element: this.aiOverviewCTA, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Germany', 'Italy', 'United Kingdom', 'Australia', 'Spain', 'Japan', 'India', 'Korea', 'Canada French', 'Portugal', 'Mexico', 'AustraliaEnglish'] } },
      { element: this.aiOverviewCTAregion, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['United States'] } },
    ];

    await Promise.all(headingElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await Promise.all(clickableElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }

      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
        await element.click({ trial: true });
      }
    }));

    await this.gnavAI.click({ timeout: 5000 });
  }

  // INDUSTRIES DROPDOWN
  async validatingIndustriesDropdownElements(country) {
    await this.gnavIndustries.click({ timeout: 5000 });
    await this.page.waitForTimeout(5000);

    const headingElements = [
      { element: this.industries, conditions: { defaultVisibility: true } },
      { element: this.resources2, conditions: { defaultVisibility: true } },
      { element: this.featuredUseCases, conditions: { defaultVisibility: true } },
    ];

    const clickableElements = [
      { element: this.promo2, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoContent2, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoCTA2, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Japan', 'India', 'Korea', 'Canada French', 'Mexico', 'Portugal'] } },
      { element: this.promoCTA2region, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['United States', 'United Kingdom'] } },

      { element: this.financialServices, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.highTech, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.healthcareAndLife, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Japan', 'India', 'Korea', 'United Kingdom', 'Canada French', 'Mexico', 'Portugal'] } },
      { element: this.government, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Canada French', 'Germany', 'Japan', 'Portugal'] } },
      { element: this.retail, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.manufacturing, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Japan', 'India', 'Korea', 'United Kingdom', 'Canada French', 'Mexico', 'Portugal'] } },
      { element: this.mediaAndEntertainment, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.Sports, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Italy', 'Japan', 'India', 'Germany', 'France', 'Spain', 'Korea', 'AustraliaEnglish', 'Canada French', 'Mexico', 'Portugal'] } },

      { element: this.seeAllIndustries, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.resourceCenter1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.customerSuccessStories1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.analystReports1, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Japan', 'India', 'Korea', 'United Kingdom', 'Canada French', 'Mexico', 'Portugal'] } },
      { element: this.webinars1, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Portugal'] } },

      { element: this.prudential, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.qualcomm, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.lumen, conditions: { defaultVisibility: true, clickable: true } },
    ];

    await Promise.all(headingElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await Promise.all(clickableElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }

      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
        await element.click({ trial: true });
      }
    }));

    await this.gnavIndustries.click({ timeout: 5000 });
  }

  // ROLES DROPDOWN
  async validatingRolesDropdownElements(country) {
    await this.gnavRoles.click({ timeout: 5000 });
    await this.page.waitForTimeout(5000);

    const headingElements = [
      { element: this.role, conditions: { defaultVisibility: true } },
      { element: this.masteringResources, conditions: { defaultVisibility: true } },
      { element: this.creativeResources, conditions: { defaultVisibility: true } },
      { element: this.itResources, conditions: { defaultVisibility: true } },
    ];
    const clickableElements = [
      { element: this.cmo, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.cio, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.creativeLeader, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Korea'] } },
      { element: this.marketingLeader, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.itLeader, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.futureOfMarketing, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.turnContent, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.topCX, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.consumerAndmarket, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.creativeTrendsReports, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.adobeScales, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.newellBrands, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.masteringText, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.responsibleAIAdoption, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.topCX, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.roi, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.personalisation, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.viewAllResourcesCTA, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Portugal'] } },
      { element: this.viewAllResourcesCTAregion, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Japan', 'India', 'Korea', 'United Kingdom', 'Canada French', 'Mexico', 'United States'] } },
    ];

    await Promise.all(headingElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await Promise.all(clickableElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }

      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
        await element.click({ trial: true });
      }
    }));

    await this.gnavRoles.click({ timeout: 5000 });
  }

  // RESOURCESS DROPDOWN
  async validatingResourcesDropdownElements(country) {
    await this.gnavResources.click({ timeout: 5000 });

    const headingElements = [
      { element: this.resources3, conditions: { defaultVisibility: true } },
      { element: this.events, conditions: { defaultVisibility: true } },
      { element: this.trendingTopics, conditions: { defaultVisibility: true } },
    ];

    const clickableElements = [
      { element: this.promo3, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoContent3, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoCTA3, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.custmerSuccessStories2, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.analystReports2, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Canada French', 'Mexico', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Japan', 'India', 'Korea', 'United Kingdom', 'Portugal'] } },
      { element: this.adobeForBusinessBlogRegion, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['United Kingdom', 'United States'] } },
      { element: this.adobeForBusinessBlog, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Portugal', 'France', 'Canada French', 'Mexico', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Japan', 'India', 'Korea', 'Portugal'] } },
      { element: this.webinars2, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Portugal'] } },
      { element: this.resourceCenter2CTA, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Portugal'] } },

      { element: this.adobeSummit, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.adobeMax, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.allBusinessEvents, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['United Kingdom'] } },

      { element: this.aiAndDigitalTrends1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.adobeConsumerInsights1, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Canada French', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Mexico', 'Japan', 'India', 'Korea', 'United Kingdom', 'Portugal'] } },
      { element: this.personalizationAtScale1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.expertInsights, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Canada French', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Mexico', 'Japan', 'India', 'Korea', 'United Kingdom', 'Portugal'] } },
    ];

    await Promise.all(headingElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await Promise.all(clickableElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }

      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
        await element.click({ trial: true });
      }
    }));

    await this.gnavResources.click({ timeout: 5000 });
  }

  // SUPPORT DROPDOWN
  async validatingSupportDropdownElements(country) {
    await this.gnavSupport.click({ timeout: 5000 });
    await this.page.waitForTimeout(5000);

    const headingElements = [
      { element: this.experienceCloudSupport, conditions: { defaultVisibility: true } },
      { element: this.ccSupport, conditions: { defaultVisibility: true } },
      { element: this.Partners, conditions: { defaultVisibility: true } },
    ];

    const clickableElements = [
      { element: this.promo4, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoContent4, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.promoCTA4, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.adobeSuccessPlans, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.adobeProfessionalServices, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Portugal'] } },
      { element: this.productDocumentation, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.communityForums, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.developerDocumention, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.supportOverviewCTA, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.supportOverview2, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.getStarted1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.tutorials, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.creativeCommunity, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.ourPartnerProgram, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.partnerDirectory, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.adobeExchange, conditions: { defaultVisibility: true, clickable: true } },
    ];

    await Promise.all(headingElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await Promise.all(clickableElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }

      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
        await element.click({ trial: true });
      }
    }));

    await this.gnavSupport.click({ timeout: 5000 });
  }

  // CTA CLICK
  async validatingGetStartedCTAClick() {
    const originalUrl = this.page.url();

    await expect(this.getStarted).toBeVisible();
    await this.getStarted.click({ timeout: 5000 });

    // Wait for navigation + validate redirected page
    await expect(this.page).not.toHaveURL(originalUrl);
    await this.page.waitForTimeout(5000);

    await this.page.goBack();

    await expect(this.page).toHaveURL(originalUrl);
    await expect(this.getStarted).toBeVisible();
  }

  // FOOTER
  async validatingFooterElements(country) {
    await this.feds.regionpicker.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(5000);

    const footerHeadingElements = [
      { element: this.feds.contactUs, conditions: { defaultVisibility: true } },
      { element: this.feds.largeAndMediumBusiness, conditions: { defaultVisibility: true } },
      { element: this.feds.individualsAndSmallBusiness, conditions: { defaultVisibility: true } },
      { element: this.feds.resourcesAndSupport, conditions: { defaultVisibility: true } },
      { element: this.feds.adobe, conditions: { defaultVisibility: true } },
      { element: this.feds.ourSolutions, conditions: { defaultVisibility: true } },
    ];

    // Footer clickable links
    const footerClickableElements = [
      { element: this.feds.requestDemo, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.personalizationAtScale, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.contentSupplyChain, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.unifiedCustomerExperience, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.creativityAndProduction, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.b2b, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.genAi, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.feds.exploreAllProducts, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.acrobatPro, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.acrobatSign, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeAnalytics, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeExpress1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeFireflySolutions, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.footerCreativeCloudForBusiness, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.experienceManager, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.frameioBusiness, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.genStudio, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.realTimeCDP, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.feds.exploreAllProducts, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeExpress2, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeFirefly, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeStock, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.creativeCloud1, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.illustrator, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.photoshop, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobePremiere, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.feds.resourceCenter, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['Portugal'] } },
      { element: this.feds.customerSuccessStories, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeForBblog, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['United Kingdom'] } },
      { element: this.feds.experienceCloudSupport, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.ccSupport, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.communityForums, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.developerResources, conditions: { defaultVisibility: true, clickable: true } },

      { element: this.feds.about, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.AiOverview, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.careers, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.events, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['United Kingdom'] } },
      { element: this.feds.newsroom, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.corporateResponsibility, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.investorRelations, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.supplyChain, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.trustCenter, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeForAll, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adobeForBblogUK, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Canada French', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Mexico', 'Japan', 'India', 'Korea', 'United States', 'Portugal'] } },
      { element: this.feds.resourceCenterPT, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Canada French', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Mexico', 'Japan', 'India', 'Korea', 'Portugal', 'United States', 'United Kingdom'] } },
      { element: this.feds.eventsUK, conditions: { defaultVisibility: true, clickable: true, excludeCountries: ['France', 'Canada French', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Mexico', 'Japan', 'India', 'Korea', 'Portugal', 'United States'] } },

      // FEDs footer utilities
      { element: this.feds.regionpicker, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.facebookIcon, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.instagramIcon, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.twitterIcon, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.linkedInIcon, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.legalCopyright, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.cookiePreferencesLink, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.protectMyPersonalData, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adChoicesLogo, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.adChoicesLink, conditions: { defaultVisibility: true, clickable: true } },
      { element: this.feds.termsOfUseLinkCA, conditions: { defaultVisibility: true, clickable: true } },
    ];

    await Promise.all(footerHeadingElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }
      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
      }
    }));

    await Promise.all(footerClickableElements.map(async ({ element, conditions }) => {
      if (conditions.excludeCountries?.includes(country)) {
        return;
      }

      if (conditions.defaultVisibility) {
        await expect(element).toBeVisible();
        await element.click({ trial: true });
      }
    }));
  }

  // Cookie Preference
  async validatingCookiePreference(country) {
    const includeCountries = ['France', 'Canada French', 'Germany', 'Italy', 'AustraliaEnglish', 'Spain', 'Mexico', 'Japan', 'India', 'Korea', 'Portugal', 'United States', 'United Kingdom', 'United States'];

    if (includeCountries.includes(country)) {
      await this.feds.cookies.click();
    }

    await this.page.waitForTimeout(2000);
    await expect(this.feds.cookieSettings).toBeVisible();
    await expect(this.feds.operate).toBeChecked();
    await expect(this.feds.measure).toBeChecked();
    await expect(this.feds.extend).toBeChecked();
    await expect(this.feds.personalize).toBeChecked();
    await this.feds.closeCookie.click();
  }

  // Change Region
  async validatingChangeRegion(country) {
    const regionLocales = [
      this.feds.deutsche,
      this.feds.AU,
      this.feds.UK,
      this.feds.US,
      this.feds.francias,
      this.feds.italian,
      this.feds.spanish,
      this.feds.portuguese,
      this.feds.jp,
      this.feds.kr,
      this.feds.searchContainer,
    ];

    await this.feds.regionpicker.click();
    await this.page.waitForTimeout(2000);
    await this.feds.searchContainer.scrollIntoViewIfNeeded();

    for (const locale of regionLocales) {
      await expect(locale).toBeVisible();
      await locale.click({ trial: true });
    }
    // await this.feds.regionpicker.click();
    const includeCountries = ['United States'];

    if (includeCountries.includes(country)) {
      await this.feds.UK.click();
      await expect(this.page).toHaveURL('https://business.stage.adobe.com/uk/?mep=off&&georouting=off#modal-hash');
    } else {
      await this.feds.US.click();
      await expect(this.page).toHaveURL('https://business.stage.adobe.com/?mep=off&&georouting=off#modal-hash');
    }
  }
}
