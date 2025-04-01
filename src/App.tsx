import { FC } from 'react'
import './App.css'

export const tasks = [
  {
    id: 1,
    title: 'evict ants from the kitchen',
    tags: ['house', 'rent'],
    status: 'pending',
    priority: 'low',
    difficulty: 'low',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'shower whisteling',
    tags: ['house', 'rent'],
    status: 'pending',
    priority: 'medium',
    difficulty: 'high',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'model content protocol (MCT)',
    tags: ['pc', 'job'],
    status: 'pending',
    priority: 'low',
    difficulty: 'medium',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: 'prep EM interview',
    tags: ['pc', 'job'],
    status: 'pending',
    priority: 'high',
    difficulty: 'medium',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: 'linkedin detailed history',
    tags: ['pc', 'job'],
    status: 'pending',
    priority: 'high',
    difficulty: 'medium',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

const App: FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to React</h1>
      </header>
      <main>
      </main>
    </div>
  )
}

export default App
