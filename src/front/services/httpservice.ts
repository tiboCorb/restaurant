import { IDish } from "../../server/utils/dishes";
import Axios, { AxiosPromise } from 'axios';
import { ISweet } from "../../server/utils/sweets";
import { IDrink } from '../../server/utils/drinks';

export namespace HttpService {
    export const getDishes = (id?: number): AxiosPromise<IDish[]> => {
        return Axios.get<IDish[]>("/dishes");
    }

    export const addDish = (dish: IDish): AxiosPromise<boolean> => {
        return Axios.post<boolean>("/dishes", dish);
    }

    export const updateDish = (dish: IDish): AxiosPromise<boolean> => {
        return Axios.put<boolean>("/dishes", dish);
    }
    export const quickUpdateDish = (id: number , attribute : string, newValue : any): AxiosPromise<boolean> => {
        return Axios.patch<boolean>(`/dishes/${id}/${attribute}/${newValue}`);
    }

    export const removeDish = (dish: IDish): AxiosPromise<boolean> => {
        return Axios.delete(`/dishes/${dish.id}`);
    }

    export const getSweets = (id?: number): AxiosPromise<ISweet[]> => {
        return Axios.get<ISweet[]>("/sweets");
    }

    export const addSweet = (sweet: ISweet): AxiosPromise<boolean> => {
        return Axios.post<boolean>("/sweets", sweet);
    }

    export const quickupdateSweet = (id: number , attribute : string, newValue : any): AxiosPromise<boolean> => {
        return Axios.patch<boolean>(`/sweets/${id}/${attribute}/${newValue}`);
    }

    export const updateSweet = (sweet: ISweet): AxiosPromise<boolean> => {
        return Axios.put<boolean>("/sweets", sweet);
    }

    export const removeSweet = (sweet: ISweet): AxiosPromise<boolean> => {
        return Axios.delete(`/sweets/${sweet.id}`);
    }

    export const getDrinks = (id?: number): AxiosPromise<IDrink[]> => {
        return Axios.get<IDrink[]>("/drinks");
    }

    export const addDrink = (drink: IDrink): AxiosPromise<boolean> => {
        return Axios.post<boolean>("/drinks", drink);
    }

    export const quickupdateDrinks = (id: number , attribute : string, newValue : any): AxiosPromise<boolean> => {
        return Axios.patch<boolean>(`/drinks/${id}/${attribute}/${newValue}`);
    }

    export const updateDrink = (drink: IDrink): AxiosPromise<boolean> => {
        return Axios.put<boolean>("/drinks", drink);
    }
    export const removeDrink = (drink: IDrink): AxiosPromise<boolean> => {
        return Axios.delete(`/drinks/${drink.id}`);
    }
}