import { defineTool } from "@deepseek-ai/dsh-tools"
import { getPlayerNow, listAlias, listOpTarget, pickCandidates, pickPlayable, pickUpQueue, searchUps, setLlm, setPlayCue, startProxy, stopProxy, searchVideos, tracksFromIds, viewTrack } from "./bili.js"

export const name = "bilibili-radio"
export const inject = ["commands", "llm"]

function ok(text) {
  return { kind: "success", text }
}

function fail(text) {
  return { kind: "error", text }
}

function slimCue(track) {
  return {
    ok: true,
    bvid: track.bvid,
    cid: track.cid || 0,
    aid: track.aid || 0,
    mid: track.mid || 0,
    title: track.title || "",
    owner: track.owner || "",
    cover: track.cover || "",
    duration: track.duration || 0
  }
}

function cueNow(extra) {
  const cue = Object.assign({ ok: true, mode: "now" }, extra)
  setPlayCue(cue)
  return cue
}

function searchText(value) {
  if (value.users) {
    return value.users.map((item) => [item.mid, item.name, item.videos ? item.videos + "稿" : "", item.sign].filter(Boolean).join("  ")).join("\n") || "没有结果"
  }
  return ((value.items || []).map((item) => {
    const s = Number(item.duration) || 0
    return [item.bvid, Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"), item.title, item.owner].filter(Boolean).join("  ")
  }).join("\n")) || "没有结果"
}

function songLine(item) {
  return [item && item.title, item && item.owner].filter(Boolean).join(" · ")
}

function statusText(value) {
  if (!value || !value.at) return "播放器还没同步，打开过左侧 bilibili电台 才会有正在播放"
  const t = value.track
  const head = t && t.title
    ? ((value.playing ? "正在播放" : "已暂停") + "「" + t.title + "」" + (t.owner ? " · " + t.owner : "") + (value.index >= 0 ? "（第" + (value.index + 1) + "首）" : ""))
    : "现在没在放"
  if (value.listTracks) {
    const name = value.list || "歌单"
    const rows = value.listTracks.map((item, i) => (i + 1) + ". " + songLine(item)).join("\n")
    return head + "\n「" + name + "」" + (value.listTracks.length) + " 首：\n" + (rows || "空的")
  }
  const queue = value.queue || []
  const q = queue.length
    ? "播放列表 " + queue.length + " 首：\n" + queue.map((item, i) => (i === value.index ? "▶ " : "  ") + (i + 1) + ". " + songLine(item)).join("\n")
    : "播放列表是空的"
  const lists = value.lists || []
  const ls = lists.length
    ? "歌单：\n" + lists.map((list) => "  " + (list.name || list.id) + " " + (list.n || 0) + "首").join("\n")
    : "没有歌单"
  const ups = value.ups || []
  const us = ups.length
    ? "收藏的 UP：\n" + ups.map((up) => "  " + (up.name || up.mid)).join("\n")
    : "没有收藏的 UP"
  return [head, q, ls, us].join("\n")
}

function nowText(value) {
  if (value.mode === "status") return statusText(value)
  const playing = (value.track && value.track.title) || value.title
  const who = (value.track && value.track.owner) || value.owner || ""
  if (value.action === "pause") return playing ? "已暂停「" + playing + "」" : "已暂停"
  if (value.action === "resume") return playing ? "继续播放「" + playing + "」" : "继续播放"
  if (value.action === "next") return playing ? "下一首，正在播放「" + playing + "」" + (who ? " · " + who : "") : "已切下一首"
  if (value.action === "prev") return playing ? "上一首，正在播放「" + playing + "」" + (who ? " · " + who : "") : "已切上一首"
  if (value.action === "add") {
    const name = value.list === "liked" ? "我喜欢的" : (value.list || "歌单")
    return "已把" + (value.title ? "「" + value.title + "」" : "这首") + "加入「" + name + "」"
  }
  if (value.action === "remove") {
    const name = value.list === "liked" ? "我喜欢的" : (value.list || "歌单")
    return "已从「" + name + "」拿掉" + (value.title ? "「" + value.title + "」" : "这首")
  }
  if (value.action === "clear") {
    const name = value.list === "liked" ? "我喜欢的" : value.list === "queue" ? "播放列表" : (value.list || "播放列表")
    return "已清空「" + name + "」"
  }
  if (value.action === "create") return "已新建歌单「" + (value.list || "") + "」"
  if (value.action === "delete") return "已删除歌单「" + (value.list || "") + "」"
  if (value.action === "follow") return "已收藏 UP「" + (value.name || "") + "」"
  if (value.action === "unfollow") return "已取消收藏「" + (value.name || "") + "」"
  if (value.list) return "正在放歌单「" + value.list + "」"
  if (value.title) return `正在播放「${value.title}」${value.owner ? " · " + value.owner : ""}`
  return "好"
}

function sleep(ms) {
  return new Promise((ok) => setTimeout(ok, ms))
}

async function waitPlayerNow(pred, ms = 1800) {
  const t0 = Date.now()
  let snap = getPlayerNow()
  while (Date.now() - t0 < ms) {
    if (pred(snap)) return snap
    await sleep(120)
    snap = getPlayerNow()
  }
  return snap
}

function withNow(cue, now) {
  const track = now && now.track
  return Object.assign({}, cue, {
    playing: !!(now && now.playing),
    index: now && Number.isFinite(now.index) ? now.index : -1,
    track: track || null,
    title: (track && track.title) || cue.title || "",
    owner: (track && track.owner) || cue.owner || "",
    bvid: (track && track.bvid) || cue.bvid || ""
  })
}

export function apply(ctx) {
  try { setLlm(ctx.llm) } catch {}
  let origin = "http://127.0.0.1:13210"
  ctx.effect(() => {
    startProxy(13210).then((boot) => {
      if (boot && boot.origin) origin = boot.origin
    }).catch(() => {})
    return () => stopProxy()
  }, "bili-radio: proxy")

  ctx.inject(["tools"], (inner) => {
    inner.tools.register(defineTool({
      name: "bilibili_radio",
      description: "B 站听歌：看正在播放和播放列表、搜、推荐卡片、播放、暂停、切歌、放歌单、往歌单加歌或拿掉、清空、新建或删除歌单、收藏或取消收藏 UP。红心和听歌排行也是歌单，用 list。",
      parameters: {
        action: {
          type: "string",
          required: true,
          enum: ["status", "play", "pause", "resume", "next", "prev", "search", "suggest", "add", "remove", "clear", "create", "delete", "follow", "unfollow"],
          description: "status 看正在播什么、播放列表、歌单、收藏的 UP；play 开唱；pause/resume/next/prev 控制正在放的；search 搜候选给自己筛；suggest 把 BV 画成卡片；add 加入已有歌单（list=queue 就是当前播放列表）；remove 从歌单拿掉一首；clear 清空；create 新建用户歌单（不能建播放列表/我喜欢的/听歌排行）；delete 删除用户歌单；follow/unfollow 收藏或取消收藏 UP。"
        },
        query: {
          type: "string",
          description: "歌名、歌手、曲风、UP、BV。search、play、add、remove、follow、unfollow 用。场景句改成曲库词，比如 lofi 歌曲，不要整句丢进来。add/remove/follow 不写就用正在放的。"
        },
        list: {
          type: "string",
          description: "liked / rank / queue（播放列表）是固定歌单，不能新建同名。用户歌单才 create。status 可带 list 看里面的歌。play 可放；add/remove/clear 改已有歌单（对播放列表就是改当前队列；rank 不能改）。"
        },
        by: {
          type: "string",
          enum: ["song", "up", "keyword"],
          description: "search/play 搜什么，默认 song。"
        },
        ids: {
          type: "array",
          items: { type: "string" },
          description: "suggest 用的 BV 号，1～5 个，必须来自 search。"
        }
      },
      output: {
        schema: { type: "json" },
        render: (_args, value) => [{
          type: "text",
          text: !value ? "没找到" : value.mode === "search" ? searchText(value) : value.mode === "suggest" ? ("候选：" + ((value.items || []).map((item) => item.title).filter(Boolean).join(" / ") || "没有")) : nowText(value)
        }],
        presentationMeta: (_args, value) => value && (value.mode === "search" || value.mode === "edit" || value.mode === "status") ? { mode: value.mode } : value
      },
      async execute(args) {
        const action = String(args.action || "").trim()
        const query = String(args.query || "").trim()
        const list = String(args.list || "").trim()
        const by = String(args.by || "song").trim()
        if (action === "search") {
          if (by === "up") return { ok: true, mode: "search", by: "up", users: await searchUps(query, 8) }
          return { ok: true, mode: "search", by, items: (await pickCandidates(query, 12)).map(slimCue) }
        }
        if (action === "suggest") {
          return { ok: true, mode: "suggest", items: (await tracksFromIds(args.ids)).map(slimCue) }
        }
        if (action === "status") {
          const now = getPlayerNow()
          const lists = (now.lists || []).filter((item) => {
            const alias = listAlias(item.id) || listAlias(item.name)
            return alias !== "queue" && alias !== "rank"
          })
          const snap = { ok: true, mode: "status", at: now.at, playing: now.playing, index: now.index, track: now.track, queue: now.queue, lists: lists.map((item) => ({ id: item.id, name: item.name, n: item.n })), ups: now.ups || [] }
          if (!list) return snap
          const kind = listAlias(list)
          if (kind === "queue") return Object.assign(snap, { list: "播放列表", listTracks: now.queue || [] })
          const key = kind || list
          const hit = lists.find((item) => item.id === key || item.name === key) || lists.find((item) => item.name && (item.name.includes(key) || key.includes(item.name)))
          if (!hit) return Object.assign(snap, { list: key, listTracks: [], note: "没有这个歌单" })
          return Object.assign(snap, { list: hit.name || hit.id, listTracks: hit.tracks || [] })
        }
        if (action === "pause" || action === "resume" || action === "next" || action === "prev") {
          const before = getPlayerNow()
          const cue = cueNow({ action })
          const now = await waitPlayerNow((snap) => {
            if (action === "pause") return snap.playing === false && snap.at
            if (action === "resume") return snap.playing === true && snap.at
            const was = before.track && before.track.bvid
            const got = snap.track && snap.track.bvid
            return Boolean(got && got !== was)
          })
          return withNow(cue, now)
        }
        if (action === "follow" || action === "unfollow") {
          let mid = 0
          let name = query
          if (!query) {
            const t = getPlayerNow().track
            name = (t && t.owner) || ""
            mid = Number(t && t.mid) || 0
            if (!name && !mid) throw new Error("写下要收藏的 UP")
          }
          if (!mid) {
            const users = await searchUps(name || query, 1)
            mid = users[0].mid
            name = users[0].name
          }
          const cue = { ok: true, mode: "edit", action, mid, name }
          setPlayCue(cue)
          const now = await waitPlayerNow((snap) => {
            const has = (snap.ups || []).some((up) => Number(up.mid) === Number(mid))
            return action === "follow" ? has : !has
          })
          return Object.assign(cue, { ups: now.ups || [] })
        }
        if (action === "create" || action === "delete") {
          const alias = listAlias(list)
          const fixed = { queue: "播放列表", liked: "我喜欢的", rank: "听歌排行" }
          if (fixed[alias]) {
            if (action === "delete") throw new Error(alias === "queue" ? "播放列表不能删，清空用 clear" : fixed[alias] + "不能删")
            throw new Error(fixed[alias] + "是固定的，不能新建")
          }
          const target = listOpTarget(list)
          if (!target) throw new Error("写下歌单名")
          const cue = { ok: true, mode: "edit", action, list: target }
          setPlayCue(cue)
          return cue
        }
        if (action === "add" || action === "remove" || action === "clear") {
          if (listAlias(list) === "rank") throw new Error("听歌排行不能改")
          if (action === "clear") {
            const target = !list || listAlias(list) === "queue" ? "queue" : listOpTarget(list)
            if (!target) throw new Error("写下歌单名")
            const cue = { ok: true, mode: "edit", action, list: target }
            setPlayCue(cue)
            return cue
          }
          const target = listOpTarget(list) || (action === "add" ? "liked" : "")
          if (!target) throw new Error("写下歌单名")
          const cue = { ok: true, mode: "edit", action, list: target }
          if (query) Object.assign(cue, slimCue(await pickPlayable(query)))
          setPlayCue(cue)
          return cue
        }
        if (action === "play") {
          const target = listAlias(list) || list || listAlias(query)
          if (target) return cueNow({ action: "play", list: target })
          if (by === "up") {
            const queue = (await pickUpQueue(query)).map(slimCue)
            return cueNow(Object.assign({ action: "play", queue }, queue[0]))
          }
          if (!query) throw new Error("写下要放的歌或歌单")
          return cueNow(Object.assign({ action: "play" }, slimCue(await pickPlayable(query))))
        }
        throw new Error("不认识这个操作")
      }
    }))
  })

  ctx.inject(["systemPrompt"], (inner) => {
    inner.systemPrompt.section({
      name: "bili-radio",
      order: 72,
      text: () => "听歌用 bilibili_radio。播放列表、我喜欢的、听歌排行是固定歌单，各只有一份，禁止 create 同名，也不能再造一个叫「播放列表」的用户歌单。对播放列表的加歌/拿掉/清空就是改当前队列（list=queue）。要知道正在播什么、播放列表、有哪些歌单、收藏了哪些 UP：status（带 list 看某个歌单里的歌），不要猜，也不要说你看不到播放器。推荐：search（query 写成歌名/歌手/曲风；用户说场景时你改写成曲库词，写代码听 lo-fi → lofi 歌曲，不要把原句丢进来）→ 只挑约 2–8 分钟真单曲 → 一次 suggest(ids)。直接听：play + query。暂停/继续/下首/上首：pause resume next prev，结果里会带上切完后正在播的歌。放歌单：play + list（liked / rank / queue / 用户歌单名）。加入已有歌单：add + list（liked 或已有用户歌单名；不写 list 就是红心）+ 可选 query。加之前先 status 看歌单名。歌单不存在就说没有，不要自己新建。create 只在用户明确说新建/创建歌单时用，且名字不能是那三个固定歌单。拿掉一首：remove。删除用户歌单：delete（不能删播放列表、红心、听歌排行）。清空：clear（不写 list 清空当前播放列表；写 list 清空那个歌单）。听歌排行不能改。搜 UP：search + by=up；放某 UP：play + by=up。收藏 UP：follow + query（UP 名）；不写 query 就是正在播的 UP。取消收藏：unfollow。不要提工具名，卡片出来后一两句口语。"
    })
  })

  ctx.commands.register({
    name: "bili-origin",
    description: "B 站播放器本地代理地址",
    recordInput: false,
    handler() {
      return ok(origin)
    }
  })
  ctx.commands.register({
    name: "bili-search",
    description: "在 B 站搜可听的视频，或解析 BV / av / b23 链接",
    recordInput: true,
    input: { hint: "歌名、UP 或 BV 号" },
    async handler(invocation) {
      const q = String(invocation.rawInput || "").trim()
      if (!q) return fail("请写下要搜的歌")
      try {
        return ok(JSON.stringify(await searchVideos(q)))
      } catch (error) {
        return fail(error.message)
      }
    }
  })
  ctx.commands.register({
    name: "bili-view",
    description: "读取一条 B 站视频的音频元信息",
    recordInput: false,
    input: { hint: "bvid" },
    async handler(invocation) {
      const bvid = String(invocation.rawInput || "").trim()
      if (!bvid) return fail("缺少 bvid")
      try {
        return ok(JSON.stringify(await viewTrack(bvid)))
      } catch (error) {
        return fail(error.message)
      }
    }
  })
}
