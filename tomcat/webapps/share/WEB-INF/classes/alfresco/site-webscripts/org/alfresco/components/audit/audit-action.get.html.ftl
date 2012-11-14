<#assign el=args.htmlid?html>
<script type="text/javascript">//<![CDATA[
	$(document).ready(function(){
		$('#auditTable').tablePagination({});
	});

	$(document).ready(function(){
		$('#filterConfig').hide();
		$('#show').click(function(){
   			 $('#filterConfig').show();
			 $('#show').hide();
  		});	
	});
	$(document).ready(function() {
                $("#datepicker").datepicker();
        });
//]]></script>
<body>
<div class="header-bar">${msg("label.appname")}
<button id="show" class="FButtons">${msg("label.filter")}</button>
</div>
<div id="filterConfig">
<h1 class="Hfilter">${msg("label.filter")}</h1>

     <form action="${url.service}" method="post" enctype="multipart/form-data" accept-charset="utf-8">
     <div class="row">
       	<span class="label"><label>${msg("label.user")}:</label></span>
       	<span class="input"><input name="user" maxliength="255" size="30" /></span>
     </div>
     <div class="row">
	<span class="label"><label>${msg("label.toid")}:</label></span>
	<span class="input"><input name="toid" maxliength="255" size="30" /></span>
     </div>
     <div class="row">
	<span class="label"><label>${msg("label.action")}:</label></span>
	<span class="input"><input name="action" maxliength="255" size="30" /></span>
     </div>
     <div class="row">
         <span class="label"><label>${msg("label.timestemp")}:</label></span>
         <span class="input"><input id="datepicker" name="timestemp" maxliength="255" size="30" /></span>
      </div>
     <div class="row">
         <span class="label"><label>${msg("label.file")}:</label></span>
         <span class="input"><input name="fileFilter" maxliength="255" size="30" /></span>
      </div>
     <div class="row">
         <span class="label"><label>${msg("label.node")}:</label></span>
         <span class="input"><input name="nodeFilter" maxliength="255" size="30" /></span>
      </div>

     <div class="buttons">
	<button name="submit">${msg("button.submit.ok")}</button>
     </div>
</div>
<hr>
<div>
   <table id="auditTable">
   <thead>
   <tr>
	<td>Id</td> 
        <td>User Name</td>
        <td>Timestamp</td>
        <td>Value</td>
        <td>File</td>
   </tr>
   </thead>
   <tbody>
	<#list result.entries as app>
	<tr>
     		<td>${app.id}</td>
		<td>${app.user}</td>
        	<td>${app.time}</td>
		<td>
			Action : ${app.values['action']}<br>
			Path   : ${app.values['path']}
		</td>
		<td>${app.values['file']}</td>
	</tr>
	</#list>
   </tbody>
   </table>
</div>
<br>
</body>
