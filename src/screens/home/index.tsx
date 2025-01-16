import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import { Participant } from "../../components/participant";

import { styles } from "./styles";

export default function Home() {
  const [participants, setParticipants] = useState<string[]> ([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd () {
    if (participants.includes(participantName)){
      return Alert.alert('Participante existe', 'Já existe um participante na lista com este nome.')
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
    }

  function handleParticipantRemove (name: string) {
    Alert.alert("Removes", `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name ))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Lista de Convidados
      </Text>

      <Text style={styles.eventDate}>
        Segunda, 06 de janeiro de 2025
      </Text>

      <View style={styles.form}>
        <TextInput
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="#6b6b6b"
        // onChangeText={text => setParticipantName(text)} //
        onChangeText={setParticipantName} // forma simplificada //
        value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}      
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  );
}   
