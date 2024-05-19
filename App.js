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

 
