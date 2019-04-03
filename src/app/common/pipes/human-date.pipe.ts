import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'humanDate'
})
export class HumanDatePipe implements PipeTransform {
	public transform(value: any, args: Array<any>): string {
		// return moment(value).format('L LTS');
		return moment(value).format('DD.MM.YYYY HH:MM:SS');
	}
}

export const humanDatePipeInjectables: Array<any> = [
	HumanDatePipe
];
