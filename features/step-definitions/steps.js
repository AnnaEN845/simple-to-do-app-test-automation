import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals';
import { pages } from "../support/pages";
import { customFunctions } from '../support/custom-functions';

let logedUserName = "";
let addedNewToDo = [];
let addedToDoItem = {};
let toDoItemsInLists =[];
let expectedCategoriesCheked =[];
let expectedCategoriesDelete =[];


Given('I open landing page', async ()=>{
    await browser.url('');
    await pages.homePage.homePageTitle.waitForDisplayed({ timeout: 3000 });
})

Then('I navigate to the register page', async()=>{
    await pages.homePage.buttonRegister.waitAndClick();
    await pages.registerPage.registerPageTitle.waitForDisplayed({ timeout: 3000 });
})

Then('I navigate to the login page', async()=>{
    await pages.homePage.buttonLogin.waitAndClick();
    await pages.loginPage.loginPageTitle.waitForDisplayed({ timeout: 3000 });
})

Then('I fill in the registration form with valid credentials', async(dataTable)=>{
    let [name, email, password] = dataTable.rows()[0];
    logedUserName = name;
    let randomNum = Math.floor(Math.random() * 10000); 
    let modifiedEmail = email.replace('RANDOMNUMBER', randomNum.toString());
    await pages.registerPage.fillRegistrationForm(name, modifiedEmail, password);   
})

Then('I fill in the registration form with an already registered email',async(dataTable)=>{
    let [usedName, usedEmail, usedPassword] = dataTable.raw()[0];
    logedUserName = usedName;
    await pages.registerPage.fillRegistrationForm(usedName, usedEmail, usedPassword);
})

Then('I fill in the registration form with an invalid password',async(dataTable)=>{
    let [name, email, password] = dataTable.raw()[0];
    let randomNum = Math.floor(Math.random() * 10000); 
    let modifiedEmail = email.replace('RANDOMNUMBER', randomNum.toString());
    await pages.registerPage.fillRegistrationForm(name, modifiedEmail, password);
})

Then('I fill in the login form with valid credentials', async(dataTable)=>{
    let [name, email, password] = dataTable.raw()[0];
    logedUserName = name;
    await pages.loginPage.fillLoginForm(email, password);
})

Then('I fill in the login form with invalid credentials', async(dataTable)=>{
        let [email, password] = dataTable.raw()[0]; 
        await pages.loginPage.fillLoginForm(email, password);  
})

Then('I should see an error message for invalid password requirements',async(dataTable)=>{
    let expectedErrorMessage = dataTable.raw().flat()[0]; 
    let actualErrorMessagesElements = await pages.registerPage.errorMessagesRegisterPage;
    let actualErrorMessages=[];
   
    for(let i = 0; i < actualErrorMessagesElements.length; i++) {
      let errorMesageText = await pages.registerPage.errorMessagesRegisterPage[i].getText();
      actualErrorMessages.push(errorMesageText);
    }
    expect(actualErrorMessages).toContain(expectedErrorMessage);
    console.log(expectedErrorMessage + " is in the array");
})

Then('I should see an errorMessage on login Page',async(dataTable)=>{
        let[errorMessage] = dataTable.raw()[0];
        let expectedErrorMessage = errorMessage;
        await pages.loginPage.errorMessageLoginPage.waitForDisplayed();
        let actualErrorMessage = await pages.loginPage.errorMessageLoginPage.getText();
        await expect(actualErrorMessage).toEqual(expectedErrorMessage);
})

Then('I should see an error message "Missing credentials"', async()=>{
        let expectedErrorMessage = "Missing credentials";
        await pages.loginPage.errorMessageLoginPage.waitForDisplayed();
        let actualErrorMessage = await pages.loginPage.errorMessageLoginPage.getText();
        await expect(actualErrorMessage).toEqual(expectedErrorMessage);
})

