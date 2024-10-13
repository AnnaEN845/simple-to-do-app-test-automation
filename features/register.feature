@registration 
Feature: User Registration
As a new user, I want to register on the app so that I can access my to-do list page. 
This feature handles scenarios for successful registration, preventing duplicate email registration, 
missing credential errors, and registration with an invalid password.

  Background:
    Given I open landing page
    And I navigate to the register page


    @smoke @happy-path @end2end
    Scenario: Successful registration
    And I fill in the registration form with valid credentials 
    | name | email                     | password  |
    | John | testRANDOMNUMBER@test.com | 123456Dd@ |
    And I submit the registration form
    Then I am redirected to my to-do list page

    @regression @negative 
    Scenario Outline: Prevent registration with an already registered email
    And I fill in the registration form with an already registered email 
    | <name> | <email> | <password> |
    And I submit the registration form
    Then I should see an errorMessage on Register Page
    | <errorMessage>|
    Examples:
    | name | email            | password  | errorMessage         |
    | John | test100@test.com | 123456Dd@ | Email already in use |


    @regression @negative 
    Scenario: Registration with missing credentials
    And I submit the registration form
    Then I should see the following error messages:
    | Name is required                                            |
    | Please enter a valid email                                  |
    | Password must be between 8 and 128 characters long          |
    | Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&) |


    @regression @ux 
    Scenario Outline: Login and Register new user buttons displayed after registration with an existing email
    And I fill in the registration form with an already registered email 
    | <usedName> | <usedEmail> | <usedPassword> |
    And I submit the registration form
    And I should see an errorMessage on Register Page
    | <errorMessage>|
    Then I should see a Login and Register New User buttons
    Examples:
    | usedName | usedEmail        | usedPassword | errorMessage         |
    | John     | test100@test.com | 123456Dd@    | Email already in use |

    @regression @integration @end2end 
    Scenario Outline: Handle login after attempting registration with an already registered email
    And I fill in the registration form with an already registered email 
     | <usedName> | <usedEmail> | <usedPassword> |
    And I submit the registration form
    And I should see an errorMessage on Register Page
    | <errorMessage>|
    And I should see a Login and Register New User buttons
    And I click on Login button
    And I on login page
    And I fill in the login form with valid credentials
    | <name> | <email> | <password> |
    And I submit the login form
    Then I am redirected to my to-do list page
    Examples:
    | usedName | usedEmail        | usedPassword | errorMessage         | name | email            | password |
    | John     | test100@test.com | 123456Dd@    | Email already in use | John | test100@test.com | 123456Dd@ |


    @regression @integration @end2end 
    Scenario Outline: Handle new user registration after attempting registration with an already registered email
    And I fill in the registration form with an already registered email 
     | <usedName> | <usedEmail> | <usedPassword> |
    And I submit the registration form
    And I should see an errorMessage on Register Page
    | <errorMessage>|
    And I should see a Login and Register New User buttons
    And I click on Register New User button
    And I on register page
    And I fill in the registration form with valid credentials
    | name | email                     | password  |
    | John | testRANDOMNUMBER@test.com | 123456Dd@ |
    And I submit the registration form
    Then I am redirected to my to-do list page
    Examples:
    | usedName | usedEmail        | usedPassword | errorMessage         |
    | John     | test100@test.com | 123456Dd@    | Email already in use |

    @regression @negative
    Scenario Outline: Registration with invalid password
    And I fill in the registration form with an invalid password
    | <name> | <email>           | <password>   |
    And I submit the registration form
    Then I should see an error message for invalid password requirements
    | <errorMessage> |

    Examples:
    | name  | email                           | password      | errorMessage                                                   |
    | John  | testRANDOMNUMBER@test.com       | 12345         | Password must be between 8 and 128 characters long             |
    | John  | testRANDOMNUMBER@test.com       | 12345678      | Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&) |
    | John  | testRANDOMNUMBER@test.com       | abcdefghi     | Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&) |
    | John  | testRANDOMNUMBER@test.com       | ABCDEFGH      | Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&) |
    | John  | testRANDOMNUMBER@test.com       | abcdefg1      | Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&) |
    | John  | testRANDOMNUMBER@test.com       | Abcdefg1      | Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&) |