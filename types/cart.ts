export interface ICart {
    customerId: string,
    products: productCart[]
}

export interface productCart {
    productId: string,
    image: string,
    productName: string,
    quantity: number,
    exportPrice: number
}