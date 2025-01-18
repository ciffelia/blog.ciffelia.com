import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export type CachedFetchOptions<T> = {
  fetcher: (url: URL) => Promise<T>;
  cacheDir: string;
};

export class CachedFetcher<T> {
  readonly #fetcher: (url: URL) => Promise<T>;
  readonly #cacheDir: string;

  readonly #pendingFetches = new Map<string, Promise<T>>();

  constructor(options: CachedFetchOptions<T>) {
    this.#fetcher = options.fetcher;
    this.#cacheDir = options.cacheDir;
  }

  async fetch(url: URL): Promise<T> {
    const key = crypto
      .createHash("sha256")
      .update(url.toString())
      .digest("hex");

    const pendingFetch = this.#pendingFetches.get(key);
    if (pendingFetch !== undefined) {
      return pendingFetch;
    }

    const fetchPromise = (async () => {
      try {
        const filename = path.join(this.#cacheDir, url.hostname, `${key}.json`);

        let fileContent: string;
        try {
          fileContent = await fs.readFile(filename, "utf-8");
        } catch (err) {
          if (err instanceof Error && "code" in err && err.code === "ENOENT") {
            const data = await this.#fetcher(url);
            await fs.mkdir(path.dirname(filename), { recursive: true });
            await fs.writeFile(filename, JSON.stringify(data, null, 2));
            return data;
          }

          throw err;
        }

        return JSON.parse(fileContent) as T;
      } finally {
        this.#pendingFetches.delete(key);
      }
    })();

    this.#pendingFetches.set(key, fetchPromise);
    return fetchPromise;
  }
}
