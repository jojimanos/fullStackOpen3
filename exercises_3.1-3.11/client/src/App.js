import { useState, useEffect } from 'react'
import InputForm from './InputForm'
import SearchBar from './SearchBar'
import Numbers from './Numbers'
import services from './services'
import NotificationMessage from './NotificationMessage'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [entryMode, setEntryMode] = useState("update")
  const [notificationMessageText, setNotificationMessageText] = useState("")
  const [displaySuccessOrFailure, setDisplaySuccessOrFailure] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    services.GetNames(setPersons, setNotificationMessageText, setError)
  }, [])

  const handleSubmitName = (event) => {
    event.preventDefault();

    let excludeDuplicates = persons.filter(person => person.name === newName)

    if (excludeDuplicates.length) {
      const confirmation = window.confirm(`${newName} already exists. Replace the old number?`)
      const entryToUpdate = persons.find(person => person.name === newName)
      const updatedEntry = {
        ...entryToUpdate,
        number: newNumber,
      }
      console.log(updatedEntry)
      if (confirmation) {
        services.UpdateNumber(updatedEntry, setPersons, persons, setNotificationMessageText, setError, setDisplaySuccessOrFailure)

      setPersons(persons.map(person => person.name === updatedEntry.name ? updatedEntry : person))
      setNewName('');
      setNewNumber('')
      excludeDuplicates = ""
      console.log(persons)
      }
    } else {

      const newPerson = {
        name: newName,
        number: newNumber,
      }

      services.AddName(newPerson, setNotificationMessageText, setError, setDisplaySuccessOrFailure)

      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('')
      excludeDuplicates = ""
      console.log(persons)
    }
  }

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?")
    if (confirmation) {
      services.DeleteName(id, setNotificationMessageText, setError);
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  let searchPerson = persons.filter((person) => person.name.toLowerCase() === searchName.toLowerCase())

  console.log(persons)
  console.log("notification message", notificationMessageText)
  console.log("error state", error)

  return (
    <div>
      <h2>Phonebook</h2>
      {displaySuccessOrFailure ? <NotificationMessage text={notificationMessageText} error={error}/> : null}
      <div>
        <SearchBar searchName={searchName} setSearchName={setSearchName} searchPerson={searchPerson} />
        <InputForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} handleSubmit={
          handleSubmitName
        }
          persons={persons} setEntryMode={setEntryMode} />
        <Numbers persons={persons} handleDelete={handleDelete} setPersons={setPersons} />
      </div>
    </div>
  )
}

export default App