export function excludeUndefinedKeys(obj: object) {
  const newObj: { [k: string]: unknown } = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) newObj[k] = v;
  });
  return newObj;
}
