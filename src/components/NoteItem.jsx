import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const NoteItem = ({ note, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{note}</Text>
      <TouchableOpacity style={styles.deletebtn} onPress={onDelete}>
        <Text style={styles.deletetext}>Sil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  deletebtn: {
    backgroundColor: '#F08080',
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
    width: 40,
    marginTop: 5,
    marginBottom: 18,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  deletetext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
