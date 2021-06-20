import { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Listbox, Transition } from '@headlessui/react'
import { FiCheck } from 'react-icons/fi'
import { HiSelector } from 'react-icons/hi'

import PostList from '../../fragments/PostList'
import withAddPost from '../../hoc/withAddPost'

import { retrievePosts } from '../../../actions/posts'
import { showAuth } from '../../../actions/default'

const status = ['Published', 'Drafts']

const Dashboard = () => {
    const [selectedStatus, setSelectedStatus] = useState(status[0])
    const dispatch = useDispatch()
    const initialUserPosts = { published: [], drafts: [] }
    const user = useSelector(state => state.user)
    const posts = useSelector(state => state.posts)
    const defaults = useSelector(state => state.defaults)
    const [userPosts, setUserPosts] = useState(initialUserPosts)

    useEffect(() => {
        dispatch(retrievePosts(defaults.currentPosts)).catch(console.log)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let timer = setTimeout(() => {
            if (!user) {
                dispatch(showAuth(true))
            } else {
                dispatch(showAuth(false))
            }
        }, 3000)
        return () => clearTimeout(timer)
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        setUserPosts(initialUserPosts)
        if (posts && posts.length > 0) {
            let userPublished = posts.filter(post => {
                if (post.creator_id === user?._id && post.published === true) {
                    return post
                }
                return false
            })
            let userDrafts = posts.filter(post => {
                if (post.creator_id === user?._id && post.published !== true) {
                    return post
                }
                return false
            })
            if (userPublished.length > 0 || userDrafts.length > 0) {
                setUserPosts({
                    published: userPublished,
                    drafts: userDrafts
                })
            }
        } // eslint-disable-next-line
    }, [posts, user])

    return (
        <>
            {user ? (
                <div className={``}>
                    <div className={`flex flex-col items-center`}>
                        <div
                            className={`rounded-full bg-purple-600 flex justify-center items-center w-24 h-24 text-gray-200`}
                        >
                            <img
                                src={`https://eu.ui-avatars.com/api/?format=svg&background=2a41&color=fff&bold=true&rounded=true&name=${user.username}&length=1&size=100`}
                                alt={user.username}
                            />
                        </div>
                        <div
                            className={` capitalize text-3xl text-purple-600 mt-3 mb-5 text-center font-bold`}
                        >
                            {user.username}
                        </div>
                    </div>
                    <div className='w-72 mx-auto'>
                        <Listbox
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                        >
                            <div className='relative mt-1'>
                                <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white bg-opacity-75 text-purple-600 cursor-pointer rounded-lg sm:text-sm focus:outline-none'>
                                    <span className='block truncate'>
                                        {selectedStatus}
                                    </span>
                                    <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                        <HiSelector
                                            className='w-5 h-5 text-purple-400'
                                            aria-hidden='true'
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave='transition ease-in duration-100'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                >
                                    <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 shadow-lg'>
                                        {status.map((status, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={`
                          cursor-pointer select-none relative py-2 pl-10 pr-4`}
                                                value={status}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`${
                                                                selected
                                                                    ? 'font-medium text-purple-500'
                                                                    : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {status}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`
                                absolute inset-y-0 left-0 flex items-center pl-3 text-purple-500`}
                                                            >
                                                                <FiCheck
                                                                    className='w-5 h-5'
                                                                    aria-hidden='true'
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    {selectedStatus === 'Published' &&
                        userPosts.published.length > 0 && (
                            <PostList posts={userPosts.published} />
                        )}
                    {selectedStatus === 'Drafts' &&
                        userPosts.drafts.length > 0 && (
                            <PostList posts={userPosts.drafts} />
                        )}
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
