import { cardinal } from '../../../../common/support/functions/cardinal';

test('ordinal to cardinal', () => {
  expect(cardinal('')).toBe(0);  
  expect(cardinal('1st')).toBe(0);
  expect(cardinal('2nd')).toBe(1);
  expect(cardinal('3rd')).toBe(2);
  expect(cardinal('4th')).toBe(3);
  expect(cardinal('5th')).toBe(4);
  expect(cardinal('6th')).toBe(5);
  expect(cardinal('7th')).toBe(6);  
});