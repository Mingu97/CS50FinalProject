// PurchaseOrderTable.jsx
import React from 'react';
import Table from 'react-bootstrap/Table';
import TableHeader from './TableHeaderComponent';
import TableRow from './TableRowComponent';
import Container from 'react-bootstrap/Container';
import RemoveAllButton from './RemoveAllButtonComponent';
import SavePOButton from './SavePOButtonComponent';
import { tableConfig } from '../../config/purchaseOrderTableConfig';

const PurchaseOrderTable = ({ selectedItems, onQuantityChange, onRemoveAll, onSavePO }) => {
    const { headers, maxWidth, title, containerStyle } = tableConfig;
  
    return (
      <Container fluid className="d-flex flex-column align-items-center mt-5">
        <h2 style={containerStyle}>{title}</h2>
  
        <Table id="purchaseOrderTable" striped bordered hover style={{ maxWidth }}>
          <TableHeader headers={headers} />
          <tbody>
            {selectedItems.map((item, index) => (
              <TableRow key={index} item={item} onQuantityChange={onQuantityChange} />
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center mt-3">
          <RemoveAllButton onRemoveAll={onRemoveAll} isEmpty={selectedItems.length === 0} />
          <div style={{ marginLeft: '10px' }} />
          <SavePOButton onSavePO={onSavePO} selectedItems={selectedItems} isEmpty={selectedItems.length === 0} />
        </div>
      </Container>
    );
  };
  
  export default PurchaseOrderTable;