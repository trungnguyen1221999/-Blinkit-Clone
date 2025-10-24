import { TiShoppingCart } from "react-icons/ti";

const Cart = () => {
  return (
    <div>
      <button className="cursor-pointer flex space-x-2 items-center md:bg-primary-200 md:px-2 md:py-2.5 md:rounded-md">
        <div className="scale-90 md:scale-100 md:animate-bounce">
          <TiShoppingCart size={28} />
        </div>
        <p className="text-lg font-medium hidden md:block">Cart</p>
      </button>
    </div>
  );
};

export default Cart;
