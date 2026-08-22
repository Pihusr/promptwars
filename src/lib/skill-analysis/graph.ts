import type { PrerequisiteChain, SkillPrerequisite } from "./types";

export interface SkillGraph {
  nodes: Set<string>;
  /** skillSlug -> required earlier skills */
  prerequisitesOf: Map<string, Map<string, number>>;
  /** prerequisiteSkillSlug -> skills that depend on it */
  dependentsOf: Map<string, Map<string, number>>;
}

function addDirectedEdge(
  map: Map<string, Map<string, number>>,
  from: string,
  to: string,
  strength: number
): void {
  let edges = map.get(from);
  if (!edges) {
    edges = new Map();
    map.set(from, edges);
  }
  const existing = edges.get(to);
  edges.set(to, existing === undefined ? strength : Math.max(existing, strength));
}

/**
 * Edge direction matches the database:
 * skillSlug is the dependent/target skill;
 * prerequisiteSkillSlug must be learned first.
 */
export function buildSkillGraph(prerequisites: SkillPrerequisite[]): SkillGraph {
  const nodes = new Set<string>();
  const prerequisitesOf = new Map<string, Map<string, number>>();
  const dependentsOf = new Map<string, Map<string, number>>();

  for (const edge of prerequisites) {
    nodes.add(edge.skillSlug);
    nodes.add(edge.prerequisiteSkillSlug);
    addDirectedEdge(
      prerequisitesOf,
      edge.skillSlug,
      edge.prerequisiteSkillSlug,
      edge.relationshipStrength
    );
    addDirectedEdge(
      dependentsOf,
      edge.prerequisiteSkillSlug,
      edge.skillSlug,
      edge.relationshipStrength
    );
  }

  return { nodes, prerequisitesOf, dependentsOf };
}

function compareSlugs(a: string, b: string): number {
  return a.localeCompare(b);
}

/**
 * DFS with recursion-stack tracking. Collects every node that participates
 * in at least one back edge (including self-prerequisites).
 */
export function detectGraphCycles(graph: SkillGraph): {
  hasCycle: boolean;
  cycleSkillSlugs: string[];
} {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const inCycle = new Set<string>();
  const stack: string[] = [];

  function visit(node: string): void {
    visiting.add(node);
    stack.push(node);

    const dependents = graph.dependentsOf.get(node);
    if (dependents) {
      for (const next of dependents.keys()) {
        if (visiting.has(next)) {
          const cycleStart = stack.indexOf(next);
          for (let i = cycleStart; i < stack.length; i += 1) {
            inCycle.add(stack[i]);
          }
          inCycle.add(next);
          continue;
        }
        if (!visited.has(next)) {
          visit(next);
        }
      }
    }

    stack.pop();
    visiting.delete(node);
    visited.add(node);
  }

  const nodes = [...graph.nodes].sort(compareSlugs);
  for (const node of nodes) {
    if (!visited.has(node)) {
      visit(node);
    }
  }

  const cycleSkillSlugs = [...inCycle].sort(compareSlugs);
  return {
    hasCycle: cycleSkillSlugs.length > 0,
    cycleSkillSlugs,
  };
}

export function getDirectDependents(
  graph: SkillGraph,
  skillSlug: string
): Map<string, number> {
  return graph.dependentsOf.get(skillSlug) ?? new Map();
}

/** Unique transitive dependents, excluding the starting skill. Stops on cycles. */
export function getTransitiveDependents(
  graph: SkillGraph,
  skillSlug: string
): Set<string> {
  const found = new Set<string>();
  const stack = [...(graph.dependentsOf.get(skillSlug)?.keys() ?? [])];

  while (stack.length > 0) {
    const next = stack.pop();
    if (!next || next === skillSlug || found.has(next)) {
      continue;
    }
    found.add(next);
    const children = graph.dependentsOf.get(next);
    if (children) {
      for (const child of children.keys()) {
        if (!found.has(child) && child !== skillSlug) {
          stack.push(child);
        }
      }
    }
  }

  return found;
}

