import React from 'react';

import {SelectOption, SelectOptionGroup} from '@gravity-ui/uikit';
import AutogeneratedPaletteIcon from 'components/AutogeneratedPaletteIcon/AutogeneratedPaletteIcon';
import {i18n} from 'i18n';
import {
    ColorPalette,
    GradientPalettes,
    GradientType,
    InternalPaletteId,
    Palettes,
    getPalettesOrder,
} from 'shared';
import {selectAvailableClientPalettes} from 'ui';

import {PaletteIcon, PaletteType} from '../components/PaletteIcon/PaletteIcon';

export const getPaletteSelectorItems = ({
    colorPalettes = [],
}: {
    colorPalettes?: ColorPalette[];
}): SelectOptionGroup<{icon: JSX.Element}>[] => {
    const availablePalettes = selectAvailableClientPalettes();
    const palettesOrder = getPalettesOrder();

    const result: SelectOptionGroup<{icon: JSX.Element}>[] = palettesOrder.map(
        (paletteName: keyof Palettes): SelectOptionGroup<{icon: JSX.Element}> => {
            const palette = availablePalettes[paletteName];
            const options = palette.map(
                (item: string): SelectOption<{icon: JSX.Element}> => ({
                    data: {
                        icon: (
                            <PaletteIcon paletteType={PaletteType.ColorPalette} paletteId={item} />
                        ),
                    },
                    content: i18n('wizard.palette', `label_${item as InternalPaletteId}`),
                    value: item,
                    qa: item,
                }),
            );

            return {
                label: '',
                options,
            };
        },
    );

    if (colorPalettes.length) {
        return result.concat({
            label: '',
            options: colorPalettes.map(
                (colorPalette): SelectOption<{icon: JSX.Element}> => ({
                    data: {
                        icon: (
                            <AutogeneratedPaletteIcon
                                colors={colorPalette.colors}
                                height="16px"
                                width="20px"
                            />
                        ),
                    },
                    content: colorPalette.displayName,
                    value: colorPalette.colorPaletteId,
                }),
            ),
        });
    }

    return result;
};

export const getGradientSelectorItems = (gradients: GradientPalettes): SelectOption[] => {
    return Object.keys(gradients).map((gradientId: string): SelectOption<{icon: JSX.Element}> => {
        const title = gradients[gradientId].title;
        const icon = title ? (
            <AutogeneratedPaletteIcon
                colors={gradients[gradientId].colors}
                isGradient={true}
                height="16px"
                width="20px"
            />
        ) : (
            <PaletteIcon paletteId={gradientId} paletteType={PaletteType.GradientPalette} />
        );

        return {
            data: {icon},
            content: title || i18n('wizard', `label_${gradientId as GradientType}`),
            value: gradientId,
        };
    });
};