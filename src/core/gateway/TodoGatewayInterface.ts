import {Todo} from "../entities/TodoList.ts";

export default interface TodoGatewayInterface {
    getTodos() : Promise<Todo[]>;
    addTodo(item: any) : Promise<any>;
    updateTodo(item: any) : Promise<any>;
    removeTodo(id: any) : Promise<any>;
}