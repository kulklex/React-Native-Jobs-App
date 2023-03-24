    // Note that another useFetch function was created because the external api limits requests due to the fact that we are using a free service
    // Hence to avoid 429 error, i created a new function that calls only after 10s (a time by which the first api call is expected to have been concluded with)

import React, {useState, useEffect} from "react"
import axios from "axios"
import {RAPID_API_KEY} from '@env'

export const rapidAPIKey = RAPID_API_KEY

 const useFetchB = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          'X-RapidAPI-Key': rapidAPIKey,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };
    
    const fetchData = async () => {
        setIsLoading(true)

        setTimeout(async () => {
            try {
                const {data: {data}} = await axios.request(options)
    
                setData(data)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }, 10000)
      }

    useEffect(() => {
        fetchData()
    }, [])

    // Because at times there are problems with loading data after the first loading state
    const refetchData = () => {
        setIsLoading(true)
        fetchData()
    }


    return  {data, isLoading, error, refetchData}


}


export default useFetchB

