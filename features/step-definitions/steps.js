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


