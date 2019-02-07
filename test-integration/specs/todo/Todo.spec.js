const assert = require('assert');
const TodoPage = require('./TodoPage');
const URL = 'http://localhost:3000';

describe('TodoMVC', () => {
    afterEach(function() {
        browser.localStorage('DELETE');
        browser.refresh();
    });

    it('page load', () => {
        browser.url(URL);
        const title = browser.getTitle();
        assert.equal(title, 'LWC TodoMVC');
    });

    it('create todo item', () => {
        TodoPage.addTodo('test01');
        assert(TodoPage.todos.length === 1);
    });

    it('create multiple todo items', () => {
        TodoPage.addTodo('test01');
        TodoPage.addTodo('test02');
        TodoPage.addTodo('test03');
        assert(TodoPage.todos.length === 3);
    });

    it('mark completed', () => {
        TodoPage.addTodo('test01');
        TodoPage.markCompleted(0);
        const item = TodoPage.getTodo(0);
        const itemClass = item.getAttribute('class');
        assert(itemClass.includes('completed'));
    });

    it('create and remove item', () => {
        TodoPage.addTodo('test01');
        TodoPage.markCompleted(0);
        TodoPage.clearCompleted();
        assert(TodoPage.todos.length === 0);
    });

});
