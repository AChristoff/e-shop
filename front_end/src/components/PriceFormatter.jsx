const PriceFormatter = ({
  price = 0,
  fraction = 2,
  currency = 'EUR',
  location = 'bg-BG',
}) => {
  const formattedPrice = new Intl.NumberFormat(location, {
    style: 'currency',
    currency,
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(price)

  return (
    <span style={{ textTransform: 'initial' }} className='formatted-price'>
      {formattedPrice}
    </span>
  )
}

export default PriceFormatter
