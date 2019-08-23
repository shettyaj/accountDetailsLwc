/* eslint-disable no-console */
import {LightningElement,wire,track,api} from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.search';
import {refreshApex} from '@salesforce/apex';

export default class AccountListEdit extends LightningElement {
    @wire(getAccounts) Accounts;
    @track open = false;
    @api recId;

    /**
     * @description - handleClick method takes event as argument and assign values to open and recId variable 
     * @param {object} event - Standard Event Object
     */
    handleClick(event) {
        this.recId = event.currentTarget.name;
        this.open = true;
    }

    /**
     * @description - closeModal method used to close the popup modal
     */
    closeModal() {
        this.open = false;
    }

    /**
     * @description - reloadList method used to refresh the list
     */
    reloadList() {
        return refreshApex(this.Accounts);
    }
}