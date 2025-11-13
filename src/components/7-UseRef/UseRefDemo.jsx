import { useState, useEffect, useRef } from 'react'
import './UseRefDemo.css'

/**
 * useRef Demo Component
 * Demonstrates the useRef hook for:
 * - Accessing DOM elements directly (like Angular's ViewChild)
 * - Persisting values across renders WITHOUT causing re-renders
 * - Storing mutable values that don't trigger updates
 * - Previous value tracking
 * - Focus management
 *
 * useRef is like Angular's ViewChild + ElementRef for DOM access
 * and like a class property that persists but doesn't trigger change detection
 */
function UseRefDemo() {
  console.log('🔵 UseRefDemo component rendered')

  return (
    <div className="useref-demo">

      {/* 1. BASIC useRef - DOM Access */}
      <DOMAccessExample />

      {/* 2. useRef vs useState - No Re-renders */}
      <RefVsStateExample />

      {/* 3. FOCUS MANAGEMENT */}
      <FocusManagementExample />

      {/* 4. PREVIOUS VALUE Tracking */}
      <PreviousValueExample />

      {/* 5. TIMER Example - Mutable Value */}
      <TimerExample />

      {/* 6. COMMON USE CASES */}
      <CommonUseCases />

      {/* 7. BEST PRACTICES & PITFALLS */}
      <RefBestPractices />
    </div>
  )
}

/**
 * Example 1: Accessing DOM Elements
 * Like Angular's @ViewChild and ElementRef
 */
