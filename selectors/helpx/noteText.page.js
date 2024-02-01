export default class NoteText {
  constructor(page) {
    this.page = page;

    // note Text with bullet points Selectors:
    this.b1textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b1|note')][contains(@class,'note note')]");
    this.b1textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b1|note')][contains(@class,'note note')]/child::span[contains(@class,'note-icon')]")
    this.b1contentDiv = page.locator("//div[contains(@daa-lh,'b1|note')][contains(@class,'note note')]/descendant::div[@class='content']");
    this.b1innerDiv = page.locator("//div[contains(@daa-lh,'b1|note')][contains(@class,'note note')]/descendant::div[@class='content']/div");
    this.b1ulElement = page.locator("//div[contains(@daa-lh,'b1|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul");
    this.b1firstLiElement = page.locator("//div[contains(@daa-lh,'b1|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul/li[1]");
    this.b1secondLiElement = page.locator("//div[contains(@daa-lh,'b1|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul/li[2]");

    // caution Note Text with bullet points Selectors:
    this.b2textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b2|note')][contains(@class,'note caution')]");
    this.b2textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b2|note')][contains(@class,'note caution')]/descendant::span[contains(@class,'note-icon')]");
    this.b2contentDiv = page.locator("//div[contains(@daa-lh,'b2|note')][contains(@class,'note caution')]/descendant::div[@class='content']");
    this.b2innerDiv = page.locator("//div[contains(@daa-lh,'b2|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div");
    this.b2ulElement = page.locator("//div[contains(@daa-lh,'b2|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ul");
    this.b2firstLiElement = page.locator("//div[contains(@daa-lh,'b2|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ul/li[1]");
    this.b2secondLiElement = page.locator("//div[contains(@daa-lh,'b2|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ul/li[2]");


    // alert Note Text with bullet points Selectors:
    this.b3textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b3|note')][contains(@class,'note alert')]");
    this.b3textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b3|note')][contains(@class,'note alert')]/descendant::span[contains(@class,'note-icon')]");
    this.b3contentDiv = page.locator("//div[contains(@daa-lh,'b3|note')][contains(@class,'note alert')]/descendant::div[@class='content']");
    this.b3innerDiv = page.locator("//div[contains(@daa-lh,'b3|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div");
    this.b3ulElement = page.locator("//div[contains(@daa-lh,'b3|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div/ul");
    this.b3firstLiElement = page.locator("//div[contains(@daa-lh,'b3|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div/ul/li[1]");
    this.b3secondLiElement = page.locator("//div[contains(@daa-lh,'b3|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div/ul/li[2]");


    // tip Note Text with bullet points Selectors:
    this.b4textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b4|note')][contains(@class,'note tip')]");
    this.b4textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b4|note')][contains(@class,'note tip')]/descendant::span[contains(@class,'note-icon')]");
    this.b4contentDiv = page.locator("//div[contains(@daa-lh,'b4|note')][contains(@class,'note tip')]/descendant::div[@class='content']");
    this.b4innerDiv = page.locator("//div[contains(@daa-lh,'b4|note')][contains(@class,'note tip')]/descendant::div[@class='content']/div");
    this.b4ulElement = page.locator("//div[contains(@daa-lh,'b4|note')][contains(@class,'note tip')]/descendant::div[@class='content']/div/ul");
    this.b4firstLiElement = page.locator("//div[contains(@daa-lh,'b4|note')][contains(@class,'note tip')]/descendant::div[@class='content']/div/ul/li[1]");
    this.b4secondLiElement = page.locator("//div[contains(@daa-lh,'b4|note')][contains(@class,'note tip')]/descendant::div[@class='content']/div/ul/li[2]");

      // caution Note Text with ordered list Selectors:
      this.b5textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b5|note')][contains(@class,'note caution')]");
      this.b5textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b5|note')][contains(@class,'note caution')]/descendant::span[contains(@class,'note-icon')]");
      this.b5contentDiv = page.locator("//div[contains(@daa-lh,'b5|note')][contains(@class,'note caution')]/descendant::div[@class='content']");
      this.b5innerDiv = page.locator("//div[contains(@daa-lh,'b5|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div");
      this.b5olElement = page.locator("//div[contains(@daa-lh,'b5|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ol");
      this.b5firstLiElement = page.locator("//div[contains(@daa-lh,'b5|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ol/li[1]");
      this.b5secondLiElement = page.locator("//div[contains(@daa-lh,'b5|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ol/li[2]");

      // note Note Text with ordered list Selectors:
      this.b6textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b6|note')][contains(@class,'note note')]");
      this.b6textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b6|note')][contains(@class,'note note')]/descendant::span[contains(@class,'note-icon')]");
      this.b6contentDiv = page.locator("//div[contains(@daa-lh,'b6|note')][contains(@class,'note note')]/descendant::div[@class='content']");
      this.b6innerDiv = page.locator("//div[contains(@daa-lh,'b6|note')][contains(@class,'note note')]/descendant::div[@class='content']/div");
      this.b6olElement = page.locator("//div[contains(@daa-lh,'b6|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ol");
      this.b6firstLiElement = page.locator("//div[contains(@daa-lh,'b6|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ol/li[1]");
      this.b6secondLiElement = page.locator("//div[contains(@daa-lh,'b6|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ol/li[2]");

      // alert Note Text with bullet points Selectors:
      this.b7textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b7|note')][contains(@class,'note alert')]");
      this.b7textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b7|note')][contains(@class,'note alert')]/descendant::span[contains(@class,'note-icon')]");
      this.b7contentDiv = page.locator("//div[contains(@daa-lh,'b7|note')][contains(@class,'note alert')]/descendant::div[@class='content']");
      this.b7innerDiv = page.locator("//div[contains(@daa-lh,'b7|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div");
      this.b7ulElement = page.locator("//div[contains(@daa-lh,'b7|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div/ul");
      this.b7firstLiElement = page.locator("//div[contains(@daa-lh,'b7|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div/ul/li[1]");
      this.b7secondLiElement = page.locator("//div[contains(@daa-lh,'b7|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div/ul/li[2]");


      // note tips Selectors:
      this.b8textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b8|note')][contains(@class,'note tips')]");
      this.b8textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b8|note')][contains(@class,'note tips')]/descendant::span[contains(@class,'note-icon')]");
      this.b8contentDiv = page.locator("//div[contains(@daa-lh,'b8|note')][contains(@class,'note tips')]/descendant::div[@class='content']");
      this.b8innerDiv = page.locator("//div[contains(@daa-lh,'b8|note')][contains(@class,'note tips')]/descendant::div[@class='content']/div");
      this.b8olElement = page.locator("//div[contains(@daa-lh,'b8|note')][contains(@class,'note tips')]/descendant::div[@class='content']/div/ol");
      this.b8firstLiElement = page.locator("//div[contains(@daa-lh,'b8|note')][contains(@class,'note tips')]/descendant::div[@class='content']/div/ol/li[1]");
      this.b8secondLiElement = page.locator("//div[contains(@daa-lh,'b8|note')][contains(@class,'note tips')]/descendant::div[@class='content']/div/ol/li[2]");

      // note caution Selectors:
      this.b9textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b9|note')][contains(@class,'note caution')]");
      this.b9textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b9|note')][contains(@class,'note caution')]/descendant::span[contains(@class,'note-icon')]");
      this.b9contentDiv = page.locator("//div[contains(@daa-lh,'b9|note')][contains(@class,'note caution')]/descendant::div[@class='content']");
      this.b9innerDiv = page.locator("//div[contains(@daa-lh,'b9|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div");
      this.b9olElement = page.locator("//div[contains(@daa-lh,'b9|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ol");
      this.b9firstLiElement = page.locator("//div[contains(@daa-lh,'b9|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ol/li[1]");
      this.b9secondLiElement = page.locator("//div[contains(@daa-lh,'b9|note')][contains(@class,'note caution')]/descendant::div[@class='content']/div/ol/li[2]");

      // note note Selectors:
      this.b10textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b10|note')][contains(@class,'note note')]");
      this.b10textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b10|note')][contains(@class,'note note')]/descendant::span[contains(@class,'note-icon')]");
      this.b10contentDiv = page.locator("//div[contains(@daa-lh,'b10|note')][contains(@class,'note note')]/descendant::div[@class='content']");
      this.b10innerDiv = page.locator("//div[contains(@daa-lh,'b10|note')][contains(@class,'note note')]/descendant::div[@class='content']/div");
      this.b10ulElement = page.locator("//div[contains(@daa-lh,'b10|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul");
      this.b10firstLiElement = page.locator("//div[contains(@daa-lh,'b10|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul/li[1]");
      this.b10secondLiElement = page.locator("//div[contains(@daa-lh,'b10|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul/li[2]");

      // content Selectors:
      this.b11contentDiv = page.locator("//div[contains(@daa-lh,'b11|content')]");

      // note tips Selectors:
      this.b12textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b12|note')][contains(@class,'note tips')]");
      this.b12textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b12|note')][contains(@class,'note tips')]/descendant::span[contains(@class,'note-icon')]");
      this.b12contentDiv = page.locator("//div[contains(@daa-lh,'b12|note')][contains(@class,'note tips')]/descendant::div[@class='content']");
      this.b12innerDiv = page.locator("//div[contains(@daa-lh,'b12|note')][contains(@class,'note tips')]/descendant::div[@class='content']/div");

      // content Selectors:
      this.b13contentDiv = page.locator("//div[contains(@daa-lh,'b13|content')]");


      // note alert Selectors:
      this.b14textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b14|note')][contains(@class,'note alert')]");
      this.b14textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b14|note')][contains(@class,'note alert')]/descendant::span[contains(@class,'note-icon')]");
      this.b14contentDiv = page.locator("//div[contains(@daa-lh,'b14|note')][contains(@class,'note alert')]/descendant::div[@class='content']");
      this.b14innerDiv = page.locator("//div[contains(@daa-lh,'b14|note')][contains(@class,'note alert')]/descendant::div[@class='content']/div");


      // content Selectors:
      this.b15contentDiv = page.locator("//div[contains(@daa-lh,'b15|content')]");

      // note note Selectors:
      this.b16textComponentNoteStyle = page.locator("//div[contains(@daa-lh,'b16|note')][contains(@class,'note note')]");
      this.b16textComponentNoteIconStyle = page.locator("//div[contains(@daa-lh,'b16|note')][contains(@class,'note note')]/descendant::span[contains(@class,'note-icon')]");
      this.b16contentDiv = page.locator("//div[contains(@daa-lh,'b16|note')][contains(@class,'note note')]/descendant::div[@class='content']");
      this.b16innerDiv = page.locator("//div[contains(@daa-lh,'b16|note')][contains(@class,'note note')]/descendant::div[@class='content']/div");
      this.b16ulElement = page.locator("//div[contains(@daa-lh,'b16|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul");
      this.b16firstLiElement = page.locator("//div[contains(@daa-lh,'b16|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul/li[1]");
      this.b16secondLiElement = page.locator("//div[contains(@daa-lh,'b16|note')][contains(@class,'note note')]/descendant::div[@class='content']/div/ul/li[2]");

  }
};
