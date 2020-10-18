import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";


import OrphanageType from '../Utils/orphanageType';
import SideBar from "../componentes/SideBar";
import mapIcon from "../Utils/mapIcon";
import api from "../services/api";


import '../styles/pages/orphanage.css';

export default function Orphanage() {

	const [orphanage, setOrphanage] = useState<OrphanageType>();
	const [activeImage, setActiveImage] = useState(0)

	const params = useParams<{ id: string }>();

	useEffect(() => {

		api.get(`/orphanages/${params.id}`).then((response) => {

			setOrphanage(response.data)

		})

	}, [params.id]);

	if (!orphanage) {

		return (
			<p>Carregando...</p>
		)

	}

	return (
		<div id="page-orphanage">

			<SideBar />

			<main>
				<div className="orphanage-details">
					{
						(orphanage.images.length > 0) &&
						<img src={orphanage.images[activeImage].url} alt={orphanage.name} />
					}

					<div className="images">
						{
							orphanage.images?.map((o, i) => {

								if (activeImage === i) {
									return (

										<button key={o.id} className="active" type="button">
											<img src={o.url} alt={`${orphanage.name} foto ${o.id}`} />
										</button>
									)
								}
								else {

									return (
										<button onClick={() => { setActiveImage(i) }} key={o.id} className="not-active" type="button">
											<img src={o.url} alt={`${orphanage.name} foto ${o.id}`} />
										</button>
									)
								}

							})
						}
					</div>

					<div className="orphanage-details-content">
						<h1>{orphanage.name}</h1>
						<p>{orphanage.about}</p>

						<div className="map-container">
							<Map
								center={[orphanage.latitude, orphanage.longitude]}
								zoom={16}
								style={{ width: '100%', height: 280 }}
								dragging={false}
								touchZoom={false}
								zoomControl={false}
								scrollWheelZoom={false}
								doubleClickZoom={false}
							>
								<TileLayer
									url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
								/>
								<Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
							</Map>

							<footer>
								<a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
							</footer>
						</div>

						<hr />

						<h2>Instruções para visita</h2>
						<p>{orphanage.instructions}</p>

						<div className="open-details">
							<div className="hour">
								<FiClock size={32} color="#15B6D6" />
                    Segunda à Sexta <br />
								{orphanage.opening_hours}
							</div>
							{
								(orphanage.open_on_weekends) ?
									<div className="open-on-weekends">
										<FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                </div>
									:
									<div className="open-on-weekends dont-open">
										<FiInfo size={32} color="#FF669D" />
                    Não tendemos <br />
                    fim de semana
                </div>
							}
						</div>

						<button type="button" className="contact-button">
							<FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
					</div>
				</div>
			</main>
		</div>
	);
}