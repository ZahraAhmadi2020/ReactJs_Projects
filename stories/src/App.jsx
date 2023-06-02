import 'bootstrap/dist/css/bootstrap.min.css';
import List from "./components/List";

 import { useEffect } from "react";
import useStorageState from "./hooks/useStorageState";
import InputWithLabel from "./components/InputWithLabel";
import { useReducer } from "react";
import { Row,Col } from 'react-bootstrap';
const welcome = {
  greeting: "Hi",
  title: "React",
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter((story) => story.id !== action.payload),
      };
    default:
      return state;
  }
};

const API_ENDPOINT = "https://react-mini-projects-api.classbon.com/Story/list";

const App = () => {
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [searchTerm, setSearchTerm] = useStorageState("search", "");

  useEffect(() => {

    if (!searchTerm) return;

    dispatchStories({ type: "STORIES_FETCH_INIT" });

    fetch(`${API_ENDPOINT}?query=${searchTerm}`)
      .then((response) => response.json())
      .then((stories) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: stories,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [searchTerm]);

  const handleRemoveStory = (id) => {
    dispatchStories({ type: "REMOVE_STORY", payload: id });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Row>
        <Col xs={0} md={2} lg={3}></Col>
        <Col xs={12} md={8} lg={6}>
           <div className='mt-5'>
             <h1 className='m-4 text-center'>
             {welcome.greeting} {welcome.title}
            </h1>
            <InputWithLabel  
               id="search"
                label="Search"
               value={searchTerm}
               onInputChange={handleSearch}
                isFocused
              />

            {stories.isError && <p>something went wrong</p>}

            {stories.isLoading ? (
            <p>Loading...</p>
            ) : (
             <List list={stories.data} onRemoveItem={handleRemoveStory} />
            )}
           </div>
        </Col>
        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
};

export default App;
