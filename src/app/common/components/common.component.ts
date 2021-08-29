import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
	selector: 'marek-common',
	template: '',
})

export class MarekCommon implements OnDestroy {
	protected destroyed: Subject<any> = new Subject();

	ngOnDestroy() {
		this.destroyed.next();
        this.destroyed.complete();
	}
}
