@registrationApi 
Feature: User Registration
As a new user, I want to register on the app so that I can access my to-do list page. 
This feature handles scenarios for preventing duplicate email registration, 
Login and Register user after preventing duplicate email registration.


  Background:
    Given I have registered a new user- api
    And I open landing page
    And I navigate to the register page


    @regression @negative 
    Scenario: Prevent registration with an already registered email
    And I fill in the registration form with an already registered using API email
    And I submit the registration form
    Then I should see the following error messages:
    | Email already in use |


    @regression @ux 
    Scenario: Login and Register new user buttons displayed after registration with an existing email
    And I fill in the registration form with an already registered using API email
    And I submit the registration form
    Then I should see the following error messages:
    | Email already in use |
    Then I should see a Login and Register New User buttons


    @regression @integration @end2end 
    Scenario: Handle login after attempting registration with an already registered email
    And I fill in the registration form with an already registered using API email
    And I submit the registration form
    Then I should see the following error messages:
    | Email already in use |
    And I should see a Login and Register New User buttons
    And I click on Login button
    And I on login page
    And I fill in the login form with new user valid credentials
    And I submit the login form
    Then I am redirected to my to-do list page


    @regression @integration @end2end 
    Scenario: Handle new user registration after attempting registration with an already registered email
    And I fill in the registration form with an already registered using API email
    And I submit the registration form
    Then I should see the following error messages:
    | Email already in use |
    And I should see a Login and Register New User buttons
    And I click on Register New User button
    And I on register page
    And I fill in the registration form with valid credentials
    | name | email                     | password  |
    | John | testRANDOMNUMBER@test.com | 123456Dd@ |
    And I submit the registration form
    Then I am redirected to my to-do list page
