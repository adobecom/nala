import { Section } from './section';

/** Class representing Bounce Editor componentt */
export class BounceEditorSection extends Section {

  constructor() {
    super();
    this.buildProps({
      // Bounce animation related
      bounceEditor: '//div[@class="bounce-dialog"]',
      bounceAnimSelectComp: '//button//p[contains(text(),"SELECT COMPONENT")]',
      bounceAnimType: '//div[@class="bounce-dialog"]//button[@id="menu-btn"]'
    });
  }

  /**
   * Search for bounce input type field by name
   * @param  {string} field to search for
   */
  getBounceInputFieldByName(field) {
    return browser.$(`//div[@class="bounce-dialog"]//input[@name = "${field}" and not(@type = "hidden")]`);
  }

  /**
   * Search for bounce input type field by label
   * @param  {string} label to search for
   */
  getBounceInputFieldByLabel(label) {
    return browser.$(`//div[@class="bounce-dialog"]//span[contains(text(),"${label}")]`);
  }

  /**
   * Search for a bounce dropdown by id
   * @param  {string} field dropdown to search for
   */
  getBounceSelecttFieldById(field) {
    return browser.$(`//div[@class="bounce-dialog"]//select[@id = "${field}"]`);
  }

  /**
   * Get the bounce dropdown selected value
   * @param  {string} val or dropdown field name
   */
  getBounceSelectValue(val) {
    return val ? val.replace(/ /g, '-').toLowerCase() : '';
  }
  
  /**
   * Set the value to an bounce element
   * @param  {HTMLHtmlElement} e is the element to which value would be set
   * @param  {string} val is the value to be set
   */
  setBounceFieldValue(e, val) {
    if (e) {
      // For bounce fields with default text, setValue is appending instead of overwriting
      e.click();
      browser.keys(['Meta', 'a', '\ue000'].concat((''+val).split('')));
    }
  }

  /**
   * Set the bounce animation name
   * @param  {string} animationName to be set
   */
  setBounceAnimationName(animationName) {
    if (animationName) {
      this.getBounceInputFieldByName('animationName').setValue(animationName);
    }
  }

  /**
   * Set the bounce animation type
   * @param  {string} at is the animation type to be set
   */
  setBounceAnimationType(at) {
    if (at) {
      this.checkElementName('bounceAnimType').click();
      browser.pause(500);
      browser.$(`//div[@class="MuiPopover-root"]//span[contains(text(),"${at}")]`).click();
      browser.pause(500);
    }
  }

  /**
   * Set the bounce fade parameters
   * @param  {string} fadeMin Min fade value 
   * @param  {string} fadeMax Max fade value
   */
  setBounceFadeAnim (fadeMin, fadeMax) {
    if (fadeMin || fadeMax) {
      this.setBounceAnimationType('Fade');
      if (fadeMin) {
        this.setBounceFieldValue(this.getBounceInputFieldByName('fadeMin'), Number(fadeMin));      
      }

      if (fadeMax) {
        this.setBounceFieldValue(this.getBounceInputFieldByName('fadeMax'), Number(fadeMax));
      }
    }
  }

  /**
   * Set the bounce move animation parameters
   * @param  {string} moveXStart is the top left position
   * @param  {string} moveXEnd is the top right position
   * @param  {string} moveYStart is the bottom left position
   * @param  {string} moveYEnd is the bottom left right
   */
  setBounceMoveAnim (moveXStart, moveXEnd, moveYStart, moveYEnd) {
    if (moveXStart || moveXEnd || moveYStart || moveYEnd) {
      this.setBounceAnimationType('Move');
      if (moveXStart) {
        this.getBounceInputFieldByName('moveXStart').setValue(Number(moveXStart));   
      }

      if (moveXEnd) {
        this.getBounceInputFieldByName('moveXEnd').setValue(Number(moveXEnd));   
      }

      if (moveYStart) {
        this.getBounceInputFieldByName('moveYStart').setValue(Number(moveYStart));   
      }

      if (moveYEnd) {
        this.getBounceInputFieldByName('moveYEnd').setValue(Number(moveYEnd));   
      }
    }
  }

