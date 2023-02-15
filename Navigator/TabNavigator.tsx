import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
import CustomersScreen from '../screens/CustomersScreen'
import OrdersScreen from '../screens/OrdersScreen'
import { Icon } from "@rneui/themed";

export type TabStackParamList = {
    Customers: undefined;
    Orders: undefined;
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === "Customers") {
                        return (
                            <Icon name={focused ? "people" : "people-outline"} type='ionicon' color={focused ? "#59ccaf" : "gray"} />
                        )
                    } else if (route.name === "Orders") {
                        return (
                            <Icon name={focused ? "file-tray-full" : "file-tray-full-outline"} type='ionicon' color={focused ? "#EB6A7C" : "gray"} />
                        )
                    }
                },
            })}
        >
            <Tab.Screen name='Customers' component={CustomersScreen} />
            <Tab.Screen name='Orders' component={OrdersScreen} />
        </Tab.Navigator >
    )
}

export default TabNavigator