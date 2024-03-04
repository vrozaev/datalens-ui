import {test, Page, expect} from '@playwright/test';

test.describe('@open Collections page', () => {
    test('There are one mistake in this test', async ({page}: {page: Page}) => {
        await page.goto('/collections');

        await page.getByPlaceholder('Search by name').fill('Lets try fill it!');

        const rows = await page.$$('.dl-collection-content-table__content-row');

        expect(rows.length).toBe(0);
    });
});
