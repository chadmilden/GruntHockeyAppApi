/*
 * grunt-hockeyAppApi
 * https://github.com/chadmilden/GruntHockeyAppApi
 *
 * Copyright (c) 2017 Chad Mildenberger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  //updateVersion
  //test
  
  grunt.registerMultiTask('hockeyAppApi', 'Api calls for Hockey App', function() {
    // Merge task-specific and/or target-specific options with these defaults.
		
		var done = this.async();
		
		var _updateVersion = grunt.config.get('hockeyAppApi.updateVersion')
			const http = require('http');	
			const fs = require('fs');
			const request = require('request');
		if (_updateVersion != undefined)
		{
			updateVersion(_updateVersion,done);
		}
			
			function updateVersion(_updateVersion, asyncHandle)
			{
			
			var numberOfUploads = _updateVersion.length;
			var finishedUploads = 0;
			
			for(var i = 0; i<_updateVersion.length; i++)
			{
				var data = _updateVersion[i];
				  				
				var path = 'https://rink.hockeyapp.net/api/2/apps/'+data.appId+'/app_versions/'+data.versionID;				 
				console.log('Uploading : '+ data.filePath + ' To: ' + path );

				var data = _updateVersion[i];
				
				function(numberOfUploads, finishedUploads)
				{
				   var _data = data;
				   var _asyncHandle = asyncHandle;
				   
				request.put({								
							  headers:{
								  'X-HockeyAppToken':_data.apiKey,
								   'accept': '*/*'},
							  url: path,
							  formData: {    
								ipa: fs.createReadStream(_data.filePath)
							  }
						}, function(err,httpResponse,body)
							{	
							
							   if (!err)
							   {
								   grunt.log.ok(_data.filePath + ' uploaded successfully');
							   }
							   else
							   {
								   grunt.log.error(_data.filepath + ' error uploading: ' + err);
							   }
								finishedUploads++;
								if (numberOfUploads == finishedUploads)
								{
									_asyncHandle();
									grunt.log.ok('Finished uploading all files');
								}
							});
				}(numberOfUploads, finishedUploads);
		
			}
			}
    });
  };