interface IRemoveObjectAttributeProps<Obj extends { [key: string]: any }, Attr> {
  object: Obj
  attributeToRemove: Attr
}

export const removeObjectAttribute = <
  Obj extends { [key: string]: any },
  Attr extends string
>({
  object,
  attributeToRemove,
}: IRemoveObjectAttributeProps<Obj, Attr>): Omit<Obj, Attr> => {
  delete object[attributeToRemove]

  return object
}
