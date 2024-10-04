@registration @end2end
Feature: User Registration
  As a new user
  I want to register on the app
  So that I can create a to-do list

    @smoke
    Scenario: Successful registration
    Given I open landing page
    And I navigate to the register page
    And I fill in the registration form with valid credentials 
    | name | email                     | password  |
    | John | testRANDOMNUMBER@test.com | 123456Dd@ |
    And I submit the registration form
    Then I am redirected to my to-do list page

    @end2end
    Scenario: Registration with an existing email
    Given I open landing page
    And I navigate to the register page
#   And I fill in the registration form an already registered email
#   | name | email                     | password  |
#   | John | test1@test.com | 123456Dd@ |
    And I submit the registration form
#   Then I should see an error message saying "Email already in use"
#   And I should be prompted to log in

    @end2end
    Scenario: Registration with invalid password
    Given I open landing page
    And I navigate to the register page
#   And I fill in the registration form with an invalid password
#   | name | email                     | password  |
#   | John | testRANDOMNUMBER@test.com | 123456 |
    And I submit the registration form
#   Then I should see an error message for invalid password requirements