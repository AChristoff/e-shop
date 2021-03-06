import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ITEMS_PER_PAGE } from '../constants/generalConstants'

const Paginate = ({ route = '', query = {}, pages, page }) => {

  // How many pages will be visible in the pagination
  const allPages = [...Array(pages).keys()].map(x => x + 1) // array from 1 to max visible pages
  const visiblePagesCount = allPages.length || 5 // number of visible pages
  const from = page-3 <0 ? 0 : page-3
  const to = page+2
  // Ranged pages array 
  let visiblePages = allPages.slice(from, to)

  // Update ranged pages if current page is close to the end
  if (visiblePages.length < visiblePagesCount) {
    const first = allPages.slice(0, 1)[0]
    const last = allPages.slice(-1)[0]
    const currentFirst = visiblePages.slice(0, 1)[0]
    const currentLast = visiblePages.slice(-1)[0]
    const dif = visiblePagesCount - visiblePages.length
  
    if(dif === 1 && last === currentLast) {
      visiblePages.unshift(currentFirst - 1)
    } else if(dif === 1 && first === currentFirst) {
      visiblePages.push(currentLast + 1)
    } else if(dif === 2 && first === currentFirst) {
      visiblePages.push(currentLast + 1)
      visiblePages.push(currentLast + 2)
    } else if(dif === 2 && last === currentLast) {
      visiblePages.unshift(currentFirst - 1)
      visiblePages.unshift(currentFirst - 2)
    }
  }

  // Set Query params fallbacks
  const limit = query.limit || ITEMS_PER_PAGE
  const search = query.search || ''
  const category = query.category || ''

  const disabled = pages <= 1 ? 'disabled' : ''
  const start = page === 1 ? 'disabled' : ''
  const end = pages === page ? 'disabled' : ''
  
  return (
    <Pagination className='ml-auto'>

      <LinkContainer LinkContainer to={`${route}/q?page=${1}&limit=${limit}&search=${search}&category=${category}`}> 
        <Pagination.First  disabled={disabled || start} />
      </LinkContainer>

      <LinkContainer to={`${route}/q?page=${page - 1}&limit=${limit}&search=${search}&category=${category}`}>
        <Pagination.Prev  disabled={disabled || start} />
      </LinkContainer>
          
      {visiblePages.map(x => (
        <LinkContainer key={x}
        to={`${route}/q?page=${x}&limit=${limit}&search=${search}&category=${category}`}>
          <Pagination.Item disabled={disabled} active={x === page}>{x}</Pagination.Item>
        </LinkContainer>
      ))}
    
      <LinkContainer to={`${route}/q?page=${page + 1}&limit=${limit}&search=${search}&category=${category}`}>
        <Pagination.Next  disabled={disabled || end} />
      </LinkContainer>

      <LinkContainer to={`${route}/q?page=${pages}&limit=${limit}&search=${search}&category=${category}`}>
        <Pagination.Last  disabled={disabled || end} />
      </LinkContainer>

    </Pagination>
  )
}

export default Paginate