import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const PokemonListScreen = () => {
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
    };

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            const limit = 100; // Fetch first 100 Pokémon
            const pokemonDetails = await Promise.all(
                Array.from({ length: limit }, (_, index) => index + 1).map(async (id) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const detailData = await response.json();

                    const baseStats = detailData.stats.map(stat => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    }));

                    const abilities = detailData.abilities.map(ability => ability.ability.name);

                    const moves = detailData.moves.slice(0, 5).map(move => move.move.name);

                    return {
                        id: `#${detailData.id.toString().padStart(3, "0")}`,
                        name: detailData.name.charAt(0).toUpperCase() + detailData.name.slice(1),
                        image: detailData.sprites.front_default,
                        backImage: detailData.sprites.back_default,
                        types: detailData.types.map(type => ({
                            name: type.type.name,
                            color: typeColors[type.type.name] || "#A8A77A"
                        })),
                        height: (detailData.height / 10).toFixed(1),
                        weight: (detailData.weight / 10).toFixed(1),
                        baseStats,
                        abilities,
                        moves
                    };
                })
            );

            setPokemon(pokemonDetails);
            setFilteredPokemon(pokemonDetails); 
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setFilteredPokemon(pokemon);
        } else {
            const filtered = pokemon.filter((poke) =>
                poke.name.toLowerCase().includes(text.toLowerCase()) ||
                poke.id.includes(text)
            );
            setFilteredPokemon(filtered);
        }
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search Pokémon by name or ID"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            ) : (
                <FlatList
                    data={filteredPokemon}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Pokémon Details", { pokemon: item })}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.id}>{item.id}</Text>
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={styles.typesContainer}>
                                    {item.types.map((type, index) => (
                                        <View key={index} style={[styles.typeBadge, { backgroundColor: type.color }]}>
                                            <Text style={styles.typeText}>{type.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default PokemonListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6D6D6',
        padding: 10,
    },
    searchBar: {
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 100,
        borderRadius: 8,
        alignItems: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 0.1,
        elevation: 5,
        marginBottom: 10,
        padding: 10,
    },
    imageContainer: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    detailContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
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
});
