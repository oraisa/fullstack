import axios from "axios"

const baseUrl = "http://localhost:3001/persons/"

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = (person) => axios.post(baseUrl, person).then(response => response.data)

const del = (person) => axios.delete(baseUrl + person.id.toString())

const replace = (oldPerson, newPerson) => axios
    .put(baseUrl + oldPerson.id.toString(), newPerson)
    .then(response => response.data)

export default { getAll, create, del, replace }
