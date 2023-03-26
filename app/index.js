import React, { useState } from 'react'
import {View, ScrollView, SafeAreaView} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import {COLORS, icons, SIZES} from '../constants'
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from '../components'



const Home = () => {
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('')
 
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite,  padding: '5px',}}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: COLORS.lightWhite, padding: '5px'},
                headerShadowVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                ),
                headerTitle: "",
            }} />

            <ScrollView showsHorizontalScrollIndicator={false} >
                <View style={{flex: 1, padding: SIZES.medium}}>
                    <Welcome
                     searchTerm={searchTerm}
                     setSearchTerm={setSearchTerm}
                     handleClick={() => {
                        if (searchTerm) router.push(`/search/${searchTerm}`)
                     }} 
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}



export default Home