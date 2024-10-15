import { customFunctions } from '../support/custom-functions';
import { sharedState } from '../support/sharedState';

export class ToDoPage {
    get todoPageTitle() {
        return browser.$('//h1[text()="My Todo List"]');
    }
    get logedUserName(){
        return browser.$('#userName');
    }
    get buttonLoguot(){
        return browser.$("//a[contains(@href, '/logout')]");
    }
    get newTodoCardTitle(){
        return browser.$('//h4[contains(normalize-space(),"New Todo")]');
    }
    get inputNewTodoTitle(){
        return browser.$('//input[@name="todotitle"]');
    }
    get inputNewTodoDescription(){
        return browser.$('//input[@name="description"]');
    }
    get inputNewTodoDueDate(){
        return browser.$('//input[@name="dueDate"]');
    }
    get inputNewTodoPriority(){
        return browser.$('//select[@name="priority"]');
    }
    get inputNewTodoCategory(){
        return browser.$('//select[@name="category"]');
    }
    get buttonAddTodo(){
        return browser.$('//button[@type="submit" and contains(normalize-space(),"Add Todo")]');
    }

    async fillNewToDoForm(title, description, date, month, year, priority, category){
        await this.inputNewTodoTitle.waitAndSetValue(title);
        await this.inputNewTodoDescription.waitAndSetValue(description);
        await this.inputNewTodoDueDate.waitForDisplayed();
        await this.inputNewTodoDueDate.addValue(date);
        await this.inputNewTodoDueDate.addValue(month);
        await this.inputNewTodoDueDate.addValue(year);
        await this.inputNewTodoPriority.waitAndSelectByAttribute('value', priority);
        await this.inputNewTodoCategory.waitAndSelectByAttribute('value', category);
        

    }

    constructor() {
        this.accordionIds = {
            work: 'workAccordion',
            personal: 'personalAccordion',
            shopping: 'shoppingAccordion'
        };
    }

    // Base XPath for a specific accordion category
    getBaseAccordionXPath(accordionCategory) {
        const id = this.accordionIds[accordionCategory];
        if (!id) {
            throw new Error(`Invalid accordion category: ${accordionCategory}`);
        }
        return `//div[@id="${id}"]`;
    }

    // Common XPath for accordion items
    getAccordionItemXPath() {
        return `//div[contains(@class, "accordion-item")]`;
    }

    // Common XPath for accordion header
    getAccordionHeaderXPath() {
        return `${this.getAccordionItemXPath()}//*[contains(@class, "accordion-header")]`;
    }

    // Common XPath for accordion body
    getAccordionBodyXPath() {
        return `${this.getAccordionItemXPath()}//*[contains(@class, "accordion-body")]`;
    }

    // Generic function to get elements based on the provided additional XPath
    getAccordionElements(accordionCategory, additionalXPath = '') {
        const baseXPath = this.getBaseAccordionXPath(accordionCategory);
        return browser.$$(baseXPath + additionalXPath);
    }

    // Specific getters for accordion items

    getAccordionListTitle(accordionCategory){
        return this.getAccordionElements(accordionCategory, '/h2')
    }
    getAccordionItems(accordionCategory){
        return this.getAccordionElements(accordionCategory, this.getAccordionItemXPath());
    }
    getAccordionHeaders(accordionCategory) {
        return this.getAccordionElements(accordionCategory, this.getAccordionHeaderXPath());
    }

