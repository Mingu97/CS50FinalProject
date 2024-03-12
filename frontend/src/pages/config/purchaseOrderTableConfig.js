// purchaseOrderTableConfig.js
import ItemQuantityInput from "../components/purchaseOrderTableComponents/ItemQuantityInput";
export const tableConfig = {
  headers: ['Supplier Product Code', 'Brand', 'Description', 'Item Code', 'Item Quantity'],
  maxWidth: '800px',
  title: 'Purchase Order',
  containerStyle: {
    fontFamily: 'Montserrat',
    color: '#10656d',
  },
};

export const rowConfig = [
  { key: 'Supplier Product Code', label: 'Supplier Product Code' },
  { key: 'Brand', label: 'Brand' },
  { key: 'Description', label: 'Description' },
  { key: 'Item Code', label: 'Item Code' },
  { key: 'Item Quantity', label: 'Item Quantity', component: ItemQuantityInput, componentConfig: {} },
];
