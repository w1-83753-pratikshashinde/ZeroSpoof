import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Define API URL (Ensure Backend is running at this address)
const API_URL = 'http://192.168.247.165:3000/api/blacklist';

const CallBlockScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [blockedNumbers, setBlockedNumbers] = useState([]);

    // useEffect(() => {
    //     loadBlockedNumbers();
    // }, []);

   



    // const loadBlockedNumbers = async () => {
    //     try {
    //         console.log('Fetching blocked numbers...');
    
    //         const response = await fetch('http://192.168.0.106:3000/api/blacklist/list');
    
    //         // Check if response is OK (status code 200-299)
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    
    //         // Check if response type is JSON
    //         const contentType = response.headers.get('content-type');
    //         if (!contentType || !contentType.includes('application/json')) {
    //             const text = await response.text();  // Read as text for debugging
    //             throw new Error(`Unexpected response format: ${text}`);
    //         }
    
    //         const data = await response.json();  // Safe JSON parsing
    //         console.log('Parsed Data:', data);
    
    //         if (Array.isArray(data)) {
    //             setBlockedNumbers(data.map(item => item.phone));
    //         } else {
    //             throw new Error('Invalid data format');
    //         }
    //     } catch (error) {
    //         console.error('Failed to load blocked numbers:', error.message);
    //         Alert.alert('Error', error.message);
    //     }
    // };
    
    

    // ✅ Save blocked numbers to local storage
    const saveBlockedNumbers = async (numbers) => {
        try {
            await AsyncStorage.setItem('blockedNumbers', JSON.stringify(numbers));
        } catch (error) {
            console.error('Failed to save blocked numbers:', error);
        }
    };

    // ✅ Block a phone number (API + AsyncStorage)
    const handleBlockNumber = async () => {
        if (!phoneNumber.match(/^[789]\d{9}$/)) {
            Alert.alert('Invalid Number', 'Enter a valid 10-digit number.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneNumber, status: 'black' }),
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to block number');
            }

            setBlockedNumbers([...blockedNumbers, phoneNumber]); // Update state
            setPhoneNumber('');
        } catch (error) {
            console.error('Block Number Error:', error.message);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Unblock a phone number
    const handleUnblock = async (number) => {
        try {
            const response = await fetch(`${API_URL}/remove`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: number }),
            });

            const data = await response.json();
            console.log('API Response:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to unblock number');
            }

            const newBlockedNumbers = blockedNumbers.filter((num) => num !== number);
            setBlockedNumbers(newBlockedNumbers);
            await saveBlockedNumbers(newBlockedNumbers);
        } catch (error) {
            console.error('Unblock Error:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Call Block Feature</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
            />
            <Button title="Block Number" onPress={handleBlockNumber} />
            {loading && <ActivityIndicator size="small" color="#0000ff" />}

            <FlatList
                data={blockedNumbers}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={styles.blockItem}>
                        <Text style={styles.blockedNumber}>{item}</Text>
                        <TouchableOpacity onPress={() => handleUnblock(item)}>
                            <Text style={styles.unblockButton}>Unblock</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyList}>No blocked numbers.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
    blockItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    blockedNumber: { fontSize: 16 },
    unblockButton: { color: 'red', fontWeight: 'bold' },
    emptyList: { textAlign: 'center', fontStyle: 'italic', marginTop: 20 },
});

export default CallBlockScreen;
