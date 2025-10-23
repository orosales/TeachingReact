# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **React Fundamentals Learning Application** built with React 19 and Vite. It's an interactive educational tool designed to teach core React concepts through live, hands-on examples.

## Commands

### Development
```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Installation
```bash
# Install dependencies (required after cloning)
npm install
```

## Architecture & Structure

### Component Organization

The application is organized by concept, with each fundamental topic in its own numbered directory:

```
src/
├── components/
│   ├── 1-JSX/           # JSX fundamentals and syntax
│   ├── 2-Props/         # Props demonstration and patterns
│   ├── 3-State/         # State management with useState
│   └── 4-VirtualDOM/    # Virtual DOM and reconciliation
├── App.jsx              # Main component that orchestrates all demos
└── App.css              # Global styles and layout
```

**Key Design Pattern**: Each concept folder contains:
- A main component file (e.g., `JSXDemo.jsx`)
- A dedicated CSS file (e.g., `JSXDemo.css`)
- Self-contained, educational code with detailed comments

### Educational Philosophy

This codebase prioritizes **learning and clarity** over production patterns:

1. **Verbose Comments**: Components include detailed explanations of concepts
2. **Multiple Examples**: Each concept shows various use cases
3. **Console Logging**: Strategic console.logs demonstrate React lifecycle and updates
4. **Visual Feedback**: Interactive demos with immediate visual responses
5. **Interview Prep**: Includes common interview questions and answers

### Component Architecture

**App.jsx** serves as the orchestrator:
- Imports all four demo components
- Provides consistent section structure
- No state management (demos handle their own state)
- Purely presentational wrapper

**Demo Components** are self-contained:
- Manage their own state
- Include multiple sub-components to demonstrate patterns
- Show both correct and incorrect approaches
- Provide interactive examples with real-time feedback

### Important Patterns Used

#### 1. JSX Demo (`components/1-JSX/JSXDemo.jsx`)
- Demonstrates embedding JavaScript expressions with `{}`
- Shows JSX vs HTML differences (className, self-closing tags, camelCase)
- Examples of conditional rendering and list rendering
- No state - purely demonstrates JSX syntax

#### 2. Props Demo (`components/2-Props/PropsDemo.jsx`)
- Parent-child component relationship examples
- Shows destructuring props vs accessing via object
- Demonstrates `props.children` for composition
- Illustrates function props (callbacks) for child-to-parent communication
- Emphasizes props immutability

#### 3. State Demo (`components/3-State/StateDemo.jsx`)
- Comprehensive `useState` examples with different data types
- Shows correct state update patterns (immutability)
- Demonstrates functional updates: `setState(prev => ...)`
- Object and array state management with spread operator
- Interactive examples: counter, todo list, color picker

#### 4. Virtual DOM Demo (`components/4-VirtualDOM/VirtualDOMDemo.jsx`)
- Explains reconciliation algorithm conceptually
- Interactive demos with console logging to show efficiency
- Demonstrates importance of keys in lists
- Shows update batching with performance metrics
- Includes interview Q&A section

### State Management Philosophy

- All state is **component-local** (no global state)
- Each demo component manages its own state independently
- Demonstrates React 19 concurrent features through automatic batching
- Shows both basic `setCount(count + 1)` and functional `setCount(prev => prev + 1)` patterns

### Styling Approach

- **Scoped CSS**: Each component has its own CSS file
- **No CSS-in-JS**: Uses traditional CSS for simplicity
- **Gradient Backgrounds**: Visual hierarchy through color
- **Responsive Design**: Mobile-friendly with media queries
- **Color Coding**: Each section has a distinct color scheme:
  - JSX: Blue (`#1976d2`)
  - Props: Red (`#d32f2f`)
  - State: Purple (`#7b1fa2`)
  - Virtual DOM: Teal (`#00897b`)

## Key React Concepts Covered

### 1. JSX
- Writing JSX syntax
- Embedding expressions with `{}`
- JSX vs HTML differences
- Conditional rendering patterns
- List rendering with `.map()`

### 2. Props
- Passing data parent → child
- Props are read-only
- Destructuring props
- Default props
- `children` prop for composition
- Function props (callbacks)

### 3. State
- `useState` hook
- State triggers re-renders
- State is asynchronous
- Immutability (never mutate state directly)
- Functional updates
- Managing objects and arrays in state

### 4. Virtual DOM
- What is the Virtual DOM
- Reconciliation process (diffing)
- Why React is efficient
- Importance of keys in lists
- Update batching

## Development Notes

### When Adding New Concepts

1. Create new numbered directory: `src/components/5-NewConcept/`
2. Create component file: `NewConceptDemo.jsx`
3. Create CSS file: `NewConceptDemo.css`
4. Import and add to `App.jsx`
5. Follow the established pattern:
   - Detailed comments explaining concepts
   - Multiple sub-examples
   - Interactive demos where possible
   - Include common pitfalls section
   - Add console.logs for learning

### Code Style

- Use **functional components** exclusively (modern React)
- Use **arrow functions** for event handlers
- Destructure props in function parameters
- Use `const` for all variables (no `let` unless necessary)
- Include console.logs to demonstrate React behavior
- Comment liberally for educational purposes

### Testing the Application

Since this is a learning tool, testing is primarily manual:
1. Run `npm run dev`
2. Open browser DevTools console
3. Interact with each demo
4. Observe console logs showing React behavior
5. Verify visual feedback matches expected behavior

### React 19 Features Used

- **Automatic Batching**: Multiple state updates are batched automatically
- **Improved DevTools Integration**: Better component names and debugging
- **Modern Hook Patterns**: All components use hooks (no class components)

## Common Issues

### Port Already in Use
If Vite's default port (5173) is occupied:
```bash
npm run dev -- --port 3000
```

### Hot Module Replacement Not Working
- Ensure you're not renaming components during development
- Check that component names match file names
- Restart dev server if issues persist

## Learning Path

Recommended order for studying this codebase:

1. **Start with JSX Demo** - Foundation of React syntax
2. **Move to Props Demo** - Understanding data flow
3. **Study State Demo** - Managing dynamic data
4. **Explore Virtual DOM Demo** - Understanding React internals

Each section builds on the previous, creating a complete learning journey from syntax to advanced concepts.
