import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { showAuth } from '../../../actions/default'
import { resetPasswordTokenAndId } from '../../../actions/user'
const CancelPasswordReset = () => {
    const { resetToken, id } = useParams()
    const dispatch = useDispatch()
    const [action, trigger] = useState()

    useEffect(() => {
        dispatch(resetPasswordTokenAndId({ resetToken, id }))
        dispatch(showAuth({ isShow: true, type: 'cancel password reset' }))
        // eslint-disable-next-line
    }, [action])
    return (
        <div className={`flex justify-center items-center mt-32`}>
            <button
                className={`bg-purple-600 bg-opacity-50 text-xl font-bold text-white px-4 py-2 rounded-lg`}
                onClick={trigger}
            >
                Cancel Password Reset
            </button>
        </div>
    )
}

export default CancelPasswordReset
