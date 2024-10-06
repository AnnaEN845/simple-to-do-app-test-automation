@todo
Feature: To-Do List Management
  As a logged-in user
  I want to manage my to-do items
  So that I can track my tasks

    @smoke @happy-path @end2end
    Scenario: Adding a new to-do item
    Given I open landing page
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
    Then I should see a list of my to-do items grouped by 3 category
    | ListTitle1   | ListTitle2 | LisTilele3 | 
    | work         | personal   | shopping   |


    @smoke @happy-path 
    Scenario: Viewing to-do items in the list
    Given I open landing page
    And I navigate to the login page
    And I fill in the login form with valid credentials
    | name | email            | password  |
    | John | test100@test.com | 123456Dd@ |
    And I submit the login form
    And I am redirected to my to-do list page
    And I have existing to-do items
    | title       | description            | mm | dd | yyyy | priority | category |
    | 1Do work    | 1work work work work   | 09 | 30 | 2024 | low      | work     |
    | 1Do personal| 2personal personal     | 10 | 25 | 2024 | medium   | personal |
    # | 3Apple      | 3 by 5 apples          | 12 | 20 | 2024 | high     | shopping |
    Then I should see a list of my to-do items grouped by 3 category
    | ListTitle1   | ListTitle2 | LisTilele3 | 
    | work         | personal   | shopping   |


    @regression @happy-path
    Scenario: Marking a to-do item as completed in the list
    Given I open landing page
    And I navigate to the login page
    And I fill in the login form with valid credentials
    # user must be in the DB, functionality for registering new users via API will be added
    | name | email         | password  |
    | John | test100@test.com | 123456Dd@ |
    And I submit the login form
    And I am redirected to my to-do list page
    And I have existing to-do items
    # user should have toDos in DB
    | title       | description            | mm | dd | yyyy | priority | category |
    | 1Do work    | 1work work work work   | 09 | 30 | 2024 | low      | work     |
    | 1Do personal| 2personal personal     | 10 | 25 | 2024 | medium   | personal |
    | 3Apple      | 3 by 5 apples          | 12 | 20 | 2024 | high     | shopping |
#     When I mark a to-do item as completed
#     Then the item should be marked as completed in the list

    @regression @happy-path
    Scenario: Deleting a to-do item in the list
    Given I open landing page
    And I navigate to the login page
    And I fill in the login form with valid credentials
    # user must be in the DB, functionality for registering new users via API will be added
    | name | email            | password  |
    | John | test100@test.com | 123456Dd@ |
    And I submit the login form
    And I am redirected to my to-do list page
    And I have existing to-do items
    | title       | description            | mm | dd | yyyy | priority | category |
    | 1Do work    | 1work work work work   | 09 | 30 | 2024 | low      | work     |
    | 1Do personal| 2personal personal     | 10 | 25 | 2024 | medium   | personal |
    | 3Apple      | 3 by 5 apples          | 12 | 20 | 2024 | high     | shopping |
#     When I delete a to-do item
#     Then the item should no longer appear in the list
