import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import HomeScreen from './src/pages/HomeScreen';
import AddProduto from './src/pages/AddProduto';
import UpdateProduto from './src/pages/UpdateProduto';
import ViewProduto from './src/pages/ViewProduto';
import AllProdutos from './src/pages/AllProdutos';
import DeleteProduto from './src/pages/DeleteProduto';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Registro de Produtos',
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Add"
          component={AddProduto}
          options={{
            title: 'Adicionar produto',
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateProduto}
          options={{
            title: 'Atualizar Produto',
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewProduto}
          options={{
            title: 'Visualizar Produto',
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={AllProdutos}
          options={{
            title: 'Visualizar Todos',
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteProduto}
          options={{
            title: 'Excluir Produto',
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;