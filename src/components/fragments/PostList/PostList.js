import styles from './PostList.module.css'

import { useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Switch } from '@headlessui/react'
import moment from 'moment'

import { FiZap, FiUser, FiList, FiGrid } from 'react-icons/fi'

import { updatePost, refreshPosts } from '../../../actions/posts'
import { updateUser, refreshUser } from '../../../actions/user'
import { showAuth } from '../../../actions/default'

const PostList = ({ posts }) => {
    const [layout, setLayout] = useState('grid')

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
                    maxWidth: `${layout !== 'grid' ? '39rem' : '72rem'}`
                }}
                className={`${styles.list} flex flex-wrap flex-row gap-4 p-4 mx-auto  justify-center`}
            >
                {posts &&
                    posts.length > 0 &&
                    posts.map(post => <PostItem key={post._id} post={post} />)}
            </div>
        </>
    )
}

const PostItem = memo(({ post }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)

    let isFavorite =
        user?.favoritePosts?.includes(post?._id) &&
        post?.favorites?.includes(user?._id)

    const refresh = (userUpdate, postUpdate) => {
        if (userUpdate) {
            dispatch(refreshUser(userUpdate))
        }
        if (postUpdate) {
            dispatch(
                refreshPosts({
                    id: post._id,
                    update: postUpdate
                })
            )
        }
    }

    const update = (userUpdate, postUpdate) => {
        if (userUpdate) {
            dispatch(updateUser(user._id, userUpdate)).catch(console.log)
        }
        if (postUpdate) {
            dispatch(updatePost(post._id, postUpdate))
        }
    }

    const handlePostClick = () => {
        history.push(`/posts/${post._id}`)
    }

    const handleCheckChange = checked => {
        refresh(null, { published: checked })
        update(null, { published: checked })
    }

    const handlePostFavorite = async () => {
        if (!user?.username) {
            dispatch(showAuth({ isShow: true, type: 'login' }))
            return
        }

        let postUpdate = null
        let userUpdate = null

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

        refresh(
            { favoritePosts: userUpdate },
            {
                favorites: postUpdate,
                favoritesCount: postUpdate.length
            }
        )

        update(
            { favoritePosts: userUpdate },
            {
                favorites: postUpdate,
                favoritesCount: postUpdate.length
            }
        )
    }

    return (
        <div
            style={{
                flexBasis: '18.5rem',
                width: '14.5rem',
                height: 'auto',
                maxWidth: '550px'
            }}
            className={`flex-grow shadow-lg hover:shadow-md rounded-lg overflow-hidden flex flex-col relative my-2 sm:my-0 p-6 bg-white text-lg `}
        >
            {!post.published && (
                <div className={`flex justify-end mb-4`}>
                    <Switch
                        id='published'
                        name='published'
                        checked={post.published}
                        onChange={handleCheckChange}
                        className={`${
                            post.published ? 'bg-purple-600' : 'bg-gray-200'
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
                </div>
            )}
            <div className={`flex flex-col justify-between h-full`}>
                <div
                    className={`space-y-4 cursor-pointer`}
                    onKeyDown={handlePostClick}
                    onClick={handlePostClick}
                >
                    <div
                        className={`font-semibold flex items-center space-x-4 `}
                    >
                        <h2 className={`flex-1 text-purple-600`}>
                            {post.title}
                        </h2>
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
                            onKeyDown={handlePostFavorite}
                            onClick={handlePostFavorite}
                        >
                            <FiZap className={` mr-1 text-base`} />
                            {post.favoritesCount > 0 && post.favoritesCount}
                        </span>
                    </span>
                    <span>{moment(post.createdAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
})

export default PostList
