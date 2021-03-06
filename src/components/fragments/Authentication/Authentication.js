import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { useHistory } from 'react-router-dom'
import { isEmail } from 'validator'

import {
    login,
    register,
    forgotPassword,
    cancelPasswordReset,
    resetPassword
} from '../../../actions/user'
import { showAuth } from '../../../actions/default'

const Authentication = ({ type, isOpen, onClose }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)

    const initialUserState = {
        username: '',
        email: '',
        password: '',
        email_username: ''
    }

    const [userDetail, setUserDetail] = useState(initialUserState)
    const [saving, setSaving] = useState(false)
    const [currentType, setCurrentType] = useState()
    const [status, setStatus] = useState({
        message: '',
        type: ''
    })

    useEffect(() => {
        setUserDetail(initialUserState)
        setCurrentType(type) // eslint-disable-next-line
    }, [type])

    useEffect(() => {
        setStatus({
            message: '',
            type: ''
        })
    }, [currentType])

    const handleInputChange = event => {
        const { name, value } = event.target
        setUserDetail({ ...userDetail, [name]: value })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        setSaving(true)

        switch (currentType) {
            case 'login':
                if (!userDetail.username) {
                    setSaving(false)
                    return
                }
                if (!userDetail.password) {
                    setSaving(false)
                    return
                }

                await dispatch(login(userDetail))
                    .then(res => {
                        localStorage.setItem('refreshToken', res.refreshToken)
                        setUserDetail(initialUserState)
                        console.log(history.location.pathname)
                        onClose()
                        if (
                            history.location.pathname === '/' ||
                            history.location.pathname.includes('/posts') ||
                            history.location.pathname === '/dashboard'
                        ) {
                            return
                        }
                        history.push('/')
                    })
                    .catch(err => {
                        setStatus({
                            message: err.message || 'Unable to Login!',
                            type: 'failure'
                        })
                    })
                break
            case 'forgot password':
                if (!userDetail.email_username) {
                    setSaving(false)
                    break
                }

                if (isEmail(userDetail.email_username)) {
                    userDetail.email = userDetail.email_username
                } else {
                    userDetail.username = userDetail.email_username
                }

                await dispatch(forgotPassword(userDetail))
                    .then(res => {
                        setStatus({
                            message: 'Email sent!',
                            type: 'success'
                        })
                        setUserDetail(initialUserState)
                        clearMessage()
                        setTimeout(() => {
                            onClose()
                        }, 2000)
                    })
                    .catch(err => {
                        setStatus({
                            message: err.message || 'Unable to send email!',
                            type: 'failure'
                        })
                    })
                break
            case 'cancel password reset':
                if (!user.id || !user.resetToken) {
                    setSaving(false)
                    break
                }

                await dispatch(cancelPasswordReset(user.id))
                    .then(res => {
                        setStatus({
                            message: 'Request cancelled!',
                            type: 'success'
                        })
                        setTimeout(() => {
                            clearMessage()
                            onClose()
                            history.push('/')
                        }, 2000)
                    })
                    .catch(err => {
                        setStatus({
                            message: err.message || 'Unable to cancel request!',
                            type: 'failure'
                        })
                        setTimeout(() => {
                            onClose()
                            history.push('/')
                        }, 2000)
                    })
                break
            case 'reset password':
                if (!user.id || !user.resetToken) {
                    setSaving(false)
                    break
                }

                if (!userDetail.password) {
                    setSaving(false)
                    break
                }

                await dispatch(
                    resetPassword(user.resetToken, user.id, userDetail)
                )
                    .then(res => {
                        setStatus({
                            message: 'Password reset successful!',
                            type: 'success'
                        })
                        setUserDetail(initialUserState)
                        clearMessage()
                        history.push('/')
                        setTimeout(() => {
                            dispatch(showAuth({ isShow: true, type: 'login' }))
                        }, 2000)
                    })
                    .catch(err => {
                        setStatus({
                            message: err.message || 'Unable to reset password!',
                            type: 'failure'
                        })
                    })
                break
            case 'register':
                if (!userDetail.username) {
                    setSaving(false)
                    return
                }
                if (!userDetail.password) {
                    setSaving(false)
                    return
                }
                if (!userDetail.email) {
                    setSaving(false)
                    break
                }
                await dispatch(register(userDetail))
                    .then(res => {
                        setUserDetail(initialUserState)
                        setStatus({
                            message: '',
                            type: ''
                        })
                        setCurrentType('login')
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
        }, 2000)
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
                            className={`flex flex-col space-y-4 p-6 mx-4 sm:mx-auto w-full max-w-lg bg-white z-10 rounded-lg`}
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
                                className={`font-extrabold text-purple-600 text-3xl my-2 capitalize`}
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
                                            className={`bg-purple-600 hover:bg-purple-700 text-gray-50 w-full p-3 mt-3 rounded-md ${
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
                                            className={`border border-gray-500 text-gray-500 hover:text-gray-100 hover:bg-gray-500 w-full p-3 mt-3 rounded-md ${
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
                                            className={`font-semibold text-green-600 cursor-pointer`}
                                        >
                                            Use default user
                                        </div>
                                        <span className={`text-gray-600`}>
                                            |
                                        </span>
                                        <div
                                            onClick={() =>
                                                setCurrentType(
                                                    'forgot password'
                                                )
                                            }
                                            className={`cursor-pointer`}
                                        >
                                            Forgot password
                                        </div>
                                        <span className={`text-gray-600`}>
                                            |
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
                            ) : currentType === 'forgot password' ? (
                                <div className={`space-y-4`}>
                                    <span className={`flex flex-col`}>
                                        <label
                                            className={`font-semibold text-purple-600 text-lg`}
                                            htmlFor='email_username'
                                        >
                                            Email or Username
                                        </label>
                                        <input
                                            className={`px-4 py-2 bg-gray-50 rounded-md border border-purple-300`}
                                            id='email_username'
                                            value={userDetail.email_username}
                                            type='text'
                                            onChange={handleInputChange}
                                            placeholder='Email or Username'
                                            name='email_username'
                                            maxLength={100}
                                        />
                                    </span>
                                    <div
                                        className={`flex justify-between items-center space-x-4`}
                                    >
                                        <button
                                            style={{ maxWidth: '8rem' }}
                                            className={`bg-purple-600 hover:bg-purple-700 text-gray-50 w-full p-3 mt-3 rounded-md ${
                                                saving &&
                                                `opacity-50 cursor-not-allowed select-none`
                                            }`}
                                            disabled={saving}
                                            type='submit'
                                        >
                                            Send Email
                                        </button>
                                        <button
                                            style={{ maxWidth: '8rem' }}
                                            className={`border border-gray-500 text-gray-500 hover:text-gray-100 hover:bg-gray-500 w-full p-3 mt-3 rounded-md ${
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
                                            onClick={() =>
                                                setCurrentType('login')
                                            }
                                            className={`cursor-pointer`}
                                        >
                                            Login
                                        </div>
                                        <span className={`text-gray-600`}>
                                            |
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
                            ) : currentType === 'cancel password reset' ? (
                                <div className={`space-y-4`}>
                                    <div
                                        className={`flex justify-between items-center space-x-4`}
                                    >
                                        <button
                                            style={{ maxWidth: '10rem' }}
                                            className={`bg-purple-600 hover:bg-purple-700 text-gray-50 w-full p-3 mt-3 rounded-md ${
                                                saving &&
                                                `opacity-50 cursor-not-allowed select-none`
                                            }`}
                                            disabled={saving}
                                            type='submit'
                                        >
                                            Cancel Request
                                        </button>
                                        <button
                                            style={{ maxWidth: '8rem' }}
                                            className={`border border-gray-500 text-gray-500 hover:text-gray-100 hover:bg-gray-500 w-full p-3 mt-3 rounded-md ${
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
                                            onClick={() =>
                                                setCurrentType('login')
                                            }
                                            className={`cursor-pointer`}
                                        >
                                            Login
                                        </div>
                                        <span className={`text-gray-600`}>
                                            |
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
                            ) : currentType === 'reset password' ? (
                                <div className={`space-y-4`}>
                                    <span className={`flex flex-col`}>
                                        <label
                                            className={`font-semibold text-purple-600 text-lg`}
                                            htmlFor='password'
                                        >
                                            New Password
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
                                            style={{ maxWidth: '10rem' }}
                                            className={`bg-purple-600 hover:bg-purple-700 text-gray-50 w-full p-3 mt-3 rounded-md ${
                                                saving &&
                                                `opacity-50 cursor-not-allowed select-none`
                                            }`}
                                            disabled={saving}
                                            type='submit'
                                        >
                                            Change Password
                                        </button>
                                        <button
                                            style={{ maxWidth: '8rem' }}
                                            className={`border border-gray-500 text-gray-500 hover:text-gray-100 hover:bg-gray-500 w-full p-3 mt-3 rounded-md ${
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
                                            onClick={() =>
                                                setCurrentType('login')
                                            }
                                            className={`cursor-pointer`}
                                        >
                                            Login
                                        </div>
                                        <span className={`text-gray-600`}>
                                            |
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
                                                className={`bg-purple-600 hover:bg-purple-700 text-gray-50 w-full p-3 mt-3 rounded-md ${
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
                                                className={`border border-gray-500 text-gray-500 hover:text-gray-100 hover:bg-gray-500 w-full p-3 mt-3 rounded-md ${
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
