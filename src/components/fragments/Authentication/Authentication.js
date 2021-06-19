import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'

import { login, register } from '../../../actions/user'

const Authentication = ({ type, isOpen, onClose }) => {
    const dispatch = useDispatch()

    const initialUserState = {
        username: '',
        email: '',
        password: ''
    }

    const [userDetail, setUserDetail] = useState(initialUserState)
    const [saving, setSaving] = useState(false)
    const [currentType, setCurrentType] = useState()
    const [status, setStatus] = useState({
        message: '',
        type: ''
    })

    useEffect(() => {
        clearMessage()
        setUserDetail(initialUserState)
        setCurrentType(type) // eslint-disable-next-line
    }, [type])

    const handleInputChange = event => {
        const { name, value } = event.target
        setUserDetail({ ...userDetail, [name]: value })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        setSaving(true)

        if (!userDetail.username) {
            setSaving(false)
            return
        }
        if (!userDetail.password) {
            setSaving(false)
            return
        }

        switch (currentType) {
            case 'login':
                await dispatch(login(userDetail))
                    .then(res => {
                        localStorage.setItem('refreshToken', res.refreshToken)
                        setUserDetail(initialUserState)
                        onClose()
                    })
                    .catch(err => {
                        setStatus({
                            message: err.message || 'Unable to Login!',
                            type: 'failure'
                        })
                    })
                break
            case 'register':
                if (!userDetail.email) {
                    setSaving(false)
                    break
                }
                await dispatch(register(userDetail))
                    .then(res => {
                        setUserDetail(initialUserState)
                        onClose()
                    })
                    .catch(err => {
                        setStatus({
                            message: err.message || 'Unable to login!',
                            type: 'failure'
                        })
                    })
                break

            default:
                break
        }

        setSaving(false)
    }
    const clearMessage = () => {
        setTimeout(() => {
            setStatus({
                message: '',
                type: ''
            })
        }, 1000)
    }

    const populateRandomUser = () => {
        setUserDetail({
            username: 'default-user',
            password: 'default-user'
        })
    }

    return (
        <Transition
            show={isOpen}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
        >
            {currentType && (
                <Dialog
                    className='fixed z-10 inset-0 overflow-y-auto'
                    open={isOpen}
                    onClose={onClose}
                >
                    <div className='flex items-center justify-center min-h-screen'>
                        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
                        <form
                            onSubmit={handleFormSubmit}
                            className={`flex flex-col space-y-4 p-6 mx-6 sm:mx-auto w-full max-w-lg bg-white z-10 rounded-lg`}
                        >
                            {status.message && (
                                <span
                                    className={`px-6 py-4 text-sm text-gray-100 rounded-lg ${
                                        status.type === 'success'
                                            ? `bg-green-600`
                                            : status.type === 'failure'
                                            ? `bg-red-600`
                                            : `bg-gray-600`
                                    }`}
                                >
                                    {status.message}
                                </span>
                            )}
                            <h1
                                className={`font-extrabold text-purple-600 text-5xl my-2 capitalize`}
                            >
                                {currentType}
                            </h1>
                            {currentType === 'login' ? (
                                <div className={`space-y-4`}>
                                    <span className={`flex flex-col`}>
                                        <label
                                            className={`font-semibold text-purple-600 text-lg`}
                                            htmlFor='username'
                                        >
                                            Username
                                        </label>
                                        <input
                                            className={`px-4 py-2 bg-gray-50 rounded-md border border-purple-300`}
                                            id='username'
                                            type='text'
                                            value={userDetail.username}
                                            onChange={handleInputChange}
                                            placeholder='Username'
                                            name='username'
                                            maxLength={100}
                                        />
                                    </span>
                                    <span className={`flex flex-col`}>
                                        <label
                                            className={`font-semibold text-purple-600 text-lg`}
                                            htmlFor='password'
                                        >
                                            Password
                                        </label>
                                        <input
                                            className={`px-4 py-2 bg-gray-50 rounded-md border border-purple-300`}
                                            id='password'
                                            type='password'
                                            value={userDetail.password}
                                            onChange={handleInputChange}
                                            placeholder='Password'
                                            name='password'
                                            maxLength={100}
                                        />
                                    </span>

                                    <div
                                        className={`flex justify-between items-center space-x-4`}
                                    >
                                        <button
                                            style={{ maxWidth: '8rem' }}
                                            className={`bg-purple-600 text-gray-50 w-full p-3 mt-3 rounded-md ${
                                                saving &&
                                                `opacity-50 cursor-not-allowed select-none`
                                            }`}
                                            disabled={saving}
                                            type='submit'
                                        >
                                            Login
                                        </button>
                                        <button
                                            style={{ maxWidth: '8rem' }}
                                            className={`border border-gray-600 text-gray-600 w-full p-3 mt-3 rounded-md ${
                                                saving &&
                                                `opacity-50 cursor-not-allowed select-none`
                                            }`}
                                            disabled={saving}
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div
                                        className={`flex flex-wrap text-purple-600 justify-center items-center space-x-2 pt-4`}
                                    >
                                        <div
                                            onClick={populateRandomUser}
                                            className={`cursor-pointer`}
                                        >
                                            Use default user
                                        </div>
                                        <span className={`text-gray-600`}>
                                            or
                                        </span>
                                        <div
                                            onClick={() =>
                                                setCurrentType('register')
                                            }
                                            className={`cursor-pointer`}
                                        >
                                            Create account
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                currentType === 'register' && (
                                    <div className={`space-y-4`}>
                                        <span className={`flex flex-col`}>
                                            <label
                                                className={`font-semibold text-purple-600 text-lg`}
                                                htmlFor='username'
                                            >
                                                Username
                                            </label>
                                            <input
                                                className={`px-4 py-2 bg-gray-50 rounded-md border border-purple-300`}
                                                id='username'
                                                type='text'
                                                value={userDetail.username}
                                                onChange={handleInputChange}
                                                placeholder='Username'
                                                name='username'
                                                maxLength={100}
                                            />
                                        </span>
                                        <span className={`flex flex-col`}>
                                            <label
                                                className={`font-semibold text-purple-600 text-lg`}
                                                htmlFor='email'
                                            >
                                                Email
                                            </label>
                                            <input
                                                className={`px-4 py-2 bg-gray-50 rounded-md border border-purple-300`}
                                                id='email'
                                                type='email'
                                                value={userDetail.email}
                                                onChange={handleInputChange}
                                                placeholder='Email'
                                                name='email'
                                                maxLength={100}
                                            />
                                        </span>
                                        <span className={`flex flex-col`}>
                                            <label
                                                className={`font-semibold text-purple-600 text-lg`}
                                                htmlFor='password'
                                            >
                                                Password
                                            </label>
                                            <input
                                                className={`px-4 py-2 bg-gray-50 rounded-md border border-purple-300`}
                                                id='password'
                                                type='password'
                                                value={userDetail.password}
                                                onChange={handleInputChange}
                                                placeholder='Password'
                                                name='password'
                                                maxLength={100}
                                            />
                                        </span>

                                        <div
                                            className={`flex justify-between items-center space-x-4`}
                                        >
                                            <button
                                                style={{ maxWidth: '8rem' }}
                                                className={`bg-purple-600 text-gray-50 w-full p-3 mt-3 rounded-md ${
                                                    saving &&
                                                    `opacity-50 cursor-not-allowed select-none`
                                                }`}
                                                disabled={saving}
                                                type='submit'
                                            >
                                                Register
                                            </button>
                                            <button
                                                style={{ maxWidth: '8rem' }}
                                                className={`border border-gray-600 text-gray-600 w-full p-3 mt-3 rounded-md ${
                                                    saving &&
                                                    `opacity-50 cursor-not-allowed select-none`
                                                }`}
                                                disabled={saving}
                                                onClick={onClose}
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                        <div
                                            className={`flex justify-center pt-4`}
                                        >
                                            <span
                                                onClick={() =>
                                                    setCurrentType('login')
                                                }
                                                className={`cursor-pointer text-purple-600`}
                                            >
                                                Already registered? Login
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </form>
                    </div>
                </Dialog>
            )}
        </Transition>
    )
}

export default Authentication
