const express = require('express');
const router = express.Router()
const {
    handleGetItems,
    handleCreateItem,
    handleItemDelete,
    handleGetItemById,
    handleUpdateItem
} = require('../controllers/apis.controller');


// Get Items
router.get('/items', handleGetItems)
router.get('/items/:itemId', handleGetItemById)

// Create items
router.post('/items/create', handleCreateItem)

// Delete Items 
router.post('/items/:itemId', handleItemDelete)

//Update items
router.patch('/items/:itemId', handleUpdateItem)

module.exports = router;