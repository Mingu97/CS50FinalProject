import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import TableHeader from './components/purchaseOrderTableComponents/TableHeaderComponent';
import { getAuthToken } from './components/api';
import PurchaseOrderModal from './modals/PurchaseOrdersModal';
import './css/MyPurchaseOrders.css'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MyPurchaseOrdersComponent = () => {
  const [selectedPOs, setSelectedPOs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortColumn, setSortColumn] = useState('purchaseDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const token = getAuthToken();

// To generalise the My PO Component

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSort = (column) => {
    // Toggle the sort order if the same column is clicked again
    setSortOrder((prevSortOrder) =>
      column === sortColumn ? (prevSortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    );
    setSortColumn(column);
  };

  useEffect(() => {
    const fetchUserPOs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}api/purchase-order/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        let data = await response.json();

        console.log('Data before sorting:', data); // Log data before sorting

        data = data.sort((a, b) => {
          if (sortColumn === 'Purchase Order Date Created') {
            const valueA = parseDate(a.purchaseDate);
            const valueB = parseDate(b.purchaseDate);

            console.log('Comparing values:', valueA, valueB);

            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
          } else if (sortColumn === 'Purchase Order ID') {
            // Explicitly handle string comparison for purchase order IDs
            const idA = a._id.toString();
            const idB = b._id.toString();

            return sortOrder === 'asc' ? idA.localeCompare(idB) : idB.localeCompare(idA);
          }

          return 0;
        });

        console.log('Data after sorting:', data); // Log data after sorting

        setSelectedPOs([...data]); // Use the spread operator to create a new array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const parseDate = (dateString) => {
      const match = dateString.match(/(\d{1,2}) (\w+) (\d{4}) at (\d{1,2}:\d{2}:\d{2} [APMapm]{2})/);

      if (!match) {
        return 0; // Return 0 for invalid dates
      }

      const [, day, month, year, time] = match;
      const monthIndex = new Date(`${month} 1, 2022`).getMonth();

      const date = new Date(`${year}-${monthIndex + 1}-${day} ${time}`);

      return isNaN(date) ? 0 : date.getTime();
    };

    fetchUserPOs();
  }, [token, sortColumn, sortOrder]);

  return (
    <Container>
      <Table id="myPurchaseOrders">
        <TableHeader
          headers={['Purchase Order ID', 'Purchase Order Date Created']}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
        />
        <tbody>
          {selectedPOs.map((po) => (
            <tr key={po._id}>
              <td>{po._id}</td>
              <td>{po.purchaseDate}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(po.items)}>
                  View Items
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Render the modal for the selected item */}
      {selectedItem && (
        <PurchaseOrderModal
          show={showModal}
          handleClose={handleCloseModal}
          purchaseOrderItems={selectedItem}
        />
      )}
    </Container>
  );
};

export default MyPurchaseOrdersComponent;
