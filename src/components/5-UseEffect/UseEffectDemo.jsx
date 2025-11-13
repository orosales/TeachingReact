import { useState, useEffect } from 'react'
import './UseEffectDemo.css'

/**
 * useEffect Demo Component
 * Demonstrates the useEffect hook for handling side effects:
 * - Data fetching
 * - Subscriptions
 * - Manual DOM manipulation
 * - Cleanup functions
 * - Dependency array variations
 *
 * useEffect is the React equivalent to Angular lifecycle hooks:
 * - ngOnInit → useEffect with empty dependency array []
 * - ngOnDestroy → cleanup function returned from useEffect
 * - ngOnChanges → useEffect with specific dependencies
 */
function UseEffectDemo() {
  console.log('🔵 UseEffectDemo component rendered')

  return (
    <div className="useeffect-demo">

      {/* 1. BASIC useEffect - Runs after every render */}
      <BasicEffectExample />

      {/* 2. useEffect with EMPTY DEPENDENCY ARRAY - Runs once on mount */}
      <MountOnlyEffect />

      {/* 3. useEffect with DEPENDENCIES - Runs when dependencies change */}
      <DependencyEffect />

      {/* 4. CLEANUP FUNCTION - Cleanup on unmount or before re-run */}
      <CleanupEffect />

      {/* 5. DATA FETCHING Example */}
      <DataFetchingEffect />

      {/* 6. COMMON PITFALLS */}
      <EffectPitfalls />
    </div>
  )
}

/**
 * Example 1: Basic useEffect - NO dependency array
 * Runs after EVERY render (initial render + every update)
 * ⚠️ Usually NOT what you want - can cause performance issues
 */
