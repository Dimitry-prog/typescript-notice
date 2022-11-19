import React, {FC, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import ReactSelect from 'react-select'
import {Tag} from "../types/types";
import NoteCard, {SimplifiedNote} from './NoteCard';
import EditTagsModal from "./EditTagsModal";

type HomeProps = {
    availableTags: Tag[],
    notes: SimplifiedNote[],
    onUpdateTag: (id: string, label: string) => void,
    onRemoveTag: (id: string) => void,
}

const NoteList:FC<HomeProps> = ({availableTags, notes, onUpdateTag, onRemoveTag }) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');
    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
            );
        });
    }, [title, selectedTags, notes]);

    return (
        <>
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold uppercase'>Notes</h1>
                <div className='flex gap-5 items-center justify-center'>
                    <Link to='/new-note'>
                        <button type='button' className='py-2 px-4 border rounded-md border-gray-100 bg-green-100 hover:border-gray-500 transition-all'>Create</button>
                    </Link>
                    <button
                        onClick={() => setIsShowModal(true)}
                        type='button'
                        className='py-2 px-4 border rounded-md border-gray-100 bg-transparent hover:border-gray-500 transition-all'
                    >
                        Edit tags
                    </button>
                </div>
            </div>
            <form
                className='flex flex-col gap-5'>
                <div className='flex gap-5'>
                    <label className='w-full flex flex-col gap-1'>
                        Title
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder='Enter title...'
                            className='py-2 px-4 outline-none rounded-md border-[1px] border-gray-100 focus:border-gray-300'
                        />
                    </label>
                    <label className='w-full flex flex-col gap-1'>
                        Tags
                        <ReactSelect
                            options={availableTags.map(tag => {
                                return {
                                    label: tag.label,
                                    value: tag.id
                                }
                            })}
                            value={selectedTags.map(tag => {
                                return {
                                    label: tag.label,
                                    value: tag.id
                                }
                            })}
                            onChange={tags => {
                                setSelectedTags(tags.map(tag => {
                                    return {
                                        label: tag.label,
                                        id: tag.value
                                    }
                                }))
                            }}
                            isMulti
                        />
                    </label>
                </div>
            </form>
            <ul className='list-none flex gap-4'>
                {filteredNotes.map(note => (
                    <li key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                    </li>
                ))}
            </ul>
            <EditTagsModal
                availableTags={availableTags}
                isShowModal={isShowModal}
                setIsShowModal={setIsShowModal}
                onUpdateTag={onUpdateTag}
                onRemoveTag={onRemoveTag}
            />
        </>
    );
};

export default NoteList;

