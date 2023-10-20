import CTA from '@components/CTA';
import React, { useState } from 'react';
import styled from 'styled-components';
import Time from '@assets/new/icons/Time';
import Location from '@assets/new/icons/Location';
import Calender from '@assets/new/icons/Calender';
import People from '@assets/new/icons/People';
import MoneyIcon from '@assets/new/icons/MoneyIcon';
import CheckMark from '@assets/new/icons/CheckMark';
import { toast } from 'react-toastify';

enum VerifyTicketEnum {
	TicketEntryForm = 'TicketEntryForm',
	TicketConfirmation = 'TicketConfirmation',
	TicketSuccess = 'TicketSuccess',
}

const VerifyTrainingTicket = () => {
	const [pageLocation, setPageLocation] = useState<VerifyTicketEnum>(
		VerifyTicketEnum.TicketEntryForm,
	);
	const [formData, setformData] = useState({
		ticketNumber: '',
		trainingOrderId: '',
	});
	const { ticketNumber, trainingOrderId } = formData;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setformData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onClickVerify = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		if (ticketNumber === '' || trainingOrderId === '') {
			toast.error('Please fill all fields');
			return;
		}
		setPageLocation(VerifyTicketEnum.TicketConfirmation);
	};
	const onClickConfirmAttendance = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		setPageLocation(VerifyTicketEnum.TicketSuccess);
	};

	const reloadPage = () => {
		setPageLocation(VerifyTicketEnum.TicketEntryForm);
		setformData({
			ticketNumber: '',
			trainingOrderId: '',
		});
	};
	return (
		<WrapperDiv>
			{pageLocation === VerifyTicketEnum.TicketEntryForm && (
				<TicketForm>
					<h3 className="title">Confirm Attendee Ticket no.</h3>
					<FormControl>
						<label className="label" htmlFor="trainingOrderId">
							Training Order Id
						</label>
						<input
							className="input"
							type="text"
							placeholder="Enter Training Order Id"
							id="trainingOrderId"
							name="trainingOrderId"
							value={trainingOrderId}
							onChange={onInputChange}
						/>
					</FormControl>
					<FormControl>
						<label className="label" htmlFor="ticketNumber">
							Ticket no.
						</label>
						<input
							className="input"
							type="text"
							placeholder="Enter ticket number"
							id="ticketNumber"
							name="ticketNumber"
							value={ticketNumber}
							onChange={onInputChange}
						/>
					</FormControl>
					<CTA className="no-animate submit-btn" onClick={onClickVerify}>
						Verify
					</CTA>
				</TicketForm>
			)}
			{pageLocation === VerifyTicketEnum.TicketConfirmation && (
				<ConfirmSection>
					<ConfirmTitle>
						<p className="training-title">Resin Art Workshop</p>
						<p className="training-email">Ordered By: test@gmail.com</p>
					</ConfirmTitle>
					<ConfirmBody>
						<InfoTile>
							<div className="icon">
								<MoneyIcon />
							</div>
							<div className="info-section">
								<p className="info">1 x Ticket</p>
								<p className="description">
									Amount <span className="outlined">NGN 10,000.00</span>
								</p>
							</div>
						</InfoTile>
						<InfoTile>
							<div className="icon">
								<People />
							</div>
							<div className="info-section">
								<p className="info">Test Data</p>
							</div>
						</InfoTile>
						<InfoTile>
							<div className="icon">
								<Time />
							</div>
							<div className="info-section">
								<p className="info">Date</p>
							</div>
						</InfoTile>
						<InfoTile>
							<div className="icon">
								<Location />
							</div>
							<div className="info-section">
								<p className="info">Location</p>
							</div>
						</InfoTile>
						<InfoTile>
							<div className="icon">
								<Calender />
							</div>
							<div className="info-section">
								<p className="info">Ticket no.</p>
								<p className="description">378839</p>
							</div>
						</InfoTile>
					</ConfirmBody>

					<CTA
						className="no-animate submit-btn"
						onClick={onClickConfirmAttendance}>
						Confirm Attendance
					</CTA>
				</ConfirmSection>
			)}

			{pageLocation === VerifyTicketEnum.TicketSuccess && (
				<SuccessSection>
					<div className="icon">
						<CheckMark color="#00D685" />
					</div>
					<h3 className="title">Attendance Confirmed</h3>
					<p className="description">
						This ticket has been confirmed and is no longer available for use.
					</p>
					<CTA onClick={reloadPage} className="no-animate submit-btn">
						Verify another ticket
					</CTA>
				</SuccessSection>
			)}
		</WrapperDiv>
	);
};

export default VerifyTrainingTicket;

const WrapperDiv = styled.div`
	padding: 1rem;
	background-color: var(--oex-off-white);
	min-height: 50vh;
	margin: 1rem;
	border-radius: 0.7rem;

	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem;
		width: 500px;
		margin: 2rem auto;
	}
`;
const TicketForm = styled.div`
	& .title {
		font-size: 1.3rem;
		font-weight: 550;
		margin-bottom: 2rem;
	}

	& .submit-btn {
		width: 100%;
		margin-top: 1rem;
		font-size: 1rem;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		padding: 2rem 1rem;
	}
`;
const FormControl = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	margin-bottom: 1rem;

	& .label {
		font-weight: 500;
		font-size: 1.2rem;
	}

	& .input {
		padding: 1rem;
		background-color: var(--oex-off-white);
		font: inherit;
		border: 1px solid var(--oex-grey);
		border-radius: 0.3rem;
		outline-color: var(--oex-orange);

		&::placeholder {
			font-weight: 300;
		}
	}
`;

const ConfirmSection = styled.div`
	& .submit-btn {
		width: 100%;
		margin-top: 1rem;
		font-size: 1rem;
	}
`;

const ConfirmTitle = styled.div`
	margin-bottom: 1.5rem;

	& .training-title {
		margin: 0 0 0.4rem;
		font-size: 1.3rem;
		font-weight: 600;
	}
	& .training-email {
		margin: 0;
	}
`;

const ConfirmBody = styled.div``;
const InfoTile = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
	margin-bottom: 1.5rem;

	& .info {
		margin: 0;
	}
	& .description {
		margin: 0.4rem 0 0;
	}

	& .outlined {
		color: var(--oex-orange);
		font-weight: 600;
		margin-left: 0.4rem;
	}
`;

const SuccessSection = styled.div`
	text-align: center;

	& .title {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}

	& .submit-btn {
		width: 100%;
		margin-top: 3rem;
		font-size: 1rem;
	}
`;
