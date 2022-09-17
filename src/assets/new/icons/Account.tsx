const Account = ({ colour = 'black' }) => (
	<svg
		width="25"
		height="24"
		viewBox="0 0 25 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.5674 2C11.2542 2 9.9538 2.25866 8.74055 2.7612C7.52729 3.26375 6.4249 4.00035 5.49632 4.92893C3.62095 6.8043 2.56738 9.34784 2.56738 12C2.56738 14.6522 3.62095 17.1957 5.49632 19.0711C6.4249 19.9997 7.52729 20.7362 8.74055 21.2388C9.9538 21.7413 11.2542 22 12.5674 22C15.2195 22 17.7631 20.9464 19.6385 19.0711C21.5138 17.1957 22.5674 14.6522 22.5674 12C22.5674 10.6868 22.3087 9.38642 21.8062 8.17317C21.3036 6.95991 20.567 5.85752 19.6385 4.92893C18.7099 4.00035 17.6075 3.26375 16.3942 2.7612C15.181 2.25866 13.8806 2 12.5674 2ZM7.63738 18.28C8.06738 17.38 10.6874 16.5 12.5674 16.5C14.4474 16.5 17.0674 17.38 17.4974 18.28C16.0968 19.396 14.3583 20.0026 12.5674 20C10.7074 20 8.99738 19.36 7.63738 18.28ZM18.9274 16.83C17.4974 15.09 14.0274 14.5 12.5674 14.5C11.1074 14.5 7.63738 15.09 6.20738 16.83C5.14357 15.4446 4.56705 13.7467 4.56738 12C4.56738 7.59 8.15738 4 12.5674 4C16.9774 4 20.5674 7.59 20.5674 12C20.5674 13.82 19.9474 15.5 18.9274 16.83ZM12.5674 6C10.6274 6 9.06738 7.56 9.06738 9.5C9.06738 11.44 10.6274 13 12.5674 13C14.5074 13 16.0674 11.44 16.0674 9.5C16.0674 7.56 14.5074 6 12.5674 6ZM12.5674 11C12.1696 11 11.788 10.842 11.5067 10.5607C11.2254 10.2794 11.0674 9.89782 11.0674 9.5C11.0674 9.10218 11.2254 8.72064 11.5067 8.43934C11.788 8.15804 12.1696 8 12.5674 8C12.9652 8 13.3467 8.15804 13.628 8.43934C13.9093 8.72064 14.0674 9.10218 14.0674 9.5C14.0674 9.89782 13.9093 10.2794 13.628 10.5607C13.3467 10.842 12.9652 11 12.5674 11Z"
			fill={colour}
		/>
	</svg>
);
export default Account;