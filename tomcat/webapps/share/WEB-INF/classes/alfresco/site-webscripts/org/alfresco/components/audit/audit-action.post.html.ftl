<head>
<link rel="stylesheet" type="text/css" href="../../../res/components/audit/styles.css" />
<script type="text/javascript" src="../../../jquery/jquery-1.6.2.js"></script>
<script type="text/javascript" src="../../../res/components/audit/paginator.js"></script>
<script type="text/javascript">//<![CDATA[
	$(document).ready(function(){
		$('#auditTable').tablePagination({});
	});

//]]></script>
</head>
<body>
<br>
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
<div class="linkB">
<a href="../../../page/audit-action"><< Back to Audit Action >></a>
</div>
</body>
