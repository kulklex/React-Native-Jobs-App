import React, {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import {COLORS, SIZES} from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import  useFetchB  from '../../../utils/useFetchB'

const Popularjobs = () => {
  const router = useRouter()

  const {data, isLoading, error} = useFetchB('search', {query: 'React developer', num_pages: 1})

  const [selectedJob, setSelectedJob] = useState('')

  const handleCardPress = (item) => {
    router.push(`details/${item.job_id}`)
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        {/* <TouchableOpacity>
          <Text style={styles.headerBtn}><MdTrendingUp /></Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading 
          ? (<ActivityIndicator size="large" color={COLORS.primary} />)
          : error ? (<Text style={styles.error}>Something went wrong</Text>) 
                  : (<FlatList 
                        data={data} 
                        renderItem={({item}) => (<PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />)} 
                        keyExtractor={item => item?.job_id} 
                        contentContainerStyle={{columnGap: SIZES.medium}}
                        horizontal/>
            )
        }
      </View>
    </View>
  )
}

export default Popularjobs