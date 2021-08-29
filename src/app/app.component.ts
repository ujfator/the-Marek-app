import { Component, HostBinding, NgZone, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { akitaDevtools } from '@datorama/akita';
import { AuthorizationQuery } from './state-management/authorization/authorization.query';
import { AuthorizationService } from './common/services/api-calls/authorization.service';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html',
})
export class AppComponent {
	@HostBinding('class') componentCssClass;
	theme: string = 'Dark';
	author: string;
	isAuthorized: boolean = false;
	opened: boolean = true;
	users: string[] = [];
	sidenavWidthClass: string = 'side-navigation-container-login';

	constructor(
		private overlayContainer: OverlayContainer,
		private authorizationQuery: AuthorizationQuery,
		private authorizationService: AuthorizationService,
		private ngZone: NgZone,
	) {
		akitaDevtools(this.ngZone); // this makes the store available
		this.authorizationQuery.isAuthorized.subscribe((isAuthorized) => {
			this.isAuthorized = isAuthorized;
			this.sidenavWidthClass =
				'side-navigation-container-' + (isAuthorized ? 'app' : 'login');
		});
		if (localStorage.getItem('theme')) this.onSetTheme(localStorage.getItem('theme'));
		this.authorizationQuery.selectedUser.subscribe((author) => (this.author = author));
		this.authorizationQuery.users.subscribe((users) => (this.users = users));
	}

	logout() {
		this.authorizationService.authorizeOrInvalidateSession(false);
	}

	toggleSidenav() {
		this.opened = !this.opened;
	}

	chooseAuthor(author: string): void {
		const user = author === 'Oba' ? null : author;
		this.authorizationService.selectAuthor(user);
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
