export default class BeforeAfter {
  constructor(page) {
    this.page = page;

    // BeforeAfter Selectors:
    this.beforeAftr = page.locator("(//div[@class='before-after-slider vertical'])[1]");
    this.beforeafterVertical = page.locator(['@beforeafter-vertical']);
    this.beforeafterVerticalmoved = page.locator(['@beforeafter-vertical-moved']);


    //Before After Page-Slider Up and Down
    this.sliderUp = page.locator("(//div[@class='slider-thumb-container'])[1]");
    this.imageBefore = page.locator("//div[contains(@class,'image before')][1]").first();
    this.sliderThumbContainer = page.locator("(//div[@class='slider-thumb-container'])[1]").first();

     //Before After Page-Slider left and right
     this.slidereleft = page.locator("(//div[@class='slider-thumb-container'])[2]");
     this.imageBeforeLeft = page.locator("(//div[contains(@class,'image before')])[2]").first();
     this.sliderThumbContainerLeft = page.locator("(//div[@class='slider-thumb-container'])[2]").first();

      //Before After Page-Slider jpg and PNG
      this.sliderbw = page.locator("(//div[@class='slider-thumb-container'])[3]");
      this.imageBeforebw= page.locator("(//div[contains(@class,'image before')])[3]").first();
      this.sliderThumbContainerbw = page.locator("(//div[@class='slider-thumb-container'])[3]").first();

      //Before After Page-Slider capital Heading
      this.slidercapitalHeading = page.locator("(//div[@class='slider-thumb-container'])[4]");
      this.imageBeforecapitalHeading= page.locator("(//div[contains(@class,'image before')])[4]").first();
      this.sliderThumbContainercapitalHeading = page.locator("(//div[@class='slider-thumb-container'])[4]").first();

      //Before After Page-Slider Giving Horizontal before image
      this.sliderHorizontalbeforeHeading = page.locator("(//div[@class='slider-thumb-container'])[5]");
      this.imageHorizontalbeforeHeading= page.locator("(//div[contains(@class,'image before')])[5]").first();
      this.sliderThumbContainerHorizontalbeforeHeading = page.locator("(//div[@class='slider-thumb-container'])[5]").first();

      //Before After Page-Slider for xf left to right
      this.sliderXFfromlefttoright = page.locator("(//div[@class='slider-thumb-container'])[6]");
      this.imageXFfromlefttoright= page.locator("(//div[contains(@class,'image before')])[6]").first();
      this.sliderThumbContainerXFfromlefttoright = page.locator("(//div[@class='slider-thumb-container'])[6]").first();


      //Before After Page-Slider for xf up to down
      this.sliderXFfromUptoDown = page.locator("(//div[@class='slider-thumb-container'])[7]");
      this.imageXFfromUptoDown= page.locator("(//div[contains(@class,'image before')])[7]").first();
      this.sliderThumbContainerXFfromUptoDown = page.locator("(//div[@class='slider-thumb-container'])[7]").first();

      //Before After Page-Slider for xf up to down
      this.sliderFailedForIncorrectAuthoring = page.locator("//div[contains(@class,'bfore-after-slider')][contains(@data-reason,'Failed loading bfore-after-slider block.')]");


      
  }
}