Then('I should see an errorMessage on Register Page', async(dataTable)=>{
    let[errorMessage] = dataTable.raw()[0];
    let expectedErrorMessage = errorMessage;
    let actualErrorMessageElement = await pages.registerPage.errorMessagesRegisterPage[0];
    await actualErrorMessageElement.waitForDisplayed();
    let actualErrorMessageText = await actualErrorMessageElement.getText();
    await expect(actualErrorMessageText).toEqual(expectedErrorMessage);
})

Then('I should see the following error messages:', async(dataTable) => {

  let expectedMessages = dataTable.raw().flat();
  let actualErrorMessagesElements = await pages.registerPage.errorMessagesRegisterPage;
  let actualErrorMessages=[];
 
  for(let i = 0; i < actualErrorMessagesElements.length; i++) {
    let errorMesageText = await pages.registerPage.errorMessagesRegisterPage[i].getText();
    actualErrorMessages.push(errorMesageText);
  }
  expectedMessages.forEach((expectedMessage) => {
    expect(actualErrorMessages).toContain(expectedMessage);
    console.log(expectedMessage + " is in the array");  
  });
  })

Then('I should see a Login and Register New User buttons', async()=>{
    let loginBtn = await pages.registerPage.hyperlinkToLoginRegisterPage;
    let registerNewUserBtn = await pages.registerPage.hyperlinkToRegisterRegisterPage;
    await expect(loginBtn).toBeDisplayed({ timeout: 2000 });
    await expect(registerNewUserBtn).toBeDisplayed({ timeout: 2000 });
})

Then('I click on Login button', async()=>{
    await pages.registerPage.hyperlinkToLoginRegisterPage.click();
})

Then('I click on Register New User button', async()=>{
    await pages.registerPage.hyperlinkToRegisterRegisterPage.click();
})

Then('I on login page',async()=>{
    await pages.loginPage.loginPageTitle.waitForDisplayed({ timeout: 2000 });
})

Then('I on register page',async()=>{
    await pages.registerPage.registerPageTitle.waitForDisplayed({ timeout: 2000 });
    let registerBtn = await pages.registerPage.buttonRegisterRegisterPage;
    await expect(registerBtn).toBeDisplayed();  
})

Then('I submit the registration form',async()=>{
        await pages.registerPage.buttonRegisterRegisterPage.waitAndClick();
})

Then('I submit the login form', async()=>{
        await pages.loginPage.buttonLoginLoginPage.waitAndClick();
})

Then('I am redirected to my to-do list page', async()=>{
        await pages.toDoPage.todoPageTitle.waitForDisplayed();
        let actualLogedUserName = await pages.toDoPage.logedUserName.getText();
        await expect(actualLogedUserName).toEqual(logedUserName);
})

Then('I have added a new ToDo', async(dataTable)=>{
        await pages.toDoPage.newTodoCardTitle.waitForDisplayed();
        let rows = dataTable.rows();
        for await (const [addedToDoTitle, addedToDoDescription, addedMm, addedDd, addedYyyy, addedPriority, addedCategory] of rows) {
            addedToDoItem = {title:addedToDoTitle.toLowerCase(), description:addedToDoDescription.toLowerCase(), dueDate:addedYyyy+"-"+addedMm+"-"+addedDd, priority: addedPriority.toLowerCase(), category: addedCategory.toLowerCase()};
            addedNewToDo.push(addedToDoItem);
            await pages.toDoPage.fillNewToDoForm(addedToDoTitle, addedToDoDescription, addedDd, addedMm, addedYyyy, addedPriority, addedCategory);
            await pages.toDoPage.buttonAddTodo.waitAndClick();

        }
})

