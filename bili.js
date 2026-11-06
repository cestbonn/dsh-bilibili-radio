import http from "node:http"
import https from "node:https"
import dns from "node:dns"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { createHash } from "node:crypto"

const sysLookup = dns.lookup.bind(dns)
const dohMemo = new Map()

async function dohA(host) {
  const hit = dohMemo.get(host)
  if (hit && hit.exp > Date.now()) return hit.ips
  const urls = [
    "https://1.12.12.12/dns-query?name=" + encodeURIComponent(host) + "&type=A",
    "https://223.5.5.5/resolve?name=" + encodeURIComponent(host) + "&type=1"
  ]
  for (const url of urls) {
    try {
      const j = await fetch(url, { headers: { accept: "application/dns-json" }, signal: AbortSignal.timeout(4000) }).then((r) => r.json())
      const ips = [...new Set((j.Answer || []).filter((a) => a.type === 1).map((a) => a.data))]
      if (ips.length) {
        dohMemo.set(host, { ips, exp: Date.now() + 60 * 1000 })
        return ips
      }
    } catch {}
  }
  throw new Error("ENOTFOUND")
}

function biliLookup(hostname, opts, cb) {
  if (typeof opts === "function") {
    cb = opts
    opts = {}
  }
  sysLookup(hostname, opts, (err, address, family) => {
    if (!err) return cb(null, address, family)
    dohA(hostname).then((ips) => {
      if (opts && opts.all) cb(null, ips.map((ip) => ({ address: ip, family: 4 })))
      else cb(null, ips[0], 4)
    }).catch(() => cb(err))
  })
}

dns.lookup = biliLookup

const GSAP_JS = (() => {
  try {
    return readFileSync(join(dirname(fileURLToPath(import.meta.url)), "gsap.min.js"))
  } catch {
    return null
  }
})()

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
const REFERER = "https://www.bilibili.com/"
const buvid3 = crypto.randomUUID()
const HEADERS = {
  "User-Agent": UA,
  Referer: REFERER,
  Cookie: `buvid3=${buvid3}; buvid4=${buvid3}`
}
const MIXIN = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52]
const audioCache = new Map()
let wbi = null

function cors(res, extra = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Range, Content-Type",
    "Access-Control-Expose-Headers": "Content-Length, Content-Range, Accept-Ranges",
    ...extra
  }
}

function json(res, status, body) {
  res.writeHead(status, cors({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  }))
  res.end(JSON.stringify(body))
}

