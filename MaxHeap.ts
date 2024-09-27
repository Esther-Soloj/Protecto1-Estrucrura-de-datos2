// MaxHeap se encarga de gestionar las órdenes de compra con prioridad en el precio más alto.

class MaxHeap {
    public heap: { precio: number; cantidad: number; empresa: string }[];
    private n: number; // cantidad de elementos ingresados

    constructor(size: number) {
        this.heap = new Array(size + 1); // El índice 0 no se utiliza
        this.n = 0;
    }

    public checkMax(): { precio: number; cantidad: number; empresa: string } | undefined {
        return this.n > 0 ? this.heap[1] : undefined;
    }

    public isEmpty(): boolean {
        return this.n === 0;
    }

    public getQuantity(): number {
        return this.n;
    }
}
