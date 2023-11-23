import _ from 'lodash';

import {
    ChartkitGlobalSettings,
    DatasetFieldAggregation,
    Field,
    Shared,
    WizardVisualizationId,
    isFieldHierarchy,
    isParameter,
} from '../../../../shared';
import {DL} from '../../../../ui';
import {
    AREA_100P_VISUALIZATION,
    AREA_VISUALIZATION,
    BAR_100P_VISUALIZATION,
    BAR_VISUALIZATION,
    BAR_X_D3_VISUALIZATION,
    COLUMN_100P_VISUALIZATION,
    COLUMN_VISUALIZATION,
    COMBINED_CHART_VISUALIZATION,
    DONUT_VISUALIZATION,
    FLAT_TABLE_VISUALIZATION,
    GEOLAYER_VISUALIZATION,
    GEOPOINT_VISUALIZATION,
    GEOPOINT_WITH_CLUSTER_VISUALIZATION,
    GEOPOLYGON_VISUALIZATION,
    HEATMAP_VISUALIZATION,
    LINE_VISUALIZATION,
    METRIC_VISUALIZATION,
    PIE_D3_VISUALIZATION,
    PIE_VISUALIZATION,
    PIVOT_TABLE_VISUALIZATION,
    POLYLINE_VISUALIZATION,
    SCATTER_D3_VISUALIZATION,
    SCATTER_VISUALIZATION,
    TREEMAP_VISUALIZATION,
} from '../../../../ui/constants/visualizations';
import {ITEM_TYPES} from '../constants';

import {getCommonDataType} from './helpers';

export const prepareFieldToMeasureTransformation = (item: Field): Field => {
    if (ITEM_TYPES.MEASURES_AND_PSEUDO.has(item.type) || isParameter(item)) {
        return item;
    }

    const commonDataType = getCommonDataType(item.data_type);

    return {
        ...item,
        transformed: true,
        fakeTitle: item.fakeTitle || item.title,
        aggregation:
            commonDataType === 'number'
                ? DatasetFieldAggregation.Sum
                : DatasetFieldAggregation.Countunique,
    };
};

export const prepareFieldToDimensionTransformation = (item: Field): Field => {
    if (ITEM_TYPES.DIMENSIONS_AND_PSEUDO.has(item.type) || isFieldHierarchy(item)) {
        return item;
    }

    return {
        ...item,
        transformed: true,
        fakeTitle: item.fakeTitle || item.title,
        aggregation: DatasetFieldAggregation.None,
    };
};

export function getAvailableVisualizations(options?: ChartkitGlobalSettings) {
    const {
        highcharts: {enabled: isHighchartsEnabled = false} = {},
        yandexMap: {enabled: isYandexMapEnabled = false} = {},
    } = options || DL.CHARTKIT_SETTINGS;

    const items: {value: Shared['visualization']; enabled: boolean}[] = [
        {
            value: LINE_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: AREA_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: AREA_100P_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: COLUMN_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: {...BAR_X_D3_VISUALIZATION, hidden: isHighchartsEnabled},
            enabled: true,
        },
        {
            value: COLUMN_100P_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: BAR_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: BAR_100P_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: SCATTER_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: {...SCATTER_D3_VISUALIZATION, hidden: isHighchartsEnabled},
            enabled: true,
        },
        {
            value: PIE_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: {...PIE_D3_VISUALIZATION, hidden: isHighchartsEnabled},
            enabled: true,
        },
        {
            value: DONUT_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: METRIC_VISUALIZATION,
            enabled: true,
        },
        {
            value: TREEMAP_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
        {
            value: FLAT_TABLE_VISUALIZATION,
            enabled: true,
        },
        {
            value: PIVOT_TABLE_VISUALIZATION,
            enabled: true,
        },

        {
            value: GEOPOINT_VISUALIZATION,
            enabled: isYandexMapEnabled,
        },
        {
            value: GEOPOINT_WITH_CLUSTER_VISUALIZATION,
            enabled: isYandexMapEnabled,
        },
        {
            value: GEOPOLYGON_VISUALIZATION,
            enabled: isYandexMapEnabled,
        },
        {
            value: HEATMAP_VISUALIZATION,
            enabled: isYandexMapEnabled,
        },
        {
            value: GEOLAYER_VISUALIZATION,
            enabled: isYandexMapEnabled,
        },
        {
            value: POLYLINE_VISUALIZATION,
            enabled: isYandexMapEnabled,
        },
        {
            value: COMBINED_CHART_VISUALIZATION,
            enabled: isHighchartsEnabled,
        },
    ];

    return _.cloneDeep(items.filter((item) => item.enabled).map(({value}) => value));
}

export function isD3Visualization(id: WizardVisualizationId) {
    const d3Visualizations = [
        WizardVisualizationId.ScatterD3,
        WizardVisualizationId.PieD3,
        WizardVisualizationId.BarXD3,
    ];
    return d3Visualizations.includes(id);
}