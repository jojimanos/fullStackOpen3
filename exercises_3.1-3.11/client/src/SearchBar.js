import Input from "./Input";

const SearchBar = ({ searchName, setSearchName, searchPerson }) => {
    return (
        <>
            <Input tag={"search by name"} value={searchName} handler={(event) => { setSearchName(event.target.value) }} />
            <p>{searchPerson.map(p => p.name)} {searchPerson.map(p => p.number)}</p>
        </>
    )
}

export default SearchBar;