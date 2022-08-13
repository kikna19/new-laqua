export interface Purchase {
  name: string;
  surname: string;
  mobile: string
  city: string;
  address: string;
}

export const objValues = <T>(obj: any): T[] => {
  return Object.keys(obj).map((k: string) => obj[k].value)
}
