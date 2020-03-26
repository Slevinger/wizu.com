// @flow

import { decorate, observable } from 'mobx';
import { AutoBinder } from '../../utils/AutoBinder';

// errorModal: $Shape<{
// 	show: boolean,
// 	text: string
// }>;
//
// confirmationModal: $Shape<{
// 	show: boolean,
// 	text: string,
// 	onConfirm: Function
// }>;
//
// successModal: $Shape<{
// 	show: boolean,
// 	text: string
// }>;

export class ModalStore extends AutoBinder {

	errorModal;

	confirmationModal;

	successModal;


	constructor() {
		super();
		this.init();
	}

	init() {
		this.errorModal = {
			show: false,
			text: ''
		};
		this.confirmationModal = {
			show: false,
			text: ''
		};
		this.successModal = {
			show: false,
			text: ''
		};
	}

	showSuccessModal(text) {
		this.successModal = { show: true, text };
	}

	closeSuccessModal() {
		this.successModal = { show: false };
	}

	showErrorModal(text) {
		this.errorModal = { show: true, text };
	}

	closeErrorModal() {
		this.errorModal = { show: false };
	}

	showConfirmationModal(text, onConfirm) {
		this.confirmationModal = {
			show: true,
			text,
			onConfirm
		};
	}

	closeConfirmationModal() {
		this.confirmationModal = { show: false };
	}
}

decorate(ModalStore, {
	errorModal: observable,
	confirmationModal: observable,
	successModal: observable
});
