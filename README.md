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
- firefox - in working progress
- edge

## Usage

### Precondition
For scenacios from login.feature and toDoList.feature the user and toDos must be in the DB 

### Running the tests

To run all tests on Chrome:

```bash
npx wdio run ./wdio.conf.js
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
To run only on Edge:

```bash
npm run wdio -- --browser='edge' --headless='true'
```

### running specifig tags

e.g., smoke suite
```bash
npm run wdio "@smoke"

```
### running with different browser with flags

Tags can be combined
```bash
npm run wdio "@smoke" -- --browser='edge' --headless='true'
```

### generating an Allure report
```bash
allure serve
```

### parellel running
```bash
npm run wdio "@smoke" -- --maxInstances 2
```
