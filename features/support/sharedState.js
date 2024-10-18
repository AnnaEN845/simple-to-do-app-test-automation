export default class SharedState {
    constructor() {
        this.newUserName;
        this.newUserEmail;
        this.newUserPassword;
        this.logedUserName = "";
        this.addedNewToDo = [];
        // this.addedToDoItem = {};
        this.toDoItemsInLists = [];
        this.expectedCategoriesCheked = [];
        this.expectedCategoriesDelete = [];

    }

    reset() {
        this.newUserName;
        this.newUserEmail;
        this.newUserPassword;
        this.logedUserName = "";
        this.addedNewToDo = [];
        // this.addedToDoItem = {};
        this.toDoItemsInLists = [];
        this.expectedCategoriesCheked = [];
        this.expectedCategoriesDelete = [];

    }

    // You can add more methods here to manage the state
    setNewUserData(name, email, password) {
        this.newUserName = name;
        this.newUserEmail = email;
        this.newUserPassword = password;
    }
    setNewUserName(name){
        this.newUserName = name;
    }

    addToDo(item) {
        this.addedNewToDo.push(item);
    }


    // ... other methods as needed
}


export const sharedState = new SharedState();