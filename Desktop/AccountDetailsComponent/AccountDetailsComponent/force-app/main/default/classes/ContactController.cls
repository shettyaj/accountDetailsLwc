public with sharing class ContactController {
    
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(Id accId) {
        system.debug('accId is:'+ accId);
        return [SELECT Id, Name ,Email, Phone, Account.Name 
                FROM Contact 
                WHERE AccountId = :accId];
    }
    
    /*
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Title, Phone, Email
                FROM Contact
                LIMIT 10];
    }
    */
}
