export function checkRequirements(current, previous, rows, counters, baseCounters) {
  for (const [id, content] of current) checkCurrent(id, content, previous, rows, counters, baseCounters);
  for (const id of previous.keys()) if (!current.has(id)) throw new Error(`Requirement ${id} was removed before shipping; keep deprecated requirements in the PRD.`);
  for (const id of rows.keys()) if (!current.has(id)) throw new Error(`Verification row ${id} does not exist in the PRD.`);
}

function checkCurrent(id, content, previous, rows, counters, baseCounters) {
  const prior = previous.get(id);
  const change = rows.get(id);
  if (!prior) checkNew(id, content, change, counters, baseCounters);
  else if (prior !== content && change !== "changed") throw new Error(`Changed requirement ${id} needs a 'changed' verification row.`);
  if ((!prior || prior !== content) && !hasEarsKeywords(content)) throw new Error(`New or changed requirement ${id} must contain uppercase EARS keywords.`);
}

function checkNew(id, content, change, counters, baseCounters) {
  if (change !== "new") throw new Error(`New PRD requirement ${id} needs a 'new' verification row.`);
  const key = id.startsWith("F") ? "functional" : "technical";
  const number = Number(id.slice(1));
  if (number <= baseCounters[key] || number > counters[key]) throw new Error(`New requirement ${id} is outside this branch's reserved ID range.`);
}

function hasEarsKeywords(content) {
  return /\b(?:IF|WHEN|WHILE|WHERE|SHALL)\b/.test(content)
    && !/\b(?:if|when|while|where|shall)\b/.test(content);
}
