import { useState } from "react"
import { useOutletContext } from "react-router"


function QuantitySelector({quantity, qtyOnClick}) {
  return (
    <div className="bg-[#F5F5F5] text-black rounded-md p-1 flex gap-4 items-center text-lg w-full justify-between">
      <div onClick={() => {qtyOnClick(-1)}} className="bg-[#D8CAE1] rounded-md px-4 py-1 cursor-pointer hover:bg-amber-400">-</div>
      <div className="text-lg">{quantity}</div>
      <div onClick={() => {qtyOnClick(+1)}} className="bg-[#D8CAE1] rounded-md px-4 py-1 cursor-pointer hover:bg-amber-400">+</div>
    </div>
  )
}

function Product({product, onClick}) {
  const [quantity, setQuantity] = useState(1);

  function qtyOnClick(delta) {
    if (quantity === 0 && delta === -1) {
      return;
    }
    setQuantity(quantity + delta);
  }

  const {title, price, description, image} = product;
  return (
    <div className="bg-linear-to-br from-[#ff5277] to-[#d6cde4]  text-black rounded-xl border border-[#F1DFE4] p-4 flex flex-col max-w-80 items-center gap-2 min-w-70 grow-0">
      <div className="h-50 w-full lg:h-60">
        <img src={image} className="h-50 w-full object-contain lg:h-60"/>
      </div>
      <p className="text-center font-bold text-xl truncate w-full">{title}</p>
      <p className="text-center h-20 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none]">{description}</p>
      <p className="font-bold text-xl">${price}</p>
      <QuantitySelector quantity={quantity} qtyOnClick={qtyOnClick}/>
      <button onClick={() => onClick(quantity)} className="bg-[#261675] text-white rounded-xl w-full py-3 font-bold cursor-pointer hover:bg-green-600">Add to Cart</button>
    </div>
  )
}

export default function Products() {
  const { products, loading, error, onAddToCart } = useOutletContext();

  if (loading || !products) {
    return (
      <div className="text-black">Loading...</div>
    )
  } else if (error) {
    return (
      <div className="text-black">Error. Please try again!</div>
    )
  }
  return (
    <div className="bg-[#F9F8F8] flex gap-2 p-4 flex-wrap items-start justify-center h-full">
      {
        products.map((product, index) => {
          return (
            <Product 
              key={index}
              product={product}
              onClick={(qty) => onAddToCart(index, qty)}
            />
          )
        })
      }
    </div>
  )
}