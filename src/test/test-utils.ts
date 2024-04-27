export function selectionString(content: string, from: number, to: number) {
  if (from < to) {
    return `${content.substring(0, from)}|${content.substring(
      from,
      to
    )}|${content.substring(to)}`;
  }

  if (from === to) {
    return `${content.substring(0, from)}|${content.substring(from)}`;
  }

  throw new Error("Invalid selection range: from must less than to");
}

export function parseSelectionString(str: string) {
  const parts = str.split("|");
  const content = parts.join("");
  let from: number;
  let to: number;
  if (parts.length === 2) {
    from = to = parts[1].length;
  } else if (parts.length === 3) {
    from = parts[0].length;
    to = from + parts[1].length;
  } else {
    throw new Error("Invalid selection string");
  }
  return { content, from, to };
}
