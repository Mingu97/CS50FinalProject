import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PurchaseOrderTable from './components/purchaseOrderTableComponents/PurchaseOrderTable';


const PurchaseOrders = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    let storedItems = localStorage.getItem('selectedItems');
    if (storedItems === null || storedItems === "undefined") {
      localStorage.clear();
      storedItems = '[]'; // Set a default value if needed
    }
  
    try {
      const parsedItems = JSON.parse(storedItems);
      setSelectedItems(parsedItems);
      console.log(parsedItems);
    } catch (error) {
      console.error('Error parsing stored items:', error);
    }
  }, []);
  

  const handleQuantityChange = (item, newQuantity) => {
    // Update the quantity of the specific item in the state
    const updatedItems = selectedItems.map((selectedItem) => {
      if (selectedItem['Item Code'] === item['Item Code']) {
        return { ...selectedItem, "Item Quantity": newQuantity };
      }
      return selectedItem;
    });

    // Update the state with the modified items
    setSelectedItems(updatedItems);

    // Update local storage with the modified items
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  };
  const handleRemoveAll = () => {
    // Clear the selected items from local storage and reset the state
    localStorage.removeItem('selectedItems');
    setSelectedItems([]);
  };
  const handleSavePO = (savedPO) => {
    // Log the saved PO object for now
    console.log('Saved Purchase Order:', savedPO);
  };

  return (
    <PurchaseOrderTable
      selectedItems={selectedItems}
      onQuantityChange={handleQuantityChange}
      onRemoveAll={handleRemoveAll}
      onSavePO={handleSavePO}
    />
  );
};

export default PurchaseOrders;
