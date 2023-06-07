import { Router } from 'express'
import { getNotes, createNote, deleteNote, updateNote } from '../controller/note'

const router = Router()

router.get('/', getNotes)

router.post('/', createNote)

router.delete('/:_id', deleteNote)

router.patch('/:_id', updateNote)


export default router