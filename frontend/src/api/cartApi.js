// Reset cart (remove all items for userId or guestId)
export async function resetCartApi({ userId, guestId }) {
  const payload = {};
  if (userId) payload.userId = userId;
  if (guestId) payload.guestId = guestId;
  const res = await axios.post('/api/cart/reset', payload, { withCredentials: true });
  return res.data;
}
import axios from 'axios';

// Add to cart (works for both user and guest)
export async function addToCartApi({ productId, quantity = 1, userId, guestId }) {
  const payload = { productId, quantity };
  if (userId) payload.userId = userId;
  if (guestId) payload.guestId = guestId;
  const res = await axios.post('/api/cart/add', payload, { withCredentials: true });
  return res.data;
}

// Get cart (by userId or guestId)
export async function getCartApi({ userId, guestId }) {
  const params = {};
  if (userId) params.userId = userId;
  if (guestId) params.guestId = guestId;
  const res = await axios.get('/api/cart', { params, withCredentials: true });
  return res.data;
}

// Remove from cart
export async function removeFromCartApi(cartItemId) {
  const res = await axios.delete(`/api/cart/${cartItemId}`, { withCredentials: true });
  return res.data;
}

// Update cart item quantity
export async function updateCartQuantityApi(cartItemId, quantity) {
  const res = await axios.patch(`/api/cart/${cartItemId}`, { quantity }, { withCredentials: true });
  return res.data;
}
