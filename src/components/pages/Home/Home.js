import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FiSearch, FiLoader } from 'react-icons/fi'

import withAddPost from '../../hoc/withAddPost'
import { retrievePosts, findPosts, filterPosts } from '../../../actions/posts'
import PostList from '../../fragments/PostList'

const Home = () => {
    const dispatch = useDispatch()
    const defaults = useSelector(state => state.defaults)
    const posts = useSelector(state => state.posts)
    const [postFilter, setPostFilter] = useState('')

    useEffect(() => {
        if (!postFilter) {
            dispatch(retrievePosts(defaults.currentPosts)).catch(console.log)
        }
        // eslint-disable-next-line
    }, [postFilter])

    const handleSearch = e => {
        e.preventDefault()
        if (postFilter) {
            dispatch(findPosts(postFilter)).catch(console.log)
        }
    }

    const setQuery = e => {
        dispatch(filterPosts(e.target.value, defaults.currentPosts))
        setPostFilter(e.target.value)
    }

    return (
        <>
            <div
                className={` flex flex-col items-center justify-center m-6 mb-0 space-y-6 `}
            >
                <form
                    onSubmit={handleSearch}
                    className={`rounded-lg h-12 shadow bg-white overflow-hidden w-full max-w-xl flex items-center pl-4`}
                >
                    <FiSearch
                        className={`text-lg text-gray-500 cursor-pointer`}
                        onClick={handleSearch}
                    />
                    <input
                        className={`h-full w-full flex-1 rounded-r-lg outline-none focus:outline-none  ml-4 pr-4`}
                        type='search'
                        spellCheck={false}
                        onChange={setQuery}
                    />
                </form>
            </div>
            {!posts && (
                <div
                    className={`mx-auto w-min px-6 py-4  text-sm text-purple-600 rounded-lg text-center bg-white mt-6`}
                >
                    <FiLoader className={`animate-spin `} />
                </div>
            )}
            {posts && posts.length > 0 && <PostList posts={posts} />}
        </>
    )
}

export default withAddPost(Home)
