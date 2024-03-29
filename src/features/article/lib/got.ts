import rawGot, { type CancelableRequest, type Request } from 'got';

const cache = new Map();

/**
 * got
 *
 * - キャッシュの有効化
 * - 10秒のタイムアウト
 * - 10MiBのダウンロードサイズ制限
 */
export const got = rawGot.extend({
  cache,
  timeout: { request: 10000 },
  handlers: [
    // https://github.com/sindresorhus/got/blob/main/documentation/examples/advanced-creation.js#L40
    (options, next) => {
      const downloadLimit = 10485760; // 10MiB
      const promiseOrStream = next(options);

      if (options.isStream) {
        const stream = promiseOrStream as Request;
        stream.on('downloadProgress', (progress) => {
          if (progress.transferred > downloadLimit && progress.percent !== 1) {
            stream.destroy(
              new Error(
                `Exceeded the download limit of ${downloadLimit} bytes`,
              ),
            );
          }
        });
      } else {
        const promise = promiseOrStream as CancelableRequest;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        promise.on('downloadProgress', (progress) => {
          if (progress.transferred > downloadLimit && progress.percent !== 1) {
            promise.cancel(
              `Exceeded the download limit of ${downloadLimit} bytes`,
            );
          }
        });
      }

      return promiseOrStream;
    },
  ],
});
