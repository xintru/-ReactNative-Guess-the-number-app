import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height)
            setAvailableDeviceWidth(Dimensions.get('window').width)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Please, be honest!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currentRounds => currentRounds + 1);
        setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses]);
    };

    let listContainerStyle = styles.listContainer

    if (availableDeviceWidth > 350) {
        listContainerStyle = styles.listContainerBig
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <BodyText>Opponent's guess</BodyText>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name={'md-remove'} size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name={'md-add'} size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                    <FlatList
                        keyExtractor={item => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <BodyText>Opponent's guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name={'md-remove'} size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name={'md-add'} size={24} color="white" />
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,  // для корректной работы ScrollView/Flatlist
        width: '60%',
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;