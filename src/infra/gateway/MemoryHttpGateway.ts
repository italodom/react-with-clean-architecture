import TodoGatewayInterface from "../../core/gateway/TodoGatewayInterface.ts";

export default class MemoryHttpGateway implements TodoGatewayInterface {
    private readonly items: any = [];

    async addTodo(item: any): Promise<any> {
        this.items.push(item)
    }

    async getTodos(): Promise<any> {
        return this.items;
    }

    async removeTodo(id: any): Promise<any> {
        this.items.splice(this.items.indexOf((todoItem: any) => todoItem.id === id))
    }

    async updateTodo(item: any): Promise<any> {
        const updateItem = this.items.find((todoItem: any) => todoItem.id === item.id)
        updateItem.done = !item.done;
    }

}