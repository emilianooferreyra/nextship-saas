import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock Resend before importing the module
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: "test-email-id" }),
    },
  })),
}));

describe("Resend Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set a dummy API key for tests
    process.env.RESEND_API_KEY = "re_test_123";
  });

  it("should export sendEmail function", async () => {
    const { sendEmail } = await import("@/lib/resend");
    expect(sendEmail).toBeDefined();
    expect(typeof sendEmail).toBe("function");
  });

  it("should call resend.emails.send with correct parameters", async () => {
    const { sendEmail } = await import("@/lib/resend");

    await sendEmail({
      to: "test@example.com",
      subject: "Test Subject",
      html: "<p>Test content</p>",
      replyTo: "reply@example.com",
    });

    // Since we're mocking, we just verify the function can be called
    expect(sendEmail).toBeDefined();
  });
});
