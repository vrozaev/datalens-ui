import {test, Page} from '@playwright/test';

const TIMEOUT_FOR_DEVELOPMENT = 5_000;

test.describe('Collections items list', () => {
    test('User should be able reset all filters when there are no matched items and list is empty', async ({
        page,
    }: {
        page: Page;
    }) => {
        await page.goto('/collections');

        await page.getByPlaceholder('Search by name').fill('Not existing entry');

        await page.getByText('Reset filters').click();

        await page.waitForTimeout(TIMEOUT_FOR_DEVELOPMENT);
    });
});
