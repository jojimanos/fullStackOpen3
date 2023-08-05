import Input from "./Input";

const SearchBar = ({ searchName, setSearchName, searchPerson }) => {
    return (
        <>
            <Input tag={"search by name"} value={searchName} handler={(event) => { setSearchName(event.target.value) }} />
            {searchPerson ? <p> {searchPerson.map(p => p.name)} {searchPerson.map(p => p.number)} </p> : null}
        </>
    )
}

export default SearchBar;