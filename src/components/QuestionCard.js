import { Avatar } from '@material-ui/core'
import { ArrowUpward } from '@material-ui/icons'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { SetInfo, setOpen } from '../features/appSlice'


import "./QuestionCard.css"


export default function QuestionCard({data}) {
    const disptach = useDispatch()

    const handleClick=()=>{
        disptach(
            SetInfo({
                name:data.owner.display_name,
                profilePhoto:data.owner.profile_image,
                title:data.title,
                upvotes:data.view_count,
                views:data.view_count,
                date:data.last_activity_date,
                status:data.answer_count,
                tags:data.tags,
                link:data.link

            })

        )
        disptach(
            setOpen({
                open:true,
            })
        )

    }
    
    
    return (
        <div className="questionCard" onClick={handleClick}>
            
            <div className="userdetails">
                <div>
                <Avatar src={data.owner.profile_image} alt={data.owner.display_name}/>
                <h2>{data.owner.display_name}</h2>
                </div> 
                <h2>{data.title}</h2>
                <div className="data_upcount">
                <ArrowUpward/>
                <p>{data.view_count}</p>
                </div>   
            </div>
            <div className="tags">
            {
                data.tags.map(tag=>(
                    <h2 className="rounded">{tag}</h2>
                ))
            }
            </div>
        </div>
    )
}

