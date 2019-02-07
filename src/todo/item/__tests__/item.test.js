import { createElement } from 'lwc';
import TodoItem from 'todo/item';

describe('todo-item', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /**
     * Jest snapshot test. Compares known good snapshot of element with current element instance.
     * Snapshots should only be updated when changes are being made to the element that result in
     * expected element DOM structure changes.
     */
    it('default snapshot', () => {
        const element = createElement('todo-item', { is: TodoItem });
        element.todoTitle = 'foo';
        element.todoId = '1';
        document.body.appendChild(element);
        expect(element).toMatchSnapshot();
    });

    /**
     * All todo-item elements should be in view mode by default until the user double clicks the item.
     */
    it('todo item in view mode by default', () => {
        const element = createElement('todo-item', { is: TodoItem });
        document.body.appendChild(element);
        expect(element.classList).not.toContain('editing');
    });
});
