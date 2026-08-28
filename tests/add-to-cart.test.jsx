import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Home from '../src/pages/Home'

describe('Add to Cart', () => {
  it('adds an item to Your Cart and shows the correct name and price', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0])

    expect(screen.getByRole('heading', { name: /your cart \(1\)/i })).toBeInTheDocument()
    expect(screen.getByText('Bruschetta al Pomodoro - $8.50')).toBeInTheDocument()
    expect(screen.getByText('Total: $8.50')).toBeInTheDocument()
  })
})
