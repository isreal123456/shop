import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import me from "../assets/re.JPG";
import "swiper/css";
import "swiper/css/pagination";

const featureItems = [
  {
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    title: "Fast & Free Delivery",
    text: "Experience the convenience of fast and free delivery with every order.",
  },
  {
    icon: <AccountBalanceWalletOutlinedIcon fontSize="small" />,
    title: "Secured Money",
    text: "Reliable payments and checkout protection from cart to confirmation.",
  },
  {
    icon: <AutorenewOutlinedIcon fontSize="small" />,
    title: "Return Policy",
    text: "Simple returns that keep shopping stress-free and confidence high.",
  },
  {
    icon: <SupportAgentOutlinedIcon fontSize="small" />,
    title: "Customer Support",
    text: "Friendly help is available whenever you need quick answers.",
  },
];

const previewSlides = [
  {
    src: "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=400&q=80",
    alt: "Woman posing in a casual fashion preview",
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
    alt: "Fashion model preview wearing modern clothing",
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80&sat=-20",
    alt: "Alternate style preview image",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_10%,#ccb79f_0%,#b79f84_65%)] text-[#111111] font-['Jost']">
      <section className="mx-auto w-full bg-[#d9cdbd] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        <header className="flex min-h-18 flex-wrap items-center justify-between gap-3 bg-white px-5 py-3 sm:px-8">
              <p className="w-full text-center text-[1.55rem] font-bold tracking-[0.3px] sm:w-auto sm:text-left sm:text-[2rem]">
            StyleHub
          </p>

          <nav className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.95rem] font-medium sm:w-auto sm:gap-x-8" aria-label="Main navigation">
            <a href="#home" className="opacity-95 transition hover:opacity-70">
              Home
            </a>
            <a href="#shop" className="opacity-95 transition hover:opacity-70">
              Shop +
            </a>
            <a href="#pages" className="opacity-95 transition hover:opacity-70">
              Pages +
            </a>
            <a href="#contact" className="opacity-95 transition hover:opacity-70">
              Contact
            </a>
          </nav>

          <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end" aria-label="Account and cart actions">
            <button type="button" className="inline-flex items-center gap-1 border-0 bg-transparent px-1 text-[0.95rem] font-medium text-[#111111]">
              <PersonOutlineOutlinedIcon fontSize="small" />
              <span>Log In</span>
            </button>
            <button type="button" className="grid h-7.5 w-7.5 place-items-center border-0 bg-transparent text-[#111111]" aria-label="Search">
              <SearchIcon fontSize="small" />
            </button>
            <button type="button" className="grid h-7.5 w-7.5 place-items-center border-0 bg-transparent text-[#111111]" aria-label="Cart">
              <ShoppingCartOutlinedIcon fontSize="small" />
            </button>
          </div>
        </header>

        <section className="grid items-end gap-4 px-5 pt-10 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:pt-12" id="home">
          <div className="pb-10 lg:pb-12">
            <h1 className="mx-auto max-w-[11ch] text-center text-[2.15rem] font-bold leading-[1.05] sm:text-[3rem] lg:mx-0 lg:text-left xl:text-[4.2rem]">
              Dress to Impress
              <br />
              Discover, Shop, Inspire
            </h1>

            <p className="mt-8 text-center font-['Petit_Formal_Script'] text-[1.6rem] leading-tight sm:text-[2.2rem] lg:text-left xl:text-[2.7rem]">
              Our unique products
            </p>

            <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-8 lg:mt-8">
              <div className="h-47.5 w-37.5 overflow-hidden rounded-[22px] border-2 border-[#0b0b0b] shadow-[0_9px_18px_rgba(0,0,0,0.08)] sm:h-48.75" aria-label="Featured preview product">
                <Swiper
                  className="h-full w-full"
                  modules={[Autoplay, Pagination]}
                  slidesPerView={1}
                  loop
                  autoplay={{ delay: 2800, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                >
                  {previewSlides.map((slide) => (
                    <SwiperSlide key={slide.alt}>
                      <img
                        className="h-full w-full object-cover"
                        src={slide.src}
                        alt={slide.alt}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <button type="button" className="mt-1 border-0 bg-[#0f1117] px-8 py-4 text-[0.86rem] font-medium uppercase tracking-[0.06em] text-white transition hover:bg-[#1a1d25]">
                Explore More
              </button>
            </div>
          </div>

          <div className="flex  justify-center lg:justify-end">
            <img
              className="w-full  rounded-2xl max-w-100 object-contain max-h-100"
              src={me}
              alt="Smiling woman wearing modern fashion"
            />
          </div>
        </section>
      </section>

      <section className="mx-auto w-full max-w-screen overflow-hidden bg-[#ececec]  sm:px-8 sm:py-12" id="shop">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featureItems.map((item) => (
            <article className="text-center" key={item.title}>
              <div className="mx-auto flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#f6f3ee] text-[#4f4437]">
                {item.icon}
              </div>
              <h2 className="mt-5 text-[1.25rem] font-semibold sm:text-[1.4rem]">
                {item.title}
              </h2>
              <p className="mx-auto mt-3 max-w-65 text-[0.98rem] leading-[1.45] text-[#666666]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}