import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        name: 'Captain America',
        description: 'Patriotic Supersoldier',
        comics_appeared_in: 120,
        super_power: 'Enhanced strength, speed, stamina, durability, agility, reflexes, senses, and mental processing.',
        date_established: 1943
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseComicsAppearedIn: (state, action) => {state.comics_appeared_in = action.payload},
        chooseSuperPower: (state, action) => { state.super_power = action.payload },
        chooseDateEstablished: (state, action) => { state.date_established = action.payload }
    }
})

export const reducer = rootSlice.reducer;
export const { chooseName, chooseDescription, chooseComicsAppearedIn, chooseSuperPower, chooseDateEstablished } = rootSlice.actions;
