#!/bin/bash
#for linux server
#default environment alfresco

#create audit folder
mkdir /opt/alfresco/tomcat/webapps/share/components/audit
mkdir /opt/alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfrescon/components/audit/

#copy all file into webapps/share/component
PATHCM='/opt/alfresco/tomcat/webapps/share/components/audit/'
cp tomcat/webapps/share/components/audit/* ${PATHCM}
echo "Components and javascrip  [success]"

#copy all page
PATHPAGE='/opt/alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/pages/'
cp tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/pages/* ${PATHPAGE}
echo "Page [success]"

#copy all template-instances
PATHTMEPLATE='/opt/alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/template-instances/'
cp tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/template-instances/* ${PATHTMEPLATE}
echo "Template-instances [success]"

#copy all web-scripts
PATHWEB='/opt/alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfrescon/components/audit/'
cp tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfrescon/components/audit/* ${PATHWEB}
echo "Site-webscritps [success]"

#copy all freemarker template
PATHTMP='/opt/alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/templates/org/alfresco/'
cp tomcat/webapps/share/WEB-INF/classes/alfresco/templates/org/alfresco/* ${PATHTMP}
echo "Freemarker template [success]"

