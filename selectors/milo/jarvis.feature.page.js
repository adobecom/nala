import { expect } from '@playwright/test';

export default class Jarvis {
    constructor(page) {
        this.page = page;

        // Jarvis locators in page
    
        this.jarvischaticon = page.locator('//button[@id="adbmsgCta"]');
        this.jarvischaticonclick = page.getByRole('button' , {id : "adbmsgCta"});
        this.jarvistooltip = page.locator('//*[@aria-label="Chat with us"]');
        this.javisstartchat = page.locator('//button[@id="adbmsgContentContainer"]');
        this.jarvisiframewindow = page.locator('//div[@id="adbmsgContentContainer"]');
        this.jarvishelptext = page.locator('//*[contains(text(), "How can I help you")]');
        
    }
}
 