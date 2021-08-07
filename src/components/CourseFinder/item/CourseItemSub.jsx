import {
  DocumentText,
  ChatAlt2,
  Calendar,
} from '@styled-icons/heroicons-outline'
import { Button, Tabs } from 'antd'
import { darken, lighten, rgba } from 'polished'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { coursePageUrl } from 'paths'
import { selectCourseSlotsByCourseCode } from 'store/courseSlice'
import { selectTimetableStatus, updateTimetable } from 'store/userSlice'

import CourseWorkload from './CourseWorkload'

const SemesterItem = ({ courseCode, semester }) => {
  const dispatch = useDispatch()
  const status = useSelector(selectTimetableStatus({ courseCode, semester }))
  const handleClick = () => dispatch(updateTimetable({ courseCode, semester }))

  return (
    <StyledButton
      type="primary"
      active={status}
      icon={<Calendar size="18" style={{ marginRight: '0.5rem' }} />}
      onClick={handleClick}
    >
      {status ? 'Remove' : 'Add to timetable'}
    </StyledButton>
  )
}

// ? semester = ['autumn', 'spring']
const CourseItemSub = ({ courseData }) => {
  const { Code: code, Structure: structure, Title: title } = courseData
  const isRunning = useSelector(selectCourseSlotsByCourseCode(code))
  const reviewCount = 2
  const resourceCount = 2

  const semTabInitialValue = isRunning ? 'autumn' : null

  return (
    <>
      {semTabInitialValue ? (
        <StyledTabs defaultActiveKey={semTabInitialValue}>
          <Tabs.TabPane tab="Autumn" disabled={!isRunning} key="autumn">
            <SemesterItem courseCode={code} semester="autumn" />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Spring" key="spring" disabled>
            <SemesterItem semester="spring" />
          </Tabs.TabPane>
        </StyledTabs>
      ) : (
        <Title style={{ marginBottom: '1rem', opacity: 0.8 }}>
          Timetable entry not found
        </Title>
      )}

      <CourseWorkload workload={structure} />

      <Link to={`${coursePageUrl(code, title)}#reviews`}>
        <StyledButton
          shape="round"
          icon={<ChatAlt2 size="18" style={{ marginRight: '0.5rem' }} />}
        >
          Reviews ({reviewCount})
        </StyledButton>
      </Link>
      <Link to={`${coursePageUrl(code, title)}#resources`}>
        <StyledButton
          shape="round"
          icon={<DocumentText size="18" style={{ marginRight: '0.5rem' }} />}
        >
          Resources ({resourceCount})
        </StyledButton>
      </Link>
    </>
  )
}

export default CourseItemSub

const StyledTabs = styled(Tabs)`
  color: ${({ theme }) => theme.textColor};

  .ant-tabs-nav {
    height: 1.75rem;
    margin-bottom: 0.5rem;

    .ant-tabs-ink-bar {
      height: 3px;
      background: ${({ theme }) => theme.textColor};
    }
  }

  .ant-tabs-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    padding: 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-size: 0.75rem;

    & + .ant-tabs-tab {
      margin: 0;
    }

    .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.textColor};
    }

    /* Disabled button */
    &.ant-tabs-tab-disabled {
      .ant-tabs-tab-btn,
      .ant-tabs-tab-btn:active {
        color: ${({ theme }) => rgba(theme.textColor, 0.2)};
      }
    }

    /* Normal button */
    &:not(.ant-tabs-tab-disabled) {
      &:hover {
        color: ${({ theme }) => darken(0.2, theme.textColor)};
      }

      &.ant-tabs-tab-active {
        color: ${({ theme }) => theme.textColor};
        background: ${({ theme }) => theme.darksecondary};
      }

      &:not(.ant-tabs-tab-active):hover {
        background: ${rgba('#000000', 0.15)};
      }
    }
  }
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.75rem;
  padding: 0 1rem;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textColor};
  background: ${({ theme }) => theme.darksecondary};

  &:active,
  &:focus {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.darksecondary};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.4, theme.darksecondary)};
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  }

  &.ant-btn-primary {
    margin-bottom: 1rem;
    background-color: ${({ active, theme }) =>
      lighten(active ? 0.4 : 0, theme.darksecondary)};

    &:hover {
      background: ${({ active, theme }) =>
        lighten(active ? 0.45 : 0.4, theme.darksecondary)};
    }
  }
`

const Title = styled.span`
  display: block;
  margin: 0 0.25rem 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textColor};
`
