import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch } from '../../features/posts/postsSlice';


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const LogoSearch = ({ tags, setTags }) => {

  // const query = useQuery();
  const navigate = useNavigate();
  // const page = query.get('page') || 1;
  // const searchQuery = query.get('searchQuery');

  const [search, setSearch] = useState('');
  // const [tags, setTags] = useState([]);
  const [inputTagValue, setInputTagValue] = useState('');
  let newTags;

  const dispatch = useDispatch();
 
  console.log('first' + newTags);

  const backToHome = () => {
    dispatch(getPosts(0));
    navigate('/')
  } 
  
  const searchPost = () => {
  if(search.trim() || (tags || newTags)) {
    //dispatch -> fetch search post 
    console.log('newtags in searchpost ' + newTags)
    // dispatch(getPostsBySearch({ search, tags: newTags ? newTags : tags.length  ? tags?.join(',')  : null}));
    dispatch(getPostsBySearch({ search, tags: newTags?.length ?  newTags.join(',') : tags?.length ? tags.join(',') : null}));
   
    navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${newTags?.length ? newTags?.join(',') : tags?.length ? tags.join(',') : null}`)
  
  } else {
    navigate('/');
  }
 }

  

 const handleSearch = (e) => {
  if(e.key === "Enter" && e.target.value.match(/\S/g) ){
    //if input value is not blank(if there is text)
    // updateSearch(e)
    // setTags(tags)
    console.log('new tags in handleSearch' + newTags)
console.log('search is' + search)
    searchPost();
   
  
}
 }

 const updateTags = (e) => {
    setTags((prev) => [...prev, inputTagValue])
   
    newTags = [...tags, inputTagValue];
    console.log('tags' + tags)
    console.log('newtags in updateTags' + newTags)

 }

 
  const addTags = (e) => {

    if(e.key === "Enter" && e.target.value.match(/\S/g)){
      updateTags(e)
      searchPost();
      setInputTagValue('');
    
    }
    }
 
  const deleteTags = (index) => {
    let deleteTags = tags.filter((tag, i) => i !== index)
    setTags(deleteTags)
  // setTags((prev) => prev.filter((tag, i) => i !== index));
  }
  return (
   
    <div className='flex justify-center gap-2 w-[100%]'>
        <div onClick={backToHome}>
        <img className="lg:block hidden cursor-pointer" src={Logo} alt="logo" />
        </div >

        <div className="flex flex-col  gap-2 rounded-xl 
        w-[85%] p-5 lg:w-full lg:p-0 
        "> 
          <input 
          className="border-none outline-none bg-card-color
          h-10 px-4 py-3.5 rounded-2xl w-full
          focus:outline-border-color focus:outline focus:outline-1
          " 
           type="text"
           placeholder='Search'
           value={search}
           onKeyUp={(e) => handleSearch(e)}
           onChange={(e) => setSearch(e.target.value)}
          />


        <div className='flex items-center flex-wrap flex-col px-1.5 pt-0.5
         rounded-2xl min-h-[20px] bg-card-color
        '>  


         <ul className='flex  flex-wrap box-border  gap-1.5 p-0 mt-1.5 mx-0 mb-0 border-none'>
          {tags?.map((tag, index)=> (
            <li className=" h-auto flex items-center box-border
            justify-center py-0.5 px-2 text-sm list-none rounded-2xl
            mt-0 mr-0 mb-0 ml-0 bg-border-color break-all
 
            " key={index}>
              <span className='h-full'>{tag}</span>
              <span 
               className='block w-4 h-4 text-center leading-none 
               text-sm ml-1 text-bg-color rounded-full bg-border-color
               cursor-pointer
               ' 
               onClick={() => deleteTags(index)}
              >x</span>
            </li>
          ))}
         </ul>
 
         <input
         className="border-none outline-none bg-transparent
         h-5  rounded-2xl w-full pb-3 px-2.5 py-2.5
         flex-1
         " 
          type="text"
          placeholder='search by tags'
          onKeyUp={(e) => addTags(e)} 
          onChange={(e) => setInputTagValue(e.target.value)}
          value={inputTagValue}
         />
         </div>
        </div>
      
    </div>
  
  )
}




export default LogoSearch