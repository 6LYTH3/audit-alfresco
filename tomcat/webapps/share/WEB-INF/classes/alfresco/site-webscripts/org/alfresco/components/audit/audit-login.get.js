function main()
{

   // get the live list from the repo of currently registered audit applications
   // requires to be logged in as an admin user
   // remote.call(uri);
   var uri = "/api/audit/query/AuditLogin2?verbose=true&forward=false";
   var connector = remote.connect("alfresco");
   var result = connector.get(uri);

   if (result.status == status.STATUS_OK)
   {
      var auditData = eval("(" + result.response + ")");
      model.auditData = auditData.entries;
   }
   else
   {
      status.setCode(result.status, "Error during remote call. " + "Status: " + result.status + ", Response: " + result.response);
      status.redirect = true;
   }

}
main();
