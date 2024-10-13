@login
Feature: User Login
As a registered user, I want to log in to my account so that I can access my to-do list page. 
This feature covers scenarios for successful login, login with invalid credentials, 
and error handling for missing credentials.

  Background:
    Given I open landing page
    And I navigate to the login page


    @smoke @happy-path 
    Scenario Outline: Successful login - user must be in the DB
    And I fill in the login form with valid credentials
    | <name> | <email> | <password> |
    And I submit the login form
    Then I am redirected to my to-do list page
    Examples:
    | name | email            | password  |
    | John | test100@test.com | 123456Dd@ |
    | John | test99@test.com | 123456Dd@ |
    | John | test98@test.com | 123456Dd@ |

    
    @regression @negative @end2end 
    Scenario Outline: Login with invalid credentials - user must be in the DB
    And I fill in the login form with invalid credentials
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


 