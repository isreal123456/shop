import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import Layout from "./component/layout/Layout";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutShippingPage from "./pages/CheckoutShippingPage";
import CheckoutMethodPage from "./pages/CheckoutMethodPage";
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import CheckoutConfirmationPage from "./pages/CheckoutConfirmationPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import AccountDashboardPage from "./pages/AccountDashboardPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import WishlistPage from "./pages/WishlistPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateProductPage from "./admin_page/create";

function App() {

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/shipping" element={<CheckoutShippingPage />} />
            <Route path="/checkout/method" element={<CheckoutMethodPage />} />
            <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
            <Route path="/checkout/confirmation" element={<CheckoutConfirmationPage />} />
            <Route path="/account/login" element={<LoginRegisterPage />} />
            <Route path="/account" element={<AccountDashboardPage />} />
            <Route path="/account/orders" element={<OrderHistoryPage />} />
            <Route path="/account/settings" element={<AccountSettingsPage />} />
            <Route path="/account/wishlist" element={<WishlistPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/admin/create-product" element={<CreateProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
