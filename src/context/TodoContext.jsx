import React, {createContext, useContext} from 'react'

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            text: "Hello",
            completed: false,
        }
    ],

    addTodo: (text) => {},
    deleteTodo: (id) => {},
    updateTodo: (id, text) => {},
    toggleCompleted: (id) => {},
})

export const TodoContextProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}
