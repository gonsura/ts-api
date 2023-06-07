import { Request, Response, NextFunction } from 'express'
import NoteModel, { Note } from '../models/note'
import { tryCatch } from '../util/errorhandling'

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [getNotes, error] = await tryCatch<Note[]>(NoteModel.find().exec())
  error ? next(error) : res.status(200).json({ message: 'success', getNotes })
}

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  type requestBody = {
    title: string
    text: string
  }
  const { title, text }: requestBody = req.body
  if (!title || !text) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  const [createNote, error] = await tryCatch<Note>(
    NoteModel.create({ title, text })
  )
  error
    ? next(error)
    : res.status(201).json({ message: 'Note created', createNote })
}

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.params

  const [deleteNote, error] = await tryCatch<Note | null>(
    NoteModel.findByIdAndDelete(_id)
  )
  if (!deleteNote) {
    return res.status(404).json({ message: 'Note not found' })
  }
  error
    ? next(error)
    : res.status(200).json({ message: 'Note deleted', deleteNote })
}

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.params
  const { title, text } = req.body
  const [existingNote, existingNoteError] = await tryCatch<Note | null>(
    NoteModel.findById(_id)
  )
  if (existingNoteError) {
    return next(existingNoteError)
  }
  if (!existingNote) {
    return res.status(404).json({ message: 'Note not found' })
  }

  if (title) {
    existingNote.title = title
  }

  if (text) {
    existingNote.text = text
  }

  const [updatedNote, updatedNoteError] = await tryCatch<Note>(
    existingNote.save()
  )
  updatedNoteError
    ? next(updatedNoteError)
    : res.status(202).json({ message: 'Note updated', updatedNote })
}
