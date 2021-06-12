import { useState } from 'react'
import { Switch } from '@headlessui/react'

import { add } from '../../services/postService'

const AddPost = () => {
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
        let data = {
            ...post
        }

        if (!data.title) {
            console.log(`No auth`)
            setSaving(false)
            return
        }
        await add(data)
            .then(res => {
                setStatus({
                    message: 'Posted successfully!',
                    type: 'success'
                })
                setPost(initialPostState)
            })
            .catch(err => {
                console.log(err)
                setStatus({
                    message: 'Unable to save post!',
                    type: 'failure'
                })
            })
        setSaving(false)
        clearMessage()
    }

    const clearMessage = () => {
        setTimeout(() => {
            setStatus({
                message: '',
                type: ''
            })
        }, 2000)
    }

    return (
        <div className={`submit-form`}>
            <form
                onSubmit={handlePostSave}
                className={`flex flex-col space-y-4 p-6 mx-auto w-full max-w-lg`}
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
                <h1 className={`font-extrabold text-blue-600 text-5xl my-2 `}>
                    Add Post
                </h1>

                <span className={`flex flex-col`}>
                    <label
                        className={`font-semibold text-blue-600 text-lg`}
                        htmlFor='title'
                    >
                        Title
                    </label>
                    <input
                        className={`px-4 py-2 bg-gray-50 rounded-md border border-blue-300`}
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
                        className={`font-semibold text-blue-600 text-lg`}
                        htmlFor='description'
                    >
                        Description
                    </label>
                    <textarea
                        className={`px-4 py-2 mt-1 bg-gray-50 rounded-md resize-none border border-blue-300`}
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
                        className={`font-semibold text-blue-600 text-lg`}
                        htmlFor='creator_name'
                    >
                        Name (Optional)
                    </label>
                    <input
                        className={`px-4 py-2 mt-1 bg-gray-50 rounded-md  border border-blue-300`}
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
                                post.published ? 'bg-blue-600' : 'bg-gray-200'
                            } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none`}
                        >
                            <span className='sr-only'>Publish post</span>
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
                                    ? `text-blue-600`
                                    : `text-gray-500`
                            }`}
                        >
                            Publish this post now
                        </Switch.Label>
                    </div>
                </Switch.Group>

                <button
                    className={`bg-blue-600 text-gray-50 p-3 mt-3 rounded-md focus:outline-none ${
                        saving && `opacity-50 cursor-not-allowed select-none`
                    }`}
                    disabled={saving}
                    type='submit'
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddPost
