import { useState } from "react";
import { Trash } from "lucide-react";
import { Link, useOutletContext } from "react-router"

// material UI
import { Modal, Box, Typography } from "@mui/material";

const style = {
  position: 'absolute',
  color: 'black',
  backgroundColor: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Thank you!</Typography>
        <Typography sx={{ mt: 2 }}>Thank you for shopping with us</Typography>
      </Box>
    </Modal>
  );
}
// material UI

function QuantitySelector({product, quantity, adjustQty}) {
  return (
    <div className="bg-[#F5F5F5] text-black rounded-md p-1 flex items-center text-lg w-full justify-between">
      <div onClick={() => adjustQty(product.id - 1, -1)} className="bg-[#D8CAE1] rounded-md cursor-pointer hover:bg-amber-400 w-4 px-4 py-1 flex justify-center items-center">-</div>
      <div className="text-lg w-4">{quantity}</div>
      <div onClick={() => adjustQty(product.id - 1, 1)} className="bg-[#D8CAE1] rounded-md cursor-pointer hover:bg-amber-400 w-4  px-4 py-1 flex justify-center items-center">+</div>
    </div>
  )
}

function Checkout({cart, products}) {
  const [open, setOpen] = useState(false);
  
  const total = cart.reduce((accumulator, prod) => {
    return accumulator + (prod.qty * products[prod.id].price);
  }, 0);

  return (
    <div className="min-h-80 rounded px-3 py-4 bg-white border border-[#F1DFE4] flex flex-col justify-center grow">
      <BasicModal open={open} onClose={() => setOpen(false)} />
      <p className="text-xl font-bold">Order Summary</p>
      <div className="flex justify-between mb-4 mt-4">
        <p className="text-[#686163] ">Subtotal</p>
        <p className="text-[#686163] ">${total}</p>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-[#686163]">Shipping</p>
        <p className="text-[#686163]">FREE</p>
      </div>
      <hr className="bg-[#F4E6EA] h-px border-0 mb-4" />
      <div className="flex justify-between">
        <p className="font-bold text-xl ">Total</p>
        <p className="text-[#FF1F4A] font-bold text-xl">${total}</p>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Link onClick={() => setOpen(true)} className="bg-[#261675] text-white rounded-xl w-full py-3 font-bold cursor-pointer hover:bg-[#3B2D83] text-center">Proceed to Checkout</Link>
        <Link to="/products" className="bg-[#E3E6FA] text-black rounded-xl w-full py-3 font-bold cursor-pointe text-center">Continue Shopping</Link>
      </div>
    </div>
  )
}

function Product({product, qty, adjustQty}) {
  const {title, price, image} = product;
  return (
    <div className="flex gap-2 justify-between p-2 border-b border-[#F1DFE4]">
      <div className="w-[45%] flex gap-2 justify-start items-center">
        <div className="bg-[#EC7B95] p-2 rounded">
          <img src={image} className="h-16 w-16 object-contain"/>
        </div>
        <div className="max-w-[120px]">
          <p className="text-center font-bold text-xl truncate">{title}</p>
          <p className="text-[#ABA7A8]">${price} each</p>
        </div>
      </div>
      <div className="flex-1 flex gap-2 justify-start items-center font-bold text-lg">${price * qty}</div>
      <div className="flex-1 flex gap-2 justify-start items-center">
        <QuantitySelector quantity={qty} product={product} adjustQty={adjustQty}/>
      </div>
      <div onClick={() => adjustQty(product.id - 1, -qty)} className="flex-1 flex gap-2 justify-start items-center cursor-pointer">
        <Trash className="w-5 h-5 text-red-600 "/>
        Delete
      </div>
    </div>
  )
}

export default function Cart() {
  const {products, cart, adjustQty} = useOutletContext();

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
                  <Product key={prod.id} product={product} qty={prod.qty} adjustQty={adjustQty}/>
                )
              })
            }
          </div>
          <Checkout
            cart={cart}
            products={products}
          />

        </div>
      </div>
  )
}