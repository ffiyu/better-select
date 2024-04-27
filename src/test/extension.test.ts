import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { runTests as runQuoteMatchTests } from "./matcher/quote-matcher.test";
import { runTests as runBraceTests } from "./matcher/brace-matcher.test";
// import * as myExtension from '../../extension';

suite("Unit Tests", () => {
  runQuoteMatchTests();
  runBraceTests();
});

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
