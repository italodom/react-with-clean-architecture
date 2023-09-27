import AppView from "./AppView.tsx";
import {useEffect, useState} from "react";
import TodoGatewayInterface from "./core/gateway/TodoGatewayInterface.ts";
import TodoList from "./core/entities/TodoList.ts";
import Observer from "./core/entities/Observer.ts";

interface AppContainerProps {
    todoGateway: TodoGatewayInterface
}

const AppContainer = ({ todoGateway}: AppContainerProps) => {
    const [todoList, setTodoList] = useState<TodoList>(new TodoList())

    useEffect(() => {
        void loadTodoList()
    }, []);

    const loadTodoList = async () => {
        const todoData = await todoGateway.getTodos()
        const todoListObj = new TodoList(todoData)

        todoListObj.register(new Observer('addItem', async (item: any) => {
            await todoGateway.addTodo(item)
            await loadTodoList()
        }))
        todoListObj.register(new Observer('removeItem', async (item: any) => {
            await todoGateway.removeTodo(item)
            await loadTodoList()
        }))
        todoListObj.register(new Observer('doneItem', async (item: any) => {
            await todoGateway.updateTodo(item)
            await loadTodoList()
        }))

        setTodoList(todoListObj)
    }

    return (
        <AppView todoList={todoList} />
    );
};

export {AppContainer};
