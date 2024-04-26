import * as vscode from "vscode";

import { Selection } from "vscode";
import { OffsetRange } from "./OffsetRange";

export abstract class Matcher {
  abstract match(range: OffsetRange, content: string): OffsetRange;
}

class CharMatcher extends Matcher {
  private charPair: [string, string];
  constructor(charPair: [string, string]) {
    super();

    this.charPair = charPair;
  }
  match(range: OffsetRange, content: string): OffsetRange {
    const { from, to } = range;
    const [char1, char2] = this.charPair;
    const l = content.lastIndexOf(char1, from);
    const r = content.indexOf(char2, to);
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
