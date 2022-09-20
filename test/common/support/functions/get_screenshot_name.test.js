import get_screenshot_name from '../../../../common/support/functions/get_screenshot_name';

global.browser = {
  config: {
    profile: {
      browser: 'chrome',
      locale: 'jp/ja'
    }
  }
};


test('specifiled folder and filename', () => {
  expect(get_screenshot_name('folder', 'file', browser)).toBe('folder/file.png');
});

test('unspecifiled folder and specified filename', () => {
  expect(get_screenshot_name(undefined, 'file', browser)).toBe('screenshots/file.png');
});

test('unspecifiled folder and unspecified filename', () => {
  Date.now = jest.fn(() => Date.parse('2020-01-01 00:00:00'));
  expect(get_screenshot_name(undefined, undefined, browser)).toBe('screenshots/2020-01-01_00-00-00-000-chrome-jpja.png');
});

test('a specifiled folder and unspecified filename', () => {
  Date.now = jest.fn(() => Date.parse('2020-01-01 00:00:00'));
  expect(get_screenshot_name('folder', undefined, browser)).toBe('folder/2020-01-01_00-00-00-000-chrome-jpja.png');
});