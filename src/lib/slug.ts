export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function uniqueSlug(base: string, existing: string[]): string {
  const slugBase = slugify(base) || "article";
  if (!existing.includes(slugBase)) return slugBase;
  let n = 2;
  while (existing.includes(`${slugBase}-${n}`)) n++;
  return `${slugBase}-${n}`;
}
