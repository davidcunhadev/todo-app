
# ✅📝 Todo List ✅📝

O Todo List é uma aplicação para criação de lista de tarefas, que permite que os usuários possam gerenciar suas atividades diárias, permitindo que criem, visualizem, editem e removam tarefas de forma fácil e eficiente.

<br>

## 🚀 Stack utilizada

**Frontend:** TypeScript, React, Next.js, Recoil, TailwindCSS.

**Backend:** TypeScript, Node, Express, Docker, PostgreSQL, Prisma, JWT, Bcrypt.js.

<br>

## ✨ Funcionalidades

- Temas dark e light.
- Responsividade para vários dispositivos como smartphones, tablets e desktops.
- Criar/logar sua conta.
- Criar/Editar/Excluir categorias.
- Criar/Editar/Excluir tarefas.
- Marcar tarefas como importantes.
- Marcar tarefas como concluídas.
- Listar todas as tarefas.
- Listar tarefas por categoria.
- Abrir detalhes da tarefa.

<br>

## 📂 Estruturas de pastas

O projeto segue a seguinte estrutura de pastas:

### Backend

- todo-list-backend/src: Código fonte do backend da aplicação.
- todo-list-backend/src/adapters: Pasta responsável pelas controllers, rotas, middlewares e também a Database que englobam a aplicação.
- todo-list-backend/src/core: Pasta responsável pelas interfaces, repositories, services e também a casos de uso da aplicação.
- todo-list-backend/src/helpers: Pasta que fornece funções de formatação para manipulação de dados.
- todo-list-backend/src/utils: Pasta que contém funções auxiliares genéricas.

### Frontend
- todo-list-frontend/src: Código fonte do frontend da aplicação.
- todo-list-frontend/src/app: Pasta referente a todas as páginas da aplicação.
- todo-list-frontend/src/api: Pasta referente as requisições da aplicação.
- todo-list-frontend/src/components: Componentes utilizados na aplicação.
- todo-list-frontend/src/helpers: Pasta que fornece funções de formatação para manipulação de dados.
- todo-list-frontend/src/hooks: Hooks que foram utilizados na aplicação.
- todo-list-frontend/src/interface: Interfaces utilizadas na aplicação.
- todo-list-frontend/src/lib: Contexto do controlador de estado global da aplicação.
- todo-list-frontend/src/store: Contém todos os átomos responsáveis por cada estado global da aplicação.
- todo-list-frontend/src/validations: Validações de dados de entrada da aplicação.

<br>

## 📸 Screenshots

- Tela de Login

![LoginScreen](/todo-app-frontend/public/LoginScreen.png)

- Tela de Registro

![RegisterScreen](/todo-app-frontend/public/RegisterScreen.png)

- Tela Principal

![HomeScreenWhiteMode](/todo-app-frontend/public/HomeScreenWhiteTheme.png)

- Tela Principal com Dark Mode

![HomeScreenDarkMode](/todo-app-frontend/public/HomeScreenDarkTheme.png)

- Criando Categoria na Sidebar

![CreatingCategory](/todo-app-frontend/public/CreatingCategoryScreen.png)

<br>

- Categoria Criada com Sucesso

![CreatedCategory](/todo-app-frontend/public/CreatedCategoryScreen.png)

<br>

- Modal de Criação de Tarefa

![CreatingTodoModalScreen](/todo-app-frontend/public/CreatingTodoModalScreen.png)

- Listagem das Tarefas Criadas

![ListingTodosScreen](/todo-app-frontend/public/ListingTodosScreen.png)

<br>

## 📑 Documentação da API

<details>
<summary><strong>Funcionalidades dos usuários</strong></summary>

- #### Logando na rota /user/login

<code>POST</code> <code>/user/login</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** -> Email da sua conta |
| `password` | `string` | **Obrigatório** -> Senha da sua conta |

#### Exemplo de retorno

```http
  {
  "token": "eyJhbGciOiJPUzI1NiIqInR5cCI6IkrXVCJ0.eyJ1c2VySWQiOiJlYmY1MTM4Ny1jQWJiLTQxMjMtYTJjYy0xMzM1MDBhODYwODgiLCJpYXQiOjE3MTU0MzYxNjMsImV4cCI6MTcxNTQ2NDk2M30.DmtGuFpry9NM8kRjQrLHL9bTivrV8TpGw9lYnHYuZvQ",
  "userId": "abc11347-dcba-1234-a2b4-133520a86688"
}
```

- #### Criando uma conta na rota /user/register

<code>POST</code> <code>/user/register</code>


| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** -> Seu nome |
| `email` | `string` | **Obrigatório** -> Email da sua conta |
| `password` | `string` | **Obrigatório** -> Senha da sua conta |

#### Exemplo de retorno

    // Status: 201 Created
    // Sem conteúdo no corpo da resposta.
    
</details>

<hr>

<details>
<summary><strong>Funcionalidades das categorias</strong></summary>
  
- #### Criando uma categoria na rota /category/create

<code>POST</code> <code>/category/create</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** -> Nome da categoria |
| `userId` | `string` | **Obrigatório** -> ID do usuário |

#### Exemplo de retorno

    // Status: 201 Created
    // Sem conteúdo no corpo da resposta.

