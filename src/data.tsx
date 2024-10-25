import { UserTeamIcon, LockIcon, SettingsIcon } from '@tonic-ui/react-icons';
import React from 'react';

export const testData = [
  {
    id: 'settings',
    text: 'Settings',
    Icon: <SettingsIcon />,
  },
  { id: 'account', text: 'Account', Icon: <UserTeamIcon /> },
  { id: 'privacy', text: 'Privacy control', Icon: <LockIcon /> },
  {
    id: 'submenu',
    text: 'Submenu',
    children: [{ id: 'test', text: 'Sub button' }],
  },
  {},
  {
    id: 'group',
    text: 'group title',
    Icon: <SettingsIcon />,
    isGroup: true,
    children: [
      { id: 'group-1', text: 'Disabled Group Text 1', disabled: true },
      { id: 'group-2', text: 'Group Text 2' },
      {
        id: 'submenu 2',
        text: 'Submenu 1',
        children: [{ id: 'test1', text: 'yo sub 2' }],
      },
    ],
  },
  { id: 'disabled', text: 'Disabled', disabled: true },
  { id: 'long', text: 'A long long long long long long long label' },
];
