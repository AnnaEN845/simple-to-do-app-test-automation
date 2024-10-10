export class LoginPage {
    get loginPageTitle() {
        return browser.$('//h2[text()="Login"]');
    }
    get inputEmailLoginPage() {
        return browser.$('//input[@type="email"]');
    }
    get inputPasswordLoginPage() {
        return browser.$('//input[@type="password"]');
    }
    get buttonLoginLoginPage() {
        return browser.$('//button[@type="submit" and contains(normalize-space(), "Login")]');
    }

    get errorMessageLoginPage(){
        return browser.$('//*[@id="error-messages"]/div');
    }
    async fillLoginForm(email, password){
        await this.inputEmailLoginPage.waitAndSetValue(email);
        await this.inputPasswordLoginPage.waitAndSetValue(password);
    }
}