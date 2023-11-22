import React from 'react';

import {Star, StarFill} from '@gravity-ui/icons';
import {Button, DropdownMenu, DropdownMenuItem, Icon, List} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import AutogeneratedPaletteIcon from 'components/AutogeneratedPaletteIcon/AutogeneratedPaletteIcon';
import {i18n} from 'i18n';
import {ColorPalette} from 'shared';

import trashIcon from '@gravity-ui/icons/svgs/trash-bin.svg';
import iconPlus from 'ui/assets/icons/plus.svg';

import './ColorPalettesCard.scss';

const b = block('color-palettes-card');

type Props = {
    colorPalettes: ColorPalette[];
    title: string;
    description: string;
    className?: string;
    handleRemoveColorPaletteClick: (colorPalette: ColorPalette) => void;
    handleCreateColorPalette: () => void;
    handleItemClick: (colorPalette: ColorPalette) => void;
    isFavoritesEnabled: boolean;
};

class ColorPalettesCard extends React.Component<Props> {
    render() {
        const {colorPalettes, className, title, description, handleCreateColorPalette} = this.props;

        return (
            <div className={b(null, className)}>
                <div className={b('description-wrapper')}>
                    <div className={b('title')}>{title}</div>
                    <div className={b('description')}>{description}</div>
                </div>
                <List<ColorPalette>
                    itemHeight={40}
                    virtualized={false}
                    filterable={false}
                    sortable={false}
                    renderItem={this.renderPaletteListItem}
                    items={colorPalettes}
                    itemClassName={b('list-item-wrapper')}
                />
                <Button className={b('add-palette-button')} onClick={handleCreateColorPalette}>
                    <Icon data={iconPlus} />
                    {i18n('component.color-palette-editor', 'label_add-palette')}
                </Button>
            </div>
        );
    }

    private renderPaletteListItem = (colorPalette: ColorPalette) => {
        const {isFavoritesEnabled} = this.props;

        const items: DropdownMenuItem<unknown>[] = [
            {
                action: () => {
                    this.props.handleRemoveColorPaletteClick(colorPalette);
                },
                icon: <Icon size={16} data={trashIcon} />,
                text: i18n('component.color-palette-editor', 'label_delete-palette'),
                theme: 'danger',
            },
        ];

        return (
            <div className={b('list-item')}>
                <div
                    className={b('list-item-content')}
                    onClick={this.props.handleItemClick.bind(null, colorPalette)}
                >
                    <div className={b('palettes-list-item-icon')}>
                        <AutogeneratedPaletteIcon
                            isGradient={colorPalette.isGradient}
                            colors={colorPalette.colors}
                        />
                    </div>
                    {colorPalette.displayName}
                </div>
                <div className={b('list-item-actions')}>
                    <DropdownMenu
                        size="s"
                        defaultSwitcherProps={{
                            view: 'flat-secondary',
                            size: 's',
                            width: 'max',
                        }}
                        switcherWrapperClassName={b('more-icon')}
                        items={items}
                    />
                    {isFavoritesEnabled ? (
                        <Icon
                            className={b('default-icon', {default: colorPalette.isDefault})}
                            data={colorPalette.isDefault ? StarFill : Star}
                            width="16"
                            height="16"
                        />
                    ) : null}
                </div>
            </div>
        );
    };
}
export default ColorPalettesCard;