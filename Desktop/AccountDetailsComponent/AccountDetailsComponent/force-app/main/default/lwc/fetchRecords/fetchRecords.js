/* eslint-disable no-console */
import { LightningElement, wire, track, api } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.search';

export default class FetchRecords extends LightningElement {
    @wire(getAccountList) Accounts;
    @track open = false;
    @api recId;

    handleClick(event) {
        this.recId = event.currentTarget.name;
        console.log('PASS @@'+this.recId);
        this.open = true;
    }

    closeModal() {
        this.open = false;
    }
  
    
}