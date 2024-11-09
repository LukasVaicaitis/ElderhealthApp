import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, StatusBar, Alert, Modal, Text, TouchableHighlight } from 'react-native';
import * as Linking from 'expo-linking';
import qs from 'qs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import { getData } from './services/HeartrateAPI';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

const BASE_URL = 'http://52.158.32.0:5000/api/heartrate';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "Home",
        Login: "Prisijungti su ElderHealth paskyra",
        HomeScr: "Elderhealth Companion"
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken && userId) {
          const data = await getData(accessToken, userId);
          //setHeartRateData(data);
        }
      } catch (error) {
        console.error('Error fetching heart rate data:', error);
      }
    }

    fetchData();

    return () => {
    };
  }, [accessToken, userId]);

  useEffect(() => {
    async function handleDeepLink(event) {
      const [, query_string] = event.url.match(/\#(.*)/);
      const query = qs.parse(query_string);
      if (query.access_token) {
        setAccessToken(query.access_token);
      }
    }

    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        handleDeepLink({ url: initialURL });
      }
    }

    Linking.addEventListener('url', handleDeepLink);
    getInitialURL();

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const handleButtonPress = () => {
    const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
      client_id: config.client_id,
      response_type: 'token',
      scope: 'heartrate activity activity profile',
      expires_in: '31536000',
    })}`;
    Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUserId(null);
    setUserName(null);
  };

  const handleHelpPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleRefresh = async () => {
    fetchData();
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {!accessToken && !userId && !userName ? (
          <Stack.Screen name="Home" options={{ title: 'ElderHealth Companion' }}>
            {() => (
              <View style={styles.container}>
                <Text style={styles.welcomeText}>Sveiki atvykę!</Text>
                <Text style={styles.instructionsText}>Norėdami pradėti, prisijunkite su savo Fitbit paskyra.</Text>
                <Button title="Prisijungti su savo Fitbit paskyra" onPress={handleButtonPress} color="midnightblue" />
                <Text style={styles.helpText}>Ši aplikacija yra papildymas ElderHealth svetainei, kurioje galite peržiūrėti savo duomenis</Text>
                <StatusBar style="auto" />
                <View style={styles.buttonContainer}>
                  <Button title="Pagalba" onPress={handleHelpPress} />
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={handleCloseModal}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalText}>Norėdami prisijungti, naudokitės Fitbit prisijungimu ir tada įveskite savo ElderHealth prisijungimo duomenis.</Text>
                      <TouchableHighlight
                        style={styles.modalCloseButton}
                        onPress={handleCloseModal}
                      >
                        <Text style={styles.modalCloseButtonText}>Uždaryti</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Prisijungti">
            {() => <Loginscreen accessToken={accessToken} setUserId={setUserId} setUserName={setUserName} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="Elderhealth Companion">
          {() => (
            <Homescreen userName={userName} handleLogout={handleLogout} handleRefresh={handleRefresh} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'midnightblue',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
});