var conn_maker = null; function init() { conn_maker = YAHOO.util.Dom.get('ok'); YAHOO.util.Event.addListener(conn_maker, 'click', makeAlert); } function makeAlert() { YAHOO.util.Dom.get('foo').innerHTML = YAHOO.util.Dom.get('user').value; } YAHOO.util.Event.addListener(window, 'load', init);
