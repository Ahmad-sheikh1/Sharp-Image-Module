import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">


                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                onClick={() => navigate('/Resize')}
                                href="#"
                                className="block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                            >
                                Image Resizing , Quality , Format Changer
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => navigate('/MetaData')}
                                href="#"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                            >
                                MetaDeta
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
