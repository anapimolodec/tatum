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

export function handleOptionChange(
  newValues,
  selected,
  setSelected,
  uniqueValues
) {
  let ALL = "ALL";
  const clicked =
    newValues.length > selected.length
      ? newValues.find((role) => !selected.includes(role))
      : selected.find((role) => !newValues.includes(role));

  if (clicked === ALL) {
    if (selected.includes(ALL)) {
      return;
    } else {
      setSelected([ALL, ...uniqueValues]);
      return;
    }
  }

  if (clicked !== ALL) {
    setSelected([clicked]);
  }
}
