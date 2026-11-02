import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const root=new URL('../',import.meta.url)

test('shared site logo uses the existing original signature, accessible home link and precise descriptor',async()=>{
  const logo=await readFile(new URL('src/components/Logo.jsx',root),'utf8')
  assert.match(logo,/withBase\('photos\/brand-covers\/samuel-studio-signature.webp'\)/)
  assert.match(logo,/aria-label="Samuel Studio home"/)
  assert.match(logo,/alt="Samuel Studio"/)
  assert.match(logo,/Photography &amp; Creative Direction/)
  assert.doesNotMatch(logo,/Cinematic brand identity|logo-script/)
  const image=await readFile(new URL('public/photos/brand-covers/samuel-studio-signature.webp',root))
  assert.equal(image.subarray(8,12).toString(),'WEBP')
  for(const filename of ['Navbar.jsx','Footer.jsx']) {
    assert.match(await readFile(new URL(`src/components/${filename}`,root),'utf8'),/<Logo compact \/>/)
  }
})

test('logo has reserved image geometry, mobile menu clearance and no Instagram link change',async()=>{
  const css=await readFile(new URL('src/styles/logo.css',root),'utf8')
  assert.match(css,/aspect-ratio:1600\/318/)
  assert.match(css,/header \.studio-logo\{max-width:calc\(100% - 60px\)/)
  assert.match(css,/font-family:'Studio Descriptor'/)
  assert.match(css,/color:#b7b1a3/)
  assert.match(css,/font-size:4.55cqw/)
  assert.match(css,/container-type:inline-size/)
  assert.match(css,/font-style:normal;font-weight:400/)
  assert.ok((await readFile(new URL('public/fonts/montserrat-400.ttf',root))).length>0)
  assert.match(await readFile(new URL('public/fonts/montserrat-OFL.txt',root),'utf8'),/SIL OPEN FONT LICENSE/)
  const site=await readFile(new URL('src/data/site.js',root),'utf8')
  assert.match(site,/https:\/\/www.instagram.com\/ssp.capture\//)
})

test('signature shimmer uses the original alpha mask, with a static reduced-motion fallback',async()=>{
  const logo=await readFile(new URL('src/components/Logo.jsx',root),'utf8')
  const css=await readFile(new URL('src/styles/logo.css',root),'utf8')
  assert.match(logo,/'--studio-signature-mask': `url\("\$\{signatureSrc\}"\)`/)
  assert.match(css,/mask-image:var\(--studio-signature-mask\)/)
  assert.match(css,/animation:studio-signature-shimmer 13s/)
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)\{\.studio-logo-art::after\{animation:none;opacity:0\}\}/)
})
