import '../../App.css'

import Nav from '../fragments/Nav'
const Header = ({ className }) => {
    return (
        <header
            className={` grid grid-cols-1 grid-rows-1 items-start opacity-100 ${className}`}
        >
            <Nav className={`col-span-full row-start-1 z-50`} />
            <div
                className={`header bg col-span-full row-span-full h-full w-full z-10 opacity-75`}
            ></div>
            <div
                className={`header_reverse bg_reverse col-span-full row-span-full h-full w-full opacity-75`}
            ></div>
        </header>
    )
}

export default Header
