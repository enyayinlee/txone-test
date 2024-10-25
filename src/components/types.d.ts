type MenuItemType = {
  id?: string; // divider if not given
  text?: string;
  Icon?: React.Element;
  disabled?: boolean;
  isGroup?: boolean; // true if is group title
  children?: Array<MenuItemType>; // used by menugroup and submenu
  onClick?: () => void;
};

export type IconMenuProps = {
  defaultOpen?: boolean;
  Icon?: React.Element;
  onItemClick: ({
    clickedItem,
  }: {
    clickedItem: Pick<MenuItem, 'text' | 'id'>;
  }) => void;
  menuList: Array<MenuItemType>;
};

export type SubmenuPlacement =
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';
