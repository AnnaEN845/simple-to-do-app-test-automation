@login
Feature: User Login
  As a registered user
  I want to log in to my account
  So that I can access and manage my to-do list

  Background:
    Given I open landing page
    And I navigate to the login page


    @smoke @happy-path 
    Scenario Outline: Successful login
    And I fill in the login form with valid credentials
    # user must be in the DB, functionality for registering new users via API will be added
    | <name> | <email> | <password> |
    And I submit the login form
    Then I am redirected to my to-do list page
    Examples:
    | name | email            | password  |
    | John | test100@test.com | 123456Dd@ |
    | John | test99@test.com | 123456Dd@ |
    | John | test98@test.com | 123456Dd@ |

    @regression @negative @end2end 
    Scenario Outline: Login with invalid credentials
    And I fill in the login form with invalid credentials
# user must be in the DB, functionality for registering new users via API will be added
    | <email>              | <password>   |
    And I submit the login form
    Then I should see an errorMessage on login Page
    | <errorMessage>|
    Examples:
    | email                     | password   | errorMessage              |
    | test100@test.com          | 123456     | Invalid email or password |
    | tes@test.com              | 123456Dd@  | Invalid email or password |


    @regression @negative
    Scenario: Show error message when login is attempted without credentials.
    And I submit the login form
    Then I should see an error message "Missing credentials"


 