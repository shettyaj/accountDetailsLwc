/* eslint-disable no-console */
import {LightningElement,api,track} from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';


export default class FetchContactRecords extends LightningElement {
   
  @api recordId;
  @track acc;
  @track error;

    get Option(){
    const searchKey=this.recordId;
    console.log('KEY ##'+searchKey);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    getContactList({accId : searchKey})
    .then(result=>{
    this.acc=result;
    this.error=undefined;
    console.log('@@'+this.acc);
    
    })
    .catch(error=>{
    this.error=error;
    this.acc=undefined;
    }); 

    return this.acc;
  }

  closeModal() {
      const closeModal = new CustomEvent('closemodal');
      this.dispatchEvent(closeModal);
  }
}