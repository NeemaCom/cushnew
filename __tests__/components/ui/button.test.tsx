"use client"

import { render, screen } from "../../utils/test-utils"
import { Button } from "@/components/ui/button"
import { jest } from "@jest/globals"

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
    expect(button).toHaveClass("inline-flex")
  })

  it("renders as disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>)

    const button = screen.getByRole("button", { name: /disabled button/i })
    expect(button).toBeDisabled()
  })

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Destructive Button</Button>)

    const button = screen.getByRole("button", { name: /destructive button/i })
    expect(button).toHaveClass("bg-destructive")
  })

  it("applies size classes correctly", () => {
    render(<Button size="sm">Small Button</Button>)

    const button = screen.getByRole("button", { name: /small button/i })
    expect(button).toHaveClass("h-9")
  })

  it("calls onClick handler when clicked", async () => {
    const handleClick = jest.fn()
    const { user } = render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
