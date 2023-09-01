import { Text, View } from "react-native";

type Props = {
  rate: number;
}

export function Rate({ rate }: Props) {
  return (
    <View className="border-green-500 border-2 w-19 px-2 rounded-full items-center justify-center">
      <Text className="text-green-500 text-xs">
        {rate}
      </Text>
    </View>
  )
}