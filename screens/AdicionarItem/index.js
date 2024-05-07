import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";

function AddItemScreen({ navigation }) {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');

    const addItemToList = () => {
        if (productName.trim() !== '' && quantity.trim() !== '') {
            const auth = getAuth();
            const db = getDatabase();
            const userUid = auth.currentUser.uid;
            const shoppingListRef = ref(db, `shoppingLists/${userUid}/items`);

            const newItem = {
                productName: productName,
                quantity: quantity
            };

            push(shoppingListRef, newItem)
                .then(() => {
                    setProductName('');
                    setQuantity('');
                    navigation.goBack(); 
                })
                .catch(error => console.error("Erro ao adicionar o item: ", error));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar item</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Produto"
                value={productName}
                onChangeText={text => setProductName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                value={quantity}
                onChangeText={text => setQuantity(number)}
                keyboardType="numeric"
            />
            <Button title="Adicionar" onPress={addItemToList} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default AddItemScreen;