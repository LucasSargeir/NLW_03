import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps{
    title: string,
    showCancel?: boolean
}

const Header:React.FC<HeaderProps> = ({title, showCancel = true}) =>{

    const navigation = useNavigation();

    function goBackHome(){
        navigation.navigate('OrphanagesMap')
    }

    return(
        <View style={styles.container}>
            <BorderlessButton>
                <Feather name="arrow-left" size={24} color="#15b6d6" onPress={navigation.goBack}/>
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>
            {(showCancel)?
            <BorderlessButton>
                <Feather name="x" size={24} color="#ff669d" onPress={goBackHome}/>
            </BorderlessButton>
            :
            <View/>
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    title:{
        fontFamily: 'nunito600',
        color: "#8fa7b3",
        fontSize: 16
    }
})

export default Header;