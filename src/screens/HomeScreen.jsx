import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS } from '../constants/strings';
import NoteItem from '../components/NoteItem';

const STORAGE_KEY = 'notes_storage';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([]);

  // 📥 Açılışta veriyi yükle
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedNotes !== null) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.log('Notlar yüklenemedi:', error);
      }
    };

    loadNotes();
  }, []);

  // 💾 Her değişimde kaydet
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.log('Notlar kaydedilemedi:', error);
      }
    };

    saveNotes();
  }, [notes]);

  const handleAddNote = () => {
    if (text.trim() === '') return;
    setNotes([...notes, text]);
    setText('');
  };

  const handleDeleteNote = index => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={styles.apptitle}>{STRINGS.appTitle}</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={STRINGS.placeholder}
        />
        <TouchableOpacity style={styles.addbtn} onPress={handleAddNote}>
          <Text style={styles.addtext}>{STRINGS.add}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <NoteItem note={item} onDelete={() => handleDeleteNote(index)} />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  apptitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addbtn: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addtext: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
