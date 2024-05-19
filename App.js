import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import RNFS from 'react-native-fs';

const daysOfWeek = [
  { name: 'Sunday', value: 1 },
  { name: 'Monday', value: 2 },
  { name: 'Tuesday', value: 3 },
  { name: 'Wednesday', value: 4 },
  { name: 'Thursday', value: 5 },
  { name: 'Friday', value: 6 },
  { name: 'Saturday', value: 7 },
];

const nepaliMonths = [
  { name: 'Baisakh', value: 1 },
  { name: 'Jestha', value: 2 },
  { name: 'Ashadh', value: 3 },
  { name: 'Shrawan', value: 4 },
  { name: 'Bhadra', value: 5 },
  { name: 'Ashwin', value: 6 },
  { name: 'Kartik', value: 7 },
  { name: 'Mangsir', value: 8 },
  { name: 'Poush', value: 9 },
  { name: 'Magh', value: 10 },
  { name: 'Falgun', value: 11 },
  { name: 'Chaitra', value: 12 },
];

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [date, setDate] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [tithi, setTithi] = useState('');
  const [tghadi, setTghadi] = useState('');
  const [nakshatra, setNakshatra] = useState('');
  const [tnakshatra, setTnakshatra] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@calendar_data');
        const savedData = jsonValue != null ? JSON.parse(jsonValue) : [];
        setData(savedData);
      } catch (e) {
        console.error(e);
      }
    };

    loadData();
  }, []);

  const saveData = async (newData) => {
    try {
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem('@calendar_data', jsonValue);
      
      // Save the data to a file in the device storage
      const directoryPath = `${RNFS.DocumentDirectoryPath}/CalendarData`;
      const filePath = `${directoryPath}/data.json`;
      
      // Create the directory if it doesn't exist
      await RNFS.mkdir(directoryPath);
      
      // Write the JSON data to the file
      await RNFS.writeFile(filePath, jsonValue, 'utf8');
      console.log('Data saved to:', filePath);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddData = () => {
    if (selectedMonth === null || !date || selectedDay === null || !tithi || !tghadi || !nakshatra || !tnakshatra) {
      Alert.alert('All fields are required!');
      return;
    }

    const newItem = {
      id: uuidv4(),
      month: selectedMonth,
      date,
      day: selectedDay,
      tithi,
      tghadi,
      nakshatra,
      tnakshatra,
    };

    const existingItem = data.find(item => item.month === selectedMonth && item.date === date);
    if (existingItem) {
      Alert.alert('This date for the given month already exists.');
      return;
    }

    const updatedData = [...data, newItem];
    setData(updatedData);
    saveData(updatedData);

    setSelectedMonth(null);
    setDate('');
    setSelectedDay(null);
    setTithi('');
    setTghadi('');
    setNakshatra('');
    setTnakshatra('');
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.monthsContainer}>
          {nepaliMonths.map((month) => (
            <TouchableOpacity
              key={month.value}
              style={[styles.monthBox, selectedMonth === month.value && styles.selectedMonthBox]}
              onPress={() => handleSelectMonth(month.value)}
            >
              <Text style={selectedMonth === month.value ? styles.selectedMonthText : styles.monthText}>
                {month.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Date"
          keyboardType="numeric"
          value={date}
          onChangeText={setDate}
        />
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day.value}
              style={[styles.dayBox, selectedDay === day.value && styles.selectedDayBox]}
              onPress={() => handleSelectDay(day.value)}
            >
              <Text style={selectedDay === day.value ? styles.selectedDayText : styles.dayText}>
                {day.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Tithi"
          keyboardType="numeric"
          value={tithi}
          onChangeText={setTithi}
        />
        <TextInput
          style={styles.input}
          placeholder="Tghadi"
          keyboardType="numeric"
          value={tghadi}
          onChangeText={setTghadi}
        />
        <TextInput
          style={styles.input}
          placeholder="Nakshatra"
          keyboardType="numeric"
          value={nakshatra}
          onChangeText={setNakshatra}
        />
        <TextInput
          style={styles.input}
          placeholder="Tnakshatra"
          keyboardType="numeric"
          value={tnakshatra}
          onChangeText={setTnakshatra}
        />
        <Button title="Add Data" onPress={handleAddData} />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const dayName = daysOfWeek.find(day => day.value === item.day)?.name || 'Unknown';
            const monthName = nepaliMonths.find(month => month.value === item.month)?.name || 'Unknown';
            return (
              <View style={styles.listItem}>
                <Text>
                  Month: {monthName}, Date: {item.date}, Day: {dayName}, Tithi: {item.tithi}, Tghadi: {item.tghadi}, Nakshatra: {item.nakshatra}, Tnakshatra: {item.tnakshatra}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};



export default App;
