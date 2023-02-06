export type Store = {
  extractions: State
}

export type State = {
  isLoading: boolean
  data: ItemState[]
  error: any
}

export type ItemState = {
  date: string
  oilExtraction: number
  liquidExtraction: number
}

