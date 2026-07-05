import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/seller/CreateProduct.jsx";
import SellerDashboard from "../features/products/pages/seller/SellerDashboard.jsx";
import SellerProductDetails from "../features/products/pages/seller/SellerProductDetails.jsx";
import EditVariant from "../features/products/pages/seller/EditVariant.jsx";
import Home from "../features/products/pages/user/Home.jsx";
import UserProductDetails from "../features/products/pages/user/UserProductDetails.jsx";
import Cart from "../features/cart/pages/Cart.jsx";
import AppLayout from "./AppLayout.jsx";
import Protected from "../features/products/pages/components/Protected.jsx";

const routes = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <UserProductDetails />,
      },
      {
        path: "/cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: (
          <Protected role="seller">
            <CreateProduct />
          </Protected>
        ),
      },
      {
        path: "/seller/dashboard",
        element: (
          <Protected role="seller">
            <SellerDashboard />
          </Protected>
        ),
      },
      {
        path: "/seller/product/:id",
        element: (
          <Protected role="seller">
            <SellerProductDetails />
          </Protected>
        ),
      },
      {
        path: "/seller/product/:id/variant/:variantId",
        element: (
          <Protected role="seller">
            <EditVariant />
          </Protected>
        ),
      },
    ],
  },
]);

export default routes;
