import React, {FC} from 'react';
import NoteForm from "./NoteForm";
import {Types, Tag} from "../types/types";

type NewNoteProps = {
    onSubmit: (data: Types) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const NewNote:FC<NewNoteProps> = ({onSubmit, onAddTag, availableTags}) => {
    return (
        <div>
            <h2>New Note</h2>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </div>
    );
};

export default NewNote;