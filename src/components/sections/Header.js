import Nav from '../fragments/Nav'
const Header = ({ className }) => {
    return (
        <header className={`${className}`}>
            <Nav />
        </header>
    )
}

export default Header
