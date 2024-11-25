import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./../assets/logo.png";
import Logout from "./Accounts/Logout";
import { UserContext } from "../context/contextApi";

const navigation = [
  { name: "Home", to: "/dashboard" },
  { name: "Consultation", to: "/ConsultCancerDocter" },
  { name: "Upload", to: "/UploadImage" },
  { name: "Products", to: "/SkinProducts" },
  { name: "Appointments", to: "/Appointments" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbarr() {
  const location = useLocation();
  const { cart, setCart } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Disclosure as="nav" className="bg-[#81cbd4]">
      <div className="mx-2 sm:mx-4  px-2 sm:px-4 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Your Company" src={logo} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.to; // Check if this is the current page
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "bg-gray-900 text-white" // Active page styles
                          : "text-white hover:bg-gray-700", // Inactive page styles
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <span className=" text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium">
              Patient
            </span>
            <div
              className="flex  ml-2 cursor-pointer"
              onClick={() => navigate("/ShoppingCart")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              {/* <span className="text-white">({cart})</span> */}
            </div>
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    <Logout />
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.to; // Check if this is the current page
            return (
              <Link
                key={item.name}
                to={item.to}
                // aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive
                    ? "bg-gray-900 text-white" // Active page styles
                    : "text-white hover:bg-gray-700", // Inactive page styles
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
