import { Section } from './section';

/** Class representing card collection component */
export class CardCollection extends Section {
  /**
   * @type {object}
   * @description Consonant card
   */
  get consonantCards() {
    return $$('.consonant-card');
  }
}
