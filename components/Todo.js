import React, { useState } from 'react'
import Image from 'next/image'

const Todo = () => {
	const initialState = [
		{
			id: 'vnode',
			text: 'A simple initial todo',
			completed: false,
		},
	]
	const [todos, setTodos] = useState(initialState)
	const [text, setText] = useState('')

	const addTodo = (text) => {
		const todo = {
			id: Math.random().toString(36).substring(2),
			text,
			completed: false,
		}
		setTodos([...todos, todo])
	}

	const removeTodo = (todo) => {
		const filteredTodos = todos.filter((v) => v !== todo)
		setTodos(filteredTodos)
	}

	const updateTodo = (todo) => {
		const updatedTodos = todos.map((v) => (v.id === todo.id ? todo : v))
		setTodos(updatedTodos)
	}

	const completedTodos = todos.filter((todo) => todo.completed)

	const handleAddTodo = (e) => {
		e.preventDefault()
		const trimmedText = text.trim()

		trimmedText && addTodo(trimmedText)
		setText('')
	}

	const handleTextChange = (e) => {
		setText(e.target.value)
	}

	return (
		<React.Fragment>
			<header>
				<Image
					src="/static/img/android-chrome-192x192.png"
					alt="Next Simple Starter"
					width="192"
					height="192"
				/>
			</header>
			<p className="h-12 bg-red-500">Beaf</p>
		</React.Fragment>
	)
}

export default Todo;
