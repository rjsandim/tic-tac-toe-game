import {Type} from "./Type";
export class Fire implements Type {
    getName() {
        return 'Fire';
    }

    constructor() {

    }

    render() {
        return '<span class="col-xs-12 btn btn-danger glyphicon glyphicon-fire gi-8x" aria-hidden="true"></span>';
    }

}
