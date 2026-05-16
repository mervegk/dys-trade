'use client'

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { useQuery } from '@tanstack/react-query';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Payment = {
  id: number;
  date: string;
  grossAmount: number;
  taxDeduction: number;
  commissionDeduction: number;
  netAmount: number;
};

export default function Payments() {
  const activeCompany = useSelector(
    (state: RootState) => state.auth.activeCompany
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['company-payments', activeCompany],

    queryFn: async () => {

      /*
       **Backend hazır olduğunda kullanılacak kısım**
         const res = await fetch(
         `/data/companies/${activeCompany}.json`
       ); */
      const res = await fetch('/data/companies.json');

      if (!res.ok) {
        throw new Error('Veriler çekilemedi');
      }

      //Backend hazır olduğunda find kısmı kalkacak
      const json = await res.json();
      const company = json.companies.find(
        (company: any) => company.id === activeCompany
      );

      //Bu kısım da return company; olacak
      return company;
    },

    enabled: !!activeCompany,
  });

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'date',
      header: 'Tarih',
    },
    {
      accessorKey: 'grossAmount',
      header: 'Brüt Tutar',
      cell: ({ row }) =>
        `₺${row.original.grossAmount.toLocaleString('tr-TR')}`,
    },
    {
      accessorKey: 'taxDeduction',
      header: 'Vergi Kesintisi',
      cell: ({ row }) =>
        `₺${row.original.taxDeduction.toLocaleString('tr-TR')}`,
    },
    {
      accessorKey: 'commissionDeduction',
      header: 'Komisyon',
      cell: ({ row }) =>
        `₺${row.original.commissionDeduction.toLocaleString(
          'tr-TR'
        )}`,
    },
    {
      accessorKey: 'netAmount',
      header: 'Net Tutar',
      cell: ({ row }) =>
        `₺${row.original.netAmount.toLocaleString('tr-TR')}`,
    },
  ];

  const table = useReactTable({
    data: data?.payments ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="p-4">
        Ödemeler yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Bir hata oluştu.
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-4 gap-4 py-4">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-zinc-500">
            Toplam Brüt
          </p>

          <h3 className="text-xl font-semibold">
            ₺
            {data?.paymentSummary?.totalGrossAmount?.toLocaleString(
              'tr-TR'
            )}
          </h3>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-zinc-500">
            Vergi Kesintisi
          </p>

          <h3 className="text-xl font-semibold">
            ₺
            {data?.paymentSummary?.totalTaxDeduction?.toLocaleString(
              'tr-TR'
            )}
          </h3>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-zinc-500">
            Komisyon Kesintisi
          </p>

          <h3 className="text-xl font-semibold">
            ₺
            {data?.paymentSummary?.totalCommissionDeduction?.toLocaleString(
              'tr-TR'
            )}
          </h3>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm text-zinc-500">
            Net Kazanç
          </p>

          <h3 className="text-xl font-semibold">
            ₺
            {data?.paymentSummary?.totalNetAmount?.toLocaleString(
              'tr-TR'
            )}
          </h3>
        </div>
      </div>

      <table className="w-full border-collapse border border-zinc-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-3 bg-zinc-100 text-left"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border p-3"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}