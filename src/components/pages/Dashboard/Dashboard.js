import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiLoader } from 'react-icons/fi'

import PostList from '../../fragments/PostList'
import { retrievePostsByUserId } from '../../../actions/posts'
import withAddPost from '../../hoc/withAddPost'

const Dashboard = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [showPosts, setShowPosts] = useState(false)
    useEffect(() => {
        if (user) {
            dispatch(retrievePostsByUserId(user._id)).then(res => {
                setShowPosts(true)
            })
        }
    }, [dispatch, user])

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
                    {!showPosts && (
                        <div
                            className={`mx-auto w-min px-6 py-4  text-sm text-purple-600 rounded-lg text-center bg-white mt-6`}
                        >
                            <FiLoader className={`animate-spin `} />
                        </div>
                    )}
                    {showPosts && <PostList />}
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
