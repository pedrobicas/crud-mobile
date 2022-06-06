import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const AddProduto = ({ navigation }) => {
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const Submit = () => {
    console.log(produto, preco, quantidade);

    if (!produto) {
      alert('Por favor preencha o nome de produto !');
      return;
    }
    if (!preco) {
      alert('Por favor preencha o preco!');
      return;
    }
    if (!quantidade) {
      alert('Por favor preencha o quantidade!');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_produto (produto, preco, quantidade) VALUES (?,?,?)',
        [produto, parseFloat(preco).toFixed(2), quantidade],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Produto adicionado com sucesso!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar adicionar o produto!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="nome de produto"
                onChangeText={
                  (produto) => setProduto(produto)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="preco"
                onChangeText={
                  (preco) => setPreco(preco)
                }
                maxLength={20}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="quantidade"
                onChangeText={
                  (quantidade) => setQuantidade(quantidade)
                }
                maxLength={225}
                keyboardType="numeric"
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Salvar" customClick={Submit} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProduto;