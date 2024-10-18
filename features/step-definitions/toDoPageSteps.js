import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';
import { pages } from "../support/pages";
import { customFunctions } from '../support/custom-functions';
import { sharedState } from '../support/sharedState';
// import User from '../support/api-helpers/user';
// import UserData from '../support/data/userData';

Then('I am redirected to my to-do list page', async()=>{
    await pages.toDoPage.todoPageTitle.waitForDisplayed();
    let actualLogedUserName = await pages.toDoPage.logedUserName.getText();
    await expect(actualLogedUserName).toEqual(sharedState.newUserName);
})

Then('I have added a new ToDo', async(dataTable)=>{
    await pages.toDoPage.newTodoCardTitle.waitForDisplayed();
    let rows = dataTable.rows();
    for await (const [addedToDoTitle, addedToDoDescription, addedMm, addedDd, addedYyyy, addedPriority, addedCategory] of rows) {
        let addedToDoItem = customFunctions.createTodoItem(addedToDoTitle, addedToDoDescription, addedMm, addedDd, addedYyyy, addedPriority, addedCategory)
        sharedState.addToDo(addedToDoItem);
        await pages.toDoPage.fillNewToDoForm(addedToDoTitle, addedToDoDescription, addedDd, addedMm, addedYyyy, addedPriority, addedCategory);
        await pages.toDoPage.buttonAddTodo.waitAndClick();

    }
})

Then('I have existing to-do items', async(dataTable)=>{
    let rows = dataTable.rows();
    for await (const [addedToDoTitle, addedToDoDescription, addedMm, addedDd, addedYyyy, addedPriority, addedCategory] of rows) {
        let addedToDoItem = customFunctions.createTodoItem(addedToDoTitle, addedToDoDescription, addedMm, addedDd, addedYyyy, addedPriority, addedCategory);
        sharedState.addToDo(addedToDoItem);
    }
    let addedListsTitles = [...new Set(sharedState.addedNewToDo.map(todo => todo.category.toLowerCase()))];
    console.log(addedListsTitles);

    await pages.toDoPage.verifyToDoItemsByCategories(addedListsTitles);
})

Then('I should see all the added items in the list category',async()=>{
let addedListsTitles = [...new Set(sharedState.addedNewToDo.map(todo => todo.category.toLowerCase()))];
console.log(addedListsTitles);
await pages.toDoPage.verifyToDoItemsByCategories(addedListsTitles);
console.log(sharedState.toDoItemsInLists);
})

Then('I refresh the browser', async()=>{
await browser.refresh();
await browser.pause(2000);
})

Then('I should see a list of my to-do items grouped by category', async(dataTable)=>{
const listsTitlesExpected = dataTable.raw().flat();
await pages.toDoPage.verifyToDoItemsByCategories(listsTitlesExpected)
})

Then('I mark all to-do items in category as completed',async(dataTable)=>{
    sharedState.expectedCategoriesCheked = dataTable.raw().flat();
    await pages.toDoPage.markTodoItemsAsCompleted(sharedState.expectedCategoriesCheked);

})

Then('I should see all items marked as completed in the list', async()=>{
    await pages.toDoPage.verifyTodoItemsCompleted(sharedState.expectedCategoriesCheked)
})

Then('I delete all to-do items in category list',async(dataTable)=>{
    sharedState.expectedCategoriesDelete = dataTable.raw().flat();

    await pages.toDoPage.deleteTodoItems(sharedState.expectedCategoriesDelete);
})

Then('I should see all items no longer appear in the list', async()=>{
    await pages.toDoPage.verifyTodoItemsDeleted(sharedState.expectedCategoriesDelete);
})

Then('I am logging out of the user profile page', async()=>{
await pages.toDoPage.buttonLoguot.scrollIntoView();
await pages.toDoPage.buttonLoguot.click();
let expectedUrl = browser.options.baseUrl+'/';
await expect(browser).toHaveUrl(expectedUrl);
})