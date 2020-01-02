import { Component, HostBinding  } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthorService } from './common/services/author.service';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})
export class AppComponent {

	@HostBinding('class') componentCssClass;
	theme: string = 'Dark';
	author: string;
	loggedIn: boolean = false;
	authorized: boolean = false;


	constructor(
		public overlayContainer: OverlayContainer,
		public authorService: AuthorService,
		) {
			if (sessionStorage.getItem('loggedIn')) this.authorized = true;
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
