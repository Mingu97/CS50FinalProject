import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import generatePDF from '../pdfGeneration/generatePDF';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL


const getAuthToken = () => {
  // Implement the logic to retrieve the token from where it's stored (e.g., cookies, local storage)
  return Cookies.get('myAppCookie') ? JSON.parse(Cookies.get('myAppCookie')).token : null;
};

function SavePOButton({ onSavePO, selectedItems, isEmpty }) {
  const token = getAuthToken(); // Implement a function to get the authentication token from where you store it (e.g., cookies, local storage)
  const [isSavePOButtonDisabled, setSavePOButtonDisabled] = useState(false);
  // Example function to get the authentication token
  const navigate = useNavigate();

  console.log(token)

  const handleSavePO = async () => {
    setSavePOButtonDisabled(true);

    if (selectedItems && Array.isArray(selectedItems) && selectedItems.length > 0) {
      try {
        // Create an array to store items
        const itemsArray = [];

        // Loop through selectedItems and populate the itemsArray
        for (const selectedItem of selectedItems) {
          const item = {
            supplierProductCode: selectedItem['Supplier Product Code'],
            brand: selectedItem['Brand'],
            description: selectedItem['Description'],
            itemCode: selectedItem['Item Code'],
            itemQuantity: selectedItem['Item Quantity'],
          };

          // Add the item to the array
          itemsArray.push(item);
        }

        // Create the object with the items array
        const purchaseOrder = {
          items: itemsArray,
        };

        // Call the provided callback to save the PO
        await onSavePO(purchaseOrder);

        const token = getAuthToken();

        console.log('Token before submission:', token);

        console.log('All items saved successfully');
        // Clear the session after successfully saving the PO
        const clearSessionResponse = async () => {
          try {
            const response =
              await axios.post(
                `${API_BASE_URL}api/purchase-order/clear-session`,
                null,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                  withCredentials: true,
                }
              );
            // Check if the 'clearSession' property exists in the response data
            if ('clearSession' in response.data) {
              console.log("Response of Clear Session: " + response.data.clearSession);
              localStorage.removeItem('selectedItems');
              return true;
            } else {
              return false;
            }

          }
          catch (err) {
            console.log('Clear Session Response:', err);
            return false
          }

        }

        const isSessionCleared = await clearSessionResponse()

        if (isSessionCleared) {

          // Send the POST request with the structured purchaseOrder object
          const response = await axios.post(
            `${API_BASE_URL}api/purchase-order/submit`,
            purchaseOrder,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (response.status === 201) {
            // Display a success notification
            toast.success('Purchase Order created successfully', {
              position: 'top-right',
              autoClose: 3000, // Close the notification after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              onClose: () => {
                navigate('/all-products');
              }
            })
          }
          else {
            console.error('Error:', response.data.message);
            // Handle error as needed
          }

          ;
          // Generate and save the PDF
          await generatePDF('purchaseOrderTable', 'Purchase Order', selectedItems);
        }
        else {
          toast.error('Purchase Order was not created successfully', {
            position: 'top-right',
            autoClose: 3000, // Close the notification after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => {
              navigate('/purchase-order');
              setSavePOButtonDisabled(false);

            }
          })
          return console.log("Session not cleared")
        }


      } catch (error) {
        console.error('Error:', error.message);
        // Handle error as needed
      }
    } else {
      console.error('Invalid or empty selectedItems.');
    }

  };


  return (
    <>
      <Button variant="success" onClick={handleSavePO} disabled={isSavePOButtonDisabled || isEmpty}>
        Save PO and Generate PDF
      </Button>
    </>
  );
}

// TODO CREATE PO JSON OBJECT AND SEND TO API

export default SavePOButton;