  /**
   * Set the bounce scale animation parameters
   * @param  {string} scaleStart is starting scale/zoom value
   * @param  {string} scaleEnd is ending scale/zoom value
   */
  setBounceScaleAnim(scaleStart, scaleEnd) {
    if (scaleStart || scaleEnd) {
      this.setBounceAnimationType('Scale');
      if (scaleStart) {
        this.getBounceInputFieldByName('scaleStart').setValue(Number(scaleStart));   
      }
      
      if (scaleEnd) {
        this.getBounceInputFieldByName('scaleEnd').setValue(Number(scaleEnd));   
      }
    }
  }

  /**
   * Set the bounce rotate animation parameters
   * @param  {string} rotateStart is the inital rotation value
   * @param  {string} rotateEnd is the final rotation value
   */
  setBounceRotateAnim(rotateStart, rotateEnd) {
    if (rotateStart || rotateEnd) {
      this.setBounceAnimationType('Rotate');
      const rotateParentNode = '//div[@class="bounce-dialog"]//p[contains(text(),"Rotate Start")]';
      const rotateStartNode = rotateParentNode + '/../div[1]/div[2]/div/input';
      const rotateEndNode = rotateParentNode + '/../div[2]/div[2]/div/input';
      if (rotateStart) {
        this.setBounceFieldValue(browser.$(rotateStartNode), Number(rotateStart));   
      }
      
      if (rotateEnd) {
        this.setBounceFieldValue(browser.$(rotateEndNode), Number(rotateEnd));   
      }    
    }
  }

  /**
   * Set the bounce skew animation parameters
   * @param  {string} skewStart is the initial skew value
   * @param  {string} skewEnd is the final skew value
   */
  setBounceSkewAnim(skewStart, skewEnd) {
    if (skewStart || skewEnd) {
      this.setBounceAnimationType('Skew');
      if (skewStart) {
        this.getBounceInputFieldByName('skewStart').setValue(Number(skewStart));   
      }
      
      if (skewEnd) {
        this.getBounceInputFieldByName('skewEnd').setValue(Number(skewEnd));   
      }
    }
  }
  
  /**
   * Set few other parameters like effect, duration and iteration
   * @param  {string} applyOn is the effect type
   * @param  {string} duration of animation
   * @param  {string} iteration of the number of times the animation is to repeat
   */
  setBounceOtherSettings(applyOn, duration, iteration) {
    // Other Settings
    if (applyOn) {
      this.getBounceSelecttFieldById('effectType').selectByAttribute("value", this.getBounceSelectValue(applyOn));      
    }
    
    if (duration) {
      this.setBounceFieldValue(this.getBounceInputFieldByName('animationDuration'), Number(duration));
    }

    if (iteration) {
      this.setBounceFieldValue(this.getBounceInputFieldByName('animationIteration'), Number(iteration));
    }
  }

  /** 
   * Set the advanced settings
   * 
   * @param  {string} delay is the starting delay
   * @param  {string} easing of the animation
   * @param  {string} direction of the animation
   * @param  {string} fillMode of the animation
   * @param  {string} offset of the animation
   */
  setBounceAdvancedSettings(delay, easing, direction, fillMode, offset) {
    this.getBounceInputFieldByLabel('Advanced Settings').click();
    if (delay) {
      this.getBounceInputFieldByName('animationDelay').setValue(Number(delay));      
    }

    if (easing) {
      this.getBounceSelecttFieldById('animationEasing').selectByAttribute("value", this.getBounceSelectValue(easing));      
    }

    if (direction) {
      this.getBounceSelecttFieldById('animationDirection').selectByAttribute("value", this.getBounceSelectValue(direction));      
    }

    if (fillMode) {
      this.getBounceSelecttFieldById('animationFillMode').selectByAttribute("value", this.getBounceSelectValue(fillMode));      
    }

    if (offset) {
      this.getBounceInputFieldByName('animationOffset').setValue(Number(offset));      
    }    
  }
}
