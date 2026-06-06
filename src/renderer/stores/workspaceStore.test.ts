import { describe, expect, it } from 'vitest';
import type { WorkspaceTab } from './workspaceStore';
import { chooseAdjacentTab } from './workspaceStore';

function tab(id: string): WorkspaceTab {
  return {
    id,
    type: 'mysql',
    title: id,
    state: {},
    createdAt: '2026-06-06T00:00:00.000Z',
    updatedAt: '2026-06-06T00:00:00.000Z'
  };
}

describe('chooseAdjacentTab', () => {
  it('chooses the right neighbor when closing a middle tab', () => {
    expect(chooseAdjacentTab([tab('a'), tab('c')], 1)?.id).toBe('c');
  });

  it('chooses the left neighbor when closing the last tab', () => {
    expect(chooseAdjacentTab([tab('a'), tab('b')], 2)?.id).toBe('b');
  });

  it('returns undefined when no tabs remain', () => {
    expect(chooseAdjacentTab([], 0)).toBeUndefined();
  });
});
