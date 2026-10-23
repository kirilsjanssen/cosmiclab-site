window.PixelGiftConfig = Object.freeze({
  version: "0.1",
  basePath: "/pixelgift/",
  currency: "EUR",
  preliminaryPricing: true,
  upload: Object.freeze({
    maxBytes: 8 * 1024 * 1024,
    acceptedMimeTypes: Object.freeze(["image/jpeg", "image/png", "image/webp"]),
  }),
  games: Object.freeze([
    Object.freeze({ id: "adventure", titleKey: "games.adventure.title", available: true, image: "game-adventure" }),
    Object.freeze({ id: "commando", titleKey: "games.commando.title", available: false, image: "game-commando" }),
    Object.freeze({ id: "action", titleKey: "games.action.title", available: false, image: "game-action" }),
  ]),
  packages: Object.freeze([
    Object.freeze({ id: "mini", price: 49, extraCharacters: 0, key: "packages.mini" }),
    Object.freeze({ id: "classic", price: 79, extraCharacters: 1, key: "packages.classic" }),
    Object.freeze({ id: "friends", price: 119, extraCharacters: 3, key: "packages.friends" }),
  ]),
});

