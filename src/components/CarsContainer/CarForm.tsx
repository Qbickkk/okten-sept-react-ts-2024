import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../../interfaces/carInterface";
import {carService} from "../../services/carService";
import {ISetState} from "../../types/setStateType";

interface IProps {
    changeTrigger:()=>void
    carForUpdate: ICar
    setCarForUpdate: ISetState<ICar>
}

const CarForm: FC<IProps> = ({changeTrigger,carForUpdate,setCarForUpdate}) => {

    const {reset,register,handleSubmit,setValue } = useForm<ICar>();

    useEffect(() => {
        if(carForUpdate){
            setValue('brand', carForUpdate.brand)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
        }
    }, [carForUpdate, setValue]);

    const save:SubmitHandler<ICar> = async (car) => {
        await carService.create(car);
        changeTrigger();
        reset();
    };

    const update:SubmitHandler<ICar> = async (car)=>{
        await carService.updateById(carForUpdate.id, car);
        changeTrigger();
        reset();
        setCarForUpdate(null);
    };


    return (
        <form onSubmit={handleSubmit(carForUpdate?update:save)}>
            <input type='text' placeholder={'brand'} {...register('brand')}/>
            <input type='text' placeholder={'price'} {...register('price')}/>
            <input type='text' placeholder={'year'} {...register('year')}/>
            <button>{carForUpdate?'Update':'Save'}</button>
        </form>
    );
};

export {CarForm};