import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';
import { pages } from "../support/pages";
// import { customFunctions } from '../support/custom-functions';
// import sharedState from '../support/sharedState';
// import User from '../support/api-helpers/user';
// import UserData from '../support/data/userData';


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