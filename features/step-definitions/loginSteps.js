import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';
import { pages } from "../support/pages";
// import { customFunctions } from '../support/custom-functions';
import { sharedState } from '../support/sharedState';
// import User from '../support/api-helpers/user';
// import UserData from '../support/data/userData';


Then('I fill in the login form with valid credentials', async(dataTable)=>{
    let [name, email, password] = dataTable.raw()[0];
    sharedState.setNewUserName(name);
    await pages.loginPage.fillLoginForm(email, password);
})

Then('I fill in the login form with new user valid credentials',async()=>{    
    await pages.loginPage.fillLoginForm(sharedState.newUserEmail, sharedState.newUserPassword);
})

Then('I fill in the login form with invalid credentials', async(dataTable)=>{
    let [email, password] = dataTable.raw()[0]; 
    await pages.loginPage.fillLoginForm(email, password);  
})

Then('I fill in the login form with new user invalid password', async(dataTable)=>{
    let [password] = dataTable.raw()[0];
    await pages.loginPage.fillLoginForm(sharedState.newUserEmail, password);
})

Then('I fill in the login form with new user invalid email', async(dataTable)=>{
let [email] = dataTable.raw()[0];
await pages.loginPage.fillLoginForm(email, sharedState.newUserPassword);
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

Then('I on login page',async()=>{
    await pages.loginPage.loginPageTitle.waitForDisplayed({ timeout: 2000 });
})

Then('I submit the login form', async()=>{
    await pages.loginPage.buttonLoginLoginPage.waitAndClick();
})