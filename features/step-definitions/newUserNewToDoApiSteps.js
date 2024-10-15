import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals';
// import { pages } from "../support/pages";
// import { customFunctions } from '../support/custom-functions';
import { sharedState } from '../support/sharedState';
import User from '../support/api-helpers/user';
import UserData from '../support/data/userData';


let userApi;
let baseUrl = browser.options.baseUrl;
let userData = new UserData();


Then('I have registered a new user- api', async () => {
    // console.log(sharedState.userData)
    userApi = new User(baseUrl);
    // console.log(sharedState.userApi);
    let name = "John";
    let curTime = new Date().valueOf();
    let newEmail = `test${curTime}@test.com`;
    let newPassword = '123456Dd@';

    let registrationResult = await userApi.createUserAPI(name, newEmail, newPassword);

    if (registrationResult.success) {
        userData.registeredUserName = name;
        userData.registeredUserEmail = newEmail;
        userData.registeredUserPassword = newPassword;
        sharedState.setNewUserData(userData.registeredUserName, userData.registeredUserEmail, userData.registeredUserPassword );
        // console.log(typeof(sharedState.newUserEmail))
        // console.log(sharedState.newUserEmail.toString(), sharedState.newUserPassword.toString())
        // sharedState.setLoggedUserName(name, newEmail, newPassword);
        console.log('User registered successfully:', userData);
    } else {
        console.error('Registration failed:', registrationResult.message);
        throw new Error(`Registration failed: ${registrationResult.message}`);
    }
});

Then('I create multiple todos for the registered user via API', async (dataTable) => {
    if (!userData.registeredUserEmail || !userData.registeredUserPassword) {
        throw new Error('User must be registered before creating todos');
    }

    let todos = dataTable.hashes();
    for (const todo of todos) {
        const todoResult = await userApi.createTodoAPI(
            todo.title,
            todo.description,
            todo.dueDate,
            todo.priority,
            todo.category
        );

        if (todoResult.success) {
            console.log(`Todo "${todo.title}" created successfully`);
            let addedToDoItem = {
                title: todo.title.toLowerCase(), 
                description: todo.description.toLowerCase(), 
                dueDate: todo.dueDate, 
                priority: todo.priority.toLowerCase(), 
                category: todo.category.toLowerCase()};
                sharedState.addToDo(addedToDoItem)
            // sharedState.addedNewToDo.push(addedToDoItem);
        } else {
            throw new Error(`Failed to create todo "${todo.title}": ${todoResult.message}`);
        }
    }
    console.log(sharedState.addedNewToDo);
});