/* eslint-disable no-console */
import {LightningElement,api} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class UpdateRec extends LightningElement {
    @api recordId;
    /**
     * @description - handleSuccess method handles success scenario
     */
    handleSuccess() {
        const successToast = new ShowToastEvent({
            title: 'Record has been successfully updated',
            variant: 'success',
        });
        this.dispatchEvent(successToast);
        const updateRecord = new CustomEvent('update');
        this.dispatchEvent(updateRecord);
        const closeModal = new CustomEvent('closemodal');
        this.dispatchEvent(closeModal);
    }

    closeModal() {
        const closeModal = new CustomEvent('closemodal');
        this.dispatchEvent(closeModal);
    }

}