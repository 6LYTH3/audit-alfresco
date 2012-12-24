#!/bin/bash
#for linux server
#default environment alfresco
# * is the your alfresco version

#find alfresco
FINDALF=`ls /opt/ | grep alfresco`

#create audit folder
mkdir -p /opt/$FINDALF/tomcat/webapps/share/components/audit
mkdir -p /opt/$FINDALF/tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/audit
#mkdir /opt/alfresco*/tomcat/shared/classes/alfresco/extension/audit

#Configuration Audit enable
echo "audit.enabled=true" >> /opt/$FINDALF/tomcat/shared/classes/alfresco-global.properties

#copy all application and config
PATHAPP="/opt/$FINDALF/tomcat/shared/classes/alfresco/extension/"
cp -rf tomcat/shared/classes/alfresco/extension/* ${PATHAPP}
echo "Application and config  [success]"

#copy all file into webapps/share/components
PATHCM="/opt/$FINDALF/tomcat/webapps/share/components/audit/"
cp -rf tomcat/webapps/share/components/audit/* ${PATHCM}
echo "Components and javascrip  [success]"

#capy all image into images of alfresco
PATHIMG="/opt/$FINDALF/tomcat/webapps/share/components/images/"
cp tomcat/webapps/share/components/audit/images/* ${PATHIMG}
echo "Images [success]"

#copy all page
PATHPAGE="/opt/$FINDALF/tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/pages/"
cp tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/pages/* ${PATHPAGE}
echo "Page [success]"

#copy title
PATHTI="/opt/$FINDALF/tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/title/"
cp tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/title/* ${PATHTI}

#copy all template-instances
PATHTMEPLATE="/opt/$FINDALF/tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/template-instances/"
cp tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/template-instances/* ${PATHTMEPLATE}
echo "Template-instances [success]"

#copy all web-scripts
PATHWEB="/opt/$FINDALF/tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/audit/"
cp tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/components/audit/* ${PATHWEB}
echo "Site-webscripts [success]"

#copy all freemarker template
PATHTMP="/opt/$FINDALF/tomcat/webapps/share/WEB-INF/classes/alfresco/templates/org/alfresco/"
cp tomcat/webapps/share/WEB-INF/classes/alfresco/templates/org/alfresco/* ${PATHTMP}
echo "Freemarker template [success]"

