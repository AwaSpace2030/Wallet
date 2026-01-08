export function formatDate(date = new Date(), locale = "en-US") {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
