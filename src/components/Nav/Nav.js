import { Link } from 'react-router-dom'

import { Transition, Menu } from '@headlessui/react'

import { FiTriangle, FiChevronDown, FiUser } from 'react-icons/fi'
import { HiMenuAlt3 } from 'react-icons/hi'

const Nav = ({ user }) => {
    return (
        <nav
            className={`flex justify-between items-center p-6 bg-blue-900 text-yellow-400 shadow-md z-10`}
        >
            <Link className={`font-bold text-lg flex items-center`} to='/'>
                <FiTriangle className={`mr-1 text-xl`} />
                Posty
            </Link>
            <div className={`hidden sm:block`}>
                <div className={`space-x-4 flex items-center`}>
                    {user && (
                        <Link
                            to='/add'
                            className={`list-none rounded px-6 py-2 cursor-pointer hover:bg-blue-200 hover:text-blue-900 border text-blue-200 border-blue-200 font-sans font-medium`}
                        >
                            Add
                        </Link>
                    )}
                    <Menu as='div' className='relative'>
                        <Menu.Button
                            className={`flex items-center list-none rounded px-6 py-2 cursor-pointer bg-yellow-200 hover:bg-yellow-300 text-blue-900 font-sans font-medium focus:outline-none `}
                        >
                            <FiUser className={`mr-1`} />
                            {user ? user.username : `Account`}{' '}
                            <FiChevronDown className={`ml-1 opacity-70`} />
                        </Menu.Button>
                        <Transition
                            enter='transition duration-100 ease-out'
                            enterFrom='transform scale-95 opacity-0'
                            enterTo='transform scale-100 opacity-100'
                            leave='transition duration-75 ease-out'
                            leaveFrom='transform scale-100 opacity-100'
                            leaveTo='transform scale-95 opacity-0'
                        >
                            <Menu.Items
                                style={{ maxWidth: 'calc(100vw - 75vw)' }}
                                className='absolute z-20 bg-yellow-200 text-blue-900 mt-2 -right-4 w-screen rounded-lg mr-4 shadow-lg overflow-hidden flex flex-col'
                            >
                                {!user ? (
                                    <div
                                        className={`flex flex-col divide-y divide-yellow-300`}
                                    >
                                        <Menu.Item>
                                            <Link
                                                className={`py-4 px-6 hover:bg-yellow-300`}
                                                to='/login'
                                            >
                                                Login
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link
                                                className={`py-4 px-6 hover:bg-yellow-300`}
                                                to='/register'
                                            >
                                                Register
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                ) : (
                                    <div
                                        className={`flex flex-col divide-y divide-yellow-300`}
                                    >
                                        <Menu.Item>
                                            <Link
                                                className={`py-4 px-6 hover:bg-yellow-300`}
                                                to='/profile'
                                            >
                                                Profile
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link
                                                className={`py-4 px-6 hover:bg-yellow-300`}
                                                to='/logout'
                                            >
                                                Logout
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                )}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            <Menu as='div' className='relative sm:hidden'>
                <Menu.Button
                    className={`cursor-pointer text-yellow-300 text-2xl  focus:outline-none `}
                >
                    <HiMenuAlt3 />
                </Menu.Button>
                <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                >
                    <Menu.Items
                        style={{ width: 'calc(100vw - 48px)' }}
                        className='absolute z-20 bg-yellow-200 text-blue-900 -right-4 mt-2 rounded-lg mr-4 shadow-lg overflow-hidden flex flex-col'
                    >
                        {!user ? (
                            <div
                                className={`flex flex-col divide-y divide-yellow-300 `}
                            >
                                <Menu.Item>
                                    <Link
                                        className={`py-4 px-6 hover:bg-yellow-300`}
                                        to='/login'
                                    >
                                        Login
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link
                                        className={`py-4 px-6 hover:bg-yellow-300`}
                                        to='/register'
                                    >
                                        Register
                                    </Link>
                                </Menu.Item>
                            </div>
                        ) : (
                            <div
                                className={`flex flex-col divide-y divide-yellow-300`}
                            >
                                <Menu.Item>
                                    <Link
                                        className={`py-4 px-6 hover:bg-yellow-300`}
                                        to='/add'
                                    >
                                        Add
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link
                                        className={`py-4 px-6 hover:bg-yellow-300`}
                                        to='/profile'
                                    >
                                        Profile
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link
                                        className={`py-4 px-6 hover:bg-yellow-300`}
                                        to='/logout'
                                    >
                                        Logout
                                    </Link>
                                </Menu.Item>
                            </div>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
        </nav>
    )
}

export default Nav
