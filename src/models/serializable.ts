export class Serializable {

    fromJson(json: Object) {
        for (let prop in json) {
            this[prop] = json[prop];
        }

        return this;
    }

}
