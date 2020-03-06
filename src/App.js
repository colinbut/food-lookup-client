import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TableView from './TableView'


export default function App() {
    
    const initialState = {
        data: [],
        loading: true
    }

    const [data, setData] = useState(initialState)

    useEffect(() => {
        const getDataFromServer = async () => {
            const { data } = await axios(`/api/food`)
            console.log(data)
            setData(data)
        }
        getDataFromServer()
    }, [])

    return data.loading ? <div>Loading...</div> : <TableView data={data} />
}