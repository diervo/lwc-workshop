const TODO_ITEM = 'todo-item';
const TODO_INPUT = 'header input';
const CLEAR_COMPLETED = 'footer .clear-completed';

class TodoAppPage {
    get headerInput()  {
        return browser.element(TODO_INPUT);
    }

    get todos() {
        const item = browser.elements(TODO_ITEM);
        return item && item.value;
    }

    addTodo(text) {
        this.headerInput.setValue(text).keys('Enter');
    }

    getTodo(position) {
        return this.todos[position];
    }

    markCompleted(position) {
        const item = this.todos[position];
        const checkbox = browser.execute(function (item) {
            return item.shadowRoot.querySelector('input[type="checkbox"]');
        }, item);
        checkbox && checkbox.click();
    }
    clearCompleted() {
        browser.element(CLEAR_COMPLETED).click();
    }

}
module.exports = new TodoAppPage();
