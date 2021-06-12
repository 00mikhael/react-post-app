import { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import {
    FiEdit,
    FiZap,
    FiUser,
    FiLoader,
    FiTrash2,
    FiSave,
    FiRotateCcw
} from 'react-icons/fi'
import { Dialog, Transition } from '@headlessui/react'

import { getById, updateById, removeById } from '../../services/postService'
import { getUser, updateUserById } from '../../services/userService'

const PostDetail = () => {
    const history = useHistory()
    const { id: postId } = useParams()
    const titleRef = useRef()
    const descRef = useRef()

    const [currentPost, setCurrentPost] = useState()
    const [user, setUser] = useState()
    const [editing, setEditing] = useState(false)
    let [isOpen, setIsOpen] = useState(false)

    const fetchUser = async () => {
        await getUser()
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchPost = async id => {
        await getById(id)
            .then(res => {
                setCurrentPost(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchUser()
        fetchPost(postId)
    }, [postId])

    const handlePostDelete = async () => {
        setIsOpen(false)
        if (!user) {
            alert('Log in!')
            return
        }
        await removeById(currentPost._id)
            .then(res => {
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleUserUpdate = async update => {
        if (!user) {
            alert('Log in!')
            return
        }
        let userUpdate = {
            favoritePosts: update.favoritePosts
        }
        return updateUserById(user._id, userUpdate)
    }

    const handlePostUpdate = async update => {
        if (!user) {
            alert('Log in!')
            return
        }
        const postUpdate = {
            title: titleRef.current.textContent,
            description: descRef.current.textContent,
            favorites: update.favorites,
            favoritesCount: update.favoritesCount
        }
        return updateById(currentPost._id, postUpdate)
    }

    const handlePostFavorite = () => {
        if (!user) {
            alert('Log in!')
            return
        }
        let postUpdate
        let userUpdate
        let isFavorite =
            user.favoritePosts.includes(currentPost._id) &&
            currentPost.favorites.includes(user._id)

        if (isFavorite) {
            postUpdate = currentPost.favorites.filter(userId => {
                return userId !== user._id
            })
            userUpdate = user.favoritePosts.filter(postId => {
                return postId !== currentPost._id
            })
        } else {
            postUpdate = [...currentPost.favorites, user._id]
            userUpdate = [...user.favoritePosts, currentPost._id]
        }

        setCurrentPost({
            ...currentPost,
            favorites: postUpdate,
            favoritesCount: postUpdate.length
        })
        setUser({ ...user, favoritePosts: userUpdate })

        Promise.all([
            handlePostUpdate({
                favorites: postUpdate,
                favoritesCount: postUpdate.length
            }),
            handleUserUpdate({ favoritePosts: userUpdate })
        ])
            .then(results => {
                const {
                    data: { post }
                } = results[0]
                const {
                    data: { user }
                } = results[1]

                setCurrentPost(post)
                setUser(user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handlePostEdit = () => {
        setEditing(true)
        titleRef.current.contentEditable = true
        descRef.current.contentEditable = true
    }

    const handlePostEditComplete = () => {
        Promise.resolve(handlePostUpdate({ favorites: currentPost.favorites }))
            .then(res => {
                setCurrentPost(res.data.post)
                titleRef.current.contentEditable = false
                descRef.current.contentEditable = false
                setEditing(false)
            })
            .catch(err => {
                console.log(err)
                titleRef.current.contentEditable = false
                descRef.current.contentEditable = false
            })
    }

    const handlePostEditCancel = () => {
        titleRef.current.textContent = currentPost.title
        descRef.current.textContent = currentPost.description
        titleRef.current.contentEditable = false
        descRef.current.contentEditable = false
        setEditing(false)
    }

    if (!currentPost) {
        return <FiLoader className={`m-6 animate-spin mx-auto`} />
    }

    return (
        <div className={`p-6`}>
            {currentPost && (
                <div
                    className={`p-6 md:mx-auto shadow-md rounded-lg bg-white text-lg max-w-3xl`}
                >
                    <div className={`space-y-4`}>
                        {user && currentPost.creator_id === user._id && (
                            <div className={`flex justify-end`}>
                                {!editing ? (
                                    <span
                                        className={`flex items-center space-x-8`}
                                    >
                                        <FiEdit
                                            onClick={handlePostEdit}
                                            className={`cursor-pointer text-green-500`}
                                        />
                                        <FiTrash2
                                            onClick={() => setIsOpen(true)}
                                            className={`cursor-pointer text-red-600`}
                                        />
                                    </span>
                                ) : (
                                    <span
                                        className={`flex items-center space-x-8`}
                                    >
                                        <FiRotateCcw
                                            onClick={handlePostEditCancel}
                                            className={`cursor-pointer text-gray-500`}
                                        />
                                        <FiSave
                                            onClick={handlePostEditComplete}
                                            className={`cursor-pointer text-green-500`}
                                        />
                                    </span>
                                )}
                            </div>
                        )}
                        <div
                            className={`font-semibold flex justify-between items-center space-x-8`}
                        >
                            <h2
                                ref={titleRef}
                                className={`text-blue-600 ${
                                    editing &&
                                    `border border-gray-300 p-2 rounded-md`
                                }`}
                            >
                                {currentPost.title}
                            </h2>
                        </div>
                        <div
                            className={`text-sm text-gray-600 flex flex-wrap  justify-between mt-6 space-x-6`}
                        >
                            <span className={`flex items-center space-x-4`}>
                                <span
                                    className={`flex items-center text-blue-600`}
                                >
                                    <FiUser className={`mr-1`} />
                                    {currentPost.creator_name}
                                </span>

                                <span
                                    className={`flex items-center ${
                                        user?.favoritePosts.includes(
                                            currentPost._id
                                        ) && `text-yellow-400`
                                    }`}
                                >
                                    <FiZap
                                        onClick={handlePostFavorite}
                                        className={`cursor-pointer mr-1`}
                                    />
                                    {currentPost.favoritesCount}
                                </span>
                            </span>
                            <span>
                                {moment(currentPost.createdAt).fromNow()}
                            </span>
                        </div>
                        <p
                            ref={descRef}
                            className={`text-base text-gray-700 ${
                                editing &&
                                `border border-gray-300 p-2 rounded-md`
                            }`}
                        >
                            {`${currentPost.description}`}
                        </p>
                    </div>
                </div>
            )}
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
                    onClose={() => setIsOpen(false)}
                >
                    <div className='flex items-center justify-center min-h-screen'>
                        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />

                        <div className='bg-white rounded max-w-sm mx-auto'>
                            <Dialog.Title>Delete post</Dialog.Title>

                            <p>
                                Are you sure you want to delete this post? This
                                action cannot be undone.
                            </p>

                            <button onClick={handlePostDelete}>Delete</button>
                            <button onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default PostDetail
