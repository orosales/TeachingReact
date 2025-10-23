import { useState, useEffect } from 'react'
import './VirtualDOMDemo.css'

/**
 * VIRTUAL DOM DEMONSTRATION
 *
 * This component explains and demonstrates how React's Virtual DOM works
 * and the reconciliation process that makes React fast and efficient.
 */

// Component to demonstrate reconciliation with keys
function KeyDemo() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', color: '#e3f2fd' },
    { id: 2, text: 'Item 2', color: '#f3e5f5' },
    { id: 3, text: 'Item 3', color: '#e8f5e9' }
  ])

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    setItems(shuffled)
    console.log('🔄 Items shuffled - React uses keys to efficiently reorder DOM elements')
  }

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      text: `Item ${items.length + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 85%)`
    }
    setItems([...items, newItem])
    console.log('➕ New item added - React efficiently adds only the new element')
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
    console.log('➖ Item removed - React efficiently removes only that element')
  }

  return (
    <div className="key-demo">
      <div className="button-group">
        <button onClick={shuffleItems} className="btn btn-primary">
          Shuffle Items
        </button>
        <button onClick={addItem} className="btn btn-success">
          Add Item
        </button>
      </div>
      <div className="items-container">
        {items.map((item) => (
          <div
            key={item.id}
            className="demo-item"
            style={{ backgroundColor: item.color }}
          >
            <span>{item.text}</span>
            <button onClick={() => removeItem(item.id)} className="remove-btn">
              ✕
            </button>
          </div>
        ))}
      </div>
      <p className="note">
        Open DevTools Console to see reconciliation logs. Notice how React efficiently updates only what changed!
      </p>
    </div>
  )
}

// Component to demonstrate rendering performance
function PerformanceDemo() {
  const [updateCount, setUpdateCount] = useState(0)
  const [lastUpdateTime, setLastUpdateTime] = useState(null)

  useEffect(() => {
    console.log(`⚡ Component re-rendered ${updateCount} times`)
  }, [updateCount])

  const simulateUpdate = () => {
    const startTime = performance.now()
    setUpdateCount(prev => prev + 1)
    const endTime = performance.now()
    setLastUpdateTime((endTime - startTime).toFixed(2))
    console.log(`⏱️ Update took ${(endTime - startTime).toFixed(2)}ms`)
  }

  const simulateMassUpdate = () => {
    const startTime = performance.now()
    // Simulate 100 rapid updates - React batches them efficiently
    for (let i = 0; i < 100; i++) {
      setUpdateCount(prev => prev + 1)
    }
    const endTime = performance.now()
    setLastUpdateTime((endTime - startTime).toFixed(2))
    console.log(`⚡ 100 updates batched and completed in ${(endTime - startTime).toFixed(2)}ms`)
  }

  return (
    <div className="performance-demo">
      <div className="metrics">
        <div className="metric-card">
          <span className="metric-label">Total Updates:</span>
          <span className="metric-value">{updateCount}</span>
        </div>
        {lastUpdateTime && (
          <div className="metric-card">
            <span className="metric-label">Last Update Time:</span>
            <span className="metric-value">{lastUpdateTime}ms</span>
          </div>
        )}
      </div>
      <div className="button-group">
        <button onClick={simulateUpdate} className="btn btn-primary">
          Single Update
        </button>
        <button onClick={simulateMassUpdate} className="btn btn-warning">
          100 Batched Updates
        </button>
      </div>
    </div>
  )
}

