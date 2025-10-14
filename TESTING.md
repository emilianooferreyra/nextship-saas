# Testing Guide

NextShip comes with Vitest pre-configured for testing your application.

## Running Tests

```bash
# Run tests in watch mode (default)
pnpm test

# Run tests once
pnpm test run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Test Structure

Tests are located in the `src/__tests__` directory:

```
src/__tests__/
├── example.test.ts          # Example test suite
├── config.test.ts           # Configuration tests
└── lib/
    └── resend.test.ts       # Email service tests
```

## Writing Tests

### Basic Test Example

```typescript
import { describe, it, expect } from "vitest";

describe("My Feature", () => {
  it("should work correctly", () => {
    expect(1 + 1).toBe(2);
  });
});
```

### Testing React Components

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Mocking

Vitest provides powerful mocking capabilities:

```typescript
import { vi } from "vitest";

// Mock a module
vi.mock("resend", () => ({
  Resend: vi.fn(),
}));

// Mock a function
const mockFn = vi.fn();
mockFn.mockReturnValue("mocked value");
```

## Configuration

- **vitest.config.ts**: Main Vitest configuration
- **vitest.setup.ts**: Test setup file with global mocks and utilities

## Best Practices

1. **Keep tests isolated**: Each test should be independent
2. **Use descriptive names**: Test names should clearly describe what they test
3. **Mock external dependencies**: Don't make real API calls in tests
4. **Test behavior, not implementation**: Focus on what the code does, not how
5. **Aim for high coverage**: But don't sacrifice quality for 100% coverage

## Available Matchers

Vitest includes all standard Jest matchers plus custom ones from `@testing-library/jest-dom`:

- `expect(element).toBeInTheDocument()`
- `expect(element).toHaveTextContent("text")`
- `expect(element).toBeVisible()`
- And many more...

## Debugging Tests

To debug a test:

1. Add `debugger` statement in your test
2. Run tests with Node inspector: `node --inspect-brk node_modules/.bin/vitest --run`
3. Use VSCode debugging with launch configuration

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library Documentation](https://testing-library.com)
- [Vitest UI](https://vitest.dev/guide/ui.html)
