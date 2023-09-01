import { useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { Game } from "../types/Game";
import { Rate } from "./Rate";
import { Tag } from "./Tag";

type Props = {
  game: Game
}

export function Card({ game }: Props) {
  const [isImageLoading, setIsImageLoading] = useState(false);

  return (
    <View className="bg-zinc-800 mb-3 rounded-lg">
      {!isImageLoading && (
        <View className="absolute left-0 right-0 top-24 place-items-center z-0">
            <ActivityIndicator size={"large"}/>
        </View>
      )}
      
      <Image 
        source={{ uri: game.background_image }}
        alt={game.name}
        className="rounded-t-lg aspect-video"
        onLoad={() => setIsImageLoading(true)}
      />
      
      <View className="mt-4 mx-4 mb-6">
        <View className="flex-row items-center">
          {game.tags.slice(0, 3).map((tag: any) => <Tag name={tag.name} key={tag.id} /> )}
        </View>

        <View className="mt-5 flex-row justify-between">
          <Text className="text-white text-lg font-bold">{game.name}</Text>
          <Rate rate={game.rating} />
        </View>

        <Text className="mt-2 text-white text-xs">
          {game.platforms.map(({ platform }: any) => platform.name).join(', ')}
        </Text>
      </View>
    </View>
  )
}