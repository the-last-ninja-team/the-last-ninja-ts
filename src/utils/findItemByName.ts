import type { Undef } from '@src/interfaces';

export const findItemByName =
  <T>(array?: Array<T & { name: string }>) =>
  (name: string): Undef<T> =>
    array?.find((object) => object.name === name);
