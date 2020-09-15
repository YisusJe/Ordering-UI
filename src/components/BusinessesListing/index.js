import React, { useEffect, useState } from 'react'
import {
  BusinessContainer,
  BusinessList,
  ErrorMessage
} from './styles'

import { BusinessTypeFilter } from '../BusinessTypeFilter'
import { BusinessController } from '../BusinessController'

export const BusinessesListing = (props) => {
  const {
    ordering
  } = props

  const [businessesList, setBusinessesList] = useState({ businesses: [], loading: true, error: null })
  const [paginationProps, setPaginationProps] = useState({ currentPage: null, pageSize: 20, totalPages: null })
  const [businessTypeSelected, setBusinessTypeSelected] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  const hasMore = !(paginationProps.totalPages === paginationProps.currentPage)

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching || !hasMore) return
    setIsFetching(true)
  }

  const getBusinesses = async () => {
    try {
      setBusinessesList({
        ...businessesList,
        loading: true
      })
      // const params = ['id', 'name', 'header', 'logo', 'name', 'today', 'delivery_price', 'minimum', 'description', 'distance', 'delivery_time', 'pickup_time', 'reviews', 'featured', 'offers']
      const parameters = {
        location: '40.7539143,-73.9810162', // provide this props from search options component
        type: 1 // provide this props from search options component
        // page: paginationProps.page + 1,
        // page_size: paginationProps.pageSize
      }
      const where = businessTypeSelected ? [{ attribute: businessTypeSelected, value: true }] : []
      const { content: { result, pagination } } = await ordering.businesses().parameters(parameters).where(where).get()
      setBusinessesList({
        ...businessesList,
        loading: false,
        businesses: isFetching ? [...businessesList.businesses, ...result] : result
      })
      setIsFetching(false)
      setPaginationProps({
        ...paginationProps,
        currentPage: pagination.current_page,
        totalPages: pagination.total_pages
      })
    } catch (e) {
      setBusinessesList({
        ...businessesList,
        loading: false,
        error: [e]
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    getBusinesses()
  }, [isFetching])

  useEffect(() => {
    getBusinesses()
  }, [businessTypeSelected])

  // const handlerClickBusiness = (e) => { console.log('VALUE', e) }

  return (
    <BusinessContainer>
      <BusinessTypeFilter
        ordering={props.ordering}
        handleChangeBusinessType={(val) => setBusinessTypeSelected(val)}
      />
      <BusinessList>
        {isFetching ? (
          businessesList.businesses && businessesList.businesses.length > 0 ? (
            businessesList.businesses.map((item, i) => (
              <BusinessController
                key={i}
                ordering={props.ordering}
                business={item}
                // handleCustomClick={(e) => handlerClickBusiness(e)}
              />
            ))
          ) : (
            <h1>Not Found elementss </h1>
          )
        ) : (
          !businessesList.loading && !businessesList.error &&
            businessesList.businesses && businessesList.businesses.length > 0 ? (
              businessesList.businesses.map((item, i) => (
                <BusinessController
                  key={i}
                  ordering={props.ordering}
                  business={item}
                  // handleCustomClick={(e) => handlerClickBusiness(e)}
                />
              ))
            ) : (
              !businessesList.loading && !businessesList.error && (<h1>Not Found elements </h1>)
            )
        )}
        {businessesList.loading && [...Array(isFetching ? 3 : 6).keys()].map(i => (
          <BusinessController
            business={{}}
            ordering={props.ordering}
            key={i}
            isSkeleton
          />
        ))}
        {businessesList.error && businessesList.error.length > 0 && (
          businessesList.error.map((e, i) => (
            <ErrorMessage key={i}>ERROR: [{e.message}]</ErrorMessage>
          ))
        )}
      </BusinessList>
    </BusinessContainer>
  )
}