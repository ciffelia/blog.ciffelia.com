/**
 * stderrに警告を表示する。
 * Embedのために外部から取得したデータに異常があったとき、エラーを吐いて終了するのではなく警告に留めたいので用意した。
 */
export const warn = (message: string, cause: unknown): void => {
  console.warn(`Warn: ${message}\nCause:`, cause);
};
