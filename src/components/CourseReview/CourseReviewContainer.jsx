import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons'
import { PencilAlt, UserAdd } from '@styled-icons/heroicons-outline'
import { Avatar, Comment, Tooltip } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import styled from 'styled-components/macro'

import { ButtonSwitch } from 'components/shared/Buttons/Button'

import reviewsData from './__mock__/reviewsData'
import CourseReviewAdd from './CourseReviewAdd'

const CommentHeader = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.header};
`

const CommentText = styled.p`
  width: 80%;
  font-weight: 400;
  color: ${({ theme }) => theme.header};
`

const CourseReviewsContainer = () => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState(null)

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <button type="button" onClick={like}>
        {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
        <span className="comment-action">{likes}</span>
      </button>
    </Tooltip>,

    <Tooltip key="comment-basic-dislike" title="Dislike">
      <button type="button" onClick={dislike}>
        {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
        <span className="comment-action">{dislikes}</span>
      </button>
    </Tooltip>,

    <span key="comment-basic-reply-to">Reply to</span>,
  ]

  const [writeStatus, setWriteStatus] = useState(false)
  const toggleWrite = () => setWriteStatus((v) => !v)
  const [reviewStatus, setReviewStatus] = useState(false)

  const handleReviewRequest = () => setReviewStatus((v) => !v)

  // ! make write review button primary

  return (
    <>
      <ReviewOptions>
        <ButtonSwitch
          type="primary"
          active={writeStatus ? 1 : 0}
          onClick={toggleWrite}
        >
          {!writeStatus ? (
            <>
              <PencilAlt size="18" style={{ marginRight: '0.5rem' }} />
              Write
            </>
          ) : (
            <>Cancel review</>
          )}
        </ButtonSwitch>

        <ButtonSwitch
          type="primary"
          active={reviewStatus ? 1 : 0}
          onClick={handleReviewRequest}
        >
          {!reviewStatus ? (
            <>
              <UserAdd size="18" style={{ marginRight: '0.5rem' }} />
              Request
            </>
          ) : (
            <>Cancel request</>
          )}
        </ButtonSwitch>
      </ReviewOptions>

      {writeStatus && <CourseReviewAdd />}

      {reviewsData.map(({ author, avatar, content }) => (
        <Comment
          key={`${author} - ${content}`}
          actions={actions}
          author={
            <a href="google">
              <CommentHeader>{author}</CommentHeader>
            </a>
          }
          avatar={<Avatar src={avatar.src} alt={avatar.alt} />}
          content={<CommentText>{content}</CommentText>}
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <CommentHeader>{moment().fromNow()}</CommentHeader>
            </Tooltip>
          }
        >
          <Comment
            actions={actions}
            author={<a href="google">{author}</a>}
            avatar={<Avatar src={avatar.src} alt={avatar.alt} />}
            content={<p>{content}</p>}
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        </Comment>
      ))}
    </>
  )
}

export default CourseReviewsContainer

const ReviewOptions = styled.div`
  display: flex;
  gap: 1rem;
`