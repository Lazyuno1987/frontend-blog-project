import React from "react"
import { useParams } from "react-router-dom"
import { Grid } from "@mui/material"
import { Post } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../redux/slices/posts"
import { useEffect } from "react"
import { useState } from "react"
import axios from "../../axios.js"

export const TagsPage = () => {
  const dispatch = useDispatch();
  const { name } = useParams()
  const [comments, setComments] = useState()
  const { posts, tags } = useSelector((state) => state.posts)
 
 
  useEffect(() => {
    dispatch(fetchPosts()) 
     axios.get(`/comment`)
       .then((res) => {
        setComments(res.data)
       
      })
      .catch((err) => {
       
    alert("Є помилка при загрузці коментарів")
      });
    },[])
   

   let newPosts = []
   
 

    function postsTags(val) {
       
        posts?.items.filter((obj) => {
            if (obj.tags.includes(name)) {
              newPosts.push(obj)  
            }
            
            return newPosts
        })
            
        
    }
   
  postsTags(name)
  
    const isPostsLoading = posts.status ==="loading"
    return (
    
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
              commentsCount={comments?.length}
                tags={obj.tags}
            // isEditable={data?.userData?._id===obj?.user?._id}
            />
          ))}
                </Grid>
                </Grid>

)
}