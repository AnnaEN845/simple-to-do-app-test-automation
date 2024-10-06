import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals';
import { pages } from "../support/pages";
import { customFunctions } from '../support/custom-functions';

let logedUserName = "";
let addedNewToDo = [];
let addedToDoItem = {};
let toDoItemsInLists =[];

Given('I open landing page', async ()=>{
    await browser.url('');
    await pages.homePage.homePageTitle.waitForDisplayed();
    await browser.pause(3000);

})

Then('I navigate to the register page', async()=>{
    await pages.homePage.buttonRegister.waitAndClick();
    await pages.registerPage.registerPageTitle.waitForDisplayed();
})

Then('I navigate to the login page', async()=>{
    await pages.homePage.buttonLogin.waitAndClick();
    await pages.loginPage.loginPageTitle.waitForDisplayed();
})

Then('I fill in the registration form with valid credentials', async(dataTable)=>{
        let rows = dataTable.rows();
        console.log(rows);
        for await (const row of rows){
            let name = row[0];
            logedUserName = name;
            let email = row[1];
            let randomNum = Math.floor(Math.random() * 10000); 
            let modifiedEmail = email.replace('RANDOMNUMBER', randomNum.toString());
            let password = row[2];

            await pages.registerPage.intupNameRegisterPage.waitAndSetValue(name);
            await pages.registerPage.intupEmailRegisterPage.waitAndSetValue(modifiedEmail);
            await pages.registerPage.intupPasswordRegisterPage.waitAndSetValue(password);
            
        }
      
})

Then('I fill in the registration form with an already registered email',async(dataTable)=>{
    let rows = dataTable.rows();
    console.log(rows);
    for await (const row of rows){
        let name = row[0];
        logedUserName = name;
        let email = row[1];
        let password = row[2];

        await pages.registerPage.intupNameRegisterPage.waitAndSetValue(name);
        await pages.registerPage.intupEmailRegisterPage.waitAndSetValue(email);
        await pages.registerPage.intupPasswordRegisterPage.waitAndSetValue(password);
        
    }
})

Then('I fill in the registration form with an invalid password',async(dataTable)=>{
    let [name, email, password] = dataTable.raw()[0];
    let randomNum = Math.floor(Math.random() * 10000); 
    let modifiedEmail = email.replace('RANDOMNUMBER', randomNum.toString());
    await pages.registerPage.intupNameRegisterPage.waitAndSetValue(name);
    await pages.registerPage.intupEmailRegisterPage.waitAndSetValue(modifiedEmail);
    await pages.registerPage.intupPasswordRegisterPage.waitAndSetValue(password);
})

Then('I fill in the login form with valid credentials', async(dataTable)=>{
        let rows = dataTable.rows();
        console.log(rows);
        for await (const row of rows){
            let name = row[0];
            logedUserName = name;
            let email = row[1];
            let password = row[2];

            await pages.loginPage.inputEmailLoginPage.waitAndSetValue(email);
            await pages.loginPage.inputPasswordLoginPage.waitAndSetValue(password);            
        }
})

Then('I fill in the login form with invalid credentials', async(dataTable)=>{
        let [email, password] = dataTable.raw()[0];  
        await pages.loginPage.inputEmailLoginPage.waitAndSetValue(email);
        await pages.loginPage.inputPasswordLoginPage.waitAndSetValue(password); 
        

})

Then('I should see an error message for invalid password requirements',async(dataTable)=>{
    let expectedErrorMessage = dataTable.raw().flat()[0]; 

    console.log(expectedErrorMessage)
    let actualErrorMessagesElements = await pages.registerPage.errorMessagesRegisterPage;
    let actualErrorMessages=[];
   
    for(let i = 0; i < actualErrorMessagesElements.length; i++) {
      let errorMesageText = await pages.registerPage.errorMessagesRegisterPage[i].getText();
      actualErrorMessages.push(errorMesageText);
    }
    console.log(actualErrorMessages);
    expect(actualErrorMessages).toContain(expectedErrorMessage);
    console.log(expectedErrorMessage + " is in the array");
})

