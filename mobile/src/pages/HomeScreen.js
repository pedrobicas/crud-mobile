import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from './components/MyImageButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_produto'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_produto', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_produto(id INTEGER PRIMARY KEY AUTOINCREMENT, produto VARCHAR(50), preco DECIMAL(8,2), quantidade int(4))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MyImageButton
              title="Adicionar Produto"
              btnColor='#2196f3'
              btnIcon="plus-circle"
              customClick={() => navigation.navigate('Add')}
            />
            <MyImageButton
              title="Atualizar Produto"
              btnColor='#2196f3'
              btnIcon="pen"
              customClick={() => navigation.navigate('Update')}
            />
            <MyImageButton
              title="Visualizar Produto"
              btnColor='#2196f3'
              btnIcon="eye"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="Visualizar Todos"
              btnColor='#2196f3'
              btnIcon="grip-horizontal"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Excluir Produto"
              btnColor='#2196f3'
              btnIcon="trash-alt"
              customClick={() => navigation.navigate('Delete')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;