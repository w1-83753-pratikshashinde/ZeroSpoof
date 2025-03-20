import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutUsScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.description}>
                Welcome to Anti-Spam Shield, your trusted solution to block spam calls 
                and ensure a secure calling experience. Our mission is to protect users 
                from fraudulent calls using advanced AI-based spam detection.
            </Text>

            <Text style={styles.sectionTitle}>Why Choose Us?</Text>
            <Text style={styles.listItem}>✅ Real-time spam detection</Text>
            <Text style={styles.listItem}>✅ AI-powered call filtering</Text>
            <Text style={styles.listItem}>✅ User-friendly interface</Text>

            {/* <Text style={styles.sectionTitle}>Developers</Text>
            <Text style={styles.developerName}>👩‍💻 Pratiksha Shinde</Text>
            <Text style={styles.developerName}>👨‍💻 Shriyash Thakare</Text> */}

            <Text style={styles.contact}>📧 Contact Us: aniket@tekina.co.in</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        flexGrow: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    developerName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    contact: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AboutUsScreen;
