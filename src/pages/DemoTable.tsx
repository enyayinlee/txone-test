import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import React, { useMemo } from 'react';
import IconMenu from '../components/IconMenu';
import { testData } from '../data';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  {
    id: 2,
    eventType: 'Spyware/Grayware',
    affectedDevices: 20,
    detections: 634,
  },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  {
    id: 6,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
  },
];

const DemoTable = () => {
  const [colorStyle] = useColorStyle();
  const columns = useMemo(
    () => [
      {
        header: 'Event Type',
        accessorKey: 'eventType',
        size: 240,
      },
      {
        header: 'Affected Devices',
        accessorKey: 'affectedDevices',
        size: 150,
        style: {
          textAlign: 'right',
        },
      },
      {
        header: 'Detections',
        accessorKey: 'detections',
        size: 150,
        style: {
          textAlign: 'right',
        },
      },
    ],
    []
  );

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

  return (
    <Table layout={layout}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.accessorKey}>
              <Truncate>{column.header}</Truncate>
              <IconMenu
                onItemClick={({ clickedItem }) =>
                  console.log(clickedItem.text, 'clicked')
                }
                menuList={testData}
              />
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            _hover={{
              backgroundColor: colorStyle.background.highlighted,
            }}>
            <TableCell>
              <Truncate>{row.eventType}</Truncate>
            </TableCell>
            <TableCell>
              <Truncate>{row.affectedDevices}</Truncate>
            </TableCell>
            <TableCell>
              <Truncate>{row.detections}</Truncate>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DemoTable;
