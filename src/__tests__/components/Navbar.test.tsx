import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navbar from "@/app/[locale]/(site)/Navbar";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      brandName: "NextShip",
      techStack: "Tech Stack",
      pricing: "Pricing",
      faq: "FAQ",
      docs: "Docs",
      toggleMenu: "Toggle menu",
    };
    return translations[key] || key;
  },
  useLocale: () => "en",
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

describe("Navbar", () => {
  it("renders the brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("NextShip")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Navbar />);
    const desktopLinks = screen.getAllByText("Tech Stack");
    expect(desktopLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pricing").length).toBeGreaterThan(0);
    expect(screen.getAllByText("FAQ").length).toBeGreaterThan(0);
  });

  it("mobile menu is hidden by default", () => {
    render(<Navbar />);
    const mobileMenu = screen.queryByText("Docs");
    // Mobile menu should not be visible initially
    expect(mobileMenu).not.toBeInTheDocument();
  });

  it("toggles mobile menu when button is clicked", () => {
    render(<Navbar />);

    // Find the mobile menu toggle button
    const toggleButton = screen.getByRole("button", { name: /toggle menu/i });
    expect(toggleButton).toBeInTheDocument();

    // Click to open menu
    fireEvent.click(toggleButton);

    // Now Docs link should be visible (only in mobile menu)
    expect(screen.getByText("Docs")).toBeInTheDocument();

    // Click to close menu
    fireEvent.click(toggleButton);

    // Menu should be hidden again
    expect(screen.queryByText("Docs")).not.toBeInTheDocument();
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<Navbar />);

    // Open mobile menu
    const toggleButton = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggleButton);

    // Verify menu is open
    expect(screen.getByText("Docs")).toBeInTheDocument();

    // Click a link in the mobile menu
    const mobileLink = screen.getByText("Docs");
    fireEvent.click(mobileLink);

    // Menu should close
    expect(screen.queryByText("Docs")).not.toBeInTheDocument();
  });

  it("renders correct locale in brand link", () => {
    render(<Navbar />);
    const brandLink = screen.getByText("NextShip").closest("a");
    expect(brandLink).toHaveAttribute("href", "/en");
  });
});
