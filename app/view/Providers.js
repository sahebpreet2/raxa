Ext.define('raxa.view.Providers' ,{
  extend: 'Ext.dataview.List',
  id: 'providersListView',
  alias : 'widget.providerslist',
  xtype: 'providers',
  requires: [ 'raxa.store.Providers', 'Ext.data.Store' ],
  config: {
    deferEmptyText: true,
    emptyText: 'No Data is available',
    itemTpl: '<div>{display} ({age} Km)</div><div>★★★☆☆</div>',
    store: {xclass : 'raxa.store.Providers'},
    onItemDisclosure: function( item, record, target, index, e, eOpts ){
      url=item.data.person.identifiers[0].links[0].uri;
      console.log(url);
      Ext.Ajax.request({
	url: url+'?v=full',
	success: function(result) {
	  console.log(result.responseText);
	  var data  = Ext.JSON.decode(result.responseText).location;
	  console.log(data);
	  console.log(data.latitude+data.longitude);
	  mainView = Ext.getCmp ('mainView');
	  mainView.add([{
	    xtype: 'map',
	    mapOptions: {
	      center: new google.maps.LatLng ( data.latitude, data.longitude ),
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
	      zoom: 17
	    }
	  }]);
	},
	failure: function(result) {
	  Ext.Msg.alert('Error', 'There was an error retrieving the location.');
	  console.log(result);
	}
      });
    }
  }
});