import { Outlet } from "react-router"
import NavBar from "./components/NavBar"
import { useEffect, useState } from "react"

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);


  function onAddToCart(id, qty) {
    console.log(id, qty);
    setCart((prevCart) => {
      const exists = prevCart.find((prod) => prod.id === id);
      if (exists) {
        return prevCart
          .map((prod) => prod.id === id ? {...prod, qty} : prod)
          .filter((prod) => prod.qty > 0);
      } else if (qty > 0) {
        return [...prevCart, {id, qty}];
      } else {
        return prevCart;
      }
    });
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20", {mode: "cors"})
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setProducts(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar
        cart={cart}
      />
      <Outlet 
        context={{products, loading, error, cart, onAddToCart}}
      />
    </div>
  )
}

export default App
