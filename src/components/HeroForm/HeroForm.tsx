import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { 
    chooseName,
    chooseDescription,
    chooseComicsAppearedIn,
    chooseSuperPower,
    chooseDateEstablished
} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface HeroFormProps {
    id?:string;
    data?:{}
}

interface HeroState {
    name: string;
    description: string;
    comics_appeared_in: string;
    super_power: string;
    date_established: string;
}

export const HeroForm = (props: HeroFormProps) => {
    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<HeroState>(state => state.name)
    const description = useSelector<HeroState>(state => state.description)
    const comics_appeared_in = useSelector<HeroState>(state => state.comics_appeared_in)
    const super_power = useSelector<HeroState>(state => state.super_power)
    const date_established = useSelector<HeroState>(state => state.date_established)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if (props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(chooseComicsAppearedIn(data.comics_appeared_in))
            dispatch(chooseSuperPower(data.super_power))
            dispatch(chooseDateEstablished(data.date_established))
            await serverCalls.create(store.getState())
            window.location.reload()

        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Superhero Name</label>
                    <Input {...register('name')} name='name' placeholder='Superhero Name' />
                </div>
                <div>
                    <label htmlFor="description">Superhero Description</label>
                    <Input {...register('description')} name='description' placeholder='Superhero Description' />
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comics Appeared In</label>
                    <Input {...register('comics_appeared_in')} name='comics_appeared_in' placeholder='Number of Comics Appeared In' />
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name='super_power' placeholder="Superhero's Super Power" />
                </div>
                <div>
                    <label htmlFor="date_established">Superhero Origin Year</label>
                    <Input {...register('date_established')} name='date_established' placeholder='Year the First Comic was Released' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}