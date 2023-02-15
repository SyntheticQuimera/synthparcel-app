import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native'
import { RootStackParamList } from '../Navigator/RootNavigator'
import { TabStackParamList } from '../Navigator/TabNavigator'
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from '@apollo/client'
import { GET_CUSTOMERS } from '../graphql/queries'
import CustomerCard from '../components/CustomerCard'


export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>>

const CustomersScreen = () => {
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#59ccaf" : color, fontSize: 10, marginTop: -4, marginBottom: 6 }} >Customers</Text>
      )
    })

  }, [])
  return (
    <ScrollView className='bg-[#59ccaf]'>
      <SafeAreaView className='mb-4'>
        <Image
          resizeMode='center'
          className='w-full h-64 -mt-6'
          source={require("../assets/56437631-ai.png")}
        />
        <TextInput
          placeholder='Search by Customer'
          value={input}
          onChangeText={setInput}
          className="bg-white py-5 px-10 mx-4 rounded-md "
        />

        {data?.getCustomers
          ?.filter((customer: CustomerList) =>
            customer.value.name.includes(input))
          .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
            <CustomerCard key={ID} email={email} name={name} userId={ID} />
          ))}

      </SafeAreaView>
    </ScrollView>
  )
}

export default CustomersScreen
