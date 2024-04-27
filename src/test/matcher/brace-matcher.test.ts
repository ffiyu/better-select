import assert from "assert";
import { OffsetRange } from "../../model/OffsetRange";
import { BracketMatcher } from "../../model/Matcher";
import { parseSelectionString, selectionString } from "../test-utils";

const matcher = new BracketMatcher();

const table: [string, string | null][] = [
  [`|`, null],
  [`|[]`, null],
  [`[|]`, `|[]|`],
  [`[a|bc]`, `[|abc|]`],
  [`[|abc|]`, `|[abc]|`],
  [`|[abc]|`, null],
];

export function runTests() {
  suite("Bracket Matcher", () => {
    table.forEach((item) => {
      const [input, expect] = item;
      test(`${input}`, () => {
        const { content, from, to } = parseSelectionString(input);
        const result = matcher.match(new OffsetRange(from, to), content);
        if (expect === null) {
          assert.equal(result, null);
        } else {
          assert.ok(result);
          const resultStr = selectionString(content, result.from, result.to);
          assert.equal(resultStr, expect);
        }
      });
    });
  });
}
