import React, {FC} from 'react';
import NoteForm from "./NoteForm";
import {Types, Tag} from "../types/types";
import {Navigate, useParams} from "react-router-dom";

type EditNoteProps = {
    onSubmit: (id: string, data: Types) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[],
    notes: Types[],
}

const EditNote: FC<EditNoteProps> = ({onSubmit, onAddTag, availableTags, notes}) => {
    const {id} = useParams();
    const note = notes.find(note => note.id === id);

    if (note === null || note === undefined) return <Navigate to='/:id'/>

    return (
        <div>
            <h2>Edit Note</h2>
            <NoteForm
                title={note.title}
                textArea={note.textArea}
                tags={note.tags}
                onSubmit={data => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </div>
    );
};

export default EditNote;