import type { TableData } from "../utils/types";

type Props = {
  table?: TableData;
  caption?: string;
  className?: string;
};

export function Table({ table, caption, className }: Props) {
  if (!table || table.rows.length === 0 || table.columns.length === 0) {
    return null;
  }

  const { columns, rows } = table;

  return (
    <div
      className={
        "my-6 overflow-x-auto rounded-lg border border-blaze-border " +
        (className ?? "")
      }
    >
      <table className="w-full border-collapse text-left text-sm text-white/85">
        {caption && (
          <caption className="px-4 py-3 text-left text-xs uppercase tracking-wider text-blaze-muted">
            {caption}
          </caption>
        )}
        <thead className="bg-blaze-surface-2">
          <tr>
            {columns.map((col, i) => (
              <th
                key={`${col}-${i}`}
                scope="col"
                className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-white"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-blaze-border bg-blaze-surface">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-blaze-surface-2/60">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 align-top text-blaze-muted"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
