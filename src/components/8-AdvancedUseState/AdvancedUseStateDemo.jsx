import { useState } from 'react'
import './AdvancedUseStateDemo.css'

/**
 * Advanced useState Patterns Demo Component
 * Demonstrates advanced state management patterns:
 * - Functional updates (prev => next)
 * - Lazy initialization
 * - Derived state
 * - State with complex objects
 * - Multiple related state values
 * - State batching
 * - Common patterns and anti-patterns
 */
function AdvancedUseStateDemo() {
  console.log('🔵 AdvancedUseStateDemo component rendered')

  return (
    <div className="advanced-usestate-demo">

      {/* 1. FUNCTIONAL UPDATES */}
      <FunctionalUpdatesExample />

      {/* 2. LAZY INITIALIZATION */}
      <LazyInitializationExample />

      {/* 3. DERIVED STATE */}
      <DerivedStateExample />

      {/* 4. COMPLEX OBJECT STATE */}
      <ComplexObjectStateExample />

      {/* 5. STATE BATCHING */}
      <StateBatchingExample />

      {/* 6. COMMON PATTERNS */}
      <CommonPatternsExample />

      {/* 7. ANTI-PATTERNS */}
      <AntiPatternsExample />
    </div>
  )
}

/**
 * Example 1: Functional Updates
 * Use prev => next when new state depends on previous state
 */
