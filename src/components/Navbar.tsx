import Link from "next/link";
import { FiSidebar } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";

type NavbarProps = {
  onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b px-5 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-7 w-7 items-center justify-center rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <FiSidebar />
        </button>
        <h4 className="font-outfit font-semibold">Sales Management System</h4>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
          <Link href="/checkout">
            <LuShoppingCart />
          </Link>
        </div>
        <div className="hover:bg-accent flex items-center justify-center gap-2 rounded-lg px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-amber-300 bg-amber-100 text-xs font-bold text-amber-700">
            AH
          </div>
          <div>
            <div className="text-foreground text-sm leading-tight font-medium">
              Admin HQ
            </div>
            <div className="text-xs leading-tight font-medium text-amber-600">
              Admin HQ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
