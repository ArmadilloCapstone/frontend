import moment from "moment";
import { after_school_class } from "./back-data";
import {itemsForAfterSchool} from "./fake-data";
import React, { useEffect, useState } from "react";

export default function Detail(){

    let [ alert, alertState ] = useState(true);   // step. 1
  
    useEffect(()=>{                               // step. 2
      let timer = setTimeout(()=>{ alertState(false) }, 7000);
      return ()=>{ clearTimeout(timer)}
    },[]);
  
    return (
  
                                            // step. 3
        alert === true  // 삼항연산자를 습관화 할 수 있도록 ㅎㅏ자..
        ? (<div>
            <p>"이름, 이름, 이름"</p>
            <p>"__시 / __ 방과후수업"</p>
          </div>) // HTML 요소도 연산이 가능하다는 것을 인지 하도록.
        : null
      
    )
  }