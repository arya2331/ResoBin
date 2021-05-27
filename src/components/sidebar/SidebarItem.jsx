import styled from 'styled-components'

const Container = styled.div`
	min-height: 4rem;
	width: 100%;
	padding: 0px 0.75rem;

	display: flex;
	flex-direction: row;
	cursor: pointer;

	color: ${(props) => (props.active ? props.theme.textColor : props.theme.textColorInactive)};
	background-color: ${(props) => (props.active ? props.theme.headerNumber : props.theme.secondary)};
	border-left: 3px solid ${(props) => (props.active ? props.theme.activeMenu : 'transparent')};

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
		text-decoration: underline;
		text-underline-offset: 1px;
		box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.24);
	}
`

const IconContainer = styled.div`
	width: 30%; /* width: 60px */
	padding-left: 6px;
	min-height: 100%;
	display: flex;
	align-items: center;
`

const Title = styled.h4`
	font-weight: 400;
	min-height: 100%;
	width: 70%;

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	letter-spacing: 1.5px;

	display: flex;
	align-items: center;
`

const SidebarItem = ({ title, icon, active }) => {
	return (
		<Container active={active}>
			<IconContainer>{icon}</IconContainer>
			<Title active={active}>{title}</Title>
		</Container>
	)
}

export default SidebarItem