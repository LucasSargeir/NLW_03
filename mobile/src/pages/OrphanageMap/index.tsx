import React, {useState} from 'react';
import { View, Text} from 'react-native';
import MapView, { Callout, Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../../images/map-marker.png';
import styles from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


import api from '../../services/api';

interface Orphanage{
    id: number;
    name: string;
    latitude: number,
    longitude: number;
}

const OrphanageMap = () =>{

    const navigator = useNavigation();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    function handleNavigate(r: string, id?: number){
       
        if( r === "CreateOrphanage"){
            r = "SelectMapPosition";   
        }
        if(!id){
            navigator.navigate(r);
        }
        else{
            navigator.navigate(r, {id});
        }
    }

    useFocusEffect(()=>{

        api.get("Orphanages").then((response) => {

            setOrphanages(response.data)

        }).catch(err => alert(`Não foi possível se conectar com o servidor!\nLog:${err}`))

    })

    return(
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE}
                     style={styles.map} 
                     initialRegion={{
                         latitude:-22.9311479,
                         longitude: -43.3584274,
                         latitudeDelta: 0.008,
                         longitudeDelta: 0.008,
                     }}>

                    {
                        orphanages.map((o)=>{

                            return(<Marker  key={`${o.id}`}
                                            calloutAnchor={{
                                                x: 3.2,
                                                y: 0.9
                                            }}
                                            icon={mapMarker}
                                            style={{width:20, height:20}}
                                            coordinate={{
                                                latitude: o.latitude,
                                                longitude: o.longitude
                                            }}
                                    >
                                        <Callout tooltip={true}
                                                onPress={()=>{handleNavigate('OrphanageDetails', o.id)}}
                                                >
                                            <View style={styles.calloutContainer}>
                                                <Text style={styles.calloutText}>{o.name}</Text>
                                            </View>
                                        </Callout>
                                    </Marker>
                                    )

                        })
                    }

            </MapView>

            <View style={styles.footer}>

                <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

                <RectButton style={styles.createOrphanageButton}  onPress={()=>{handleNavigate("CreateOrphanage")}}>
                    <Feather name="plus" size={20} color="#FFF"/>
                </RectButton>
            </View>
        </View>
    )

}

export default OrphanageMap;