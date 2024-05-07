import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebaseConfig } from './firebaseConfig'
import { initializeApp } from "firebase/app";
import HomeScreen from './screens/Home';
import AddItemScreen from './screens/AdicionarItem';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Stack = createNativeStackNavigator();

initializeApp(firebaseConfig);

function App() {
  const [isAuth, setIsAuth] = React.useState(undefined)

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    });
  }, [])

  return (
    <NavigationContainer>
      {
        isAuth ? 
        <Stack.Navigator initialRouteName='Home' >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Adicionar item" component={AddItemScreen} />
        </Stack.Navigator> :
        <Stack.Navigator initialRouteName='Login' >
          <Stack.Screen name="Log in" component={LoginScreen} />
          <Stack.Screen name="Sign up" component={SignUpScreen} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

export default App;