function collectAncestors(graph: SkillGraph, targetSkillSlug: string): {
  ancestors: Set<string>;
  hasCycle: boolean;
  cycleSkillSlugs: string[];
} {
  const ancestors = new Set<string>();
  const visiting = new Set<string>();
  const inCycle = new Set<string>();
  const stack: string[] = [];

  function walk(node: string): void {
    if (visiting.has(node)) {
      const cycleStart = stack.indexOf(node);
      if (cycleStart >= 0) {
        for (let i = cycleStart; i < stack.length; i += 1) {
          inCycle.add(stack[i]);
        }
      }
      inCycle.add(node);
      return;
    }
    if (ancestors.has(node) && node !== targetSkillSlug) {
      return;
    }

    visiting.add(node);
    stack.push(node);

    const prereqs = graph.prerequisitesOf.get(node);
    if (prereqs) {
      for (const prereq of [...prereqs.keys()].sort(compareSlugs)) {
        if (prereq !== targetSkillSlug) {
          ancestors.add(prereq);
        }
        walk(prereq);
      }
    }

    stack.pop();
    visiting.delete(node);
  }

  walk(targetSkillSlug);

  return {
    ancestors,
    hasCycle: inCycle.size > 0,
    cycleSkillSlugs: [...inCycle].sort(compareSlugs),
  };
}

function topologicalSortSubset(
  graph: SkillGraph,
  subset: Set<string>
): string[] {
  const remaining = new Set(subset);
  const inDegree = new Map<string, number>();

  for (const node of remaining) {
    let degree = 0;
    const prereqs = graph.prerequisitesOf.get(node);
    if (prereqs) {
      for (const prereq of prereqs.keys()) {
        if (remaining.has(prereq)) {
          degree += 1;
        }
      }
    }
    inDegree.set(node, degree);
  }

  const ordered: string[] = [];
  const ready = [...remaining]
    .filter((node) => (inDegree.get(node) ?? 0) === 0)
    .sort(compareSlugs);

  while (ready.length > 0) {
    const node = ready.shift();
    if (!node) break;
    ordered.push(node);
    remaining.delete(node);

    const dependents = graph.dependentsOf.get(node);
    if (!dependents) continue;

    const newlyReady: string[] = [];
    for (const dependent of dependents.keys()) {
      if (!remaining.has(dependent)) continue;
      const nextDegree = (inDegree.get(dependent) ?? 0) - 1;
      inDegree.set(dependent, nextDegree);
      if (nextDegree === 0) {
        newlyReady.push(dependent);
      }
    }
    newlyReady.sort(compareSlugs);
    ready.push(...newlyReady);
  }

  if (remaining.size > 0) {
    ordered.push(...[...remaining].sort(compareSlugs));
  }

  return ordered;
}

export function buildPrerequisiteChain(
  graph: SkillGraph,
  targetSkillSlug: string
): PrerequisiteChain {
  const { ancestors, hasCycle, cycleSkillSlugs } = collectAncestors(
    graph,
    targetSkillSlug
  );

  return {
    targetSkillSlug,
    orderedPrerequisiteSkillSlugs: topologicalSortSubset(graph, ancestors),
    hasCycle,
    cycleSkillSlugs,
  };
}

export function buildPrerequisiteChains(
  graph: SkillGraph,
  targetSkillSlugs: string[]
): PrerequisiteChain[] {
  return targetSkillSlugs.map((slug) => buildPrerequisiteChain(graph, slug));
}

export function getBlockingPrerequisiteSlugs(
  graph: SkillGraph,
  skillSlug: string,
  gappedSkillSlugs: Set<string>
): string[] {
  const chain = buildPrerequisiteChain(graph, skillSlug);
  return chain.orderedPrerequisiteSkillSlugs.filter((prereq) =>
    gappedSkillSlugs.has(prereq)
  );
}
