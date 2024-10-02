// export class CostomCommands {
    export default function addCustomCommands(browser) {
        browser.addCommand("waitAndClick", async function () {
          await this.waitForDisplayed();
          await this.click();
        }, true);
      
        // browser.addCommand("scrollAndClick", async function () {
        //   await this.waitForDisplayed();
        //   await this.scrollIntoView({ block: 'center', inline: 'center' });
        //   await this.click();
        // }, true);
      
        browser.addCommand("waitAndSetValue", async function (value) {
          await this.waitForDisplayed();
          await this.setValue(value);
        }, true);

        browser.addCommand("waitAndSelectByAttribute", async function(attributeName, value){
          await this.waitForDisplayed();
          await this.selectByAttribute(attributeName, value);
        }, true );
      
        // browser.addCommand("waitToAppearAndDisappear", async function () {
        //   await this.waitForDisplayed();
        //   await this.waitForDisplayed({ reverse: true });
        // }, true);
      };