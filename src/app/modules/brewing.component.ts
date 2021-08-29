import { Component } from "@angular/core";

@Component({
	selector: 'app-brewing',
	template: `<iframe src="https://warm-eyrie-07258.herokuapp.com/"></iframe>`,
	styles: [`
        :host {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }
        iframe {
            width: 98%;
            height: 98%;
        }
        `],
})
export class BrewingComponent {}