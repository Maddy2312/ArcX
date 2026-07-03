import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/SellerDashboard.jsx";
import SellerProductDetails from "../features/products/pages/SellerProductDetails.jsx";
import EditVariant from "../features/products/pages/EditVariant.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello</h1>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: <CreateProduct />,
      },
      {
        path:"/seller/dashboard",
        element: <SellerDashboard />,
      },
      {
        path:"/seller/product/:id",
        element: <SellerProductDetails />,
      },
      {
        path:"/seller/product/:id/variant/:variantId",
        element: <EditVariant />,
      }
    ],
  },
]);

export default routes;