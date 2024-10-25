import React from 'react';
import IconMenu from '../components/IconMenu';
import { UserTeamIcon } from '@tonic-ui/react-icons';
import { Flex, Space } from '@tonic-ui/react';
import { testData } from '../data';

const Menu = () => (
  <IconMenu
    Icon={UserTeamIcon}
    onItemClick={({ clickedItem }) => console.log(clickedItem.text, 'clicked')}
    menuList={testData}
  />
);

const Corner = () => {
  return (
    <div id="corner">
      <Flex
        justifyContent="space-between"
        flexDirection="column">
        <Flex justifyContent="space-between">
          <Menu />
          <Menu />
        </Flex>
        <Space height="64x" />
        <Space height="64x" />
        <Space height="64x" />
        <Flex justifyContent="space-between">
          <Menu />
          <Menu />
        </Flex>
      </Flex>
    </div>
  );
};

export default Corner;
