import {
    Field,
    Placeholder,
    PlaceholderSettings,
    Shared,
    WizardVisualizationId,
    isContinuousAxisModeDisabled,
    isFieldHierarchy,
} from 'shared';
import {SETTINGS} from 'ui/constants/visualizations';

type GetAxisModePlaceholderSettings = {
    sort: Field[];
    visualization: Shared['visualization'];
    placeholder: Placeholder;
    firstField: Field;
};
export const getAxisModePlaceholderSettings = ({
    placeholder,
    visualization,
    sort,
    firstField,
}: GetAxisModePlaceholderSettings) => {
    const settings: PlaceholderSettings & {axisModeMap: Record<string, string>} = {axisModeMap: {}};

    let fields: Field[];
    let currentField: Field;
    if (isFieldHierarchy(firstField)) {
        fields = firstField.fields;
        currentField = firstField.fields[0];
    } else {
        fields = [firstField];
        currentField = firstField;
    }

    if (currentField) {
        fields.forEach((field) => {
            settings.axisModeMap[field.guid] = getActualAxisModeForField({
                field,
                axisSettings: placeholder.settings,
                sort,
                visualizationId: visualization.id as WizardVisualizationId,
            });
        });

        const currentAxisMode = settings.axisModeMap[currentField.guid];

        if (
            currentAxisMode === SETTINGS.AXIS_MODE.DISCRETE &&
            placeholder.settings?.gridStep === SETTINGS.GRID_STEP.MANUAL
        ) {
            settings.gridStep = SETTINGS.GRID_STEP.AUTO;
            settings.gridStepValue = undefined;
        }
    }

    return settings;
};

export const getFirstFieldInPlaceholder = (placeholder: Placeholder, drillDownLevel?: number) => {
    return isFieldHierarchy(placeholder.items[0]) && typeof drillDownLevel !== 'undefined'
        ? placeholder.items[0].fields[drillDownLevel]
        : placeholder.items[0];
};

export function getActualAxisModeForField(args: {
    field: Field;
    axisSettings: {axisModeMap?: Record<string, string>; disableAxisMode?: boolean} | undefined;
    visualizationId: WizardVisualizationId;
    sort: Field[];
}) {
    const {field, axisSettings, visualizationId, sort} = args;
    const isContinuousModeRestricted = isContinuousAxisModeDisabled({
        field,
        axisSettings,
        visualizationId,
        sort,
    });

    if (isContinuousModeRestricted) {
        return SETTINGS.AXIS_MODE.DISCRETE;
    }

    const fieldAxisMode = axisSettings?.axisModeMap?.[field.guid];
    return fieldAxisMode || SETTINGS.AXIS_MODE.CONTINUOUS;
}

export function isPlaceholderWithAxisMode(placeholder: Placeholder | undefined) {
    const placeholderSettings = (placeholder?.settings || {}) as PlaceholderSettings;
    return Boolean(placeholderSettings?.axisModeMap);
}

export function getPlaceholderAxisModeMap(args: {
    placeholder: Placeholder;
    visualizationId: WizardVisualizationId;
    sort: Field[];
}) {
    const {placeholder, visualizationId, sort} = args;
    const placeholderSettings = (placeholder.settings || {}) as PlaceholderSettings;
    const axisModeMap = placeholderSettings.axisModeMap || {};
    const firstField = placeholder.items[0];

    if (!firstField) {
        return axisModeMap;
    }

    const fields = isFieldHierarchy(firstField) ? firstField.fields : [firstField];
    return fields.reduce((acc, field) => {
        const itemAxisMode = getActualAxisModeForField({
            field,
            visualizationId,
            sort,
            axisSettings: placeholderSettings,
        });
        return Object.assign({}, acc, {[field.guid]: itemAxisMode});
    }, axisModeMap);
}
