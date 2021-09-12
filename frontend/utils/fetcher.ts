/**
 *
 * @description A Fetcher For `componentdidmount()`
 * @param url The URL To Fetch
 * @param data Data To Pass To Fetch
 * @param parser JSON, Or Text
 * @param callback A Function To Run After The Fetch
 * @returns Function
 */

export default function fetcher(
  url: RequestInfo,
  data: RequestInit,
  parser: string,
  callback: Function
): Function {
  // eslint-disable-next-line
  return async () => {
    if (callback instanceof Function)
      return callback(await (await fetch(url, data ?? {}))[parser ?? 'json']());
    else return await (await fetch(url, data ?? {}))[parser ?? 'json']();
  };
}
