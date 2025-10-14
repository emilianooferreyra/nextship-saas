export type MailgunConfig = {
  subdomain: string;
  fromNoReply: string;
  fromAdmin: string;
  supportEmail?: string;
  forwardRepliesTo?: string;
};
