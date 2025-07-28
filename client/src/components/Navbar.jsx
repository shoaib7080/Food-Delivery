import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    navigate,
    setShowUserLogin,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/">
        <img
          className="h-9"
          src={assets.logo}
          alt="dummyLogoColored"
          onClick={() => setOpen(false)}
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Hoome</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>
      </div>

      {/* Mobile Menu */}
      {/* <div className="sm:hidden flex items-center gap-8">
                <NavLink to='/'>Hoiime</NavLink>
                <NavLink to='/'>About</NavLink>
                <NavLink to='/'>Contact</NavLink>
            </div> */}

      <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search products"
        />
        <img src={assets.search_icon} alt="Search Image" className="w-4 h-4" />
      </div>

      <div
        className=" hidden sm:flex relative cursor-pointer"
        onClick={() => navigate("/cart")}
      >
        <img
          src={assets.nav_cart_icon}
          alt="Cart Image"
          className="w-6 opacity-80"
        />
        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
          {getCartCount()}
        </button>
      </div>

      {!user ? (
        <button
          onClick={() => setShowUserLogin(true)}
          className="hidden sm:flex cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
        >
          Login
        </button>
      ) : (
        <div className="hidden sm:flex items-center gap-2 cursor-pointer relative group">
          <img
            className="w-6 h-6 rounded-full"
            src={assets.profile_icon}
            alt="Profile Image"
          />
          <ul className="hidden group-hover:block absolute top-6 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
            <li
              onClick={() => navigate("my-orders")}
              className="p-1.5 pl-3 hover:bg-primary/10"
            >
              My Orders
            </li>
            <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10">
              Logout
            </li>
          </ul>
        </div>
      )}

      <div className="flex items-center sm:hidden gap-6">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img
            src={assets.nav_cart_icon}
            alt="Cart Image"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" className="">
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="Menu Image" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] z-50 left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm sm:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/product" onClick={() => setOpen(false)}>
            All Products
          </NavLink>
          {user && (
            <NavLink to="/order" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
