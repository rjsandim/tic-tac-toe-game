import {Type} from "./Type";
export class Blank implements Type {
    getName() {
        return 'None';
    }

    constructor() {

    }

    render() {
        return '<span class="col-xs-12 btn btn-default gi-8x"aria-hidden="true">&nbsp;</span>';
    }

}
