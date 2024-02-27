import { IProduct } from "./product";

export interface ITableData {
    data: IProduct[];
    reset?: boolean;
}
