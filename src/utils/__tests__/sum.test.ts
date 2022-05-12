import { sum } from '../sum';

describe('src/utils/sum', () => {
  it('1 + 2 = 3', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
