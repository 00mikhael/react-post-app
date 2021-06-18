import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiEdit3 } from 'react-icons/fi'

import AddPost from '../fragments/AddPost'

const withAddPost = Component => {
    return function Parent() {
        const user = useSelector(state => state.user)
        const [isOpen, setIsOpen] = useState(false)
        const close = () => {
            setIsOpen(false)
        }
        return (
            <div>
                <Component />
                <AddPost isOpen={isOpen} onClose={close} />
                {user && (
                    <div
                        onClick={() => setIsOpen(true)}
                        className={`text-purple-500 bg-yellow-500 w-16 h-16 rounded-full flex justify-center items-center fixed bottom-0 right-0 z-50 shadow-md m-6 cursor-pointer`}
                    >
                        <FiEdit3 className={`text-xl`} />
                    </div>
                )}
            </div>
        )
    }
}

export default withAddPost
