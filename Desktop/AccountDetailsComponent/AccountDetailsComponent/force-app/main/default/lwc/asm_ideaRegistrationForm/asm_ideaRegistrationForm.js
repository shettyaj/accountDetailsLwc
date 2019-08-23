/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import IDEA_OBJECT from '@salesforce/schema/Idea__c';
import NAME_FIELD from '@salesforce/schema/Idea__c.Name';
import DOMAIN_FIELD from '@salesforce/schema/Idea__c.Domain__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Idea__c.Description__c';
import TIME_FIELD from '@salesforce/schema/Idea__c.Estimated_Time__c';
import STATUS_FIELD from '@salesforce/schema/Idea__c.Status__c';
//import OWNER_FIELD from '@salesforce/schema/Idea__c.OwnerId';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
//import { getStatusValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import Idea_Logo from '@salesforce/resourceUrl/idea';
import getAssetList from '@salesforce/apex/AssetController.getAssetList';
import getAssetListByOwnerName from '@salesforce/apex/AssetController.getAssetDetailsByOwnerName';
import { refreshApex } from '@salesforce/apex';
//import { NavigationMixin } from 'lightning/navigation';
import {getRecord} from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import USERNAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';


export default class Asm_ideaRegistrationForm extends LightningElement {
    @track open = false;
    @track dis = false;
    @api recId;
    
    @track title = '';
    @track domain = '';
    @track description = ''; 
    @track time = '';
    @track progress = 0;
    @track status = 'Draft';
    @track url;
    @track email ; 
    @track name;
    @track searchKey = '';
    
    @wire(getAssetList) Assets; 
    @wire(getAssetListByOwnerName) AssetsByOwner; 

    //@wire(getAssetListByOwnerName, { searchKey: '$ownerName' })
    //AssetsByOwner;
 
    @track assetByName;

    IdeaUrl = Idea_Logo;

    @wire(getRecord, {
        recordId: USER_ID,
        fields: [USERNAME_FIELD, EMAIL_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.email = data.fields.Email.value;
            this.name = data.fields.Name.value;
        }
    }

    get Option(){
        console.log('this.name ----'+this.name);
        const searchKey=this.name;
    console.log('searchKey ##'+searchKey);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    getAssetListByOwnerName({ownerName : searchKey})
    .then(result=>{
    this.assetByName=result;
    this.error=undefined;
    console.log('@@'+this.assetByName);
    
    })
    .catch(error=>{
    this.error=error;
    this.assetByName=undefined;
    }); 

    return this.assetByName;
      }

    showMyAssets(){
        this.assetByName = this.name;
        console.log('this.assetByName ----'+this.assetByName);
    }
    
    changeStatus(evt) {
    this.open = evt.target.value;
    }


    handleClick(event) {
        this.recId = event.currentTarget.name;
        this.open = true;
       }

    handleClick1(event) {
        this.recId = event.currentTarget.name;
        this.dis = true;
    }

   
    closeModal() {
        this.open = false;
        this.dis = false;
    }

    handleTitleChange(event) {
        this.recId = undefined;
        this.title = event.target.value;
    }

    
    handleDescriptionChange(event) {
        this.recId = undefined;
        this.description = event.target.value;
    }

    @wire(getObjectInfo, {objectApiName : IDEA_OBJECT})
    objectInfo;

    @wire(getPicklistValues, {
            recordTypeId: '$objectInfo.data.defaultRecordTypeId', 
            fieldApiName : DOMAIN_FIELD})  picklistValues;

    selectDomain(event) {  
        this.domain = event.detail.value;
    }

    handleTimeChange(event) {
        this.recId = undefined;
        this.time = event.target.value;
    }

    
    save(){
         const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.title;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
        fields[DOMAIN_FIELD.fieldApiName] = this.domain;
        fields[TIME_FIELD.fieldApiName] = this.time;
        fields[STATUS_FIELD.fieldApiName] = this.status;
        
        const recordInput = { apiName: IDEA_OBJECT.objectApiName, fields };
 
        createRecord(recordInput)
            .then(idea => {
                this.recId = idea.id;
                 this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Idea created',
                        variant: 'success',
                    }),
                );
                
                return refreshApex(this.Assets);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    
        this.open = false;
        if (this.status === 'Draft') {
            this.progress = 10 ;
         } 
        
    }

    showDetails(){
        const titlename = this.title;       
        return titlename;
    }


    cancel() {
        this.open = false;
    }

}