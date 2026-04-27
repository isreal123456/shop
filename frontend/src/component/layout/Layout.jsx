import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "../common/BackToTopButton";
import CookieConsent from "../common/CookieConsent";
import LiveChatWidget from "../common/LiveChatWidget";
import ToastStack from "../common/ToastStack";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f8f5] text-neutral-900">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <Outlet key={location.pathname} />
      </main>
      <Footer />
      <BackToTopButton />
      <ToastStack />
      <CookieConsent />
      <LiveChatWidget />
    </div>
  );
}
