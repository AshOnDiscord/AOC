(async () => {
  // const input = await Bun.file("../day5-mini.txt").text();
  const input = await Bun.file("../day5.txt").text();

  const temp = input.split("\n\n");
  const tempSeeds = temp
    .shift()
    ?.split(": ")[1]
    .split(" ")
    .map((e) => parseInt(e))!;

  const seeds: map[] = [];

  for (let i = 0; i < tempSeeds.length; i += 2) {
    const min = tempSeeds[i];
    const range = tempSeeds[i + 1];
    const max = min + range - 1;
    seeds.push({ min, max, offset: 0 });
  }

  const maps: map[][] = temp.map((e) => {
    const x = e.split("\n");

    x.shift();
    return x.map((y) => {
      const [t1, t2, t3] = y.split(" ");
      const dest = parseInt(t1);
      const min = parseInt(t2);
      const range = parseInt(t3);
      const max = min + range - 1;
      return { min, max, offset: dest - min };
    });
  });

  const getIntersections = (parent: map, ranges: map[]): map[] => {
    // return intersections from ranges, in parent
    const result: map[] = [];
    for (const range of ranges) {
      if (range.min <= parent.max + parent.offset && range.max >= parent.min + parent.offset) {
        const min = Math.max(range.min, parent.min + parent.offset) - parent.offset;
        const max = Math.min(range.max, parent.max + parent.offset) - parent.offset;
        result.push({ min, max, offset: parent.offset + range.offset });
      }
    }
    return result;
  };
  const getDifference = (parent: map, ranges: map[], intersections: map[] | null = null): map[] => {
    const overlaps = intersections || getIntersections(parent, ranges);

    if (overlaps.length === 0) {
      return [{ min: parent.min, max: parent.max, offset: parent.offset }];
    }

    let differences: map[] = [];

    // Add the initial difference before the first range
    if (parent.min < overlaps[0].min) {
      differences.push({ min: parent.min, max: overlaps[0].min - 1, offset: parent.offset });
    }

    // Iterate through each range and add differences between them
    for (let i = 1; i < overlaps.length; i++) {
      differences.push({ min: overlaps[i - 1].max + 1, max: overlaps[i].min - 1, offset: parent.offset });
    }

    // Add the final difference after the last range
    if (parent.max > overlaps[overlaps.length - 1].max) {
      differences.push({ min: overlaps[overlaps.length - 1].max + 1, max: parent.max, offset: parent.offset });
    }

    return differences;
  };
  interface range {
    min: number;
    max: number;
  }
  interface map extends range {
    offset: number;
  }

  const getSubranges = (parent: map, ranges: map[]) => {
    const intersections = getIntersections(parent, ranges).sort((a, b) => a.min - b.min);
    const differences = getDifference(parent, ranges, intersections);
    const result = intersections.concat(differences).sort((a, b) => a.min - b.min);
    return result;
    // return getIntersections(parent, ...ranges)
    //   .concat(getDifference(parent, ...ranges))
    //   .sort((a, b) => a.min - b.min);
  };

  // console.log(getSubranges(seeds[0], maps[0]));
  const getMinLocation = (seed: map) => {
    let soil = getSubranges(seed, maps[0]);
    soil = soil.filter((e) => e.min <= e.max);
    // console.log("seed", JSON.stringify(seed));
    // console.log("soil", JSON.stringify(soil));
    let fertilizer = [];
    for (const subrange of soil) {
      fertilizer.push(...getSubranges(subrange, maps[1]));
    }
    fertilizer = fertilizer.filter((e) => e.min <= e.max);
    // console.log("fertilizer", JSON.stringify(fertilizer));

    let water = [];
    for (const subrange of fertilizer) {
      water.push(...getSubranges(subrange, maps[2]));
    }
    water = water.filter((e) => e.min <= e.max);
    // console.log("water", JSON.stringify(water));

    let light = [];
    for (const subrange of water) {
      light.push(...getSubranges(subrange, maps[3]));
    }
    light = light.filter((e) => e.min <= e.max);
    // console.log("light", JSON.stringify(light));

    // debugger;

    let temperature = [];
    for (const subrange of light) {
      temperature.push(...getSubranges(subrange, maps[4]));
    }
    temperature = temperature.filter((e) => e.min <= e.max);
    // console.log("temperature", JSON.stringify(temperature));

    // debugger;

    let humidity = [];
    for (const subrange of temperature) {
      humidity.push(...getSubranges(subrange, maps[5]));
    }
    humidity = humidity.filter((e) => e.min <= e.max);
    // console.log("humidity", JSON.stringify(humidity));

    let location = [];
    for (const subrange of humidity) {
      location.push(...getSubranges(subrange, maps[6]));
    }
    location = location.filter((e) => e.min <= e.max);

    // console.log("location", JSON.stringify(location));

    const mappedSort = location.map((e) => ({ ...e, offsetMin: e.min + e.offset })).sort((a, b) => a.offsetMin - b.offsetMin);
    // console.log(
    //   "mappedSort",
    //   mappedSort.map((e) => JSON.stringify(e))
    // );
    // console.log("");
    return mappedSort;
  };

  const min = { input: 0, output: Infinity };
  for (const seed of seeds) {
    const locationMap = getMinLocation(seed);
    for (const location of locationMap) {
      if (location.offsetMin < min.output) {
        min.input = seed.min;
        min.output = location.offsetMin;
      }
    }
  }
  console.log(min);
})();
