import axios from "axios"
const baseurl = "http://localhost:3001/persons"


const getCont = () => {
    
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const addCont = (newObject) => {
    const request = axios.post(baseurl,newObject)
    return request.then(response => response.data)

}

const removeCont = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request
}

// const updateCont = (id,newObject) => {
//     const request =axios.put(`${baseurl}/${id}`, newObject)
//     return request.then(response => response.data)
// }

export default { getCont, addCont, removeCont}