/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import getAssetDetails from '@salesforce/apex/AssetController.getAssetDetails';

export default class Asm_assestDetailsPage extends LightningElement {
    
  @api recordId;
  @track asset;

  @track open = false;
  @track dis = true;
  @track error;

    get Option(){
    const searchKey=this.recordId;
    console.log('searchKey ##'+searchKey);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    getAssetDetails({assetId : searchKey})
    .then(result=>{
    this.asset=result;
    this.error=undefined;
    console.log('@@'+this.asset);
    
    })
    .catch(error=>{
    this.error=error;
    this.asset=undefined;
    }); 

    return this.asset;
  }

  handleClick(event) {
    this.recordId = event.currentTarget.name;
    this.open = true;
    this.dis = false;
}




}