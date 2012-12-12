var toId = "";
var valueAudit = "";
var timestemp = "";

// locate file attributes
for each (field in formdata.fields)
{
  if (field.name == "toid")
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
var uri = "/api/audit/query/AuditLogin1?verbose=true&forward=false"+toId+valueAudit;
var connector = remote.connect("alfresco");
var result = connector.get(uri);
var entries = [];
var checkNewData = false;

if (result.status == status.STATUS_OK)
{
     	var auditData = eval("(" + result.response + ")");
	for(i = 0; i < auditData.entries.length; i++){
		var cTime = auditData.entries[i].time.split("-");
		if(timestemp != "" && timestemp[0] == cTime[2].substring(0,2) && timestemp[1] == cTime[1] && timestemp[2] == cTime[0]){
			checkNewData = true;
			entries.push({
				id: auditData.entries[i].id,
				user: auditData.entries[i].user,
				time: auditData.entries[i].time,
				values: {
					'/auditlogin1/login/error/user': auditData.entries[i].values['/auditlogin1/login/error/user']
				}
			});
		}
	}
	model.auditData = (checkNewData) ? entries : auditData.entries;
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
