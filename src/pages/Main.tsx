import React from 'react';
import IconMenu from '../components/IconMenu';
import { UserTeamIcon } from '@tonic-ui/react-icons';
import { testData } from '../data';

const Main = () => {
  return (
    <div id="main">
      <IconMenu
        Icon={UserTeamIcon}
        onItemClick={({ clickedItem }) =>
          console.log(clickedItem.text, 'clicked')
        }
        menuList={testData.slice(0, 3)}
      />
    </div>
  );
};

export default Main;
