export default class NoteText {
  constructor(page) {
    this.page = page;

        //Legal Notices
        this.b1ContentDiv = page.locator("//div[contains(@daa-lh, 'b1|content')][contains(@class, 'content')]");
        this.b1H1Element = page.locator("//div[contains(@daa-lh, 'b1|content')][contains(@class, 'content')]/h1[@id='legal-and-privacy-notice-test']");
        this.b1StrongElement = page.locator("//div[contains(@daa-lh, 'b1|content')][contains(@class, 'content')]/h1[@id='legal-and-privacy-notice-test']/strong");
        this.b1Paragraphs = page.locator("//div[contains(@daa-lh, 'b1|content')][contains(@class, 'content')]/p");
        this.b1FirstLink = page.locator("//div[contains(@daa-lh, 'b1|content')][contains(@class, 'content')]/p/a[1]");
        this.b1SecondLink = page.locator("//div[contains(@daa-lh, 'b1|content')][contains(@class, 'content')]/p/a[2]");


        this.b2LegalPrivacyNotice = page.locator("//div[contains(@daa-lh, 'b2|legal-privacy-n')][contains(@class, 'legal-privacy-notice')]");
        this.b2FailedAttribute = page.locator("//div[contains(@daa-lh, 'b2|legal-privacy-n')][contains(@class, 'legal-privacy-notice')]/@data-failed");
        this.b2ReasonAttribute = page.locator("//div[contains(@daa-lh, 'b2|legal-privacy-n')][contains(@class, 'legal-privacy-notice')]/@data-reason");


        this.b3ContentDiv = page.locator("//div[contains(@daa-lh, 'b3|content')][contains(@class, 'content')]");
        this.b3Paragraphs = page.locator("//div[contains(@daa-lh, 'b3|content')][contains(@class, 'content')]/p");
        this.b3FirstLink = page.locator("//div[contains(@daa-lh, 'b3|content')][contains(@class, 'content')]/p/a[1]");
        this.b3SecondLink = page.locator("//div[contains(@daa-lh, 'b3|content')][contains(@class, 'content')]/p/a[2]");
        this.b3StrongElement = page.locator("//div[contains(@daa-lh, 'b3|content')][contains(@class, 'content')]/p/strong");

        this.b4LegalPrivacyNotice = page.locator("//div[contains(@daa-lh, 'b4|legal-privacy-n')][contains(@class, 'legal-privacy-notice')]");
        this.b4FailedAttribute = page.locator("//div[contains(@daa-lh, 'b4|legal-privacy-n')][contains(@class, 'legal-privacy-notice')]/@data-failed");
        this.b4ReasonAttribute = page.locator("//div[contains(@daa-lh, 'b4|legal-privacy-n')][contains(@class, 'legal-privacy-notice')]/@data-reason");

        this.b5ContentDiv = page.locator("//div[contains(@daa-lh, 'b5|content')][contains(@class, 'content')]");
        this.b5Paragraph = page.locator("//div[contains(@daa-lh, 'b5|content')][contains(@class, 'content')]/p");
        this.b5StrongElement = page.locator("//div[contains(@daa-lh, 'b5|content')][contains(@class, 'content')]/p/strong");


        this.b6LegalNoticeOnlinePrivacy = page.locator("//div[contains(@daa-lh, 'b6|legal-notice-on')][contains(@class, 'legal-notice-online-privacy-policy')]");
        this.b6FailedAttribute = page.locator("//div[contains(@daa-lh, 'b6|legal-notice-on')][contains(@class, 'legal-notice-online-privacy-policy')]/@data-failed");
        this.b6ReasonAttribute = page.locator("//div[contains(@daa-lh, 'b6|legal-notice-on')][contains(@class, 'legal-notice-online-privacy-policy')]/@data-reason");

        this.b7ContentDiv = page.locator("//div[contains(@daa-lh, 'b7|content')][contains(@class, 'content')]");
        this.b7Paragraph = page.locator("//div[contains(@daa-lh, 'b7|content')][contains(@class, 'content')]/p");
        this.b7StrongElement = page.locator("//div[contains(@daa-lh, 'b7|content')][contains(@class, 'content')]/p/strong");

        this.b8LegalNoticeOnlinePrivacy = page.locator("//div[contains(@daa-lh, 'b8|legal-notice-on')][contains(@class, 'legal-notice-online-privacy-policy')]");
        this.b8FailedAttribute = page.locator("//div[contains(@daa-lh, 'b8|legal-notice-on')][contains(@class, 'legal-notice-online-privacy-policy')]/@data-failed");
        this.b8ReasonAttribute = page.locator("//div[contains(@daa-lh, 'b8|legal-notice-on')][contains(@class, 'legal-notice-online-privacy-policy')]/@data-reason");


}
};
