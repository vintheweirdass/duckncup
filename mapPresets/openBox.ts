import { newMap, twinify, twinifyTeam } from "../presets.ts";
const m = newMap();
m
  .set(
    "A",
    twinifyTeam([4, 5, 6], 1, {
      level: "base",
      child: "cup",
    }),
  )
  .set(
    "B",
    twinifyTeam([4, 5, 6], 1, {
      level: "semi",
    }),
  )
  .set(
    "C",
    twinify([4, 5, 6]),
  )
  .set("D", [
    {
      index: 1,
      team: 1,
      level: "base",
      child: "cup",
    },
    {
      index: 2,
      team: 1,
      level: "semi",
    },
    {
      index: 3,
    },
    {
      index: 7,
    },
    {
      index: 8,
      team: 2,
      level: "semi",
    },
    {
      index: 9,
      team: 2,
      level: "base",
      child: "cup",
    },
    ...twinify([4, 5, 6], {
      level: "nearDuck",
    }),
  ])
  .set("E", [
    {
      index: 1,
      team: 1,
      level: "base",
    },
    {
      index: 2,
      team: 1,
      level: "semi",
    },
    {
      index: 3,
    },
    {
      index: 5,
      child: "duck",
    },
    {
      index: 7,
    },
    {
      index: 8,
      team: 2,
      level: "semi",
    },
    {
      index: 9,
      team: 2,
      level: "base",
    },
    ...twinify([4, 6], {
      level: "nearDuck",
    }),
  ])
  .set("F", [
    {
      index: 1,
      team: 1,
      level: "base",
      child: "cup",
    },
    {
      index: 2,
      team: 1,
      level: "semi",
    },
    {
      index: 3,
    },
    {
      index: 7,
    },
    {
      index: 8,
      team: 2,
      level: "semi",
    },
    {
      index: 9,
      team: 2,
      level: "base",
      child: "cup",
    },
    ...twinify([4, 5, 6], {
      level: "nearDuck",
    }),
  ])
  .set(
    "G",
    twinifyTeam([4, 5, 6], 2, {
      level: "base",
      child: "cup",
    }),
  )
  .set(
    "H",
    twinifyTeam([4, 5, 6], 2, {
      level: "semi",
    }),
  );
export default m;
