public with sharing class AccountController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Account> search() {
	return [SELECT Id,Industry, Name ,Type, AnnualRevenue, Phone  FROM Account LIMIT 10];        
    }

}
