export interface Bill{
    id: number,
    factorNumber: number,
    factorDate: Date,
    customerName: string,
    factorPrice: number,
    factorType: string,
    deliveryType: string,
    customer?:string,
    visitor?:string,
    address?:string,
}