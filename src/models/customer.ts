import { Serializable } from './serializable';
import { Person, Gender } from './person';

export class Customer extends Serializable implements Person {
    id: Number;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
    fax: string;
    email: string;
    supportRepId: Number;
    gender: Gender;
    avatar: string;

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    getFullAddress(): string {
        return `${this.address}. ${this.postalCode}. ${this.city}. ${this.country}`;
    }
}