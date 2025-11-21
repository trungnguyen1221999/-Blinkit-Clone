import { CartProductModels } from '../models/cartProductModel.js';

// Thêm sản phẩm vào giỏ (userId hoặc guestId)
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, userId, guestId } = req.body;
    const ownerId = userId || guestId;
    if (!productId || !ownerId) {
      return res.status(400).json({ message: 'Thiếu productId hoặc user/guest id' });
    }
    let cartItem = await CartProductModels.findOne({ productId, userId: ownerId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartProductModels.create({ productId, quantity, userId: ownerId });
    }
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm vào giỏ', error: err.message });
  }
};

// Lấy giỏ hàng theo userId hoặc guestId
export const getCart = async (req, res) => {
  try {
    const { userId, guestId } = req.query;
    const ownerId = userId || guestId;
    if (!ownerId) return res.status(400).json({ message: 'Thiếu user/guest id' });
    // Sử dụng populate để trả về đầy đủ thông tin sản phẩm trong giỏ hàng
    const cart = await CartProductModels.find({ userId: ownerId }).populate({
      path: 'productId',
      select: 'name images price discount unit',
    });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng', error: err.message });
  }
};

// Xóa sản phẩm khỏi giỏ
export const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    await CartProductModels.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: 'Đã xóa khỏi giỏ' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa khỏi giỏ', error: err.message });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const cartItem = await CartProductModels.findById(cartItemId);
    if (!cartItem) return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ' });
    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật giỏ', error: err.message });
  }
};
