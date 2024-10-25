import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TonicProvider } from '@tonic-ui/react';
import IconMenu from '../IconMenu';
import { testData } from '../../data';
import { MenuItemType } from 'components/types';

class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}

const Test = ({ children }: { children: React.ReactNode }) => {
  return (
    <TonicProvider
      colorMode={{
        defaultValue: 'dark',
      }}>
      {children}
    </TonicProvider>
  );
};

describe('<IconMenu />', () => {
  const tempIntFn = window.IntersectionObserver;
  beforeAll(() => {
    window.IntersectionObserver = IntersectionObserver;
  });

  afterAll(() => {
    window.IntersectionObserver = tempIntFn;
  });

  it('should render correct menu list', () => {
    // @ts-expect-error undefined text is filtered out
    const rootList: Array<string> = testData
      .filter((datum) => !!datum.text)
      .map((datum) => datum.text);
    const group: Array<MenuItemType> = testData.filter(
      (datum) => !!datum.isGroup
    );
    const submenu: Array<MenuItemType> = testData.filter(
      (datum) => !datum.isGroup && !!datum.children && datum.children.length > 0
    );
    const disabled: Array<MenuItemType> = testData.filter(
      (datum) => datum.disabled
    );
    const { queryByText, queryByRole } = render(
      <Test>
        <IconMenu
          menuList={testData}
          onItemClick={() => {}}
        />
      </Test>
    );

    expect(queryByRole('button')).toBeTruthy();
    expect(queryByText(rootList[0])).toBeNull();

    fireEvent.click(queryByRole('button')!);
    for (const title of rootList) {
      expect(queryByText(title)).toBeTruthy();
    }

    // since group children is not in rootList
    // use function to check for all disabled item

    const checkDisabled = (arr: Array<MenuItemType>) => {
      for (const dis of arr) {
        expect(
          (
            queryByRole('menuitem', {
              name: dis.text,
            }) as HTMLButtonElement
          ).disabled
        ).toBe(true);
      }
    };

    checkDisabled(disabled);

    // check submenu works
    for (const sub of submenu) {
      expect(queryByText(sub.children![0].text!)).toBeNull();
      fireEvent.mouseOver(queryByText(String(sub.text))!);
      for (const subChild of sub.children!) {
        expect(queryByText(subChild.text!)).toBeTruthy();
      }
    }

    // check for group
    for (const g of group) {
      if (g.children) {
        checkDisabled(g.children.filter((datum) => datum.disabled));
        for (const gChild of g.children) {
          expect(queryByText(gChild.text!)).toBeTruthy();
        }
      }
    }
  });

  it('should trigger callback function when clicked', () => {
    const menuSpy = jest.fn();
    const itemSpy = jest.fn();

    const { queryByText, queryByRole } = render(
      <Test>
        <IconMenu
          menuList={[testData[0], { ...testData[1], onClick: itemSpy }]}
          onItemClick={menuSpy}
        />
      </Test>
    );

    // open menu
    fireEvent.click(queryByRole('button')!);

    // should trigger onItemClick
    fireEvent.click(queryByText(testData[0].text!)!);
    expect(menuSpy).toHaveBeenCalledWith({
      clickedItem: {
        text: testData[0].text,
        id: testData[0].id,
      },
    });

    // should trigger onItemClick and onClick of item
    fireEvent.click(queryByText(testData[1].text!)!);
    expect(menuSpy).toHaveBeenCalledWith({
      clickedItem: {
        text: testData[1].text,
        id: testData[1].id,
      },
    });
    expect(itemSpy).toHaveBeenCalled();
  });
});

// click trigger icon and menu item should close the drop down menu
// it doesn't happened in test
// thus menu close behavior is not tested...
