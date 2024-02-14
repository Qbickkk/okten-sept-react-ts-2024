import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {ICar} from "../interfaces/carInterface";
import {IRes} from "../types/responseType";

const carService = {
  getAll: ():IRes<ICar[]> =>apiService.get(urls.cars.base),
  create: (car:ICar):IRes<ICar> => apiService.post(urls.cars.base, car),
  updateById: (id: number, car:ICar):IRes<ICar> => apiService.put(urls.cars.byId(id),car),
  deleteById: (id:number):IRes<void> =>apiService.delete(urls.cars.byId(id))
};

export{
  carService
}