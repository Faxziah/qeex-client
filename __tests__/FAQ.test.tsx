import { render, screen, fireEvent } from '@testing-library/react'
import FAQ from '../src/app/components/FAQ'

describe('FAQ', () => {
  it('renders FAQ section and toggles item on click', () => {
    render(<FAQ />)

    // Check if the FAQ heading is present by targeting the h2 element
    expect(screen.getByRole('heading', { name: 'FAQ', level: 2 })).toBeInTheDocument()

    // Get all question buttons
    const questionButtons = screen.getAllByRole('button')
    expect(questionButtons.length).toBeGreaterThan(0)

    // Click the first question to open it
    fireEvent.click(questionButtons[0])

    // Check if the answer of the first question is visible
    const firstAnswer = screen.getByText('Стоимость складывается из комиссии сервиса в размере $1 (в ETH) и газа сети (эта сумму получает сеть, сервис ее не получает)')
    expect(firstAnswer).toBeVisible()
    expect(firstAnswer.parentElement?.parentElement).not.toHaveClass('max-h-0') // Check that it's not hidden by class

    // Click the first question again to close it
    fireEvent.click(questionButtons[0])

    // Check if the answer of the first question is no longer visible by checking its grand-parent's class
    expect(firstAnswer.parentElement?.parentElement).toHaveClass('max-h-0')
  })

  it('handles multiple FAQ items correctly', () => {
    render(<FAQ />)

    const questionButtons = screen.getAllByRole('button')

    // Open the first item
    fireEvent.click(questionButtons[0])
    const firstAnswer = screen.getByText('Стоимость складывается из комиссии сервиса в размере $1 (в ETH) и газа сети (эта сумму получает сеть, сервис ее не получает)')
    expect(firstAnswer).toBeVisible()
    expect(firstAnswer.parentElement?.parentElement).not.toHaveClass('max-h-0')

    // Open the second item
    fireEvent.click(questionButtons[1])
    const secondAnswer = screen.getByText('Выберите тип контракта, заполните необходимые поля, подтвердите транзакцию в кошельке и дождитесь подтверждения в блокчейне.')
    expect(secondAnswer).toBeVisible()
    expect(secondAnswer.parentElement?.parentElement).not.toHaveClass('max-h-0')

    // Close the first item, second should remain open
    fireEvent.click(questionButtons[0])
    expect(firstAnswer.parentElement?.parentElement).toHaveClass('max-h-0') // First answer should be hidden
    expect(secondAnswer).toBeVisible() // Second answer should still be visible
    expect(secondAnswer.parentElement?.parentElement).not.toHaveClass('max-h-0')
  })
}) 