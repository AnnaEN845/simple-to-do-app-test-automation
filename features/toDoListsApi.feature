@todoApi
Feature: To-Do List Management
As a logged-in user, I want to manage my to-do items via the API so that I can track my tasks. 
Scenarios involve creating to-do items through API calls, viewing them, marking them as completed, 
and ensuring the list's accuracy.

  Background:
    Given I have registered a new user- api
    And I open landing page
    And I navigate to the login page
    And I fill in the login form with new user valid credentials
    And I submit the login form
    And I am redirected to my to-do list page

  @smoke @happy-path 
  Scenario: Viewing to-do items in the list - API
    Given I create multiple todos for the registered user via API
      | title        | description                 | dueDate    | priority | category |
      | Test Todo 1  | This is the first test todo | 2023-12-31 | Medium   | work     |
      | Test Todo 2  | This is the second test todo| 2024-01-15 | High     | personal |
      | Test Todo 3  | This is another test todo   | 2024-02-10 | Low      | shopping |
      | 1Do work     | 1work work work work        | 2024-11-25 | low      | work     |
      | 1Do personal | 2personal personal          | 2025-01-12 | medium   | personal |
      | 3Apple       | 3 by 5 apples               | 2025-02-15 | high     | shopping |
    And I refresh the browser
    Then I should see all the added items in the list category
      
  

    @regression @happy-path 
    Scenario: Marking a to-do item as completed in the list - API
    Given I create multiple todos for the registered user via API
      | title        | description                 | dueDate    | priority | category |
      | Test Todo 1  | This is the first test todo | 2023-12-31 | Medium   | Work     |
      | Test Todo 2  | This is the second test todo| 2024-01-15 | High     | Personal |
      | Test Todo 3  | This is another test todo   | 2024-02-10 | Low      | Shopping |
      | Test Todo 4  | This is the first test todo | 2023-12-31 | Medium   | Work     |
      | Test Todo 5  | This is the second test todo| 2024-01-15 | High     | Personal |
      | Test Todo 6  | This is another test todo   | 2024-02-10 | Low      | Shopping |
    And I refresh the browser
    And I should see all the added items in the list category
    And I mark all to-do items in category as completed
    | work     |
    | personal |
    | shopping |
    Then I should see all items marked as completed in the list

    @regression @happy-path 
    Scenario: Deleting a to-do item in the list - API
    Given I create multiple todos for the registered user via API
      | title        | description                 | dueDate    | priority | category |
      | Test Todo 1  | This is the first test todo | 2023-12-31 | Medium   | Work     |
      | Test Todo 2  | This is the second test todo| 2024-01-15 | High     | Personal |
      | Test Todo 3  | This is another test todo   | 2024-02-10 | Low      | Shopping |
      | Test Todo 4  | This is the first test todo | 2023-12-31 | Medium   | Work     |
      | Test Todo 5  | This is the second test todo| 2024-01-15 | High     | Personal |
      | Test Todo 6  | This is another test todo   | 2024-02-10 | Low      | Shopping |
    And I refresh the browser
    And I should see all the added items in the list category
    And I delete all to-do items in category list
    | work     |
    | personal |
    | shopping |
    Then I should see all items no longer appear in the list

