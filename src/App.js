import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import './index.css'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
})

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

    const classes = useStyles()

    return data.loading ? (
        <div>Loading...</div>
    ) : (
        <div className="container">
            <h1>Food Lookup</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Simple Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Protein (g)</TableCell>
                            <TableCell align="right">Carbohydrate (g)</TableCell>
                            <TableCell align="right">Sugar (g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">{row.description}</TableCell>
                                <TableCell align="right">{row.kcal}</TableCell>
                                <TableCell align="right">{row.protein_g}</TableCell>
                                <TableCell align="right">{row.carbohydrate_g}</TableCell>
                                <TableCell align="right">{row.sugar_g}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}