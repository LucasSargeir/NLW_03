import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { LeafletMouseEvent } from "leaflet";


import SideBar from "../componentes/SideBar";
import mapIcon from "../Utils/mapIcon";
import api from "../services/api";


import '../styles/pages/create-orphanage.css';


export default function CreateOrphanage() {

	const history = useHistory();

	const [position, setPosition] = useState([0, 0])

	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [instructions, setInstructions] = useState("");
	const [opening_hours, setOpeningHours] = useState("");
	const [open_on_weekends, setOpeningOnWeekend] = useState(true);
	const [images, setImages] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	function handleSelectPosition(e: LeafletMouseEvent) {

		setPosition([e.latlng.lat, e.latlng.lng]);

	}

	function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {

		if (!e.target.files) {
			return;
			console.log("nao deu")
		}

		const selectedImages = Array.from(e.target.files);

		setImages(selectedImages);


		const selectedImagesPreview = selectedImages.map(i => {

			return URL.createObjectURL(i);

		})

		setPreviewImages(selectedImagesPreview);

	}

	async function handleSubmit(e: FormEvent) {

		e.preventDefault();

		const [latitude, longitude] = position

		const data = new FormData()

		data.append('name', name);
		data.append('about', about);
		data.append('instructions', instructions);
		data.append('opening_hours', opening_hours);
		data.append('latitude', String(latitude));
		data.append('longitude', String(longitude));
		data.append('open_on_weekends', String(open_on_weekends));

		images.forEach(image => {
			data.append('images', image);
		})

		await api.post('orphanages', data);

		alert("Cadastro realizado com sucesso!");

		history.push('/app');
	}

	return (
		<div id="page-create-orphanage">

			<SideBar />

			<main>
				<form className="create-orphanage-form" onSubmit={handleSubmit}>
					<fieldset>
						<legend>Dados</legend>

						<Map
							center={[-22.9311479, -43.3584274]}

							style={{ width: '100%', height: 280 }}
							zoom={15}
							onclick={handleSelectPosition}
						>
							<TileLayer
								url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
							/>

							{(position[0] !== 0) && <Marker interactive={false} icon={mapIcon} position={[position[0], position[1]]} />
							}
						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input id="name" value={name} onChange={event => setName(event.target.value)} />
						</div>

						<div className="input-block">
							<label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
							<textarea id="about" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="images-container">

								{previewImages.map(image => {
									return (
										<img key={image} src={image} alt={name} />
									)
								})

								}

								<label htmlFor="image[]" className="new-image">
									<FiPlus size={24} color="#15b6d6" />
								</label>
							</div>

							<input multiple onChange={handleSelectImages} type="file" id="image[]" />

						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">Horários de funcionamento</label>
							<input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">Atende fim de semana</label>

							<div className="button-select">
								<button type="button" onClick={() => { setOpeningOnWeekend(true) }} className={open_on_weekends === true ? "active" : ""}>Sim</button>
								<button type="button" onClick={() => { setOpeningOnWeekend(false) }} className={open_on_weekends === false ? "active" : ""}>Não</button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
          </button>
				</form>
			</main>
		</div>
	);
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
