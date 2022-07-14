import fs from 'fs';

const RUTA = './productos.json';

class Contenedor {
    save = async (producto) => {
        try {
            let productos = await this.getAll();
            if (productos.length === 0) {
                producto.id = 1;
                productos.push(producto);
                await fs.promises.writeFile(RUTA, JSON.stringify(productos, null, '\t'));
            } else {
                producto.id = productos[productos.length - 1].id + 1;
                productos.push(producto);
                await fs.promises.writeFile(RUTA, JSON.stringify(productos, null, '\t'));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async (id) => {
        try {
            let productos = await this.getAll();
            let productosFiltrados = productos.find(producto => {
                if (id == producto.id) {
                    return producto;
                } else {
                    return null;
                }
            })

            return console.log(productosFiltrados);
        } catch (error) {
            console.log(error);
        }
    }

    getAll = async () => {
        try {
            if (fs.existsSync(RUTA)) {
                let data = await fs.promises.readFile(RUTA, 'utf-8');
                let productos = JSON.parse(data);
                return productos;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteById = async (id) => {
        try {
            let productos = await this.getAll();
            let productosEliminados = productos.filter(producto => {
                if (id !== producto.id) {
                    return producto;
                } else {
                    return null;
                }
            })

            await fs.promises.writeFile(RUTA, JSON.stringify(productosEliminados, null, '\t'));
        } catch (error) {
            console.log(error);
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(RUTA, '[]');
        } catch (error) {
            console.log(error);
        }
    }
}

let objeto = new Contenedor();

async function llamarMetodos() {
    await objeto.save({ nombre: 'Sandía' });
    // objeto.getById(2).then(resp => console.log(resp));
    // objeto.getAll().then(resp => console.log(resp));
    // await objeto.deleteById(1);
    // await objeto.deleteAll();
}
llamarMetodos();



