const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("tux-toolbar-buddy.js", "utf8");

const requiredSnippets = [
  "name: Tux Toolbar Buddy",
  "version: 0.1.1",
  "author: 0xTotoroX",
  "__tuxToolbarBuddy",
  "data-tux-toolbar-buddy",
  "__codexStepwisePanel?.scan?.()",
  "dispose()",
];

const forbiddenSnippets = [
  "characterData: true",
  "button.title = LABEL",
  "button.setAttribute(\"aria-label\", LABEL)",
  "label.textContent !== LABEL",
  "textNode.textContent = LABEL",
];

for (const snippet of requiredSnippets) {
  if (!source.includes(snippet)) {
    throw new Error(`Missing expected snippet: ${snippet}`);
  }
}

for (const snippet of forbiddenSnippets) {
  if (source.includes(snippet)) {
    throw new Error(`Forbidden snippet found: ${snippet}`);
  }
}

new vm.Script(source);

console.log(`PASS ${requiredSnippets.length} required and ${forbiddenSnippets.length} forbidden smoke check(s)`);
