@loginApi
Feature: User Login
As a registered user (using API), 
I want to log in to my account so that I can access my to-do list page. 
This feature includes scenarios for logging in with valid credentials via the API, handling invalid credentials, 
and covering edge cases such as incorrect email or password.

  Background:
    Given I have registered a new user- api
    And I open landing page
    And I navigate to the login page

    @smoke @happy-path 
    Scenario: Successful login
    And I fill in the login form with new user valid credentials
    And I submit the login form
    Then I am redirected to my to-do list page

    @regression @negative @end2end
    Scenario Outline: Login with invalid password
    And I fill in the login form with new user invalid email
    | <email>   |
    And I submit the login form
    Then I should see an errorMessage on login Page
    | <errorMessage>|
    Examples:
    | email              | errorMessage              |
    | 123456@test.com    | Invalid email or password |
    | 123456Dd@test.com  | Invalid email or password |

    @regression @negative @end2end 
    Scenario Outline: Login with invalid password
    And I fill in the login form with new user invalid password
    | <password>   |
    And I submit the login form
    Then I should see an errorMessage on login Page
    | <errorMessage>|
    Examples:
    | password    | errorMessage              |
    | 123456      | Invalid email or password |
    | 123456Dd@!  | Invalid email or password |

