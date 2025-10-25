import { describe, expect, it } from "vitest";
import { config } from "@/config";

describe("Config", () => {
  it("should have required configuration properties", () => {
    expect(config).toBeDefined();
    expect(config.appName).toBeDefined();
    expect(config.domainName).toBeDefined();
    expect(config.resend).toBeDefined();
  });

  it("should have valid app name", () => {
    expect(config.appName).toBe("NextShip");
  });

  it("should have resend email configuration", () => {
    expect(config.resend.fromNoReply).toBeDefined();
    expect(config.resend.fromAdmin).toBeDefined();
    expect(config.resend.supportEmail).toBeDefined();
    expect(config.resend.forwardRepliesTo).toBeDefined();
  });

  it("should have valid email format in resend config", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Extract email from "Name <email@domain.com>" format
    const extractEmail = (str: string) => {
      const match = str.match(/<(.+)>/);
      return match ? match[1] : str;
    };

    const fromNoReplyEmail = extractEmail(config.resend.fromNoReply);
    const fromAdminEmail = extractEmail(config.resend.fromAdmin);

    expect(emailRegex.test(fromNoReplyEmail)).toBe(true);
    expect(emailRegex.test(fromAdminEmail)).toBe(true);
  });
});
