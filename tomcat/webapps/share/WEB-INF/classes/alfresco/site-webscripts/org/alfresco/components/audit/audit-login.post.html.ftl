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
        <td>Full Name</td>
   </tr>
   </thead>
   <tbody>

	<#list auditData as app>
	<tr>
     		<td>${app.id}</td>
     		<td>${app.user}</td>
     		<td>${app.time?substring(0, 19)}</td>
    		<td>${app.values['/auditlogin2/login/user']}</td>
	</tr>
	</#list>
   </tbody>
   </table>
</div>
<div class="linkB">
<a href="../../../page/audit-login"><< Back to Audit Login >></a>
</div>
</body>
