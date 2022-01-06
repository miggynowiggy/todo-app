import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  Modal,
  Portal,
  Card,
  TextInput,
  Colors,
  Button,
} from 'react-native-paper';

interface IModalProps {
  showModal: boolean;
  onSubmit: (param: any) => any;
  onDismiss: (param: any) => any;
}

const CreateModal = ({ showModal, onSubmit, onDismiss }: IModalProps) => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    setNewTodo('');
    setShowCreate(showModal);
  }, [showModal]);

  const closeModal = () => {
    setShowCreate(false);
    onDismiss(false);
    setNewTodo('');
  };

  const submit = () => {
    onSubmit(newTodo);
    closeModal();
  };

  return (
    <Portal>
      <Modal
        visible={showCreate}
        onDismiss={closeModal}
        contentContainerStyle={style.modal}>
        <Card>
          <Card.Title title="New Todo" />
          <Card.Content>
            <TextInput
              multiline
              placeholder="What to do?"
              value={newTodo}
              onChangeText={setNewTodo}
              activeUnderlineColor={Colors.blue500}
              activeOutlineColor={Colors.blue500}
            />
          </Card.Content>
          <Card.Actions style={style.modalAction}>
            <Button
              mode="text"
              color={Colors.grey700}
              style={style.modalActionButton}
              onPress={closeModal}>
              Cancel
            </Button>
            <Button
              mode="contained"
              color={Colors.blue500}
              onPress={submit}
              disabled={!newTodo.length}>
              Save
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

const style = StyleSheet.create({
  modal: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalAction: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  modalActionButton: {
    marginRight: 10,
  },
});

export default CreateModal;
