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

    public thereIsAWinner(): Type|boolean {

        let winner = this.checkRows();

        if (winner !== false) {
            return winner;
        }

        winner = this.checkCols();

        if (winner !== false) {
            return winner;
        }

        return this.checkDiagonals();
    }

    private checkRows(): Type|boolean {

        for (let i = 0; i < this.size; i++) {

            let positions = [];

            for (let j = 0; j < this.size; j++) {
                positions.push(i.toString() + j.toString());
            }

            let result = this.check(positions);

            if (result !== false)
                return result;
        }

        return false;
    }

    private checkCols(): Type|boolean {

        for (let i = 0; i < this.size; i++) {

            let positions = [];

            for (let j = 0; j < this.size; j++) {
                positions.push(j.toString() + i.toString());
            }

            let result = this.check(positions);

            if (result !== false)
                return result;
        }

        return false;
    }

    private checkDiagonals(): Type|boolean {

        let diagonals = {
            first: ['00', '11', '22'],
            second: ['02', '11', '20']
        };

        let result = this.check(diagonals.first);

        if (result !== false)
            return result;

        return this.check(diagonals.second);
    }

    private check(positions: any) : Type|boolean {

        let hasWinner = true;
        let firstValue = this.values[positions[0]];

        for (let position of positions) {

            let value = this.values[position];

            if (firstValue != value || value instanceof Blank) {
                hasWinner = false;
            }
        }

        if (hasWinner)
            return <Type>firstValue;
        return false;
    }

}
