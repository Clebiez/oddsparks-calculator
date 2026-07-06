# Project Structure

```
src/
├── main.ts                  # App bootstrap (plugins, styles, mount)
├── App.vue                  # Root component (layout, builder toggle, item list)
├── components/              # Vue SFCs (single-file components)
│   ├── RecipeForm.vue       # Item selection form
│   ├── RecipeResolver.vue   # Resolves and displays recipes for selected items
│   ├── RecipeDetail.vue     # Single recipe breakdown display
│   ├── BuildingDetail.vue   # Building info display
│   └── ItemDetail.vue       # Item info display
├── domain/                  # Domain models and business logic (no Vue dependency)
│   ├── Building.ts          # BuildingEnum (all building types)
│   ├── Item.ts              # ItemEnum, Item class, ItemAndQuantity type
│   ├── Recipe.ts            # Recipe class (rate calc, building count)
│   └── RecipeFactory.ts     # Loads data.json and constructs Recipe lookup map
├── plugins/                 # Vue plugin registration
│   ├── index.ts             # Plugin barrel (registers Vuetify)
│   └── vuetify.ts           # Vuetify instance config (theme, breakpoints)
├── utils/                   # Pure utility functions
│   ├── getImages.ts         # Resolves item/building image URLs from assets
│   └── round.ts             # Number rounding helper
├── styles/                  # Global styles
│   ├── tailwind.css         # Tailwind entry
│   ├── main.scss            # App-wide SCSS
│   ├── layers.css           # CSS layer ordering
│   └── settings.scss        # Vuetify SCSS variable overrides
└── assets/
    ├── data.json            # Game recipe data (inputs, outputs, rates, buildings)
    ├── buildings/           # Building PNG images (named with underscores)
    └── items/               # Item PNG images (named with underscores)
```

## Key Conventions

- **Domain layer is framework-agnostic.** Business logic (rate calculations, recipe resolution) lives in `src/domain/` with no Vue imports.
- **Enums for game entities.** Buildings and items use TypeScript `enum` with display-name values (e.g., `Sawbench = "Sawbench"`).
- **Static data.** Recipe data is stored in `src/assets/data.json` and loaded at module init in `RecipeFactory.ts`.
- **Image naming.** Asset filenames use underscores matching the enum key (e.g., `ItemEnum.Copper_Ore` → `Copper_Ore.png`).
- **Components use `<script setup lang="ts">`** with Composition API style.
- **No router or state management.** The app is a single-view tool; state is managed with local `ref()` in `App.vue`.
