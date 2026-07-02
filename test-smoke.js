const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("tux-toolbar-buddy.js", "utf8");

const requiredSnippets = [
  "name: Tux Toolbar Buddy",
  "author: 0xTotoroX",
  "__tuxToolbarBuddy",
  "data-tux-toolbar-buddy",
  "dispose()",
];

for (const snippet of requiredSnippets) {
  if (!source.includes(snippet)) {
    throw new Error(`Missing expected snippet: ${snippet}`);
  }
}

new vm.Script(source);

console.log(`PASS ${requiredSnippets.length} smoke check(s)`);
