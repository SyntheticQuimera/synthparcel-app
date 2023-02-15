import { View, Text } from 'react-native'
import React from 'react'
import { Card, Divider, Icon } from '@rneui/themed'
import MapView, { Marker } from "react-native-maps";

type Props = {
    order: Order;
    fullWidth?: boolean;
}

const DeliveryCard = ({ order, fullWidth }: Props) => {

    return (
        <Card
            containerStyle={{
                borderRadius: fullWidth ? 0 : 6,
                marginVertical: fullWidth ? 0 : 8,
                backgroundColor: fullWidth ? "#Eb6a7c" : "#59ccaf",
                padding: 0,
                paddingTop: 16,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                margin: fullWidth ? -1 : 15

            }}
        >
            <View style={fullWidth && { height: "100%" }}>
                <Icon name="file-tray-full" type='ionicon' color="white" size={50} />

                <View className='items-start p-5 -mt-4'>
                    <View className='mx-auto'>
                        <Text className='text-xs text-center uppercase text-white font-bold'>
                            {order.carrier} - {order.trackingId}
                        </Text>
                        <Text className='text-white text-center text-lg font-bold' >Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}</Text>
                        <Divider color='white' />
                    </View>

                    <View className='mx-auto' >
                        <Text className='text-base text-center text-white font-bold mt-5'>Address</Text>
                        <Text className='text-sm text-center text-white' >{order.Address}, {order.City}</Text>
                        <Text className='text-sm text-center italic text-white'>Shipping Cost: ${order.shippingCost}</Text>
                    </View>
                </View>

                <Divider color='white' />

                <View className='p-5' >
                    {order.trackingItems.items.map((item) => (
                        <View
                            key={item.item_id}
                            className='flex-row justify-between items-center'>
                            <Text className='text-sm italic text-white'>{item.name}</Text>
                            <Text className='text-xl text-white'>x {item.quantity}</Text>
                        </View>
                    ))}
                </View>
                <MapView
                    style={{ width: "100%", flexGrow: 1, height: !fullWidth ? 200 : 0 }}
                    initialRegion={{
                        latitude: order.Lat,
                        longitude: order.Lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,

                    }}

                >
                    <Marker
                        coordinate={{
                            latitude: order.Lat,
                            longitude: order.Lng
                        }}
                        title="Delivery Location"
                        description={order.Address}
                        identifier="destination"
                    >

                    </Marker>

                </MapView>
            </View>
        </Card>
    )
}

export default DeliveryCard