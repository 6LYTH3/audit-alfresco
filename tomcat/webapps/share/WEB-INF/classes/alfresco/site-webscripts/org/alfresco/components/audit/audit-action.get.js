var newData = "{'entries': [ ";
var fil = "";

function main()
{

   model.pass = "args.oldpassword";
   var uri = "/api/audit/query/my-app?verbose=true&forward=false";
   var result = remote.call(uri);
   genData(result);

   newData += " ] }";	
   model.newData = newData;
   model.result = eval("(" + newData + ")");
   model.toId = getF();
}

function getData(toId){
   var uri = "/api/audit/query/my-app?verbose=true&forward=false&toId="+toId;
   var result = remote.call(uri);
   genData(result);
}

function genData(result){
   if (result.status == status.STATUS_OK)
   {
     	var auditData = eval("(" + result.response + ")");
	var rangeEntries = auditData.entries.length;
	var lastId;
	var nId;
	for(i=0;i<rangeEntries;i++){
		var times = getTimes(auditData.entries[i].time+"");
 		var actionDown = auditData.entries[i].values['/my-app/action'];
 		var downToRead = auditData.entries[i].values['/my-app/name'];
		nId = auditData.entries[i].id;
 		if (actionDown == "READ") {
 			actionDown = "DOWNLOAD";
 		}
 		if (downToRead == "imgpreview" || downToRead == "webpreview") {
 			actionDown = "READ";
 			i+=2;
 		}

 		var myPath = getPath(auditData.entries[i].values['/my-app/path']+"");
		var myFile = getFile(auditData.entries[i].values['/my-app/path']+"");
	 	if (auditData.entries[i].values['/my-app/action']+"" != "undefined") {
			newData += "{ 'id' : '"+nId+"' ,'user' : '"+auditData.entries[i].user+"', 'time' : '"+times+"', 'values' : { 'action' : '"+actionDown+"','file' : '"+myFile+"','path' :'"+ myPath+"'} },";
		}
		lastId = auditData.entries[i].id;
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
