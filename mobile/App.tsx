import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import OrphanageMap from './src/pages/OrphanageMap';
import Routes from './src/routes';

export default function App() {

	const [fontLoaded] = useFonts({
		nunito600:Nunito_600SemiBold,
		nunito700:Nunito_700Bold,
		nunito800:Nunito_800ExtraBold
	})

	if(!fontLoaded){

		return <Text>Carregando...</Text>;

	}

	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			<Routes />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
