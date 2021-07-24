import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

import { CourseBody } from 'components/courses/course-finder'
import { device } from 'styles/responsive'

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});

  @media ${device.min.md} {
    margin-left: ${({ theme }) => theme.asideWidthLeft};
  }
`

const CourseFinder = () => {
  return (
    <Container>
      <Helmet>
        <title>Courses - ResoBin</title>
        <meta name="description" content="Courses availabe at IIT Bombay" />
      </Helmet>

      <CourseBody />
    </Container>
  )
}

export default CourseFinder