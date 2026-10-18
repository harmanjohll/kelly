# Photography brief

The site is built in type and colour; photographs slot into the posters and the portrait frames. The site supplies the colour, so the photographs should not.

## The look

- **Backdrop:** plain, neutral, matte. A grey or off white wall or board. No patterns, no props, no coloured cloths.
- **Light:** soft daylight from one side. No flash.
- **Crop:** portrait, **4:5**, the same shape as the posters. Leave space above the flowers.
- **Same setup every time.** Mark the spot and the camera height so every piece matches.

## Must have

1. **Every piece, straight on.** One photo per piece, same distance, same light.
2. **Every crochet piece, close up.** Fill the frame with stitches. The texture is the argument for the price.
3. **The One That Stays, a week later.** The fresh flowers faded or gone, the crochet bloom still there.
4. **Kelly, at work.** Square, for the home page; looking at the work, not the camera.
5. **Hands mid stitch**, close, hook and yarn visible, for Kelly's story page.

## Putting a photo on the site

1. Save the photo as a JPEG, about 1600 by 2000 pixels, named after the piece: `sunday-tulips.jpg`.
2. Put it in `floral/source/public/photos/`.
3. In `floral/source/src/data/products.json`, add `"photo": "photos/sunday-tulips.jpg"` to that piece.
4. Run `npm run release` from `floral/source`, then commit and push.

The poster for that piece is replaced by the photograph everywhere: collections, the piece page and the consultation.
