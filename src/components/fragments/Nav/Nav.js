import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Transition, Menu } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { FiTriangle, FiChevronDown, FiUser } from 'react-icons/fi'
import { HiMenuAlt3 } from 'react-icons/hi'

import Authentication from '../Authentication'

import { logout } from '../../../actions/user'
import { showAuth } from '../../../actions/default'

const Nav = ({ className }) => {
    const user = useSelector(state => state.user)
    const defaults = useSelector(state => state.defaults)
    const [authOpen, setAuthOpen] = useState({
        isOpen: false,
        type: ''
    })
    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(logout()).then(res => {
            localStorage.removeItem('refreshToken')
        })
    }

    const closeAuthDialog = () => {
        setAuthOpen({
            isOpen: false,
            type: ''
        })
        dispatch(showAuth(false))
    }

    useEffect(() => {
        if (defaults.showAuth) {
            setAuthOpen({
                isOpen: defaults.showAuth,
                type: 'login'
            })
        }
    }, [defaults])

    return (
        <nav
            className={`${className} flex justify-between items-center p-6 text-lg`}
        >
            <Link
                className={`font-bold text-purple-600 flex items-center text-4xl`}
                to='/'
            >
                <FiTriangle className={`mr-1 `} />
                <span className={`text-3xl`}>Posty</span>
            </Link>
            <Authentication
                type={authOpen.type}
                isOpen={authOpen.isOpen}
                onClose={closeAuthDialog}
            />

            <Menu
                as='div'
                className='relative space-x-4 items-center hidden sm:flex z-30'
            >
                <Menu.Button
                    className={`flex items-center list-none rounded py-2 px-4 cursor-pointer text-purple-600 hover:bg-purple-600 hover:bg-opacity-25 font-sans font-medium focus:outline-none `}
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
                        style={{
                            maxWidth: 'calc(100vw - 75vw)'
                        }}
                        className='absolute z-20  text-purple-600 bg-white mt-6 -right-0 w-screen rounded-lg mr-4 shadow-lg overflow-hidden flex flex-col'
                    >
                        {!user ? (
                            <div
                                className={`flex flex-col divide-y divide-purple-100`}
                            >
                                <Menu.Item>
                                    <div
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25  cursor-pointer`}
                                        onClick={() =>
                                            setAuthOpen({
                                                isOpen: true,
                                                type: 'login'
                                            })
                                        }
                                    >
                                        Login
                                    </div>
                                </Menu.Item>
                                <Menu.Item>
                                    <div
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25  cursor-pointer`}
                                        onClick={() =>
                                            setAuthOpen({
                                                isOpen: true,
                                                type: 'register'
                                            })
                                        }
                                    >
                                        Register
                                    </div>
                                </Menu.Item>
                            </div>
                        ) : (
                            <div
                                className={`flex flex-col divide-y divide-purple-100`}
                            >
                                <Menu.Item>
                                    <Link
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25  cursor-pointer`}
                                        to='/dashboard'
                                    >
                                        Dashboard
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <div
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25  cursor-pointer`}
                                        onClick={logoutUser}
                                    >
                                        Logout
                                    </div>
                                </Menu.Item>
                            </div>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
            <Menu as='div' className='relative sm:hidden z-30'>
                <Menu.Button
                    className={`cursor-pointer text-purple-600 text-2xl  focus:outline-none `}
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
                        style={{
                            width: 'calc(100vw - 48px)'
                        }}
                        className='absolute z-20  text-purple-600 bg-white -right-4 mt-4 rounded-lg mr-4 shadow-lg overflow-hidden flex flex-col'
                    >
                        {!user ? (
                            <div
                                className={`flex flex-col divide-y divide-purple-100 `}
                            >
                                <Menu.Item>
                                    <div
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25 cursor-pointer`}
                                        onClick={() =>
                                            setAuthOpen({
                                                isOpen: true,
                                                type: 'login'
                                            })
                                        }
                                    >
                                        Login
                                    </div>
                                </Menu.Item>
                                <Menu.Item>
                                    <div
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25 cursor-pointer`}
                                        onClick={() =>
                                            setAuthOpen({
                                                isOpen: true,
                                                type: 'register'
                                            })
                                        }
                                    >
                                        Register
                                    </div>
                                </Menu.Item>
                            </div>
                        ) : (
                            <div
                                className={`flex flex-col divide-y divide-purple-100`}
                            >
                                <Menu.Item>
                                    <Link
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25 cursor-pointer`}
                                        to='/dashboard'
                                    >
                                        Dashboard
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <div
                                        className={`py-4 px-6 hover:bg-purple-600 hover:bg-opacity-25 cursor-pointer`}
                                        onClick={logoutUser}
                                    >
                                        Logout
                                    </div>
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
