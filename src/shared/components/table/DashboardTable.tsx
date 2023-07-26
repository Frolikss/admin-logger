import { Table, flexRender } from '@tanstack/react-table';
import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';

interface Props<T> {
  table: Table<T>;
  setSelectedRow?: Dispatch<SetStateAction<number>>;
}

export const DashboardTable = <T,>({ table, setSelectedRow }: Props<T>) => {
  return (
    <table className="w-full">
      <thead className="text-xs 2xl:text-xl border-b-2">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="font-normal p-2 first:text-left">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={cn(
              'transition-all text-base 2xl:text-xl text-center whitespace-nowrap [&:not(:last-child)]:border-b-1',
              {
                'hover:bg-blue-400 cursor-pointer': setSelectedRow
              }
            )}
            onClick={() => setSelectedRow && setSelectedRow(row.index)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 first:text-left">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
