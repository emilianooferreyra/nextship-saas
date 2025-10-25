import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FAQ from "@/app/[locale]/(site)/Faq";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => {
    const mockTranslations: Record<string, any> = {
      badge: "FAQ",
      heading: "Frequently Asked Questions",
      subheading: "Have a question? Reach out on",
      or: "or",
      items: [
        {
          question: "What is NextShip?",
          answer: "NextShip is a Next.js SaaS boilerplate.",
        },
        {
          question: "How do I get started?",
          answer: "Clone the repo and follow the setup instructions.",
        },
        {
          question: "Is it free?",
          answer: "Yes, it's open source under MIT license.",
        },
      ],
    };

    const t = (key: string) => mockTranslations[key];
    t.raw = (key: string) => mockTranslations[key];
    return t;
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("FAQ Component", () => {
  it("renders the FAQ heading", () => {
    render(<FAQ />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("renders all FAQ items", () => {
    render(<FAQ />);
    expect(screen.getByText("What is NextShip?")).toBeInTheDocument();
    expect(screen.getByText("How do I get started?")).toBeInTheDocument();
    expect(screen.getByText("Is it free?")).toBeInTheDocument();
  });

  it("answers are hidden by default", () => {
    render(<FAQ />);
    // Answer exists in DOM but is hidden with grid-rows-[0fr]
    const answer = screen.getByText("NextShip is a Next.js SaaS boilerplate.");
    const container = answer.closest(".grid");
    expect(container).toHaveClass("grid-rows-[0fr]");
  });

  it("toggles answer visibility when question is clicked", () => {
    render(<FAQ />);

    const answer = screen.getByText("NextShip is a Next.js SaaS boilerplate.");
    const container = answer.closest(".grid");

    // Initially hidden
    expect(container).toHaveClass("grid-rows-[0fr]");

    // Click to open
    const firstQuestion = screen.getByText("What is NextShip?");
    fireEvent.click(firstQuestion);

    // Should now be visible
    expect(container).toHaveClass("grid-rows-[1fr]");

    // Click again to close
    fireEvent.click(firstQuestion);

    // Should be hidden again
    expect(container).toHaveClass("grid-rows-[0fr]");
  });

  it("closes previous answer when opening a new one", () => {
    render(<FAQ />);

    const firstAnswer = screen.getByText(
      "NextShip is a Next.js SaaS boilerplate."
    );
    const firstContainer = firstAnswer.closest(".grid");

    const secondAnswer = screen.getByText(
      "Clone the repo and follow the setup instructions."
    );
    const secondContainer = secondAnswer.closest(".grid");

    // Open first question
    const firstQuestion = screen.getByText("What is NextShip?");
    fireEvent.click(firstQuestion);
    expect(firstContainer).toHaveClass("grid-rows-[1fr]");

    // Open second question
    const secondQuestion = screen.getByText("How do I get started?");
    fireEvent.click(secondQuestion);

    // First answer should be hidden
    expect(firstContainer).toHaveClass("grid-rows-[0fr]");

    // Second answer should be visible
    expect(secondContainer).toHaveClass("grid-rows-[1fr]");
  });

  it("renders contact links", () => {
    render(<FAQ />);

    // Text is split across multiple elements, use partial match
    expect(screen.getByText(/Have a question/)).toBeInTheDocument();
    expect(screen.getByText(/Reach out on/)).toBeInTheDocument();

    // Check for email link
    const emailLinks = screen.getAllByRole("link");
    const emailLink = emailLinks.find(
      (link) => link.getAttribute("href") === "mailto:contact@example.com"
    );
    expect(emailLink).toBeInTheDocument();
  });
});
