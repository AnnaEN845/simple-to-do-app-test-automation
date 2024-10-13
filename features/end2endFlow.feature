@end2endFlow
Feature: Adding todo items
As a logged-in user, I want to add my to-do items so that I can track my tasks. 
This feature allows users to register, add new to-do items, categorize them, and log out. 
Scenarios cover the happy path for adding items and viewing them by category.

    Background:
    Given I open landing page

    @smoke @happy-path @end2end
    Scenario: Adding a new to-do item
    And I navigate to the register page
    And I fill in the registration form with valid credentials
    | name | email                     | password  |
    | John | testRANDOMNUMBER@test.com | 123456Dd@ |
    And I submit the registration form
    And I am redirected to my to-do list page
    And I have added a new ToDo
    | title       | description            | mm | dd | yyyy | priority | category |
    | 1Do work    | 1work work work work   | 09 | 30 | 2024 | low      | work     |
    | 1Do personal| 2personal personal     | 10 | 25 | 2024 | medium   | personal |
    | 3Apple      | 3 by 5 apples          | 12 | 20 | 2024 | high     | shopping |
    | 2Do work    | 1work work work work   | 09 | 30 | 2024 | low      | work     |
    | 2Do personal| 2personal personal     | 10 | 25 | 2024 | medium   | personal |
    | 5Apple      | 3 by 5 apples          | 12 | 20 | 2024 | high     | shopping |
    And I should see a list of my to-do items grouped by category
    | work         | personal   | shopping   |
    Then I am logging out of the user profile page
     