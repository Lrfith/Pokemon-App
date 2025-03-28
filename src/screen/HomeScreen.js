import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'


const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' }}
                style={{ width: 257, height: 103, alignSelf: 'center', marginBottom: 20 }}
            />
            <Text style={styles.title}>Welcome to Pokédex App</Text>
            <Text style={styles.details}>This app uses the PokéAPI to display information about Pokémon. Browse the list of Pokémon, search for specific ones, and view detailed information.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Pokémon List")}
            >
                <Text style={styles.buttonText}>View Pokémon List</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    details: {
        fontSize: 16,
        textAlign: 'center',
        numberOfLines: 3,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#DB9034FF',
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
        width: 200,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})