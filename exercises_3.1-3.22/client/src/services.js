import axios from "axios";

const baseURL = '/api/persons'

const GetNames = (setPersons, setNotificationMessageText, setError) => {
    const request = axios.get(baseURL)
    return request.then(response => {
        console.log('Success when getting the names');
        setPersons(response.data)
    }).catch((error) => console.log(error.response.data.error), setError(true), setNotificationMessageText(`There was an error while trying to get the entries.`))
}

const AddName = (newPerson, setNotificationMessageText, setError, setDisplaySuccessOrFailure) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => {
        console.log(response);
        setNotificationMessageText(`${newPerson.name} is added`)
    },
        setError(false),
        setDisplaySuccessOrFailure(true),
        setTimeout(() => setDisplaySuccessOrFailure(false), 5000)
    ).catch((error) => setError(true), setNotificationMessageText("Failed to add entry"))
}

const DeleteName = (id, setNotificationMessageText, setError) => {
    const request = axios.delete(baseURL + "/" + id)
    return request.then(response => console.log(response)).catch((error) => setError(true), setNotificationMessageText(`Couldn't delete entry`))
}

const UpdateNumber = (updatedEntry, setPersons, persons, setNotificationMessageText, setError, setDisplaySuccessOrFailure) => {
    const request = axios.put(baseURL + "/" + updatedEntry.id, updatedEntry)
    return request.then(response => {
        console.log("Success when updating", response);
        setNotificationMessageText(`${updatedEntry.name} number is updated`)
    },
        setError(false),
        setDisplaySuccessOrFailure(true),
        setTimeout(() => setDisplaySuccessOrFailure(false), 5000)
    )
    .catch((error) => setError(true), setNotificationMessageText(`Couldn't update entry with name ${updatedEntry.name}`))
}

export default { GetNames, AddName, DeleteName, UpdateNumber }