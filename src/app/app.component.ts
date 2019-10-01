import { Component, HostBinding  } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthorService } from './common/services/author.service';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})
export class AppComponent {
	@HostBinding('class') public componentCssClass;
	public theme: string = 'Dark';
	public author: string;

	constructor(
		public overlayContainer: OverlayContainer,
		public authorService: AuthorService,
		) {
			if (localStorage.getItem('theme')) this.onSetTheme(localStorage.getItem('theme'));
			this.authorService.author.subscribe((author) =>  {
				if (author) { 
					if (author !== 'Oba') { 
						this.author = author;
					} else this.author = null;
				};
			});
		}

	public chooseAuthor(author: string): void{
		this.authorService.selectAuthor(author);
	}


	public onSetTheme(theme: any): void {
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
