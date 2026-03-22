import { BsBoxSeam } from "react-icons/bs";

const Header = () => {
    return <nav className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl px-6 py-4 flex mx-auto justify-between items-center">
            <div className="flex gap-3 items-center">
                <div className="w-9 h-9 p-1.5 bg-white rounded-lg">
                    <BsBoxSeam className="text-blue-700" size="full" />
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-tight tracking-wide">ADVANCE DIGITALS</h1>
                    <h3 className="text-blue-200 text-xs font-medium">Sales Management System</h3>
                </div>
            </div>
            <div>
                Sign in
            </div>
        </div>
    </nav>;
};

export default Header;
