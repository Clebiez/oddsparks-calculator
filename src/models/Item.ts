import type { Recipe } from "./Recipe";

export enum ItemEnum {
  // Woodland Items
  Beelephant_Carapace = "Beelephant Carapace",
  Tree_Bark = "Tree Bark",
  Coal = "Coal",
  Mantis_Stag_Antler = "Mantis Stag Antler",
  Fabric = "Fabric",
  Fertiliser = "Fertiliser",
  Ladder = "Ladder",
  Leaves = "Leaves",
  Wooden_Log = "Wooden Log",
  Sawn_Timber = "Sawn Timber",
  Wooden_Panel = "Wooden Panel",
  Rope = "Rope",
  Wooden_Blade = "Wooden Blade",

  // Mountain Items
  Big_Vial = "Big Vial",
  Coral = "Coral",
  Dowsing_Stone = "Dowsing Stone",
  Frowl_Sac = "Frowl Sac",
  Pengus_Tendon = "Pengus Tendon",
  Rock_Teron_Shell = "Rock Teron Shell",
  Squilican_Tube = "Squilican Tube",
  Explosives = "Explosives",
  Fluted_Coral = "Fluted Coral",
  Limestone = "Limestone",
  Path_Tile = "Path Tile",
  Pebble = "Pebble",
  Quartz = "Quartz",
  Small_Vial = "Small Vial",
  Stone = "Stone",
  Stone_Plate = "Stone Plate",
  Stone_Spike = "Stone Spike",
  Stone_Wheel = "Stone Wheel",

  // Magic Items
  Aetheric_Clump = "Aetheric Clump",
  Aetheric_Pellet = "Aetheric Pellet",
  Aether_Shard = "Aether Shard",
  Raw_Aether = "Raw Aether",
  Refined_Aether = "Refined Aether",
  Liquid_Fertiliser = "Liquid Fertiliser",
  Miasma = "Miasma",
  Miasma_Vial = "Miasma Vial",
  Aether_Crystal = "Aether Crystal",
  Subsurface_Aether = "Subsurface Aether",
  Fog = "Fog",

  // Cave Items
  Copper_Ingot = "Copper Ingot",
  Copper_Ore = "Copper Ore",
  Crangolin_Lavascale = "Crangolin Lavascale",
  Crangolin_Scale = "Crangolin Scale",
  Lava_Shellhorse_Comb = "Lava Shellhorse Comb",
  Volcanic_Soil = "Volcanic Soil",
  Glowshroom = "Glowshroom",
  Lava_Cap = "Lava Cap",
  Drill_Bit = "Drill Bit",
  Bumpy_Geode = "Bumpy Geode",
  Shiny_Geode = "Shiny Geode",
  Cracked_Geode = "Cracked Geode",

  // Plateau Items
  Frozen_Log = "Frozen Log",
  Frozen_Stone = "Frozen Stone",
  Stellar_Ice = "Stellar Ice",
  Stellar_Seed = "Stellar Seed",
  Frost = "Frost",
  Stellar_Fertiliser = "Stellar Fertiliser",
  Icehorn_Ram_Horn = "Icehorn Ram Horn",
  Frilled_Walrion_Tusk = "Frilled Walrion Tusk",

  // Botanical Items
  Leaf_Knot = "Leaf Knot",
  Coral_Seed = "Coral Seed",
  Stellar_Leaves = "Stellar Leaves",
  Fireshroom_Cluster = "Fireshroom Cluster",
  Copper_Seed = "Copper Seed",
  Aether_Flower = "Aether Flower",
  Aether_Seed = "Aether Seed",
  Geode_Cluster = "Geode Cluster",
  Copper_Cutting = "Copper Cutting",
  Copper_Sap = "Copper Sap",
  Aether_Apple = "Aether Apple",
  Aether_Segment = "Aether Segment",

  // Ruin Items
  Stone_Block = "Stone Block",
  Sponge = "Sponge",
  Corrupted_Aether = "Corrupted Aether",
  Grey_Aether = "Grey Aether",
  Cleansing_Fragment = "Cleansing Fragment",
  Corrupted_Spark_Token = "Corrupted Spark Token",

  // Miscellaneous Items
  Red_Paint = "Red Paint",
  Blue_Paint = "Blue Paint",
  Yellow_Paint = "Yellow Paint",
  Green_Paint = "Green Paint",
  Black_Paint = "Black Paint",
  White_Paint = "White Paint",
  Orange_Paint = "Orange Paint",
  Purple_Paint = "Purple Paint",
  Turpentine = "Turpentine",
  Aether_Residue = "Aether Residue",
}

export class Item {
  constructor(
    public name: ItemEnum,
    public recipe: Recipe,
    public asset: string,
  ) {}
}
