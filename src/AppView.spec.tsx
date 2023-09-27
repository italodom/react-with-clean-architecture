import '@testing-library/jest-dom'
import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import AppView from "./AppView.tsx";
import TodoList from "./core/entities/TodoList.ts";

const TODOS_LIST = [
    {id: '1', description: 'Lavar a louça', done: false},
    {id: '2', description: 'Levar o lixo', done: false},
    {id: '3', description: 'Tomar banho', done: true},
]
const todoList = new TodoList(TODOS_LIST)

describe('App', () => {
    it("Deve renderizar o componente todo List", async () => {
        render(<AppView todoList={todoList} />)

        expect(screen.getByText('Lavar a louça'))
        expect(screen.getByText('Levar o lixo'))
    })

    it("Deve renderizar o progresso do todo list", async () => {
        render(<AppView todoList={todoList} />)

        expect(screen.getByText('33%'))
    })

    it("Deve adicionar um novo item no todo list ao pressionar Enter", async () => {
        render(<AppView todoList={todoList} />)

        const input = screen.getByRole('textbox')
        input.setAttribute('value', 'Novo teste')

        fireEvent.keyDown(input, {
            code: 'Enter'
        })

        const item = todoList.getItem('Novo teste')
        expect(item?.description).toBe('Novo teste')
    })

    it("Deve adicionar um novo item no todo list ao pressionar NumpadEnter", async () => {
        render(<AppView todoList={todoList} />)

        const input = screen.getByRole('textbox')
        input.setAttribute('value', 'Novo teste 123')

        fireEvent.keyDown(input, {
            code: 'NumpadEnter'
        })

        const item = todoList.getItem('Novo teste 123')
        expect(item?.description).toBe('Novo teste 123')
    })

    it("Deve remover um item do todo list", async () => {
        render(<AppView todoList={todoList} />)

        const onRemove = vi.fn()

        const buttons = screen.getAllByText('remove')
        const button = buttons[0]
        button.addEventListener('click', onRemove)

        fireEvent.click(button)

        expect(onRemove).toHaveBeenCalled()
    })

    it("Deve alterar o done de um item do todo list", async () => {
        render(<AppView todoList={todoList} />)

        const onDoneUndone = vi.fn()

        const buttons = screen.getAllByText('done/undone')
        const button = buttons[0]
        button.addEventListener('click', onDoneUndone)

        fireEvent.click(button)

        expect(onDoneUndone).toHaveBeenCalled()
    })
})