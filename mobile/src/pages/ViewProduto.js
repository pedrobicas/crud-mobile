import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewProduto = () => {
  const [produtoId, setProdutoId] = useState('');
  const [data, setData] = useState({});

  const searchProduto = () => {
    console.log(produtoId);
    setData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_produto where id = ?',
        [produtoId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setData(results.rows.item(0));
          } else {
            alert('Produto não encontrado!');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Produto" />
          <Mytextinput
            placeholder="Entre com o Código do Produto"
            onChangeText={
              (produtoId) => setProdutoId(produtoId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Produto" customClick={searchProduto} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Código : {data.id}</Text>
            <Text>Produto : {data.produto}</Text>
            <Text>Preço : {data.preco ? parseFloat(data.preco).toFixed(2) : ''}</Text>
            <Text>Quantidade : {data.quantidade}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewProduto;