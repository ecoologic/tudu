import { FC } from 'react'
import './App.css'

type TaskStatus = 'pending' | 'progressing' | 'completed'
type TaskLevel = 'low' | 'medium' | 'high'

interface Task {
  id: number
  title: string
  tags: string[]
  status: TaskStatus
  priority: TaskLevel
  difficulty: TaskLevel
  createdAt: Date
  updatedAt: Date
}

// TODO: don't fail the build on pety errors
const tasks = [
  {
    id: 1,
    title: 'evict ants from the kitchen',
    tags: ['house', 'rent'],
    status: 'pending' as const,
    priority: 'low' as const,
    difficulty: 'low' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'shower whisteling',
    tags: ['house', 'rent'],
    status: 'pending' as const,
    priority: 'medium' as const,
    difficulty: 'high' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'model content protocol (MCT)',
    tags: ['pc', 'job'],
    status: 'pending' as const,
    priority: 'low' as const,
    difficulty: 'medium' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: 'prep EM interview',
    tags: ['pc', 'job'],
    status: 'pending' as const,
    priority: 'high' as const,
    difficulty: 'medium' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: 'linkedin detailed history',
    tags: ['pc', 'job'],
    status: 'pending' as const,
    priority: 'high' as const,
    difficulty: 'medium' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

const TaskList: FC<{ tasks: Task[] }> = ({ tasks }) => {
  return <ul>
    {tasks.map((task) => (
      <li key={task.id}>{task.title}</li>
    ))}
  </ul>
}

const App: FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to React</h1>
      </header>
      <main>
        <TaskList tasks={tasks} />
      </main>
    </div>
  )
}

export default App
