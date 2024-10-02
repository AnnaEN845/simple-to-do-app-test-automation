import { HomePage } from "../page-objects/homePage";
import { LoginPage } from "../page-objects/loginPage";
import { RegisterPage } from "../page-objects/registerPage";
import { ToDoPage } from "../page-objects/toDoPage";
 



class Pages{
    constructor(){
        this.homePage = new HomePage(),
        this.loginPage = new LoginPage(),
        this.registerPage = new RegisterPage(),
        this.toDoPage = new ToDoPage()
    }
}
export const pages = new Pages()