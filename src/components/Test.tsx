import { useState } from 'react';

export const Test =()=> {
  let post = '강남 우동 맛집';
  let [title,setTitle] = useState(['남자 코트 추천','강남 우동 맛집','리액트독학']);
  let [count,setCount] = useState(0);
  let a = 0;
  function titleChange(a:any){
    const copy = [...title];
    copy[0] = '여자코트 추천';
    setTitle(copy);
    return a;
  }
  console.log(a);
  return (
    <div>
      <div className="black-nav">
        <h4>블로그야</h4>
      </div>
      <div className="list">
        <h4>{title[0]} <button onClick={()=>titleChange(1)}>수정버튼</button>
        <span onClick={()=>{setCount(count+1)}}>🙌</span> {count} </h4>
        <p>2월 05일 발행</p>
      </div>  
      <div className="list">
        <h4>{title[1]} <span>🙌</span> {count} </h4>
        <p>2월 05일 발행</p>
      </div>  
      <div className="list">
        <h4>{title[2]} <span>🙌</span> {count} </h4>
        <p>2월 05일 발행</p>
      </div>
      </div>                       
  );
}