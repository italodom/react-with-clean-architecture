import TodoGatewayInterface from "../../core/gateway/TodoGatewayInterface.ts";
import HttpClientInterface from "../http-client/HttpClientInterface.ts";
import {Todo} from "../../core/entities/TodoList.ts";

export type TodoDTO = {
    id: string;
    todo: string;
    done: boolean;
}

export default class TodoHttpGateway implements TodoGatewayInterface {
    constructor(readonly httpClient: HttpClientInterface, readonly baseUrl: string) {
    }

    async addTodo(item: any): Promise<any> {
        return await this.httpClient.post(`${this.baseUrl}/todos`, this.mapperToDto(item))
    }

    async getTodos(): Promise<any> {
        const todoListData = await this.httpClient.get(`${this.baseUrl}/todos`)

        return todoListData.map((todoDto: TodoDTO) => this.mapperToDomain(todoDto))
    }

    async removeTodo(id: any): Promise<any> {
        return await this.httpClient.delete(`${this.baseUrl}/todos/${id}`)
    }

    async updateTodo(item: any): Promise<any> {
        return await this.httpClient.put(`${this.baseUrl}/todos/${item.id}`, item)
    }

    private mapperToDomain(todoDto: TodoDTO) {
        const todoList: Todo = {
            id: todoDto.id,
            description: todoDto.todo,
            done: todoDto.done
        }

        return todoList;
    }

    private mapperToDto(todo: Todo) {
        const todoDto: TodoDTO = {
            id: todo.id,
            todo: todo.description,
            done: todo.done
        } as TodoDTO

        return todoDto;
    }

}