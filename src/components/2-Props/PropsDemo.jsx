import './PropsDemo.css'

/**
 * CHILD COMPONENTS - These receive props from parent
 */

// Simple functional component receiving props
function WelcomeCard({ name, role, isActive }) {
  return (
    <div className={`welcome-card ${isActive ? 'active' : 'inactive'}`}>
      <h4>Welcome, {name}!</h4>
      <p>Role: {role}</p>
      <span className="status">{isActive ? '🟢 Active' : '🔴 Inactive'}</span>
    </div>
  )
}

// Component with destructured props
function UserProfile({ user }) {3
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} className="avatar" />
      <div className="user-details">
        <h4>{user.name}</h4>
        <p>{user.bio}</p>
        <p className="email">{user.email}</p>
      </div>
    </div>
  )
}

// Component with default props
function Button({ text = "Click Me", variant = "primary", onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {text}
    </button>
  )
}

// Component demonstrating props.children
function Card({ title, children, highlighted = false }) {
  return (
    <div className={`card ${highlighted ? 'highlighted' : ''}`}>
      <div className="card-header">
        <h4>{title}</h4>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

// Component with multiple prop types
function ProductCard({ product, onAddToCart, discount = 0 }) {
  const finalPrice = product.price - (product.price * discount / 100)

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h4>{product.name}</h4>
      <p className="description">{product.description}</p>
      <div className="price-section">
        {discount > 0 && (
          <span className="original-price">${product.price}</span>
        )}
        <span className="final-price">${finalPrice.toFixed(2)}</span>
        {discount > 0 && (
          <span className="discount-badge">{discount}% OFF</span>
        )}
      </div>
      <button onClick={() => onAddToCart(product)} className="add-to-cart">
        Add to Cart
      </button>
    </div>
  )
}

/**
 * PARENT COMPONENT - Demonstrates passing props to children
 */
function PropsDemo() {
  // Sample data to pass as props
  const users = [
    { id: 1, name: "Alice Johnson", role: "Frontend Developer", isActive: true },
    { id: 2, name: "Bob Smith", role: "Backend Developer", isActive: false },
    { id: 3, name: "Carol White", role: "Full Stack Developer", isActive: true }
  ]

  const userProfile = {
    name: "Emma Wilson",
    bio: "Passionate React developer who loves building user interfaces",
    email: "emma@example.com",
    avatar: "https://placehold.co/80x80/d32f2f/white?text=EW"
  }

  const products = [
    {
      id: 1,
      name: "React Handbook",
      description: "Complete guide to mastering React",
      price: 49.99,
      image: "https://placehold.co/150x150/d32f2f/white?text=React"
    },
    {
      id: 2,
      name: "JavaScript Course",
      description: "Modern JavaScript from basics to advanced",
      price: 79.99,
      image: "https://placehold.co/150x150/d32f2f/white?text=JS"
    }
  ]

  // Function to pass as prop
  const handleAddToCart = (product) => {
    alert(`Added "${product.name}" to cart!`)
    console.log('Product added:', product)
  }

  const handleButtonClick = (message) => {
    alert(message)
  }

  return (
    <div className="props-demo">
      {/* 1. BASIC PROPS */}
      <div className="demo-section">
        <h3>1. Basic Props - Passing Data to Components</h3>
        <p className="explanation">
          Props allow you to pass data from parent to child components. They are <strong>read-only</strong>.
        </p>
        <div className="cards-grid">
          {users.map(user => (
            <WelcomeCard
              key={user.id}
              name={user.name}
              role={user.role}
              isActive={user.isActive}
            />
          ))}
        </div>
      </div>

      {/* 2. PROPS WITH OBJECTS */}
      <div className="demo-section">
        <h3>2. Passing Objects as Props</h3>
        <p className="explanation">
          You can pass entire objects as a single prop for complex data structures.
        </p>
        <UserProfile user={userProfile} />
      </div>

      {/* 3. DEFAULT PROPS */}
      <div className="demo-section">
        <h3>3. Default Props</h3>
        <p className="explanation">
          Components can have default values for props if they're not provided.
        </p>
        <div className="button-group">
          <Button text="Primary Button" variant="primary" onClick={() => handleButtonClick('Primary clicked!')} />
          <Button text="Secondary Button" variant="secondary" onClick={() => handleButtonClick('Secondary clicked!')} />
          <Button onClick={() => handleButtonClick('Default clicked!')} /> {/* Uses default text */}
        </div>
      </div>

      {/* 4. PROPS.CHILDREN */}
      <div className="demo-section">
        <h3>4. Props.children - Composition</h3>
        <p className="explanation">
          The special <code>children</code> prop allows you to nest content inside components.
        </p>
        <Card title="Regular Card">
          <p>This content is passed as children prop!</p>
          <p>You can pass any JSX here.</p>
        </Card>

        <Card title="Highlighted Card" highlighted={true}>
          <p>This card is highlighted using a prop.</p>
          <ul>
            <li>Children can be any valid JSX</li>
            <li>Lists, text, other components</li>
            <li>Makes components very flexible!</li>
          </ul>
        </Card>
      </div>

      {/* 5. FUNCTION PROPS (Callbacks) */}
      <div className="demo-section">
        <h3>5. Function Props - Passing Callbacks</h3>
        <p className="explanation">
          Props can be functions, allowing child components to communicate with parents.
        </p>
        <div className="products-grid">
          <ProductCard
            product={products[0]}
            onAddToCart={handleAddToCart}
            discount={40}
          />
          <ProductCard
            product={products[1]}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* 6. PROPS ARE READ-ONLY */}
      <div className="demo-section info-box">
        <h3>⚠️ Important: Props are Read-Only!</h3>
        <ul>
          <li>Props are <strong>immutable</strong> - components cannot modify their own props</li>
          <li>All React components must act like pure functions with respect to their props</li>
          <li>To change data, use <strong>State</strong> (covered in the next section)</li>
          <li>Props flow <strong>one way</strong>: from parent to child (unidirectional data flow)</li>
          <li>Child components can call functions passed via props to communicate changes back to parent</li>
        </ul>
      </div>
    </div>
  )
}

export default PropsDemo
