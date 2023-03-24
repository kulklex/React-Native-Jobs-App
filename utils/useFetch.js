import React, {useState, useEffect} from "react"
import axios from "axios"
import {RAPID_API_KEY} from '@env'

export const rapidAPIKey = RAPID_API_KEY

export const useFetch = (endpoint, query) => {
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
