import test from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
const root=new URL('../',import.meta.url)

test('hero social icons receive taps above the content layer without blocking the surrounding image',async()=>{
  const hero=await readFile(new URL('src/components/Hero.jsx',root),'utf8')
  const overlay=hero.match(/className="hero-socials[^"]+"/)?.[0]
  assert.ok(overlay)
  assert.match(overlay,/z-20/)
  assert.match(overlay,/pointer-events-none/)
  assert.match(overlay,/\[&_a\]:pointer-events-auto/)
  assert.match(hero,/hero-content studio-shell relative z-10/)
})

test('hero icons keep configured destinations, named links and full-size tap targets',async()=>{
  const socials=await readFile(new URL('src/components/HeroSocialLinks.jsx',root),'utf8')
  assert.match(socials,/href=\{social.href\}/)
  assert.match(socials,/target="_blank"/)
  assert.match(socials,/rel="noopener noreferrer"/)
  assert.match(socials,/aria-label=\{`Follow Samuel Studio on \$\{social.label\}/)
  assert.match(socials,/h-11 w-11/)
  assert.match(socials,/flex-col items-end/)
  assert.match(socials,/sm:flex-row sm:items-center/)
  const site=await readFile(new URL('src/data/site.js',root),'utf8')
  assert.match(site,/https:\/\/www.instagram.com\/ssp.capture\//)
})
