import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getPeople = () => {
    const request = axios.get(baseURL);    
    return request.then(response => response.data);
};

const createPerson = (personObject) => {
    const request = axios.post(baseURL, personObject);
    return(
        request.then(response => response.data)
    );
};

const updatePerson = (id, personObject) => {
    const request = axios.put(`${baseURL}/${id}`, personObject);
    return(
        request.then(response => response.data)
    )
};

const deletePerson = (id) => {
    const request = axios.get(baseURL);
    return request.then(
      axios.delete(`${baseURL}/${id}`).then((response) => response.data)
    );
};

export default {getPeople, createPerson, updatePerson, deletePerson};