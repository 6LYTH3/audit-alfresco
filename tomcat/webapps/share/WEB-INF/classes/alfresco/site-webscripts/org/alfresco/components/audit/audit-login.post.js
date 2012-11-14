var user = "";
var toId = "";
var valueAudit = "";
var timestemp = "";

// locate file attributes
for each (field in formdata.fields)
{
  if (field.name == "user")
  {
   user = "&user="+field.value;
  }
  else if (field.name == "toid")
  {
    toId = "&toId="+field.value;
  }
  else if (field.name == "valueAudit")
  { 
    valueAudit = "&value="+field.value;
  }
  else if (field.name == "timestemp")
  {
    timestemp = getTimestemp(field.value);
  }
}

if(user == "&user=")
{
  user = "";
}
if(toId == "&toId=")
{
  toId = "";
}
if(valueAudit == "&value=")
{
  valueAudit = "";
}
// get the live list from the repo of currently registered audit applications
// requires to be logged in as an admin user
// remote.call(uri);
var uri = "/api/audit/query/AuditLogin2?verbose=true&forward=false"+user+toId+valueAudit;
var connector = remote.connect("alfresco");
var result = connector.get(uri);
var newData = "{'entries': [ ";
var checkNewData = false;

if (result.status == status.STATUS_OK)
{
      var auditData = eval("(" + result.response + ")");
  var rangeEntries = auditData.entries.length;
  for(i=0;i<rangeEntries;i++){
    var cTime = auditData.entries[i].time.split("-");
    if(timestemp != "" && timestemp[0] == cTime[2].substring(0,2) && timestemp[1] == cTime[1] && timestemp[2] == cTime[0]){
      checkNewData = true;
      newData += "{ 'id' : '"+auditData.entries[i].id+"' ,'user' : '"+auditData.entries[i].user+"', 'time' : '"+auditData.entries[i].time+"', 'values' : { '/auditlogin2/login/user' : '"+auditData.entries[i].values['/auditlogin2/login/user']+"'} },";
    }
  }
  newData += " ] }";
  if(checkNewData){
  model.auditData = eval("(" + newData + ")");
  }else{
  model.auditData = auditData;
  }
}
else
{
    status.setCode(result.status, "Error during remote call. " + "Status: " + result.status + ", Response: " + result.response);
    status.redirect = true;
}


function getTimestemp(times){
  if(times == ""){
    return  "";
  }else{
  var newTime = times.split("/");
  return newTime;
  }
}
