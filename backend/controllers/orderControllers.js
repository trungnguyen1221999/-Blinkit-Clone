import { OrderModels } from '../models/orderModels.js';

// Create Order
export const createOrder = async (req, res) => {
  try {
    // Cho phép tạo đơn hàng với userId hoặc guestId
    const { userId, guestId, ...rest } = req.body;
    if (!userId && !guestId) {
      return res.status(400).json({ error: 'userId or guestId is required' });
    }
    const order = new OrderModels({ userId, guestId, ...rest });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
  try {
    // Có thể lọc theo userId hoặc guestId nếu truyền query
    const { userId, guestId } = req.query;
    let filter = {};
    if (userId) filter.userId = userId;
    if (guestId) filter.guestId = guestId;
    const orders = await OrderModels.find(filter).populate('userId productId delivery_address');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Order
export const getOrder = async (req, res) => {
  try {
    const order = await OrderModels.findById(req.params.id).populate('userId productId delivery_address');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Order
export const updateOrder = async (req, res) => {
  try {
    const order = await OrderModels.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModels.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
