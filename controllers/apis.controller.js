const ITEM = require("../models/items.model")

async function handleGetItems(req, res) {
    try {
        const { search, page = 1, limit = 10, all } = req.query
        const query = search ? { name: RegExp(search, 'i') } : {}

        if (all == 'true') {
            const items = await ITEM.find({}).select('-_id')
            return res.status(200).json({ data: items })
        }

        const items = await ITEM.find(query).skip(((page - 1) * limit)).limit(Number(limit)).select('-_id')

        if (!items) return res.status(500).json({ message: "Failed to get Items" })

        return res.status(200).json({ data: items })
    } catch (error) {
        console.log('Error in handleGetAllItems Controller, Error: ', error)
        return res.status(500).json({ sucess: false, message: 'Internal Server Error', error })
    }
}

async function handleGetItemById(req, res) {
    try {
        const itemId = req.params.itemId;
        const item = await ITEM.findOne({ itemId }).select('-_id')
        if (!item) return res.status(404).json({ sucess: false, message: `Can't find item with itemId ${itemId}` })
        return res.status(200).json({ sucess: true, item })
    } catch (error) {
        console.log('Error in handleGetItemById Controller, Error: ', error)
        return res.status(500).json({ sucess: false, message: 'Internal Server Error' })
    }
}

async function handleCreateItem(req, res) {
    try {
        const { name, description, price, quantity, itemId } = req.body;
        const newItem = new ITEM({
            itemId,
            name,
            description,
            quantity,
            price
        })
        const savedItem = await newItem.save()
        const { _id, ...itemWithoutId } = savedItem.toObject();
        res.status(201).json({ sucess: true, message: 'Item Created Sucessfully.', data: itemWithoutId })
    } catch (error) {
        console.log('Error in setData Controller, Error: ', error)
        res.status(500).json({ sucess: false, message: 'Internal Server Error', error })
    }
}

async function handleItemDelete(req, res) {
    try {
        const { itemId } = req.body.params;
        const deletedItem = await ITEM.findOneAndDelete({ itemId }).select('-_id');

        if (!deletedItem) res.status(400).json({ sucess: false, message: `Cant Find item with itemId ${itemId}` })

        res.status(200).json({ sucess: true, message: `Item Deleted with itemId ${itemId}`, deletedItem })
    } catch (error) {
        console.log('Error in handleItemDelete Controller, Error: ', error)
        res.status(500).json({ sucess: false, message: 'Internal Server Error', error })
    }
}

async function handleUpdateItem(req, res) {
    try {
        const itemId = req.params.itemId;
        console.log(req.body)
        const updatedItem = await ITEM.findOneAndUpdate({ itemId }, req.body, { new: true }).select('-_id')
        res.status(200).json({ sucess: true, message: `Item Data Got it`, updatedItem })
    } catch (error) {
        console.log('Error in handleUpdateItem Controller, Error: ', error)
        res.status(500).json({ sucess: false, message: 'Internal Server Error', error })
    }
}

module.exports = {
    handleGetItems,
    handleGetItemById,
    handleCreateItem,
    handleItemDelete,
    handleUpdateItem
}