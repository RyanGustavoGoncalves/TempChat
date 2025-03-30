import React from 'react';
import { Items } from '../../utils/exData/Items';
import { CircleUser, } from "lucide-react";

const Messages = ({ items = Items }) => {
    return (
        items.map((item, index) => (
            <React.Fragment key={item.id}>
                <div className='grid gap-2 w-1/2 bg-secondary rounded-sm p-2 px-2'>
                    <div className='flex gap-2 items-center cursor-pointer'>
                        <CircleUser />
                        <h3>{item.name}</h3>
                    </div>
                    <span className='text-justify px-4'>{item.messages[1].date}</span>
                    <span className='text-muted-foreground text-right text-xs'>{item.messages[1].date}</span>
                </div>
            </React.Fragment>
        ))
    )
}

export default Messages;