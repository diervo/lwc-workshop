import { LightningElement, api, track } from 'lwc';
import { ENTER_KEY, ESCAPE_KEY } from 'todo/utils';

export default class TodoItem extends LightningElement {
    @api todoTitle = '';
    @api todoId = '';

    @track editing = false;

    _todoCompleted = false;

    @api
    get todoCompleted() {
        return this._todoCompleted;
    }
    set todoCompleted(newValue) {
        this.classList[newValue ? 'add' : 'remove']('completed');
        this._todoCompleted = newValue;
    }

    fireUpdate() {
        const title = this.template.querySelector('input.edit').value.trim();
        const completed = this.template.querySelector('input.toggle').checked;
        const detail = { title, completed, id: this.todoId };
        const event = new CustomEvent('update', { detail });
        this.dispatchEvent(event);
    }

    fireRemove() {
        const event = new CustomEvent('remove', { detail: { id: this.todoId }});
        this.dispatchEvent(event);
    }

    handleCompletedInput() {
        this.fireUpdate();
    }

    handleRemoveInput() {
        this.fireRemove();
    }

    handleEditModeInput() {
        this.editing = true;
        // view vs edit elements are toggled via css
        this.classList.add('editing');
        this.template.querySelector('input.edit').focus();
    }

    handleBlur() {
        this.editing = false;
        // view vs edit elements are toggled via css
        this.classList.remove('editing');
    }

    handleTitleInput(evt) {
        const title = evt.target.value.trim();
        if (!title) { // remove todo if title is cleared
            this.fireRemove();
            return;
        }
        this.fireUpdate();
    }

    handleKeyDown(evt) {
        const { keyCode } = evt;
        if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
            const el = this.template.querySelector('input.edit');
            // [esc] cancels the edit
            if (keyCode === ESCAPE_KEY) {
                el.value = this.todoTitle;
            }
            // [return] saves the edit
            el.blur();
        }
    }

    renderedCallback() {
        if (this.editing) {
            this.template.querySelector('input.edit').focus();
        }
    }
}
