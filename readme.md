# teams-presence-mqtt
This app connects to the Microsoft Graph API using an Azure AD app registration. After signing in to grant the application a user-delegated access token, the app queries the Graph API every 1 second to read the presence data of the first logged in user, and push it to  two MQTT topics: 
``home/teamspresence/<aad_uid>/availability``
``home/teamspresence/<aad_uid>/activity``


### Prerequisites: 

A DNS entry of 'teamsmqtt.home' pointing at the machine you are running this app on. This could be a hosts file entry on the machine you are signing in from, or a network-wide DNS record. This is due to the authorisation flow of AAD. (I may rewrite this at some point to use the more suitable device code auth flow)

An AAD app registration with the `Presence.Read` permission granted, and a return URL of `https://teamsmqtt.home:3443/auth/callback`. 

### Usage (on Ubuntu):

Clone the repo. 
Install docker-compose
`apt-get install docker-compose`
Copy `.env.example` to `.env` and fill in the required fields. 
Build the images
`docker-compose build`
Run the app: 
`docker-compose up`
Check the logs for any errors. Browse to ``https://teamsmqtt.home:3443/`` and log in. You should then see some mqtt messages start to arrive! 
If all is well, you can start the service in the background with 
``docker-compose up -d``

### Further notes

You will need to sign in again each time the app is started. You will also need to sign in again after 90 days, as this is the maximum length of a Microsoft Graph API sign in. 

#### Further notes
This is almost certainly a buggy mess, written in sleep-deprived haste. This is also my first time deploying an app I've made myself using Docker and using Docker Compose. But hopefully someone will find this useful :) 
