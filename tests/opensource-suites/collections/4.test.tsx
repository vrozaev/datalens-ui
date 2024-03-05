import {test, Page, expect} from '@playwright/test';

const TIMEOUT_FOR_DEVELOPMENT = 5_000;

test.describe('Collections items list', () => {
    test.beforeEach(async ({page}: {page: Page}) => {
        await page.goto('/collections');
    });

    test('User should be able reset all filters when there are no matched items and list is empty', async ({
        page,
    }: {
        page: Page;
    }) => {
        await page.getByTestId('filter-entries').locator('input').fill('Not existing entry');

        await page.getByTestId('reset-filters').click();

        await page.waitForTimeout(TIMEOUT_FOR_DEVELOPMENT);
    });

    test('User should be able to filter out items by name', async ({page}: {page: Page}) => {
        await page.getByTestId('filter-entries').locator('input').fill('Not existing entry');

        let rows;

        // TODO: we need better selector here
        rows = await page.locator('.dl-collection-content-table__content-row').all();

        expect(rows).toHaveLength(0);

        await page.getByTestId('reset-filters').click();

        // TODO: we need better selector here
        rows = await page.locator('.dl-collection-content-table__content-row').all();

        expect(rows).toHaveLength(2);

        await page.waitForTimeout(TIMEOUT_FOR_DEVELOPMENT);
    });
});
