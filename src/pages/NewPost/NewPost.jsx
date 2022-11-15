import React from "react"
import { Grid } from "@mui/material"
import { Post } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, fetchTags } from "../../redux/slices/posts"
import { useEffect } from "react"
import axios from "../../axios"
import { useState } from "react"

import { TagsBlock } from "../../components/TagsBlock";
import { CommentsBlock } from "../../components/CommentsBlock";


export const NewPost = () => {
  const[comments, setComments]=useState([])
  const data = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
 
  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchPosts());
  axios.get(`/comment`)
       .then((res) => {
        setComments(res.data)
       
      })
      .catch((err) => {
       
    alert("Є помилка при загрузці коментарів")
      });
   
  }, [dispatch]);

 

   

  let newPosts =[]

  const  reverseArr=()=> {
    posts?.items.map((post) => {
      newPosts.unshift(post);
      return newPosts;
    })}
 reverseArr()
     

 
    return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading  ? [...Array(5)] : newPosts).map((obj, index) => isPostsLoading ? (<Post key={index} isLoading={true}/>) :
          (
              <Post
                key={index} 
              _id={obj._id}
                title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comment.length}
                tags={obj.tags}
                 isEditable={data?.userData?._id === obj?.user?._id}
            />
          ))}
                </Grid>
       <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments} isLoading={false}/>
        </Grid>
      </Grid>
           </>

)
}