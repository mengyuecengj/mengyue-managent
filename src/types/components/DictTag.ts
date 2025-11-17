export interface Option {
  value: string
  label: string
  elTagType?: string
  elTagClass?: string | null
}

export interface Props {
  options: Option[] | null
  value: number | string | (number | string)[]
  showValue?: boolean
  separator?: string
}
