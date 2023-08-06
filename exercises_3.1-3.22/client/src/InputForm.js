import Input from "./Input"

const InputForm = ({newName, newNumber, setNewName, setNewNumber, handleSubmit, persons, setEntryMode}) => {
    return (
        <>
            <h2>Add a new one:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <Input tag={"name"} value={newName} handler={(event) => { setNewName(event.target.value) }} />
                    <Input tag={"number"} value={newNumber} handler={(event) => { setNewNumber(event.target.value) }} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default InputForm;