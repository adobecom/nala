import { Page } from './page';

/** Class representing a page on AEM author */
export class AuthorPage extends Page {
  get onboardingPopover() {
    return displayed$('.granite-shell-onboarding-popover');
  }

  get dontShowThisAgain() {
    return displayed$('.granite-shell-onboarding-popover input');
  }  

  get closePopover() {
    return displayed$('.granite-shell-onboarding-popover button[coral-close]');
  }  

  dismissPopover() {
    if (onboardingPopover) {
      dontShowThisAgain.click();
      closePopover.click();
    }
  }
}