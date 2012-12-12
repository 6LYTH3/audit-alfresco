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
<div class="linkB">
<a href="../../../page/audit-failure"><< Back to Audit Login Failure >></a>
</div>
</body>

