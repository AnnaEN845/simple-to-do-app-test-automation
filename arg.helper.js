const BROWSER_CHROME = "chrome";
const BROWSER_FIREFOX = "firefox";
const BROWSER_EDGE = "edge"
let capabilityHeadless = false;
// Default browser will be chrome
let capabilityBrowser = BROWSER_CHROME;

/**
 * Gets and sets custom flag for test execution via process arguments
 * if argument is found and valid then we call function argSetter
 * @param {*} arg - Argument to search for
 * @param {function} argSetter - Setter method that sets variable value
 */
function getProcessArg(arg, argSetter) {
  // Filter args if specific arg matches what we are searching for
  let filteredArgs = process.argv.filter((customArg) =>
    customArg.includes(`--${arg}`)
  );

  // If there are any custom args filtered then get it
  if (Array.isArray(filteredArgs)) {
    filteredArgs = filteredArgs[0];

    //If the value is not empty then get the value specified in flag
    if (filteredArgs && filteredArgs.length > 0) {
      filteredArgs = filteredArgs.replace("--", "");
      filteredArgs = filteredArgs.split("=")[1];

      argSetter(filteredArgs);
    }
  }
};

function setBrowser(browserArgument) {
    // If the value matches valid browser name then return it
    if (
      browserArgument.toLowerCase() === BROWSER_CHROME ||
      browserArgument.toLowerCase() === BROWSER_FIREFOX ||
      browserArgument.toLowerCase() === BROWSER_EDGE
    ) {
      capabilityBrowser = browserArgument;
    } else {
      console.log(`Specified browser '${browserArgument}' not supported.
    Check if this brwoser is supported by WDIO and add it to getBrowser()`);
    }
    console.log(`Using ${capabilityBrowser}`)
}

function setHeadless(headlessArg) {
    if (headlessArg.toLowerCase() === 'true') capabilityHeadless = true;
    else capabilityHeadless = false;
}

function getBrowser() {
    getProcessArg('browser', setBrowser);
    return capabilityBrowser;
}

function getHeadlessArgs() {
    getProcessArg('headless', setHeadless);
    let capabilities = [];
    if (capabilityHeadless) {
        if (capabilityBrowser === BROWSER_FIREFOX) {
            capabilities = ['-headless'];
        } else if (capabilityBrowser === BROWSER_CHROME) {
            capabilities = ['headless', 'disable-gpu'];
        } else if ( capabilityBrowser === BROWSER_EDGE) {
          capabilities = ['--headless'];
        }
    }
    return capabilities;
}

function getHeadless() {
    return capabilityHeadless;
}

export default {
    getBrowser,
    getHeadlessArgs,
    getHeadless
}