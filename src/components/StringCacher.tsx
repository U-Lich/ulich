/**
 * An array of string that utilizes cache levels to improve search time
 */
export class StringCacher extends Array<string> {
  private cacheLevel: number;
  private cacheArray: string[][];

  constructor(cacheLevel: number, items: string[]) {
    if (cacheLevel < 0) {
      throw new RangeError("Cache level must be >= 0");
    }

    super(...items);
    this.cacheLevel = cacheLevel;
    this.cacheArray = [];

    for (let i = 0; i < this.cacheLevel; i++) {
      this.cacheArray.push([]);
    }
  }

  /**
   * search for a string in the array, and promote to cache if found
   * @param str String to search for
   * @returns true if string exists in the array, false otherwise
   */
  public search(str: string): boolean {
    return this.internal_search(str);
  }

  /**
   * search for a string in the array without altering the cache
   * @param str String to search for
   * @param level Levels to search for
   * @returns true if string exists in the array, false otherwise
   */
  public softSearch(str: string, level: number): boolean {
    if (level < 1) {
      throw new RangeError("Cache level must be >= 1");
    }

    return this.internal_search(str, true, level);
  }

  private internal_search(
    str: string,
    soft: boolean = false,
    searchLevels: number = 1
  ): boolean {
    // if no cache, use normal search
    if (this.cacheArray.length === 0) return this.includes(str);

    // search in cache
    // look at top level
    if (this.cacheArray[0].includes(str)) {
      return true;
    }

    let colIdx = -1;
    if (!soft) {
      // search and alter cache in lower levels
      for (let rowIdx = 1; rowIdx < this.cacheLevel; rowIdx++) {
        colIdx = this.cacheArray[rowIdx].indexOf(str);
        if (colIdx !== -1) {
          // found item
          // append one level
          this.cacheArray[rowIdx - 1].push(str);
          this.cacheArray[rowIdx].splice(colIdx, 1);

          return true;
        }
      }

      // found no instance in current cache, look in actual array and append to lowest level cache if found
      if (this.includes(str)) {
        this.cacheArray[this.cacheLevel - 1].push(str);
        return true;
      }

      return false;
    }

    // search without altering cache
    // the smaller level
    let realSearchLevel = Math.min(searchLevels, this.cacheLevel);
    for (let rowIdx = 1; rowIdx < realSearchLevel; rowIdx++) {
      if (this.cacheArray[rowIdx].indexOf(str) !== -1) {
        return true;
      }
    }

    // found no instance in current cache, look in actual array if search level is higher than cache level
    if (searchLevels > this.cacheLevel) {
      return this.includes(str);
    }

    return false;
  }
}