function FunctionalUpdatesExample() {
  const [count, setCount] = useState(0)

  // ❌ BAD: Depends on current state value
  const incrementBad = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    // Only increments by 1! All use the same 'count' value
  }

  // ✓ GOOD: Functional update
  const incrementGood = () => {
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    // Increments by 3! Each uses the latest value
  }

  return (
    <div className="demo-card">
      <h3>1. Functional Updates (prev =&gt; next)</h3>
      <p className="info">Use functional updates when new state depends on previous state</p>

      <div className="interactive-demo">
        <div className="counter-display">
          <h2>Count: {count}</h2>
        </div>

        <div className="button-grid">
          <div className="button-section">
            <h4>❌ Bad: Direct Value</h4>
            <button onClick={incrementBad}>
              Increment 3x (Bad)
            </button>
            <p className="note">Only increments by 1</p>
          </div>

          <div className="button-section">
            <h4>✓ Good: Functional Update</h4>
            <button onClick={incrementGood}>
              Increment 3x (Good)
            </button>
            <p className="note">Increments by 3</p>
          </div>
        </div>

        <button onClick={() => setCount(0)} className="reset-btn">
          Reset
        </button>
      </div>

      <div className="code-explanation">
        <pre>{`// ❌ BAD: All updates use same initial value
setCount(count + 1)
setCount(count + 1)  // Still uses old 'count'
setCount(count + 1)  // Still uses old 'count'

// ✓ GOOD: Each update uses latest value
setCount(prev => prev + 1)
setCount(prev => prev + 1)  // Uses result of first
setCount(prev => prev + 1)  // Uses result of second

// When to use:
// - Multiple state updates in sequence
// - Updates in callbacks/closures
// - Async operations (timers, promises)`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 2: Lazy Initialization
 * Expensive initial state calculation runs only once
 */
function LazyInitializationExample() {
  // ❌ BAD: Runs on every render (even though value is only used once)
  const [badCount] = useState(expensiveCalculation())

  // ✓ GOOD: Function runs only once on initial render
  const [goodCount] = useState(() => expensiveCalculation())

  function expensiveCalculation() {
    console.log('💰 Running expensive calculation...')
    // Simulate expensive operation
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += i
    }
    return Math.floor(Math.random() * 100)
  }

  return (
    <div className="demo-card">
      <h3>2. Lazy Initialization</h3>
      <p className="info">Optimize expensive initial state calculations</p>

      <div className="interactive-demo">
        <div className="comparison-grid">
          <div className="comparison-box">
            <h4>❌ Without Lazy Init</h4>
            <pre>{`const [state] = useState(
  expensiveCalc()
)
// Runs on every render!`}</pre>
          </div>

          <div className="comparison-box">
            <h4>✓ With Lazy Init</h4>
            <pre>{`const [state] = useState(
  () => expensiveCalc()
)
// Runs only once!`}</pre>
          </div>
        </div>

        <p className="note">Check console: See when calculations run</p>
      </div>

      <div className="code-explanation">
        <pre>{`// Use lazy initialization for:
// - Reading from localStorage
// - Complex calculations
// - Filtering large arrays
// - Initial data processing

const [user] = useState(() => {
  const saved = localStorage.getItem('user')
  return saved ? JSON.parse(saved) : null
})

const [filtered] = useState(() => {
  return hugeArray.filter(item => item.active)
})`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 3: Derived State
 * Calculate values from state instead of storing them
 */
function DerivedStateExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', price: 1.99, quantity: 3 },
    { id: 2, name: 'Banana', price: 0.99, quantity: 5 },
    { id: 3, name: 'Orange', price: 2.49, quantity: 2 }
  ])

  // ✓ GOOD: Derived state - calculated from items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  return (
    <div className="demo-card">
      <h3>3. Derived State - Don't Store What You Can Calculate</h3>
      <p className="warning">Don't duplicate data in state!</p>

      <div className="interactive-demo">
        <div className="shopping-cart">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <strong>{item.name}</strong>
                <span>${item.price}</span>
              </div>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <strong>Total Items:</strong>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row">
            <strong>Total Price:</strong>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="code-explanation">
        <pre>{`// ❌ BAD: Storing derived values
const [items, setItems] = useState([...])
const [total, setTotal] = useState(0)  // ❌ Duplicate data!
// Must remember to update total when items change

// ✓ GOOD: Calculate from source of truth
const [items, setItems] = useState([...])
const total = items.reduce(...)  // ✓ Always in sync!

// Derive, don't duplicate!`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 4: Complex Object State Management
 * Proper patterns for updating nested objects
 */
function ComplexObjectStateExample() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      zipCode: '10001'
    },
    preferences: {
      theme: 'light',
      notifications: true
    }
  })

  const updateName = (e) => {
    setUser({ ...user, name: e.target.value })
  }

  const updateCity = (e) => {
    setUser({
      ...user,
      address: {
        ...user.address,
        city: e.target.value
      }
    })
  }

  const toggleNotifications = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications
      }
    })
  }

  return (
    <div className="demo-card">
      <h3>4. Complex Object State - Immutable Updates</h3>
      <p className="warning">Always create new objects, never mutate!</p>

      <div className="interactive-demo">
        <div className="user-form">
          <div className="form-row">
            <label>Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={updateName}
            />
          </div>

          <div className="form-row">
            <label>City:</label>
            <input
              type="text"
              value={user.address.city}
              onChange={updateCity}
            />
          </div>

          <div className="form-row">
            <label>Notifications:</label>
            <button onClick={toggleNotifications}>
              {user.preferences.notifications ? '🔔 On' : '🔕 Off'}
            </button>
          </div>
        </div>

        <div className="state-preview">
          <h4>Current State:</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>

      <div className="code-explanation">
        <pre>{`// ❌ BAD: Mutation
user.name = 'Jane'  // ❌ Don't mutate!
setUser(user)       // React won't detect change

// ✓ GOOD: Spread operator (shallow)
setUser({ ...user, name: 'Jane' })

// ✓ GOOD: Nested object update
setUser({
  ...user,
  address: {
    ...user.address,
    city: 'Boston'
  }
})

// For deep nesting, consider:
// - Flattening state structure
// - Using libraries (immer)
// - Splitting into multiple state variables`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 5: State Batching
 * React batches multiple state updates
 */
function StateBatchingExample() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const [renderCount, setRenderCount] = useState(0)

  // Track renders
  useState(() => {
    setRenderCount(prev => prev + 1)
  })

  const handleMultipleUpdates = () => {
    console.log('🎯 Updating multiple states...')
    setCount(c => c + 1)
    setFlag(f => !f)
    setCount(c => c + 1)
    // React 18: Batches all updates = 1 render!
    console.log('🎯 All updates batched into single render')
  }

  return (
    <div className="demo-card">
      <h3>5. State Batching (React 18+)</h3>
      <p className="info">Multiple state updates are automatically batched</p>

      <div className="interactive-demo">
        <div className="state-display">
          <div className="state-item">
            <strong>Count:</strong> {count}
          </div>
          <div className="state-item">
            <strong>Flag:</strong> {flag ? '✓' : '✗'}
          </div>
          <div className="state-item">
            <strong>Renders:</strong> {renderCount}
          </div>
        </div>

        <button onClick={handleMultipleUpdates}>
          Update Multiple States
        </button>

        <p className="note">
          Despite 3 setState calls, component only renders once!
        </p>
      </div>

      <div className="code-explanation">
        <pre>{`// React 18: Automatic batching everywhere!
function handleClick() {
  setCount(c => c + 1)
  setFlag(f => !f)
  setUser(u => ({ ...u, name: 'New' }))
  // Only 1 re-render, not 3!
}

// Works in:
// - Event handlers ✓
// - Promises ✓ (NEW in React 18)
// - setTimeout ✓ (NEW in React 18)
// - Native events ✓ (NEW in React 18)

// Before React 18:
// Only batched in event handlers`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 6: Common Patterns
 */
function CommonPatternsExample() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="demo-card">
      <h3>6. Common State Patterns</h3>
      <p className="info">Real-world state management examples</p>

      <div className="interactive-demo">
        <div className="todo-app">
          <div className="todo-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a todo..."
            />
            <button onClick={addTodo}>Add</button>
          </div>

          <div className="todo-list">
            {todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="code-explanation">
        <pre>{`// ✓ Add to array
setItems([...items, newItem])
setItems([newItem, ...items])  // Add to start

// ✓ Remove from array
setItems(items.filter(item => item.id !== id))

// ✓ Update in array
setItems(items.map(item =>
  item.id === id ? { ...item, done: true } : item
))

// ✓ Sort array
setItems([...items].sort((a, b) => a.name.localeCompare(b.name)))

// ✓ Toggle boolean
setFlag(!flag)
setFlag(f => !f)  // Safer

// ✓ Reset state
setState(initialState)`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 7: Anti-Patterns to Avoid
 */
function AntiPatternsExample() {
  return (
    <div className="demo-card warning-card">
      <h3>7. Anti-Patterns to Avoid ⚠️</h3>

      <div className="pitfall-item">
        <h4>❌ Mutating State Directly</h4>
        <pre>{`// ❌ WRONG
const [items, setItems] = useState([1, 2, 3])
items.push(4)        // ❌ Mutates state!
setItems(items)      // React won't detect change

// ✓ CORRECT
setItems([...items, 4])`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>❌ Using State for Derived Values</h4>
        <pre>{`// ❌ WRONG
const [items, setItems] = useState([...])
const [count, setCount] = useState(0)  // ❌ Redundant!

// ✓ CORRECT
const [items, setItems] = useState([...])
const count = items.length  // ✓ Derive it!`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>❌ Not Using Functional Updates</h4>
        <pre>{`// ❌ WRONG - Stale closure
setTimeout(() => {
  setCount(count + 1)  // Uses old 'count'
}, 1000)

// ✓ CORRECT - Always current
setTimeout(() => {
  setCount(c => c + 1)
}, 1000)`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>❌ Too Many State Variables</h4>
        <pre>{`// ❌ WRONG - Related state split
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')

// ✓ CORRECT - Group related state
const [user, setUser] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Interview Questions</h4>
        <div className="qa-section">
          <p><strong>Q: When should you use functional updates?</strong></p>
          <p><strong>A:</strong> When new state depends on previous state, especially in callbacks, timers, or when making multiple updates.</p>

          <p style={{ marginTop: '15px' }}><strong>Q: What's the difference between setState(value) and setState(fn)?</strong></p>
          <p><strong>A:</strong> Direct value uses current closure value; functional update receives the latest state from React's queue.</p>

          <p style={{ marginTop: '15px' }}><strong>Q: Why is state immutability important?</strong></p>
          <p><strong>A:</strong> React uses shallow comparison to detect changes. Mutating state directly breaks change detection and can cause bugs.</p>
        </div>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Key Takeaways</h4>
        <ol>
          <li>Use functional updates when new state depends on old state</li>
          <li>Use lazy initialization for expensive initial calculations</li>
          <li>Derive values instead of duplicating in state</li>
          <li>Never mutate state - always create new objects/arrays</li>
          <li>Group related state into objects</li>
          <li>React 18+ automatically batches all state updates</li>
          <li>Spread operator for shallow copies, careful with nested data</li>
        </ol>
      </div>
    </div>
  )
}

export default AdvancedUseStateDemo
