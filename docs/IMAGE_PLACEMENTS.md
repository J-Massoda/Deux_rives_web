# Editorial photography integration

53 files were copied from redesign/wave-1-corporate-foundation onto main without replacing current site code. Together with the existing ten assets, these contain 59 unique images; four exact duplicates were consolidated. Sources retain their full PNG quality under descriptive French filenames. The build creates 640px and 1600px WebP variants.

`assets/image-manifest.json` records original upload names, descriptive asset IDs, alt text and illustrative status. `scripts/photography.mjs` maps visible scenes to homepage sections, six expertise pages, ten sectors, application contexts, corporate pages and editorial routes. Interface previews remain in the application carousel and interactive demonstrations.

`assets/image-slots.json` defines future replacement slots with proposed filenames and alt-text status. These are planning metadata: no missing file URLs or placeholder keywords are rendered into public pages. Add future approved photos to the manifest, map them to the route, and run `npm test`. Generated photography depicts illustrative business situations, not verified employees or client work. Existing publication/indexing configuration is unchanged.
