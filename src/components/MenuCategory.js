import React, { useState } from 'react'
import MenuCatList from './MenuCatList';

const MenuCategory = ({ data, setshowIndex }) => {
    const [showItems, SetshowItems] = useState(false);

    const HandleClick = () => {
        SetshowItems(!showItems);
    }

    return (
        <div className='w-[800px] max-w-full mx-auto shadow-md mt-2 p-5 font-bold'>
            <div className='flex justify-between items-center cursor-pointer' onClick={HandleClick}>
                <span>{data.title} ({data.itemCards.length})</span>
                <span>{showItems ? '🔼' : '🔽'}</span>
            </div>
            {showItems && <MenuCatList data={data.itemCards}/>}
        </div>
    );
}

export default MenuCategory;
