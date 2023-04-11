import axios from "axios"

export const updateUser = async (filter, reqBody) => {
    const {data} = axios.patch('/api/users', {filter, reqBody})
    return data
}