import { AemAuthorPage } from './aem_author_page';

/** Page class for AEM start page*/
export class AemAuthorProjectsPage extends AemAuthorPage {
  constructor(contentPath) {
    super();
    this.buildProps({
      urlPath: `/projects.html${contentPath}`,

      createButton: 'button[title="Create"]',
      createProject: '.cq-projects-admin-create',
      nextButton: ['this.displayed$', 'button[data-foundation-wizard-control-action="next"]'],
      templateCard: 'coral-masonry-item',
      templateCards: '$$coral-masonry-item',

      titleInput: 'input[name="jcr:title"]',
      openButton: '.coral3-Dialog-wrapper .coral3-Button--primary',
      contentStructureMenu: 'coral-select[name="contentStructure"]',
      homepageContentStructure: '//coral-selectlist-item[contains(text(), "Homepage Content")]',

      propertyMenu: '//a[@icon="properties"]',
      openProperties: '//button[@title="Open Properties"]',
      globalCheckButton: '.targetLanguages-dialog-button',
      fileSingleWebPageButton: '//a[contains(@data-copy-pages-to-clipboard-path, "copypagepaths")]',
      addItemButton: '//a[contains(@href, "generator")]',

      addTopButton: '.coral3-Icon--add',
      addPagesOption: '//*[text()="Pages/Assets"]',
      addPagesViaTextboxOption: '//*[text()="Pages/XFs via textbox"]',
      addXFsOption: '//*[text()="Experience Fragments"]',
      addDescendantsButton: '//*[text()="Add Descendants"]',
      addXFRsButton: '//*[text()="Add XF References"]',
      addConfirmButton: '#cq-projects-translation-job-add-pages',
      confirmButton: '.js-coral-pathbrowser-confirm',
      confirmXFButton: '//*[text()="Select Experience Fragment"]/following-sibling::button',
      submitButton: '.submit-button',
      accordionDownButton: '.cq-projects-tile-actions.coral3-Button.coral3-Button--secondary',
      generateSubprojectsButton: '.action-id-generateSubProjects',
      startSubprojectsButton: '.action-id-startSubProjects',
      cancelAllSubprojectsButton: '.action-id-cancelJobs',

      bettyBreadcrumbsButton: '.betty-breadcrumbs-button',
      rolloutPageLink: '.rollout-page-link',
      rolloutStepOne: '.rollout-step-one',
      rolloutButton: '.cq-project-translation-rollout-button',
      copyProjectButton: '.copyProject-dialog-button'
    })
  }
}