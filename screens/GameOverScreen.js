import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={300} //default
                    source={require('../assets/success.png')}
                    // source={{uri: 'https://us.123rf.com/450wm/stmool/stmool1512/stmool151200183/49589663-alcanzar-una-meta.jpg?ver=6'}}
                    style={styles.image}
                    resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}
                    </Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
});

export default GameOverScreen;