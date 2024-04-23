import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import UserAPI from '../services/UserAPI';
import { useNavigation } from '@react-navigation/native';

const Loginscreen = ({ accessToken, setUserId, setUserName }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const userData = await UserAPI.loginUser(email, password);
            const { id, name } = userData;

            setUserId(id);
            setUserName(name);

            navigation.navigate('Elderhealth Companion', {
                accessToken: accessToken,
                userId: id,
                userFirstName: name
            });
        } catch (error) {
            console.error('Nepavyko prisijungti: ', error);
            Alert.alert('Klaida prisijungiant ', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Prisijunkite su savo ElderHealth paskyra</Text>
            <TextInput
                style={styles.input}
                placeholder="El. paštas"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Slaptažodis"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button
                title="Prisijungti"
                onPress={handleLogin}
                color="midnightblue"
                style={styles.button}
            />
            <Text style={styles.createAccountText}>
                Neturite paskyros? Susikurkite ją Elderhealth svetainėje
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        width: '80%',
        height: 90,
        marginBottom: 50,
        backgroundColor: 'midnightblue',
    },
    createAccountText: {
        marginTop: 20,
        fontSize: 16,
        color: 'grey',
    },
});

export default Loginscreen;