    // getAccordionItemsIds(accordionCategory){
    //     return this.getAccordionElements(accordionCategory, `${this.getAccordionHeaderXPath()}//*[@name="todo_id"]`)
    // }
    getAccordionItemsTitles(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionHeaderXPath()}//p`);
    }

    getAccordionCheckboxes(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionHeaderXPath()}//input[@type="checkbox"]`);
    }
    // getAccordionItemsIds(accordionCategory){
    //     return
    // }
    getAccordionDeleteBtns(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionHeaderXPath()}//button[@type="submit"]`);
    }

    getAccordionCollapseBtns(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionHeaderXPath()}//button[contains(@class, "accordion-button")]`);
    }

    getAccordionDescriptions(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionBodyXPath()}/p[1]`);
    }

    getAccordionDueDates(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionBodyXPath()}/p[2]`);
    }

    getAccordionPriorities(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionBodyXPath()}/p[3]`);
    }

    getAccordionCategories(accordionCategory) {
        return this.getAccordionElements(accordionCategory, `${this.getAccordionBodyXPath()}/p[4]`);
    }

    async getToDoItemInfo(accordionCategory, index) {
        let collapseBtn = (await this.getAccordionCollapseBtns(accordionCategory))[index];
        await collapseBtn.click();

        await this.getAccordionDescriptions(accordionCategory)[index].waitForDisplayed({ timeout: 5000 });
        await this.getAccordionDueDates(accordionCategory)[index].waitForDisplayed({ timeout: 5000 });
        await this.getAccordionCategories(accordionCategory)[index].waitForDisplayed({ timeout: 5000 });
        await this.getAccordionPriorities(accordionCategory)[index].waitForDisplayed({ timeout: 5000 });

        let toDoIDElement = await this.getAccordionCheckboxes(accordionCategory)[index].previousElement();
        let toDoID =  await toDoIDElement.getAttribute('value'); 
        let title = await this.getAccordionItemsTitles(accordionCategory)[index].getText();
        let description = await this.getAccordionDescriptions(accordionCategory)[index].getText();
        let dueDateFull = await this.getAccordionDueDates(accordionCategory)[index].getText();
        let dueDate = dueDateFull.replace('Due: ', '');
        let categoryFull = await this.getAccordionCategories(accordionCategory)[index].getText();
        let category = categoryFull.replace('Category: ', '');
        let priorityFull = await this.getAccordionPriorities(accordionCategory)[index].getText();
        let priority = priorityFull.replace('Priority: ', '');

        return {
            toDoID: toDoID,
            title: title.toLowerCase(),
            description: description.toLowerCase(),
            dueDate,
            priority: priority.toLowerCase(),
            category: category.toLowerCase()
        };
    }

    // New method to get all to-do items for a category
    async getAllToDoItemsInCategory(category) {
        let items = await this.getAccordionItems(category);
        let toDoItems = [];

        for (let i = 0; i < items.length; i++) {
            let itemInfo = await this.getToDoItemInfo(category, i);
            toDoItems.push(itemInfo);
        }

        return toDoItems;
    }


    async verifyToDoItemsByCategories(categories) {
        for (const category of categories) {
            const listTitle = await this.getAccordionListTitle(category);
            const listTitleText = await listTitle[0].getText();
            expect(listTitleText.toLowerCase()).toEqual(category.toLowerCase());
    
            const categoryItems = await this.getAllToDoItemsInCategory(category);
            sharedState.toDoItemsInLists.push(...categoryItems);
        }
    
        try {
            customFunctions.compareToDoArrays(sharedState.addedNewToDo, sharedState.toDoItemsInLists);
            console.log('To-do items match!');
        } catch (error) {
            throw new Error(`Test failed due to mismatching to-do items: ${error.message}`);
        }
    }

    async markTodoItemsAsCompleted(categories) {
        for (const category of categories) {
            let itemsInList = await this.getAccordionItems(category);
            for (let index = 0; index < itemsInList.length; index++) {
                let itemsCheckbox = await this.getAccordionCheckboxes(category)[index];
                let isChecked = await itemsCheckbox.isSelected();
                    if (isChecked) {
                    throw new Error(`Checkbox in category '${category}' at index ${index} is already checked. Test failed.`);
                    } else {
                    await itemsCheckbox.click();
                
                // Verify that the checkbox is now checked
                    let isNowChecked = await itemsCheckbox.isSelected();
                    await expect(isNowChecked).toBe(true)
                    }
            }
        }
    }
    
    async verifyTodoItemsCompleted(categories) {
        for (const category of categories) {
            let itemsInList = await this.getAccordionItems(category);
            for (let index = 0; index < itemsInList.length; index++) {
                let itemsCheckbox = await this.getAccordionCheckboxes(category)[index];
                await expect(itemsCheckbox).toBeChecked();
            }
        }
    }

    async deleteTodoItems(categories) {
        for (const category of categories) {
            let itemsInList = await this.getAccordionItems(category);
                for (let index = 0; index < itemsInList.length; index++) {
                    let deleteBtn = await this.getAccordionDeleteBtns(category)[0];
                    await deleteBtn.click();
                    await browser.pause(1000);
                }
        }
    }
    
    async verifyTodoItemsDeleted(categories) {
        for (const category of categories) {
            const remainingItems = await this.getAccordionItems(category);
            expect(remainingItems.length).toBe(0);
        }
    }
}
//*[contains(@action, '/delete-todo')]/input[@type="hidden"] - todo-id delete btn