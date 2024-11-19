export function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

export function capitalize(str) {
  return str
    .split(" ")
    .map(
      (word) =>
        String(word).charAt(0).toUpperCase() +
        String(word).slice(1).toLowerCase()
    )
    .join(" ");
}
