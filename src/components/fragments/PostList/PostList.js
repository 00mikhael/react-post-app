import styles from './PostList.module.css'

import { useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { FiZap, FiUser, FiList, FiGrid } from 'react-icons/fi'

import { updatePost } from '../../../actions/posts'
import { updateUser } from '../../../actions/user'

const PostList = () => {
    const [layout, setLayout] = useState('grid')

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const posts = useSelector(state => state.posts)

    const handlePostClick = post => {
        history.push(`/posts/${post._id}`)
    }

    const handlePostFavorite = async (post, index) => {
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

        await dispatch(
            updatePost(post._id, {
                favorites: postUpdate,
                favoritesCount: postUpdate.length
            })
        ).catch(console.log)

        await dispatch(
            updateUser(user._id, { favoritePosts: userUpdate })
        ).catch(console.log)
    }

    const handleLayoutChange = type => {
        setLayout(type)
    }

    return (
        <>
            {posts && posts.length > 2 && (
                <div
                    className={`flex flex-col items-center justify-center m-6 mb-0 space-y-6`}
                >
                    <span
                        className={`items-center  text-lg text-gray-600 mb-0 bg-white rounded-lg shadow overflow-hidden hidden sm:inline-flex`}
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
            )}
            <div
                style={{
                    maxWidth: `${layout !== 'grid' ? '41rem' : '72rem'}`
                }}
                className={`${styles.list} flex flex-wrap flex-row gap-4 p-4 mx-auto  justify-center`}
            >
                {posts &&
                    posts.length > 0 &&
                    posts.map((post, index) => (
                        <PostItem
                            key={post._id}
                            post={post}
                            isFavorite={user?.favoritePosts?.includes(post._id)}
                            onClick={() => handlePostClick(post)}
                            onFavorite={() => handlePostFavorite(post, index)}
                        />
                    ))}
            </div>
        </>
    )
}

const PostItem = memo(({ post, isFavorite, onClick, onFavorite }) => {
    return (
        <div
            style={{
                flexBasis: '18.5rem',
                width: '14.5rem',
                height: 'auto',
                maxWidth: '550px'
            }}
            className={`flex-grow  bg-fuchsia-200 shadow-lg hover:shadow-md rounded-lg overflow-hidden flex flex-col relative m-2 p-6 bg-white text-lg justify-between`}
        >
            <div
                className={`space-y-4 cursor-pointer`}
                onKeyDown={onClick}
                onClick={onClick}
            >
                <div className={`font-semibold flex items-center space-x-4 `}>
                    <h2 className={`flex-1 text-purple-600`}>{post.title}</h2>
                </div>

                <p className={`text-base text-gray-700`}>
                    {`${post.description.substr(0, 200)}...`}
                </p>
            </div>
            <div
                className={`text-sm text-gray-600 flex flex-wrap justify-between mt-6 space-x-6`}
            >
                <span className={`flex items-center space-x-4`}>
                    <span className={`flex items-center text-purple-600 `}>
                        <FiUser className={`mr-1`} />
                        {post.creator_name}
                    </span>
                    <span
                        className={`flex items-center cursor-pointer ${
                            isFavorite && `text-yellow-400`
                        }`}
                        onKeyDown={onFavorite}
                        onClick={onFavorite}
                    >
                        <FiZap className={` mr-1`} />
                        {post.favoritesCount > 0 && post.favoritesCount}
                    </span>
                </span>
                <span>{moment(post.createdAt).fromNow()}</span>
            </div>
        </div>
    )
})

export default PostList