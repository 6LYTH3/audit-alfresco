var conn_maker = null;
var uri = "/api/audit/query/AuditLogin2?verbose=true&forward=false";
var connector = remote.connect("alfresco");

function init() { 
    conn_maker = YAHOO.util.Dom.get('ok'); 
    YAHOO.util.Event.addListener(conn_maker, 'click', makeAlert); 
} 

function makeAlert() {
    YAHOO.util.Dom.get('foo').innerHTML = YAHOO.util.Dom.get('user').value; 
}
YAHOO.util.Event.addListener(window, 'load', init);
