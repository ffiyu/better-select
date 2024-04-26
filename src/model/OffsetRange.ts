import { Range, TextEditor } from "vscode";

export class OffsetRange {
  // TS syntax refer to https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(public from: number, public to: number) {}

  static fromEditorRange(editor: TextEditor, range: Range) {
    const { start, end } = range;
    const from = editor.document.offsetAt(start);
    const to = editor.document.offsetAt(end);
    return new OffsetRange(from, to);
  }

  static less(r1: OffsetRange, r2: OffsetRange) {
    return r1.from > r2.from || (r1.from === r2.from && r1.to < r2.to);
  }

  static min(...ranges: OffsetRange[]) {
    return ranges.reduce(
      (r1, r2) => (OffsetRange.less(r1, r2) ? r1 : r2),
      ranges[0] || new OffsetRange(-Infinity, Infinity)
    );
  }

  toEditorRange(editor: TextEditor) {
    const { from, to } = this;
    const start = editor.document.positionAt(from);
    const end = editor.document.positionAt(to);
    return new Range(start, end);
  }
}
