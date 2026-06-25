import { exec } from "node:child_process";
import { promisify } from "node:util";
import * as cheerio from "cheerio";

import { ItemEnum } from "../models/Item";
import { SparkEnum } from "../models/Spark";

const execAsync = promisify(exec);

const items = Object.keys(ItemEnum);

const sparks = Object.keys(SparkEnum);

const strip = (input: string) => input.replaceAll("\n", "");
const getQuantityFromString = (
  input: string,
): { item: string; quantity: number } => {
  const occ = input.split(" x ");
  return {
    item: occ[1] as string,
    quantity: Number(occ[0]),
  };
};
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getRecipes = async (items: string[]) => {
  for (let index = 0; index < items.length; index++) {
    await wait(1000); // attend 2 secondes
    const element = items[index];
    const url = `https://oddsparks.wiki.gg/wiki/${element}`;
    const { stdout } = await execAsync(
      `curl -s ${url} -A "OddSparkCalculator/1.0 (padrohl@gmail.com)"`,
    );

    const $ = cheerio.load(stdout);
    const title = $("h1").first().text();
    const recipe = $(".recipe-calc").first();
    const itemsPerMinute = Number(
      $(recipe).find(".calculated-duration-in-min").text(),
    );
    const row = $(recipe).find($("tr").get(3));

    const building = strip($(row).find("td:first-child").text());

    const output = getQuantityFromString(
      strip($(row).find("td:last-child").text()),
    );

    // Building, output = 2 so we remove 2 to determine how many items are in input.
    const tdLength = $(row).find("td").length;
    const numberOfItems = tdLength - 2;
    const inputs = [];
    for (let index = 1; index <= numberOfItems; index++) {
      const item = getQuantityFromString(
        strip(
          $(row)
            .find($(`td:nth-child(${index + 1})`))
            .text(),
        ),
      );
      inputs.push(item);
    }
    console.log({
      title,
      itemsPerMinute,
      building,
      output,
      numberOfItems,
      inputs,
    });
  }
};

getRecipes([...items, ...sparks]);
