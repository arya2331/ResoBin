import styled from 'styled-components'
import { User } from '@styled-icons/feather'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleHeader = styled.h4`
  font-weight: 300;
  font-size: 1.75rem;
  line-height: 2rem;
  letter-spacing: 4px;
  padding: 0.5rem 0px 1rem;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`

const Title = () => {
  return (
    <TitleContainer>
      <User size="4rem" />
      <TitleHeader>Login</TitleHeader>
    </TitleContainer>
  )
}

export default Title