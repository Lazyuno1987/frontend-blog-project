import React from "react";
import {Outlet} from 'react-router-dom'
// import Tabs from "@mui/material/Tabs";
import { Button } from "@mui/material";

// import Grid from "@mui/material/Grid";
// import { useEffect } from "react";
// import { Post } from "../components/Post";
// import { TagsBlock } from "../components/TagsBlock";
// import { CommentsBlock } from "../components/CommentsBlock";
// import axios from '../axios.js'
// import { useDispatch, useSelector } from "react-redux";
// import {  fetchPosts, fetchTags } from "../redux/slices/posts";
// import { useState } from "react";

export const Home = () => {
  // const[comments, setComments]=useState([])
  // const data = useSelector((state) => state.auth.data);
  // const dispatch = useDispatch();
  // const { posts, tags } = useSelector((state) => state.posts);
  // const isPostsLoading = posts.status === "loading";
  // const isTagsLoading = tags.status === "loading";
  
  
  // useEffect(() => {
  //   dispatch(fetchTags());
  //   dispatch(fetchPosts());
  // axios.get(`/comment`)
  //      .then((res) => {
  //       setComments(res.data)
       
  //     })
  //     .catch((err) => {
       
  //   alert("Є помилка при загрузці коментарів")
  //     });
   
  // }, []);

  // let newPosts =[]

//   const  reverseArr=()=> {
//     posts?.items.map((post) => {
//       newPosts.unshift(post);
//       return newPosts;
//     })}
//  reverseArr()



//   function commentsCountLength(objId) {
//     const countCom = comments.filter(el => el.post._id===objId)
    
//     return countCom.length
//   }

  return (
    <>
  
      <div
        style={{ marginBottom: 15 }}
      > 
        <Button href="/" style={{ marginRight:15 }} variant="contained">Нові</Button>
        <Button  href="/popular" variant="contained">Популярні</Button>
        </div>
      {/* <Grid container spacing={4}> */}
        {/* <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : newPosts).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
                <Post
                  
                key={index}
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                  commentsCount={commentsCountLength(obj._id)}
                tags={obj.tags}
                isEditable={data?.userData?._id === obj?.user?._id}
              />
            )
          )}
        </Grid> */}
        {/* <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments}
            isLoading={false}
          />
        </Grid>
      </Grid> */}
      <Outlet/>
    </>
  );
};