- #### Listando uma categoria na rota /category/get

<code>GET</code> <code>/category/get</code>

#### Exemplo de retorno

```http
[
  {
    "id": "7476edec-c67e-4539-a801-1a2653ce715e",
    "name": "todas"
  },
  {
    "id": "20dd536e-868f-43d9-a929-ff5946d00cd3",
    "name": "importantes"
  },
  {
    "id": "07398f69-7b11-4224-b26a-9b66023ddc6e",
    "name": "concluídas"
  },
  {
    "id": "5629eda0-c79c-446d-bc9e-d8b1c06004b1",
    "name": "roupas"
  }
]
```

- #### Atualizando uma categoria na rota /category/update

<code>PATCH</code> <code>/category/update</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userCategoryId` | `string` | **Obrigatório** -> ID da tabela userCategory |
| `name` | `string` | **Obrigatório** -> Nome da categoria |

#### Exemplo de retorno

    // Status: 204 No Content
    // Sem conteúdo no corpo da resposta.

- #### Deletando uma categoria na rota /category/delete

<code>DELETE</code> <code>/category/delete</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userCategoryId` | `string` | **Obrigatório** -> ID da tabela userCategory |

#### Exemplo de retorno

    // Status: 204 No Content
    // Sem conteúdo no corpo da resposta.

</details>

<hr>

<details>
<summary><strong>Funcionalidades das tarefas</strong></summary>
  
- #### Criando uma tarefa na rota /todo/create

<code>POST</code> <code>/todo/create</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userId` | `string` | **Obrigatório** -> ID do usuário |
| `title` | `string` | **Obrigatório** -> Título da tarefa |
| `description` | `string` | **Obrigatório** -> Descrição da tarefa |
| `category` | `string` | **Obrigatório** -> Categoria da tarefa |

#### Exemplo de retorno

    // Status: 201 Created
    // Sem conteúdo no corpo da resposta.

- #### Listando todas as tarefas na rota /todo/get

<code>GET</code> <code>/todo/get</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userId` | `string` | **Obrigatório** -> ID do usuário |

#### Exemplo de retorno

```http
[
  {
    "id": "5fa7b1cd-f886-4c1e-8dcf-84f40d449116",
    "title": "lavar roupas",
    "description": "devo lavar minhas roupas",
    "important": false,
    "completed": false,
    "createdAt": "2024-05-11T16:28:20.222Z",
    "updatedAt": "2024-05-11T16:28:20.222Z",
    "category": "roupas"
  },
  {
    "id": "6068cd82-3ab6-428e-8379-d767d8ffa967",
    "title": "ir para a academia hoje",
    "description": "hoje treinarei perna na academia :(",
    "important": false,
    "completed": false,
    "createdAt": "2024-05-11T16:31:48.424Z",
    "updatedAt": "2024-05-11T16:31:48.424Z",
    "category": "esportes"
  }
]
```

- #### Listando as tarefas por categoria na rota /todo/get?category=

<code>GET</code> <code>todo/get?category=</code>

| Parâmetro via query   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `category` | `string` | **Obrigatório** -> Categoria da tarefa |

| Parâmetro via body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userId` | `string` | **Obrigatório** -> ID do usuário |

#### Exemplo de requisição
  ```
    *parâmetro da query*

    /todo/get?category=esportes
  ```
  ```
    *parâmetro do body*

    {
      "userId": "ebf51387-cabb-4123-a2cc-133500a86088"
    }
  ```

#### Exemplo de retorno

```http
[
  {
    "id": "6068cd82-3ab6-428e-8379-d767d8ffa967",
    "title": "ir para a academia hoje",
    "description": "hoje treinarei perna na academia :(",
    "important": false,
    "completed": false,
    "createdAt": "2024-05-11T16:31:48.424Z",
    "updatedAt": "2024-05-11T16:31:48.424Z",
    "category": "esportes"
  }
]
```

- #### Editando tarefa na rota /todo/update

<code>PATCH</code> <code>todo/update</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório** -> ID da tarefa |
| `title` | `string` | **Obrigatório** -> Título da tarefa |
| `description` | `string` | **Obrigatório** -> Descrição da tarefa |
| `category` | `string` | **Obrigatório** -> Categoria da tarefa |

#### Exemplo de retorno

    // Status: 204 No Content
    // Sem conteúdo no corpo da resposta.

- #### Deletando uma tarefa na rota /todo/delete

<code>DELETE</code> <code>todo/delete</code>

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório** -> ID da tarefa |

#### Exemplo de retorno

    // Status: 204 No Content
    // Sem conteúdo no corpo da resposta.

</details>

<hr>

## 🚀 Deploy

Você pode conferir a aplicação rodando nesta URL: https://todo-list-app.up.railway.app/

## 📫 Contato

Contribuições são sempre bem-vindas!

Sinta-se livre para dar feedbacks, entrar em contato e se conectar para novas ideias quando quiser!

- [Email](mailto:contatodavidcunha@hotmail.com)
- [LinkedIn](https://www.linkedin.com/in/davidlcunha/)
## 🤜🤛Autores

- [@davidcunhadev](https://www.github.com/davidcunhadev)
- [@markoclimakodev](https://www.github.com/markoclimakodev)
