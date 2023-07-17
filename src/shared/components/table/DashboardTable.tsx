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
      <thead className="bg-gray-400">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="font-normal p-2 [&:not(:last-child)]:border-r-2">
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
            className={cn('even:bg-violet-200 transition-all', {
              'hover:bg-violet-400 cursor-pointer': setSelectedRow
            })}
            onClick={() => setSelectedRow && setSelectedRow(row.index)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-center p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
