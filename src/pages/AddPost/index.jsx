import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useSelector } from "react-redux";
import "easymde/dist/easymde.min.css";
import { isAuthSelector } from "../../redux/slices/auth";
import styles from "./AddPost.module.scss";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "../../axios";


export const AddPost = () => {
  const { id } = useParams();

  const inputFileRef = React.useRef(null);
  const isAuth = useSelector(isAuthSelector);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const navigate = useNavigate();
  const isEditing = Boolean(id)
console.log(isLoading)
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const {data } = await axios.post("/upload", formData);

      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Помилка при завантаженні файлу");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };
    
      const { data } = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post("/posts", fields);
 const idt = isEditing ? id : data._id;
    
      
      navigate(`/posts/${idt}`);
    } catch (error) {
      console.warn(error);
      alert("Помилка при завантаженні статті");
    }
  };
 
  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
        
          setTitle(data.title);
          setText(data.text);
          setTags(data.tags);
          setImageUrl(data.imageUrl);


        })
        .catch((err) => {
          console.warn(err);
          alert("Помилка при отриманні статті");
        });
    }
  },[id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введіть текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

 
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузити прев'ю
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Видалити
          </Button>
          <img
            className={styles.image}
            src={`https://backend-blog-project-laziun.herokuapp.com/${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статті..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Теги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
         {isEditing? 'Зберегти' :'Опублікувати'} 
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
