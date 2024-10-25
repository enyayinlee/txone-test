import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Space,
  Text,
} from '@tonic-ui/react';
import React from 'react';
import IconMenu from '../components/IconMenu';
import { testData } from '../data';

const DemoModal = () => {
  return (
    <ModalContent width={480}>
      <ModalHeader>Modal Demo</ModalHeader>
      <ModalBody>
        <Text mb="4x">
          {`So I could not find a way to bypass the "overflow: clip" set in Modal without overwriting the css. Menu is clipped QQ`}
        </Text>
        <IconMenu
          onItemClick={({ clickedItem }) =>
            console.log(clickedItem.text, 'clicked')
          }
          menuList={testData}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          variant="primary"
          minWidth="20x">
          Save Changes
        </Button>
        <Space width="2x" />
        <Button minWidth="20x">Cancel</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default DemoModal;
