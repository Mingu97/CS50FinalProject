import React from 'react';

const TableHeader = ({ headers, onSort, sortColumn, sortOrder }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {header}
              {onSort && (
                <button
                  onClick={() => onSort(header)}
                  style={{
                    marginLeft: '5px',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1em',
                    outline: 'none',
                    color: '#007bff',
                  }}
                >
                  {sortColumn === header ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
