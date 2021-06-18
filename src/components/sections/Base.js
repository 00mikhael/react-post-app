const Base = ({ className, children }) => {
    return (
        <div
            style={{
                opacity: '.99',
                display: 'grid',
                gridTemplateColumns: 'auto',
                gridTemplateRows: '100px 400px 1fr auto'
            }}
            className={`${className}`}
        >
            {children}
        </div>
    )
}

export default Base
