// NewFormPopup.js

// import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import ReactToPrint from 'react-to-print';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "../App.css";
import '../SearchFilter.css'; // Import styles for SearchFilter component
import '../Table.css'; // Import styles for Table component
import SearchFilter from './SearchFilter';
import Table from './Table';
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import jspdf-autotable for table generation
import "../Print.css"; // Import your Print.css file
import axios from 'axios';
import React, { useState, useEffect } from "react";

const baseURL = "http://localhost:8080/commitions";

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
}

function NewFormPopup({ isOpen, onClose, onSave, isEditMode, editFormData }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [paidTo, setPaidTo] = useState("");
    const [iNo, setINo] = useState(""); // Add other relevant fields here
    const [sDisRe, setSDisRe] = useState("");
    const [cusDet, setCusDet] = useState("");
    const [com, setCom] = useState("");
    const [comAmt, setComAmt] = useState("");
    const [totalCommitionAmt, setTotalCommitionAmt] = useState("");
    const [createdAt, setCreatedAt] = useState(getDate());
    const [commitionData, setCommitionData] = useState([]);
    const [refNumber, setRefNumber] = useState(getLastRefNumber());

    useEffect(() => {
        if (isEditMode && editFormData) {
            setPaidTo(editFormData.paidTo);
            setINo(editFormData.iNo);
            setSDisRe(editFormData.sDisRe);
            setCusDet(editFormData.cusDet);
            setCom(editFormData.com);
            setComAmt(editFormData.comAmt);
            setTotalCommitionAmt(editFormData.totalCommitionAmt);
            
            // Set selectedItems to the previously selected invoices
            setSelectedItems(editFormData.selectedItems);
        } else {
            setSelectedItems([]); // Clear selectedItems in case it's not an edit mode
        }
    
        axios.get(baseURL)
            .then(function (response) {
                setCommitionData(response.data.commition);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [isEditMode, editFormData]);
    

    const handleSelect = (item) => {
        setSelectedItems([...selectedItems, item]);
    }

    const handleSave = () => {
        const newFormData = {
            paidTo,
            iNo,
            com,
            comAmt,
            sDisRe,
            cusDet,
            refNumber,
            tradeCommitionDate: createdAt,
            totalCommitionAmt,
            selectedItems,
        };

        axios.post(baseURL, newFormData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        onSave(newFormData, totalCommitionAmt, isEditMode);

        const nextRefNumber = incrementRefNumber(refNumber);
        setRefNumber(nextRefNumber);

        
        setPaidTo("");
        onClose();
    };

    const handleClose = () => {
        setPaidTo("");
        onClose();
    };

    const incrementRefNumber = (ref) => {
        const numericPart = parseInt(ref.split("/")[2], 10);
        const nextNumericPart = (numericPart + 1).toString().padStart(4, '0');
        return `I/COM/${nextNumericPart}`;
    }

    function getLastRefNumber() {
        if (isEditMode && editFormData && editFormData.refNumber) {
            return editFormData.refNumber;
        } else {
            const lastRefNumber = localStorage.getItem("lastRefNumber");
            if (lastRefNumber) {
                return lastRefNumber;
            }
            return "I/COM/0001";
        }
    }

    useEffect(() => {
        localStorage.setItem("lastRefNumber", refNumber);
    }, [refNumber]);

    const handlePaidToChange = (event) => {
        setPaidTo(event.target.value);
    };

    const handlePrint = () => {
        const doc = new jsPDF({
            orientation: "landscape",
        });
        doc.setFontSize(8);
        doc.text('Trade Commissions', 10, 10);
        doc.text('REF #: ' + refNumber, 10, 15);
        doc.text('Date: ' + createdAt, 10, 20);
        doc.text('Paid to: ' + paidTo, 10, 25);

        doc.autoTable({
            styles: { cellWidth: 'wrap', fontSize: 7 },
            headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1 },
            footStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1 },
            html: '#saldt', // You need to replace this with the actual HTML content or data you want to print as a table
            startY: 30,
            showHead: 'everyPage',
            showFoot: 'lastPage',
            margin: { left: 7 },
            theme: 'grid',
        });

        doc.output('dataurlnewwindow');
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
            <DialogTitle>Create New Form</DialogTitle>
            <DialogContent style={{ maxHeight: "1000px", maxWidth: "1000px" }}>
                <h4>Search and Select Invoice</h4>
                <SearchFilter data={commitionData} onSelect={handleSelect} />
                <h4>Ref# : {refNumber}</h4>
                <h4>Date : {createdAt}</h4>
                <h4>Paid To : <input type="text" name="name" value={paidTo} onChange={handlePaidToChange} /></h4>
                <Table selectedItems={selectedItems} setCom={setCom} setComAmt={setComAmt} setTotalCommitionAmt={setTotalCommitionAmt}/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={handleSave}>
                    Save
                </Button>
                <Button variant="contained" onClick={handlePrint}>
                    Print
                </Button>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewFormPopup;


