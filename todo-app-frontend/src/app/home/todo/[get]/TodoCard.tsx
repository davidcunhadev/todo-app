"use client"

import React, { useState } from 'react';

import Icon from '@/components/Icon';
import TodoModal from './TodoModal';

import { formatDateTime } from '@/helpers/formatDateTime';
import { useToggle } from '@/hooks/useToggle';
import Transition from '@/app/transition';
import { ITodo } from '@/interface/todo/ITodo';
import { useSearchParams } from 'next/navigation';
import { addCompleted, addImportant, deleteTodo, getCompletedTodos, getImportantsTodos, getTodos } from '@/api/todoActions';
import { todoState } from '@/store/atoms/todoState';
import { useRecoilState } from 'recoil';
import { themeState } from '@/store/atoms/themeState';
import Swal from 'sweetalert2';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';

type TodoCardProps = {
  todo: ITodo
}

export function TodoCard({ todo }: TodoCardProps) {
  const [theme, __] = useRecoilState(themeState)
  const [_, setTodos] = useRecoilState(todoState)
  const [openTodo, setOpenTodo] = useState(false)
  const [isOpen, toggle] = useToggle(false);
  const searchParams = useSearchParams()
  const search = searchParams.get('category')

  const handleOpenTodo = () => {
    setOpenTodo(!openTodo)
  }

  const handleTodoReload = async () => {
    if (search) {
      const todos = search === "importantes" ? await getImportantsTodos() : search === "concluídas" ? await getCompletedTodos() : await getTodos(search)
      setTodos(todos)
    }
  }

  const handleAddImportant = async () => {
    let newImportantStatus;
    if (todo.important === true) {
        newImportantStatus = false;
        Swal.fire({
          background: `${theme.theme === "dark" ? 'rgb(25,25,25)' : 'rgb(239, 246, 255)'}`,
          color: `${theme.theme === "dark" ? 'rgb(255,255,255)' : 'rgb(24, 24, 27)'}`,
          showConfirmButton: false,
          timer: 1500,
          iconColor: 'rgb(16,185,129)',
          icon: "success",
          title: `Tarefa removida da lista!`
        });
        handleTodoReload()
    } else {
        newImportantStatus = true;
        Swal.fire({
          background: `${theme.theme === "dark" ? 'rgb(25,25,25)' : 'rgb(239, 246, 255)'}`,
          color: `${theme.theme === "dark" ? 'rgb(255,255,255)' : 'rgb(24, 24, 27)'}`,
          showConfirmButton: false,
          timer: 1500,
          iconColor: 'rgb(16,185,129)',
          icon: "success",
          title: `Tarefa adicionada na lista de importantes!`
        });
        handleTodoReload()
    }

    const updatedTodo = { id: todo.id, important: newImportantStatus };

    await addImportant(updatedTodo);
    handleTodoReload()
  }

  const handleAddCompleted = async () => {
    let newCompletedStatus;
    if (todo.completed === true) {
        newCompletedStatus = false;
        Swal.fire({
          background: `${theme.theme === "dark" ? 'rgb(25,25,25)' : 'rgb(239, 246, 255)'}`,
          color: `${theme.theme === "dark" ? 'rgb(255,255,255)' : 'rgb(24, 24, 27)'}`,
          showConfirmButton: false,
          timer: 1500,
          iconColor: 'rgb(16,185,129)',
          icon: "success",
          title: `Tarefa removida da lista!`
        });
        handleTodoReload()
    } else {
        newCompletedStatus = true;
        Swal.fire({
          background: `${theme.theme === "dark" ? 'rgb(25,25,25)' : 'rgb(239, 246, 255)'}`,
          color: `${theme.theme === "dark" ? 'rgb(255,255,255)' : 'rgb(24, 24, 27)'}`,
          showConfirmButton: false,
          timer: 1500,
          iconColor: 'rgb(16,185,129)',
          icon: "success",
          title: `Tarefa adicionada na lista de completas!`
        });
        handleTodoReload()
    }

    const completedTodo = { id: todo.id, completed: newCompletedStatus };

    await addCompleted(completedTodo)
    handleTodoReload()
  }

  const handleDeleteTodo = async () => {
    await deleteTodo(todo.id)
    handleTodoReload()
    return Swal.fire({
      background: `${theme.theme === "dark" ? 'rgb(25,25,25)' : 'rgb(239, 246, 255)'}`,
      color: `${theme.theme === "dark" ? 'rgb(255,255,255)' : 'rgb(24, 24, 27)'}`,
      showConfirmButton: false,
      timer: 1500,
      iconColor: 'rgb(16,185,129)',
      icon: "success",
      title: `Tarefa deletada com sucesso!`
    });
  }

  return (
    <Transition>

      <section
        className={`flex flex-col ${theme.theme === "dark" ? "bg-zinc-800 text-white hover:bg-zinc-600" : "bg-blue-50 hover:bg-blue-100 text-zinc-700"} rounded-md px-8 gap-4 mt-5 cursor-pointer`} key={todo.id} id={todo.id} >

        < TodoModal id={todo.id} openModal={isOpen} closeModal={toggle} modalType='update' />

        <section className="text-lg flex w-full justify-between pl-1">

          <section className="flex items-center w-full gap-2 py-5" onClick={handleOpenTodo}>
            <Icon iconname="Bookmark" className={`${theme.theme === "dark" ? "fill-white text-white" : "fill-blue-500 text-blue-500"}`} size={20} />

            <span className="cursor-pointer">{todo.title}</span>
          </section>

          <section className={`flex items-center gap-2 ${theme.theme === "dark" ? "fill-zinc-200 text-zinc-200" : "fill-blue-500 text-blue-500"}`}>

            <button onClick={toggle}>
              <Icon iconname='FilePenLine' title="Adicionar à lista de importantes" size={20} className="cursor-pointer hover:scale-150 transition-all" />

            </button>
            <button onClick={handleAddImportant}>
              <Icon iconname='AlertCircle' title="Adicionar à lista de importantes" size={20} className={`cursor-pointer hover:scale-150 transition-all ${todo.important === true && theme.theme === "dark" && 'text-red-500'} ${todo.important === true && theme.theme === "light" && 'text-red-500'}`} />
            </button>
            <button onClick={handleAddCompleted}>
              <Icon iconname='CheckSquare' title="Adicionar à lista de concluídas" size={20} className={`cursor-pointer hover:scale-150 transition-all ${todo.completed === true && theme.theme === "dark" && 'text-green-500'} ${todo.completed === true && theme.theme === "light" && 'text-green-500'}`} />
            </button>
            <button onClick={handleDeleteTodo}>
              <Icon iconname='Trash2' title="Adicionar à lista de importantes" size={20} className="cursor-pointer hover:scale-150 transition-all" />
            </button>

          </section>

        </section>

        <section className={openTodo ? 'transition ease-out duration-300 transform flex flex-col gap-4' : 'hidden'} onClick={handleOpenTodo}>

          <p className='px-1 break-all'>{todo.description}</p>
          <footer className="px-1 py-3 flex justify-between w-full text-[10px] text-start">
            <div className='flex flex-col'>
            <span>Criado em: {formatDateTime(String(todo.createdAt))}</span>
            <span>Atualizado em: {formatDateTime(String(todo.updatedAt))}</span>
            </div>
            <span className='flex items-end'>Categoria: {capitalizeFirstLetter(todo.category)}</span>
          </footer>
        </section>

      </section>
    </Transition>

  )
}

export default TodoCard