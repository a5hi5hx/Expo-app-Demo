import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
  const [shiva, setShiva] = useState(false);
  const [agni, setAgni] = useState(false);
  const [kalash, setKalash] = useState(false);
  const [vastu, setVastu] = useState(false);
  const [dhoka, setDhoka] = useState(false);
  const [puran, setPuran] = useState(false);
  const [sunCount, setSunCount] = useState(false);
  const [guruCount, setGuruCount] = useState(false);
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
      shiva,
      agni,
      kalash,
      vastu,
      dhoka,
      puran,
      sunCount,
      guruCount,
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
    setShiva(false);
    setAgni(false);
    setKalash(false);
    setVastu(false);
    setDhoka(false);
    setPuran(false);
    setSunCount(false);
    setGuruCount(false);
  };

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const handleDeleteData = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    saveData(updatedData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Nepali Month</Text>
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

          <BouncyCheckbox
            isChecked={shiva}
            text="Shiva"
            onPress={() => setShiva(!shiva)}
          />
          <BouncyCheckbox
            isChecked={agni}
            text="Agni"
            onPress={() => setAgni(!agni)}
          />
          <BouncyCheckbox
            isChecked={kalash}
            text="Kalash"
            onPress={() => setKalash(!kalash)}
          />
          <BouncyCheckbox
            isChecked={vastu}
            text="Vastu"
            onPress={() => setVastu(!vastu)}
          />
          <BouncyCheckbox
            isChecked={dhoka}
            text="Dhoka"
            onPress={() => setDhoka(!dhoka)}
          />
          <BouncyCheckbox
            isChecked={puran}
            text="Puran"
            onPress={() => setPuran(!puran)}
          />
          <BouncyCheckbox
            isChecked={sunCount}
            text="SunCount"
            onPress={() => setSunCount(!sunCount)}
          />
          <BouncyCheckbox
            isChecked={guruCount}
            text="GuruCount"
            onPress={() => setGuruCount(!guruCount)}
          />

          <Button title="Add Data" onPress={handleAddData} />

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const dayName = daysOfWeek.find(day => day.value === item.day)?.name || 'Unknown';
              const monthName = nepaliMonths.find(month => month.value === item.month)?.name || 'Unknown';
              return (
                <TouchableOpacity
                  onLongPress={() => handleDeleteData(item.id)}
                >
                  <View style={styles.listItem}>
                    <Text style={styles.listItemText}>
                      Month: {monthName}, Date: {item.date}, Day: {dayName}, Tithi: {item.tithi}, Tghadi: {item.tghadi}, Nakshatra: {item.nakshatra}, Tnakshatra: {item.tnakshatra}, Shiva: {item.shiva ? 'Yes' : 'No'}, Agni: {item.agni ? 'Yes' : 'No'}, Kalash: {item.kalash ? 'Yes' : 'No'}, Vastu: {item.vastu ? 'Yes' : 'No'}, Dhoka: {item.dhoka ? 'Yes' : 'No'}, Puran: {item.puran ? 'Yes' : 'No'}, SunCount: {item.sunCount ? 'Yes' : 'No'}, GuruCount: {item.guruCount ? 'Yes' : 'No'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  monthBox: {
    width: '28%',
    padding: 10,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedMonthBox: {
    backgroundColor: 'blue',
  },
  monthText: {
    color: 'black',
  },
  selectedMonthText: {
    color: 'white',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  dayBox: {
    width: '28%',
    padding: 10,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedDayBox: {
    backgroundColor: 'blue',
  },
  dayText: {
    color: 'black',
  },
  selectedDayText: {
    color: 'white',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listItemText: {
    color: 'black',
  },
});

export default App;
