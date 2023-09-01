import { Text, View } from "react-native";

type Props = {
  name: string;
}

export function Tag({ name }: Props) {
  return (
    <View className="bg-slate-600 px-2 py-2 mr-3 w-24 rounded-full items-center justify-center">
      <Text className="text-white" numberOfLines={1}>
        {name}
      </Text>
    </View>
  )
}