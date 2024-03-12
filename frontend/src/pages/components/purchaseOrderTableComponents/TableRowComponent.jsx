// TableRow.js
import React from 'react';
import { rowConfig } from '../../config/purchaseOrderTableConfig';

const TableRow = ({ item, onQuantityChange }) => {
  return (
    <tr>
      {rowConfig.map((column, index) => (
        <td key={index}>
          {column.component ? (
            // If a custom component is specified, render it with its configuration
            React.createElement(column.component, { item, onQuantityChange, config: column.componentConfig })
          ) : (
            // Otherwise, display the text
            item[column.key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
