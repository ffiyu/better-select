import { match } from "assert";

function matchCharAt(content: string, char: string, index: number) {
  if (content[index] !== char) {
    return false;
  }
  let slashCount = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (content[i] !== "\\") {
      break;
    }
    slashCount++;
  }
  return slashCount % 2 === 0;
}

export function findCharIndex(content: string, char: string, from = 0) {
  for (let i = from; i < content.length; i++) {
    if (content[i] === char) {
      if (matchCharAt(content, char, i)) {
        return i;
      }
    }
  }
  return -1;
}

export function findCharLastIndex(
  content: string,
  char: string,
  last = content.length
) {
  for (let i = last - 1; i >= 0; i--) {
    if (content[i] === char) {
      if (matchCharAt(content, char, i)) {
        return i;
      }
    }
  }
  return -1;
}
