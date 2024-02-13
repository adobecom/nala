export default class CodeBlock {
  constructor(page) {
    this.page = page;

    // Download Component with one column
    this.b2downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b2|download')][contains(@class,'download')]"
    );
    this.b2downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b2|download')][contains(@class,'download')]/child::p[contains(@class,'download-title')]"
    );
    this.b2PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b2|download')][contains(@class,'download')]/child::div)[1]/descendant::a"
    );
    this.b2DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b2|download')][contains(@class,'download')]/child::div)[2]/descendant::a"
    );
    this.b2XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b2|download')][contains(@class,'download')]/child::div)[3]/descendant::a"
    );

    // Download Component with two column
    this.b4downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]"
    );
    this.b4downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::p[contains(@class,'download-title')]"
    );
    this.b4PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[1]/descendant::a"
    );
    this.b4DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[2]/descendant::a"
    );
    this.b4XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[3]/descendant::a"
    );
    this.b4XLSdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[4]/descendant::a"
    );
    this.b4TXTdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[5]/descendant::a"
    );
    this.b4EXEdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[6]/descendant::a"
    );
    this.b4JPEGdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[7]/descendant::a"
    );
    this.b4JPGdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[8]/descendant::a"
    );
    this.b4PNGdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[9]/descendant::a"
    );
    this.b4ZIPdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[10]/descendant::a"
    );
    this.b4GIFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[11]/descendant::a"
    );
    this.b4MP4downloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b4|download')][contains(@class,'download')]/child::div)[12]/descendant::a"
    );

    // Download Component with three column
    this.b6downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b6|download')][contains(@class,'download')]"
    );
    this.b6downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b6|download')][contains(@class,'download')]/child::p[contains(@class,'download-title')]"
    );
    this.b6PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b6|download')][contains(@class,'download')]/div/div/a)[1]"
    );
    this.b6DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b6|download')][contains(@class,'download')]/div/div/a)[2]"
    );
    this.b6XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b6|download')][contains(@class,'download')]/div/div/a)[3]"
    );
    this.b6XLSdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b6|download')][contains(@class,'download')]/div/div/a)[4]"
    );
    this.b6TXTdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b6|download')][contains(@class,'download')]/div/div/a)[5]"
    );

    //Authoring download link after text column
    this.b8downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b8|download')][contains(@class,'download')]"
    );
    this.b8downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b8|download')][contains(@class,'download')]/child::p[contains(@class,'download-title')]"
    );
    this.b8PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b8|download')][contains(@class,'download')]/div/div/a)[1]"
    );
    this.b8DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b8|download')][contains(@class,'download')]/div/div/a)[2]"
    );
    this.b8XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b8|download')][contains(@class,'download')]/div/div/a)[3]"
    );
    this.b8XLSdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b8|download')][contains(@class,'download')]/div/div/a)[4]"
    );
    this.b8TXTdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b8|download')][contains(@class,'download')]/div/div/a)[5]"
    );

    // Authoring download component---in 3 columns—text column—download link---download link
    this.b10downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b10|download')][contains(@class,'download')]"
    );
    this.b10downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b10|download')][contains(@class,'download')]/child::p[contains(@class,'download-title')]"
    );
    this.b10PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b10|download')][contains(@class,'download')]/div/div/a)[1]"
    );
    this.b10DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b10|download')][contains(@class,'download')]/div/div/a)[3]"
    );
    this.b10XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b10|download')][contains(@class,'download')]/div/div/a)[5]"
    );
    this.b10XLSdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b10|download')][contains(@class,'download')]/div/div/a)[7]"
    );
    this.b10TXTdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b10|download')][contains(@class,'download')]/div/div/a)[9]"
    );

    //Authoring download link in alternate column
    this.b12downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b12|download')][contains(@class,'download')]"
    );
    this.b12downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b12|download')][contains(@class,'download')]/child::p[contains(@class,'download-title')]"
    );
    this.b12PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b12|download')][contains(@class,'download')]/div/div/a)[1]"
    );
    this.b12DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b12|download')][contains(@class,'download')]/div/div/a)[3]"
    );
    this.b12XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b12|download')][contains(@class,'download')]/div/div/a)[5]"
    );
    this.b12XLSdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b12|download')][contains(@class,'download')]/div/div/a)[7]"
    );
    this.b12TXTdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b12|download')][contains(@class,'download')]/div/div/a)[9]"
    );

    //Download Section Component Authoring using one column with links and other column blank
    this.b14downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b14|download')][contains(@class,'download')]"
    );
    this.b14downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b14|download')][contains(@class,'download')]/p[contains(@class,'download-title')]"
    );

    // PDF download component
    this.b14PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b14|download')][contains(@class,'download')]/div/div/a)[1]"
    );

    // DOCX download component
    this.b14DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b14|download')][contains(@class,'download')]/div/div/a)[2]"
    );

    // XLSX download component
    this.b14XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b14|download')][contains(@class,'download')]/div/div/a)[3]"
    );

//Download Section component link text length

    this.b16downloadComponent = page.locator(
      "//div[contains(@daa-lh,'b16|download')][contains(@class,'download')]"
    );
    this.b16downloadComponentTitle = page.locator(
      "//div[contains(@daa-lh,'b16|download')][contains(@class,'download')]/p[contains(@class,'download-title')]"
    );

    // PDF download component
    this.b16PDFdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b16|download')][contains(@class,'download')]/div/div/a)[1]"
    );

    // DOCX download component
    this.b16DOCXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b16|download')][contains(@class,'download')]/div/div/a)[2]"
    );

    // XLSX download component
    this.b16XLSXdownloadComponent = page.locator(
      "(//div[contains(@daa-lh,'b16|download')][contains(@class,'download')]/div/div/a)[3]"
    );



    //Download component ---Text in CAPITAL LETTER---- Bold + Italic + Underline[removed]
    this.b18downloadComponent = page.locator("//div[contains(@daa-lh,'b18|download')][contains(@class,'download')]");
    this.b18downloadComponentTitle = page.locator("//div[contains(@daa-lh,'b18|download')][contains(@class,'download')]/p[contains(@class,'download-title')]");

    // PDF download component
    this.b18PDFdownloadComponent = page.locator("(//div[contains(@daa-lh,'b18|download')][contains(@class,'download')]/div/div/a)[1]");

    // DOCX download component
    this.b18DOCXdownloadComponent = page.locator("(//div[contains(@daa-lh,'b18|download')][contains(@class,'download')]/div/div/a)[2]");

    // Emphasized PDF download component
    this.b18EmphasizedPDFdownloadComponent = page.locator("(//div[contains(@daa-lh,'b18|download')][contains(@class,'download')]/div/div/a)[3]");

    // Bold and emphasized PDF download component
    this.b18BoldAndEmphasizedPDFdownloadComponent = page.locator("(//div[contains(@daa-lh,'b18|download')][contains(@class,'download')]/div/div/a)[4]");

  }
}
