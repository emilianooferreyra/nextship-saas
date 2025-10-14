import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  let preferredLocale = "en"; // default

  if (acceptLanguage) {
    // Parse all languages from Accept-Language header
    // Format: "en-US,en;q=0.9,es-AR;q=0.8,es;q=0.7"
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code] = lang.split(";"); // Remove quality values
        const langCode = code.trim().split("-")[0]; // Get base language (es, pt, en)
        return langCode;
      });

    // Check if Spanish or Portuguese is present (anywhere in the list)
    if (languages.includes("es")) {
      preferredLocale = "es";
    } else if (languages.includes("pt")) {
      preferredLocale = "pt";
    }
    // Otherwise keep default "en"
  }

  redirect(`/${preferredLocale}`);
}
