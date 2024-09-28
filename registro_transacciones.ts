class RegistroTransacciones {
    private transacciones: string[] = [];

    registrar(empresa: string, cantidad: number, precio: number, comprador: string, vendedor: string): void {
        const transaccion = `Empresa: ${empresa}, Cantidad: ${cantidad}, Precio: ${precio}, Comprador: ${comprador}, Vendedor: ${vendedor}`;
        this.transacciones.push(transaccion);
    }

    mostrarHistorial(): string[] {
        return this.transacciones;
    }
}

