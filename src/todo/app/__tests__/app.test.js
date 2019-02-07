import { createElement } from 'lwc';
import App from 'todo/app';
import { guid } from 'todo/utils';

/**
 * Mock out the underlying storage of our component under tests (todo/app). When
 * app loads it will call out to the store.js utility to retrieve existing
 * todo items.
 *
 * Here, jest.mock() will intercept the import of store.js and provide our own
 * implementation. This mock allows each test to determine what items, if any,
 * are returned from the store during component construction.
 */
let mockItems = [];
jest.mock('../store', () => {
    return {
        load: jest.fn(() => mockItems),
        save: jest.fn(),
    };
});

function getNewTodo(title, completed) {
    return {
        id: guid(),
        title,
        completed: completed || false,
    };
}

describe('todo/app', () => {
    beforeEach(() => {
        // clear the set of mock items to ensure each test is unaffected by
        // others in the suite
        mockItems = [];
    });

    afterEach(() => {
        // jsdom instance shared across test cases in a single file
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // use nested "describe" blocks to group test cases by functional area
    describe('with no notes', () => {
        it('contains single footer', () => {
            const element = createElement('todo-app', { is: App });
            // push to the DOM to render all elements before doing verification
            document.body.appendChild(element);
            const footer = element.shadowRoot.querySelectorAll('footer');
            expect(footer).toHaveLength(1);
        });

        it('contains header with input element', () => {
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            const header = element.shadowRoot.querySelectorAll('header');
            const input = header[0].querySelector('input');
            expect(input).toBeDefined();
        });

        it('contains no todo-item in template', () => {
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            const todoItems = element.shadowRoot.querySelectorAll('todo-item');
            expect(todoItems).toHaveLength(0);
        });
    });

    describe('with 1 note', () => {
        it('contains 1 todo-item in template', () => {
            mockItems = [getNewTodo('foo')];
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            const todoItems = element.shadowRoot.querySelectorAll('todo-item');
            expect(todoItems).toHaveLength(1);
        });

        it('displays todo count in footer', () => {
            mockItems = [getNewTodo('foo')];
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            const count = element.shadowRoot.querySelector('.todo-count');
            expect(count.textContent).toBe('1 item left');
        });

        it('displays 0 todo count if completed', () => {
            mockItems = [getNewTodo('foo', true)];
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            const count = element.shadowRoot.querySelector('.todo-count');
            expect(count.textContent).toBe('0 items left');
        });

        it('removes todo-item if clear completed button pressed', () => {
            mockItems = [getNewTodo('foo', true)];
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            element.shadowRoot.querySelector('.clear-completed').click();

            // return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the Promise ends in the
            // rejected state
            return Promise.resolve().then(() => {
                const todoItems = element.shadowRoot.querySelectorAll('todo-item');
                expect(todoItems).toHaveLength(0);
            });
        });

        it('removes todo-item if remove event received', () => {
            mockItems = [getNewTodo('foo')];
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            const todoItem = element.shadowRoot.querySelector('todo-item');

            // fire the remove event on the todo item to emulate clicking the
            // destroy button
            const event = new CustomEvent('remove', { detail: { id: todoItem.todoId } });
            todoItem.dispatchEvent(event);

            return Promise.resolve().then(() => {
                const todoItems = element.shadowRoot.querySelectorAll('todo-item');
                expect(todoItems).toHaveLength(0);
            });
        });

        it('updates title with update event', () => {
            mockItems = [getNewTodo('foo')];
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            const todoItem = element.shadowRoot.querySelector('todo-item');

            const payload = {
                detail: {
                    title: 'new foo',
                    completed: false,
                    id: todoItem.todoId,
                },
            };
            const event = new CustomEvent('update', payload);
            todoItem.dispatchEvent(event);

            return Promise.resolve().then(() => {
                const todoItems = element.shadowRoot.querySelector('todo-item');
                expect(todoItems.shadowRoot.textContent).toBe('new foo');
            });
        });
    });

    describe('with multiple notes', () => {
        it('clicking clear completed button does not remove incomplete todos', () => {
            mockItems = [getNewTodo('foo'), getNewTodo('bar', true), getNewTodo('baz')];
            const element = createElement('todo-app', { is: App });
            document.body.appendChild(element);
            element.shadowRoot.querySelector('.clear-completed').click();

            return Promise.resolve().then(() => {
                const todoItems = element.shadowRoot.querySelectorAll('todo-item');
                expect(todoItems).toHaveLength(2);
            });
        });
    });
});
