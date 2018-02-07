import axios from 'axios'

function Get(url,data = {}){
    return axios.get(url,{
        params:data
    })
}

function Post(url,data = {}){
    return axios.post(url,data)
}

function Delete(url,data = {}){
    return axios.delete(url,data)
}
function Put(url,data = {}){
    return axios.put(url,data)
}

export default {Get,Post,Put,Delete}
