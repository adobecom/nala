Feature: Validate Marquee blocks on library document page

  @MWPW-17178 @desc-marquee @milo-block @milo-regression @prod @stage
  Scenario Outline: Validating the Marquee CTAs, text, logos, and image when a style is set on the block
    Given I go to "<url>"
    When I select the block "<name>"
    Then I should see the text "<marqueeHeading>"
    And I should see "<numberCTA>" buttons
    And I should see "<numberLogo>" icons
    And I should see "<number>" pictures
    And I should see "<amount>" background image present
    When I click a cta button
    Then I should see "<destinationUrl>" in the current url

    Examples: Validating the Marquee CTAs, text, logos, and image when a style is set on the block
      | url                          | name                | marqueeHeading                     | numberCTA | numberLogo | number | amount | destinationUrl         |
      | /docs/library/blocks/marquee | marquee             | Marquee standard medium left       | 3         | 1          | 1      | 1      | https://www.adobe.com/ |
      | /docs/library/blocks/marquee | marquee light       | Marquee standard medium left light | 2         | 0          | 1      | 1      | https://www.adobe.com/ |
      | /docs/library/blocks/marquee | marquee small       | Marquee standard small dark        | 1         | 0          | 1      | 1      | https://www.adobe.com/ |
      | /docs/library/blocks/marquee | marquee small light | Marquee standard small light       | 2         | 0          | 1      | 1      | https://www.adobe.com/ |
      | /docs/library/blocks/marquee | marquee large       | Marquee Large Dark                 | 2         | 0          | 1      | 1      | https://www.adobe.com/ |
      | /docs/library/blocks/marquee | marquee large light | Marquee Large Light                | 2         | 0          | 1      | 1      | https://www.adobe.com/ |
      | /docs/library/blocks/marquee | marquee quiet       | Marquee quiet                      | 1         | 0          | 0      | 0      | https://www.adobe.com/ |
      | /docs/library/blocks/marquee | marquee inline      | Marquee inline                     | 0         | 0          | 0      | 0      | https://www.adobe.com/ |

  @MWPW-17178 @desc-marquee @milo-block-update @milo-block @milo-regression @bblogprod @bblogstage
  Scenario Outline: Validating the Marquee CTAs, text, logos, and image when a style is set on the block
    Given I go to "<url>"
    When I select the block "<name>"
    Then I should see the text "<marqueeHeading>"
    And I should see "<numberCTA>" buttons
    And I should see "<numberLogo>" icons
    And I should see "<number>" pictures
    And I should see "<amount>" background image present
    When I click a cta button
    Then I should see "<destinationUrl>" in the current url

    Examples: Validating the Marquee CTAs, text, logos, and image when a style is set on the block
      | url                                                   | name    | marqueeHeading              | numberCTA | numberLogo | number | amount | destinationUrl                                                                                        |
      | /customer-success-stories/princess-cruises-case-study | marquee | Princess Cruises entertains | 1         | 0          | 0      | 3      | https://main--bacom--adobecom.hlx.page/customer-success-stories/princess-cruises-case-study#watch-now |
