import asyncHandler from 'express-async-handler';
import { commition } from '../models/commition.model.js';
import { tradecommition } from '../models/tradecommition.model.js'
import { connectDB1 } from '../config/dbGl.js';

// Create 
const createCommition = async (req, res) => {


  // iNo = selectedItems.iNo
  try {

    const {
      
      paidTo,
      com,
      comAmt,
      refNumber,
      tradeCommitionDate: createdAt,
      totalCommitionAmt,
      
      
    } = req.body;

    const comId = JSON.stringify(req.body.selectedItems.map(item => item.id));




    // const iNo = JSON.stringify(req.body.selectedItems);
    // console.log("///////////////////////////////")
    // console.log(iNo)
    // console.log("///////////////////////////////")

    // const iNo = selectedItems.iNo;

    // newCommition.iNo = iNo;
    const newCommition = await tradecommition.create({
      paidTo,
      com,
      comAmt,
      refNumber,
      tradeCommitionDate: createdAt,
      totalCommitionAmt,
      comId,
      
    });

    // newCommition.iNo = req.body.selectedItems.iNo;

    console.log(newCommition);

    // Check if the entry was successfully created
    if (newCommition) {

      return res.status(201).json({
        entry: newCommition,

      });

    } else {
      res.status(400).json({ error: 'Invalid Data' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error creating commition', details: error.message });
  }
};



// Get all
const getAllCommitions = async (req, res) => {
  try {
    const commitionData = await commition.findAll();
    const tradecomData = await tradecommition.findAll();

    const response = {
      commition: commitionData,
      tradecommition: tradecomData
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
};


// Get one
const getCommitionById = async (req, res) => {
  const { table, id } = req.params;

  try {
    let foundData;

    if (table === 'commition') {
      foundData = await commition.findByPk(id);
    } else if (table === 'tradecom') {
      foundData = await tradecommition.findByPk(id);
    } else {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    if (!foundData) {
      return res.status(404).json({ error: `${table} not found` });
    }

    return res.status(200).json(foundData);
  } catch (error) {
    return res.status(500).json({ error: `Error fetching ${table}`, details: error.message });
  }
};


// Update
const updateCommition = async (req, res) => {
  const { id } = req.params;
  try {
    const { paidTo, com, comAmt, refNumber, tradeCommitionDate, totalCommitionAmt, comId } = req.body;

    // Check if the commition with the given ID exists
    const existingCommition = await tradecommition.findByPk(id);

    if (!existingCommition) {
      return res.status(404).json({ error: 'Commition not found' });
    }

    // Update the commition using the new data
    const updatedCommition = await tradecommition.update(
      {
        paidTo,
        com,
        comAmt,
        refNumber,
        tradeCommitionDate,
        totalCommitionAmt,
        comId,
      },
      { where: { id } }
    );

    // Check if the commition was successfully updated
    if (updatedCommition[0] === 1) {
      return res.status(200).json({ message: 'Commition updated successfully' });
    } else {
      return res.status(500).json({ error: 'Error updating commition' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error updating commition', details: error.message });
  }
};


// Delete 
const deleteCommition = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCommition = await commition.destroy({ where: { id } });
    if (deletedCommition === 0) {
      return res.status(404).json({ error: 'Commition not found' });
    }
    return res.status(200).json({ message: 'Commition deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting commition', details: error.message });
  }
};

export { createCommition, getAllCommitions, getCommitionById, updateCommition, deleteCommition };

