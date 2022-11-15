import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/slices/posts";


export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
   const comments = useSelector(state=>state.posts.comments.items)
    

  const { id } = useParams();
  const dispatch = useDispatch()
 
  React.useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
       
    alert("Є помилка при загрузці статті")
      });
    
    dispatch(fetchComments(id))
  }, [id, dispatch]);

  

const isCommentsLoading = comments.status === "loading";

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comment.length}
        tags={data.tags}
        isFullPost
      >
        <p>
         {data.text}
        </p>
      </Post>
      {  (isCommentsLoading ? [...Array(5)] :
        (<CommentsBlock
          items={comments}
          isLoading={isLoading}
        >
          <Index />
        </CommentsBlock>))}
      
    </>
  );
};
