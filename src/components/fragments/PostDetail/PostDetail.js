import { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
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

import { getById } from '../../../services/postService'
import { refreshPosts, updatePost, deletePost } from '../../../actions/posts'
import { refreshUser, updateUser } from '../../../actions/user'
import { showAuth } from '../../../actions/default'

const PostDetail = () => {
    const history = useHistory()
    const { id: postId } = useParams()
    const titleRef = useRef()
    const descRef = useRef()
    const dispatch = useDispatch()

    const [currentPost, setCurrentPost] = useState()
    const user = useSelector(state => state.user)
    const posts = useSelector(state => state.posts)
    const [editing, setEditing] = useState(false)
    let [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
        if (posts && posts.length > 0) {
            posts.forEach(post => {
                if (post._id === postId || post._id === currentPost?._id) {
                    setCurrentPost(post)
                }
            })
        } // eslint-disable-next-line
    }, [posts])

    useEffect(() => {
        fetchPost(postId)
    }, [postId])

    const handlePostDelete = async () => {
        setIsDeleteDialogOpen(false)
        await dispatch(deletePost(currentPost._id)).catch(console.log)
        history.push('/')
    }

    const handlePostFavorite = async () => {
        if (!user) {
            dispatch(showAuth(true))
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

        dispatch(
            refreshPosts(currentPost._id, {
                favorites: postUpdate,
                favoritesCount: postUpdate.length
            })
        )
        dispatch(refreshUser({ favoritePosts: userUpdate }))

        dispatch(updateUser(user._id, { favoritePosts: userUpdate }))
        const res = await dispatch(
            updatePost(currentPost._id, {
                favorites: postUpdate,
                favoritesCount: postUpdate.length
            })
        )

        setCurrentPost(res.data.post)
    }

    const handlePostEdit = () => {
        setEditing(true)
        titleRef.current.contentEditable = true
        descRef.current.contentEditable = true
    }

    const handlePostEditComplete = async () => {
        const res = await dispatch(
            updatePost(currentPost._id, {
                title: titleRef.current.textContent,
                description: descRef.current.textContent
            })
        )

        setCurrentPost(res.data.post)
        titleRef.current.contentEditable = false
        descRef.current.contentEditable = false
        setEditing(false)
    }

    const handlePostEditCancel = () => {
        titleRef.current.textContent = currentPost.title
        descRef.current.textContent = currentPost.description
        titleRef.current.contentEditable = false
        descRef.current.contentEditable = false
        setEditing(false)
    }

    if (!currentPost) {
        return (
            <div
                className={`mx-auto w-min px-6 py-4  text-sm text-purple-600 rounded-lg text-center bg-white mt-6`}
            >
                <FiLoader className={`animate-spin `} />
            </div>
        )
    }

    return (
        <>
            {currentPost && (
                <div
                    className={`p-6 mx-6 md:mx-auto rounded-lg text-lg max-w-3xl my-6 bg-white shadow-lg`}
                >
                    {user && currentPost.creator_id === user._id && (
                        <div className={`flex justify-end my-4`}>
                            {!editing ? (
                                <span className={`flex items-center space-x-8`}>
                                    <FiEdit
                                        onClick={handlePostEdit}
                                        className={`cursor-pointer text-green-500`}
                                    />
                                    <FiTrash2
                                        onClick={() =>
                                            setIsDeleteDialogOpen(true)
                                        }
                                        className={`cursor-pointer text-red-600`}
                                    />
                                </span>
                            ) : (
                                <span className={`flex items-center space-x-8`}>
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
                    <div className={`space-y-2`}>
                        <div
                            className={`font-semibold flex justify-between items-center space-x-8`}
                        >
                            <h2
                                ref={titleRef}
                                className={`text-purple-600 ${
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
                                    className={`flex items-center text-purple-600`}
                                >
                                    <FiUser className={`mr-1`} />
                                    {currentPost.creator_name}
                                </span>

                                <span
                                    onKeyDown={handlePostFavorite}
                                    onClick={handlePostFavorite}
                                    className={`flex items-center cursor-pointer ${
                                        user?.favoritePosts?.includes(
                                            currentPost._id
                                        ) && `text-yellow-400`
                                    }`}
                                >
                                    <FiZap className={` mr-1 text-base`} />
                                    {currentPost.favoritesCount > 0 &&
                                        currentPost.favoritesCount}
                                </span>
                            </span>
                            <span>
                                {moment(currentPost.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                    <p
                        ref={descRef}
                        className={`text-base text-gray-700 mt-8 ${
                            editing && `border border-gray-300 p-2 rounded-md`
                        }`}
                    >
                        {`${currentPost.description}`}
                    </p>
                </div>
            )}
            <Transition
                show={isDeleteDialogOpen}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
            >
                <Dialog
                    className='fixed z-10 inset-0 overflow-y-auto'
                    open={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                >
                    <div className='flex items-center justify-center min-h-screen'>
                        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />

                        <div className=' bg-white rounded-lg max-w-sm px-6 py-4 space-y-2 shadow-lg z-10'>
                            <Dialog.Title className={`text-red-600 text-lg`}>
                                Delete post
                            </Dialog.Title>

                            <p>
                                Are you sure you want to delete this post? This
                                action cannot be undone.
                            </p>

                            <div className={`space-x-4 flex items-center pt-4`}>
                                <button
                                    className={`flex items-center rounded px-6 py-2 cursor-pointer
                                bg-red-500 hover:bg-red-600
                                    text-white font-sans font-medium`}
                                    onClick={handlePostDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    className={`flex items-center rounded px-6 py-2 cursor-pointer
                                    border border-gray-500
                                    text-gray-500 hover:text-gray-100 hover:bg-gray-500 font-sans
                                    font-medium`}
                                    onClick={() => setIsDeleteDialogOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default PostDetail
