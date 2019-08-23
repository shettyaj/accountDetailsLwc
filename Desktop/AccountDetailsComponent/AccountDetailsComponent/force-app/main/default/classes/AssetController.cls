public with sharing class AssetController {

    @AuraEnabled(cacheable=true)
    public static List<Idea__c> getAssetList() {
           // system.debug('assetId is:'+ assetId);
        return [SELECT Id, Name, Domain__c, Description__c, Assest__c, Status__c, CreatedDate, Comments__c, Complexity__c
                FROM Idea__c 
                ORDER BY CreatedDate DESC 
                LIMIT 10];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Idea__c> getAssetDetails(Id assetId) {
        system.debug('assetId is:'+ assetId);
         return [SELECT Id, Name, Domain__c, Description__c, Assest__c, Status__c,  Comments__c, Complexity__c
                FROM Idea__c 
                WHERE Id = :assetId
                ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Idea__c> getAssetDetailsByOwnerName(String ownerName) {
        system.debug('ownerName is:'+ ownerName);
         return [SELECT Id, Name, Domain__c, Description__c, Assest__c, Status__c,  Comments__c, Complexity__c, Owner.Name
                FROM Idea__c 
                WHERE Owner.Name = :ownerName
                ];
    }

}
