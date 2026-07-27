import rawGot, { type Progress, type Request, type RequestPromise } from "got";

/**
 * gotの拡張
 *
 * - タイムアウト：10秒
 * - ダウンロードサイズ制限：10MiB
 */
export const got = rawGot.extend({
  timeout: { request: 10000 },
  handlers: [
    // https://github.com/sindresorhus/got/blob/main/documentation/examples/advanced-creation.js#L40
    (options, next) => {
      const downloadLimit = 10485760; // 10MiB
      const controller = new AbortController();
      options.signal = options.signal
        ? AbortSignal.any([options.signal, controller.signal])
        : controller.signal;

      const promiseOrStream = next(options);

      const cancel = (message: string) => {
        const error = new Error(message);

        if (options.isStream) {
          const stream = promiseOrStream as Request;
          stream.destroy(error);
        } else {
          controller.abort(error);
        }
      };

      const handleProgress = (progress: Progress) => {
        if (progress.transferred > downloadLimit && progress.percent !== 1) {
          cancel(`Exceeded the download limit of ${downloadLimit} bytes`);
        }
      };

      if (options.isStream) {
        const stream = promiseOrStream as Request;
        stream.on("downloadProgress", handleProgress);
      } else {
        const promise = promiseOrStream as RequestPromise;
        promise.on("downloadProgress", handleProgress);
      }

      return promiseOrStream;
    },
  ],
});
