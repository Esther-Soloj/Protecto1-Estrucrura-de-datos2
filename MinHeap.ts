// MinHeap se encarga de gestionar las órdenes de venta con prioridad en el precio más bajo.

export class MinHeap {
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

    public insert(value: { precio: number; cantidad: number; empresa: string }): void {
        if (this.n === this.heap.length - 1) {
            this.resize(2 * this.heap.length); // Duplicar tamaño si está lleno
        }
        this.n++;
        this.heap[this.n] = value;
        this.swap(this.n);
    }

    private swap(i: number): void {
        let father: number = Math.floor(i / 2);
        while (i > 1 && this.heap[father].precio > this.heap[i].precio) {
            [this.heap[i], this.heap[father]] = [this.heap[father], this.heap[i]]; // Intercambio
            i = father;
            father = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        if (newSize <= 0) {
            throw new RangeError('Invalid array length');
        }
        const newHeap: { precio: number; cantidad: number; empresa: string }[] = new Array(newSize);
        for (let i = 1; i < this.heap.length; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }


    public getMin(): { precio: number; cantidad: number; empresa: string } | undefined {
        const min = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.n--;
        this.sink(1);
        return min;
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j = 2 * i;
            if (j < this.n && this.heap[j].precio > this.heap[j + 1].precio) {
                j++;
            }
            if (this.heap[i].precio <= this.heap[j].precio) break;
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
            i = j;
        }
    }
}


