export const config = {
  appName: "NextShip",
  domainName: "https://nextship-saas.vercel.app", // Update this to your domain
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `NextShip <noreply@yourdomain.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `NextShip Team <admin@yourdomain.com>`,
    // Email shown to customer if need support. Leave empty if not needed
    supportEmail: "support@yourdomain.com",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost)
    forwardRepliesTo: "support@yourdomain.com",
  },
};
