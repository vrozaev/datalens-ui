import {expect, Page} from '@playwright/test';
import {slct} from '../utils';
import {DlNavigationQA, WorkbookNavigationMinimalQa} from '../../src/shared';

export async function selectEntryFromNavigationMenu(page: Page, datasetName: string) {
    const searchInput = page
        .locator(
            [slct(WorkbookNavigationMinimalQa.Input), slct(DlNavigationQA.SearchInput)].join(' ,'),
        )
        .getByRole('textbox');
    await searchInput.fill(datasetName);

    const resultsFound = page
        .locator([slct(WorkbookNavigationMinimalQa.List), slct(DlNavigationQA.Row)].join(' ,'))
        .getByText(datasetName, {exact: true});

    await expect(resultsFound).toBeVisible();
    await resultsFound.click();
}

export function createDashboard({
    workbookId,
    name,
}: {
    workbookId: string;
    name: string;
}): Promise<{entryId: string}> {
    return fetch('http://localhost:3030/api/dash/v1/dashboards', {
        headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en',
            'content-type': 'application/json',
            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-timezone-offset': '-60',
            Referer: 'http://localhost:3030/workbooks/6bq4x6m32538u/dashboards',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: `{"workbookId":"${workbookId}","name":"${name}","data":{"tabs":[{"id":"zB","title":"Tab 1","items":[{"id":"LD","type":"text","data":{"text":"New dashboard\\n"},"namespace":"default"}],"layout":[{"h":6,"w":12,"x":0,"y":0,"i":"LD"}],"connections":[],"aliases":{}}],"counter":2,"salt":"0.9381835558760274","settings":{"hideTabs":false,"expandTOC":false,"hideDashTitle":false,"silentLoading":false,"autoupdateInterval":null,"dependentSelectors":true,"maxConcurrentRequests":null,"loadOnlyVisibleCharts":true,"loadPriority":"charts","globalParams":{}}}}`,
        method: 'POST',
    }).then((response) => response.json());
}

export function deleteDashboard({dashId}: {dashId: string}) {
    return fetch('http://localhost:3030/gateway/root/mix/deleteEntry', {
        headers: {
            accept: 'application/json, text/plain, */*',
            'accept-language': 'en',
            'content-type': 'application/json',
            'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-request-id': 'dl.dc370.fcc7a493',
            'x-timezone-offset': '-60',
            Referer: 'http://localhost:3030/workbooks/6bq4x6m32538u',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: `{"entryId":"${dashId}","scope":"dash"}`,
        method: 'POST',
    });
}
