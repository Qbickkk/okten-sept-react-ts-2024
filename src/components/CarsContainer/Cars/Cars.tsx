import React, {FC} from 'react';

import {ICar} from "../../../interfaces/carInterface";
import {Car} from "../Car/Car";
import {ISetState} from "../../../types/setStateType";

interface IProps {
    cars: ICar[]
    setCarForUpdate:ISetState<ICar>
    changeTrigger:()=>void
}

const Cars:FC<IProps> = ({cars,setCarForUpdate,changeTrigger}) => {
    return (
        <>
            {cars.map(car=><Car key={car.id} car={car} setCarForUpdate={setCarForUpdate} changeTrigger={changeTrigger}/>)}
        </>
    );
};

export {Cars};