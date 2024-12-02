import styled from '@emotion/styled'

export default function createStyled(tag, options) {
  if (options) {
    return styled(tag, options)
  }

  return styled(tag)
}
