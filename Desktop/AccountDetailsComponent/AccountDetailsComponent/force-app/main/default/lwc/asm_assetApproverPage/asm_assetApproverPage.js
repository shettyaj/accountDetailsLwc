/* eslint-disable no-console */
import { LightningElement, wire, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAssetList from '@salesforce/apex/AssetController.getAssetList';
import Idea_Logo from '@salesforce/resourceUrl/idea';
import IDEA_OBJECT from '@salesforce/schema/Idea__c';
//import ID_FIELD from '@salesforce/schema/Idea__c.Id';
import COMPLEXITY_FIELD from '@salesforce/schema/Idea__c.Complexity__c';
//import COMMENTS_FIELD from '@salesforce/schema/Idea__c.Comments__c';
//import STATUS_FIELD from '@salesforce/schema/Idea__c.Status__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { refreshApex } from '@salesforce/apex'; 

import {updateRecord} from 'lightning/uiRecordApi';
//import {CurrentPageReference} from 'lightning/navigation';
     

export default class Asm_assetApproverPage extends LightningElement {


    IdeaUrl = Idea_Logo;

    @wire(getAssetList) Assets;

    @api recId;
    @track Id;
    @track error;
    @track disabled = false;

    @track open = false;
    @track value = '';
    @track complexity = '';
    @track comments = '';
    @track status = '';
    @track time = '';
   
    get options() {
        return [
            { label: 'Approve', value: 'approve' },
            { label: 'Reject', value: 'reject' },
        ];
    }

    changeStatus(event){
        const selectedValue = event.target.value;
        console.log("status-----" + selectedValue);

        if (selectedValue === 'approve'){
             let record = {
                fields: {
                    Id: this.recId,
                    Status__c: 'In-Progress',
                     },
            };
              updateRecord(record)
           }else if(selectedValue === 'reject'){
            let record = {
                fields: {
                    Id: this.recId,
                    Status__c: 'Rejected',
                     },
            };
              updateRecord(record)
        }
        
    }


    handleClick(event) {
        this.recId = event.currentTarget.name;
        console.log("id-----" + this.recId);
        this.open = true;
    }

    @wire(getObjectInfo, {objectApiName : IDEA_OBJECT})
    objectInfo;

    @wire(getPicklistValues, {
            recordTypeId: '$objectInfo.data.defaultRecordTypeId', 
            fieldApiName : COMPLEXITY_FIELD})  picklistValues;

    selectComplexity(event) { 
        this.Id = this.recId;
         this.complexity = event.detail.value;
    }

    closeModal() {
        this.open = false;
    }

    /*handleCommentsChange(event) {
        this.recId = event.currentTarget.Id;
        this.comments = event.target.value;

    }*/
    
    handleCommentsChange(event) {
        this.Id = this.recId;
        this.comments = event.target.value;          
    } 
    

   handleTimeChange(event) {
    this.recId = this.recId;
    this.time = event.target.value;
}

    
    
    handleSave(){
        let record = {
            fields: {
                Id: this.recId,
                Comments__c: this.comments,
                Complexity__c: this.complexity,
                Estimated_Time__c: this.time,
            },
        };
          updateRecord(record)
            
            .then(() => {
                 this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Changes Updated',
                        variant: 'success',
                    }),
                );
                return refreshApex(this.Assets);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error on data save',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
            this.open = false;
    }
    

}