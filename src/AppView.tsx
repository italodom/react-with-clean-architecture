import TodoList from "./core/entities/TodoList.ts";

interface AppProps {
    todoList: TodoList
}

function AppView({todoList}: AppProps) {
    const addItem = async (e: any) => {
        if (['Enter', 'NumpadEnter'].includes(e.code)) {
            const value = e.target.value;
            todoList.addItem(value)
            e.target.value = ''
        }
    }

    return (
        <>
            <h1>MY TODOS</h1>
            <hr />
            {todoList.getProgress()}%

            <hr />
            <input type="text" onKeyDown={addItem} />

            <ul>
                {todoList.getTodoItems().map((todoItem: any) => (
                    <li key={todoItem.id}>
                        <span
                            style={{textDecoration: todoItem.done ? 'line-through' : ''}}>{todoItem.description}</span>
                        <button onClick={() => todoList.doneItem(todoItem)}>done/undone</button>
                        <button onClick={() => todoList.removeItem(todoItem)}>remove</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default AppView
