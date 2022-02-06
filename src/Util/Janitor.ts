export function Clean(toClean: string) {
  if (toClean === null || toClean === "")
    throw new Error("[!] Janitor.Clean - toClean cannot be null or empty");
  else toClean = toClean.toString();
  return toClean.replace(/(<([^>]+)>)/gi, "");
}
