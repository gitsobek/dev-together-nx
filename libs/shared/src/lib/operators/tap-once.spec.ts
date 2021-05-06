import { interval } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { tapOnce } from './tap-once';

describe('#tapOnce', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should emit only once and ignore other values', () => {
    scheduler.run(({ expectObservable }) => {
      const expectedMarble = '1001ms a';
      const expectedValues = { a: 0 };
      const unsub = '1ms ^ 1s !';
      const source$ = interval(1000).pipe(tapOnce(() => {}));
      expectObservable(source$, unsub).toBe(expectedMarble, expectedValues);
    });
  });
});
