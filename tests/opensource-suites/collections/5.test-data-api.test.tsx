import {test, Page} from '@playwright/test';
import {createDashboard, deleteDashboard} from '../utils';

const TIMEOUT_FOR_DEVELOPMENT = 5_000;

const testWorkbookId = 'ns7ogqrknuf2b';
const dashboardName = 'New dashboard';

test.describe('Creating test data with api', () => {
    let entryId: string;

    test.beforeEach(async ({page}: {page: Page}) => {
        const dashboard = await createDashboard({
            workbookId: testWorkbookId,
            name: dashboardName,
        });

        entryId = dashboard.entryId;

        await page.goto(`/workbooks/${testWorkbookId}`);
    });

    test.afterEach(async () => {
        await deleteDashboard({
            dashId: entryId,
        });
    });

    test('We should see new dashboard in the list', async ({page}: {page: Page}) => {
        await expect(page.getByText(dashboardName, {exact: true})).toBeVisible();

        await page.waitForTimeout(TIMEOUT_FOR_DEVELOPMENT);
    });
});
