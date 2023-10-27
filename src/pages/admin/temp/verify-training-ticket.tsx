import ArrowBack from '@assets/new/icons/ArrowBack';
import Calender from '@assets/new/icons/Calender';
import CheckMark from '@assets/new/icons/CheckMark';
import Location from '@assets/new/icons/Location';
import MoneyIcon from '@assets/new/icons/MoneyIcon';
import People from '@assets/new/icons/People';
import Time from '@assets/new/icons/Time';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import CTA from '@components/CTA';
import { priceFormatter } from '@components/ProductCard';
import { TrainingAttendanceType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { formatDate } from '@utils/index';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

enum VerifyTicketEnum {
	TicketEntryForm = 'TicketEntryForm',
	TicketConfirmation = 'TicketConfirmation',
	TicketConfirmSuccess = 'TicketConfirmSuccess',
}

const VerifyTrainingTicket = () => {
	const [pageLocation, setPageLocation] = useState<VerifyTicketEnum>(
		VerifyTicketEnum.TicketEntryForm,
	);
	const [formData, setformData] = useState({
		ticketNumber: '',
		trainingOrderId: '',
	});
	const [attendanceData, setAttendanceData] =
		useState<TrainingAttendanceType | null>(null);
	const { ticketNumber, trainingOrderId } = formData;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setformData(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onClickVerify = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		if (ticketNumber === '' || trainingOrderId === '') {
			toast.error('Please fill all fields');
			return;
		}

		fetch('/api/verify-training-ticket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ trainingOrderId, ticketNumber }),
		})
			.then(res => res.json())
			.then(response => {
				if (!response.error) {
					setAttendanceData(response.data);
					setPageLocation(VerifyTicketEnum.TicketConfirmation);
				}
				if (response.error) {
					toast.error(response.error);
				}
			})
			.catch(err => {
				console.log(err);
				toast.error('Training ticket could not be found');
			});
	};
	const onClickConfirmAttendance = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		fetch('/api/confirm-training-attendance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: attendanceData }),
		})
			.then(res => res.json())
			.then(response => {
				if (!response.error) {
					setPageLocation(VerifyTicketEnum.TicketConfirmSuccess);
					toast.success('Training ticket confirmed successfully!');
				}
				if (response.error) {
					toast.error(response.error);
				}
			})
			.catch(err => {
				console.log(err);
				toast.error('Training ticket could not be confirmed!');
			});
	};

	const reloadPage = () => {
		setPageLocation(VerifyTicketEnum.TicketEntryForm);
		setAttendanceData(null);
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
			{pageLocation === VerifyTicketEnum.TicketConfirmation &&
				attendanceData && (
					<ConfirmSection>
						<span
							className="back-btn"
							onClick={() => setPageLocation(VerifyTicketEnum.TicketEntryForm)}>
							<ArrowBack />
							<span>Back</span>
						</span>
						<ConfirmTitle>
							<p className="training-title">{attendanceData?.title}</p>
							<p className="training-email">
								Ordered By: {attendanceData?.trainingOrderedBy}
							</p>
						</ConfirmTitle>
						<ConfirmBody>
							<InfoTile>
								<div className="icon">
									<MoneyIcon />
								</div>
								<div className="info-section">
									<p className="info">1 x Ticket</p>
									<p className="description">
										Amount{' '}
										<span className="outlined">
											{attendanceData?.amountPaid &&
												priceFormatter.format(attendanceData?.amountPaid)}
										</span>
									</p>
								</div>
							</InfoTile>
							<InfoTile>
								<div className="icon">
									<People />
								</div>
								<div className="info-section">
									<p className="info">
										{attendanceData?.firstName} {attendanceData?.lastName}
									</p>
								</div>
							</InfoTile>
							<InfoTile>
								<div className="icon">
									<Time />
								</div>
								<div className="info-section">
									<p className="info">
										{attendanceData?.trainingDate &&
											formatDate(new Date(attendanceData.trainingDate))}
									</p>
								</div>
							</InfoTile>
							<InfoTile>
								<div className="icon">
									<Location />
								</div>
								<div className="info-section">
									<p className="info">{attendanceData?.trainingLocation}</p>
								</div>
							</InfoTile>
							<InfoTile>
								<div className="icon">
									<Calender />
								</div>
								<div className="info-section">
									<p className="info">Ticket no.</p>
									<p className="description">{attendanceData?.participantId}</p>
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

			{pageLocation === VerifyTicketEnum.TicketConfirmSuccess && (
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

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const session = await getSession(ctx.req, ctx.res);

		if (!session?.user) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			};
		}

		return {
			props: {},
		};
	},
});

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

	& .back-btn {
		cursor: pointer;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		font-size: 0.8rem;
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
