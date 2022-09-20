import localize from '../../../../common/support/functions/localize';

global.browser = {
  config: {
    localeText: {
      'Sign In': 'ログイン'
    }
  }
};

test('string', () => {
  expect(localize('Sign In')).toBe('ログイン');
});

test('array of strings', () => {
  expect(localize(['Sign In', 'Sign In'])).toStrictEqual([
    'ログイン',
    'ログイン'
  ]);
});

test('array of array of strings', () => {
  expect(localize([['Sign In'], ['Sign In']])).toStrictEqual([
    ['ログイン'],
    ['ログイン']
  ]);
});
