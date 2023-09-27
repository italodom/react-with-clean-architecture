import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoHttpGateway from "./infra/gateway/TodoHttpGateway.ts";
import {AppContainer} from "./AppContainer.tsx";
import AxiosHttpClient from "./infra/http-client/AxiosHttpClient.ts";

const baseUrl = 'http://localhost:5000'
const httpClient = new AxiosHttpClient()
const todoGateway = new TodoHttpGateway(httpClient, baseUrl)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppContainer todoGateway={todoGateway} />
    </React.StrictMode>,
)
