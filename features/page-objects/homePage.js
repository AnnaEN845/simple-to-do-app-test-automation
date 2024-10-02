export class HomePage {
    get homePageTitle() {
        return browser.$('//h1[text()="Yours personal ToDo App"]');
    }
    get buttonLogin(){
        return browser.$('//a[@href="/login"]');
    }
    get buttonRegister(){
        return browser.$('//a[@href="/register"]');
    }
}