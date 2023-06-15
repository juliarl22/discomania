import {
  createBrowserRouter, Navigate,
  RouterProvider
} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "./styles/commonStyles";

// Importaciones de páginas
import CategoriesCardPage from "./pages/CategoriesCardPage";
import CategoriesListPage from "./pages/CategoriesListPage";
import CategoriesPage from "./pages/CategoriesPage";
import CheckoutPage from "./pages/CheckoutPage";
import EditCategoriesPage from "./pages/EditCategoriesPage";
import EditProductPage from "./pages/EditProductPage";
import EditUserPage from "./pages/EditUserPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsCardPage from "./pages/ProductsCardPage";
import ProductsListPage from "./pages/ProductsListPage";
import ProductsPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import SecurityErrorPage from "./pages/SecurityErrorPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import TicketPrintPage from "./pages/TicketPrintPage";
import TicketsListPage from "./pages/TicketsListPage";
import UsersListPage from "./pages/UsersListPage";

import { isUserAuthorized } from "./js/Utils.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  // Páginas relacionadas con el usuario: login, registro, edición usuario, lista de usuarios
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "edituser/:email",
    element: isUserAuthorized("edituser") ? (<EditUserPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "userslist",
    element: isUserAuthorized("userslist") ? (<UsersListPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  // Páginas relacionadas con las categorías: alta y edición de categorías, lista de categorías y vista de carta de categorías
  {
    path: "category",
    element: isUserAuthorized("category") ? (<CategoriesPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "categorieslist",
    element: isUserAuthorized("categorieslist") ? (<CategoriesListPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "editcategory/:idcategoria",
    element: isUserAuthorized("editcategory") ? (<EditCategoriesPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "categorycardlist",
    element: isUserAuthorized("categorycardlist") ? (<CategoriesCardPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  // Páginas relacionadas con los productos: alta y edición de productos, lista de productos y vista de carta de productos
  {
    path: "product",
    element: isUserAuthorized("product") ? (<ProductsPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "productslist",
    element: isUserAuthorized("productslist") ? (<ProductsListPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "editproduct/:idproducto",
    element: isUserAuthorized("editproduct") ? (<EditProductPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "productcardlist/:idcategoria",
    element: isUserAuthorized("productcardlist") ? (<ProductsCardPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "productdetail/:idproducto",
    element: isUserAuthorized("productdetail") ? (<ProductDetailPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  // Páginas relacionadas con las compras de los usuarios: lista de la compra, checkout de compra, impresión de tickets y lista de tickets
  {
    path: "shoppinglist",
    element: isUserAuthorized("shoppinglist") ? (<ShoppingListPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "checkout",
    element: isUserAuthorized("checkout") ? (<CheckoutPage />) : (<Navigate to="/securityerror" replace={true} />)

  },
  {
    path: "ticketprint/:idticket",
    element: isUserAuthorized("ticketprint") ? (<TicketPrintPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "ticketslist/:email",
    element: isUserAuthorized("ticketslist") ? (<TicketsListPage />) : (<Navigate to="/securityerror" replace={true} />)
  },
  {
    path: "securityerror",
    element: <SecurityErrorPage />
  }
]);



function App() {
  return (
    <ThemeProvider theme={darkTheme}>

      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

