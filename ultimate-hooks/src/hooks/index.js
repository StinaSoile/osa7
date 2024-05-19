import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        getAll()
    }, []);

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)

    }


    const create = async (newObject) => {
        const response = await axios.post(baseUrl, newObject)
        setResources([...resources, response.data])
        return response.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]

}