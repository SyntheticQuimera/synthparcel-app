import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CustomerScreenNavigationProp } from "../screens/CustomersScreen";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { Card, Icon } from "@rneui/themed";

type Props = {
  userId: string;
  name: string;
  email: string;
}

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("MyModal", {
      name: name,
      userId: userId
    })} >
      <Card containerStyle={{ padding: 20, borderRadius: 6 }}>
        <View >
          <View className="flex-row justify-between">
            <View>
              <Text className="text-2xl font-bold">{name}</Text>
              <Text className="text-sm text-[#59ccaf]">ID:{userId}</Text>
            </View>

            <View className="flex-row items-center justify-end">
              <Text className="text-[#59ccaf]" > {loading ? "loading..." : `${orders.length} x`}</Text>
              <Icon style={{ marginBottom: 20, marginLeft: "auto" }} name="file-tray-full" type='ionicon' color="#59ccaf" size={50} />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity >
  );
};

export default CustomerCard;
