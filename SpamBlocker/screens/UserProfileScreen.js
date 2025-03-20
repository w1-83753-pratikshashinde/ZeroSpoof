
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
// import React, { useState } from 'react';
// import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// //<Image source={require('../../assets/profile_placeholder.png')} style={styles.profileImage} />
// //<Image source={{ uri: 'https://via.placeholder.com/120/CCCCCC/FFFFFF?text=User' }} style={styles.profileImage} />


// const UserProfileScreen = () => {
//     const [username, setUsername] = useState('John Doe');
//     const [phoneNumber, setPhoneNumber] = useState('9876543210');
//     const [profilePic, setProfilePic] = useState(null);

//     // 📸 Pick Image from Gallery
//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [1, 1],
//             quality: 1,
//         });
//         if (!result.canceled) {
//             setProfilePic(result.assets[0].uri);
//         }
//     };

//     // ✅ Save Profile Details
//     const saveProfile = async () => {
//         if (!username.trim() || !phoneNumber.match(/^[789]\d{9}$/)) {
//             Alert.alert('Invalid Input', 'Please enter valid details.');
//             return;
//         }
//         try {
//             const profileData = { username, phoneNumber, profilePic };
//             await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
//             Alert.alert('Success', 'Profile Updated!');
//         } catch (error) {
//             console.error('Error saving profile:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={pickImage}>
//                 <Image source={profilePic ? { uri: profilePic } : require('../assets/profile_placeholder.png')} style={styles.profileImage} />
//             </TouchableOpacity>
//             <Text style={styles.label}>Username</Text>
//             <TextInput style={styles.input} value={username} onChangeText={setUsername} />
//             <Text style={styles.label}>Phone Number</Text>
//             <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" maxLength={10} />
//             <Button title="Save Profile" onPress={saveProfile} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
//     profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 2, borderColor: '#007AFF' },
//     label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
//     input: { width: '90%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
// });

// export default UserProfileScreen;




import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserProfileScreen = () => {
    const [username, setUsername] = useState('John Doe');
    const [phoneNumber, setPhoneNumber] = useState('9876543210');
    const [profilePic, setProfilePic] = useState(null);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);

    // 📸 Pick Image from Gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
        }
    };

    // ✅ Save Profile Details
    const saveProfile = async () => {
        if (!username.trim() || !phoneNumber.match(/^[789]\d{9}$/)) {
            Alert.alert('Invalid Input', 'Please enter valid details.');
            return;
        }
        try {
            const profileData = { username, phoneNumber, profilePic };
            await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
            Alert.alert('Success', 'Profile Updated!');
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                <Image source={profilePic ? { uri: profilePic } : require('../assets/profile_placeholder.png')} style={styles.profileImage} />
            </TouchableOpacity>
    
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} editable={true} />
                <TouchableOpacity style={styles.editButton}>
                    <MaterialIcons name="edit" size={20} color="#007AFF" />
                </TouchableOpacity>
            </View>
    
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" maxLength={10} editable={true} />
                <TouchableOpacity style={styles.editButton}>
                    <MaterialIcons name="edit" size={20} color="#007AFF" />
                </TouchableOpacity>
            </View>
    
            <Button title="Save Profile" onPress={saveProfile} />
        </View>
    );
};
    


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        alignItems: 'center', 
        backgroundColor: '#fff' 
    },
    profileImage: { 
        width: 120, 
        height: 120, 
        borderRadius: 60, 
        marginBottom: 20, 
        borderWidth: 2, 
        borderColor: '#007AFF' 
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9'
    },
    input: { 
        flex: 1, 
        height: 40, 
        paddingHorizontal: 10, 
        color: '#333' 
    },
    editButton: {
        padding: 5,
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    label: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 5,
        alignSelf: 'flex-start'
    }
});


export default UserProfileScreen;

