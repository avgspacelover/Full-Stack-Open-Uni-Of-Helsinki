import axios from 'axios'

const baseurl = `http://localhost:3000/notes`

const getAll = () => {
    return axios.get(baseurl)

}

const create = (newObject) => {
    return axios.put(baseurl,newObject)
}

const update = (id,newObject) => {
    return axios.put(`${baseurl}/${id}`, newObject)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}