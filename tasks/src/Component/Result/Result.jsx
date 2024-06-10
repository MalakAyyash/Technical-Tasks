import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaCaretSquareUp, FaCaretSquareDown } from 'react-icons/fa';
import './Result.css';

function Result({ winner, score, history }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Player Name',
        accessor: 'playerName',
      },
      {
        Header: 'Cards',
        accessor: 'cards',
      },
      {
        Header: 'Success',
        accessor: 'success',
      },
    ],
    []
  );

  const data = React.useMemo(() => {
    return history.map((entry) => ({
      playerName: entry.player,
      cards: `Open cards ${entry.cards}`,
      success: entry.outcome,
    }));
  }, [history]);

  // Setup table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 }, // Set the number of rows appear at a time to 5
    },
    useSortBy,
    usePagination
  );

  // Render table component
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-center my-4 ">
        <div className="card mb-4 w-50  border-success">
          <div className="card-body text-center">
            <h3 className="card-title">Winner is {winner} </h3>
            <p className="card-text">Number of correct cards</p>
            <p className="border rounded border-success w-25 p-3 d-flex m-auto justify-content-center">
              {score}
            </p>
          </div>
        </div>
      </div>
      <h2 className='permanent-marker-regular'>History</h2>
      <div className="d-flex justify-content-center">
        <table {...getTableProps()} className="table table-striped">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="d-flex justify-content-center">
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaCaretSquareDown />
                          ) : (
                            <FaCaretSquareUp />
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="text-center">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className="d-flex justify-content-center mt-4">
          <button disabled={!canPreviousPage} onClick={() => previousPage()}>
            Previous Page
          </button>
          <button disabled={!canNextPage} onClick={() => nextPage()}>
            Next Page
          </button>
        </div>
        <div>
          <span className="text-light">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Result;
