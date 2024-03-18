import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICar} from "../../interfaces";
import {carService} from "../../services";

interface IState {
    cars: ICar[],
    carForUpdate: ICar,
    trigger: boolean
}

const initialState: IState = {
    cars: [],
    carForUpdate: null,
    trigger: null
};

const getAll = createAsyncThunk<ICar[], void>(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data
        } catch (e) {
            const errors = e as AxiosError
            return rejectWithValue(errors.response.data);
        }
    }
);

const create = createAsyncThunk<void, { car: ICar }>(
    'carSlice/create',
    async ({car}, {rejectWithValue}) => {
        try {
            await carService.create(car);
        } catch (e) {
            const errors = e as AxiosError
            return rejectWithValue(errors.response.data);
        }
    }
);

const updateById = createAsyncThunk<ICar, {id:number, carData:ICar}>(
    'carSlice/updateById',
    async ({id, carData}, {rejectWithValue}) => {
        try {
            await carService.updateById(id, carData);
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteById = createAsyncThunk<void,number>(
    'carSlice/deleteById',
    async (id, {rejectWithValue}) => {
        try {
           await carService.deleteById(id)
        } catch (e) {
            const errors = e as AxiosError
            return rejectWithValue(errors.response.data);
        }
    }
)

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(updateById.fulfilled, state => {
                state.carForUpdate = null
            })
            .addMatcher(isFulfilled(create, deleteById,updateById), state => {
                state.trigger = !state.trigger
            })
});

const {reducer: carReducer, actions} = carSlice;

const carActions = {
    ...actions,
    getAll,
    create,
    deleteById,
    updateById
};

export {
    carActions,
    carReducer
}