function DOMAccessExample() {
  const inputRef = useRef(null)
  const divRef = useRef(null)

  const focusInput = () => {
    console.log('🎯 Input element:', inputRef.current)
    inputRef.current.focus()
  }

  const getDivInfo = () => {
    console.log('📦 Div element:', divRef.current)
    console.log('📦 Width:', divRef.current.offsetWidth)
    console.log('📦 Height:', divRef.current.offsetHeight)
    alert(`Div dimensions: ${divRef.current.offsetWidth}x${divRef.current.offsetHeight}px`)
  }

  return (
    <div className="demo-card">
      <h3>1. Accessing DOM Elements (like @ViewChild)</h3>
      <p className="info">Direct DOM access like Angular's ViewChild/ElementRef</p>

      <div className="interactive-demo">
        <input
          ref={inputRef}
          type="text"
          placeholder="This input can be focused programmatically"
        />
        <button onClick={focusInput}>Focus Input</button>

        <div ref={divRef} className="measure-div">
          This div can be measured
        </div>
        <button onClick={getDivInfo}>Get Div Info</button>

        <p className="note">Check console for DOM element details!</p>
      </div>

      <div className="code-explanation">
        <pre>{`// Create ref
const inputRef = useRef(null)

// Attach to element
<input ref={inputRef} />

// Access DOM element
inputRef.current.focus()
inputRef.current.value
inputRef.current.scrollIntoView()

// Angular equivalent:
// @ViewChild('input') inputEl: ElementRef
// this.inputEl.nativeElement.focus()`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 2: useRef vs useState
 * Ref changes DON'T trigger re-renders!
 */
function RefVsStateExample() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const renderCount = useRef(0)

  // Track render count
  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

  const incrementState = () => {
    console.log('📊 State increment - will cause re-render')
    setStateCount(stateCount + 1)
  }

  const incrementRef = () => {
    console.log('📌 Ref increment - NO re-render')
    refCount.current = refCount.current + 1
    console.log('📌 New ref value:', refCount.current)
    alert(`Ref value is now ${refCount.current}, but component didn't re-render!`)
  }

  return (
    <div className="demo-card">
      <h3>2. useRef vs useState - No Re-renders</h3>
      <p className="warning">Updating ref.current does NOT trigger re-renders!</p>

      <div className="interactive-demo">
        <div className="comparison-grid">
          <div className="comparison-item">
            <h4>useState (triggers re-render)</h4>
            <p>State Count: {stateCount}</p>
            <button onClick={incrementState}>Increment State</button>
          </div>

          <div className="comparison-item">
            <h4>useRef (NO re-render)</h4>
            <p>Ref Count: {refCount.current}</p>
            <button onClick={incrementRef}>Increment Ref</button>
            <p className="note">Value updates but UI doesn't!</p>
          </div>
        </div>

        <div className="render-counter">
          <strong>Total Renders: {renderCount.current}</strong>
          <p className="note">Only state changes increase render count</p>
        </div>
      </div>

      <div className="code-explanation">
        <pre>{`const [state, setState] = useState(0)    // Causes re-render
const ref = useRef(0)                    // NO re-render

setState(1)       // ✓ Updates UI
ref.current = 1   // ✗ Doesn't update UI

// Use ref for:
// - Values that don't need to show in UI
// - Performance optimization
// - Mutable values across renders`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 3: Focus Management
 * Common use case: Auto-focus on mount or button click
 */
function FocusManagementExample() {
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)

  // Auto-focus first input on mount
  useEffect(() => {
    console.log('🎯 Auto-focusing first input on mount')
    firstNameRef.current.focus()
  }, [])

  const handleFirstNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      lastNameRef.current.focus()
    }
  }

  const handleLastNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      emailRef.current.focus()
    }
  }

  return (
    <div className="demo-card">
      <h3>3. Focus Management</h3>
      <p className="info">Auto-focus and keyboard navigation</p>

      <div className="interactive-demo">
        <div className="form-example">
          <div className="form-field">
            <label>First Name:</label>
            <input
              ref={firstNameRef}
              type="text"
              placeholder="Auto-focused on mount"
              onKeyPress={handleFirstNameKeyPress}
            />
            <span className="hint">Press Enter to go to next field</span>
          </div>

          <div className="form-field">
            <label>Last Name:</label>
            <input
              ref={lastNameRef}
              type="text"
              onKeyPress={handleLastNameKeyPress}
            />
            <span className="hint">Press Enter to go to next field</span>
          </div>

          <div className="form-field">
            <label>Email:</label>
            <input
              ref={emailRef}
              type="email"
            />
          </div>
        </div>
      </div>

      <div className="code-explanation">
        <pre>{`const inputRef = useRef(null)

// Auto-focus on mount
useEffect(() => {
  inputRef.current.focus()
}, [])

// Focus on button click
const focusInput = () => {
  inputRef.current.focus()
}`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 4: Tracking Previous Value
 * Useful pattern for comparing current vs previous
 */
function PreviousValueExample() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef()

  useEffect(() => {
    // Store current value as previous for next render
    prevCountRef.current = count
  }, [count])

  const prevCount = prevCountRef.current

  return (
    <div className="demo-card">
      <h3>4. Tracking Previous Value</h3>
      <p className="info">Compare current vs previous state</p>

      <div className="interactive-demo">
        <div className="value-comparison">
          <div className="value-box">
            <h4>Previous</h4>
            <p className="big-number">{prevCount ?? 'N/A'}</p>
          </div>
          <div className="arrow">→</div>
          <div className="value-box">
            <h4>Current</h4>
            <p className="big-number">{count}</p>
          </div>
        </div>

        <div className="button-group">
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>

        {prevCount !== undefined && (
          <p className="note">
            Change: {count > prevCount ? '📈 Increased' : count < prevCount ? '📉 Decreased' : '➡️ Same'}
          </p>
        )}
      </div>

      <div className="code-explanation">
        <pre>{`function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

const prevCount = usePrevious(count)
console.log(\`Changed from \${prevCount} to \${count}\`)`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 5: Timer with Start/Stop
 * Refs perfect for storing interval/timeout IDs
 */
function TimerExample() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const startTimer = () => {
    if (!isRunning) {
      console.log('⏰ Starting timer')
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }
  }

  const stopTimer = () => {
    console.log('⏰ Stopping timer, ID:', intervalRef.current)
    setIsRunning(false)
    clearInterval(intervalRef.current)
  }

  const resetTimer = () => {
    console.log('⏰ Resetting timer')
    stopTimer()
    setSeconds(0)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="demo-card">
      <h3>5. Timer Example - Storing Mutable Values</h3>
      <p className="info">Store interval/timeout IDs without causing re-renders</p>

      <div className="interactive-demo">
        <div className="timer-display">
          <h2>{seconds}s</h2>
          <p className="timer-status">{isRunning ? '▶️ Running' : '⏸️ Stopped'}</p>
        </div>

        <div className="button-group">
          <button onClick={startTimer} disabled={isRunning}>
            Start
          </button>
          <button onClick={stopTimer} disabled={!isRunning}>
            Stop
          </button>
          <button onClick={resetTimer}>
            Reset
          </button>
        </div>

        <p className="note">Interval ID stored in ref: {intervalRef.current ?? 'null'}</p>
      </div>

      <div className="code-explanation">
        <pre>{`const intervalRef = useRef(null)

const start = () => {
  intervalRef.current = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)
}

const stop = () => {
  clearInterval(intervalRef.current)
}

// Cleanup on unmount
useEffect(() => {
  return () => clearInterval(intervalRef.current)
}, [])`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 6: Common Use Cases
 */
function CommonUseCases() {
  return (
    <div className="demo-card">
      <h3>6. Common useRef Use Cases</h3>

      <div className="use-cases-grid">
        <div className="use-case">
          <h4>🎯 DOM Access</h4>
          <ul>
            <li>Focus management</li>
            <li>Scroll position</li>
            <li>Measure elements</li>
            <li>Trigger animations</li>
          </ul>
        </div>

        <div className="use-case">
          <h4>⏰ Timers/Intervals</h4>
          <ul>
            <li>Store interval IDs</li>
            <li>Store timeout IDs</li>
            <li>Animation frame IDs</li>
          </ul>
        </div>

        <div className="use-case">
          <h4>📝 Mutable Values</h4>
          <ul>
            <li>Previous values</li>
            <li>Instance variables</li>
            <li>Cache calculations</li>
            <li>Track if mounted</li>
          </ul>
        </div>

        <div className="use-case">
          <h4>🔌 Third-party Libraries</h4>
          <ul>
            <li>Chart.js instances</li>
            <li>Map objects (Google Maps)</li>
            <li>Video player instances</li>
            <li>WebSocket connections</li>
          </ul>
        </div>
      </div>

      <div className="code-explanation">
        <pre>{`// DOM Access
const videoRef = useRef(null)
videoRef.current.play()

// Previous value
const prevValue = useRef()
prevValue.current = currentValue

// WebSocket
const wsRef = useRef(null)
wsRef.current = new WebSocket('...')

// Is Mounted check
const isMounted = useRef(true)
useEffect(() => () => { isMounted.current = false }, [])`}</pre>
      </div>
    </div>
  )
}

/**
 * Example 7: Best Practices & Pitfalls
 */
function RefBestPractices() {
  return (
    <div className="demo-card warning-card">
      <h3>7. Best Practices & Common Pitfalls ⚠️</h3>

      <div className="pitfall-item">
        <h4>✓ When to Use useRef</h4>
        <ul>
          <li>Accessing DOM elements (focus, scroll, measure)</li>
          <li>Storing values that shouldn't trigger re-renders</li>
          <li>Keeping mutable values across renders</li>
          <li>Storing previous values for comparison</li>
          <li>Storing timer/interval IDs</li>
        </ul>
      </div>

      <div className="pitfall-item">
        <h4>✗ When NOT to Use useRef</h4>
        <ul>
          <li>Values that need to show in the UI (use useState)</li>
          <li>As a replacement for useState everywhere</li>
          <li>For values that should trigger re-renders</li>
        </ul>
      </div>

      <div className="pitfall-item">
        <h4>⚠️ Common Mistake: Trying to Render ref.current</h4>
        <pre>{`// ❌ BAD: Won't update when ref changes
function Bad() {
  const ref = useRef(0)
  return <div>{ref.current}</div>
  // Incrementing ref.current won't update UI!
}

// ✓ GOOD: Use state for UI values
function Good() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
  // Incrementing count will update UI
}`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>⚠️ Don't Read/Write Refs During Render</h4>
        <pre>{`// ❌ BAD: Reading/writing during render
function Bad() {
  const ref = useRef(0)
  ref.current = ref.current + 1  // Don't do this!
  return <div>{ref.current}</div>
}

// ✓ GOOD: Read/write in effects or event handlers
function Good() {
  const ref = useRef(0)

  const handleClick = () => {
    ref.current = ref.current + 1  // OK in event handler
  }

  useEffect(() => {
    ref.current = 100  // OK in effect
  }, [])

  return <button onClick={handleClick}>Click</button>
}`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Interview Questions</h4>
        <div className="qa-section">
          <p><strong>Q: What's the difference between useRef and useState?</strong></p>
          <p><strong>A:</strong> useState triggers re-renders when updated, useRef doesn't. Use useState for UI values, useRef for mutable values that don't affect rendering.</p>

          <p style={{ marginTop: '15px' }}><strong>Q: How is useRef like Angular's ViewChild?</strong></p>
          <p><strong>A:</strong> Both provide direct access to DOM elements. useRef in React is like ViewChild + ElementRef in Angular.</p>

          <p style={{ marginTop: '15px' }}><strong>Q: When would you use useRef over useState?</strong></p>
          <p><strong>A:</strong> For DOM access, storing interval IDs, tracking previous values, or any mutable value that doesn't need to trigger re-renders.</p>
        </div>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Key Takeaways</h4>
        <ol>
          <li>useRef creates a mutable object that persists across renders</li>
          <li>Changing ref.current does NOT trigger re-renders</li>
          <li>Perfect for DOM access (like Angular's ViewChild)</li>
          <li>Use for values that don't belong in UI</li>
          <li>ref.current is initialized to the value you pass to useRef</li>
          <li>Don't read/write refs during render, only in effects/handlers</li>
        </ol>
      </div>
    </div>
  )
}

export default UseRefDemo
