import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';
import { pages } from "../support/pages";
import { customFunctions } from '../support/custom-functions';
import { sharedState } from '../support/sharedState';
// import User from '../support/api-helpers/user';
// import UserData from '../support/data/userData';


Then('I fill in the registration form with valid credentials', async(dataTable)=>{
    let [name, email, password] = dataTable.rows()[0];
    sharedState.setNewUserName(name);
    let randomNum = Math.floor(Math.random() * 10000); 
    let modifiedEmail = email.replace('RANDOMNUMBER', randomNum.toString());
    await pages.registerPage.fillRegistrationForm(name, modifiedEmail, password);   
})

Then('I fill in the registration form with an already registered email',async(dataTable)=>{
    let [usedName, usedEmail, usedPassword] = dataTable.raw()[0];
    sharedState.setNewUserName(usedName);
    await pages.registerPage.fillRegistrationForm(usedName, usedEmail, usedPassword);
})

Then('I fill in the registration form with an already registered using API email', async()=>{
    await pages.registerPage.fillRegistrationForm(sharedState.newUserName, sharedState.newUserEmail , sharedState.newUserPassword );

})

Then('I fill in the registration form with an invalid password',async(dataTable)=>{
    let [name, email, password] = dataTable.raw()[0];
    let randomNum = Math.floor(Math.random() * 10000); 
    let modifiedEmail = email.replace('RANDOMNUMBER', randomNum.toString());
    await pages.registerPage.fillRegistrationForm(name, modifiedEmail, password);
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

Then('I on register page',async()=>{
    await pages.registerPage.registerPageTitle.waitForDisplayed({ timeout: 2000 });
    let registerBtn = await pages.registerPage.buttonRegisterRegisterPage;
    await expect(registerBtn).toBeDisplayed();  
})

Then('I submit the registration form',async()=>{
        await pages.registerPage.buttonRegisterRegisterPage.waitAndClick();
})