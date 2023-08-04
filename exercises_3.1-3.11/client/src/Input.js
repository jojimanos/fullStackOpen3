const Input = ({ tag, value, handler }) => {
    return (
        <>
            {tag}: <input value={value} onChange={handler} />
        </>
    )
}

export default Input;