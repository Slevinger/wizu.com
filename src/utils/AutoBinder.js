export class AutoBinder {
	constructor() {
		const descriptors = Object.getOwnPropertyDescriptors(this.__proto__);
		const validKeys = Object.keys(descriptors).filter(
			(key) => key !== 'constructor' && descriptors[key].value
		);
		validKeys.forEach((key) => (this[key] = this[key].bind(this)));
	}
}
