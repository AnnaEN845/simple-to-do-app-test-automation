Feature: Web automation SimpleToDoApp - Adding ToDo

@end2endShopping @smoke
Scenario: Adding ToDo
Given I open landing page
And I have registered account with a new user
| name | email           | password  |
| John | testRANDOMNUMBER@test.com | 123456Dd@ |
And I have logged with a new user
And I have added a new ToDo
| title       | description            | mm | dd | yyyy | priority | category |
| 1Do work    | 1work work work work   | 09 | 30 | 2024 | low      | work     |
| 2Do work    | 2work work work work   | 12 | 30 | 2024 | high      | work     |
| 1Do personal| 2personal personal     | 10 | 25 | 2024 | medium   | personal |
| 3Apple      | 3 by 5 apples          | 12 | 20 | 2024 | high     | shopping |
Then New ToDo are added to the list of categories
| ListTitle1   | ListTitle2 | LisTilele3 | 
| work         | personal   | shopping   |




