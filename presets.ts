import openBox from "./mapPresets/openBox.ts";
import type { BoardProto, BoardValuesProto, IndexNumber, IndexSection, TilePropertiesProto } from "./mod.ts";
import {Team} from "./mod.ts"

export type EmptyObj = Record<string | number | symbol, never>
export type twProp = Omit<Omit<TilePropertiesProto, "index">, "team">
export function twinifyTeam(
  nums: IndexNumber[],
  team?:IndexNumber,
  prop?: twProp,
): BoardValuesProto {
  const arr: TilePropertiesProto[] = [];
  const _prop:Exclude<typeof prop, undefined>|EmptyObj = prop??{}
  for (const each of nums) {
    arr.push({ index: each, team:((typeof _prop.level !== "undefined" && prop?.level !== "nearDuck")?team:undefined) as IndexNumber, ..._prop });
  }
  return arr as BoardValuesProto;
}
export function twinify(nums:IndexNumber[], prop?:twProp) {
  return twinifyTeam(nums, undefined, prop)
}
export const newMap:()=>BoardProto = ()=>new Map<IndexSection, BoardValuesProto>()  


const oneVersusOne:[Team, Team, ...Team[]] = [
  new Team(1,1,"White"),
  new Team(2,1,"Black")
]


export const board = {
    openBox
}
export const team = {
    oneVersusOne
}
export default {
  board, team 
}