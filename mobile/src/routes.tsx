import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanageMap';
import OrphanagesDetails from './pages/OrphanageDetails';
import OrphanagesData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import Header from './pages/componentes/Header';

const {Navigator, Screen} = createStackNavigator();

const Routes = () =>{

    return(
        <NavigationContainer>
            <Navigator screenOptions={{
                                       headerShown: false,
                                       cardStyle:{
                                           backgroundColor: "#f2f3f5"
                                       }   
                                     }}>
                <Screen name={"OrphanagesMap"} component={OrphanagesMap} />
                <Screen name={"OrphanageDetails"} component={OrphanagesDetails} options={{headerShown:true,
                                                                                           header: ()=><Header showCancel={false} title="Orfanato"/> 
                                                                                        }}/>
                <Screen name={"SelectMapPosition"} component={SelectMapPosition} options={{headerShown:true,
                                                                                           header: ()=><Header title="Selecione no mapa"/> 
                                                                                        }}/>
                <Screen name={"OrphanageData"} component={OrphanagesData} options={{headerShown:true,
                                                                                    header: ()=><Header title="Informe os dados"/> 
                                                                                    }}/>
            </Navigator>
        </NavigationContainer>
    )

}

export default Routes;