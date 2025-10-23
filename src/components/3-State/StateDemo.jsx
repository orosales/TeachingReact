import { useState } from 'react'
import './StateDemo.css'

/**
 * STATE DEMO COMPONENT
 * Demonstrates React State management using the useState hook
 *
 * State vs Props:
 * - Props: Data passed from parent (read-only)
 * - State: Data managed within component (can be changed)
 */

function StateDemo() {
  console.log('🔄 StateDemo component rendered')

  // 1. BASIC STATE - Simple counter
  const [count, setCount] = useState(0)

  // 2. STRING STATE - Text input
  const [text, setText] = useState('')

  // 3. BOOLEAN STATE - Toggle
  const [isOn, setIsOn] = useState(false)

  // 4. OBJECT STATE - Complex data
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 25,
    email: 'john@example.com'
  })

  // 5. ARRAY STATE - List management
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Master State', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')

  // 6. MULTIPLE STATE UPDATES - Color picker
  const [bgColor, setBgColor] = useState('#e3f2fd')
  const [textColor, setTextColor] = useState('#1976d2')

  // Event Handlers
  const incrementCount = () => {
    console.log('Before setState:', count)
    setCount(count + 1)
    console.log('After setState (still old value):', count) // State updates are async!
  }

  const decrementCount = () => {
    setCount(count - 1)
  }

  const resetCount = () => {
    setCount(0)
  }

  // Using functional update for count
  const incrementByTen = () => {
    // This is the CORRECT way when new state depends on previous state
    setCount(prevCount => prevCount + 10)
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const toggleSwitch = () => {
    setIsOn(!isOn)
  }

  // Updating object state (must create new object)
  const updateUserName = (newName) => {
    setUser({
      ...user, // Spread operator to copy existing properties
      name: newName // Override the name property
    })
  }

  const updateUserAge = () => {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }))
  }

  // Adding to array state
  const addTodo = () => {
    if (newTodo.trim() === '') return

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false
    }

    setTodos([...todos, newTodoItem]) // Create new array with new item
    setNewTodo('') // Clear input
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="state-demo">
      {/* 1. BASIC COUNTER STATE */}
      <div className="demo-card">
        <h3>1. Basic State - Counter</h3>
        <p className="explanation">
          State is data that changes over time and triggers re-renders when updated.
        </p>
        <div className="counter-display">
          <h1 className="count-number">{count}</h1>
        </div>
        <div className="counter-controls">
          <button onClick={decrementCount} className="btn btn-danger">-1</button>
          <button onClick={resetCount} className="btn btn-secondary">Reset</button>
          <button onClick={incrementCount} className="btn btn-success">+1</button>
          <button onClick={incrementByTen} className="btn btn-primary">+10</button>
        </div>
        <p className="code-example">
          <code>const [count, setCount] = useState(0)</code>
        </p>
      </div>

      {/* 2. TEXT INPUT STATE */}
      <div className="demo-card">
        <h3>2. String State - Text Input</h3>
        <p className="explanation">
          State updates on every keystroke, demonstrating controlled components.
        </p>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Type something..."
          className="text-input"
        />
        <div className="output-display">
          <p>You typed: <strong>{text || '(nothing yet)'}</strong></p>
          <p>Character count: <strong>{text.length}</strong></p>
          <p>Word count: <strong>{text.trim() === '' ? 0 : text.trim().split(/\s+/).length}</strong></p>
        </div>
      </div>

      {/* 3. BOOLEAN STATE - Toggle */}
      <div className="demo-card">
        <h3>3. Boolean State - Toggle Switch</h3>
        <div className="toggle-container">
          <div
            className={`toggle-switch ${isOn ? 'on' : 'off'}`}
            onClick={toggleSwitch}
          >
            <div className="toggle-slider"></div>
          </div>
          <span className="toggle-label">
            The switch is: <strong>{isOn ? 'ON 🟢' : 'OFF 🔴'}</strong>
          </span>
        </div>
        <p className="code-example">
          <code>const [isOn, setIsOn] = useState(false)</code>
        </p>
      </div>

      {/* 4. OBJECT STATE */}
      <div className="demo-card">
        <h3>4. Object State - Complex Data</h3>
        <p className="explanation">
          When updating objects, you must create a new object using the spread operator.
        </p>
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="button-group">
          <input
            type="text"
            placeholder="Enter new name"
            onBlur={(e) => updateUserName(e.target.value)}
            className="text-input"
          />
          <button onClick={updateUserAge} className="btn btn-primary">
            Increase Age
          </button>
        </div>
        <p className="code-example">
          <code>setUser({'{'} ...user, name: newName {'}'})</code>
        </p>
      </div>

      {/* 5. ARRAY STATE - Todo List */}
      <div className="demo-card">
        <h3>5. Array State - Todo List</h3>
        <p className="explanation">
          Managing lists requires creating new arrays, not mutating existing ones.
        </p>
        <div className="todo-input-group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            className="text-input"
          />
          <button onClick={addTodo} className="btn btn-success">Add</button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn-delete"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 6. MULTIPLE STATE VARIABLES */}
      <div className="demo-card">
        <h3>6. Multiple State Variables - Color Customizer</h3>
        <p className="explanation">
          Components can have multiple independent state variables.
        </p>
        <div
          className="color-preview"
          style={{
            backgroundColor: bgColor,
            color: textColor
          }}
        >
          <h2>Preview Text</h2>
          <p>This box updates as you change colors!</p>
        </div>
        <div className="color-controls">
          <div className="color-input-group">
            <label>Background Color:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
            <span>{bgColor}</span>
          </div>
          <div className="color-input-group">
            <label>Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
            <span>{textColor}</span>
          </div>
        </div>
      </div>

      {/* KEY CONCEPTS */}
      <div className="demo-card info-box">
        <h3>🔑 Key Concepts About State</h3>
        <ul>
          <li><strong>State triggers re-renders:</strong> When state changes, React re-renders the component</li>
          <li><strong>State is asynchronous:</strong> setState doesn't update immediately - it schedules an update</li>
          <li><strong>Use functional updates:</strong> When new state depends on old state: <code>setState(prev =&gt; prev + 1)</code></li>
          <li><strong>State is immutable:</strong> Never modify state directly - always use setState</li>
          <li><strong>Objects & Arrays:</strong> Create new objects/arrays instead of mutating existing ones</li>
          <li><strong>Each component has its own state:</strong> State is isolated to the component that declares it</li>
          <li><strong>State can be lifted up:</strong> Move state to a common parent to share between components</li>
        </ul>
      </div>

      {/* STATE VS PROPS COMPARISON */}
      <div className="demo-card comparison-box">
        <h3>State vs Props</h3>
        <div className="comparison-grid">
          <div className="comparison-item">
            <h4>State</h4>
            <ul>
              <li>Managed within component</li>
              <li>Mutable (can be changed)</li>
              <li>Triggers re-renders when updated</li>
              <li>Private to component</li>
              <li>Used with useState hook</li>
            </ul>
          </div>
          <div className="comparison-item">
            <h4>Props</h4>
            <ul>
              <li>Passed from parent component</li>
              <li>Immutable (read-only)</li>
              <li>Doesn't directly trigger re-renders</li>
              <li>Shared between components</li>
              <li>Received as function parameters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StateDemo
