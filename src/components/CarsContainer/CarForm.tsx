import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carActions} from "../../store";

interface IProps {

}

const CarForm: FC<IProps> = () => {

    const {reset,register,handleSubmit,setValue} = useForm<ICar>();
    const dispatch = useAppDispatch();
    const {carForUpdate} = useAppSelector(state => state.cars);

    useEffect(() => {
        if (carForUpdate){
            setValue('brand', carForUpdate.brand)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
        }
    }, [carForUpdate]);

    const save:SubmitHandler<ICar> = (car) => {
        dispatch(carActions.create({car}));
        reset()
    };

    return (
        <form onSubmit={handleSubmit(save)}>
            <input type='text' placeholder={'brand'} {...register('brand')}/>
            <input type='text' placeholder={'price'} {...register('price')}/>
            <input type='text' placeholder={'year'} {...register('year')}/>
            <button>{carForUpdate?'update':'save'}</button>
        </form>
    );
};

export {CarForm};