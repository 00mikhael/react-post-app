import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'

import { addPost } from '../../../actions/posts'

const AddPost = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const initialPostState = {
        creator_name: '',
        title: '',
        description: '',
        published: false
    }

    const [post, setPost] = useState(initialPostState)
    const [saving, setSaving] = useState(false)
    const [status, setStatus] = useState({
        message: '',
        type: ''
    })

    const handleInputChange = event => {
        const { name, value } = event.target
        setPost({ ...post, [name]: value })
    }

    const handleCheckChange = checked => {
        setPost({ ...post, published: checked })
    }

    const handlePostSave = async event => {
        event.preventDefault()
        setSaving(true)

        if (!post.title) {
            setSaving(false)
            return
        }
        await dispatch(addPost(post, user.accessToken))
            .then(res => {
                onClose()
            })
            .catch(err => {
                setStatus({
                    message: err.message || 'Unable to add post!',
                    type: 'failure'
                })
            })
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

    useEffect(() => {
        setPost(initialPostState)
        clearMessage() // eslint-disable-next-line
    }, [onClose])

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
            <Dialog
                className='fixed z-10 inset-0 overflow-y-auto'
                open={isOpen}
                onClose={onClose}
            >
                <div className='flex items-center justify-center min-h-screen'>
                    <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />

                    <form
                        onSubmit={handlePostSave}
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
                            className={`font-extrabold text-purple-600 text-3xl my-2 capitalize `}
                        >
                            Add Post
                        </h1>

                        <span className={`flex flex-col`}>
                            <label
                                className={`font-semibold text-purple-600 text-lg`}
                                htmlFor='title'
                            >
                                Title
                            </label>
                            <input
                                className={`px-4 py-2 bg-gray-50 rounded-md border border-purple-300`}
                                id='title'
                                type='text'
                                value={post.title}
                                placeholder='Post title'
                                name='title'
                                onChange={handleInputChange}
                                maxLength={100}
                            />
                        </span>

                        <span className={`flex flex-col`}>
                            <label
                                className={`font-semibold text-purple-600 text-lg`}
                                htmlFor='description'
                            >
                                Description
                            </label>
                            <textarea
                                className={`px-4 py-2 mt-1 bg-gray-50 rounded-md resize-none border border-purple-300`}
                                id='description'
                                type='text'
                                value={post.description}
                                placeholder='Post description'
                                name='description'
                                onChange={handleInputChange}
                            />
                        </span>
                        <span className={`flex flex-col`}>
                            <label
                                className={`font-semibold text-purple-600 text-lg`}
                                htmlFor='creator_name'
                            >
                                Name (Optional)
                            </label>
                            <input
                                className={`px-4 py-2 mt-1 bg-gray-50 rounded-md  border border-purple-300`}
                                id='creator_name'
                                type='text'
                                value={post.creator_name}
                                placeholder='Add display name'
                                name='creator_name'
                                onChange={handleInputChange}
                                maxLength={15}
                            />
                        </span>

                        <Switch.Group>
                            <div className='flex items-center'>
                                <Switch
                                    id='published'
                                    name='published'
                                    checked={post.published}
                                    onChange={handleCheckChange}
                                    className={`${
                                        post.published
                                            ? 'bg-purple-600'
                                            : 'bg-gray-200'
                                    } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
                                >
                                    <span className='sr-only'>
                                        Publish post
                                    </span>
                                    <span
                                        className={`${
                                            post.published
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                                    />
                                </Switch>
                                <Switch.Label
                                    className={`ml-4 ${
                                        post.published
                                            ? `text-purple-600`
                                            : `text-gray-500`
                                    }`}
                                >
                                    Publish this post now
                                </Switch.Label>
                            </div>
                        </Switch.Group>

                        <div
                            className={`flex items-center justify-between space-x-4`}
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
                                Add
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
                    </form>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddPost
