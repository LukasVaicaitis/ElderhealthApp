**Elderhealth-Fitbit Data fetcher application**

This simple app is responsible only for accessing the Fitbit API and fetching the heartrate data from a Fitbit watch and then sending it to the Elderhealth server.

The app works in a linear way:
1. You log in with your Fitbit account.
2. You log in with your Elderhealth account(Registration happens in the Elderhealth website).
3. The app fetches the heartrate data associated with the fitbit account with a delay of ~5 minutes.

Splash screen:

![ss1](https://github.com/user-attachments/assets/fc6ae77c-447f-4ba3-b4ac-f713e04acceb)


Main screen (before login):

![ss2](https://github.com/user-attachments/assets/dc908b7e-f302-4405-b257-ba0985d6eae9)

Planned features:
1. Ability to fetch step, distance and sleep data(Fitbit authorization is required to access sleep data).
2. Ability for the app to run in the background.

by Lukas Vaic