function stripHtml(s) {
  return String(s || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function httpsUrl(u) {
  if (!u) return ""
  if (u.startsWith("//")) return "https:" + u
  if (u.startsWith("http://")) return "https://" + u.slice(7)
  return u
}

function parseDuration(v) {
  if (v == null || v === "") return 0
  if (typeof v === "number" && Number.isFinite(v)) return Math.round(v)
  const s = String(v).trim()
  if (/^\d+$/.test(s)) return Number(s)
  const parts = s.split(":").map(Number)
  if (parts.some((n) => Number.isNaN(n))) return 0
  return parts.reduce((acc, n) => acc * 60 + n, 0)
}

let proxyServer = null

async function biliJson(url, tries = 3, extra = {}) {
  let last = new Error("请求失败")
  for (let i = 0; i < tries; i++) {
    const headers = { ...HEADERS, ...extra }
    if (extra && extra.Cookie === null) delete headers.Cookie
    try {
      const r = await fetch(url, { headers, signal: AbortSignal.timeout(8000) })
      if (r.status === 412) {
        last = new Error("B 站暂时挡住了搜索，再试一次")
        await new Promise((ok) => setTimeout(ok, 400 * (i + 1)))
        continue
      }
      if (!r.ok) throw new Error(`bili ${r.status}`)
      return await r.json()
    } catch (error) {
      last = error
    }
  }
  throw last
}

async function wbiQuery(params) {
  if (!wbi || Date.now() - wbi.at > 6 * 3600 * 1000) {
    const nav = await biliJson("https://api.bilibili.com/x/web-interface/nav")
    const take = (u) => String(u || "").split("/").pop().split(".")[0]
    const raw = take(nav.data?.wbi_img?.img_url) + take(nav.data?.wbi_img?.sub_url)
    wbi = { mixin: MIXIN.map((i) => raw[i] || "").join("").slice(0, 32), at: Date.now() }
  }
  const obj = { ...params, wts: Math.round(Date.now() / 1000) }
  const query = Object.keys(obj)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(obj[k]).replace(/[!'()*]/g, ""))}`)
    .join("&")
  return `${query}&w_rid=${createHash("md5").update(query + wbi.mixin).digest("hex")}`
}

function trackFromCard(row) {
  return {
    bvid: row.bvid,
    aid: row.aid || 0,
    mid: row.owner?.mid || row.author?.mid || row.mid || 0,
    cid: row.cid || 0,
    title: stripHtml(row.title),
    owner: row.owner?.name || row.author?.name || (typeof row.author === "string" ? row.author : ""),
    cover: httpsUrl(row.pic || row.cover),
    duration: parseDuration(row.duration || row.length),
    view: row.stat?.view || row.view || row.play || 0,
    like: row.stat?.like || 0,
    reply: row.stat?.reply || row.comment || 0,
    favorite: row.stat?.favorite || row.favorites || 0,
    danmaku: row.stat?.danmaku || row.video_review || 0,
    pages: []
  }
}

function trackFromView(data, page) {
  const pages = Array.isArray(data.pages) && data.pages.length ? data.pages : [{ cid: data.cid, part: data.title, duration: data.duration }]
  const p = pages[page] || pages[0]
  return {
    bvid: data.bvid,
    aid: data.aid || 0,
    mid: data.owner?.mid || 0,
    cid: p.cid,
    title: pages.length > 1 && p.part && p.part !== data.title ? `${stripHtml(data.title)} · ${stripHtml(p.part)}` : stripHtml(data.title),
    owner: data.owner?.name || "",
    cover: httpsUrl(data.pic),
    duration: parseDuration(p.duration || data.duration),
    view: data.stat?.view || 0,
    like: data.stat?.like || 0,
    reply: data.stat?.reply || 0,
    favorite: data.stat?.favorite || 0,
    danmaku: data.stat?.danmaku || 0,
    desc: stripHtml(data.desc || "").slice(0, 280),
    pages: pages.map((x) => ({
      cid: x.cid,
      part: stripHtml(x.part || data.title),
      duration: parseDuration(x.duration)
    }))
  }
}

export async function resolveQuery(q) {
  const text = String(q || "").trim()
  if (!text) return null
  const bv = text.match(/BV[a-zA-Z0-9]{10}/)
  if (bv) {
    const j = await biliJson(`https://api.bilibili.com/x/web-interface/view?bvid=${bv[0]}`)
    if (j.code !== 0 || !j.data) throw new Error(j.message || "找不到这个视频")
    return trackFromView(j.data, 0)
  }
  const av = text.match(/(?:^|[^\w])av(\d+)/i) || text.match(/^(\d{3,})$/)
  if (av) {
    const j = await biliJson(`https://api.bilibili.com/x/web-interface/view?aid=${av[1]}`)
    if (j.code !== 0 || !j.data) throw new Error(j.message || "找不到这个视频")
    return trackFromView(j.data, 0)
  }
  const short = text.match(/b23\.tv\/([A-Za-z0-9]+)/i)
  if (short) {
    const r = await fetch(`https://b23.tv/${short[1]}`, { headers: HEADERS, redirect: "follow" })
    return resolveQuery(r.url)
  }
  return null
}

export async function searchVideos(q, page = 1) {
  page = Math.max(1, Number(page) || 1)
  if (page === 1) {
    const direct = await resolveQuery(q)
    if (direct) return { items: [direct], hasMore: false }
  }
  let j
  try {
    j = await biliJson(`https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(q)}&page=${page}`)
  } catch {
    j = null
  }
  if (!j || j.code !== 0 || !Array.isArray(j.data?.result)) {
    const qs = await wbiQuery({ search_type: "video", keyword: q, page: String(page) })
    j = await biliJson(`https://api.bilibili.com/x/web-interface/wbi/search/type?${qs}`)
  }
  if (j.code !== 0) throw new Error(j.message || "搜索失败")
  const rows = Array.isArray(j.data?.result) ? j.data.result : []
  const pages = Number(j.data?.numPages || 0)
  return {
    items: rows.map((row) => trackFromCard(row)).filter((item) => item && item.bvid),
    hasMore: pages ? page < pages : rows.length >= 20
  }
}

export async function relatedVideos(bvid) {
  const j = await biliJson(`https://api.bilibili.com/x/web-interface/archive/related?bvid=${encodeURIComponent(bvid)}`)
  if (j.code !== 0) throw new Error(j.message || "推荐失败")
  const rows = Array.isArray(j.data) ? j.data : []
  return { items: rows.map((row) => trackFromCard(row)).filter((x) => x.bvid) }
}

function mapReply(row) {
  return {
    id: String(row.rpid),
    name: row.member?.uname || "",
    avatar: httpsUrl(row.member?.avatar || ""),
    text: stripHtml(row.content?.message || ""),
    like: row.like || 0,
    time: row.ctime || 0
  }
}

function replyItems(rows) {
  const seen = new Set()
  const items = []
  for (const row of rows) {
    if (!row || !row.rpid) continue
    const id = String(row.rpid)
    if (seen.has(id)) continue
    seen.add(id)
    items.push(mapReply(row))
  }
  return items
}

function asRows(v) {
  return Array.isArray(v) ? v : (v ? [v] : [])
}

export async function listComments(aid, offset = "") {
  const qs = await wbiQuery({
    oid: String(aid),
    type: 1,
    mode: 3,
    pagination_str: JSON.stringify({ offset: String(offset || "") }),
    plat: 1,
    web_location: 1315875
  })
  const j = await biliJson(`https://api.bilibili.com/x/v2/reply/wbi/main?${qs}`, 3, { Cookie: null })
  if (j.code === 12002) return { items: [], closed: true, hasMore: false, next: "", total: 0 }
  if (j.code !== 0) throw new Error(j.message || "评论失败")
  const tops = offset ? [] : asRows(j.data?.top_replies).concat(asRows(j.data?.upper?.top), asRows(j.data?.hots))
  const rows = Array.isArray(j.data?.replies) ? j.data.replies : []
  const items = replyItems(tops.concat(rows))
  const next = j.data?.cursor?.pagination_reply?.next_offset || ""
  const total = Number(j.data?.cursor?.all_count || 0)
  return { items, closed: false, hasMore: !j.data?.cursor?.is_end && Boolean(next), next, total }
}

async function musicChannelPage(displayId) {
  const j = await biliJson(`https://api.bilibili.com/x/web-interface/region/feed/rcmd?display_id=${displayId}&request_cnt=15&from_region=1003&device=web&plat=30&web_location=333.40138`)
  if (j.code !== 0) throw new Error(j.message || "发现失败")
  return Array.isArray(j.data?.archives) ? j.data.archives : []
}

function uniqTracks(rows) {
  const seen = new Set()
  return rows.filter((item) => item && item.bvid && !seen.has(item.bvid) && seen.add(item.bvid))
}

function trackFromMusic(row) {
  const arc = Array.isArray(row.arc_list) ? row.arc_list[0] : null
  const bvid = row.creation_bvid || row.mv_bvid || arc?.bvid || ""
  if (!bvid) return null
  return {
    bvid,
    aid: row.creation_aid || row.mv_aid || arc?.aid || 0,
    mid: row.creation_up || arc?.mid || 0,
    cid: row.creation_first_cid || arc?.first_cid || 0,
    title: [row.music_title, row.singer].filter(Boolean).join(" · ") || stripHtml(row.creation_title || arc?.title || ""),
    owner: row.creation_nickname || arc?.up_name || row.singer || "",
    cover: httpsUrl(row.mv_cover || row.creation_cover || arc?.cover || ""),
    duration: parseDuration(row.creation_duration || 0),
    view: row.creation_play || arc?.play || row.heat || 0,
    like: 0,
    reply: 0,
    danmaku: 0,
    pages: []
  }
}

async function latestMusicListId(listType, fallback) {
  try {
    const j = await biliJson(`https://api.bilibili.com/x/copyright-music-publicity/toplist/all_period?list_type=${listType}`)
    const years = Object.keys(j.data?.list || {}).sort((a, b) => Number(b) - Number(a))
    return (j.data.list[years[0]] || [])[0]?.ID || fallback
  } catch {
    return fallback
  }
}

async function musicToplist(listType, fallbackId) {
  const id = await latestMusicListId(listType, fallbackId)
  const j = await biliJson(`https://api.bilibili.com/x/copyright-music-publicity/toplist/music_list?list_id=${id}`)
  if (j.code !== 0) throw new Error(j.message || "榜单失败")
  return uniqTracks((Array.isArray(j.data?.list) ? j.data.list : []).map(trackFromMusic))
}

async function popularMusicRank() {
  const j = await biliJson("https://api.bilibili.com/x/web-interface/ranking/v2?rid=3&type=all")
  if (j.code !== 0) throw new Error(j.message || "排行失败")
  return uniqTracks((Array.isArray(j.data?.list) ? j.data.list : []).map(trackFromCard))
}

export async function discoverMusic() {
  const [hot, fresh, rank, feed] = await Promise.all([
    musicToplist(1, 445).catch(() => []),
    musicToplist(3, 446).catch(() => []),
    popularMusicRank().catch(() => []),
    musicChannelPage(1).then((rows) => uniqTracks(rows.map(trackFromCard))).catch(() => [])
  ])
  const sections = [
    { id: "hot", title: "热歌榜", items: hot.slice(0, 20) },
    { id: "fresh", title: "新歌榜", items: fresh.slice(0, 20) },
    { id: "rank", title: "全站音乐排行", items: rank.slice(0, 20) },
    { id: "feed", title: "音乐分区", items: feed.slice(0, 15) }
  ].filter((section) => section.items.length)
  if (!sections.length) return { sections: [], error: "发现暂时没有内容" }
  return { sections }
}

async function searchUserRows(q) {
  const keyword = String(q || "").trim()
  if (!keyword) return []
  let j
  try {
    j = await biliJson(`https://api.bilibili.com/x/web-interface/search/type?search_type=bili_user&keyword=${encodeURIComponent(keyword)}`)
  } catch {
    j = null
  }
  if (!j || j.code !== 0 || !Array.isArray(j.data?.result)) {
    const qs = await wbiQuery({ search_type: "bili_user", keyword })
    j = await biliJson(`https://api.bilibili.com/x/web-interface/wbi/search/type?${qs}`)
  }
  return Array.isArray(j?.data?.result) ? j.data.result : []
}

async function findUpMid(name) {
  const q = String(name || "").trim()
  if (!q) return 0
  const rows = await searchUserRows(q)
  const hit = rows.find((row) => row.uname === q) || rows.slice().sort((a, b) => (b.videos || 0) - (a.videos || 0))[0]
  return Number(hit?.mid) || 0
}

export async function searchUps(query, limit = 8) {
  const items = (await searchUserRows(query)).map((row) => ({
    mid: Number(row.mid) || 0,
    name: row.uname || "",
    sign: stripHtml(row.usign || ""),
    fans: row.fans || 0,
    videos: row.videos || 0
  })).filter((item) => item.mid)
  if (!items.length) throw new Error("没找到这个 UP")
  return items.slice(0, limit)
}

function mapCollection(item, type) {
  const meta = item?.meta || {}
  const first = Array.isArray(item?.archives) ? item.archives[0] : null
  return {
    id: String(meta.season_id || meta.series_id || ""),
    type,
    name: stripHtml(meta.name || ""),
    cover: httpsUrl(meta.cover || first?.pic || ""),
    count: Number(meta.total || (item.archives || []).length || 0),
    desc: stripHtml(meta.description || "")
  }
}

async function upProfile(mid, name) {
  let videoTotal = 0
  let collectionTotal = 0
  let uname = String(name || "").trim()
  try {
    const j = await biliJson(`https://api.bilibili.com/x/space/navnum?mid=${mid}`)
    if (j.code === 0) {
      videoTotal = Number(j.data?.video || 0)
      collectionTotal = Number(j.data?.season_num || j.data?.season || 0)
    }
  } catch {}
  if (!uname) {
    try {
      const j = await biliJson(`https://api.bilibili.com/x/web-interface/search/type?search_type=bili_user&keyword=${encodeURIComponent(String(mid))}`)
      const hit = (j.data?.result || []).find((row) => Number(row.mid) === Number(mid))
      if (hit?.uname) uname = hit.uname
      if (!videoTotal && hit?.videos) videoTotal = Number(hit.videos) || 0
    } catch {}
  }
  if (!uname && name) uname = name
  return { name: uname, videoTotal, collectionTotal }
}

async function listUpCollections(mid) {
  if (!mid) return []
  const space = { Referer: `https://space.bilibili.com/${mid}/lists` }
  const items = []
  for (let page = 1; page <= 15; page++) {
    let j
    try {
      j = await biliJson(`https://api.bilibili.com/x/polymer/web-space/seasons_series_list?mid=${mid}&page_num=${page}&page_size=20`, 3, { ...space, Cookie: null })
    } catch {
      break
    }
    if (!j || j.code !== 0) break
    const lists = j.data?.items_lists || {}
    const batch = []
      .concat((lists.seasons_list || []).map((item) => mapCollection(item, "season")))
      .concat((lists.series_list || []).map((item) => mapCollection(item, "series")))
      .filter((item) => item.id)
    items.push(...batch)
    const total = Number(lists.page?.total || 0)
    if (!batch.length || (total && items.length >= total) || batch.length < 20) break
  }
  return items
}

async function trySpaceArchives(id, page) {
  const space = { Referer: `https://space.bilibili.com/${id}/video` }
  try {
    const qs = await wbiQuery({
      mid: String(id),
      pn: String(page),
      ps: "50",
      tid: "0",
      keyword: "",
      order: "pubdate"
    })
    const j = await biliJson(`https://api.bilibili.com/x/space/wbi/arc/search?${qs}`, 2, { ...space, Cookie: null })
    if (j.code !== 0) return null
    const rows = j.data?.list?.vlist || []
    const total = Number(j.data?.page?.count || 0)
    return {
      items: rows.map((row) => trackFromCard(row)).filter((x) => x.bvid),
      total,
      hasMore: page * 50 < total
    }
  } catch {
    return null
  }
}

async function searchUpPage(id, name, page) {
  const q = String(name || "").trim()
  if (!q) return { items: [], total: 0, hasMore: false }
  let j
  try {
    j = await biliJson(`https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(q)}&order=pubdate&page=${page}`)
  } catch {
    j = null
  }
  if (!j || j.code !== 0 || !Array.isArray(j.data?.result)) {
    const qs = await wbiQuery({ search_type: "video", keyword: q, order: "pubdate", page: String(page) })
    j = await biliJson(`https://api.bilibili.com/x/web-interface/wbi/search/type?${qs}`)
  }
  if (!j || j.code !== 0) return { items: [], total: 0, hasMore: false }
  const rows = (j.data?.result || []).map((row) => trackFromCard(row)).filter((item) => item.bvid)
  const matched = id ? rows.filter((item) => Number(item.mid) === Number(id)) : rows
  const items = (matched.length ? matched : rows).map((item) => Object.assign({}, item, { owner: item.owner || name }))
  const pages = Number(j.data?.numPages || 0)
  return {
    items,
    total: Number(j.data?.numResults || 0),
    hasMore: page < pages
  }
}

async function listUpArchives(id, name, page) {
  const space = await trySpaceArchives(id, page)
  if (space && space.items.length) {
    return {
      items: space.items.map((item) => Object.assign({}, item, { mid: item.mid || id, owner: item.owner || name || "" })),
      total: space.total,
      hasMore: space.hasMore
    }
  }
  return searchUpPage(id, name, page)
}

export async function upVideos(mid, name, pn = 1) {
  let id = Number(mid) || 0
  const page = Math.max(1, Number(pn) || 1)
  if (!id && name) id = await findUpMid(name)
  if (!id && !name) throw new Error("找不到这个 UP")
  const profile = page === 1 ? await upProfile(id, name) : { name: name || "", videoTotal: 0, collectionTotal: 0 }
  const uname = profile.name || name || ""
  const [archives, collections] = await Promise.all([
    id ? listUpArchives(id, uname, page) : searchUpPage(0, uname, page),
    page === 1 ? listUpCollections(id) : Promise.resolve([])
  ])
  if (page === 1 && !archives.items.length && !collections.length) {
    throw new Error(uname ? "这个 UP 暂时没有稿件" : "打不开这个 UP 的稿件")
  }
  return {
    items: archives.items,
    collections,
    mid: id,
    name: uname || archives.items[0]?.owner || "",
    videoTotal: profile.videoTotal || archives.total || 0,
    collectionTotal: collections.length || profile.collectionTotal || 0,
    page,
    hasMore: Boolean(archives.hasMore)
  }
}

export async function upCollection(mid, type, id) {
  const uid = Number(mid) || 0
  const sid = String(id || "")
  if (!uid || !sid) throw new Error("缺少合集")
  const space = { Referer: `https://space.bilibili.com/${uid}/lists` }
  let rows = []
  let name = ""
  if (type === "series") {
    const j = await biliJson(`https://api.bilibili.com/x/series/archives?mid=${uid}&series_id=${encodeURIComponent(sid)}&only_normal=true&sort=desc&pn=1&ps=50`, 3, space)
    if (j.code !== 0) throw new Error(j.message || "打不开这个系列")
    rows = j.data?.archives || []
    name = j.data?.meta?.name || ""
  } else {
    const j = await biliJson(`https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=${uid}&season_id=${encodeURIComponent(sid)}&sort_reverse=false&page_num=1&page_size=50`, 3, space)
    if (j.code !== 0) throw new Error(j.message || "打不开这个合集")
    rows = j.data?.archives || []
    name = j.data?.meta?.name || ""
  }
  return {
    items: rows.map((row) => Object.assign(trackFromCard(row), { mid: uid })).filter((x) => x.bvid),
    name
  }
}

function unique(list) {
  const seen = new Set()
  return list.filter((item) => {
    const key = item.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

let hostLlm = null
let llmRoute = null

export function setLlm(llm) {
  hostLlm = llm || null
  llmRoute = null
}

function extractJsonObject(text) {
  const start = String(text || "").indexOf("{")
  if (start < 0) return ""
  let depth = 0
  let inString = false
  let escaped = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (escaped) escaped = false
      else if (ch === "\\") escaped = true
      else if (ch === "\"") inString = false
      continue
    }
    if (ch === "\"") inString = true
    else if (ch === "{") depth++
    else if (ch === "}") {
      depth--
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
  return ""
}

export function parseQueryJson(text) {
  const raw = extractJsonObject(text)
  if (!raw) return null
  try {
    const o = JSON.parse(raw)
    const songs = (Array.isArray(o.songs) ? o.songs : []).map((s) => String(s || "").trim()).filter(Boolean)
    if (!songs.length) return null
    return { artist: String(o.artist || "").trim(), songs: unique(songs) }
  } catch {
    return null
  }
}

const PARSE_SYS = `给出原曲的歌名和歌手。只输出 JSON：{"artist":"歌手","songs":["歌名"]}`

async function pickLlmRoute(llm) {
  if (llmRoute) return llmRoute
  const providers = typeof llm.listProviders === "function" ? llm.listProviders() : []
  for (const item of providers) {
    if (!item?.id || typeof llm.listModels !== "function") continue
    try {
      const models = await llm.listModels(item.id)
      const model = (models.find((m) => /flash/i.test(m.id || "")) || models[0] || {}).id
      if (!model) continue
      llmRoute = { provider: item.id, model }
      return llmRoute
    } catch {}
  }
  return null
}

async function collectLlmText(stream) {
  let text = ""
  for await (const chunk of stream) {
    if (chunk?.type === "text-delta" && typeof chunk.text === "string") text += chunk.text
    if (chunk?.type === "finish" && (chunk.reason?.kind === "error" || chunk.reason?.kind === "aborted")) return ""
  }
  return text
}

async function parseLyricQuery(title, desc) {
  if (!hostLlm?.stream) return null
  const route = await pickLlmRoute(hostLlm)
  if (!route) return null
  try {
    const stream = hostLlm.stream({
      provider: route.provider,
      model: route.model,
      system: PARSE_SYS,
      messages: [{
        role: "user",
        content: [{
          type: "text",
          text: [title, desc].filter(Boolean).join("\n").slice(0, 900)
        }]
      }],
      reasoningEffort: "off",
      maxTokens: 200,
      temperature: 0,
      signal: AbortSignal.timeout(15000)
    })
    return parseQueryJson(await collectLlmText(stream))
  } catch {
    llmRoute = null
    return null
  }
}

function normalizeName(s) {
  return String(s || "").toLowerCase().replace(/[\s\u3000·・\-–—'’"“”()（）]/g, "")
}

function linesFromPlain(text) {
  return String(text || "").split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !/^\[[a-z]+:/i.test(s)).map((line) => ({ from: 0, to: 0, text: line }))
}

function linesFromLyric(item) {
  const synced = parseLrc(item.syncedLyrics || "")
  if (synced.length) return synced
  const dur = item.duration > 1000 ? item.duration / 1000 : item.duration
  return fitLyricTimes(linesFromPlain(item.plainLyrics || ""), dur)
}

export function parseLrc(text) {
  const lines = []
  String(text || "").split(/\r?\n/).forEach((raw) => {
    const stamps = Array.from(raw.matchAll(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g))
    if (!stamps.length) return
    const body = raw.replace(/\[[^\]]*\]/g, "").trim()
    if (!body) return
    stamps.forEach((m) => {
      const from = Number(m[1]) * 60 + Number(m[2]) + Number((m[3] || "0").padEnd(3, "0").slice(0, 3)) / 1000
      lines.push({ from, to: from, text: body })
    })
  })
  lines.sort((a, b) => a.from - b.from)
  for (let i = 0; i < lines.length; i++) {
    lines[i].to = i + 1 < lines.length ? lines[i + 1].from : lines[i].from + 6
  }
  return lines
}

export function fitLyricTimes(lines, duration) {
  const rows = Array.isArray(lines) ? lines.filter((l) => l && String(l.text || "").trim()) : []
  if (!rows.length) return rows
  if (rows.some((l) => Number(l.from) > 0)) {
    return rows.slice().sort((a, b) => (Number(a.from) || 0) - (Number(b.from) || 0))
  }
  const stamped = parseLrc(rows.map((l) => l.text).join("\n"))
  if (stamped.length) return stamped
  const d = Number(duration) || 0
  if (d <= 1) return rows
  const n = rows.length
  return rows.map((l, i) => ({ from: (i / n) * d, to: ((i + 1) / n) * d, text: l.text }))
}

function itemTitle(item) {
  return item.name || item.trackName || ""
}

function itemArtist(item) {
  return item.artistName || (item.artists || []).map((a) => a.name).join(" ")
}

function itemHasLyric(item) {
  return Boolean(item.syncedLyrics || item.plainLyrics || item.id)
}

export function scoreLyricHit(song, artist, wantDur, name, hitArtist, duration) {
  const title = normalizeName(name)
  const s = normalizeName(song)
  if (!s || s.length < 2 || !title) return -1
  if (title === s) return 2
  if (title.includes(s) || (title.length >= 2 && s.includes(title))) return 1
  return -1
}

function artistFit(item, artist) {
  const a = normalizeName(artist)
  const h = normalizeName(itemArtist(item) || item.artist || "")
  if (!a || !h) return 0
  return h === a || h.includes(a) || a.includes(h) ? 1 : 0
}

export function pickLyricSong(songs, song, artist, wantDur) {
  const ranked = []
  for (const item of songs) {
    if (!itemHasLyric(item)) continue
    const dur = item.duration > 1000 ? item.duration / 1000 : item.duration
    const score = scoreLyricHit(song, artist, wantDur, itemTitle(item), itemArtist(item), dur)
    if (score < 0) continue
    ranked.push({ item, score, dur, who: artistFit(item, artist), synced: Boolean(item.syncedLyrics) })
  }
  if (!ranked.length) return null
  ranked.sort((a, b) => {
    if (a.who !== b.who) return b.who - a.who
    const da = wantDur ? Math.abs((a.dur || 0) - wantDur) : 0
    const db = wantDur ? Math.abs((b.dur || 0) - wantDur) : 0
    if (wantDur && da !== db) return da - db
    if (a.score !== b.score) return b.score - a.score
    return (b.synced ? 1 : 0) - (a.synced ? 1 : 0)
  })
  return ranked[0].item
}

async function lyricFromNetease(song, artist, wantDur) {
  const q = artist ? `${artist} ${song}` : song
  const r = await fetch(`https://music.163.com/api/search/get/web?s=${encodeURIComponent(q)}&type=1&offset=0&limit=20`, {
    headers: { "User-Agent": UA, Referer: "https://music.163.com/" }
  })
  if (!r.ok) return null
  const songs = (await r.json())?.result?.songs || []
  const best = pickLyricSong(songs, song, artist, wantDur)
  if (!best) return null
  const lr = await fetch(`https://music.163.com/api/song/lyric?id=${best.id}&lv=-1&tv=-1`, {
    headers: { "User-Agent": UA, Referer: "https://music.163.com/" }
  })
  if (!lr.ok) return null
  const data = await lr.json()
  const lrc = data?.lrc?.lyric || data?.tlyric?.lyric || ""
  const lines = parseLrc(lrc)
  const fallback = lines.length ? lines : linesFromPlain(lrc)
  const dur = wantDur || (best.duration || 0) / 1000
  return fallback.length ? { lines: fitLyricTimes(fallback, dur), name: best.name, artist: (best.artists || []).map((a) => a.name).join(" / "), duration: (best.duration || 0) / 1000, source: "网易云" } : null
}

function isCfPage(text) {
  return /just a moment|__cf_chl|challenge-platform/i.test(text || "")
}

function parseKugeciSearch(html) {
  const songs = []
  if (!html || isCfPage(html)) return songs
  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || []
  for (const row of rows) {
    const sm = row.match(/href=["'][^"']*\/song\/(\w+)["'][^>]*>([\s\S]*?)<\/a>/i)
    if (!sm) continue
    const name = stripHtml(sm[2])
    if (!name) continue
    const artists = []
    for (const m of row.matchAll(/href=["'][^"']*\/singer\/[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      const who = stripHtml(m[1])
      if (who) artists.push(who)
    }
    songs.push({ id: sm[1], name, artistName: artists.join(" "), artists: artists.map((n) => ({ name: n })) })
  }
  return songs
}

function kugeciLrcFromPage(html) {
  if (!html || isCfPage(html)) return ""
  const stamped = html.match(/\[[0-9]{1,2}:[0-9]{2}(?:\.[0-9]{1,3})?\][^<[\]\n]+/g)
  if (stamped && stamped.length) return stamped.map((s) => stripHtml(s)).filter(Boolean).join("\n")
  return stripHtml(html.replace(/<br\s*\/?>/gi, "\n"))
}

async function kugeciGet(url) {
  const r = await fetch(url, {
    headers: { "User-Agent": UA, Referer: "https://www.kugeci.com/", "Accept-Language": "zh-CN,zh;q=0.9" }
  })
  if (!r.ok) return ""
  return r.text()
}

async function lyricFromKugeci(song, artist, wantDur) {
  // ponytail: HTML search + /download/lrc/{id}, song page as fallback; CF challenge = miss
  const html = await kugeciGet("https://www.kugeci.com/search?q=" + encodeURIComponent(song))
  const best = pickLyricSong(parseKugeciSearch(html), song, artist, wantDur)
  if (!best) return null
  let text = await kugeciGet("https://www.kugeci.com/download/lrc/" + best.id)
  if (!text || isCfPage(text) || /<html[\s>]/i.test(text.slice(0, 160))) {
    text = kugeciLrcFromPage(await kugeciGet("https://www.kugeci.com/song/" + best.id))
  }
  if (isCfPage(text)) return null
  const lines = parseLrc(text)
  const fallback = lines.length ? lines : linesFromPlain(text)
  return fallback.length ? { lines: fitLyricTimes(fallback, wantDur), name: best.name, artist: best.artistName || artist, duration: wantDur || 0, source: "酷歌词" } : null
}

async function lyricFromLrclib(song, artist, wantDur) {
  const urls = []
  if (artist) urls.push(`https://lrclib.net/api/search?q=${encodeURIComponent(`${artist} ${song}`)}`)
  if (artist) urls.push(`https://lrclib.net/api/search?track_name=${encodeURIComponent(song)}&artist_name=${encodeURIComponent(artist)}`)
  urls.push(`https://lrclib.net/api/search?track_name=${encodeURIComponent(song)}`)
  const rows = []
  for (const url of urls) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } })
      if (!r.ok) continue
      const hit = await r.json()
      if (Array.isArray(hit) && hit.length) rows.push(...hit)
    } catch {}
  }
  const best = pickLyricSong(rows, song, artist, wantDur)
  if (!best) return null
  const lines = linesFromLyric(best)
  return lines.length ? { lines, name: best.trackName || best.name || song, artist: artist || best.artistName || "", duration: best.duration || 0, source: "LRCLIB" } : null
}

async function lyricForSong(song, artist, wantDur) {
  const cands = []
  try {
    const hit = await lyricFromNetease(song, artist, wantDur)
    if (hit) cands.push(hit)
  } catch {}
  try {
    const hit = await lyricFromKugeci(song, artist, wantDur)
    if (hit) cands.push(hit)
  } catch {}
  try {
    const hit = await lyricFromLrclib(song, artist, wantDur)
    if (hit) cands.push(hit)
  } catch {}
  if (!cands.length) return null
  const want = normalizeName(artist)
  cands.sort((a, b) => {
    const fa = want && normalizeName(a.artist).includes(want) ? 1 : 0
    const fb = want && normalizeName(b.artist).includes(want) ? 1 : 0
    if (fa !== fb) return fb - fa
    if (!wantDur) return 0
    return Math.abs((a.duration || 0) - wantDur) - Math.abs((b.duration || 0) - wantDur)
  })
  return cands[0]
}

function pickSubtitle(list) {
  if (!Array.isArray(list) || !list.length) return null
  const score = (row) => {
    const lan = String(row.lan || row.lang || "")
    if (/^zh/.test(lan) && !/^ai-/i.test(lan)) return 3
    if (/zh/.test(lan)) return 2
    if (/ai-/i.test(lan)) return 1
    return 0
  }
  return [...list].sort((a, b) => score(b) - score(a))[0]
}

function linesFromBcc(data) {
  const body = Array.isArray(data?.body) ? data.body : []
  return fitLyricTimes(body.map((row) => ({
    from: Number(row.from) || 0,
    to: Number(row.to) || Number(row.from) || 0,
    text: String(row.content || "").replace(/\s+/g, " ").trim()
  })).filter((line) => line.text), 0)
}

async function biliCaptions(bvid, cid) {
  if (!bvid) return null
  let id = cid
  if (!id) {
    try { id = (await viewTrack(bvid)).cid } catch { return null }
  }
  if (!id) return null
  const qs = await wbiQuery({ bvid, cid: String(id) })
  const j = await biliJson(`https://api.bilibili.com/x/player/wbi/v2?${qs}`, 3, { Cookie: null })
  const list = j.data?.subtitle?.subtitles || j.data?.subtitle?.list || []
  const hit = pickSubtitle(list)
  const url = httpsUrl(hit?.subtitle_url || hit?.subtitleUrl || "")
  if (!url) return null
  const r = await fetch(url, { headers: { "User-Agent": UA, Referer: REFERER } })
  if (!r.ok) return null
  const lines = linesFromBcc(await r.json())
  if (!lines.length) return null
  return { lines, songs: [], match: { name: hit.lan_doc || hit.lan || "", artist: "", source: "B站字幕" } }
}

export async function webLyrics(title, owner, duration, desc, bvid, cid) {
  let unsyncedCaps = null
  try {
    unsyncedCaps = await biliCaptions(bvid, cid)
  } catch {}
  let qTitle = title
  let qDesc = desc
  let qDur = duration
  if (bvid) {
    try {
      const view = await viewTrack(bvid, cid)
      qTitle = view.title || title
      qDesc = [view.desc, desc].filter(Boolean).join("\n").slice(0, 800)
      qDur = view.duration || duration
    } catch {}
  }
  let parsed = null
  try { parsed = await parseLyricQuery(qTitle, qDesc) } catch {}
  const artist = parsed?.artist || ""
  const songs = parsed?.songs || []
  const want = qDur && qDur < 540 ? qDur : 0
  if (songs.length) {
    const hit = await lyricForSong(songs[0], artist, want)
    if (hit?.lines?.length) {
      return {
        lines: fitLyricTimes(hit.lines, want || qDur),
        songs,
        match: { name: hit.name || songs[0], artist: hit.artist || artist, source: hit.source || "" }
      }
    }
  }
  if (unsyncedCaps?.lines?.length) {
    return Object.assign({}, unsyncedCaps, { lines: fitLyricTimes(unsyncedCaps.lines, qDur) })
  }
  return { lines: [], songs, match: null }
}

export async function viewTrack(bvid, cid) {
  const j = await biliJson(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`)
  if (j.code !== 0 || !j.data) throw new Error(j.message || "找不到这个视频")
  const pages = j.data.pages || []
  const idx = cid ? pages.findIndex((p) => String(p.cid) === String(cid)) : 0
  return trackFromView(j.data, idx < 0 ? 0 : idx)
}

export function asMusicQuery(query) {
  const s = String(query || "").trim()
  if (!s) return s
  if (/^BV1[0-9A-Za-z]+$/i.test(s) || /^av\d+$/i.test(s) || /^https?:/i.test(s)) return s
  if (/(歌|曲|唱|翻唱|钢琴|爵士|民谣|纯音|lofi|lo-fi|bossa|jazz|live|mv)/i.test(s)) return s
  return s + " 歌曲"
}

export function listAlias(name) {
  const q = String(name || "").trim()
  if (/^(我喜欢的|红心|喜欢(的歌单)?|liked)$/i.test(q)) return "liked"
  if (/^(听歌排行|排行榜?|最近常听|rank)$/i.test(q)) return "rank"
  if (/^(播放列表|队列|queue)$/i.test(q)) return "queue"
  return ""
}

export function listOpTarget(name) {
  const alias = listAlias(name)
  if (alias === "rank") return ""
  return alias || String(name || "").trim()
}

function songish(items) {
  const rows = (items || []).filter((item) => item && item.bvid)
  const ok = rows.filter((item) => {
    const d = Number(item.duration) || 0
    return d >= 90 && d <= 540
  })
  return (ok.length ? ok : rows).slice(0, 20)
}

export async function pickCandidates(query, limit = 5) {
  const q = String(query || "").trim()
  let items
  if (q) items = (await searchVideos(asMusicQuery(q))).items || []
  else {
    const disc = await discoverMusic()
    items = (disc.sections.find((s) => s.id === "hot") || disc.sections[0] || {}).items || []
  }
  const out = items.filter((item) => item && item.bvid).slice(0, limit)
  if (!out.length) throw new Error("没找到合适的歌")
  return out
}

export async function pickUpQueue(query) {
  const items = songish((await upVideos("", query, 1)).items)
  if (!items.length) throw new Error("这个 UP 没有可放的稿件")
  return items
}

export async function pickPlayable(query) {
  const item = (await pickCandidates(query, 1))[0]
  return item.cid ? item : viewTrack(item.bvid)
}

export async function tracksFromIds(ids, limit = 5) {
  const list = [...new Set((Array.isArray(ids) ? ids : []).map((id) => String(id || "").trim()).filter(Boolean))].slice(0, limit)
  const items = []
  for (const id of list) {
    try {
      const track = (await resolveQuery(id)) || await viewTrack(id)
      if (track && track.bvid) items.push(track)
    } catch {}
  }
  if (!items.length) throw new Error("这些编号里没有可放的歌")
  return items
}

let playCue = { n: 0, ops: [] }
export function setPlayCue(payload) {
  playCue.n += 1
  playCue.ops.push(Object.assign({}, payload || {}, { n: playCue.n }))
  // ponytail: keep 64; oldest drop if the client is gone
  if (playCue.ops.length > 64) playCue.ops.splice(0, playCue.ops.length - 64)
}
export function getPlayCue() {
  const last = playCue.ops[playCue.ops.length - 1] || {}
  return Object.assign({}, last, { n: playCue.n, ops: playCue.ops })
}

function slimNowItem(item) {
  if (!item || !item.bvid) return null
  return {
    bvid: String(item.bvid).slice(0, 20),
    cid: Number(item.cid) || 0,
    title: String(item.title || "").slice(0, 80),
    owner: String(item.owner || "").slice(0, 40),
    mid: Number(item.mid) || 0,
    duration: Number(item.duration) || 0
  }
}

let playerNow = { at: 0, playing: false, index: -1, track: null, queue: [], lists: [], ups: [] }
export function setPlayerNow(payload) {
  const body = payload || {}
  const queue = (Array.isArray(body.queue) ? body.queue : []).slice(0, 60).map(slimNowItem).filter(Boolean)
  const lists = (Array.isArray(body.lists) ? body.lists : []).slice(0, 40).map((list) => {
    const tracks = (Array.isArray(list.tracks) ? list.tracks : []).slice(0, 80).map(slimNowItem).filter(Boolean)
    return {
      id: String(list.id || "").slice(0, 40),
      name: String(list.name || "").slice(0, 40),
      n: Number(list.n) || tracks.length,
      tracks
    }
  }).filter((list) => list.id || list.name)
  const ups = (Array.isArray(body.ups) ? body.ups : []).slice(0, 40).map((up) => ({
    mid: Number(up && up.mid) || 0,
    name: String(up && up.name || "").slice(0, 40)
  })).filter((up) => up.mid)
  const index = Number(body.index)
  playerNow = {
    at: Date.now(),
    playing: Boolean(body.playing),
    index: Number.isFinite(index) ? index : -1,
    track: slimNowItem(body.track) || null,
    queue,
    lists,
    ups
  }
  if (!playerNow.track && playerNow.index >= 0) playerNow.track = queue[playerNow.index] || null
}
export function getPlayerNow() {
  return playerNow
}

function readJson(req) {
  return new Promise((ok) => {
    const chunks = []
    let n = 0
    req.on("data", (c) => {
      n += c.length
      if (n < 800000) chunks.push(c)
    })
    req.on("end", () => {
      try { ok(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")) }
      catch { ok({}) }
    })
    req.on("error", () => ok({}))
  })
}

function pickStreamUrl(a) {
  const all = [a.baseUrl || a.base_url, ...(a.backupUrl || a.backup_url || [])].filter(Boolean)
  return all.find((u) => /bilivideo\.com/.test(u) && !/mcdn/.test(u)) || all[0] || ""
}

async function audioUrl(bvid, cid) {
  const key = `${bvid}:${cid}`
  const hit = audioCache.get(key)
  if (hit && hit.exp > Date.now()) return hit.url
  const qs = await wbiQuery({ bvid, cid: String(cid), qn: "127", fnval: "4048", fourk: "1" })
  const j = await biliJson(`https://api.bilibili.com/x/player/wbi/playurl?${qs}`)
  if (j.code !== 0) throw new Error(j.message || "无法获取音频")
  const dash = j.data?.dash || {}
  const list = []
  if (dash.flac?.audio) list.push(dash.flac.audio)
  if (Array.isArray(dash.dolby?.audio)) list.push(...dash.dolby.audio)
  if (Array.isArray(dash.audio)) list.push(...dash.audio)
  const playable = list.filter((a) => a && (a.baseUrl || a.base_url || (a.backupUrl || a.backup_url || []).length) && !/ec-3|ac-3|eac3/i.test(a.codecs || ""))
  const best = (playable.length ? playable : list).sort((a, b) => (b.bandwidth || 0) - (a.bandwidth || 0))[0]
  const url = best && pickStreamUrl(best)
  if (!url) throw new Error("这个视频没有可播放的音频")
  audioCache.set(key, { url, exp: Date.now() + 30 * 60 * 1000 })
  return url
}

function allowedImg(raw) {
  try {
    const host = new URL(httpsUrl(raw)).hostname
    return /(^|\.)hdslb\.com$/.test(host) || /(^|\.)biliimg\.com$/.test(host)
  } catch {
    return false
  }
}

async function pipeFetch(req, res, target, cache = "no-store", type) {
  const ac = new AbortController()
  const stop = () => ac.abort()
  req.on("aborted", stop)
  res.on("close", () => { if (!res.writableEnded) stop() })
  let incoming
  try {
    const u = new URL(target)
    const headers = { ...HEADERS }
    if (req.headers.range) headers.Range = req.headers.range
    incoming = await new Promise((resolve, reject) => {
      const r = https.request({
        hostname: u.hostname,
        servername: u.hostname,
        path: u.pathname + u.search,
        method: "GET",
        headers,
        lookup: biliLookup,
        signal: ac.signal
      }, resolve)
      r.on("error", reject)
      r.end()
    })
    const out = cors({ "Cache-Control": cache })
    for (const name of ["content-type", "content-range", "accept-ranges"]) {
      const v = incoming.headers[name]
      if (v) out[name] = v
    }
    if (type) out["content-type"] = type
    if (type === "audio/mp4") out.Connection = "close"
    if (incoming.headers["content-range"]) {
      const len = incoming.headers["content-length"]
      if (len) out["content-length"] = len
    }
    if (!res.headersSent) res.writeHead(incoming.statusCode, out)
    incoming.on("error", () => { try { res.destroy() } catch {} })
    incoming.pipe(res)
    await new Promise((ok) => res.once("close", ok))
  } catch {
    try { incoming && incoming.destroy() } catch {}
    try {
      if (!res.writableEnded) {
        if (res.headersSent || ac.signal.aborted) res.destroy()
        else json(res, 502, { error: "请求失败" })
      }
    } catch {}
  } finally {
    req.off("aborted", stop)
  }
}

export function stopProxy() {
  const server = proxyServer
  proxyServer = null
  try { server?.closeAllConnections() } catch {}
  try { server?.close() } catch {}
}

export async function startProxy(port = 13210) {
  if (proxyServer && proxyServer.listening) {
    return { server: proxyServer, origin: `http://127.0.0.1:${port}` }
  }
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    if (req.method === "OPTIONS") {
      res.writeHead(204, cors())
      res.end()
      return
    }
    try {
      if (url.pathname === "/api/search") {
        const q = url.searchParams.get("q") || ""
        if (!q.trim()) return json(res, 400, { error: "请输入关键词" })
        const page = Math.max(1, Number(url.searchParams.get("page") || 1) || 1)
        return json(res, 200, await searchVideos(q.trim(), page))
      }
      if (url.pathname === "/api/view") {
        const bvid = url.searchParams.get("bvid") || ""
        const cid = url.searchParams.get("cid") || ""
        if (!bvid) return json(res, 400, { error: "缺少 bvid" })
        return json(res, 200, await viewTrack(bvid, cid))
      }
      if (url.pathname === "/api/audio") {
        const bvid = url.searchParams.get("bvid") || ""
        const cid = url.searchParams.get("cid") || ""
        if (!bvid || !cid) return json(res, 400, { error: "缺少参数" })
        return pipeFetch(req, res, await audioUrl(bvid, cid), "no-store", "audio/mp4")
      }
      if (url.pathname === "/api/related") {
        const bvid = url.searchParams.get("bvid") || ""
        if (!bvid) return json(res, 400, { error: "缺少 bvid" })
        return json(res, 200, await relatedVideos(bvid))
      }
      if (url.pathname === "/api/comments") {
        const aid = url.searchParams.get("aid") || ""
        const next = url.searchParams.get("next") || ""
        if (!aid) return json(res, 400, { error: "缺少 aid" })
        return json(res, 200, await listComments(aid, next))
      }
      if (url.pathname === "/api/discover") {
        return json(res, 200, await discoverMusic())
      }
      if (url.pathname === "/api/cue") {
        return json(res, 200, getPlayCue())
      }
      if (url.pathname === "/api/now") {
        if (req.method === "POST") {
          setPlayerNow(await readJson(req))
          return json(res, 200, { ok: true })
        }
        return json(res, 200, getPlayerNow())
      }
      if (url.pathname === "/api/up") {
        const mid = url.searchParams.get("mid") || ""
        const name = url.searchParams.get("name") || ""
        const pn = url.searchParams.get("pn") || "1"
        if (!mid && !name) return json(res, 400, { error: "缺少 UP" })
        return json(res, 200, await upVideos(mid, name, pn))
      }
      if (url.pathname === "/api/up/collection") {
        const mid = url.searchParams.get("mid") || ""
        const type = url.searchParams.get("type") || "season"
        const id = url.searchParams.get("id") || ""
        if (!mid || !id) return json(res, 400, { error: "缺少合集" })
        return json(res, 200, await upCollection(mid, type, id))
      }
      if (url.pathname === "/api/lyrics") {
        const title = url.searchParams.get("title") || ""
        const owner = url.searchParams.get("owner") || ""
        const desc = url.searchParams.get("desc") || ""
        const duration = Number(url.searchParams.get("duration") || 0)
        const bvid = url.searchParams.get("bvid") || ""
        const cid = url.searchParams.get("cid") || ""
        if (!title.trim() && !bvid) return json(res, 400, { error: "缺少歌名" })
        return json(res, 200, await webLyrics(title, owner, duration, desc, bvid, cid))
      }
      if (url.pathname === "/api/img") {
        const raw = url.searchParams.get("url") || ""
        if (!allowedImg(raw)) return json(res, 400, { error: "bad image" })
        return pipeFetch(req, res, httpsUrl(raw), "public, max-age=86400")
      }
      if (url.pathname === "/gsap.min.js") {
        if (!GSAP_JS) return json(res, 404, { error: "no gsap" })
        res.writeHead(200, cors({
          "Content-Type": "text/javascript; charset=utf-8",
          "Cache-Control": "public, max-age=86400"
        }))
        res.end(GSAP_JS)
        return
      }
      json(res, 404, { error: "not found" })
    } catch (err) {
      if (res.headersSent) try { res.end() } catch {}
      else json(res, 502, { error: String(err && err.message || err || "请求失败") })
    }
  })
  proxyServer = server
  return new Promise((done) => {
    server.once("error", () => {
      if (proxyServer === server) proxyServer = null
      done({ server: null, origin: `http://127.0.0.1:${port}` })
    })
    server.listen(port, "127.0.0.1", () => {
      if (proxyServer !== server) {
        try { server.close() } catch {}
        done({ server: null, origin: `http://127.0.0.1:${port}` })
        return
      }
      done({ server, origin: `http://127.0.0.1:${server.address().port}` })
    })
  })
}
