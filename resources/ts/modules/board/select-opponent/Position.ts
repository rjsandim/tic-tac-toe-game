import {Type} from "./Type";
import {Blank} from "./Blank";

export class Position {

    private size;
    private values: any;

    constructor(size) {
        this.size = size;
        this.values = {};
    }

    public fillAllWith(type: Type) {

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.put(i, j, type);
            }
        }
    }

    public put(x, y, type: Type) {

        this.values[x.toString() + y.toString()] = type;

    }

    public getAt(x, y): Type {
        return this.values[x.toString() + y.toString()];
    }

    public thereIsAWinner(): boolean {

        console.log('thereisawinner');

        if (this.checkRows()) {
            return true;
        }

        if (this.checkCols()) {
            return true;
        }

        return this.checkDiagonals();


    }

    private checkRows(): boolean {

        console.log('checkRows');

        for (let i = 0; i < this.size; i++) {

            let equals = true;
            let value = this.values[i + "0"];

            console.log(value);

            for (let j = 1; j < this.size; j++) {

                if (value != this.values[i.toString() + j.toString()]) {
                    equals = false;
                }

                console.log(typeof value);
            }

            if (equals && typeof value !== 'Blank') {
                return true;
            }
        }

        return false;
    }

    private checkCols(): boolean {
        return false;
    }

    private checkDiagonals(): boolean {
        return false;
    }

}
