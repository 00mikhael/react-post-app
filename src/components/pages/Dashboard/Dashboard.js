import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PostList from '../../fragments/PostList'
import withAddPost from '../../hoc/withAddPost'

import { retrievePosts } from '../../../actions/posts'
import { showAuth } from '../../../actions/default'

const Dashboard = () => {
    const dispatch = useDispatch()
    const initialUserPosts = []
    const user = useSelector(state => state.user)
    const posts = useSelector(state => state.posts)
    const [userPosts, setUserPosts] = useState(initialUserPosts)

    useEffect(() => {
        dispatch(retrievePosts())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let timer = setTimeout(() => {
            if (!user) {
                dispatch(showAuth(true))
            }
        }, 3000)
        return () => clearTimeout(timer)
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        setUserPosts(initialUserPosts)
        if (posts && posts.length > 0) {
            // eslint-disable-next-line
            let postsCopy = posts.filter(post => {
                if (post.creator_id === user?._id) {
                    return post
                }
            })
            if (postsCopy.length > 0) {
                setUserPosts(postsCopy)
            }
        } // eslint-disable-next-line
    }, [posts, user])

    return (
        <>
            {user ? (
                <div className={`space-y-2 mt-4`}>
                    <div className={`flex flex-col items-center space-y-4`}>
                        <div
                            className={`rounded-full bg-purple-600 flex justify-center items-center w-24 h-24 text-gray-200`}
                        >
                            <img
                                src={`https://eu.ui-avatars.com/api/?format=svg&background=2a41&color=fff&bold=true&rounded=true&name=${user.username}&length=1&size=100`}
                                alt={user.username}
                            />
                        </div>
                        <div
                            className={`text-2xl text-white capitalize font-bold mb-2`}
                        >
                            {user.username + `’s Posts`}
                        </div>
                    </div>
                    {/* {!showPosts && (
                        <div
                            className={`mx-auto w-min px-6 py-4  text-sm text-purple-600 rounded-lg text-center bg-white mt-6`}
                        >
                            <FiLoader className={`animate-spin `} />
                        </div>
                    )} */}
                    {userPosts.length > 0 && <PostList posts={userPosts} />}
                </div>
            ) : (
                <div
                    className={`text-3xl text-purple-600 my-5 text-center font-bold`}
                >
                    Dashboard
                </div>
            )}
        </>
    )
}

export default withAddPost(Dashboard)