Then('I have existing to-do items', async(dataTable)=>{
        let rows = dataTable.rows();
        for await (const [addedToDoTitle, addedToDoDescription, addedMm, addedDd, addedYyyy, addedPriority, addedCategory] of rows) {
            addedToDoItem = {title:addedToDoTitle.toLowerCase(), description:addedToDoDescription.toLowerCase(), dueDate:addedYyyy+"-"+addedMm+"-"+addedDd, priority: addedPriority.toLowerCase(), category: addedCategory.toLowerCase()};
            addedNewToDo.push(addedToDoItem);
        }
        let addedListsTitles = [...new Set(addedNewToDo.map(todo => todo.category.toLowerCase()))];
        console.log(addedListsTitles);

        for (const category of addedListsTitles) {
            let listTitle = await pages.toDoPage.getAccordionListTitle(category);
            let listTitleText = await listTitle[0].getText();
            expect(listTitleText.toLowerCase()).toEqual(category.toLowerCase());
    
            let categoryItems = await pages.toDoPage.getAllToDoItemsInCategory(category);
            toDoItemsInLists.push(...categoryItems);
        }
    
        console.log(toDoItemsInLists);
    
        try {
            customFunctions.compareToDoArrays(addedNewToDo, toDoItemsInLists);
            console.log('To-do items match!');
        } catch (error) {
            console.error(error.message);
            throw new Error(`Test failed due to mismatching to-do items: ${error.message}`);
        }
})

Then('I should see a list of my to-do items grouped by category', async(dataTable)=>{
    const listsTitlesExpected = dataTable.raw().flat();

    for (const category of listsTitlesExpected) {
        let listTitle = await pages.toDoPage.getAccordionListTitle(category);
        let listTitleText = await listTitle[0].getText();
        expect(listTitleText.toLowerCase()).toEqual(category.toLowerCase());

        let categoryItems = await pages.toDoPage.getAllToDoItemsInCategory(category);
        toDoItemsInLists.push(...categoryItems);
    }

    console.log(toDoItemsInLists);

    try {
        customFunctions.compareToDoArrays(addedNewToDo, toDoItemsInLists);
        console.log('To-do items match!');
    } catch (error) {
        console.error(error.message);
        throw new Error(`Test failed due to mismatching to-do items: ${error.message}`);
    }
})

Then('I mark all to-do items in category as completed',async(dataTable)=>{
    expectedCategoriesCheked = dataTable.raw().flat();
    for (let i = 0; i < expectedCategoriesCheked.length; i++) {
        let itemsInList = await pages.toDoPage.getAccordionItems(expectedCategoriesCheked[i]);
        for (let y=0; y < itemsInList.length; y++){
            let itemsCheckbox = await pages.toDoPage.getAccordionCheckboxes(expectedCategoriesCheked[i])[y];
            let isChecked = await itemsCheckbox.isSelected();
            
            if (isChecked) {
                throw new Error(`Checkbox in category '${expectedCategoriesCheked[i]}' at index ${y} is already checked. Test failed.`);
            } else {
                await itemsCheckbox.click();
                
                // Verify that the checkbox is now checked
                let isNowChecked = await itemsCheckbox.isSelected();
                await expect(isNowChecked).toBe(true)
            }

        }
    }

})

Then('I should see all items marked as completed in the list', async()=>{
    
    for (let i = 0; i < expectedCategoriesCheked.length; i++) {
        let itemsInList = await pages.toDoPage.getAccordionItems(expectedCategoriesCheked[i]);
        for (let y=0; y < itemsInList.length; y++){
            let itemsCheckbox = await pages.toDoPage.getAccordionCheckboxes(expectedCategoriesCheked[i])[y];
            await expect(itemsCheckbox).toBeChecked()
        }
    }
})

Then('I delete all to-do items in category list',async(dataTable)=>{
    expectedCategoriesDelete = dataTable.raw().flat();
    for (let i = 0; i < expectedCategoriesDelete.length; i++) {
        let itemsInList = await pages.toDoPage.getAccordionItems(expectedCategoriesDelete[i]);
        for (let y=0; y < itemsInList.length; y++){
            let itemsDeleteBtn = await pages.toDoPage.getAccordionDeleteBtns(expectedCategoriesDelete[i])[y];
            await itemsDeleteBtn.click();
            // await browser.pause(2000);
        }
    }

})

Then('I should see all items no longer appear in the list', async()=>{
    for (let i = 0; i < expectedCategoriesDelete.length; i++) {
        let remainingItems = await pages.toDoPage.getAccordionItems(expectedCategoriesDelete[i]);
        expect(remainingItems.length).toBe(0);
    }


})
