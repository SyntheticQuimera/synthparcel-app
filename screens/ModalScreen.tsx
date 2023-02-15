import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../Navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigator/RootNavigator'
import useCustomerOrders from '../hooks/useCustomerOrders'
import DeliveryCard from '../components/DeliveryCard'

type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamList, "MyModal">>

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">

const ModalScreen = () => {
    const navigation = useNavigation<ModalScreenNavigationProp>();
    const {
        params: { name, userId },
    } = useRoute<ModalScreenRouteProp>();

    const { loading, error, orders } = useCustomerOrders(userId)

    return (
        <View>
            <TouchableOpacity
                onPress={navigation.goBack}
                className='absolute right-5 top-8 z-10'
            >
                <Icon name='closecircle' type='antdesign' />
            </TouchableOpacity>
            <View className='mt-6 ' >
                <View className='py-5 border-b border-[#59ccaf]' >
                    <Text className='text-center text-xl font-bold text-[#59ccaf]'>{name}</Text>
                    <Text className='text-center italic text-sm' >deliveries</Text>
                </View>
            </View>
            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                data={orders}
                keyExtractor={order => order.trackingId}
                renderItem={({ item: order }) => <DeliveryCard order={order} />}
            />
        </View>
    )
}

export default ModalScreen