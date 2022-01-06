import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Card,
  Title,
  FAB,
  IconButton,
  Colors,
  ProgressBar,
  Paragraph,
} from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';
import { ITodo } from '../typings';
import { REQUEST } from '../services/api';
import { StoreContext } from '../contexts/StoreContext';
import CreateModal from '../components/Modal';

const Home = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showLoading, setLoading] = useState<boolean>(false);
  const [isInitialLoad, setInitialLoad] = useState<boolean>(false);

  const { todos, setTodos } = useContext(StoreContext);

  const getTodos = useCallback(async () => {
    setLoading(true);
    const { success, data } = await REQUEST('GET', '/todo', null);

    if (success) {
      setTodos(data);
    }

    setLoading(false);
  }, [setLoading, setTodos]);

  useEffect(() => {
    if (!isInitialLoad) {
      console.log('running get');
      getTodos();
      setInitialLoad(true);
    }
  }, [isInitialLoad, setTodos, getTodos]);

  const openModal = () => setShowCreate(true);

  // create todo
  const CreateTodo = async (content: any) => {
    setLoading(true);
    const { success, data } = await REQUEST('PUT', '/todo', { name: content });
    setLoading(false);

    if (success) {
      setInitialLoad(false);
    }

    console.log('create: ', data);
  };

  // mark todo as done
  const markAsDone = async (todo: ITodo) => {
    setLoading(true);
    const { success } = await REQUEST('POST', `/todo-completed/${todo.id}`, null);
    setLoading(false);

    if (success) {
      setInitialLoad(false);
    }
  };

  const DeleteTodo = async (todo: ITodo) => {
    setLoading(true);
    const { success } = await REQUEST('DELETE', `/todo/${todo.id}`, null);
    setLoading(false);
    if (success) {
      setInitialLoad(false);
    }
  };

  return (
    <>
      <ProgressBar color={Colors.blue500} visible={showLoading} indeterminate />
      <ScrollView style={style.main}>
        {todos && todos.length ? (
          todos?.map((todo: ITodo) => (
            <Card key={todo.id} style={style.cardSpacing}>
              <Card.Content>
                <Title>{todo.name}</Title>
              </Card.Content>
              <Card.Actions style={style.todoCardAction}>
                <IconButton
                  icon="delete"
                  size={24}
                  color={Colors.red500}
                  disabled={showLoading}
                  onPress={() => DeleteTodo(todo)}
                />

                {
                  !todo.completedAt
                    ?
                      <IconButton
                        icon="checkbox-blank-outline"
                        size={24}
                        color={Colors.green400}
                        disabled={showLoading}
                        onPress={() => markAsDone(todo)}
                      />
                    :
                    <IconButton icon="checkbox-marked" size={24} color={Colors.green400} />
                }
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Paragraph>No entries yet...</Paragraph>
        )}
      </ScrollView>
      <CreateModal
        showModal={showCreate}
        onDismiss={modalState => setShowCreate(modalState)}
        onSubmit={text => CreateTodo(text)}
      />
      <FAB
        icon="plus"
        disabled={showLoading}
        onPress={() => openModal()}
        style={style.addTodo}
        color={Colors.white}
      />
    </>
  );
};

const style = StyleSheet.create({
  main: {
    padding: 15,
  },
  cardSpacing: {
    marginVertical: 10,
  },
  addTodo: {
    backgroundColor: Colors.blue400,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  todoCardAction: {
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
});

export default Home;
