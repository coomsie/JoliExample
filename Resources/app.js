Titanium.include('joli.js');

joli.connection = new joli.Connection('joli_example');

var models = (function() {
m = Object();
m.human = new joli.model({
table: 'human',
columns: {
id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
city_id: 'INTEGER',
first_name: 'TEXT',
last_name: 'TEXT'
}
,
methods: {
move: function(newCityName) {
// search for the city id
var city = joli.models.get('city').findOneBy('name', newCityName);

    if (!city) {
      throw 'Could not find a city with this name!';
    } else {
      this.city_id = city.id;
    }
  }
}
});

m.city = new joli.model({
table: 'city',
columns: {
id: 'INTEGER',
country_id: 'INTEGER',
name: 'TEXT',
description: 'TEXT'
}
});

m.country = new joli.model({
table: 'country',
columns: {
id: 'INTEGER',
name: 'TEXT'
}
});

m.searches = new joli.model({
table: 'searches',
columns: {
id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
name: 'TEXT',
}
});

return m;
})();

joli.models.initialize();

///Inserting data can be done using the newRecord() method of a model:

// // create the record (not persisted)
var john = models.human.newRecord({
first_name: 'John',
last_name: 'Doe'
});

// move him to New York
john.move('New York');

// persist it
john.save();

//other way

var john = new joli.record(models.human);
john.fromArray({
first_name: 'John',
last_name: 'Doe'
});

// move him to New York
john.move('New York');

// persist it
john.save();

var q = new joli.query()
.select('human.*')
.from('human')
.order(['last_name desc', 'first_name asc']);

// if (win.city_id) {
// q.where('city_id = ?', win.city_id);
// }
// 
// if (win.last_name) {
// q.where('last_name LIKE ?', '%' + win.last_name + '%');
// }
// 
// if (win.city_name) {
// q.where('city.name = ?', win.city_name);
// q.join('city', 'city.id', 'human.city_id');
// }

var humans = q.execute();

Ti.API.info(humans);

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win1.add(label1);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
