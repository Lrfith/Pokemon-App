import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const PokemonDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { pokemon: initialPokemon, clearSelection } = route.params || {};
    const [pokemon, setPokemon] = useState(initialPokemon);

    useEffect(() => {
        setPokemon(initialPokemon);
    }, [initialPokemon]);

    if (!pokemon) {
        return (
            <View style={styles.container}>
                <Text style={styles.details}>
                    Please select a Pokémon from the Pokémon List tab to view its details.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Pokémon List")}>
                    <Text style={styles.buttonText}>Go to Pokémon List</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const backImage = pokemon.sprites?.back_default;

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* details show */}
            <View style={styles.containerDetails}>
                <Text style={styles.id}>{pokemon.id}</Text>
                <Text style={styles.name}>{pokemon.name}</Text>
                <View style={styles.typesContainer}>
                    {pokemon.types.map((type, index) => (
                        <View key={index} style={[styles.typeBadge, { backgroundColor: type.color }]}>
                            <Text style={styles.typeText}>{type.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* image show */}
            <View style={[styles.containerDetails, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                <View style={styles.showImage}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center' }}>Front</Text>
                    <Image source={{ uri: pokemon.image }} style={styles.image} />
                </View>
                <View style={styles.showImage}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center' }}>Back</Text>
                    <Image source={{ uri: pokemon.backImage }} style={styles.image} />
                </View>
            </View>

            {/* base stats */}
            <View style={styles.containerDetailsText}>
                <Text style={styles.title}>Base Stats</Text>
                {pokemon.baseStats.map((stat, index) => (
                    <View key={index} style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>{capitalizeFirstLetter(stat.name)}:</Text>
                        <Text style={styles.detailsValue}>{stat.value}</Text>
                    </View>
                ))}
            </View>

            {/* details */}
            <View style={styles.containerDetailsText}>
                <Text style={styles.title}>Details</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text>Height: </Text>
                    <Text style={[styles.detailsValue, {left: 20}]}>{pokemon.height} m</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text>Weight: </Text>
                    <Text style={[styles.detailsValue, {left: 18}]}>{pokemon.weight} kg</Text>
                </View>
            </View>

            {/* ability */}
            <View style={styles.containerDetailsText}>
                <Text style={styles.title}>Abilities</Text>
                {pokemon.abilities.map((ability, index) => (
                    <Text key={index} style={styles.textdetails}>{capitalizeFirstLetter(ability)}</Text>
                ))}
            </View>

            {/* move 5 first */}
            <View style={styles.containerDetailsText}>
                <Text style={styles.title}>Moves (First 5)</Text>
                {pokemon.moves.map((move, index) => (
                    <Text key={index} style={styles.textdetails}>{capitalizeFirstLetter(move)}</Text>
                ))}
            </View>

            {/* buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.buttonLong, { backgroundColor: '#F1846EFF' }]}
                    onPress={() => {
                        setPokemon(null);
                        if (clearSelection) {
                            clearSelection();
                        }
                    }}>
                    <Text style={styles.buttonText}>Clear Selection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonLong, { backgroundColor: '#3437DBFF' }]}
                    onPress={() => navigation.navigate("Pokémon List")}>
                    <Text style={styles.buttonText}>Back to Pokémon List</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default PokemonDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    containerDetails: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: '#fff',
        padding: 20
    },
    containerDetailsText: {
        margin: 5,
        backgroundColor: '#fff',
        padding: 20
    },
    button: {
        backgroundColor: '#3437DBFF',
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
        width: 200,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: 'grey',
    },
    textdetails: {
        fontSize: 16,
        color: 'grey',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    typesContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    typeBadge: {
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 5,
    },
    typeText: {
        fontSize: 14,
        color: 'white',
        textTransform: 'capitalize',
    },
    id: {
        color: 'grey',
        fontSize: 16,
    },
    buttonLong: {
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
        width: '95%',
        alignSelf: 'center',
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-end',  // Push buttons to the bottom
        marginBottom: 20,  // Add space from the bottom
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 20,
    },
    showImage: {
        flexDirection: 'column',
        backgroundColor: '#F3F3F3FF',
        padding: 20,
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    detailsLabel: {
        fontSize: 16,
        color: 'grey',
    },
    detailsValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
