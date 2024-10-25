import React from 'react';
import { AngleRightIcon, AngleLeftIcon } from '@tonic-ui/react-icons';
import {
  MenuItem,
  Truncate,
  Space,
  MenuDivider,
  MenuGroup,
  Submenu,
  SubmenuToggle,
  SubmenuList,
  Flex,
} from '@tonic-ui/react';
import { MenuItemType, SubmenuPlacement, IconMenuProps } from './types';

export const dropdownMaxWidth = 200;
export const dropdownMaxHeight = 300;

const MenuItemFlex = ({ children }: { children: React.ReactNode }) => (
  <Flex
    alignItems="center"
    columnGap="4x"
    justifyContent="space-between"
    width="100%">
    {children}
  </Flex>
);

// iterate through list to compose list view
// for either divider, submenu, menugroup and menuitem
export const getList = (
  arr: Array<MenuItemType>,
  onItemClick: IconMenuProps['onItemClick'],
  prefix: string = '',
  submenuPlacement: SubmenuPlacement = 'right-start'
): React.ReactNode => {
  return arr.map((it, idx) => {
    let key: string = '';
    if (!it.id) {
      return <MenuDivider key={`${prefix}-divider-${idx}`} />;
    } else if (it.isGroup) {
      // group
      key = `${prefix}-group-${idx}`;
      return (
        <MenuGroup
          title={
            <MenuItemFlex>
              <Truncate title={it.text}>{it.text}</Truncate>
              {!!it.Icon && <>{it.Icon}</>}
            </MenuItemFlex>
          }
          key={key}>
          {!!it.children &&
            getList(it.children, onItemClick, key, submenuPlacement)}
        </MenuGroup>
      );
    } else if (it.children && it.children.length > 0) {
      // submenu
      key = `${prefix}-submenu-${idx}`;
      return (
        <Submenu
          key={key}
          placement={submenuPlacement}>
          <SubmenuToggle width="100%">
            <MenuItem value={it.id}>
              <MenuItemFlex>
                {submenuPlacement.includes('left') && (
                  <>
                    <AngleLeftIcon />
                    <Truncate title={it.text}>{it.text}</Truncate>
                  </>
                )}
                {submenuPlacement.includes('right') && (
                  <>
                    <Truncate title={it.text}>{it.text}</Truncate>
                    <AngleRightIcon />
                  </>
                )}
              </MenuItemFlex>
            </MenuItem>
          </SubmenuToggle>
          <SubmenuList
            maxHeight={dropdownMaxHeight}
            PopperProps={{
              usePortal: true,
            }}>
            {getList(it.children, onItemClick, key, submenuPlacement)}
          </SubmenuList>
        </Submenu>
      );
    } else {
      // menu item
      return (
        <MenuItem
          onClick={() => {
            it.onClick?.();
            onItemClick({ clickedItem: { text: it.text, id: it.id } });
          }}
          value={it.id}
          key={`${prefix}-item-${idx}`}
          disabled={!!it.disabled}>
          {!!it.Icon && (
            <>
              {it.Icon}
              <Space width="4x" />
            </>
          )}
          <Truncate title={it.text}>{it.text}</Truncate>
        </MenuItem>
      );
    }
  });
};
