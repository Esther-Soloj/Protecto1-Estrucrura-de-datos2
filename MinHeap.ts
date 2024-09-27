// MinHeap se encarga de gestionar las órdenes de venta con prioridad en el precio más bajo.

class MinHeap {
    public heap: { precio: number; cantidad: number; empresa: string }[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public checkMin(): { precio: number; cantidad: number; empresa: string } | undefined {
        return this.n > 0 ? this.heap[1] : undefined;
    }

    public isEmpty(): boolean {
        return this.n === 0;
    }

    public getQuantity(): number {
        return this.n;
    }
}
