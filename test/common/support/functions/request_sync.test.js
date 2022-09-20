const { requestGet, requestGetJson, requestPost } = require('../../../../common/support/functions/request_sync');
const { Request } = require('../../../../common/support/classes/request');

jest.mock('../../../../common/support/classes/request');

global.browser = {
  call: x => x()
};

test('Test requestGet()', () => {
  const resp = {data: [{name: 'Bob'}]};
  Request.get = jest.fn().mockReturnValue(resp);

  let res = requestGet('https://www.adobe.com/testPath');
  expect(res).toEqual({data: [{name: 'Bob'}]});  
});

test('Test requestJson()', () => {
  const resp = {data: [{name: 'Bob'}]};
  Request.get = jest.fn().mockReturnValue(resp);

  let res = requestGetJson('https://www.adobe.com/testPath');
  expect(res).toEqual([{name: 'Bob'}]);  
});

test('Test requestPost()', () => {
  const resp = {data: [{name: 'Bob'}]};
  Request.post = jest.fn().mockReturnValue(resp);

  let res = requestPost('https://www.adobe.com/testPath');
  expect(res).toEqual({data: [{name: 'Bob'}]});  
});