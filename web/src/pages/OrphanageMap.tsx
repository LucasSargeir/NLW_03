import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


import Logo from '../images/map-marker.svg'
import mapIcon from '../Utils/mapIcon';
import Orphanage from '../Utils/orphanageType'
import api from '../services/api';


import '../styles/pages/orphanageMap.css';


const OrphanageMap = () => {

    const [orphanagesMarkers, setOrphanagesMarkers] = useState<Orphanage[]>([]);

    useEffect(() => {

        api.get('/orphanages').then((response) => {

            setOrphanagesMarkers(response.data)

        })

    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={Logo} alt="logo happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map
                center={[-22.9311479, -43.3584274]}
                zoom={15}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                    orphanagesMarkers.map((om) => {

                        return (
                            <Marker key={om.id} icon={mapIcon} position={[om.latitude, om.longitude]}>
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {om.name}
                                    <Link to={`/orphanages/${om.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        )

                    })
                }
            </Map>

            <Link to="orphanages/create" className="create-orphanage" >
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    );

}

export default OrphanageMap;