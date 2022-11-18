import { FC } from "react";
import styled from "styled-components";

const StarPercentage: FC<{ star: number; percent: number }> = ({
	star,
	percent,
}) => (
	<StarPercentageContainer>
		<span>{star} stars</span>
		<StarPercentageRest>
			<StarPercentageIndicator starPercent={percent}></StarPercentageIndicator>
		</StarPercentageRest>
	</StarPercentageContainer>
);

const StarPercentageContainer = styled.div`
	display: flex;
	gap: 1rem;
`;
const StarPercentageRest = styled.div`
	flex: 1;
	background: var(--oex-orange-mute);
`;
const StarPercentageIndicator = styled.div<{ starPercent: number }>`
	height: 100%;
	width: ${({ starPercent }) => starPercent + "%"};
	background: var(--oex-orange);
`;

export default StarPercentage;
