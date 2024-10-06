@login
Feature: User Login
  As a registered user
  I want to log in
  So that I can access my to-do list

    @smoke @happy-path
    Scenario: Successful login
    Given I open landing page
    And I navigate to the login page
    And I fill in the login form with valid credentials
    # user must be in the DB, functionality for registering new users via API will be added
    | name | email            | password  |
    | John | test100@test.com | 123456Dd@ |
    And I submit the login form
    Then I am redirected to my to-do list page

    @regression @negative @end2end
    Scenario Outline: Login with invalid credentials
    Given I open landing page
    And I navigate to the login page
    And I fill in the login form with invalid credentials
# user must be in the DB, functionality for registering new users via API will be added
    | <email>              | <password>   |
    And I submit the login form
    Then I should see an errorMessage
    | <errorMessage>|
    Examples:
    | email                     | password   | errorMessage             |
    | test100@test.com          | 123456     | Invalid email or password|
    | tes@test.com              | 123456Dd@  | Invalid email or password|


    @regression @negative
    Scenario: Show error message when login is attempted without credentials.
    Given I open landing page
    And I navigate to the login page
    And I submit the login form
    Then I should see an error message "Missing credentials"


 