function VirtualDOMDemo() {
  return (
    <div className="virtual-dom-demo">
      {/* EXPLANATION SECTION */}
      <div className="demo-card info-card">
        <h3>🎯 What is the Virtual DOM?</h3>
        <p>
          The Virtual DOM is a lightweight JavaScript representation of the actual DOM.
          React keeps this virtual copy in memory and uses it to optimize updates.
        </p>
        <div className="concept-diagram">
          <div className="diagram-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <strong>State Changes</strong>
              <p>Component state updates</p>
            </div>
          </div>
          <div className="arrow">→</div>
          <div className="diagram-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <strong>Virtual DOM Update</strong>
              <p>React creates new Virtual DOM</p>
            </div>
          </div>
          <div className="arrow">→</div>
          <div className="diagram-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <strong>Diffing</strong>
              <p>Compares with previous Virtual DOM</p>
            </div>
          </div>
          <div className="arrow">→</div>
          <div className="diagram-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <strong>Real DOM Update</strong>
              <p>Only changed elements are updated</p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY VIRTUAL DOM */}
      <div className="demo-card">
        <h3>💡 Why Virtual DOM?</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h4>Performance</h4>
            <p>DOM manipulation is slow. Virtual DOM minimizes actual DOM changes by batching updates.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h4>Efficiency</h4>
            <p>React only updates what changed, not the entire DOM tree.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔄</div>
            <h4>Reconciliation</h4>
            <p>Smart diffing algorithm identifies minimal changes needed.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📦</div>
            <h4>Batching</h4>
            <p>Multiple state updates are batched into a single re-render.</p>
          </div>
        </div>
      </div>

      {/* RECONCILIATION PROCESS */}
      <div className="demo-card highlight-card">
        <h3>🔄 The Reconciliation Process</h3>
        <p className="explanation">
          Reconciliation is React's algorithm for updating the DOM efficiently by comparing the new Virtual DOM with the previous one.
        </p>
        <div className="reconciliation-rules">
          <div className="rule">
            <strong>Rule 1: Element Type</strong>
            <p>If element types differ (e.g., {'<div>'} vs {'<span>'}), React destroys the old tree and builds a new one.</p>
            <div className="code-block">
              <code>
                {`// Old: <div>Content</div>
// New: <span>Content</span>
// Result: Entire subtree replaced`}
              </code>
            </div>
          </div>
          <div className="rule">
            <strong>Rule 2: Same Type Elements</strong>
            <p>React keeps the same DOM node and only updates changed attributes.</p>
            <div className="code-block">
              <code>
                {`// Old: <div className="old" />
// New: <div className="new" />
// Result: Only className updated`}
              </code>
            </div>
          </div>
          <div className="rule">
            <strong>Rule 3: Keys in Lists</strong>
            <p>Keys help React identify which items changed, were added, or removed in lists.</p>
            <div className="code-block">
              <code>
                {`// Good: <li key={item.id}>{item.text}</li>
// Bad: <li key={index}>{item.text}</li>`}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE DEMO 1: KEYS */}
      <div className="demo-card">
        <h3>🔑 Interactive Demo: Keys & Reconciliation</h3>
        <p className="explanation">
          Watch how React efficiently handles list updates using keys. Check the console to see reconciliation in action!
        </p>
        <KeyDemo />
      </div>

      {/* INTERACTIVE DEMO 2: PERFORMANCE */}
      <div className="demo-card">
        <h3>⚡ Interactive Demo: Update Batching</h3>
        <p className="explanation">
          See how React batches multiple state updates into a single efficient re-render.
        </p>
        <PerformanceDemo />
      </div>

      {/* COMMON PITFALLS */}
      <div className="demo-card warning-card">
        <h3>⚠️ Common Pitfalls</h3>
        <ul className="pitfalls-list">
          <li>
            <strong>Using array index as key:</strong> Can cause bugs when items are reordered
            <div className="code-block bad">
              <code>{`// ❌ Bad: {items.map((item, index) => <div key={index}>...)}`}</code>
            </div>
            <div className="code-block good">
              <code>{`// ✅ Good: {items.map(item => <div key={item.id}>...)}`}</code>
            </div>
          </li>
          <li>
            <strong>Mutating state directly:</strong> React won't detect changes
            <div className="code-block bad">
              <code>{`// ❌ Bad: items.push(newItem)`}</code>
            </div>
            <div className="code-block good">
              <code>{`// ✅ Good: setItems([...items, newItem])`}</code>
            </div>
          </li>
          <li>
            <strong>Creating components inside render:</strong> Causes unnecessary re-mounts
            <div className="code-block bad">
              <code>{`// ❌ Bad: function Parent() { const Child = () => <div/>; return <Child/> }`}</code>
            </div>
          </li>
        </ul>
      </div>

      {/* KEY TAKEAWAYS */}
      <div className="demo-card success-card">
        <h3>✅ Key Takeaways</h3>
        <ol className="takeaways-list">
          <li>Virtual DOM is a JavaScript representation of the real DOM</li>
          <li>React compares Virtual DOM snapshots to find minimal changes (diffing)</li>
          <li>Reconciliation is the process of applying those changes to the real DOM</li>
          <li>This makes React fast because DOM manipulation is expensive</li>
          <li>Always use stable, unique keys for list items</li>
          <li>React batches state updates for performance</li>
          <li>The Virtual DOM is automatically managed - you don't interact with it directly</li>
        </ol>
      </div>

      {/* INTERVIEW QUESTIONS */}
      <div className="demo-card interview-card">
        <h3>💼 Common Interview Questions</h3>
        <div className="interview-qa">
          <div className="qa-item">
            <strong>Q: What is the Virtual DOM?</strong>
            <p>A: A lightweight JavaScript representation of the real DOM that React uses to optimize updates by minimizing direct DOM manipulation.</p>
          </div>
          <div className="qa-item">
            <strong>Q: How does reconciliation work?</strong>
            <p>A: React compares the new Virtual DOM with the previous one (diffing), identifies changes, and updates only the changed parts in the real DOM.</p>
          </div>
          <div className="qa-item">
            <strong>Q: Why are keys important in lists?</strong>
            <p>A: Keys help React identify which items have changed, been added, or removed, enabling efficient list reconciliation without re-rendering unchanged items.</p>
          </div>
          <div className="qa-item">
            <strong>Q: Is Virtual DOM always faster?</strong>
            <p>A: Not always. For simple updates, direct DOM manipulation might be faster. But for complex UIs with frequent updates, Virtual DOM provides better overall performance through batching and minimal updates.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VirtualDOMDemo
