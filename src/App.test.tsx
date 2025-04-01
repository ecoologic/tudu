import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the welcome message', () => {
    render(<App />)
    expect(screen.getByText('Welcome to React')).toBeInTheDocument()
  })

  it('renders the main content', () => {
    render(<App />)
    expect(screen.getByText(/Start editing/i)).toBeInTheDocument()
  })
}) 
