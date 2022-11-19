export type Tag = {
    id: string,
    label: string
}

export type Types = {
    id: string,
    title: string,
    textArea: string,
    tags: Tag[]
}

export type RawNoteData = {
    id: string,
    title: string,
    textArea: string,
    tagsId: string[]
}