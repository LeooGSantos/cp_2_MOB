import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function LoginScreen({navigation}) {
    const [formInputs, setFormInputs] = useState({email: '', password: ''})

    const changeEmail = (value) => {
        setFormInputs({...formInputs, email: value})
    }

    const changePassword = (value) => {
        setFormInputs({...formInputs, password: value})
    }

    const signUp = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, formInputs.email, formInputs.password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
        });
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>Login</Text>
        <View>
            <TextInput
                style={styles.input}
                placeholder='email'
                value={formInputs.email}
                onChangeText={changeEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='password'
                value={formInputs.password}
                onChangeText={changePassword}
            />
        </View>
        <View>
            <Button title='Sign Up' onPress={signUp}/>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

export default LoginScreen;