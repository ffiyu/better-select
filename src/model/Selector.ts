import * as vscode from "vscode";
import {
  BackQuoteMatcher,
  BraceMatcher,
  BracketMatcher,
  DoubleQuoteMatcher,
  Matcher,
  SingleQuoteMatcher,
} from "./Matcher";
import { OffsetRange } from "./OffsetRange";

export class Selector {
  static defaultMatchers = [
    new DoubleQuoteMatcher(),
    new SingleQuoteMatcher(),
    new BackQuoteMatcher(),
    new BraceMatcher(),
    new BracketMatcher(),
  ];

  editor: vscode.TextEditor;
  history: Array<readonly vscode.Selection[]> = [];

  constructor() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      throw new Error("No active editor!");
    }
    this.editor = editor;
    if (this.selections.length) {
      this.history.push(this.selections);
    }
  }

  get selections(): readonly vscode.Selection[] {
    return this.editor.selections;
  }

  set selections(selections: readonly vscode.Selection[]) {
    const preSelections = this.selections;
    this.history.push(preSelections);
    this.editor.selections = selections;
  }

  expand(...matchers: Matcher[]) {
    if (!matchers.length) {
      matchers = Selector.defaultMatchers;
    }
    const doc = this.editor.document;
    const newSelections = this.selections.map((selection) => {
      const content = doc.getText();
      const matchedRanges = matchers
        .map((matcher) =>
          matcher.match(
            OffsetRange.fromEditorRange(this.editor, selection),
            content
          )
        )
        .filter((range) => !!range) as OffsetRange[];

      let newRange: vscode.Range;
      if (matchedRanges.length) {
        newRange = OffsetRange.min(...matchedRanges).toEditorRange(this.editor);
      } else {
        const startPosition = doc.positionAt(0);
        const endPosition = doc.positionAt(content.length);
        newRange = new vscode.Range(startPosition, endPosition);
      }
      const newSelection = new vscode.Selection(newRange.start, newRange.end);
      return newSelection;
    });
    this.selections = newSelections;
  }

  undo() {
    if (this.history.length === 0 || this.selections.length) {
      return;
    }
    this.selections = this.history.pop()!;
  }
}
