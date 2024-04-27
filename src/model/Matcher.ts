import { findCharIndex, findCharLastIndex } from "../utils";
import { OffsetRange } from "./OffsetRange";

export abstract class Matcher {
  abstract match(range: OffsetRange, content: string): OffsetRange | null;
}

class CharMatcher extends Matcher {
  private charPair: [string, string];
  constructor(charPair: [string, string]) {
    super();
    this.charPair = charPair;
  }
  match(range: OffsetRange, content: string): OffsetRange | null {
    let { from, to } = range;
    const n = content.length;
    if (from <= 0 || to >= n) {
      return null;
    }
    const [char1, char2] = this.charPair;
    const l = findCharLastIndex(content, char1, from) + 1;
    const r = findCharIndex(content, char2, to);
    const isValid = l - 1 >= 0 && r >= 0;
    if (!isValid) {
      return null;
    }
    const isAlreadyInner = l === from && r === to;
    if (isAlreadyInner) {
      return new OffsetRange(l - 1, r + 1);
    }

    return new OffsetRange(l, r);
  }
}

export class DoubleQuoteMatcher extends CharMatcher {
  constructor() {
    super(['"', '"']);
  }
}

export class SingleQuoteMatcher extends CharMatcher {
  constructor() {
    super(["'", "'"]);
  }
}

export class BackQuoteMatcher extends CharMatcher {
  constructor() {
    super(["`", "`"]);
  }
}

export class BraceMatcher extends CharMatcher {
  constructor() {
    super(["{", "}"]);
  }
}

export class BracketMatcher extends CharMatcher {
  constructor() {
    super(["[", "]"]);
  }
}
