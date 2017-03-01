import {Position} from "./Position";
import {Blank} from "./Blank";
import {Leaf} from "./Leaf";
import {Fire} from "./Fire";
import {Player} from "./Player";

export class Board {
    private player: Player;
    private positions: Position;

    constructor() {

        this.player = new Player(new Leaf(), new Fire());

        this.positions = new Position(3);
        this.positions.fillAllWith(new Blank());
    }

    boostrap() {

        this.renderAll();

        this.onClick();
    }

    private renderAll() {
        let rows = $('.board').find('.row');

        let _self = this;

        rows.each(function (i) {
            $(this).children('div').each(function (j) {
                $(this).attr('data-x', i);
                $(this).attr('data-y', j);
                $(this).empty().append(_self.positions.getAt(i, j).render());
            });
        });

    }

    private onClick() {
        let _self = this;

        $('.btn').click(function () {

            let movement = _self.nextPlayerMakeAMove($(this));
            _self.save(movement);

            let winner = _self.positions.thereIsAWinner();

            if (typeof(winner) !== "boolean") {
                //noinspection TypeScriptUnresolvedFunction
                swal('Winner!', winner.getName());
            }
        });
    }

    private nextPlayerMakeAMove(element: JQuery) : any {
        let parent = element.parent();

        let x = parent.data('x');
        let y = parent.data('y');
        let turn = this.player.toggle();

        this.positions.put(x, y, turn);
        this.renderAt(parent);

        return {x: x, y: y, player: turn}
    }

    private renderAt(element: JQuery) {

        let x = element.data('x');
        let y = element.data('y');

        console.log(this.positions.getAt(x, y));

        element.empty().append(this.positions.getAt(x, y).render());
    }

    private save(movement) {
        console.log(movement);
    }

}
