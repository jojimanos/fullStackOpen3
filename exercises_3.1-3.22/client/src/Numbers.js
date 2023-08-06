const Numbers = ({ persons, handleDelete }) => {
    return (
        <>
            <h2>Numbers</h2>
            {persons.map((person, index) => {
                return <p key={index}>{person.name} {person.number}
                    <button onClick={() => handleDelete(person.id)}>delete</button></p>
            })}
        </>
    )
}

export default Numbers;