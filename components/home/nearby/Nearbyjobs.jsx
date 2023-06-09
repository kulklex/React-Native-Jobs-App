import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import  useFetch  from '../../../utils/useFetch'
import styles from './nearbyjobs.style'
import { useRouter } from 'expo-router'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'



const Nearbyjobs = () => {
  const router = useRouter()

  const {data, isLoading, error} = useFetch('search', {query: 'React Native', num_pages: 1})
  

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        {/* <TouchableOpacity>
          <Text style={styles.headerBtn}><MdReduceCapacity /></Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading 
          ? (<ActivityIndicator size="large" color={COLORS.primary} />)
          : error ? (<Text style={styles.error}>Something went wrong</Text>) 
                  : (data?.map((job) => (
                    <NearbyJobCard 
                      job={job} key={`nearby-job-${job?.job_id}`}
                      handleNavigate={() => router.push( `details/${job?.job_id}`)} />
                  )))
        }
      </View>
    </View>
  )
}

export default Nearbyjobs