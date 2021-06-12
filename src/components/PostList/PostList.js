import styles from './PostList.module.css'

import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import {
    FiZap,
    FiUser,
    FiLoader,
    FiList,
    FiGrid,
    FiSearch
} from 'react-icons/fi'

import { getAll, updateById } from '../../services/postService'
import { getUser, updateUserById } from '../../services/userService'

const PostList = () => {
    const history = useHistory()
    const [posts, setPosts] = useState()
    const [user, setUser] = useState()
    const [layout, setLayout] = useState('grid')

    const fetchPosts = async () => {
        await getAll()
            .then(res => {
                const { posts } = res.data
                setPosts(posts)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchUser = async () => {
        await getUser()
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchUser()
        fetchPosts()
    }, [])

    const handlePostUpdate = async (id, update) => {
        if (!user) {
            alert('Log in!')
            return
        }
        return updateById(id, update)
    }

    const handleUserUpdate = async (id, update) => {
        if (!user) {
            alert('Log in!')
            return
        }
        return updateUserById(id, update)
    }

    const handlePostClick = post => {
        history.push(`/posts/${post._id}`)
    }

    const handlePostFavorite = (post, index) => {
        if (!user) {
            alert('Log in!')
            return
        }
        let userUpdate
        let postUpdate
        let isFavorite =
            user.favoritePosts.includes(post._id) &&
            post.favorites.includes(user._id)

        if (isFavorite) {
            postUpdate = post.favorites.filter(userId => {
                return userId !== user._id
            })
            userUpdate = user.favoritePosts.filter(postId => {
                return postId !== post._id
            })
        } else {
            postUpdate = [...post.favorites, user._id]
            userUpdate = [...user.favoritePosts, post._id]
        }

        let postCopy = [...posts]
        postCopy.splice(index, 1, {
            ...post,
            favorites: postUpdate,
            favoritesCount: postUpdate.length
        })
        setPosts(postCopy)
        setUser({ ...user, favoritePosts: userUpdate })

        Promise.all([
            handlePostUpdate(post._id, {
                favorites: postUpdate,
                favoritesCount: postUpdate.length
            }),
            handleUserUpdate(user._id, {
                favoritePosts: userUpdate
            })
        ])
            .then(results => {
                const {
                    data: { post }
                } = results[0]
                const {
                    data: { user }
                } = results[1]

                setUser(user)
                let postCopy = [...posts]
                postCopy.splice(index, 1, post)
                setPosts(postCopy)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleLayoutChange = type => {
        setLayout(type)
    }

    const handleQueryChange = event => {}

    const handleSearch = () => {}

    if (!posts) {
        return <FiLoader className={`m-6 animate-spin mx-auto`} />
    }

    if (posts.length === 0) {
        return (
            <div
                className={`m-6 sm:mx-auto my-6 px-6 py-4 max-w-xl text-sm text-gray-100 rounded-lg text-center bg-blue-900`}
            >
                No post yet
            </div>
        )
    }

    return (
        <>
            <div
                className={`flex flex-col items-center justify-center m-6 mb-0 space-y-6`}
            >
                <div
                    className={`rounded-lg h-12 shadow bg-white overflow-hidden w-full max-w-xl flex items-center pl-4`}
                >
                    <FiSearch
                        className={`text-lg text-gray-500 cursor-pointer`}
                        onClick={handleSearch}
                    />
                    <input
                        className={`h-full w-full flex-1 rounded-r-lg outline-none focus:outline-none cursor-pointer  ml-4 pr-4`}
                        type='search'
                        spellCheck={false}
                        onChange={handleQueryChange}
                        onSubmit={handleSearch}
                    />
                </div>
                <span
                    className={`inline-flex items-center  text-lg text-gray-600 mb-0 bg-white rounded-lg shadow overflow-hidden`}
                >
                    <span
                        className={`cursor-pointer p-2  ${
                            layout === 'list' && `bg-gray-200 shadow-inner`
                        }`}
                        onClick={() => handleLayoutChange('list')}
                    >
                        <FiList />
                    </span>
                    <span
                        className={`cursor-pointer p-2  ${
                            layout === 'grid' && `bg-gray-200 shadow-inner`
                        }`}
                        onClick={() => handleLayoutChange('grid')}
                    >
                        <FiGrid />
                    </span>
                </span>
            </div>

            <div
                style={{
                    maxWidth: `${layout !== 'grid' ? '41rem' : '72rem'}`
                }}
                className={`${styles.list} flex flex-wrap flex-row gap-4 p-4 mx-auto  justify-center`}
            >
                {posts.map((post, index) => (
                    <PostItem
                        key={post._id}
                        post={post}
                        isFavorite={user?.favoritePosts.includes(post._id)}
                        onClick={() => handlePostClick(post)}
                        onFavorite={() => handlePostFavorite(post, index)}
                    />
                ))}
            </div>
        </>
    )
}

const PostItem = ({ post, isFavorite, onClick, onFavorite }) => {
    return (
        <div
            style={{
                flexBasis: '18.5rem',
                width: '14.5rem',
                height: 'auto',
                maxWidth: '550px'
            }}
            className={`flex-grow  bg-fuchsia-200 shadow-md hover:shadow-md rounded-lg overflow-hidden flex flex-col relative m-2 p-6 bg-white text-lg justify-between`}
        >
            <div
                className={`space-y-4 cursor-pointer`}
                onKeyDown={onClick}
                onClick={onClick}
            >
                <div className={`font-semibold flex items-center space-x-4 `}>
                    <h2 className={`flex-1 text-blue-600`}>{post.title}</h2>
                </div>

                <p className={`text-base text-gray-700`}>
                    {`${post.description.substr(0, 200)}...`}
                </p>
            </div>
            <div
                className={`text-sm text-gray-600 flex flex-wrap justify-between mt-6 space-x-6`}
            >
                <span className={`flex items-center space-x-4`}>
                    <span className={`flex items-center text-blue-600 `}>
                        <FiUser className={`mr-1`} />
                        {post.creator_name}
                    </span>
                    <span
                        className={`flex items-center ${
                            isFavorite && `text-yellow-400`
                        }`}
                        onKeyDown={onFavorite}
                        onClick={onFavorite}
                    >
                        <FiZap className={`cursor-pointer mr-1`} />
                        {post.favoritesCount}
                    </span>
                </span>
                <span>{moment(post.createdAt).fromNow()}</span>
            </div>
        </div>
    )
}

export default PostList
