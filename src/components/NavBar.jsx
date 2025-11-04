import { Link, useLocation } from "react-router";
import { ShoppingCart } from "lucide-react";
import clsx from "clsx";

export default function NavBar({cart}) {
  const { pathname } = useLocation();
  const size = cart.reduce((accum, curr) => {
    return accum + curr.qty;
  }, 0);

  return (
    <div className="flex justify-between items-center w-full px-12 py-4 bg-[#261675] sticky top-0 z-50 shadow">
      <div>
        <p className="text-2xl font-bold">ShopHub</p>
      </div>
      <div className="flex gap-4 text-xl">
        <Link to="/" className={clsx(pathname === '/' && "scale-105 underline decoration-amber-500 decoration-4 underline-offset-8")}>Home</Link>
        <Link to="/products" className={clsx(pathname === '/products' && "scale-105 underline decoration-amber-500 decoration-4 underline-offset-8")}>Shop</Link>
      </div>
      <div className={clsx("relative text-xl bg-[#65599C] py-1.5 px-3 rounded-lg", pathname === '/cart' && "scale-105 bg-amber-500")}>
        <Link to="/cart" className="flex gap-2">
          <ShoppingCart/>
          {size != 0 && <p className="absolute -top-2 -right-2 bg-[#FF1F4A] w-6 h-6 p-2 flex justify-center items-center font-medium rounded-full">{size}</p>}
          <p>Cart</p>
        </Link>
      </div>
    </div>
  )
}