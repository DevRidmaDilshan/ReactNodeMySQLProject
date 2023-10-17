import React, { useState, useEffect } from 'react';

function Table({ selectedItems, setCom, setComAmt, CommitionAmt,setTotalCommitionAmt}) {
  const [editableCommitions, setEditableCommitions] = useState(
    new Map(selectedItems.map((item) => [item.id, item.com]))
  );

  const handleCommitionChange = (itemId, newValue) => {
    setEditableCommitions((prevCommitions) => {
      const newCommitions = new Map(prevCommitions);
      newCommitions.set(itemId, newValue);
      setCom(newValue)
      return newCommitions;
    });
  };

  // Calculate total Commition Amt
  const totalCommitionAmt = selectedItems.reduce((total, item) => {
    const commitionPercent = editableCommitions.get(item.id) || 0;
    setComAmt(((commitionPercent / 100) * item.nvia))
    setTotalCommitionAmt(total + ((commitionPercent / 100) * item.nvia))
    return total + ((commitionPercent / 100) * item.nvia);
  }, 0);

  return (
    <div>
      <table id="saldt">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Invoice Date</th>
            <th>Customer Details</th>
            <th>Net of Vat Invoice Amt</th>
            <th>Special Discount</th>
            <th>Special Discount Reason</th>
            <th>Commition %</th>
            <th>Commition Amt</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.iNo}</td>
              <td>{item.iDate}</td>
              <td>{item.cusDet}</td>
              <td>{item.nvia}</td>
              <td>{item.sDis}</td>
              <td>{item.sDisRe}</td>
              <td>
                <input
                  type="number"
                  value={editableCommitions.get(item.id) || ''}
                  onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    handleCommitionChange(item.id, newValue);
                  }}
                />
              </td>
              <td>
                {((editableCommitions.get(item.id) / 100) * item.nvia).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="7"></td>
            <td>
              <strong>Total Commition Amt:{totalCommitionAmt.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <strong>Total Commition Amt:</strong> {totalCommitionAmt.toFixed(2)}
      </div>
    </div>
  );
}

export default Table;
