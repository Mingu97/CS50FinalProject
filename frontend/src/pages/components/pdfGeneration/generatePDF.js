import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (tableId, pdfTitle, data) => {
  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error('Invalid data type. Expected an array.');
    return;
  }

  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define the PDF title
  pdf.setFontSize(16);
  pdf.text(pdfTitle, 105, 10, 'center');

  // Extract data from the object
  const tableData = data.map((item) => {
    return [
      item['Supplier Product Code'],
      item['Brand'],
      `${item['Description']} ${item['Single Unit Measure']} ${item['Unit of Measure']}`,
      item['Item Code'],
      item['Item Quantity'],
    ];
  });

  // Define column headers
  const headers = ['Supplier Product Code', 'Brand', 'Description', 'Item Code', 'Item Quantity'];

  // Set table column widths
  const columnWidths = [30, 30, 70, 30, 20];

  // Build the table
  pdf.autoTable({
    startY: 20,
    head: [headers],
    body: tableData,
    theme: 'striped',
    styles: { fontSize: 10, halign: 'center', valign: 'middle' },
    columnStyles: {
      0: { cellWidth: columnWidths[0] },
      1: { cellWidth: columnWidths[1] },
      2: { cellWidth: columnWidths[2] },
      3: { cellWidth: columnWidths[3] },
      4: { cellWidth: columnWidths[4] },
    },
  });

  // Save or display the PDF
  pdf.save('purchase_order.pdf');
};

export default generatePDF;
