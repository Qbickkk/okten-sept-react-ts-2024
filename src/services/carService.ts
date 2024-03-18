import {apiService} from "./apiService";
import {urls} from "../constants";
import {IResponse} from "../types";
import {ICar} from "../interfaces";

const carService = {
    getAll: (): IResponse<ICar[]> => apiService.get(urls.cars.base),
    create: (data: ICar): IResponse<ICar> => apiService.post(urls.cars.base, data),
    updateById: (id: number, data: ICar): IResponse<ICar> => apiService.put(urls.cars.byId(id), data),
    deleteById: (id: number): IResponse<void> => apiService.delete(urls.cars.byId(id))
};

export {
    carService
}
