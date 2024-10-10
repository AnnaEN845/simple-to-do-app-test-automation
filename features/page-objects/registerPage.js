export class RegisterPage {
    get registerPageTitle() {
        return browser.$('//h2[text()="Register"]');
    }
    get intupNameRegisterPage() {
        return browser.$('//input[@name="name"]');
    }
    get intupEmailRegisterPage() {
        return browser.$('//input[@type="email"]');
    }
    get intupPasswordRegisterPage() {
        return browser.$('//input[@type="password"]');
    }
    get buttonRegisterRegisterPage() {
        return browser.$('//*[@id="registerBtn"]');
    }
    get errorMessagesRegisterPage(){
        return browser.$$('//ul/li')
    }
    get hyperlinkToLoginRegisterPage(){
        return browser.$('//a[@href="/login" and contains(normalize-space(), "Login")]')
    }
    get hyperlinkToRegisterRegisterPage(){
        return browser.$('//a[@href="/register" and contains(normalize-space(), "Register New User")]')
    }
    async fillRegistrationForm(name, email, password){
        await this.intupNameRegisterPage.waitAndSetValue(name);
        await this.intupEmailRegisterPage.waitAndSetValue(email);
        await this.intupPasswordRegisterPage.waitAndSetValue(password);
    }
}