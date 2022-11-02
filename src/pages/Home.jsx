import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
 
export const Home = () => {
   
  const  data = useSelector((state) => state.auth.data)
  const dispatch = useDispatch();
   const { posts, tags } = useSelector((state) => state.posts)


const isPostsLoading = posts.status ==="loading"
const isTagsLoading = tags.status ==="loading"
  useEffect(() => {
   dispatch(fetchTags())
    dispatch(fetchPosts())
},[])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading  ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (<Post key={index} isLoading={true}/>) :
          (
              <Post
                key={index} 
              _id={obj._id}
                title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
                tags={obj.tags}
            isEditable={data?.userData._id===obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock  items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкін',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Це тестовий коментар',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
