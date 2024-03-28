import { useHistory } from "react-router-dom"
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Students from './components/Students';
import Manging from './components/Managing';
import Update from './components/Update';
import Search from './components/Search';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [searchtext, setSearchtext] = useState('');
  const [searchresult, setSearchresults] = useState([]);
  const [searchedtext,setsearchedtext]=useState('')
  const token = localStorage.getItem('token');
  const history=useHistory()
  useEffect(() => {
    if (token){
      fetch(`http://127.0.0.1:8000/students/?search=${searchedtext}`,
    {headers:{
      "Authorization":`Token ${token}`
    }})
    .then(response => {
      if (response.ok){

        return response.json()
      }
      else{
        history.push('/login');
      }
      })
      .then(data => {
        setSearchresults(data.results);
      });}
    
  }, [searchedtext,token]);

  const [students, setStudents] = useState([]);
  const [nextpage, setNextPage] = useState(null);
  const [prevpage, setPrevPage] = useState(null);

  useEffect(() => {
    if (token){
      fetch("http://127.0.0.1:8000/students/",{headers:{
      "Authorization":`Token ${token}`
    }})
      .then(response => {
        if (response.ok){

          return response.json()
        }
        else{
          history.push('/login');

        }
        })
      .then(data => {
        if (data.next) {
          setNextPage(data.next);
        }
        if (data.previous) {
          setPrevPage(data.previous);
        }
        setStudents(data.results);
      });
    }
    
  }, [token]);

  return (
    <div className="container">
      <Navbar setSearchtext={setSearchtext} 
       setsearchedtext={setsearchedtext}
      searchtext={searchtext}
      
      />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/students" >
          <Students 
            students={students} 
            nextpage={nextpage} 
            prevpage={prevpage} 
            setnextpage={setNextPage} 
            setprevpage={setPrevPage} 
            setStudents={setStudents} 
          />
        </Route>
        <Route path="/student_manage">
          <Manging 
          students={students} 
          nextpage={nextpage} 
          prevpage={prevpage} 
          setnextpage={setNextPage} 
          setprevpage={setPrevPage} 
          setStudents={setStudents}/>
        </Route>
        <Route path="/update/:id" >
          <Update  />
        </Route>
        <Route path="/search" >
        <Search searchresult={searchresult}/>
        </Route>
        <Route path="/signup" >
        <Signup/>
        </Route>
        <Route path="/login" >
        <Login/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
