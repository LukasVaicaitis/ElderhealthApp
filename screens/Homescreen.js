import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Homescreen = ({ userName, handleLogout, handleRefresh }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        {`Sveiki, ${userName}!`}
      </Text>
      <Text style={styles.infoText}>
        Jūs sėkmingai prisijungėte su Fitbit ir ElderHealth.
      </Text>
      <Text style={styles.infoText}>
        Norėdami peržiūrėti savo sveikatos duomenis prisijunkite prie ElderHealth svetainės.
      </Text>
      <Button title="Atsijungti" onPress={handleLogout} />
      <Button title="Atnaujinti duomenis" onPress={handleRefresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Homescreen;