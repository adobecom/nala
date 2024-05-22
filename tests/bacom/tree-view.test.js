import { expect, test } from '@playwright/test';
import { TreeView } from '../../selectors/bacom/tree-view.page.js';

const TreeViewSpec = require('../../features/bacom/tree-view.spec.js');

const { features } = TreeViewSpec;
const miloLibs = process.env.MILO_LIBS || '';

test.describe('BACOM Tree-View Block Test Suite', () => {
  test(
    `${features[0].name}, @bacom_live, ${features[0].tags}, https://bacom.adobe.com`,
    async ({ page, baseURL }) => {
      const treeView = new TreeView(page);
      const testPage = `${baseURL}${features[0].path}${miloLibs}`;

      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');

      await test.step('Verifying collapsed state', async () => {
        const beforeClick = await treeView.getFirstAccordionState();
        expect(beforeClick).toBe('false');
        await expect(treeView.firstAccordionFirstItem).not.toBeVisible();
      });

      await test.step('Verifying the expanded state', async () => {
        await treeView.firstAccordionButton.click();
        const afterClick = await treeView.getFirstAccordionState();
        expect(afterClick).toBe('true');
      });

      await test.step('Verifying the ability to click the links inside the accordion', async () => {
        await expect(treeView.firstAccordionFirstItem).toBeVisible();
        await treeView.firstAccordionFirstItem.click();
        expect(page.url()).not.toBe(testPage);
      });
    },
  );
});
