import React, {FC} from 'react';
import {Types} from "../types/types";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";

type SingleNoteProps = {
    notes: Types[],
    onDeleteNote: (id: string) => void
}

const SingleNote:FC<SingleNoteProps> = ({notes, onDeleteNote}) => {
    const {id} = useParams();
    const note = notes.find(note => note.id === id);
    const navigate = useNavigate();

    if (note === null || note === undefined) return <Navigate to='/'/>

    return (
        <div className='flex flex-col gap-2 items-center'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <h2>{note.title}</h2>
                    {note.tags.length > 0 && (
                        <ul className='flex gap-2'>
                            {note.tags.map(tag => (
                                <li key={tag.id}>
                                    {tag.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='flex gap-5 items-center justify-center'>
                    <Link to={`/${note.id}/edit`}>
                        <button type='button'
                                className='py-2 px-4 border rounded-md border-gray-100 bg-green-100 hover:border-gray-500 transition-all'>Edit
                        </button>
                    </Link>
                    <button
                        onClick={() => {
                            onDeleteNote(note.id);
                            navigate('..');
                        }}
                        type='button'
                        className='py-2 px-4 border rounded-md border-gray-100 bg-transparent hover:border-gray-500 transition-all'>Delete
                    </button>
                    <Link to="/">
                        <button type='button'
                                className='py-2 px-4 border rounded-md border-gray-100 bg-transparent hover:border-gray-500 transition-all'>Back
                        </button>
                    </Link>
                </div>
            </div>

            <ReactMarkdown>
                {note.textArea}
            </ReactMarkdown>
        </div>
    );
};

export default SingleNote;