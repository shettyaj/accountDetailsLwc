import { LightningElement, track, api } from 'lwc';  
 import getAccountsList from '@salesforce/apex/ManageRecordsController.getAccountsList';  
 import getAccountsCount from '@salesforce/apex/ManageRecordsController.getAccountsCount';  
 export default class RecordList extends LightningElement {  
   @track accounts;  
   @track error;  
   @api currentpage;  
   @api pagesize;  
    
   totalpages;  
  
   // not yet implemented  
   pageSizeOptions =  
     [  
       //{ label: '5', value: 5 },  
       { label: '10', value: 10 },  
       { label: '20', value: 20 },  
       { label: '30', value: 30 },  
       { label: 'All', value: '' },  
     ];  
   
   renderedCallback() {  
      
     getAccountsCount({ searchString: this.searchKey })  
       .then(recordsCount => {  
         this.totalrecords = recordsCount;  
         if (recordsCount !== 0 && !isNaN(recordsCount)) {  
           this.totalpages = Math.ceil(recordsCount / this.pagesize);  
           getAccountsList({ pagenumber: this.currentpage, numberOfRecords: recordsCount, pageSize: this.pagesize, searchString: this.searchKey })  
             .then(accountList => {  
               this.accounts = accountList;  
               this.error = undefined;  
             })  
             .catch(error => {  
               this.error = error;  
               this.accounts = undefined;  
             });  
         } else {  
           this.accounts = [];  
           this.totalpages = 1;  
           this.totalrecords = 0;  
         }  
         const event = new CustomEvent('recordsload', {  
           detail: recordsCount  
         });  
         this.dispatchEvent(event);  
       })  
       .catch(error => {  
         this.error = error;  
         this.totalrecords = undefined;  
       });  
   }  
 }  