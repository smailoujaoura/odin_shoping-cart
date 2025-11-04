import App from "./App";
import ErrorPage from "./ErrorPage";
import Cart from "./components/Cart";
import Products from "./components/Products";
import Home from "./components/Home";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ]
  },
];

export default routes;