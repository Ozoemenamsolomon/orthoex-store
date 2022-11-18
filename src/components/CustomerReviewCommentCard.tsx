import styled from "styled-components";

const CustomerReviewCommentCard: React.FC<{
	reviewer: string;
	date: string;
	comment: string;
}> = ({ reviewer, date, comment }) => (
	<CommentCardContainer>
		<h4>{reviewer}</h4>
		<p>{new Date(date).toDateString()}</p>
		<p>{comment}</p>
	</CommentCardContainer>
);
const CommentCardContainer = styled.div`
	background: rgb(255, 255, 255);
	box-shadow: rgba(221, 221, 221, 0.24) 8px 8px 64px;
	padding: 1rem;
`;

export default CustomerReviewCommentCard;
