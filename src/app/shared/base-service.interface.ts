import { IModel } from "./base-model.model";

export interface IService<TModel extends IModel>{
    getAll(): Promise<TModel[]>;
    filter(pageNumber: number, pageSize: number, orderBy: string, orderDirection: string, search?: string): Promise<TModel[]>;
} 