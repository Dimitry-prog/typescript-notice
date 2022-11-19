import React from 'react';
import {Tag} from "../types/types";
import {Link} from "react-router-dom";

export type SimplifiedNote = {
    id: string,
    title: string,
    tags: Tag[]
}

const NoteCard = ({id, title, tags}: SimplifiedNote) => {
    return (
        <Link to={`/${id}`} className='block hover:translate-x-0.5 hover:shadow-lg transition-all'>
            <h3>{title}</h3>
            {tags.length > 0 && (
                <ul className='flex'>
                    {tags.map(tag => (
                        <li key={tag.id}>
                            {tag.label}
                        </li>
                    ))}
                </ul>
            )}
        </Link>
    );
};

export default NoteCard;