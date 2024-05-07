import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, remove } from "firebase/database";

function HomeScreen({ navigation }) {
    const [shoppingList, setShoppingList] = useState([]);
    const [userUid, setUserUid] = useState('');

    useEffect(() => {
        const auth = getAuth();
        setUserUid(auth.currentUser.uid);

        const db = getDatabase();
        const shoppingListRef = ref(db, `shoppingLists/${auth.currentUser.uid}/items`);
        
        const unsubscribe = onValue(shoppingListRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const shoppingItems = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setShoppingList(shoppingItems);
            } else {
                setShoppingList([]);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }

    const handleDeleteItem = (itemId) => {
        const db = getDatabase();
        const itemRef = ref(db, `shoppingLists/${userUid}/items/${itemId}`);
        remove(itemRef)
            .then(() => {
                setShoppingList(prevList => prevList.filter(item => item.id !== itemId));
            })
            .catch((error) => {
                console.error("Erro ao excluir item:", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Compras</Text>
            <FlatList
                data={shoppingList}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => handleDeleteItem(item.id)}>
                        <Text style={styles.item}>{item.quantity} | {item.productName}</Text>
                        <Button title="Excluir" onPress={() => handleDeleteItem(item.id)} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum item na lista</Text>}
            />
            <View style={styles.buttonContainer}>
                <Button title="Adicionar item" onPress={() => navigation.navigate('Adicionar item')} />
                <Button title="Logout" onPress={logOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    item: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        width: '80%',
        backgroundColor: 'black', 
    },
});

export default HomeScreen;
