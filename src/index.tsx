import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  TonicProvider,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@tonic-ui/react';
import './index.scss';
import Main from './pages/main';
import Corner from './pages/Corner';
import DemoTable from './pages/DemoTable';
import DemoModal from './pages/DemoModal';

// @ts-expect-error root is defined in file
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TonicProvider
      colorMode={{
        defaultValue: 'light',
      }}>
      <Tabs>
        <TabList>
          <Tab>Main</Tab>
          <Tab>Corner</Tab>
          <Tab>Modal</Tab>
          <Tab>Table</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Main />
          </TabPanel>
          <TabPanel>
            <Corner />
          </TabPanel>
          <TabPanel>
            <DemoModal />
          </TabPanel>
          <TabPanel>
            <DemoTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TonicProvider>
  </StrictMode>
);
