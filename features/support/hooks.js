import { Before } from '@wdio/cucumber-framework';
import argHelper from '../../arg.helper.js'
const { getHeadless } = argHelper;
import { sharedState } from '../support/sharedState';
Before(async (scenario) => {

    console.log("Before hook started");
    try {
        sharedState.reset();
        // console.log("Reloading session...");
        // await browser.reloadSession();
        // console.log("Session reloaded successfully");

        console.log("Maximizing window...");
        await browser.maximizeWindow();
        console.log("Window maximized successfully");

        const headless = getHeadless();
        if (headless) {
            console.log("Setting window size for headless mode...");
            await browser.setWindowSize(1920, 1080);
            console.log("Window size set successfully");
        }

        console.log("Before hook completed");
    } catch (error) {
        console.error("Error in Before hook:", error);
        throw error;
    }
})