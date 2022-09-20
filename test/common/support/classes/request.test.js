const { Request } = require('../../../../common/support/classes/request');
import axios from 'axios';

jest.mock('axios');

test('Test new Request.get()', async () => {
  const resp = {data: [{name: 'Bob'}]};
  axios.get.mockResolvedValue(resp);

  let req = new Request('https://www.adobe.com', 'username', 'password');
  let res = await req.get('/testPath');
  expect(res).toEqual({data: [{name: 'Bob'}]});  
});

test('Test new Request.getJson()', async () => {
  const resp = {data: '[{"name": "Bob"}]'};
  axios.get.mockResolvedValue(resp);

  let req = new Request('https://www.adobe.com', 'username', 'password');
  let res = await req.getJson('/testPath');
  expect(res).toEqual('[{"name": "Bob"}]');  
});

test('Test Request.get()', async () => {
  const resp = {data: [{name: 'Bob'}]};
  axios.get.mockResolvedValue(resp);

  let res = await Request.get('https://www.adobe.com/testPath', {});
  expect(res).toEqual({data: [{name: 'Bob'}]});  
});

test('Test Request.getJson()', async () => {
  const resp = {data: '[{"name": "Bob"}]'};
  axios.get.mockResolvedValue(resp);

  let res = await Request.getJson('https://www.adobe.com/testPlan', {});
  expect(res).toEqual('[{"name": "Bob"}]');  
});