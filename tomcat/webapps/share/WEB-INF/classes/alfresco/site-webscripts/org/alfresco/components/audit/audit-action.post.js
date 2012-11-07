var user = "";
var toIdF = "";
var actionAudit = "";
var newData = "{'entries': [ ";
var fil = "";

function main()
{

// locate file attributes
for each (field in formdata.fields)
{
  if (field.name == "user")
  {
   user = "&user="+field.value;
  }
  else if (field.name == "toid")
  {
    toIdF = "&toId="+field.value;
  }
  else if (field.name == "action")
  {	
    actionAudit = field.value+"";
  }
}

if(user == "&user=")
{
	user = "";
}
if(toIdF == "&toId=")
{
	toIdF = "";
}


   var uri = "/api/audit/query/my-app?verbose=true&forward=false"+user+toIdF;
   var result = remote.call(uri);
   genData(result);

   newData += " ] }";	
   model.newData = newData;
   model.result = eval("(" + newData + ")");
   model.toId = getF();
}

function getData(toId){
   var uri = "/api/audit/query/my-app?verbose=true&forward=false&toId="+user+toId;
   var result = remote.call(uri);
   genData(result);
}

function genData(result){
   if (result.status == status.STATUS_OK)
   {
     	var auditData = eval("(" + result.response + ")");
	var rangeEntries = auditData.entries.length;
	var lastId;
	for(i=0;i<rangeEntries;i++){
		var times = getTimes(auditData.entries[i].time+"");
 		var actionDown = auditData.entries[i].values['/my-app/action'];
 		var downToRead = auditData.entries[i].values['/my-app/name'];
		lastId = auditData.entries[i].id;
 		if (actionDown == "READ") {
 			actionDown = "DOWNLOAD";
 		}
 		if (downToRead == "imgpreview" || downToRead == "webpreview") {
 			actionDown = "READ";
 			i+=2;
 		}
 		var myPath = getPath(auditData.entries[i].values['/my-app/path']+"");
		var myFile = getFile(auditData.entries[i].values['/my-app/path']+"");
	if(actionDown == actionAudit || actionAudit == ""){
	 	if (auditData.entries[i].values['/my-app/action']+"" != "undefined") {
			newData += "{ 'id' : '"+lastId+"' ,'user' : '"+auditData.entries[i].user+"', 'time' : '"+times+"', 'values' : { 'action' : '"+actionDown+"','file' : '"+myFile+"','path' :'"+ myPath+"'} },";
		}
	}
	}
	if(lastId > 10000){
		getData(lastId);
	}
   }
   else
   {
      status.setCode(result.status, "Error during remote call. " + "Status: " + result.status + ", Response: " + result.response);
      status.redirect = true;
   }

}

function getPath(paths)
{
	var pathsToAr = paths.split(":");
	var newPath = "";
	for (var i = 0; i < pathsToAr.length-1; i++) {
	if (i >= 2) {
		newPath += pathsToAr[i].substring(0,(pathsToAr[i].length)-2);	
	}else{
		newPath += pathsToAr[i].substring(0,(pathsToAr[i].length)-3);
		}
	}
		newPath += pathsToAr[pathsToAr.length-1];
	return newPath;
}

function getTimes(times){
	return times.substring(0,19);
}

function getFile(paths)
{
	var pathsToAr = paths.split(":");
	var lastIndex = pathsToAr.length-1;
	return pathsToAr[lastIndex];
}	

function getFilter(toId){
	 fil = toId;
}
function getF(){
	return fil;
}
main();
