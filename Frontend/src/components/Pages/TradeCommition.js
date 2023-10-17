import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button } from "@mui/material";
import NewFormPopup from "../NewFormPopup.js";
import TablePagination from "@mui/material/TablePagination";

const baseURL = "http://localhost:8080/commitions";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
}

function TradeCommition() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [{ createdAt }, setCreatedAt] = useState(getDate());
  const [refNumber, setRefNumber] = useState(1);
  const [formData, setFormData] = useState([]);
  const [totalCommitionAmt, setTotalCommitionAmt] = useState(0);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [records, setTableData] = useState([]);
  const [first, setFirst] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7); // Load 6 rows per page

  // const fetchRecords = async () => {
  //   const response = await axios.get(baseURL);
  //   setTableData(response.data.tradecommition);
  // };
  const fetchRecords = async () => {
    const response = await axios.get(baseURL);
    setTableData(response.data.tradecommition);
    setFormData(response.data.tradecommition); // Update formData with the fetched data
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleNewFormClick = () => {
    setPopupOpen(true);
  };

  const handleEditForm = (editedData) => {
    const updatedFormData = formData.map((data) => {
      if (data.refNumber === editedData.refNumber) {
        // Replace the edited entry with the updated data
        return editedData;
      }
      return data;
    });

    setIsEditMode(false); // Exit edit mode
  };

  const handleSaveForm = (newFormData, newTotalCommitionAmt) => {
    if (isEditMode) {
      // Update the existing form data
      const updatedData = formData.map((data) =>
        data.refNumber === newFormData.refNumber ? { ...data, ...newFormData } : data
      );
      setFormData(updatedData);
    } else {
      // Increment the reference number for a new form
      const incrementedRefNumber = `I/COM/${(refNumber + 1).toString().padStart(4, '0')}`;
      setRefNumber(refNumber + 1);
      setFormData([...formData, newFormData]);
    }

    setTotalCommitionAmt(newTotalCommitionAmt);
    setPopupOpen(false);
  };

  const onPageChange = (e) => {
    setFirst(e.first);
  };

  const getVisibleRecords = () => {
    const firstRecord = first;
    const lastRecord = first + rowsPerPage;
    return records.slice(firstRecord, lastRecord);
  };

  const handleChangePage = (event, newPage) => {
    setFirst(newPage * rowsPerPage);
  };

  return (
    <div>
      <h2>Trade Commitions Page</h2>
      <Button variant="contained" onClick={handleNewFormClick}>
        New Form
      </Button>
      <NewFormPopup
        isOpen={isPopupOpen || isEditFormOpen}
        onClose={() => {
          setPopupOpen(false);
          setEditFormOpen(false);
          setEditFormData(null);
        }}
        onSave={isEditMode ? handleEditForm : handleSaveForm}
        totalCommitionAmt={totalCommitionAmt}
        editFormData={editFormData}
        isEditMode={isEditMode}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Paid To</th>
            <th>Ref #</th>
            <th>Trade Commition Date</th>
            <th>Total Commition Amt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getVisibleRecords().map((tradecom) => (
            <tr key={tradecom.id}>
              <td>{tradecom.paidTo}</td>
              <td>{tradecom.refNumber}</td>
              <td>{tradecom.tradeCommitionDate}</td>
              <td>{tradecom.totalCommitionAmt}</td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setEditFormData(tradecom);
                    setEditFormOpen(true);
                    setIsEditMode(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TablePagination
        component="div"
        count={records.length}
        page={first / rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[7, 14, 21]} // You can customize this to include more options
        // onRowsPerPageChange can be added if you want to handle changes
      />
    </div>
  );
}

export default TradeCommition;