function BasicEffectExample() {
  const [count, setCount] = useState(0)

  // This runs after EVERY render
  useEffect(() => {
    console.log('🟢 BasicEffect: Effect ran! Count is:', count)
    // No dependency array = runs every time
  })

  return (
    <div className="demo-card">
      <h3>1. Basic useEffect (No Dependency Array)</h3>
      <p className="warning">⚠️ Runs after EVERY render</p>
      <div className="interactive-demo">
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p className="note">
          Check console: Effect runs on every click!
        </p>
      </div>
      <div className="code-explanation">
        <pre>{`useEffect(() => {
  console.log('Runs every render')
  // No dependency array
})`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 2: useEffect with EMPTY dependency array []
 * Runs ONLY ONCE after initial render (componentDidMount equivalent)
 * Perfect for: Initial data fetching, setting up subscriptions
 */
function MountOnlyEffect() {
  const [count, setCount] = useState(0)
  const [mountTime, setMountTime] = useState('')

  // This runs ONLY ONCE when component mounts
  useEffect(() => {
    console.log('🟡 MountOnly: Effect ran ONCE on mount')
    const time = new Date().toLocaleTimeString()
    setMountTime(time)

    // This is like Angular's ngOnInit
  }, []) // ← Empty array = run once on mount

  return (
    <div className="demo-card">
      <h3>2. useEffect with Empty Dependency Array []</h3>
      <p className="success">✓ Runs ONCE on mount (like ngOnInit)</p>
      <div className="interactive-demo">
        <p>Component mounted at: {mountTime}</p>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p className="note">
          Check console: Effect only ran once on mount, not on count changes!
        </p>
      </div>
      <div className="code-explanation">
        <pre>{`useEffect(() => {
  console.log('Runs once on mount')
  // Like ngOnInit in Angular
}, []) // ← Empty dependency array`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 3: useEffect with DEPENDENCIES
 * Runs on initial render + whenever dependencies change
 * Like Angular's ngOnChanges for specific inputs
 */
function DependencyEffect() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React')

  // This runs when 'count' changes (but NOT when 'name' changes)
  useEffect(() => {
    console.log('🔴 DependencyEffect: Count changed to:', count)
    document.title = `Count: ${count}`
  }, [count]) // ← Only re-run when 'count' changes

  return (
    <div className="demo-card">
      <h3>3. useEffect with Dependency Array</h3>
      <p className="info">Runs when dependencies change (like ngOnChanges)</p>
      <div className="interactive-demo">
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment Count</button>
        </div>
        <div style={{ marginTop: '15px' }}>
          <p>Name: {name}</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Change name"
          />
        </div>
        <p className="note">
          Check console & page title: Effect only runs when COUNT changes, not when NAME changes!
        </p>
      </div>
      <div className="code-explanation">
        <pre>{`useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count]) // ← Re-run only when count changes`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 4: CLEANUP FUNCTION
 * Return a function from useEffect to clean up
 * Runs before effect re-runs OR when component unmounts
 * Like Angular's ngOnDestroy
 */
function CleanupEffect() {
  const [showTimer, setShowTimer] = useState(false)

  return (
    <div className="demo-card">
      <h3>4. Cleanup Function (like ngOnDestroy)</h3>
      <p className="info">Clean up timers, subscriptions, event listeners</p>
      <div className="interactive-demo">
        <button onClick={() => setShowTimer(!showTimer)}>
          {showTimer ? 'Stop Timer' : 'Start Timer'}
        </button>
        {showTimer && <Timer />}
      </div>
      <div className="code-explanation">
        <pre>{`useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick')
  }, 1000)

  // Cleanup function (like ngOnDestroy)
  return () => {
    clearInterval(interval)
    console.log('Cleaned up!')
  }
}, [])`}</pre>
      </div>
    </div>
  )
}

// Timer sub-component demonstrating cleanup
function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    console.log('⏰ Timer: Starting interval')
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // CLEANUP: This runs when component unmounts
    return () => {
      console.log('⏰ Timer: Cleaning up interval (component unmounting)')
      clearInterval(interval)
    }
  }, []) // Empty array = setup once, cleanup on unmount

  return (
    <div className="timer-display">
      <p>⏱️ Timer: {seconds} seconds</p>
      <p className="note">Check console when you stop the timer!</p>
    </div>
  )
}

/**
 * Example 5: DATA FETCHING with useEffect
 * Common real-world pattern
 */
function DataFetchingEffect() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(1)

  useEffect(() => {
    console.log('📡 Fetching user:', userId)
    setLoading(true)

    // Simulate API call
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('📡 User fetched:', data.name)
        setUser(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('📡 Error:', error)
        setLoading(false)
      })
  }, [userId]) // Re-fetch when userId changes

  return (
    <div className="demo-card">
      <h3>5. Data Fetching with useEffect</h3>
      <p className="info">Common pattern for API calls</p>
      <div className="interactive-demo">
        <div>
          <label>User ID: </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            min="1"
            max="10"
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="user-card">
            <h4>{user.name}</h4>
            <p>Email: {user.email}</p>
            <p>Company: {user.company?.name}</p>
          </div>
        ) : null}
        <p className="note">
          Check console: New fetch happens when you change the user ID!
        </p>
      </div>
      <div className="code-explanation">
        <pre>{`useEffect(() => {
  setLoading(true)
  fetch(\`/api/users/\${userId}\`)
    .then(res => res.json())
    .then(data => setUser(data))
    .finally(() => setLoading(false))
}, [userId]) // Re-fetch when userId changes`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 6: Common Pitfalls
 */
function EffectPitfalls() {
  return (
    <div className="demo-card warning-card">
      <h3>6. Common useEffect Pitfalls ⚠️</h3>

      <div className="pitfall-item">
        <h4>❌ Infinite Loop - Missing Dependencies</h4>
        <pre>{`const [count, setCount] = useState(0)

useEffect(() => {
  setCount(count + 1) // Updates state
}, []) // ❌ 'count' is stale!

// Fix: Use functional update
useEffect(() => {
  setCount(c => c + 1) // ✓ Always current
}, [])`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>❌ Infinite Loop - Missing Dependency Array</h4>
        <pre>{`useEffect(() => {
  setCount(count + 1)
}) // ❌ No array = runs every render!

// Fix: Add dependency array
useEffect(() => {
  // Only run once
}, [])`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>❌ Forgetting Cleanup</h4>
        <pre>{`useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick')
  }, 1000)
  // ❌ No cleanup = memory leak!
})

// Fix: Return cleanup function
useEffect(() => {
  const interval = setInterval(() => {}, 1000)
  return () => clearInterval(interval) // ✓
}, [])`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Interview Question: useEffect vs Lifecycle Methods</h4>
        <div className="qa-section">
          <p><strong>Q: How does useEffect compare to Angular lifecycle hooks?</strong></p>
          <p><strong>A:</strong></p>
          <ul>
            <li><code>useEffect(() =&gt; {'{}'}, [])</code> = <code>ngOnInit</code> (run once on mount)</li>
            <li><code>useEffect(() =&gt; {'{}'})</code> = <code>ngAfterViewChecked</code> (runs after every render)</li>
            <li><code>useEffect(() =&gt; {'{}'}, [dep])</code> = <code>ngOnChanges</code> (runs when dep changes)</li>
            <li>Cleanup function = <code>ngOnDestroy</code> (cleanup on unmount)</li>
          </ul>
        </div>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Key Takeaways</h4>
        <ol>
          <li>Always include dependency array ([] or [deps])</li>
          <li>Clean up timers, subscriptions, event listeners</li>
          <li>Use functional updates when updating state based on previous state</li>
          <li>One useEffect per concern (separation of concerns)</li>
          <li>Effects run AFTER render (asynchronous)</li>
        </ol>
      </div>
    </div>
  )
}

export default UseEffectDemo
