import '@testing-library/jest-dom'
import {describe, expect, it} from "vitest";
import MemoryHttpGateway from "./gateway/MemoryHttpGateway.ts";

const todoGateway = new MemoryHttpGateway()

describe('AppContainer', () => {
    it("Deve adicionar um item", async () => {

        await todoGateway.addTodo({
            id: 1,
            description: 'Teste 1',
            done: false
        })

        const todoList = await todoGateway.getTodos()
        const item = todoList[0]

        expect(item.description).toBe('Teste 1')
    })

    it("Deve mudar para done", async () => {

        const todoList = await todoGateway.getTodos()
        const item = todoList[0];

        expect(item.done).toBeFalsy()
        await todoGateway.updateTodo(item)
        expect(item.done).toBeTruthy()
    })

    it("Deve remover um item", async () => {

        const todoList = await todoGateway.getTodos()
        const item = todoList[0];

        expect(todoList.length).toBe(1)
        await todoGateway.removeTodo(item)
        const todoListPostRemove = await todoGateway.getTodos()
        expect(todoListPostRemove.length).toBe(0)
    })
})