var entries = [];

function main()
{

   var uri = "/api/audit/query/my-app?verbose=true&forward=false";
   var result = remote.call(uri);
   generateData(result);
   model.result = entries;
}

function recall(toId){
   var uri = "/api/audit/query/my-app?verbose=true&forward=false&toId="+toId;
   var result = remote.call(uri);
   generateData(result);
}

function generateData(result){
   if (result.status == status.STATUS_OK)
   {
     	var auditData = eval("(" + result.response + ")");
	var lastId;
	var nId;
	for(var i = 0; i < auditData.entries.length; i++){
		var times = getTimes(String(auditData.entries[i].time));
 		var actionDown = auditData.entries[i].values['/my-app/action'];
 		var downToRead = auditData.entries[i].values['/my-app/name'];
		nId = auditData.entries[i].id;
 		if (actionDown == "READ") {
 			actionDown = "DOWNLOAD";
 		}
 		if (downToRead == "imgpreview" || downToRead == "webpreview") {
 			actionDown = "READ";
			if(i >= 97) break;
 			i+=2;
 		}
		
 		var myPath = getPath(String(auditData.entries[i].values['/my-app/path']));
		var myFile = getFile(String(auditData.entries[i].values['/my-app/path']));
	 	if (auditData.entries[i].values['/my-app/action']+"" != "undefined") {
			entries.push({
				id: nId,
				user:  auditData.entries[i].user,
				time:  times,
				values: { 
					action: actionDown,
					file:  String(myFile),
					path: String(myPath)
				}
			});
		}
		lastId = auditData.entries[i].id;
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
main();

// CMIS Query Language
// Query All type

//function main(){
//   var uri = "/cmis/query?q=SELECT%20F.*%20FROM%20cmis:folder%20F&format=json";
//   var result = remote.call(uri);
//   var json = jsonUtils.toJSONString(result);
//   var Obj = eval('(' +json+ ')');
////   model.result = Obj.info.author;
//   model.result = Obj; 
//}
//main();
