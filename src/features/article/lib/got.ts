import rawGot, { CancelableRequest, Request } from 'got';

/**
 * 10秒のタイムアウトと10MiBのダウンロードサイズ制限をかけたgot
 */
export const got = rawGot.extend({
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
