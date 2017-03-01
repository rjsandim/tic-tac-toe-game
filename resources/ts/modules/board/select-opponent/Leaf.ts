import {Type} from "./Type";
export class Leaf implements Type {
    getName() {
        return 'Leaf';
    }

    constructor() {

    }

    render() {
        return '<span class="col-xs-12 btn btn-success glyphicon glyphicon-leaf gi-8x" aria-hidden="true"></span>';
    }

}
