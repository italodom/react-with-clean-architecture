import Observable from "./Observable.ts";
import {v4 as uuidv4} from 'uuid'

export type Todo = {
    id: string;
    description: string;
    done: boolean;
}

export default class TodoList extends Observable {
    private items: Todo[] = [];

    constructor(items?: Todo[]) {
        super();
        if (items) {
            for (const item of items) {
                this.items.push({id: item.id, description: item.description, done: item.done})
            }
            this.notify('loadItems', items)
        }
    }

    addItem(description: string) {
        if (description === '') return
        if (this.getItem(description)) return

        const item = {
            id: uuidv4(),
            description,
            done: false
        }
        this.items.push(item)
        this.notify('addItem', item)
    }

    removeItem(item: Todo) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notify('removeItem', item.id)
    }

    doneItem(item: Todo) {
        item.done = !item.done
        this.notify('doneItem', item)
    }

    getItem(description: string): Todo | null {
        return this.items.find((todoItem: any) => todoItem.description === description) ?? null
    }

    getTodoItems(): Todo[] {
        return this.items
    }

    getProgress(): number {
        const todoListCount = this.items.length;
        const todoListDoneCount = this.items.filter((todoItem: any) => todoItem.done).length;

        if (todoListCount === 0) return 0

        return Math.round(todoListDoneCount / todoListCount * 100)
    }
}