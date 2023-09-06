import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"

const HomeScreen = () => {

    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState("loading your current location")

    useEffect(() => {
        checkLocationServiceEnabled()
        getCurrentLocation()
    }, [])

    const checkLocationServiceEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync()
        console.log(enabled);

        if (!enabled) {
            Alert.alert(
                'Location service not enabled',
                'please enable location services',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false })
        } else {
            setLocationServiceEnabled(enabled)
        }
    }

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        console.log(status);
        if (status !== "granted") {
            Alert.alert(
                'Permission denied',
                'please enable location services',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false })
        }

        const { coords } = await Location.getCurrentPositionAsync()
        console.log(coords);
        if (coords) {
            const { latitude, longitude } = coords

            let response = await Location.reverseGeocodeAsync({
                latitude, longitude
            })

            console.log(response);

            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`
                setDisplayCurrentAddress(address)
            }
        }
    }

    return (
        <SafeAreaView>
            <Text>HomeScreen</Text>
        </SafeAreaView>
    )
}

export default HomeScreen