'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Notes = new Module('notes');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Notes.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Notes.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Notes.menus.add({
    title: 'Notes',
    link: 'notes',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Notes.aggregateAsset('css', 'notes.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Notes.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Notes.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Notes.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Notes;
});
