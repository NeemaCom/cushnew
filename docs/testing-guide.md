# Testing Guide

This guide outlines best practices for testing components in our global payment platform project using React Testing Library.

## Testing Philosophy

We follow the testing philosophy of React Testing Library, which encourages testing components in a way that resembles how users interact with them, rather than testing implementation details.

Key principles:
- Test behavior, not implementation
- Focus on user interactions
- Write maintainable tests

## Test Types

### 1. Component Tests

Test individual UI components in isolation:
- Rendering correctly with different props
- User interactions (clicks, typing, etc.)
- State changes
- Accessibility

### 2. Integration Tests

Test how components work together:
- Form submissions
- Data flow between components
- Complex user workflows

### 3. Unit Tests

Test pure functions and utilities:
- Data transformations
- Calculations
- Helper functions

## Best Practices

### Queries

Use queries in this order of preference:
1. Accessible queries: `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`
2. Test ID queries: `getByTestId` (use only when necessary)

### User Interactions

Use `userEvent` instead of `fireEvent` for more realistic user interactions:

\`\`\`tsx
const { user } = render(<Component />);
await user.click(button);
await user.type(input, 'text');
\`\`\`

### Async Testing

For asynchronous operations:
- Use `waitFor` to wait for elements to appear/disappear
- Use `findBy` queries which automatically wait for elements

### Mocking

- Mock external dependencies
- Use MSW for API mocking
- Keep mocks as close to real behavior as possible

## Example Test Structure

\`\`\`tsx
describe('ComponentName', () => {
  // Setup/teardown if needed
  beforeEach(() => {
    // Setup code
  });

  afterEach(() => {
    // Cleanup code
  });

  it('should render correctly', () => {
    // Test rendering
  });

  it('should handle user interaction', async () => {
    // Test user interaction
  });

  it('should handle errors', async () => {
    // Test error states
  });
});
\`\`\`

## Running Tests

- `npm test`: Run all tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report
- `npm run test:ui`: Run only component tests
\`\`\`

Let's update the ESLint configuration to include testing plugins:
