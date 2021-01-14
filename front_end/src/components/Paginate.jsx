import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ route = '', query = {}, pages, page }) => {

  const limit = query.limit || 2
  const keyword = query.keyword || ''
  const filters = query.filters || ''
  
  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map(x => (
        <LinkContainer key={x + 1}
        to={`${route}/q?page=${x + 1}&limit=${limit}&search=${keyword}&filters=${filters}`}>
          <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate