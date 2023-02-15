import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TabStackParamList } from '../Navigator/TabNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigator/RootNavigator'
import DeliveryCard from '../components/DeliveryCard'

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">

export type OrdersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, "Orders">,
    NativeStackNavigationProp<RootStackParamList>>

const OrderScreen = () => {
    const navigation = useNavigation<OrdersScreenNavigationProp>()
    const {
        params: { order }
    } = useRoute<OrderScreenRouteProp>()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name,
            headerTintColor: "#EB6A7C",
            headerBackTitle: "Deliveries",
            headerTitleStyle: { color: "black" },

        })
    }, [order])
    return (
        <View className='-mt-2' >
            <DeliveryCard order={order} fullWidth />
        </View>
    )
}

export default OrderScreen