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
//]]></script>
<body>
<div class="header-bar">${msg("label.appname")}
	<button id="show" class="FButtons">${msg("label.filter")}</button>
</div>
<div id="filterConfig">
<h1 class="Hfilter">${msg("label.filter")}</h1>

     <form action="${url.service}" method="post" enctype="multipart/form-data" accept-charset="utf-8">
     <div class="row">
	<span class="label"><label>${msg("label.toid")}:</label></span>
	<span class="input"><input name="toid" maxliength="255" size="30" /></span>
     </div>
     <div class="row">
	<span class="label"><label>${msg("label.value")}:</label></span>
	<span class="input"><input name="valueAudit" maxliength="255" size="30" /></span>
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
        <td>Timestamp</td>
        <td>Value</td>
   </tr>
   </thead>
   <tbody>
	<#list auditData as app>
	<tr>
     		<td>${app.id}</td>
     		<td>${app.time?substring(0, 19)}</td>
    		<td>${app.values['/auditlogin1/login/error/user']}</td>
	</tr>
	</#list>
   </tbody>
   </table>
</div>
