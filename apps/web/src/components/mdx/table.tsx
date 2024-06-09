import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@tszhong0411/ui'

type TableProps = {
  headers: string[]
  rows: string[][]
}

const Table = (props: TableProps) => {
  const { headers, rows } = props

  return (
    <UITable className='not-prose'>
      <TableHeader>
        <TableRow>
          {headers.map((header, i) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key -- it's static
            <TableHead key={`${i}`}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key -- it's static
          <TableRow key={i}>
            {row.map((cell, j) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- it's static
              <TableCell key={j}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  )
}

export default Table
