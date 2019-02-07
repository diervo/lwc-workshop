import { LightningElement, track } from 'lwc';
import * as store from './store';
import { ENTER_KEY, guid } from 'todo/utils';

// todo list filters. keys match <a href="#/[key]"> in template
const FILTERS = {
    all: 'all',
    active: 'active',
    completed: 'completed',
};

function getCurrentFilter() {
    const rawHash = document.location.hash;
    const location = rawHash.replace(/#\//, '');
    return FILTERS[location] || FILTERS.all;
}

export default class App extends LightningElement {
    @track todos;
    @track filter;

    constructor() {
        super();
        this.todos = store.load();
        this.filter = getCurrentFilter();
        window.addEventListener('hashchange', () => (
            this.filter = getCurrentFilter()
        ));
    }
    get hasTodos() {
        return !!this.todos.length;
    }

    get filteredTodos() {
        return this.todos.filter(todo => {
            switch (this.filter) {
                case FILTERS.active:
                    return !todo.completed;
                case FILTERS.completed:
                    return todo.completed;
                default:
                    return true;
            }
        });
    }

    get completedTodos() {
        return this.todos.filter(todo => todo.completed);
    }

    get countTodos() {
        return this.activeTodos.length;
    }

    get activeTodos() {
        return this.todos.filter(todo => !todo.completed);
    }

    get isAllTodosCompleted() {
        return this.todos.length === this.completedTodos.length;
    }

    get remainingItemsLabel() {
        return this.countTodos === 1 ? 'item' : 'items';
    }

    get allFilterStyle() {
        return this.filter === FILTERS.all ? 'selected' : '';
    }

    get activeFilterStyle() {
        return this.filter === FILTERS.active ? 'selected' : '';
    }

    get completedFilterStyle() {
        return this.filter === FILTERS.completed ? 'selected' : '';
    }

    setTodos(todos) {
        store.save(todos);
        this.todos = todos;
    }

    addNewTodo(title) {
        if (!title) {
            return;
        }
        const completed = false;
        const id = guid();
        this.setTodos([...this.todos, {
            id, // having a unique key property on iterables is important for diffing
            title,
            completed,
        }]);
    }

    handleKeyDown(evt) {
        if (evt.keyCode !== ENTER_KEY) {
            return;
        }
        const title = (evt.target.value || '').trim();
        evt.target.value = '';
        evt.preventDefault();
        this.addNewTodo(title);
    }

    handleTodoRemove(evt) {
        // Note about identity discontinuity: todo-item receives primitives (id, title,
        // completed) so value and identity comparison is equivalent. If this was an
        // object (e.g. the entire todo object) then todo-item would receive a wrapped
        // value (eg wrapped in a read-only proxy membrane). When todo-item events the
        // object back, the object identities are not equal because they are different
        // objects: one is wrapped, the other is "raw." The comparison logic would need
        // to handle that (eg by comparing a primitive identifier).
        const id = evt.detail.id;
        this.setTodos(this.todos.filter(todo => todo.id !== id));
    }

    handleTodoUpdate(evt) {
        const id = evt.detail.id;
        const todos = this.todos.map(todo => {
            if (todo.id === id) {
                return Object.assign({}, todo, evt.detail);
            }
            return todo;
        });
        this.setTodos(todos);
    }

    handleToggleAll({ target }) {
        const todos = this.todos.map(todo => {
            if (target.checked !== todo.completed) {
                todo.completed = target.checked;
            }
            return todo;
        });
        this.setTodos(todos);
    }

    handleClearCompleted() {
        const todos = this.todos.filter(todo => !todo.completed);
        this.setTodos(todos);
    }
}
