@login @end2end
Feature: User Login
  As a registered user
  I want to log in
  So that I can access my to-do list

    @smoke
    Scenario: Successful login
    Given I open landing page
    # And I navigate to the login page
#     And I fill in the login form with valid credentials
# | name | email                     | password  |
# | John | test@test.com | 123456Dd@ |
#     And I submit the login form
#     Then I am redirected to my to-do list page

    @end2end
    Scenario: Login with invalid credentials
    Given I open landing page
#     And I navigate to the login page
#     When I fill in the login form with invalid credentials
# | name | email                     | password  |
# | John | @test.com | 123456Dd@ |
#     And I submit the login form
#     Then I should see an error message saying "Invalid email or password"