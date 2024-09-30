import { MaxHeap } from './MaxHeap';
import { MinHeap } from './MinHeap';
import { RegistroTransacciones } from './registro_transacciones';

class InvalidOrderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidOrderError";
    }
}

class SimuladorMercado {
    private monticuloCompras = new MaxHeap(10);
    private monticuloVentas = new MinHeap(10);
    private registro = new RegistroTransacciones();

    private validarOrden(precio: number, cantidad: number): void {
        if (precio <= 0) {
            throw new InvalidOrderError('El precio debe ser mayor a cero.');
        }
        if (cantidad <= 0) {
            throw new InvalidOrderError('La cantidad debe ser mayor a cero.');
        }
    }

    agregarOrdenCompra(precio: number, cantidad: number, empresa: string, comprador: string) {
        try {
            this.validarOrden(precio, cantidad);
            this.monticuloCompras.insert({ precio, cantidad, empresa, comprador});
        } catch (error) {
            if (error instanceof InvalidOrderError) {
                console.error(`Error al agregar orden de compra: ${error.message}`);
            } else {
                console.error('Error inesperado al agregar orden de compra:', error);
            }
        }
    }

    agregarOrdenVenta(precio: number, cantidad: number, empresa: string, vendedor: string) {
        try {
            this.validarOrden(precio, cantidad);
            this.monticuloVentas.insert({ precio, cantidad, empresa , vendedor});
        } catch (error) {
            if (error instanceof InvalidOrderError) {
                console.error(`Error al agregar orden de venta: ${error.message}`);
            } else {
                console.error('Error inesperado al agregar orden de venta:', error);
            }
        }
    }

    emparejarOrdenes(): void {
        try {
            let mejorCompra = this.monticuloCompras.getMax();
            let mejorVenta = this.monticuloVentas.getMin();
    
            while (mejorCompra && mejorVenta && mejorCompra.precio >= mejorVenta.precio) {
                const cantidadTransaccion = Math.min(mejorCompra.cantidad, mejorVenta.cantidad);
                const precioTransaccion = mejorVenta.precio;
    
                if (cantidadTransaccion > 0) {
                    this.registro.registrar(
                        mejorCompra.empresa,
                        cantidadTransaccion,
                        precioTransaccion,
                        mejorCompra.comprador, // nombre de comprador
                        mejorVenta.vendedor     //nombre del vendedor
                    );
                    console.log(`Transacción: ${cantidadTransaccion} acciones de ${mejorCompra.empresa} a ${precioTransaccion} por acción.`);
                }
    
                // Ajuste de cantidades y reinsertar si no se completaron
                mejorCompra.cantidad -= cantidadTransaccion;
                mejorVenta.cantidad -= cantidadTransaccion;
    
                if (mejorCompra.cantidad > 0) {
                    this.monticuloCompras.insert(mejorCompra);
                }
    
                if (mejorVenta.cantidad > 0) {
                    this.monticuloVentas.insert(mejorVenta);
                }
    
                mejorCompra = this.monticuloCompras.getMax();
                mejorVenta = this.monticuloVentas.getMin();
            }
        } catch (error) {
            console.error('Error durante el emparejamiento de órdenes:', error);
        }
    }
    

    mostrarHistorial(): void {
        console.log('Historial de transacciones:');
        this.registro.mostrarHistorial().forEach(transaccion => console.log(transaccion));
    }

    mostrarEstado(): void {
        console.log(`Mejor orden de compra: ${this.monticuloCompras.checkMax()?.precio}`);
        console.log(`Mejor orden de venta: ${this.monticuloVentas.checkMin()?.precio}`);
    }
}

//uso
const simulador = new SimuladorMercado();
// precio , cantidad, empresa, nombre de vendedor o comprador
simulador.agregarOrdenCompra(100, 50, 'Empresa1',' Juan');
simulador.agregarOrdenVenta(90, 30, 'Empresa1', 'Maria');
simulador.agregarOrdenCompra(105, 25, 'Empresa1', 'pedro');
simulador.agregarOrdenVenta(80, 20, 'Empresa1', 'lucia');
//simulador.agregarOrdenCompra(75, 60, 'Empresa1', 'esther');
//simulador.agregarOrdenVenta(65, 90, 'Empresa1', 'rosa');

simulador.mostrarEstado();
simulador.emparejarOrdenes();  // Empareja y registra transacciones
simulador.mostrarEstado();
simulador.mostrarHistorial();  // Muestra el historial de transacciones