import Link from "next/link";
import { useSelector } from "react-redux";

// Assets
import { LOGO_URL } from "@/utils/constants";
import { RootState } from "@/redux/store";

const Header = () => {
  // Subscribe to the cart state using a Selector
  const cartItems = useSelector((store: RootState) => store.cart.items);

  return (
    <div className="flex justify-between py-4 mx-2 md:mx-24 lg:mx-52 text-lg font-semibold mb-12">
      <div className="logo-container">
        <Link href="/" className="text-bold text-lg md:text-3xl">
          Cafe Tracker
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/cart">
          🛒{" "}
          <span className="mx-1 text-[16px] text-black">
            ({cartItems.length} items)
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
