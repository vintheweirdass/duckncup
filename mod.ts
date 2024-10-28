import events from "npm:@foxify/events";
import openBox from "./mapPresets/openBox.ts"
/** Accepted tile's children/item */
export type Children = Cup;
/** Literal string version of {@link Children} */
export type ChildrenAsString = "cup" | "duck";

// if exported, some weirdass people will gonna use this instead of the greater one.
// Even tho its already marked as deprecated but who knows, its a internet
type IndexAlphabet =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
  /** A set of number that is accepted to the index */
export type IndexNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;
/** Player count */
export type PlayersCount = 1|2|3|4|5|6|7|8|9|10
/** Team Id */
export type TeamId =
| 1
| 2
| 3
| 4
| 5
| 6
| 7
| 8
| 9
| 10
/** 
 * Index section 
 * 
 * Example valid string for this type: `F` `AB` `B` 
 */
export type IndexSection<A extends IndexAlphabet = IndexAlphabet> =
  | `${A}`
  | `${A}${A}`;
/** 
 * Tile index (see {@link IndexSection} and {@link IndexNumber})
 * 
 * Example valid string for this type: 
 * 
 * `B2` `E4` `AB6` `ZZ20` 
*/
export type Index<
  S extends IndexSection = IndexSection,
  N extends IndexNumber = IndexNumber,
> = `${S}${N}`;
export type TileLevel = "base" | "semi" | "nearDuck";
// type Only = 
interface _TilePropertiesBase<C, I, L extends "nearDuck"|undefined> {
  index: I;
  child?: C;
  level?: L;
}
interface _TilePropertiesBaseWithTeam<C, I, L extends Exclude<TileLevel, "nearDuck">, T> {
  index: I;
  child?: C;
  level: L;
  team: T;
}
type TilePropertiesBase<C,I,L extends TileLevel|undefined, T> = L extends "nearDuck"|undefined?_TilePropertiesBase<C, I, L>:L extends Exclude<TileLevel, "nearDuck">?_TilePropertiesBaseWithTeam<C,I,L,T>:never
/** Tile properties, for {@link BoardValuesProto} */
export type TilePropertiesProto = TilePropertiesBase<
  ChildrenAsString,
  IndexNumber,
  TileLevel|undefined,
  IndexNumber
>;
/** Tile properties, for {@link BoardValues} */
export type TileProperties = TilePropertiesBase<Children, Index, TileLevel|undefined, IndexNumber>;
/** Values of the mapped {@link BoardProto} */
export type BoardValuesProto = [
  (TilePropertiesProto | IndexNumber),
  ...(TilePropertiesProto | IndexNumber)[],
];
/** Prototype version of {@link Board} */
export type BoardProto = Map<IndexSection, BoardValuesProto>;
/** Values of the mapped {@link Board} */
export type BoardValues = Map<IndexNumber,TileProperties[]>;
/** Board type */
export type Board = Map<IndexSection, BoardValues>;
/** Teams type */
export type Teams = Map<TeamId, Team>;

// https://stackoverflow.com/a/60737746/22147523
type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown>
  ? K
  : never;

//https://stackoverflow.com/a/73515510/22147523
type ValueOfMap<M extends Map<unknown, unknown>> = M extends
  Map<unknown, infer V> ? V : never;

type EmptyObj = Record<string | number | symbol, never>
/** 
 * Team class from Duckncup game 
 * 
 * @param NameRequired If you want to make {@link Team}`.name` attribute always exist as string, without `undefined` alongside the type
*/
export class Team<NameRequired extends boolean = false> {
  /** The team id. May on a limited rage, see {@link TeamId} */
  public readonly id:TeamId;
  /** Player count, use this as reference for one of your online apps. See {@link PlayersCount}*/
  public readonly players:PlayersCount;
  /** Team name. Can be undefined unless you defined the {@link NameRequired} generic type */
  public readonly name:NameRequired extends true?string:string|undefined;
  constructor(id:TeamId, players:PlayersCount, name?:NameRequired extends false?string|undefined:never)
  /**
   * @param id The team id. May on a limited rage, see {@link TeamId}
   * @param players Players count, use this as reference for one of your online apps. See {@link PlayersCount}
   * @param name Team name. If {@link NameRequired} generice type was set, and the state is `true`, then **this** argument type is `string`. Or else `string|undefined`
   */
  constructor(id:TeamId, players:PlayersCount=1, name:NameRequired extends true?string:never){
    this.id = id
    this.players = players
    this.name = name
  }

  
}
/** The Duckncup game class */
export class Duckncup {
  private _board: Board = new Map<IndexSection, BoardValues>();
  /**
   * List of valid indexes (see {@link Index} to see the validator)
   */
  public readonly validBoardIndexes: Index[] = [];
  private _teams: Teams = new Map<TeamId, Team>();
  /**
   * The constructor
   * @param {BoardProto} board The board prototype. If leaves blank, it will refer to the default board (see {@link openBox})
   */
  constructor(board: BoardProto=openBox, teams:[Team, Team, ...Team[]]=[]) {
    function toTPTable(
      v: TilePropertiesProto | IndexNumber,
    ): TilePropertiesProto {
      if (typeof v !== "number") {
        return v;
      }
      return {
        index: v,
      };
    }
      for (const each of teams.values()) {
        each.
      }
    for (const [k, v] of board.entries()) {
      for (const each of v) {
        const tb = toTPTable(each);

        // vscode dosent resolve this bcs its too heavy. I already do this at least
        // deno-lint-ignore ban-ts-comment
        //@ts-ignore
        this.validBoardIndexes.push(`${k}${tb.index}` as Index);
      }
    }
  }
  /**
   * Map of Teams (see {@link Teams} or {@link Team})
   */
  public get teams() {
    return this._teams
  }
  /**
   * Map of tiles that are exist on this game (see {@link Board})
   */
  public get board() {
    return this._board
  }
  /** 
   * Get the tile, instead of trying hard to do 
   * 
   * ```ts
   * this.board.get(index.replace(number_regex_here, "") as IndexSection)
   * ```
   * 
   * Then finding the index by hand
   */
  getTile(index: Index): TileProperties | undefined {
    
    const sec = this.board.get(idxNum);
    if (!sec) return;
    return sec.get();
  }
  getCup(index: Index): Cup | undefined {
    const tile = this.getTile(index);
    if (!tile) return;
    if (!tile.child) return;
    return tile.child;
  }
  resign(team?: KeyOfMap<typeof this.teams>) {
    for (const [] of this.teams.entries()) {

    }
  };
}
export class PawnBase {
  public game: Duckncup;
  public index: Index;
  constructor(index: Index, game: Duckncup) {
    this.index = index;
    this.game = game;
  }
  internal__setTile(tile: TileProperties) {
    this.index = tile.index;
  }
}
export class Cup extends PawnBase {
  public readonly transformedToDuck:boolean = false;
}
