import { callFunction } from './index';

describe('io-ts-question', () => {
  it('should allow invocation', () => {
    callFunction({ version: '1.2.3' });
  });
});
