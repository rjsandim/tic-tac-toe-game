import {Type} from "./Type";
export class Player {

    private lastPlayer: Type;
    private one: Type;
    private two: Type;

    constructor(one: Type, two: Type) {
        this.one = one;
        this.two = two;
        this.lastPlayer = null;
    }

    public toggle(): Type {

        console.log(this.lastPlayer);

        if (this.lastPlayer == null) {
            this.lastPlayer = this.randomPlayer();
            return this.lastPlayer;
        }

        if (this.lastPlayer == this.one) {
            this.lastPlayer = this.two;
        } else {
            this.lastPlayer = this.one;
        }
        return this.lastPlayer;
    }

    private randomPlayer() : Type {

        let random = Math.floor(Math.random() * 2) + 1;

        if (random == 1) {
            return this.one;
        }
        return this.two;
    }

}
