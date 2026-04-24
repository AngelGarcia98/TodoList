import { useState } from 'react'

const FILTERS = ['All', 'Active', 'Completed']

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Read a book', completed: true },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos(prev => [...prev, { id: Date.now(), text: trimmed, completed: false }])
    setInput('')
  }

  const toggleTodo = id =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

  const deleteTodo = id =>
    setTodos(prev => prev.filter(t => t.id !== id))

  const clearCompleted = () =>
    setTodos(prev => prev.filter(t => !t.completed))

  const filtered = todos.filter(t => {
    if (filter === 'Active') return !t.completed
    if (filter === 'Completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8 tracking-tight">
          ✅ ToDo List
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 rounded-xl border border-purple-200 bg-white px-4 py-3 text-gray-700 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold px-5 py-3 rounded-xl shadow-sm transition-colors"
          >
            Add
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Filter tabs */}
          <div className="flex border-b border-gray-100">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  filter === f
                    ? 'text-purple-700 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-purple-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Todo items */}
          <ul className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <li className="py-10 text-center text-gray-400 text-sm">
                {filter === 'Completed' ? 'No completed tasks yet.' : 'Nothing to do!'}
              </li>
            )}
            {filtered.map(todo => (
              <li
                key={todo.id}
                className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 accent-purple-600 cursor-pointer shrink-0"
                />
                <span
                  className={`flex-1 text-sm ${
                    todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all text-lg leading-none"
                  aria-label="Delete task"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
            <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
            {todos.some(t => t.completed) && (
              <button
                onClick={clearCompleted}
                className="hover:text-red-500 transition-colors"
              >
                Clear completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


// Agrega esto al final
// prueba webhook
//jkdhdfvaaa