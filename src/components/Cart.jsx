import { useOutletContext } from "react-router"
import { Trash } from "lucide-react";

function QuantitySelector({quantity}) {
  return (
    <div className="-translate-x-8 bg-[#F5F5F5] text-black rounded-md p-1 flex items-center text-lg w-full justify-between">
      <div className="bg-[#D8CAE1] rounded-md cursor-pointer hover:bg-amber-400 w-4 px-4 py-1 flex justify-center items-center">-</div>
      <div className="text-lg w-4">{quantity}</div>
      <div className="bg-[#D8CAE1] rounded-md cursor-pointer hover:bg-amber-400 w-4  px-4 py-1 flex justify-center items-center">+</div>
    </div>
  )
}

function Checkout() {
  return (
    <div className="min-h-80 min-w-[30%] rounded px-3 py-4 bg-white border border-[#F1DFE4] flex flex-col justify-center">
      <p className="text-xl font-bold">Order Summary</p>
      <div className="flex justify-between mb-4 mt-4">
        <p className="text-[#686163] ">Subtotal</p>
        <p className="text-[#686163] ">$0.00</p>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-[#686163]">Shipping</p>
        <p className="text-[#686163]">FREE</p>
      </div>
      <hr className="bg-[#F4E6EA] h-px border-0 mb-4" />
      <div className="flex justify-between">
        <p className="font-bold text-xl ">Total</p>
        <p className="text-[#FF1F4A] font-bold text-xl">$0.00</p>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <button onClick={() => onClick(quantity)} className="bg-[#261675] text-white rounded-xl w-full py-3 font-bold cursor-pointer hover:bg-[#3B2D83]">Proceed to Checkout</button>
        <button onClick={() => onClick(quantity)} className="bg-[#E3E6FA] text-black rounded-xl w-full py-3 font-bold cursor-pointe">Continue Shopping</button>
      </div>
    </div>
  )
}

{/* <table className="w-full">
<thead>
  <tr>
    <th>Title</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Sample Item</td>
    <td>$10.00</td>
    <td>2</td>
    <td>
      <button>Edit</button>
      <button>Delete</button>
    </td>
  </tr>
</tbody>
</table> */}

function Product({product, qty}) {
  const {title, price, image} = product;
  console.table(product);
  return (
    <div className="flex gap-2 justify-between p-2 border-b border-[#F1DFE4]">
      <div className="w-[45%] flex gap-2 justify-start items-center">
        <div className="bg-[#EC7B95] p-2 rounded">
          <img src={image} className="h-16 object-contain"/>
        </div>
        <div>
        <p className="text-center font-bold text-xl truncate w-full">{title}</p>
          <p className="text-[#ABA7A8]">${price} each</p>
        </div>
      </div>
      <div className="flex-1 flex gap-2 justify-start items-center font-bold text-lg">${price * qty}</div>
      <div className="flex-1 flex gap-2 justify-start items-center">
        <QuantitySelector quantity={qty}/>
      </div>
      <div className="flex-1 flex gap-2 justify-start items-center">
        <Trash className="w-5 h-5 text-red-600"/>
      </div>
    </div>
  )
}

export default function Cart() {
  const {products, cart} = useOutletContext();

  if (!cart.length) {
    return (
      <div className="text-black bg-[#F9F8F8] px-6 py-10 mb-10 h-screen">
        <h1 className="mb-6 text-4xl font-extrabold">Shopping Cart</h1>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-[#686163] text-2xl">Your cart is empty</p>
          <p className="text-[#686163] text-xl">Start shopping to add items to your cart</p>
        </div>
      </div>
    )
  }
  return (
      <div className="text-black bg-[#F9F8F8] px-6 py-10 mb-10 h-screen">
        <h1 className="mb-6 text-4xl font-extrabold">Shopping Cart</h1>
        <div className="flex gap-4 flex-wrap justify-center items-start">
          <div className="min-w-[65%] rounded-xl grow border bg-white border-[#F1DFE4]">
            <div className="flex gap-2 justify-between border-b w-full p-4 bg-[#F9F9FE] border-[#F1DFE4] font-bold">
              <p className="w-[45%]">Product</p>
              <p className="flex-1">Price</p>
              <p className="flex-1">Quantity</p>
              <p className="flex-1">Actions</p>
            </div>
            {
              cart.map((prod) => {
                const product = products[prod.id];
                return (
                  <Product key={prod.id} product={product} qty={prod.qty}/>
                )
              })
            }
          </div>
          <Checkout />

        </div>
      </div>
  )
}