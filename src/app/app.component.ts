import { Component, HostBinding  } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})
export class AppComponent {
	@HostBinding('class') public componentCssClass;
	public theme: string = 'Dark';

	constructor(public overlayContainer: OverlayContainer) {}


	public onSetTheme(theme: any): void {
		if (this.componentCssClass === 'dark-theme') {
			this.overlayContainer.getContainerElement().classList.add('light-theme');
			this.overlayContainer.getContainerElement().classList.remove('dark-theme');
			this.componentCssClass = 'light-theme';
			this.theme = 'Dark';
		} else {
			this.overlayContainer.getContainerElement().classList.add('dark-theme');
			this.overlayContainer.getContainerElement().classList.remove('light-theme');
			this.componentCssClass = 'dark-theme';
			this.theme = 'Light';
		}
	}
}
