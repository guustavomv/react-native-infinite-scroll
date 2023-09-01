import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInfiniteQuery } from 'react-query';
import { Card } from '../components/Card';
import { api } from '../services/axios';
import { GameApiResponse } from '../types/Rawg';

export default function Home() {
  const [page, setPage] = useState(1);
  
  const { 
    data: games, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage 
  } = useInfiniteQuery<GameApiResponse>(['games'],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get('/games', {
        params: { page: pageParam },
      });
      
      setPage(pageParam)

      return data;
    },
    {
      getNextPageParam: ({ next }) => {
        if (!next) return false;
        return page + 1;
      },
      keepPreviousData: true,
    },
  );

  const onFetchNextPage = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <View className="flex-1 bg-zinc-900">
      <SafeAreaView className="flex-1 mx-3">
        {games && <FlatList
          data={games.pages.map((page) => page.results).flat()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card game={item} />}
          ListFooterComponent={() => {
            if (isFetchingNextPage)
              return <ActivityIndicator className="mt-3" />;
          }}
          onEndReached={onFetchNextPage}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />}
      </SafeAreaView>
    </View>
  );
}
