import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the Resend constructor and emails.send method
const mockSend = vi.fn().mockResolvedValue({
  id: "test-email-id",
  from: "test@example.com",
  to: ["recipient@example.com"],
});

vi.mock("resend", () => {
  return {
    Resend: class MockResend {
      emails = {
        send: mockSend,
      };
    },
  };
});

describe("Resend Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_123";
  });

  it("should export sendEmail function", async () => {
    const { sendEmail } = await import("@/lib/resend");
    expect(sendEmail).toBeDefined();
    expect(typeof sendEmail).toBe("function");
  });

  it("should call resend.emails.send with correct parameters", async () => {
    const { sendEmail } = await import("@/lib/resend");

    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test Subject",
      html: "<p>Test content</p>",
      replyTo: "reply@example.com",
    });

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["test@example.com"],
        subject: "Test Subject",
        html: "<p>Test content</p>",
        reply_to: "reply@example.com",
      })
    );
    expect(result).toEqual({
      id: "test-email-id",
      from: "test@example.com",
      to: ["recipient@example.com"],
    });
  });
});
