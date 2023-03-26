import React, {useCallback, useState} from 'react'
import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from 'react-native'
import {Stack, useRouter, useSearchParams} from 'expo-router'
import styles from '../../components/home/popular/popularjobs.style'
import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../utils/useFetch'


 const JobDetails = () => {
    const params = useSearchParams()
    const router = useRouter()

    const {data, isLoading, error, refetchData} = useFetch("job-details", {job_id: params.id})
    
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetchData()
        setRefreshing(false)
      }, [])


    const tabs = ["About", "Qualifications", "Responsibilities"]
    const [activeTab, setActiveTab] = useState(tabs[0])

    const displayTabContent = () => {
        switch(activeTab) {
            case "Qualifications":
                return <Specifics 
                            title="Qualifications"
                            points={data[0]?.job_highlights?.Qualifications ?? ['N/A']}
                        />
            case "Responsibilities":
                return <Specifics 
                            title="Responsibilities"
                            points={data[0]?.job_highlights?.Responsibilities ?? ['N/A']}
                        />
            case "About":
                return  <JobAbout
                            info={data[0]?.job_description ?? "No data provided"}
                        />
            default:
                return null;
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: COLORS.lightWhite}, 
                headerShadowVisible: false,
                headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />), 
                headerRight: () => (<ScreenHeaderBtn iconUrl={icons.share} dimension="60%" handlePress={() => router.back()} />),
                headerTitle: "", 
                }} 
            />
            

            <ScrollView 
                showsHorizontalScrollIndicator={false} 
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading 
                ? (<ActivityIndicator size="large" color={COLORS.primary} />)
                : error ? (<Text style={styles.error}>Something went wrong</Text>) 
                        : data.length === 0 
                            ?  (<Text style={styles.header}>No Data</Text>)
                            : (<View style={{padding: SIZES.medium, paddingBottom: 100}}>
                                 <Company 
                                    companyLogo={data[0].employer_logo}
                                    jobTitle={data[0].job_title}
                                    companyName={data[0].employer_name}
                                    location={data[0].job_country}
                                 />
                                 <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                 />  
                                
                                 {displayTabContent()} 
                            </View>)
                }
            </ScrollView>

            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.goggle.com/jobs/results'} />
        </SafeAreaView>
    )
}


export default JobDetails