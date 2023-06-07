import { Request, Response } from 'express'

export const notFoundHandling = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
}

// functional trycatch block
export const tryCatch = async <T>(promise: Promise<T>) => {
  try {
    const data = await promise
    return [data, null] as const
  } catch (error) {
    return [null, error] as const
  }
}

export const errorhandling = (error: Error, req: Request, res: Response) => {
  console.error(error)
  res.status(500).json({
    error: error instanceof Error ? error.message : 'an unknown error occurred',
  })
}
