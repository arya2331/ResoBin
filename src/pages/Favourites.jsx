import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useLocalStorage } from 'hooks'
import { CourseList, CourseSearch, Filters } from 'components/courses'

const Container = styled.div`
  display: flex;
  margin: 0rem 0 0 11.5rem;
`

const Favourites = () => {
  const [showFilters, setShowFilters] = useLocalStorage('CourseFilter', true)
  const handleClick = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <Helmet>
        <title>Favourites - ResoBin</title>
        <meta name="description" content="Your favourite courses" />
      </Helmet>

      <CourseSearch showFilters={showFilters} onClick={handleClick} />
      <CourseList showFilters={showFilters} />
      <Filters showFilters={showFilters} onClick={handleClick} />
    </Container>
  )
}

export default Favourites