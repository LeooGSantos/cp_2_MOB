import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, update, increment } from "firebase/database";

function LoginScreen({ navigation }) {
    const [formInputs, setFormInputs] = useState({ email: '', password: '' })

    const changeEmail = (value) => {
        setFormInputs({ ...formInputs, email: value })
    }

    const changePassword = (value) => {
        setFormInputs({ ...formInputs, password: value })
    }

    const addLoginCount = (userId) => {
        const db = getDatabase();
        const loginCountRef = ref(db, 'users/' + userId + '/loginCount');
        onValue(loginCountRef, (snapshot) => {
            const count = snapshot.val();
            set(loginCountRef, count + 1);
        }, {
            onlyOnce: true
        });
    }

    const addLoginCount2 = (userId) => {
        const dbRef = ref(getDatabase());

        const updates = {};
        updates[`users/${userId}/loginCount`] = increment(1);
        update(dbRef, updates);
    }

    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, formInputs.email, formInputs.password)
            .then((userCredential) => {
                const user = userCredential.user;
                addLoginCount2(user.uid);

                navigation.navigate('Adicionar item');
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
                <Button title='Login' onPress={login} />
                <Button title='Sing Up' onPress={() => navigation.navigate('SignUp')} />
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
