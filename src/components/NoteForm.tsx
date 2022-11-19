import React, {FC, FormEvent, useRef, useState} from 'react';
import CreatableSelect from "react-select/creatable";
import {Link, useNavigate} from "react-router-dom";
import {Types, Tag} from "../types/types";
import {nanoid} from "nanoid";

type NoteFormProps = {
    onSubmit: (data: Types) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[],
} & Partial<Types>

const NoteForm: FC<NoteFormProps> = ({
                                         onSubmit,
                                         onAddTag,
                                         availableTags,
                                         title = '',
                                         textArea = '',
                                         tags = [],
                                     }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            id: nanoid(),
            title: titleRef.current!.value,
            textArea: textAreaRef.current!.value,
            tags: selectedTags
        });
        navigate('..');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-5'>
            <div className='flex gap-5'>
                <label className='w-full flex flex-col gap-1'>
                    Title
                    <input
                        ref={titleRef}
                        defaultValue={title}
                        type="text"
                        placeholder='Enter title...'
                        required
                        className='py-2 px-4 outline-none rounded-md border-[1px] border-gray-100 focus:border-gray-300'
                    />
                </label>
                <label className='w-full flex flex-col gap-1'>
                    Tags
                    <CreatableSelect
                        onCreateOption={label => {
                            const newTag = {id: nanoid(), label};
                            onAddTag(newTag);
                            setSelectedTags(prev => [...prev, newTag]);
                        }}
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
            <label className='flex flex-col gap-1'>
                Body
                <textarea
                    ref={textAreaRef}
                    defaultValue={textArea}
                    rows={10}
                    placeholder='Enter description...'
                    required
                    className='py-2 px-4 outline-none rounded-md border-[1px] border-gray-100 focus:border-gray-300 resize-none'></textarea>
            </label>
            <div className='flex gap-5 items-center justify-center'>
                <button type='submit'
                        className='py-2 px-4 border rounded-md border-gray-100 bg-green-100 hover:border-gray-500 transition-all'>Save
                </button>
                <Link to='..'>
                    <button type='button'
                            className='py-2 px-4 border rounded-md border-gray-100 bg-red-100 hover:border-gray-500 transition-all'>Cancel
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default NoteForm;