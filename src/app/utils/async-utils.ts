import { IDefer } from "../models/shared-types";

export const createDefer = <T>() => {
  const defer: IDefer<T> = {
    promise: null,
    reject: (err: Error) => {},
    resolve: (value: T) => {},
    reset: (): void => {
      defer.promise = new Promise((resolve, reject) => {
        defer.resolve = (value: T) => {
          resolve(value);
        };
        defer.reject = (err: Error) => {
          reject(err);
        };
      });
    },
  };

  defer.reset();

  return defer;
};
