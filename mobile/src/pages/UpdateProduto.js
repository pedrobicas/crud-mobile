import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateProduto = ({ navigation }) => {
  const [produtoId, setProdutoId] = useState('');
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const updateAllStates = (produto, preco, quantidade) => {
    setProduto(produto);
    setPreco(parseFloat(preco).toFixed(2));
    setQuantidade(quantidade);
  };

  const searchProduto = () => {
    console.log(produtoId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_produto where id = ?',
        [produtoId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            const res = results.rows.item(0);
            updateAllStates(
              res.produto,
              res.preco,
              res.quantidade
            );
          } else {
            alert('Produto não encontrado!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };

  const upProduto = () => {
    console.log(produtoId, produto, preco, quantidade);

    if (!produtoId) {
      alert('Por Favor informe o Código!');
      return;
    }
    if (!produto) {
      alert('Por favor informe o Nome de produto !');
      return;
    }
    if (!preco) {
      alert('Por Favor informe o preço !');
      return;
    }
    if (!quantidade) {
      alert('Por Favor informe o quantidade !');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_produto set produto=?, preco=? , quantidade=? where id=?',
        [produto, preco, quantidade, produtoId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Produto atualizado com sucesso!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else { alert('Erro ao atualizar o produto') };
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
              <Mytext text="Filtro de Produto" />
              <Mytextinput
                placeholder="Entre com o Código do Produto"
                style={{ padding: 10 }}
                onChangeText={
                  (produtoId) => setProdutoId(produtoId)
                }
              />
              <Mybutton
                title="Buscar Produto"
                customClick={searchProduto}
              />
              <Mytextinput
                placeholder="Nome de produto"
                value={produto}
                style={{ padding: 10 }}
                onChangeText={
                  (produto) => setProduto(produto)
                }
              />
              <Mytextinput
                placeholder="Preco"
                value={'' + preco}
                onChangeText={
                  (preco) => setPreco(preco)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                placeholder="Quantidade"
                value={'' + quantidade}
                onChangeText={
                  (quantidade) => setQuantidade(quantidade)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mybutton
                title="Atualizar Produto"
                customClick={upProduto}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProduto;