@todo @end2end
Feature: To-Do List Management
  As a logged-in user
  I want to manage my to-do items
  So that I can track my tasks

    @end2end @smoke
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
    Then New ToDo are added to the list of categories
    | ListTitle1   | ListTitle2 | LisTilele3 | 
    | work         | personal   | shopping   |


    @smoke
    Scenario: Viewing to-do items
    Given I open landing page
    # And I navigate to the login page
#     And I fill in the login form with valid credentials
# | name | email                     | password  |
# | John | test@test.com | 123456Dd@ |
#     And I submit the login form
#     Then I am redirected to my to-do list page
#     Then I should see a list of my to-do items grouped by category


    @end2end
    Scenario: Marking a to-do item as completed
    Given I open landing page
    # And I navigate to the login page
#     And I fill in the login form with valid credentials
# | name | email                     | password  |
# | John | test@test.com | 123456Dd@ |
#     And I submit the login form
#     Then I am redirected to my to-do list page
#     And I have existing to-do items
#     When I mark a to-do item as completed
#     Then the item should be marked as completed in the list

    @end2end
    Scenario: Deleting a to-do item
    Given I open landing page
    # And I navigate to the login page
#     And I fill in the login form with valid credentials
# | name | email                     | password  |
# | John | test@test.com | 123456Dd@ |
#     And I submit the login form
#     Then I am redirected to my to-do list page
#     And I have existing to-do items
#     When I delete a to-do item
#     Then the item should no longer appear in the list