Then('I should see an errorMessage',async(dataTable)=>{
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

Then('I should see an error message saying "Email already in use"', async()=>{
    let expectedErrorMessage = "Email already in use";
    let errorMesage = await pages.registerPage.errorMessagesRegisterPage[0];
    await errorMesage.waitForDisplayed();
    
    let actualErrorMessage = await errorMesage.getText();
    await expect(actualErrorMessage).toEqual(expectedErrorMessage);
})

Then('I should see the following error messages:', async(dataTable) => {

  const expectedMessages = dataTable.raw().flat();
    console.log(expectedMessages);

  let actualErrorMessagesElements = await pages.registerPage.errorMessagesRegisterPage;
  let actualErrorMessages=[];
 
  for(let i = 0; i < actualErrorMessagesElements.length; i++) {
    let errorMesageText = await pages.registerPage.errorMessagesRegisterPage[i].getText();
    actualErrorMessages.push(errorMesageText);
  }
  console.log(actualErrorMessages);

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
    await pages.loginPage.loginPageTitle.waitForDisplayed();
})

Then('I on register page',async()=>{
    await pages.registerPage.registerPageTitle.waitForDisplayed();
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
        for await(const row of rows) {
            let addedToDoTitle = row[0];
            let addedToDoDescription = row[1];
            let addedMm = row[2];
            let addedDd = row[3];
            let addedYyyy = row[4];
            let addedPriority = row[5];
            let addedCategory = row[6];

            addedToDoItem = {title:addedToDoTitle, description:addedToDoDescription, dueDate:addedYyyy+"-"+addedMm+"-"+addedDd, priority: addedPriority, category: addedCategory};
            addedNewToDo.push(addedToDoItem);
            console.log(addedToDoItem);
            console.log(addedNewToDo);
            await pages.toDoPage.inputNewTodoTitle.waitAndSetValue(addedToDoTitle);
            await pages.toDoPage.inputNewTodoDescription.waitAndSetValue(addedToDoDescription);
            await pages.toDoPage.inputNewTodoDueDate.waitForDisplayed();
            await pages.toDoPage.inputNewTodoDueDate.addValue(addedDd);
            await pages.toDoPage.inputNewTodoDueDate.addValue(addedMm);
            await pages.toDoPage.inputNewTodoDueDate.addValue(addedYyyy);
            await pages.toDoPage.inputNewTodoPriority.waitAndSelectByAttribute('value', addedPriority);
            await pages.toDoPage.inputNewTodoCategory.waitAndSelectByAttribute('value', addedCategory);
            await pages.toDoPage.buttonAddTodo.waitAndClick();

        }

})

Then('I have existing to-do items', async(dataTable)=>{
        let rows = dataTable.rows();
        for await(const row of rows) {
            let addedToDoTitle = row[0];
            let addedToDoDescription = row[1];
            let addedMm = row[2];
            let addedDd = row[3];
            let addedYyyy = row[4];
            let addedPriority = row[5];
            let addedCategory = row[6];

            addedToDoItem = {title:addedToDoTitle, description:addedToDoDescription, dueDate:addedYyyy+"-"+addedMm+"-"+addedDd, priority: addedPriority, category: addedCategory};
            addedNewToDo.push(addedToDoItem);
        }
})

Then('I should see a list of my to-do items grouped by 3 category', async(dataTable)=>{
        let listsTitlesExpected =[];
        let listTitlesActual =[];
        let rows = dataTable.rows();
        for await(const row of rows) {
            let listTitle1 = row[0];
            let listTitle2 = row[1];
            let listTitle3 = row[2];
            listsTitlesExpected.push(listTitle1, listTitle2, listTitle3);
            }
        for (let i = 0; i < listsTitlesExpected.length; i++) {
            let listTitle = await pages.toDoPage.getAccordionListTitle(listsTitlesExpected[i]);
            let listTitleText = await listTitle[0].getText(); 
            listTitlesActual.push(listTitleText.toLowerCase());
            let itemsInList = await pages.toDoPage.getAccordionItems(listsTitlesExpected[i]);
            for (let y=0; y < itemsInList.length; y++){
                let collapseBtn = await pages.toDoPage.getAccordionCollapseBtns(listsTitlesExpected[i])[y];
                await collapseBtn.click();

                await pages.toDoPage.getAccordionDescriptions(listsTitlesExpected[i])[y].waitForDisplayed({ timeout: 5000 });
                await pages.toDoPage.getAccordionDueDates(listsTitlesExpected[i])[y].waitForDisplayed({ timeout: 5000 });
                await pages.toDoPage.getAccordionCategories(listsTitlesExpected[i])[y].waitForDisplayed({ timeout: 5000 });
                await pages.toDoPage.getAccordionPriorities(listsTitlesExpected[i])[y].waitForDisplayed({ timeout: 5000 });
                let itemTitle = await pages.toDoPage.getAccordionItemsTitles(listsTitlesExpected[i])[y].getText();
                let itemDescriprion = await pages.toDoPage.getAccordionDescriptions(listsTitlesExpected[i])[y].getText();
                
                let itemDueDateFull = await pages.toDoPage.getAccordionDueDates(listsTitlesExpected[i])[y].getText();
                let itemDueDate = itemDueDateFull.replace('Due: ', '');
                let itemCategoryFull = await pages.toDoPage.getAccordionCategories(listsTitlesExpected[i])[y].getText();
                let itemCategory = itemCategoryFull.replace('Category: ', '');
                let itemPriorityFull = await pages.toDoPage.getAccordionPriorities(listsTitlesExpected[i])[y].getText();
                let itemPriority = itemPriorityFull.replace('Priority: ','')
                let toDoItem = {title:itemTitle, description:itemDescriprion, dueDate:itemDueDate, priority: itemPriority.toLowerCase(), category: itemCategory.toLowerCase()};
                toDoItemsInLists.push(toDoItem);
                
            }
            
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


