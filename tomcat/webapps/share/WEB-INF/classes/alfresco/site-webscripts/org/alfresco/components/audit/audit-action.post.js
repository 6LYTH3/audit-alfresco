var user = "";
var toIdF = "";
var actionAudit = "";
var fileFilter = "";
var nodeFilter = "";
var newData = "{'entries': [ ";
var fil = "";
var timestemp = "";
var actionCheck = false;
var timeCheck = false;
var choice;
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
    actionAudit = field.value;
  }
  else if (field.name == "timestemp")
  {
    timestemp = getTimestemp(field.value);
  }  
  else if (field.name == "fileFilter")
  {
    fileFilter = field.value;
  }
  else if (field.name == "nodeFilter")
  {
    nodeFilter = field.value+"";
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
if(actionAudit != "")
{
	actionCheck = true;
}
if(timestemp != "")
{
	timeCheck = true;
}


if(actionCheck && (timeCheck == false)){
	choice = 1;
}else if((actionCheck == false) && timeCheck){
	choice = 2;
}else if(actionCheck && timeCheck){
	choice = 3;
}else{
	choice = 1;
}



   var uri = "/api/audit/query/my-app?verbose=true&forward=false"+user+toIdF;
   var result = remote.call(uri);
   genData(result,choice);

   newData += " ] }";	
   model.newData = newData;
   model.result = eval("(" + newData + ")");
   model.toId = getF();
}

function getData(toId){
   var uri = "/api/audit/query/my-app?verbose=true&forward=false&toId="+user+toId;
   var result = remote.call(uri);
   genData(result,choice);
}

function genData(result,checkChoice){
   if (result.status == status.STATUS_OK)
   {
     	var auditData = eval("(" + result.response + ")");
	var rangeEntries = auditData.entries.length;
	var lastId;
	for(i=0;i<rangeEntries;i++){
		var times = getTimes(auditData.entries[i].time+"");
		var timeToAr = auditData.entries[i].time.split("-");
 		var actionDown = auditData.entries[i].values['/my-app/action'];
 		var downToRead = auditData.entries[i].values['/my-app/name'];
		lastId = auditData.entries[i].id;
 		if (actionDown == "READ") {
 			actionDown = "DOWNLOAD";
 		}
 		if (downToRead == "imgpreview" || downToRead == "webpreview") {
 			actionDown = "READ";
			if(i>=98) break;
 			i+=2;
 		}
 		var myPath = getPath(auditData.entries[i].values['/my-app/path']+"");
		var myFile = getFile(auditData.entries[i].values['/my-app/path']+"");
		var checkNode = myPath.split("/").indexOf(nodeFilter);	

		switch(checkChoice) {
			case 1:
			if(actionDown == actionAudit || actionAudit == ""){
				if(fileFilter == myFile || fileFilter == ""){
					if(checkNode > 0 || nodeFilter == ""){
	 				if (auditData.entries[i].values['/my-app/action']+"" != "undefined") {
						newData += "{ 'id' : '"+lastId+"' ,'user' : '"+auditData.entries[i].user+"', 'time' : '"+times+"', 'values' : { 'action' : '"+actionDown+"','file' : '"+myFile+"','path' :'"+ myPath+"'} },";
					}
					}
				}
			}
			break;
			case 2:
			if(timestemp[0] == timeToAr[2].substring(0,2) && timestemp[1] == timeToAr[1] && timestemp[2] == timeToAr[0]){
	 			if(fileFilter == myFile || fileFilter == ""){
					if(checkNode > 0 || nodeFilter == ""){
					if (auditData.entries[i].values['/my-app/action']+"" != "undefined") {
						newData += "{ 'id' : '"+lastId+"' ,'user' : '"+auditData.entries[i].user+"', 'time' : '"+times+"', 'values' : { 'action' : '"+actionDown+"','file' : '"+myFile+"','path' :'"+ myPath+"'} },";
					}
					}
				}
			}
			break;
			case 3:
			if(actionDown == actionAudit || actionAudit == ""){
				if(timestemp[0] == timeToAr[2].substring(0,2) && timestemp[1] == timeToAr[1] && timestemp[2] == timeToAr[0]){
					if(fileFilter == myFile || fileFilter == ""){
						if(checkNode > 0 || nodeFilter == ""){
	 					if (auditData.entries[i].values['/my-app/action']+"" != "undefined") {
						newData += "{ 'id' : '"+lastId+"' ,'user' : '"+auditData.entries[i].user+"', 'time' : '"+times+"', 'values' : { 'action' : '"+actionDown+"','file' : '"+myFile+"','path' :'"+ myPath+"'} },";
						}
						}
					}
				}			
			}
			break;
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

function getTimestemp(times){
	if(times == ""){
		return  "";
	}else{
	var newTime = times.split("/");
	return newTime;
	}
}
main();
