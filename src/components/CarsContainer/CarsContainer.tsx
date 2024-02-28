import {FC, useEffect, useState} from 'react';
import {CarForm} from "./CarForm/CarForm";
import {Cars} from "./Cars/Cars";
import {ICar} from "../../interfaces/carInterface";
import {carService} from "../../services/carService";

interface IProps {

}

const CarsContainer: FC<IProps> = () => {

    const [cars, setCars] = useState<ICar[]>([]);
    const [trigger, setTrigger] = useState<boolean>(null);
    const [carForUpdate, setCarForUpdate] = useState<ICar>(null);

    useEffect(() => {
        carService.getAll().then(({data})=>setCars(data))
    }, [trigger]);

    const changeTrigger = () => {
        setTrigger(prev => ! prev);
    }

    return (
        <div>
            <CarForm changeTrigger={changeTrigger} carForUpdate={carForUpdate} setCarForUpdate={setCarForUpdate}/>
            <hr/>
            <Cars cars={cars} setCarForUpdate={setCarForUpdate} changeTrigger={changeTrigger}/>
        </div>
    );
};

export {CarsContainer};