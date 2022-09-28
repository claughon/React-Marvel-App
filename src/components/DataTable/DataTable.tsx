import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { HeroForm } from '../../components/HeroForm';
import { getAuth } from 'firebase/auth';

interface gridData{
    data:{
        id?:string;
    }
}
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 75 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: true,
    },
    {
        field: 'comics_appeared_in',
        headerName: 'Comics Appeared In',
        width: 125,
        editable: true,
    },
    {
        field: 'super_power',
        headerName: 'Super Power',
        width: 300,
        editable: true,
    },
    {
        field: 'date_established',
        headerName: 'Date Established',
        width: 125,
        editable: true,
    },
];

// const rows = [
//     {id: 1, name: 'Deadpool', description: 'Merc with a Mouth', comics_appeared_in: 28, super_power: 'Superhuman ability of regeneration and physical prowess', date_established: 1993},
//     {id: 2, name: 'Thor', description: 'God of Thunder', comics_appeared_in: 93, super_power: 'Thunder and Lightning and a pretty sweet Hammer', date_established: 1962},
//     {id: 3, name: 'The Incredible Hulk', description: 'Big Green Dude', comics_appeared_in: 44, super_power: 'Super human strength and the ability to turn is pants purple', date_established: 1962},
//     {id: 4, name: 'Iron Man', description: 'Founder of The Avengers', comics_appeared_in: 116, super_power: 'Genius level intellect and Powered Armored Suit', date_established: 1963},
// ]

export const DataTable = () => {
    const auth = getAuth()
    let { heroData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }
    console.log(gridData)
    if (auth.currentUser) {
        return(
            <div style={{ height: 400, width: '100%' }}>
                <h2>Team of Heroes</h2>
                <DataGrid 
                    rows = {heroData}
                    columns = {columns}
                    pageSize = {10}
                    rowsPerPageOptions = {[10]}
                    checkboxSelection
                    onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
                    {...heroData}
                />  

            <Button onClick={handleOpen}>Update</Button>
            <Button variant='contained' color='secondary' onClick={deleteData}>Delete</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update A Superhero</DialogTitle>
                <DialogContent>
                    <DialogContentText>Hero id: {gridData[0]}</DialogContentText>
                        <HeroForm id={`${gridData[0]}`}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color = "primary">Done</Button> 
                </DialogActions> 
            </Dialog>
            </div>
        )
    } else {
        return(
            <div>
                <h3>Please Sign In to View Your Team of Heroes!</h3>
            </div>
    )};
}