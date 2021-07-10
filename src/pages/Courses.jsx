import { Filter, X } from '@styled-icons/heroicons-outline'
import { CourseList } from 'components/courses'
// import { Filters } from 'components/filter'
import { useLocalStorage } from 'hooks'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;

  @media (min-width: 992px) {
    margin-left: 9rem;
  }
`

const IconContainer = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 1.5rem;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: white;
  background: ${({ theme }) => theme.logo};
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.6);
  cursor: pointer;
`

const Courses = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', false)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container showFilters={showFilters}>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <IconContainer showFilters={showFilters} onClick={handleClick}>
        {showFilters ? <X size="1.5rem" /> : <Filter size="1.5rem" />}
      </IconContainer>

      <CourseList showFilters={showFilters} onClick={handleClick} />

      {/* <Filters showFilters={showFilters} onClick={handleClick} /> */}
    </Container>
  )
}

export default Courses
