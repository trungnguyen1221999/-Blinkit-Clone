import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  return (
    <div>
      <button className="flex space-x-2 items-center">
        <FaShoppingCart size={25} />
        <p className="text-lg font-medium hidden md:block">Cart</p>
      </button>
    </div>
  );
};

export default Cart;
