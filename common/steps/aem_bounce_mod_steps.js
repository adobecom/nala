/** @module dexter_bounce_mod/steps */
const { Given } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');
const { When } = require('@cucumber/cucumber');

Then(/^I see the bounce editor in the preview mode$/, iSeeBounceEditorInPreview);

Then(/^I see (the|no) bounce animation data in the component with id "([^"]*)":$/, iShouldSeeBounceAnimData);

Then(/^I add bounce animation to the component with id "([^"]*)"$/, iAddBounceAnimToCompWithId);

Then(/^I add the bounce animation:$/, iAddBounceAnimData);

Then(/^I click on the "([^"]*)"(| for)(| "[^"]*") in bounce editor$/, iDoOperInBounceEditor);

  /**
   * Step Definition:
   * ```
   * /^I see the bounce editor in the preview mode$/
   * ```
   */
  function iSeeBounceEditorInPreview() {
    // Ensure bounce editor is shown
    expect(browser.$(`.bounce-dialog`).isDisplayed()).toEqual(true);
  }

  /**
   * Step Definition:
   * ```
   * /^I add bounce animation to the component with id "([^"]*)"$/
   * ```
   */
  function iAddBounceAnimToCompWithId(compId) {
    this.step('I click on the "bounceAnimSelectComp"');
    browser.switchToFrame('ContentFrame');
    let position = browser.$(`//div[@id="${compId}"]`);
    position.click();
    browser.switchToParentFrame();
  }

  /**
   * Step Definition:
   * ```
   * /^I add the bounce animation:"$/
   *     | Animation Name        | AnimationOne       |
   *     | Left to Right Start   | 12                 |
   *     | Left to Right End     | 80                 |
   *     | Top to Bottom Start   | 22                 |
   *     | Top to Bottom End     | 120                |
   *     | Apply On              | Click              |
   *     | Duration              | 8                  |
   *     | Iteration             | 2                  |
   *     | Delay                 | 2                  |
   *     | Easing                | Ease In Out        |
   *     | Direction             | Reverse            |
   *     | Fill Mode             | None               |
   *     | Offset                | 10                 |
   * ```
   */
  function iAddBounceAnimData(table) {
    const specs = table.rowsHash();
    // Attributes
    const {
      'Animation Name': animationName,
      'Animation Type': animationType,
      'Fade Min': fadeMin,
      'Fade Max': fadeMax,
      'Apply On': applyOn,
      'Duration': duration,
      'Iteration': iteration,
      'Delay': delay,
      'Easing': easing,
      'Direction': direction,
      'Fill Mode': fillMode,
      'Offset': offset,
      'Left to Right Start': moveXStart,
      'Left to Right End': moveXEnd,
      'Top to Bottom Start': moveYStart,
      'Top to Bottom End': moveYEnd,
      'Scale Start': scaleStart,
      'Scale End': scaleEnd,
      'Rotate Start': rotateStart,
      'Rotate End': rotateEnd,
      'Skew Start': skewStart,
      'Skew End': skewEnd
    } = specs;

    // Set Bounce Animation Name
    this.page.setBounceAnimationName(animationName);

    this.page.setBounceAnimationType(animationType);

    // Fade related parameters
    this.page.setBounceFadeAnim(fadeMin, fadeMax);

    // Move Releated 
    this.page.setBounceMoveAnim(moveXStart, moveXEnd, moveYStart, moveYEnd);

    // Scale
    this.page.setBounceScaleAnim(scaleStart, scaleEnd);

    // Rotate
    this.page.setBounceRotateAnim(rotateStart, rotateEnd);

    // Skew
    this.page.setBounceSkewAnim(skewStart, skewEnd);

    // Other Settings
    this.page.setBounceOtherSettings(applyOn, duration, iteration);

    // Advanced Settings
    this.page.setBounceAdvancedSettings(delay, easing, direction, fillMode, offset)
  }

  /**
   * Step Definition:
   * ```
   * /^I should see the bounce animation data in the component with id "([^"]*)":$/
   *     | fadeStart | 10   |
   *     | fadeEnd   | 80   | 
   * ```
   */
  function iShouldSeeBounceAnimData(optIsPresent, compId, table) {
    browser.switchToFrame('ContentFrame');
    const position = browser.$(`//div[@id="${compId}"]`);
    const bAJsonDataField = position.getAttribute('data-bounce-animation');
    browser.switchToParentFrame();
    const bAJson = JSON.parse(bAJsonDataField);
    if (optIsPresent && optIsPresent === 'no') {
      expect(bAJsonDataField).toBe("[]");
    } else {
      const specs = table.rowsHash();
      const props = Object.getOwnPropertyNames(specs);
      props.forEach((p) => {
        // console.log(p);
        const found = !!bAJson.find(ao => {
            // Un-comment to debug values
            // console.log(ao.animationObj[p]);
            // console.log(specs[p]);
            return ao.animationObj[p] == specs[p];
        });
        expect(found).toBe(true);
      });
    }
  }

  /**
   * Step Definition:
   * ```
   * /^I click on the "([^"]*)"(| for)(| "[^"]*") in bounce editor$/
   * ```
   */
  function iDoOperInBounceEditor(comp, forLbl, animLbl) {
    const elem = animLbl ? 
      browser.$(`//p[contains(text(),${animLbl})]/..//button[@aria-label = "${comp}"]`) :
      browser.$(`//div[@class="bounce-dialog"]//span[contains(text(),"${comp}")]/..`);
    elem.click();
  }
  