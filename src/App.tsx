import React, {useMemo} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import NoteList from "./components/NoteList";
import NewNote from "./components/NewNote";
import SingleNote from "./components/SingleNote";
import EditNote from "./components/EditNote";
import {Types, RawNoteData, Tag} from "./types/types";
import useLocalStorage from "./hooks/useLocalStorage";
import {nanoid} from "nanoid";

function App() {
    const [notes, setNotes] = useLocalStorage<RawNoteData[]>('NOTES', []);
    const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return {...note, tags: tags.filter(tag => note.tagsId.includes(tag.id))}
        });
    }, [notes, tags]);

    const onCreateNote = ({tags, ...data}:Types) => {
        setNotes(prevNotes => {
            return [...prevNotes, {...data, id: nanoid(), tagsId: tags.map(tag => tag.id)}]
        });
    }

    const addTag = (tag: Tag) => {
        setTags(prev => [...prev, tag]);
    }

    const onUpdateNote = (id:string, {tags, ...data}:Types) => {
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                if ( note.id === id) {
                    return {...note, ...data, tagsId: tags.map(tag => tag.id)};
                } else {
                    return note;
                }
            });
        });
    }

    const onDeleteNote = (id:string) => {
        setNotes(prevNotes => {
            return prevNotes.filter(note => note.id !== id);
        });
    }

    const updateTag = (id:string, label:string) => {
        setTags(prevTags => {
            return prevTags.map(tag => {
                if ( tag.id === id) {
                    return {...tag, label};
                } else {
                    return tag;
                }
            });
        });
    }

    const removeTag = (id:string) => {
        setTags(prevTags => {
            return prevTags.filter(tag => tag.id !== id);
        });
    }

    return (
    <div className=''>
        <Routes>
            <Route path='/' element={
                <NoteList
                    availableTags={tags}
                    notes={notesWithTags}
                    onUpdateTag={updateTag}
                    onRemoveTag={removeTag}
                />
            }/>
            <Route path='/new-note' element={
                <NewNote
                    onSubmit={onCreateNote}
                    onAddTag={addTag}
                    availableTags={tags}
                />
            }/>
            <Route path='/:id' element={<SingleNote notes={notesWithTags} onDeleteNote={onDeleteNote}/>}/>
            <Route path='/:id/edit' element={
                <EditNote
                    onSubmit={onUpdateNote}
                    onAddTag={addTag}
                    availableTags={tags}
                    notes={notesWithTags}
                />
            }/>
            <Route path='*' element={<Navigate to='/'/> }/>
        </Routes>
    </div>
  );
}

export default App;
