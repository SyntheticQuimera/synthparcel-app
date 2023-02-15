import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigator/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../Navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useOrders from '../hooks/useOrders';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList, "Orders">,
    NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const { loading, error, orders } = useOrders();
    const [ascending, setAscending] = useState<boolean>(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            tabBarLabel: ({ focused, color }) => (
                <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10, marginTop: -4, marginBottom: 6 }} >Orders</Text>
            )
        });

    }, [])


    return (
        <ScrollView className='bg-[#EB6A7C]'>
            <SafeAreaView className='mb-4'>
                <Image
                    className='w-full h-64 -mt-6'
                    source={require("../assets/3156619-ai.png")}
                />
                <View>
                    <Button
                        color="pink"
                        titleStyle={{ color: "gray", fontWeight: "400" }}
                        containerStyle={{ paddingVertical: 8, paddingHorizontal: 20 }}
                        onPress={() => setAscending(!ascending)}
                    >
                        {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
                    </Button>

                    {orders?.sort((a, b) => {
                        if (ascending) {
                            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                        } else {
                            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;

                        }
                    }).map((order) => (<OrderCard key={order.trackingId} item={order} />

                    ))}

                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default OrdersScreen