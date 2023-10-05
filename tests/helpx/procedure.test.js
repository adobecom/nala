import { expect, test } from '@playwright/test';
import { features } from '../../features/helpx/procedure.spec.js';
import {Procedure} from '../../selectors/helpx/procedure.selectors.js';


let procedure;

test.beforeAll(async({browser})=>{
  const authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijdzb2k4N3pkb3NJRnc4b19fbVR5a082QlVRNEZBVGhjaHlyNGZqY1dSbWcifQ.eyJlbWFpbCI6ImhlbGl4QGFkb2JlLmNvbSIsIm5hbWUiOiJIZWxpeCBBZG1pbiIsImlhdCI6MTY4OTkyNjExMiwiaXNzIjoiaHR0cHM6Ly9hZG1pbi5obHgucGFnZS8iLCJhdWQiOiI4M2EzNjM1NS1hZDE3LTRlZDAtODcwMS1lOTlhMzAyMGY4NmEiLCJzdWIiOiJhZG9iZWNvbS9oZWxweC1pbnRlcm5hbCIsImV4cCI6MTcyMTQ2MjExMiwianRpIjoiSDlxMW9aSGlveUZHREp6K0hEVkIrUlRDSnhTdXBzdkZxM3NwTDNZcFFVMXQifQ.X9vg21fTwViIiEmwvIpuGL3WIVfh1GlOoV3g7-5PBU_0vnX0XFJpV1EoQv4eO4BGp0fcVkr53BD2c0LVUO6SwnbmlBFL1QHwgvh9XrZpeUYDM2J6KSCXZgpWDTWxNCUHglBmmBfkK7bDPW_cqPgkLciakipT0Kq44qMhJbXETRZg4NS4vzMKI-gCLm3x0DoRNg8ijjnPhn9M5g8Yh1S8qk6F1F8OQzxOKMXoCMjfTgdfIKI179KMBNwGMAqbxd5EO2JyAcJs4FhxGoIPJyE1Fo3IFhNqb2c20DcctKGj0nI24zzrRaUmGlcddFfXiZ3ZBRpdSt7iWXY-UZNUSLZIzA';
   const context = await browser.newContext();
     // Set the authorization token in the header
    await context.setExtraHTTPHeaders({ 'authorization': `token ${authToken}` });
   const page = await context.newPage();
   procedure = new Procedure(page);
   //const url = "https://helpx-internal.stage.adobe.com/automation/blocks/procedure.html";
    await page.goto(`${baseURL}${features[0].path}`);
    await page.waitForLoadState('networkidle');

})


test.describe('Procedure Sanity test suite', () => {

  // Procedure Sanity Checks:
  test(`${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    
    console.info(`[Procedure] Checking page: ${baseURL}${features[0].path}`);

    await test.step('Navigate to Procedure page', async () => {
      //await page.goto(`${baseURL}${features[0].path}`);
      //await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('Check Procedure page content', async () => {
      // Check procedure:
      await expect(procedure.procedure).toBeVisible();

      // Check procedure step:
      await expect(procedure.procedureStep).toBeVisible();

      // Check image in procedure:
      await expect(procedure.procedureImage).toBeVisible();

      // Check bold text in procedure:
      await expect(procedure.procedureTxtBold).toBeVisible();

    });
  });
});
