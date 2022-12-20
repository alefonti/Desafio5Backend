class DataStore {

    constructor() {
        this.datos = [];
    }

    async save(objeto) {
        if (this.datos.length >0) {
            objeto.id = this.datos[this.datos.length - 1].id + 1;
        } else {
            objeto.id = 1;
        }
        this.datos.push(objeto);
        return objeto.id;
    }

    async getById(id) {
        return this.datos.find((objeto) => objeto.id === id);
    }

    async getAll() {
        return this.datos;
    }

    async deleteById(id) {
        const index = this.datos.findIndex((objeto) => objeto.id === id);
        if (index === -1) {
            return null;
        }
        this.datos.splice(index, 1);//borra un elemento en la posicion index
        return true;
    }

    async deleteAll() {
        this.datos = [];
    }

    async updateById(id, objeto) {
        const index = this.datos.findIndex((objeto) => objeto.id === id);
        if (index === -1) {
            return null;
        }
        this.datos[index] = objeto;
        return true;
    }
 

 }

const dataStore = new DataStore();

module.exports = dataStore;