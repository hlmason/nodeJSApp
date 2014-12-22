var http = require('http');

function printMessage(username, badgeCount, points) 
{
	var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in JavaScript';
	console.log(message);
}

function printError(error) 
{
	console.error(error.message);
}

function getProfile(username) {
	// Connect to API URL (http://teamtreehouse.com/username.json)
	var request = http.get('http://teamtreehouse.com/' + username + '.json', function(response) 
	{
		// console.dir(response.statusCode);
		var body = '';

		// Read data
		response.on('data', function (chunk) 
		{
			// console.log('BODY' + chunk);
			body += chunk;
		});
		response.on('end', function()
		{
			if(response.statusCode === 200) 
			{
				// console.log(body);
				// console.log(typeof body);
				try 
				{
					// Parse data
					var profile = JSON.parse(body);
					// console.dir(profile);

					// Print data
					printMessage(username, profile.badges.length, profile.points.JavaScript);
				} 
					catch(error) 
				{
					// Parse Error
					printError(error);
				}
			} 
			else 
			{
				// Status Code Error
				printError({message: 'There was an error getting the profile for ' + username + '. (' + http.STATUS_CODES[response.statusCode] + ')'});
			}
		});
	});

	// request.on('error', function(error) {
	// 	console.error(error.message);
	// });

	// Connection Error
	request.on('error', printError);
}

module.exports.get = getProfile;