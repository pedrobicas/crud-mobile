import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ScrollView } from 'react-native';

export default function Login({ navigation }) {

    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    function logar() {
        if (email === "rafael@gmail.com" && senha === "123") {
            navigation.navigate("HomeScreen")
        } else {
            alert('Email ou senha incorreto. Tente novamente.')
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar hidden />
                <Image source={require('../../assets/login.png')}
                    style={styles.tinyLogo} />
                <Text style={styles.title}> Bem vindo de volta! </Text>
                <View style={styles.box}>
                    <Text style={styles.teste}> Login </Text>
                    <Text style={styles.text}>E-mail: </Text>
                    <TextInput
                        placeholder='E-mail'
                        style={styles.input}
                        onChangeText={email => setEmail(email)}
                    />
                    <Text style={styles.text}>Senha: </Text>
                    <TextInput
                        placeholder='Senha'
                        style={styles.input}
                        onChangeText={senha => setSenha(senha)}
                        secureTextEntry={true}
                    />
                    <Text></Text>
                    <Button
                        title='Logar'
                        onPress={logar}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tinyLogo: {
        width: 330,
        height: 350,
        backgroundColor: '#ffff',
        marginRight: 20

    },

    input: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#C4C4C4',
        padding: 10,
        marginBottom: 10,
        borderColor: '#c4c4c4'
    },

    box: {
        backgroundColor: '#455A64',
        padding: 35,
        borderRadius: 50,
        marginTop: 20
    },

    text: {
        marginTop: 8,
        color: '#ffff',
        fontSize: 20,
        fontStyle: 'italic'
    },

    teste: {
        color: '#ffff',
        fontSize: 35,
        textAlign: 'center',
        fontStyle: 'italic'
    },

    title: {
        color: '#455A64',
        fontSize: 50,
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 15
    },

    cadastro: {
        fontSize: 20,
        color: '#ffff',
        marginTop: 15,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});