import TodoList from "./TodoList.ts";
import {describe, expect, it} from "vitest";

describe('TodoListEntity', () => {
    it("Deve criar uma todo list", () => {
        const todoList = new TodoList()
        todoList.addItem('Item 1')
        todoList.addItem('Item 2')
        todoList.addItem('Item 3')
        expect(todoList.getTodoItems().length).toBe(3)
    })

    it("Deve criar uma todo list com 3 itens e 2 done", () => {
        const todoList = new TodoList()
        todoList.addItem('Item 1')
        todoList.addItem('Item 2')
        todoList.addItem('Item 3')
        const item1 = todoList.getItem('Item 1')
        const item2 = todoList.getItem('Item 2')

        todoList.doneItem(item1)
        todoList.doneItem(item2)

        expect(todoList.getProgress()).toBe(67)
    })

    it("Deve criar uma todo list com 3 itens e remover 1", () => {
        const todoList = new TodoList()
        todoList.addItem('Item 1')
        todoList.addItem('Item 2')
        todoList.addItem('Item 3')
        const item1 = todoList.getItem('Item 1')

        todoList.removeItem(item1)

        expect(todoList.getTodoItems().length).toBe(2)
    })
})