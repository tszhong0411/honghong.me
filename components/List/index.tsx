import { StyledList } from './List'

const List = (props) => {
  const { variant = 'unordered', children, ...rest } = props

  const Component = variant === 'ordered' ? 'ol' : 'ul'

  return (
    <StyledList as={Component} {...rest}>
      {children}
    </StyledList>
  )
}

export default List
