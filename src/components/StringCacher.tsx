export class StringCacher {
  public bottomCache: string[];
  private cacheSize: number;
  private priorityCache: string[][];

  get cacheLevel() {
    return this.cacheSize;
  }
  get cache() {
    return this.bottomCache;
  }

  constructor(cacheLevel: number, cacheArray: string[]) {
    console.assert(cacheLevel >= 1, "Cache level can not be less than 1");
    console.assert(cacheArray.length >= 1, "Cache array can not be empty");

    this.cacheSize = cacheLevel;
    this.bottomCache = cacheArray;
    this.priorityCache = Array<Array<string>>(cacheLevel).fill([]);
  }

  includes(str: string): boolean {
    // look at top level
    if (this.priorityCache[0].includes(str)) {
      return true;
    }

    // look at the rest
    let colIdx = -1;
    for (let rowIdx = 1; rowIdx < this.cacheSize; rowIdx++) {
      // find str in this level
      colIdx = this.priorityCache[rowIdx].indexOf(str);

      if (colIdx !== -1) {
        // found item
        // append one level
        this.priorityCache[rowIdx - 1].push(str);
        this.priorityCache[rowIdx].splice(colIdx, 1);
        return true;
      }
    }

    // found no instance in current cache, look in bottom cache and append to lowest priority cache
    if (this.bottomCache.includes(str)) {
      this.priorityCache[this.cacheSize - 1].push(str);
      return true;
    }

    return false;
  }

  softIncludes(str: string): boolean {
    return this.priorityCache[0].includes(str);
  }
}
