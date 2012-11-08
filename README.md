audit-alfresco
==============

customize page alfresco for audit application

Installation
------------
If you don't have a preferred installation method, then simply copy and paste:

	git clone https://github.com/BLYTH3/audit-alfresco.git
	cd audit-alfresco
	sudo ./install.sh

support alfresco-4.0.e version

Configrulation
--------------
If you need use audit appliction in admin menu you must edit `share-config.xml`.
follow me.

	<alfresco-config>
	...
	<container-group id="tools" permission="admin">
	=====>	<item type="link" id="audit-action">/audit-action</item>
		<item type="link" id="application">/console/admin-console/application</item>
		<item type="link" id="groups">/console/admin-console/groups</item>
		<item type="link" id="replication-jobs" condition="!conditionEditionTeam">/console/admin-console/replication-jobs</item>
		<item type="link" id="repository">/console/admin-console/repository</item>
		<item type="link" id="trashcan">/console/admin-console/trashcan</item>
		<item type="link" id="users">/console/admin-console/users</item>
		<item type="link" id="more">/console/admin-console/</item>
	</container-group>
	...
	</alfresco-config>

add messages into `common.properties`

	header.audit-action.label=Audit application
	header.audit-action.description=Audit Application

Enable audit log
----------------
Configuration properties are set in `<tomcat>/shared/classes/alfresco-global.properties`
You just use it, you must delete .sample
add filter
	
	audit.enabled=true
	audit.alfresco-access.enabled=true
	audit.alfresco-access.sub-actions.enabled=true
	audit.cmischangelog.enabled=true

more information [audit filer](http://wiki.alfresco.com/wiki/Audit_Filter)

