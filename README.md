# simple-to-do-app-test-automation

### Used app for testing <https://github.com/AnnaEN845/SimpleToDoApp>


## Test automation project installation

Node v16 should be installed together with NPM
For reports install allure CLI, can be done via NPM:

Fork and Clone the repository:

```bash
git clone <repository-url>
cd simple-to-do-app-test-automation
```
Install dependencies:

```bash
npm install
```
Instal Allure reporter:

```bash
npm install -g allure-commandline
```

## Suported browsers
- chrome
- firefox
- edge

## Usage

### Running the tests

To run all tests on FF and Chrome:

```bash
npm run wdio
```

### headless
To run only on Chrome:

```bash
 npm run wdio --browser='chrome' --headless='true'
```

To run only on FF:

```bash
npm run wdio -- --browser='firefox' --headless='true'
```
To run only on FF:

```bash
npm run wdio --browser='edge' --headless='true'
```

### running specifig tags

e.g., smoke suite
```bash
npm run wdio "@smoke"

```
### running with different browser with flags

Tags can be combined
```bash
npm run wdio "@smoke" -- --browser='firefox' --headless='true'
```

### generating an Allure report
```bash
allure serve
```

### parellel running
```bash
npm run wdio "@smoke" -- --maxInstances 2
```
