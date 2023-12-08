export interface IOrder {
    products: productOrder[]
    status: number
    customerId: string
}

export interface productOrder {
    productId: string,
    image: string,
    productName: string,
    amount: number,
    inputPrice: number,
    exportPrice: number,
}