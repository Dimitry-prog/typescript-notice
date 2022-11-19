import React, {FC} from 'react';
import {Tag} from "../types/types";

type EditTagsModal = {
    availableTags: Tag[],
    isShowModal: boolean,
    setIsShowModal: (isOpen:boolean) => void,
    onUpdateTag: (id: string, label: string) => void,
    onRemoveTag: (id: string) => void,
}

const EditTagsModal:FC<EditTagsModal> = ({availableTags, isShowModal, setIsShowModal, onUpdateTag, onRemoveTag}) => {

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 z-10 transition-all ${isShowModal ? 'opacity-100' : 'hidden'}`}>
            <div className='max-w-[420px] w-full relative'>
                <button
                    onClick={() => setIsShowModal(false)}
                    type='button' className=''>&otimes;</button>
                <form className='flex flex-col gap-2'>
                    <h4 className='text-lg font-semibold uppercase'>Edit Tags</h4>
                    <ul className='flex flex-col gap-2'>
                        {availableTags.map(tag => (
                            <li key={tag.id} className='flex gap-2'>
                                <input
                                    value={tag.label}
                                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                                    className='py-2 px-4 outline-none rounded-md border-[1px] border-gray-100 focus:border-gray-300 resize-none'/>
                                <button
                                    onClick={() => onRemoveTag(tag.id)}
                                    type='button' className=''>&times;</button>
                            </li>
                        ))}
                    </ul>
                </form>
            </div>
        </div>
    );
};

export default EditTagsModal;