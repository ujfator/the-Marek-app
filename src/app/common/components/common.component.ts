import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export class MarekCommon implements OnDestroy {
	protected destroyed: Subject<any> = new Subject();

	ngOnDestroy() {
		this.destroyed.next()
        this.destroyed.complete()
	}
}
