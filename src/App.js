import './App.css';
import React, {useState, useEffect} from "react"
import axios from "axios"
import { ArrowUpward, Search } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import QuestionCard from './components/QuestionCard';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Information, setOpen } from './features/appSlice';

function App() {
  const [question , setQuestions]= useState([])
  const [search, setSearch]=useState("")
  const [filtered, setFiltered]=useState([])
  useEffect(() => {
    axios.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow')
  .then((response)=> {
    setQuestions(response.data.items)
  })
  .catch(function (error) {
    console.log(error);
  })
  }, [])
  console.log(question)
  
  function getModalStyle() {
    const top = 50 
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 900,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const dispatch = useDispatch()
  
    
  
    const handleClose = () => {
      dispatch(
        setOpen(
          {open:false}
        )
      )
    };
    const data= useSelector(Information)
    console.log(data)
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <div className="modal">
        <div className="userdetails">
                <div>
                <Avatar src={data.profilePhoto}/>
                <h2>{data.name}</h2>
                </div> 
                <h2>{data.title}</h2>
                <div className="data_upcount">
                <ArrowUpward/>
                <p>{data.upvotes}</p>
                </div>   
          </div>
          <p>question description : there is no question description provided in the API</p>
          <div className="question_details">
            <h2>views: {data.views}</h2>
            <h2>Asked at: {data.date}</h2>
          </div>
          <div className={data.status>0?"question_status":"question_status-not"}>
            {data.status>0?<h2>Answered</h2>:<h2>Not Answered</h2>}
          </div>
          <div className="tags">
            {
                data?.tags.map(tag=>(
                    <h2 className="rounded">{tag}</h2>
                ))
            }
            </div>
            <div className="button">
            <a href={data.link} target="blank"><Button> go to stack overflow</Button></a>
            </div>

        </div>
      </div>
    );
    useEffect(() => {
      setFiltered(
        question.filter((data) =>
          data.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, question]);
    console.log(filtered)
  return (
    <div className="App">
      <div>

      <Modal
        open={data.open}
        onClose={handleClose}
        
      >
        {body}
      </Modal>
    </div>
      <div className="search_bar">
        <Search/>
        <input type="text" placeholder="search for questions..." onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <InfiniteScroll 
      dataLength={question.length}
      next={question}
      >
        {
          filtered.map(questions=><QuestionCard data={questions} key={questions.question_id} />)
        }

      </InfiniteScroll>
    </div>
  );
}

export default App;
