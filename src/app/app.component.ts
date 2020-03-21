import { Component, HostBinding, NgZone  } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthorService } from './common/services/local-services/author.service';
import { AuthorizationQuery } from './state-management/query/authorization.query';
import { akitaDevtools } from '@datorama/akita';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})
export class AppComponent {

	@HostBinding('class') componentCssClass;
	theme: string = 'Dark';
	author: string;
	isAuthorized: boolean = false;

	constructor(
		private overlayContainer: OverlayContainer,
		private authorService: AuthorService,
		private authorizationQuery: AuthorizationQuery,
		private ngZone: NgZone,
		) {
			akitaDevtools(this.ngZone); // this makes the store available
			this.authorizationQuery.isAuthorized.subscribe((isAuthorized) => {

				console.log(isAuthorized)
				this.isAuthorized = isAuthorized});
			console.log(this.isAuthorized)
			if (localStorage.getItem('theme')) this.onSetTheme(localStorage.getItem('theme'));
			this.authorService.author.subscribe((author) =>  {
				if (author) {
					if (author !== 'Oba') {
						this.author = author;
					} else this.author = null;
				};
			});
		}

 	chooseAuthor(author: string): void{
		this.authorService.selectAuthor(author);
	}

 	onSetTheme(theme: any): void {
		if (theme === 'Light') {
			this.overlayContainer.getContainerElement().classList.add('light-theme');
			this.overlayContainer.getContainerElement().classList.remove('dark-theme');
			this.componentCssClass = 'light-theme';
			localStorage.setItem('theme', theme);
		} else {
			this.overlayContainer.getContainerElement().classList.add('dark-theme');
			this.overlayContainer.getContainerElement().classList.remove('light-theme');
			this.componentCssClass = 'dark-theme';
			localStorage.setItem('theme', theme);
		}
	}
}
