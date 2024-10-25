import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AngleRightIcon } from '@tonic-ui/react-icons';
import { MenuList, MenuToggle, Menu } from '@tonic-ui/react';
import { IconMenuProps, SubmenuPlacement } from './types';
import { dropdownMaxHeight, dropdownMaxWidth, getList } from './utils';

const IconMenu = ({ Icon, onItemClick, menuList }: IconMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<string>('bottom-start');
  const [subPlacement, setSubPlacement] =
    useState<SubmenuPlacement>('right-start');
  const TriggerIcon = useMemo(() => {
    return Icon ? <Icon size="8x" /> : <AngleRightIcon />;
  }, []);

  const handleObserver = useCallback(
    (entries: Array<IntersectionObserverEntry>) => {
      const ent = entries[0];
      let x: 'start' | 'end' = 'start';
      let y: 'top' | 'bottom' = 'bottom';
      let sx: 'right' | 'left' = 'right';
      let sy: 'start' | 'end' = 'start';

      if (
        // @ts-expect-error root is null, rootBounds will be browser view port
        // should not be undefined
        ent.rootBounds.width <
        ent.boundingClientRect.right + dropdownMaxWidth
      ) {
        x = 'end';
        sx = 'left';
      }

      if (
        // @ts-expect-error same as above
        ent.rootBounds.height <
        ent.boundingClientRect.bottom + dropdownMaxHeight
      ) {
        y = 'top';
        sy = 'end';
      }
      setPlacement(`${y}-${x}`);
      setSubPlacement(`${sx}-${sy}`);
    },
    [placement]
  );

  useEffect(() => {
    if (ref.current) {
      // element is placed usually on first render, use IntersectionObserver to
      // get the viewport size to decide dropdown placement
      const observer = new IntersectionObserver(handleObserver);
      observer.observe(ref.current as Element);
      return () => observer.unobserve(ref.current as Element);
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: 'fit-content' }}>
      <Menu
        display="block"
        placement={placement}
        offset={[0, 2]}>
        <MenuToggle>{TriggerIcon}</MenuToggle>
        <MenuList
          width={dropdownMaxWidth}
          maxHeight={dropdownMaxHeight}
          overflow="auto">
          {getList(menuList, onItemClick, 'root', subPlacement)}
        </MenuList>
      </Menu>
    </div>
  );
};

export default IconMenu;
