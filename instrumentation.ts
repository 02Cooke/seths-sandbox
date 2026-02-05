/**
 * Runs when the Next.js server starts. Stubs broken Node localStorage
 * (e.g. from --localstorage-file without valid path) so Clerk and other
 * code don't throw "localStorage.getItem is not a function".
 * Remove or disable this once you have real env keys and a normal Node env.
 */
const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  get length() {
    return 0
  },
  key: () => null
}

function stubLocalStorageIfBroken() {
  if (typeof globalThis === "undefined") return
  const g = globalThis as unknown as { localStorage?: unknown }
  const ls = g.localStorage
  if (ls == null) return
  const getItem = (ls as { getItem?: unknown }).getItem
  if (typeof getItem === "function") return
  g.localStorage = noopStorage
}

// Run as soon as this file is loaded in Node (before any other code uses localStorage)
if (typeof process !== "undefined") {
  stubLocalStorageIfBroken()
}

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    stubLocalStorageIfBroken()
  }
}
