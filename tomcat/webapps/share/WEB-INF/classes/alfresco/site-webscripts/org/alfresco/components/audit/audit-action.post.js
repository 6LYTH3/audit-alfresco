var user = "";
var toIdF = "";
var actionAudit = "";
var fileFilter = "";
var nodeFilter = "";
var entries = [];
var timestemp = "";

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


   var uri = "/api/audit/query/my-app?verbose=true&forward=false"+user+toIdF;
   var result = remote.call(uri);
   generateData(result);
   model.result = entries;
}

function recall(toId){
   var uri = "/api/audit/query/my-app?verbose=true&forward=false&toId="+user+toId;
   var result = remote.call(uri);
   generateData(result);
}

function generateData(result){
   if (result.status == status.STATUS_OK)
   {
     	var auditData = eval("(" + result.response + ")");
	var lastId;
	for(i = 0; i < auditData.entries.length; i++){
		var times = getTimes(String(auditData.entries[i].time));
		var timeToAr = auditData.entries[i].time.split("-");
 		var actionDown = auditData.entries[i].values['/my-app/action'];
 		var downToRead = auditData.entries[i].values['/my-app/name'];
		lastId = auditData.entries[i].id;
 		if (actionDown == "READ") {
 			actionDown = "DOWNLOAD";
 		}
 		if (downToRead == "imgpreview" || downToRead == "webpreview") {
 			actionDown = "READ";
			if (i >= 97) break;
 			i+=2;
 		}
 		var myPath = getPath(String(auditData.entries[i].values['/my-app/path']));
		var myFile = getFile(String(auditData.entries[i].values['/my-app/path']));
		var checkNode = myPath.split("/").indexOf(nodeFilter);

		if(actionDown == actionAudit || actionAudit == ""){
			if((timestemp[0] == timeToAr[2].substring(0,2) && timestemp[1] == timeToAr[1] && timestemp[2] == timeToAr[0]) || (timestemp == "")){
				if(fileFilter == myFile || fileFilter == ""){
					if(checkNode > 0 || nodeFilter == ""){
	 				if (auditData.entries[i].values['/my-app/action']+"" != "undefined") {
						entries.push({  
                               				id: lastId,
			                                user:  auditData.entries[i].user,
			                                time:  times,
			                                values: {
			                                        action: actionDown,
                        			       		file:  String(myFile),
                                         			path: String(myPath)
                                 		}       
                        		 });             
					}
					}
				}
			}			
		}
	}

		if(lastId > 10000){
			recall(lastId);
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

function getTimestemp(times){
	if(times == ""){
		return  "";
	}else{
	var newTime = times.split("/");
	return newTime;
	}
}
main();
