class CustomFunctions {
    compareToDoArrays(addedNewToDo, toDoItemsInLists) {

    const sortedAdded = addedNewToDo.sort((a, b) => a.title.localeCompare(b.title));
    const sortedToDo = toDoItemsInLists.sort((a, b) => a.title.localeCompare(b.title));
  
    const differences = [];
    
    sortedAdded.forEach((addedItem, index) => {
      const listItem = sortedToDo[index];
  
      if (addedItem.title !== listItem.title) {
        differences.push(`Mismatch in titles: ${addedItem.title} !== ${listItem.title}`);
      } else {
        if (addedItem.description !== listItem.description) {
          differences.push(`Mismatch in description for ${addedItem.title}: ${addedItem.description} !== ${listItem.description}`);
        }
        if (addedItem.dueDate !== listItem.dueDate) {
          differences.push(`Mismatch in due date for ${addedItem.title}: ${addedItem.dueDate} !== ${listItem.dueDate}`);
        }
        if (addedItem.priority !== listItem.priority) {
          differences.push(`Mismatch in priority for ${addedItem.title}: ${addedItem.priority} !== ${listItem.priority}`);
        }
        if (addedItem.category !== listItem.category) {
          differences.push(`Mismatch in category for ${addedItem.title}: ${addedItem.category} !== ${listItem.category}`);
        }
      }
    });

    // If differences are found, throw an error
    if (differences.length > 0) {
      throw new Error(`Differences found: \n${differences.join('\n')}`);
    }
  }

  createTodoItem(title, description, mm, dd, yyyy, priority, category) {
    return {
        title: title.toLowerCase(),
        description: description.toLowerCase(),
        dueDate: `${yyyy}-${mm}-${dd}`,
        priority: priority.toLowerCase(),
        category: category.toLowerCase()
    };
}
}
export const customFunctions = new CustomFunctions();