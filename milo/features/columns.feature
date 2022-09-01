Feature: Validate Columns blocks on library document page

  @MWPW-17177 @desc-columns @milo-block @milo-regression @prod @stage
  Scenario Outline: Validating the Columns first, last record text and columns, rows amounts when a style is set on the block
    Given I go to "<url>"
    When I select the block "<name>"
    Then I should see "<numberColums>" columns
    And I should see "<numberRows>" rows
    And I should see "<text>" in the "<colNum>" column "<rowNum>" row
    And I should see "<number>" pictures in the "<colNum>" column "<rowNum>" row

    Examples: Validating the Columns first, last record text and columns, rows amounts when a style is set on the block
      | url                          | name                     | numberColumns | numberRows | text                 | colNum | rowNum | number |
      | /docs/library/blocks/columns | columns                  | 2             | 1          | Other glossary terms | 1      | 1      | 0      |
      | /docs/library/blocks/columns | columns                  | 2             | 1          | Adobe Target         | 2      | 1      | 0      |
      | /docs/library/blocks/columns | columns contained middle | 2             | 1          | Other glossary terms | 1      | 1      | 0      |
      | /docs/library/blocks/columns | columns contained middle | 2             | 1          | Adobe Target         | 2      | 1      | 0      |
      | /docs/library/blocks/columns | columns table            | 2             | 4          | PROS                 | 1      | 1      | 0      |
      | /docs/library/blocks/columns | columns table            | 2             | 4          | No evolution:        | 2      | 4      | 0      |
      | /docs/library/blocks/columns | columns table            | 3             | 19         | Section              | 1      | 1      | 0      |
      | /docs/library/blocks/columns | columns table            | 3             | 19         | How?                 | 3      | 19     | 0      |
      | /docs/library/blocks/columns | columns contained table  | 2             | 10         | Role                 | 1      | 1      | 0      |
      | /docs/library/blocks/columns | columns contained table  | 2             | 10         | Aaron Mauchley       | 2      | 10     | 0      |

  @MWPW-17177 @desc-columns @milo-block-update @milo-block @milo-regression @bblogprod @bblogstage
  Scenario Outline: Validating the Columns first, last record text and columns, rows amounts when a style is set on the block
    Given I go to "<url>"
    When I select the block "<name>"
    Then I should see "<numberColums>" columns
    And I should see "<numberRows>" rows
    And I should see "<text>" in the "<colNum>" column "<rowNum>" row
    And I should see "<number>" pictures in the "<colNum>" column "<rowNum>" row

    Examples: Validating the Columns first, last record text and columns, rows amounts when a style is set on the block
      | url                                           | name    | numberColumns | numberRows | text            | colNum | rowNum | number |
      | /blog/basics/learn-about-four-ps-of-marketing | columns | 2             | 1          | Personalization | 2      | 1      | 0      |
      | /blog/basics/learn-about-four-ps-of-marketing | columns | 2             | 1          | Personalization | 1      | 1      | 1      |

  @MWPW-17177 @desc-columns @milo-block-update @milo-block @milo-regression @blogprod @blogstage
  Scenario Outline: Validating the Columns first, last record text and columns, rows amounts when a style is set on the block
    Given I go to "<url>"
    When I select the block "<name>"
    Then I should see "<numberColums>" columns
    And I should see "<numberRows>" rows
    And I should see "<text>" in the "<colNum>" column "<rowNum>" row
    And I should see "<number>" pictures in the "<colNum>" column "<rowNum>" row

    Examples: Validating the Columns first, last record text and columns, rows amounts when a style is set on the block
      | url                                                             | name    | numberColumns | numberRows | text                                | colNum | rowNum | number |
      | en/publish/2022/07/28/announcing-2022-adobe-analytics-champions | columns | 2             | 1          | Verizon Wireless                    | 2      | 1      | 1      |
      | en/publish/2022/07/28/announcing-2022-adobe-analytics-champions | columns | 2             | 1          | Norwegian Cruise Line Holdings Ltd. | 1      | 1      | 1      |
