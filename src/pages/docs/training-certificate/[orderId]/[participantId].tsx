import CTA from '@components/CTA';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import Logo from '@assets/new/logos/brand-logo.png';
import TopPaintIcon from '@assets/new/images/top_cert_paint.png';
import BottomPaintIcon from '@assets/new/images/bottom_cert_paint.png';
import { TrainingAttendanceType } from '@data/types/trainingTypes/TypeOrthoexTrainingData';
import { formatDate } from '@utils/index';
import { toast } from 'react-toastify';

const TrainingCertificate = () => {
	// @ts-ignore
	const { user } = useUser();
	const router = useRouter();
	const pdfRef = useRef<HTMLDivElement>(null);

	const [attendanceData, setAttendanceData] =
		useState<TrainingAttendanceType | null>(null);
	const orderId = router.query.orderId as string;
	const participantId = router.query.participantId as string;

	useEffect(() => {
		if (orderId && participantId) {
			fetch('/api/download-training-certificate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ orderId, participantId }),
			})
				.then(res => res.json())
				.then(response => {
					if (!response.error) {
						setAttendanceData(response.data);
					}
					if (response.error) {
						toast.error(response.error);
					}
				})
				.catch(err => {
					console.log(err);
					toast.error('Training Certificate could not be found');
				});
		}
	}, [orderId, participantId]);

	const downloadPdf = () => {
		const input = pdfRef.current as HTMLDivElement;
		html2canvas(input).then(canvas => {
			const pdf = new jsPDF('portrait', 'mm', 'a4', true);
			const imgData = canvas.toDataURL('img/png');
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight, imgHeight);
			const imgX = (pdfWidth - imgWidth * ratio) / 2;
			const imgY = 30;

			pdf.addImage(
				imgData,
				'PNG',
				imgX,
				imgY,
				imgWidth * ratio,
				imgHeight * ratio,
			);
			pdf.save('certificate.pdf');
		});
	};

	if (!user)
		return (
			<LoginWrapper>
				<Link
					href={`/api/auth/login?returnTo=${encodeURIComponent(
						router.asPath,
					)}`}>
					<CTA className="no-animate login-btn">Login to View Certificate</CTA>
				</Link>
			</LoginWrapper>
		);
	return (
		<div>
			{attendanceData && (
				<Wrapper>
					<DownloadSection>
						<CTA className="no-animate download-btn" onClick={downloadPdf}>
							Download
						</CTA>
					</DownloadSection>
					<CertificateSection ref={pdfRef}>
						<TopPaint>
							<Image
								className="top-image-icon"
								src={TopPaintIcon}
								sizes="50"
								alt="top-paint-icon"
							/>
						</TopPaint>
						<ImageDiv>
							<Image
								className="image"
								src={Logo}
								sizes="100"
								alt="brand-logo"
							/>
						</ImageDiv>
						<p className="heading-training">Training</p>
						<p className="heading-cert">Certificate</p>
						<p className="participant">
							{attendanceData?.firstName} {attendanceData?.lastName}
						</p>

						<p className="training-title">
							for attending {attendanceData?.title}
						</p>
						<p className="location-date">
							<span>{formatDate(new Date(attendanceData.trainingDate))}</span>
							<span>, {attendanceData.trainingLocation}</span>
						</p>
						<p className="signature">.......................</p>
						<BottomPaint>
							<Image
								className="image-icon"
								src={BottomPaintIcon}
								sizes="50"
								alt="top-paint-icon"
							/>
						</BottomPaint>
					</CertificateSection>
				</Wrapper>
			)}
		</div>
	);
};

export default TrainingCertificate;

const LoginWrapper = styled.div`
	margin: 5rem auto 5rem;
	max-width: 200px;
	min-height: 10vh;

	& .login-btn {
		font-size: 15px;
		padding: 10px 15px;
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	gap: 2rem;
	text-align: center;
	background-color: var(--oex-off-white);
`;
const TopPaint = styled.div`
	position: relative;
	margin-bottom: 1rem;

	& .top-image-icon {
		color: red;
		height: 50%;
		width: 80%;
	}
`;
const BottomPaint = styled.div`
	position: relative;
	margin-top: 1rem;

	& .image-icon {
		color: red;
		height: 50%;
		width: 80%;
	}
`;
const DownloadSection = styled.div`
	padding-top: 2rem;
	text-align: center;

	& .download-btn {
		font-size: 15px;
		padding: 10px 15px;
	}
`;
const CertificateSection = styled.div`
	margin: 0 auto;
	text-align: center;
	background-color: white;
	width: 80%;

	& .heading-training {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
		margin: 1.5rem 0 0.5rem;
	}
	& .heading-cert {
		text-transform: uppercase;
		font-size: 0.7rem;
		margin-bottom: 0.2rem;
	}
	& .participant {
		font-size: 1rem;
		font-family: 'Dancing Script', 'Lucida Handwriting', cursive;
		font-weight: 400;
		margin: 2rem 0;
	}

	& .training-title {
		text-transform: uppercase;
		font-size: 0.5rem;
	}

	& .location-date {
		text-transform: uppercase;
		margin: 1rem 0;
		font-size: 0.5rem;
		margin: 1rem 0 2rem;
	}

	& .line {
		width: 30%;
	}
	& .signature {
		text-transform: uppercase;
		margin: 2rem 0;
	}
	@media ${({ theme }) => theme.breakpoints.above.md} {
		// padding: 4rem 0;

		& .heading-training {
			text-transform: uppercase;
			font-size: 4rem;
			font-weight: 700;
			margin-bottom: 2rem 0;
		}
		& .heading-cert {
			text-transform: uppercase;
			font-size: 2.5rem;
			margin-bottom: 0.2rem;
		}
		& .participant {
			font-size: 2rem;
			margin: 3rem 0;
		}

		& .training-title {
			text-transform: uppercase;
			font-size: 1rem;
		}

		& .location-date {
			text-transform: uppercase;
			margin: 3rem 0;
			font-size: 1rem;
		}
		& .signature {
			text-transform: uppercase;
			margin: 2rem 0;
		}
	}
`;

const ImageDiv = styled.div`
	position: relative;

	& .image {
		height: 20%;
		width: 20%;
	}

	@media ${({ theme }) => theme.breakpoints.above.md} {
		// padding: 4rem 0;
`;
