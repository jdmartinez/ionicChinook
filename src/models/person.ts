export type Gender = "male" | "female";

export interface Person {
    id: Number,
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    phone: string,
    fax: string,
    email: string,
    supportRepId: Number,
    gender: Gender,
    avatar: string
}
