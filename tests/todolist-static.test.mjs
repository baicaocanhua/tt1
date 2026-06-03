import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(rootDir, 'index.html');

let html;

test.before(async () => {
  html = await readFile(htmlPath, 'utf8');
});

test('renders the core todo controls', () => {
  assert.match(html, /<form[^>]+data-testid="todo-form"/);
  assert.match(html, /<input[^>]+data-testid="todo-input"/);
  assert.match(html, /<ul[^>]+data-testid="todo-list"/);
  assert.match(html, /data-testid="remaining-count"/);
  assert.match(html, /data-testid="clear-completed"/);
});

test('provides all task filters and an empty state', () => {
  assert.match(html, /data-filter="all"/);
  assert.match(html, /data-filter="active"/);
  assert.match(html, /data-filter="completed"/);
  assert.match(html, /没有待办事项/);
});

test('defines persistent todo behavior hooks', () => {
  assert.match(html, /localStorage/);
  assert.match(html, /codex\.todo\.items\.v1/);

  for (const functionName of [
    'addTodo',
    'toggleTodo',
    'deleteTodo',
    'clearCompleted',
    'setFilter',
    'renderTodos',
  ]) {
    assert.match(html, new RegExp(`function\\s+${functionName}\\s*\\(`));
  }
});
