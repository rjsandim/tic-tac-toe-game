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
        
        if (this.lastPlayer == null) {
            this.lastPlayer = this.randomPlayer();
            return this.lastPlayer;
        }

        this.lastPlayer = this.lastPlayer == this.one ? this.two : this.one;

        return this.lastPlayer;
    }

    private randomPlayer(): Type {

        let random = Math.floor(Math.random() * 2) + 1;

        if (random == 1) {
            return this.one;
        }
        return this.two;
    }

}
