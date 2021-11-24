import { E } from '@styled-icons/simple-icons';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { CTA } from './Header';

type FormValue = {
	from: NeededData[];
	to: NeededData[];
	distance: string;
};

type NeededData = {
	display_name: string;
	lon: string;
	lat: string;
};

const ContactForm = () => {
	const [suggestions, setSuggestions] = useState<{
		from: NeededData[];
		to: NeededData[];
	}>({ from: [], to: [] });

	const getAddressSuggestion = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const inputValue = e.target.value;
			const parsedInputValue = inputValue
				.split(' ')
				.map((str) => str.trim())
				.join('+');
			const jsonData = await fetch(
				`https://nominatim.openstreetmap.org/search.php?q=${parsedInputValue}&format=jsonv2`
			).then((data) => data.json());
			if (jsonData.length === 0) {
				throw new Error("Couldn't get address suggestions");
			}
			const neededData = jsonData.map(
				({ display_name, lon, lat }: NeededData) => {
					return {
						display_name,
						lat,
						lon,
					};
				}
			);
			setSuggestions({
				...suggestions,
				[e.target.name]: neededData,
			});
		} catch (error) {
			setSuggestions({
				...suggestions,
				[e.target.name]: ["Couldn't get address suggestions"],
			});
			console.log("couldn't get address suggetstion", e);
		}
	};
	const calculateDistance: MouseEventHandler = (e) => {
		console.log(e);
	};
	// useEffect(() => {
	//
	// 	return () => {
	// 		cleanup
	// 	}
	// }, [input])
	const [FormValue, setFormValue] = useState<FormValue>({
		from: [],
		to: [],
		distance: '',
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const value = e.currentTarget.value || '';
		const name = e.target.name;
		setFormValue({ ...FormValue, [name]: value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const data = FormValue;

		// console.log(FormValue);
	};

	return (
		<FormContainer>
			<FormTitle>Input your address</FormTitle>
			<form onSubmit={handleSubmit}>
				<div style={{ display: 'flex' }}>
					<div>
						<div style={{ display: 'flex' }}>
							<InputLabelDiv>
								<label htmlFor="from">From</label>
								<input
									type="search"
									list="from-suggestions"
									placeholder="From"
									name="from"
									onChange={getAddressSuggestion}
									id="from"
									results={6}
								/>
							</InputLabelDiv>
							<InputLabelDiv>
								<label htmlFor="to">To</label>{' '}
								<input
									id="to"
									list="to-suggestions"
									name="to"
									placeholder="To"
									onChange={getAddressSuggestion}
									results={6}
									type="search"
								/>
							</InputLabelDiv>
						</div>
						<CTA onClick={calculateDistance}>Calculate Distance</CTA>
					</div>
					<div>
						<InputLabelDiv>
							<label htmlFor="distance">Distance</label>
							<output id="distance" name="distance">{`Your Distance is: ${
								FormValue.from.length - FormValue.to.length
							}km`}</output>
						</InputLabelDiv>

						<CTA style={{ alignSelf: 'flex-end' }} type="submit">
							Book an Appointment
						</CTA>
					</div>
				</div>
				<datalist id="from-suggestions">
					{suggestions.from.map((suggestion, id) => (
						<option
							style={{ color: 'green' }}
							key={id}
							value={suggestion.display_name}
						>
							{`${suggestion.lat} ${suggestion.lon}`}
						</option>
					))}
				</datalist>
				<datalist id="to-suggestions">
					{suggestions.to.map((suggestion, id) => (
						<option key={id} value={suggestion.display_name}>
							{`${suggestion.lat} ${suggestion.lon}`}
						</option>
					))}
				</datalist>
			</form>
		</FormContainer>
	);
};

export default ContactForm;

const FormContainer = styled.div`
	/* width: 100%;
	max-width: 300px; */
`;

const FormTitle = styled.h3`
	color: var(--oex-orange);
	text-align: center;
`;

const InputLabelDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.51rem;
	& > label {
		margin-bottom: 0.2rem;
	}
	& > input,
	& > textarea {
		border-radius: 1rem;
		border: none;
		padding: 0.6rem 0.5rem;
		resize: vertical;
	}

	& > input[id='from']:invalid {
		outline-color: red;
	}

	& > input[id='from']:valid {
		outline-color: green;
	}
`;

// https://nominatim.openstreetmap.org/search.php?q=universit%C3%A4tsstra%C3%9Fe+essen&format=jsonv2
