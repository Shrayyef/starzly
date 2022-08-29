import React, {useCallback, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';

import Container from '../components/container';
import VideoItem from '../components/video-player';
import useFetch from '../hooks/use-fetch';

const Home = () => {
  const {feed} = useFetch();
  const [state, setState] = useState<{
    page: number;
    per_page: number;
    app: number;
    new: number;
    data: any;
  }>({
    page: 1,
    per_page: 10,
    app: 1,
    new: 1,
    data: [],
  });

  const [loading, setLoading] = useState(false);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const getData = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const {data: res} = await feed({
        params: {
          page: state.page,
          per_page: state.per_page,
          app: state.app,
          new: state.new,
        },
      });
      setState(s => ({...s, data: res.data}));
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [state.page, state.per_page, state.app, state.new]);

  useEffect(() => {
    getData();
  }, [getData]);

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <VideoItem data={item} isActive={activeVideoIndex === index} />
  );

  const {height} = useWindowDimensions();

  return (
    <Container
      type={'flatlist'}
      flatlistProps={{
        data: state.data,
        pagingEnabled: true,
        renderItem,
        onScroll: e => {
          const index = Math.round(e.nativeEvent.contentOffset.y / height);
          setActiveVideoIndex(index);
        },
      }}
      loading={loading}
      hideNav={true}
    />
  );
};

export default Home;
