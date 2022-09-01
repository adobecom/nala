import { Section } from './section';

/** Class representing a Drift popup */
export class Drift extends Section {
  /**
   * @type {object}
   * @description Drift controller iframe
   */
  get driftControllerIframe() {
    return $('//*[@id="drift-frame-controller"]/iframe');
  }

  /**
   * @type {object}
   * @description Drift chat iframe
   */
  get driftChatIframe() {
    return $('//*[@id="drift-frame-chat"]/iframe');
  }

  /**
   * @type {object}
   * @description Drift messenger preview close button
   */
  get driftChatCloseBtn() {
    return $('//button[contains(@class, "drift-widget-close-button")]');
  }

  /**
   * @type {object}
   * @description Drift wdiget controller close button
   */
  get driftWidgetControllerCloseBtn() {
    return $('//button[contains(@class, "drift-widget-controller--closed")]');
  }

  /**
   * perform cb in DriftControllerIframe
   * @param {function} cb cb to be called in iframe
   */
  inDriftControllerIframe(cb) {
    this.cbInIframe(this.driftControllerIframe, cb);
  }

  /**
   * perform cb in DriftChatIframe
   * @param {function} cb cb to be called in iframe
   */
  inDriftChatIframe(cb) {
    this.cbInIframe(this.driftChatIframe, cb);
  }

  /**
   * perform cb in an Iframe
   * @param {Object} frame iframe to be entered
   * @param {function} cb cb to be called in iframe
   */
  cbInIframe(frame, cb) {
    browser.switchToFrame(frame);
    cb();
    browser.switchToParentFrame();
  }
}
