// Define the type for a dictionary item
export interface DictItem {
  label: string;
  value: string;
  elTagType?: string;
  elTagClass?: string;
}

// Define the type for the API response
export interface DictApiResponse {
  data: { dictLabel: string; dictValue: string; listClass?: string; cssClass?: string }[];
}