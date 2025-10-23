import './JSXDemo.css'

/**
 * JSX Demo Component
 * Demonstrates core JSX concepts including:
 * - HTML-like syntax in JavaScript
 * - JavaScript expressions in curly braces {}
 * - Key differences from HTML (className, self-closing tags, etc.)
 */
function JSXDemo() {
  // JavaScript variables that will be embedded in JSX
  const name = "React Developer"
  const currentYear = new Date().getFullYear()
  const technologies = ['React', 'JavaScript', 'JSX', 'Virtual DOM']

  // JavaScript expressions and calculations
  const x = 10
  const y = 20

  // Objects (note: cannot directly render objects in JSX)
  const userInfo = {
    firstName: "John",
    lastName: "Doe",
    age: 25
  }

  // Functions that can be called in JSX
  const formatName = (first, last) => `${first} ${last}`

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="jsx-demo">
      {/* 1. BASIC JSX - HTML-like syntax */}
      <div className="demo-card">
        <h3>Basic JSX Syntax</h3>
        <p>This looks like HTML, but it's actually JSX!</p>
        <p>JSX gets compiled to JavaScript: React.createElement() calls</p>
      </div>

      {/* 2. EMBEDDING JAVASCRIPT EXPRESSIONS */}
      <div className="demo-card">
        <h3>Embedding JavaScript Expressions {'{}'}</h3>
        <ul>
          <li>Variable: Hello, {name}!</li>
          <li>Expression: {x} + {y} = {x + y}</li>
          <li>Function call: {getGreeting()}!</li>
          <li>Current year: {currentYear}</li>
          <li>Ternary operator: {userInfo.age >= 18 ? 'Adult' : 'Minor'}</li>
          <li>Template literal: {`${formatName(userInfo.firstName, userInfo.lastName)} is ${userInfo.age} years old`}</li>
        </ul>
      </div>

      {/* 3. KEY DIFFERENCES FROM HTML */}
      <div className="demo-card highlight">
        <h3>JSX vs HTML - Important Differences</h3>

        {/* className instead of class */}
        <div className="difference-item">
          <strong>className</strong> instead of "class":
          <div className="example-box">I use className, not class!</div>
        </div>

        {/* Self-closing tags must have / */}
        <div className="difference-item">
          <strong>Self-closing tags</strong> must end with /&gt;:
          <br />
          <img src="https://placehold.co/100x100/1976d2/white?text=JSX" alt="Example" />
          <input type="text" placeholder="Self-closing input" />
        </div>

        {/* camelCase for attributes */}
        <div className="difference-item">
          <strong>camelCase</strong> for multi-word attributes:
          <button onClick={() => alert('onClick, not onclick!')}>
            onClick (not onclick)
          </button>
        </div>

        {/* Style as object */}
        <div className="difference-item">
          <strong>style</strong> attribute takes an object:
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '10px'
          }}>
            Inline styles use camelCase and object syntax!
          </div>
        </div>
      </div>

      {/* 4. RENDERING LISTS */}
      <div className="demo-card">
        <h3>Rendering Lists with map()</h3>
        <ul className="tech-list">
          {technologies.map((tech, index) => (
            <li key={index} className="tech-item">
              {index + 1}. {tech}
            </li>
          ))}
        </ul>
        <p className="note">Note: Each item needs a unique 'key' prop</p>
      </div>

      {/* 5. CONDITIONAL RENDERING */}
      <div className="demo-card">
        <h3>Conditional Rendering</h3>

        {/* Using ternary operator */}
        <div>
          {userInfo.age >= 18 ? (
            <p className="success">✓ User is an adult</p>
          ) : (
            <p className="warning">✗ User is a minor</p>
          )}
        </div>

        {/* Using && operator */}
        <div>
          {technologies.length > 0 && (
            <p>You're learning {technologies.length} technologies!</p>
          )}
        </div>
      </div>

      {/* 6. JSX MUST RETURN A SINGLE ROOT ELEMENT */}
      <div className="demo-card info">
        <h3>Important JSX Rules</h3>
        <ol>
          <li>Must return a single root element (or use Fragment {'<>...</>'})</li>
          <li>All tags must be closed (even self-closing ones)</li>
          <li>JSX expressions must have one parent element</li>
          <li>Cannot render objects directly (use properties instead)</li>
          <li>Comments use {'{/* comment */'} syntax</li>
        </ol>
      </div>
    </div>
  )
}

export default JSXDemo
