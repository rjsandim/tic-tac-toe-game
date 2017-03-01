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

        if (this.checkRows()) {
            return true;
        }

        if (this.checkCols()) {
            return true;
        }

        return this.checkDiagonals();
    }

    private checkRows(): boolean {

        for (let i = 0; i < this.size; i++) {

            let positions = [];

            for (let j = 0; j < this.size; j++) {
                positions.push(i.toString() + j.toString());
            }

            if (this.check(positions))
                return true;
        }

        return false;
    }

    private checkCols(): boolean {

        for (let i = 0; i < this.size; i++) {

            let positions = [];

            for (let j = 0; j < this.size; j++) {
                positions.push(j.toString() + i.toString());
            }

            if (this.check(positions))
                return true;
        }

        return false;
    }

    private checkDiagonals(): boolean {

        let diagonals = {
            first: ['00', '11', '22'],
            second: ['02', '11', '20']
        };

        if (this.check(diagonals.first))
            return true;

        return this.check(diagonals.second);
    }

    private check(positions: any) {

        let hasWinner = true;
        let firstValue = this.values[positions[0]];

        for (let position of positions) {

            let value = this.values[position];

            if (firstValue != value || value instanceof Blank) {
                hasWinner = false;
            }
        }

        return hasWinner;
    }

}
