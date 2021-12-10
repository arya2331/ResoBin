import { lighten, rgba } from 'polished'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components/macro'
import { CloudUpload } from 'styled-icons/heroicons-outline'

import { fontSize } from 'styles/responsive'

import { fileTypes } from './fileDetails'

const DragNDrop = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: fileTypes.map((file) => file.type),
      onDrop,
    })

  let message = null
  if (!isDragActive)
    message = (
      <h2>
        Drag & drop to upload
        <br />
        or click to browse files
      </h2>
    )
  else if (isDragReject) message = <h2>Invalid upload format</h2>
  else message = <h2>Drop files here</h2>

  return (
    <UploadBox {...getRootProps()} isDragReject={isDragReject}>
      <input {...getInputProps()} />

      <CloudUpload size="60" />

      {message}

      <span>
        Accepted formats: .pdf, .doc, .ppt
        <br />
        Maximum upload file size: 20MB
      </span>
    </UploadBox>
  )
}

export default DragNDrop

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 3rem 1rem;
  cursor: pointer;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme, isDragReject }) =>
    isDragReject ? '#f34a4a' : theme.textColorInactive};
  outline: 3px dashed ${({ theme }) => rgba(theme.textColorInactive, 0.4)};
  outline-offset: -0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  h2 {
    font-size: ${fontSize.responsive.md};
  }

  &:hover {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => lighten(0.1, theme.secondary)};
    outline-color: ${({ theme }) => theme.textColorInactive};
  }
`