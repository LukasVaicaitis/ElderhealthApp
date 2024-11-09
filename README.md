# Elderhealth-Fitbit Data fetcher application

This simple app is responsible only for accessing the Fitbit API and fetching the heartrate data from a Fitbit watch and then sending it to the Elderhealth server.

## How it works:
1.	Log in with Fitbit: Use your Fitbit account to allow access to your health data.
2.	Log in with ElderHealth: Enter your ElderHealth credentials (register on the ElderHealth website if needed).
3.	Data Fetching: The app retrieves heart rate data from your Fitbit account with a delay of ~5 minutes and sends it to ElderHealth.

### Screenshots:

Splash screen:

![ss1](https://github.com/user-attachments/assets/fc6ae77c-447f-4ba3-b4ac-f713e04acceb)


Main screen (before login):

![ss2](https://github.com/user-attachments/assets/dc908b7e-f302-4405-b257-ba0985d6eae9)

## Planned features:
1. Ability to fetch step, distance and sleep data(Fitbit authorization is required to access sleep data).
2. Ability for the app to run in the background.

Note: Due to an unexpected loss of the latest code, the current version may not compile. Efforts were made to restore progress; however, the application could not be fully tested with the ElderHealth server.
