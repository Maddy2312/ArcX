import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/seller/SellerDashboard.jsx";
import SellerProductDetails from "../features/products/pages/seller/SellerProductDetails.jsx";
import EditVariant from "../features/products/pages/seller/EditVariant.jsx";
import Home from "../features/products/pages/user/Home.jsx";
import UserProductDetails from "../features/products/pages/user/UserProductDetails.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <UserProductDetails />,
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