Feature: Verify Adobe Sign In Page

  @MWPW-81869 @desc-common-account-signin @account
  Scenario: Sign into Adobe Account
    Given I go to Adobe Account 
     When I sign in Adobe Account as "Acrobat"
     Then I should see Adobe Account home page
      And I wait for 5 seconds
