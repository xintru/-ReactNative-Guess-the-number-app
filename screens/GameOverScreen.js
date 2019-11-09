import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';


import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    const [pictureHeightAndWidth, setPictureHeightAndWidth] = useState(Dimensions.get('window').width * 0.7)

    useEffect(() => {
        const updatePicture = () => {
            setPictureHeightAndWidth(Dimensions.get('window').width * 0.7)
        }
        Dimensions.addEventListener('change', updatePicture)
    })
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={{
                    width: pictureHeightAndWidth,
                    height: pictureHeightAndWidth,
                    borderRadius: pictureHeightAndWidth / 2,
                    borderWidth: 3,
                    borderColor: 'black',
                    overflow: 'hidden',
                    marginVertical: Dimensions.get('window').height / 30,
                }}>
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
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60,
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
});

export default GameOverScreen;