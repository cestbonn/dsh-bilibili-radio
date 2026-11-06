window.__ModuleLoader__.load({
  id: "dsh-bilibili-radio",
  factory: (require) => {
    const { jsx } = require("react/jsx-runtime")
    const react = require("react")
    const module = { exports: {} }
    const exports = module.exports

    const NS = "dsh-bilibili-radio"
    const PANEL = "dsh-bilibili-radio"
    const ORIGIN = "http://127.0.0.1:13210"
    const zh = {
      brand: "bilibili电台",
      "view.player": "bilibili电台",
      "guide.description": "",
      hint: "搜歌曲、UP 或 BV 号",
      empty: "",
      queue: "队列",
      search: "搜索",
      finding: "正在搜索",
      none: "没有找到",
      "chip.instrumental": "纯音乐",
      "chip.piano": "钢琴",
      "chip.jazz": "爵士",
      "chip.folk": "民谣",
      "mode.list": "列表循环",
      "mode.one": "单曲循环",
      "mode.shuffle": "随机播放",
      remove: "移除",
      clear: "清空",
      discover: "发现",
      related: "相关推荐",
      comments: "评论",
      playing: "正在播放",
      noRelated: "",
      noComments: "",
      closed: "评论区关闭了。",
      lists: "歌单",
      rank: "听歌排行",
      rankWeek: "最近一周",
      rankAll: "所有时间",
      newList: "新建歌单",
      deleteList: "删除歌单",
      addTo: "加入歌单",
      noLyrics: "没找到网络歌词",
      works: "的作品",
      ups: "收藏的 UP",
      follow: "收藏",
      followed: "已收藏"
    }
    const en = {
      brand: "Bilibili Radio",
      "view.player": "Bilibili Radio",
      "guide.description": "",
      hint: "Song, UP, or BV id",
      empty: "",
      queue: "Queue",
      search: "Search",
      finding: "Searching…",
      none: "Nothing found",
      "chip.instrumental": "Instrumental",
      "chip.piano": "Piano",
      "chip.jazz": "Jazz",
      "chip.folk": "Folk",
      "mode.list": "Repeat list",
      "mode.one": "Repeat one",
      "mode.shuffle": "Shuffle",
      remove: "Remove",
      clear: "Clear",
      discover: "Discover",
      related: "Related",
      comments: "Comments",
      playing: "Now playing",
      noRelated: "",
      noComments: "",
      closed: "Comments are closed.",
      lists: "Playlists",
      rank: "Listening rank",
      rankWeek: "Last 7 days",
      rankAll: "All time",
      newList: "New playlist",
      deleteList: "Delete playlist",
      addTo: "Add to playlist",
      noLyrics: "No lyrics found online",
      works: "'s tracks",
      ups: "Followed UPs",
      follow: "Follow",
      followed: "Following"
    }
    const DEFAULT_CHIPS = ["纯音乐", "钢琴", "爵士", "民谣"]
    const css = `
[data-bili-page]{display:grid;grid-template-columns:188px minmax(280px,1fr) minmax(300px,38%);grid-template-rows:1fr;height:100%;min-height:0;box-sizing:border-box;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-size:13px;line-height:1.4}
[data-bili-page] *{box-sizing:border-box}
[data-bili-page] svg{display:block;flex:0 0 auto}
[data-bili-page] :focus,[data-bili-page] :focus-visible{outline:none}
[data-bili-page] button:focus-visible{box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-label-primary) 22%,transparent)}
[data-bili-lib]{min-width:0;min-height:0;display:flex;flex-direction:column;padding:14px 10px 16px 16px;overflow:auto}
[data-bili-lib] h3{margin:14px 6px 6px;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);flex:0 0 auto}
[data-bili-lib] input{width:100%;height:32px;margin-bottom:8px;padding:0 10px;border:0;border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:inherit;font:inherit;outline:none}
[data-bili-plist-row]{display:flex;align-items:center;gap:2px;width:100%}
[data-bili-plist-row] [data-bili-plist]{flex:1;min-width:0}
[data-bili-plist]{display:flex;align-items:center;gap:8px;width:100%;min-height:44px;padding:6px;border:0;border-radius:10px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
[data-bili-plist-del]{flex:0 0 24px;width:24px;height:24px;margin:0;padding:0;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-tertiary);opacity:0;cursor:pointer}
[data-bili-plist-row]:hover [data-bili-plist-del],[data-bili-plist-del]:focus-visible{opacity:1}
[data-bili-plist-del]:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1)}
[data-bili-plist][data-on],[data-bili-plist]:hover{background:var(--dsw-alias-bg-layer-1)}
[data-bili-plist] img,[data-bili-plist] [data-bili-ph]{width:40px;height:25px;border-radius:5px;object-fit:cover;background:var(--dsw-alias-bg-layer-2);flex:0 0 40px}
[data-bili-plist] div{min-width:0}
[data-bili-plist] b{display:block;font-weight:550;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-plist] span{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary);font-size:11px}
[data-bili-stage]{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:1fr auto 0fr auto 1fr;grid-template-areas:"padt" "hero" "lyrics" "ctrl" "padb";justify-items:center;min-width:0;min-height:0;padding:32px 36px 24px}
[data-bili-stage][data-mode=lyrics]{grid-template-rows:0fr auto 1fr auto 0fr;padding:16px 28px 16px}
[data-bili-stage]::before{content:"";grid-area:padt;min-height:0}
[data-bili-stage]::after{content:"";grid-area:padb;min-height:0}
[data-bili-hero]{grid-area:hero;display:grid;grid-template-columns:auto 0fr;grid-template-rows:auto auto;align-items:start;row-gap:22px;column-gap:0;width:min(100%,400px);min-width:0}
[data-bili-stage][data-mode=lyrics] [data-bili-hero]{width:100%;grid-template-columns:auto 1fr;grid-template-rows:auto;align-items:center;row-gap:0;column-gap:12px}
[data-bili-cover]{border:0;padding:0;border-radius:8px;overflow:hidden;background:var(--dsw-alias-bg-layer-1);cursor:pointer}
[data-bili-hero] [data-bili-cover]{grid-column:1;grid-row:1;width:400px;max-width:100%;border-radius:12px;overflow:hidden;box-shadow:0 18px 40px color-mix(in srgb,#000 22%,transparent)}
[data-bili-stage][data-mode=lyrics] [data-bili-hero] [data-bili-cover]{width:72px;max-width:72px;border-radius:6px;box-shadow:none}
[data-bili-cover]:not(:has(img)){aspect-ratio:16/10}
[data-bili-cover] img{width:100%;height:auto;display:block;border:0;pointer-events:none}
[data-bili-hero] [data-bili-cover] img{aspect-ratio:16/10;object-fit:cover}
[data-bili-hero] [data-bili-cover]:not(:has(img)){display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary)}
[data-bili-bill]{grid-column:1;grid-row:2;width:100%;min-width:0;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:start;text-align:left}
[data-bili-stage][data-mode=lyrics] [data-bili-bill]{grid-column:2;grid-row:1;align-items:center}
[data-bili-bill] [data-bili-meta]{min-width:0}
[data-bili-bill] [data-bili-title]{font-size:20px;font-weight:680;letter-spacing:-.03em;line-height:1.3;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
[data-bili-stage][data-mode=lyrics] [data-bili-bill] [data-bili-title]{font-size:16px;font-weight:650;white-space:nowrap;display:block;-webkit-line-clamp:unset}
[data-bili-bill] [data-bili-artist]{margin-top:4px;font-size:13px}
[data-bili-stage][data-mode=lyrics] [data-bili-bill] [data-bili-artist]{font-size:12px}
[data-bili-bill] [data-bili-acts]{margin:0;grid-column:2;grid-row:1}
[data-bili-lyricwrap]{grid-area:lyrics;display:flex;flex-direction:column;width:100%;min-width:0;min-height:0;overflow:hidden;opacity:0;pointer-events:none;justify-self:stretch;transition:opacity .42s ease}
[data-bili-stage][data-mode=lyrics] [data-bili-lyricwrap]{opacity:1;pointer-events:auto;transition:opacity .48s ease .12s}
[data-bili-lyricwrap] [data-bili-lyrics]{flex:1;margin:0;min-height:0}
[data-bili-title]{margin:0;font-size:16px;font-weight:650;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-artist]{margin-top:4px;border:0;padding:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;cursor:pointer}
[data-bili-artist]:hover{color:var(--dsw-alias-brand-text)}
[data-bili-stats]{margin-top:2px;color:var(--dsw-alias-label-tertiary);font-size:11px}
[data-bili-acts]{position:relative;display:flex;align-items:center;gap:2px;flex:0 0 auto}
[data-bili-acts]>button{width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
[data-bili-acts]>button:hover{color:var(--dsw-alias-label-primary)}
[data-bili-heart][data-on]{color:#ec4141}
[data-bili-plist][data-liked] svg{width:32px;height:32px;padding:7px;border-radius:6px;background:color-mix(in srgb,#ec4141 14%,var(--dsw-alias-bg-layer-2));color:#ec4141;flex:0 0 32px}
[data-bili-plist][data-up] svg,[data-bili-plist][data-up] [data-bili-ph]{width:32px;height:32px;padding:7px;border-radius:50%;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);flex:0 0 32px}
[data-bili-plist][data-rank] svg{width:32px;height:32px;padding:7px;border-radius:6px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);flex:0 0 32px}
[data-bili-lyrics]{flex:1;width:100%;min-height:0;margin:18px 0 0;overflow:hidden;position:relative;mask-image:linear-gradient(transparent,black 10%,black 90%,transparent);text-align:center}
[data-bili-lyric-list]{position:relative;transition:transform .35s ease}
[data-bili-lyrics] p{margin:0;padding:10px 16px;color:var(--dsw-alias-label-tertiary);font-size:14px;line-height:1.75;transition:color .2s,font-size .2s}
[data-bili-lyrics] p[data-near]{color:var(--dsw-alias-label-secondary);font-size:15px}
[data-bili-lyrics] p[data-on]{color:var(--dsw-alias-label-primary);font-size:22px;font-weight:650}
[data-bili-lyrics] p[data-song]{color:var(--dsw-alias-label-secondary);font-size:12px;letter-spacing:.14em}
[data-bili-lyrics][data-empty]{mask-image:none;display:flex;align-items:center;justify-content:center}
[data-bili-lyrics] p[data-note]{color:var(--dsw-alias-label-secondary);font-size:13px}

[data-bili-shelf]{min-width:0;min-height:0;display:flex;flex-direction:column;padding:12px 16px 16px 12px;overflow:visible}
[data-bili-ctrl]{grid-area:ctrl;flex:0 0 auto;width:min(100%,400px);margin-top:0;justify-self:center}
[data-bili-stage][data-mode=lyrics] [data-bili-ctrl]{width:100%}
[data-bili-seekline]{display:grid;grid-template-columns:36px 1fr 36px;align-items:center;gap:8px}
[data-bili-seekline] time{color:var(--dsw-alias-label-tertiary);font-size:11px;font-variant-numeric:tabular-nums}
[data-bili-seekline] time:last-child{text-align:right}
[data-bili-seek]{-webkit-appearance:none;appearance:none;width:100%;height:18px;margin:0;border:0;background:linear-gradient(var(--dsw-alias-label-primary),var(--dsw-alias-label-primary)) left center/var(--p,0%) 3px no-repeat,linear-gradient(var(--dsw-alias-border-l2),var(--dsw-alias-border-l2)) left center/100% 3px no-repeat;cursor:pointer}
[data-bili-seek]::-webkit-slider-runnable-track{height:3px;border:0;background:transparent}
[data-bili-seek]::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;margin-top:-3.5px;border:0;border-radius:50%;background:var(--dsw-alias-label-primary);box-shadow:none}
[data-bili-buttons]{display:flex;align-items:center;justify-content:center;gap:4px;margin-top:10px}
[data-bili-buttons] button{width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:transform .12s ease,color .12s ease}
[data-bili-buttons] button:active{transform:scale(.86)}
[data-bili-buttons] button:hover,[data-bili-vol]>button:hover{color:var(--dsw-alias-label-primary)}
[data-bili-buttons] button[data-on]{color:var(--dsw-alias-brand-text)}
[data-bili-buttons] [data-bili-play]{width:40px;height:40px;color:var(--dsw-alias-label-primary)}
[data-bili-buttons] [data-bili-play]:hover{color:var(--dsw-alias-label-primary)}
[data-bili-vol]{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center}
[data-bili-vol]>button{width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;background:transparent;color:inherit;cursor:pointer}
[data-bili-vol] [data-pop]{position:absolute;left:50%;bottom:42px;z-index:8;display:flex;align-items:center;justify-content:center;width:40px;height:128px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-base);box-shadow:0 12px 32px color-mix(in srgb,#000 22%,transparent);transform:translateX(-50%)}
[data-bili-vol] [data-pop] input{-webkit-appearance:none;appearance:none;width:88px;height:16px;margin:0;border:0;background:linear-gradient(var(--dsw-alias-label-primary),var(--dsw-alias-label-primary)) left center/var(--p,0%) 3px no-repeat,linear-gradient(var(--dsw-alias-border-l2),var(--dsw-alias-border-l2)) left center/100% 3px no-repeat;transform:rotate(-90deg);cursor:pointer}
[data-bili-vol] [data-pop] input::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;border:0;border-radius:50%;background:var(--dsw-alias-label-primary)}
[data-bili-search]{display:flex;align-items:center;flex:0 0 auto;height:32px;padding:0 12px;border-radius:99px;background:var(--dsw-alias-bg-layer-1)}
[data-bili-search]:focus-within{box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-label-primary) 16%,transparent)}
[data-bili-search] input{flex:1;min-width:0;height:100%;border:0;background:transparent;color:var(--dsw-alias-label-primary);outline:none;box-shadow:none;font:inherit;-webkit-appearance:none}
[data-bili-chips]{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;flex:0 0 auto}
[data-bili-chips][hidden]{display:none}
[data-bili-chips] button{height:26px;min-height:26px;max-height:26px;padding:0 8px 0 10px;border:0;border-radius:99px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer}
[data-bili-chips] button:hover,[data-bili-chips] button:focus{height:26px;min-height:26px;max-height:26px;padding:0 8px 0 10px}
[data-bili-chips] button[data-on]{color:var(--dsw-alias-label-primary)}
[data-bili-chips] [data-plus],[data-bili-chips] [data-plus]:hover,[data-bili-chips] [data-plus]:focus{width:26px;min-width:26px;padding:0;display:inline-flex;align-items:center;justify-content:center}
[data-bili-chips] input{height:26px;width:96px;padding:0 10px;border:0;border-radius:99px;background:var(--dsw-alias-bg-layer-1);color:inherit;font:inherit;outline:none}
[data-bili-chips] form input{width:112px}
[data-bili-chips] i{margin-left:4px;font-style:normal;opacity:.45}
[data-bili-chart]{margin:0 0 22px}
[data-bili-chart]>header{display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;color:#fff}
[data-bili-chart][data-tone=hot]>header{background:linear-gradient(135deg,#d4544a 0%,#8b1e2c 100%)}
[data-bili-chart][data-tone=fresh]>header{background:linear-gradient(135deg,#2f8f88 0%,#1a4c55 100%)}
[data-bili-chart][data-tone=rank]>header{background:linear-gradient(135deg,#4a4a54 0%,#1c1c22 100%)}
[data-bili-chart][data-tone=feed]>header{background:linear-gradient(135deg,#8a6a4a 0%,#3a2a20 100%)}
[data-bili-chart]>header b{flex:1;min-width:0;font-size:18px;font-weight:700;letter-spacing:-.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-chart]>header button{flex:0 0 36px;width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;background:#fff;color:#161616;cursor:pointer;box-shadow:0 8px 18px color-mix(in srgb,#000 22%,transparent)}
[data-bili-rank]{display:grid;grid-template-columns:28px 44px minmax(0,1fr) 5.5ch;gap:8px;align-items:center;width:100%;min-width:0;min-height:46px;padding:5px 6px;border-radius:8px;cursor:pointer}
[data-bili-rank]:hover,[data-bili-rank][data-on]{background:var(--dsw-alias-bg-layer-1)}
[data-bili-rank] em{font-style:normal;font-size:14px;font-weight:750;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-tertiary);text-align:center}
[data-bili-rank][data-n="1"] em{color:#d4a017}
[data-bili-rank][data-n="2"] em{color:#8a93a0}
[data-bili-rank][data-n="3"] em{color:#c47a4a}
[data-bili-rank] img,[data-bili-rank] [data-bili-ph]{width:44px;height:28px;border-radius:4px;object-fit:cover;background:var(--dsw-alias-bg-layer-2)}
[data-bili-rank]>div{min-width:0}
[data-bili-rank] b{display:block;font-weight:560;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-rank] span{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-rank] time{width:5.5ch;color:var(--dsw-alias-label-tertiary);font-size:11px;font-variant-numeric:tabular-nums;text-align:right}
[data-bili-rail]{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin:8px 0 4px;padding:4px 10px 16px}
[data-bili-rail] button{position:relative;border:0;padding:0;background:transparent;color:inherit;text-align:left;cursor:pointer}
[data-bili-rail] img,[data-bili-rail] [data-bili-ph]{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;display:block;background:var(--dsw-alias-bg-layer-2);filter:drop-shadow(0 8px 8px rgba(0,0,0,.28))}
[data-bili-rail] button:hover img,[data-bili-rail] button:hover [data-bili-ph]{filter:drop-shadow(0 10px 12px rgba(0,0,0,.34))}
[data-bili-rail] button::after{content:"";position:absolute;left:0;right:0;top:0;aspect-ratio:1;border-radius:10px;pointer-events:none;box-shadow:inset 0 1px 1px rgba(255,255,255,.34),inset 0 -10px 18px rgba(0,0,0,.28);background:linear-gradient(165deg,rgba(255,255,255,.2),transparent 42%,transparent 58%,rgba(0,0,0,.22))}
[data-bili-rail] i{position:absolute;top:5px;left:5px;z-index:1;min-width:18px;height:18px;padding:0 5px;border-radius:6px;background:rgba(12,12,12,.5);color:#fff;font-style:normal;font-size:10px;font-weight:750;line-height:18px;text-align:center;backdrop-filter:blur(8px);box-shadow:0 1px 0 rgba(255,255,255,.2) inset,0 2px 6px rgba(0,0,0,.35)}
[data-bili-rail] button:nth-child(1) i{background:rgba(212,160,23,.86)}
[data-bili-rail] button:nth-child(2) i{background:rgba(138,147,160,.86)}
[data-bili-rail] button:nth-child(3) i{background:rgba(196,122,74,.86)}
[data-bili-rail] b{display:block;margin-top:7px;font-size:11px;font-weight:640;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-rail] span{display:none}
[data-bili-mosaic]{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;margin-top:10px}
[data-bili-mosaic] button{min-width:0;border:0;padding:0;background:transparent;color:inherit;text-align:left;cursor:pointer}
[data-bili-mosaic] img,[data-bili-mosaic] [data-bili-ph]{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:9px;display:block;background:var(--dsw-alias-bg-layer-2)}
[data-bili-mosaic] b{display:block;margin-top:6px;font-size:12px;font-weight:560;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-mosaic] span{display:none}
[data-bili-tabs]{display:flex;align-items:center;gap:2px;min-height:40px;overflow:auto;scrollbar-width:none;border-bottom:1px solid var(--dsw-alias-border-l2)}
[data-bili-tabs]::-webkit-scrollbar{display:none}
[data-bili-tabs] button{height:40px;padding:0 12px;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;white-space:nowrap;cursor:pointer}
[data-bili-tabs] button[data-on]{color:var(--dsw-alias-label-primary);font-weight:600;border-bottom-color:var(--dsw-alias-label-primary)}
[data-bili-tabs] [data-bili-clear]{margin-left:auto;height:24px;padding:0 10px;border:0;border-radius:99px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;cursor:pointer}
[data-bili-list]{flex:1;min-height:0;overflow:auto;margin:8px 0 0;padding:8px 20px 24px}
[data-bili-sub]{display:flex;align-items:center;gap:6px;padding:10px 2px 2px}
[data-bili-sub] button{height:28px;padding:0 12px;border:0;border-radius:99px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;cursor:pointer}
[data-bili-sub] button[data-on]{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-base)}
[data-bili-upbar]{display:flex;align-items:center;gap:8px;padding:10px 2px 0}
[data-bili-upbar] b{flex:1;min-width:0;font-size:14px;font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-upbar] button{height:28px;min-height:28px;max-height:28px;padding:0 8px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer}
[data-bili-upbar] button:hover{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
[data-bili-upbar] [data-bili-follow],[data-bili-upbar] [data-bili-follow]:hover,[data-bili-upbar] [data-bili-follow]:focus{margin-left:auto;padding:0 10px;border-radius:99px;background:var(--dsw-alias-bg-layer-1)}
[data-bili-upbar] [data-bili-follow][data-on]{color:var(--dsw-alias-label-primary);font-weight:600}
[data-bili-more]{display:block;width:100%;height:36px;margin:8px 0 12px;border:0;border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer}
[data-bili-more]:hover{color:var(--dsw-alias-label-primary)}
[data-bili-row]{position:relative;display:grid;grid-template-columns:48px minmax(0,1fr);gap:10px;align-items:center;width:100%;min-width:0;min-height:52px;padding:6px 8px;border-radius:8px;cursor:pointer}
[data-bili-row]:has([data-bili-menu]),[data-bili-acts]:has([data-bili-menu]){z-index:6}
[data-bili-row][data-add]{grid-template-columns:48px minmax(0,1fr) 5.5ch 28px 28px 28px}
[data-bili-row][data-add]:has([data-bili-del]){grid-template-columns:48px minmax(0,1fr) 5.5ch 28px 28px 28px 28px}
[data-bili-row][data-queue]{grid-template-columns:16px 48px minmax(0,1fr) 5.5ch 28px 28px 28px}
[data-bili-now]{width:100%;min-width:0;margin:0 0 8px;padding:10px 8px 12px;border-bottom:1px solid var(--dsw-alias-border-l2)}
[data-bili-now]>header{margin:0 0 8px;color:var(--dsw-alias-brand-text);font-size:11px;font-weight:650;letter-spacing:.08em}
[data-bili-now]>div{display:grid;grid-template-columns:64px minmax(0,1fr) 5.5ch 28px 28px 28px;gap:10px;align-items:center;width:100%;min-width:0}
[data-bili-now] img,[data-bili-now] [data-bili-ph]{width:64px;height:40px;border-radius:6px;object-fit:cover;background:var(--dsw-alias-bg-layer-2)}
[data-bili-now] b{display:block;font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-brand-text)}
[data-bili-now] span{display:block;margin-top:3px;color:var(--dsw-alias-label-secondary);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-now] time{width:5.5ch;color:var(--dsw-alias-label-secondary);font-size:11px;font-variant-numeric:tabular-nums;text-align:right}
[data-bili-now]:has([data-bili-menu]){z-index:6;position:relative}
[data-bili-now]:hover [data-bili-add],[data-bili-now]:focus-within [data-bili-add],[data-bili-now] [data-bili-heart][data-on]{opacity:1}
[data-bili-now] [data-bili-heart][data-on]{color:#ec4141}
[data-bili-now]:hover [data-bili-del],[data-bili-now]:focus-within [data-bili-del]{opacity:1}
[data-bili-pop]{position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center}
[data-bili-add],[data-bili-add]:hover,[data-bili-add]:focus{width:28px;height:28px;min-width:28px;min-height:28px;max-width:28px;max-height:28px;padding:0;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;background:transparent;color:var(--dsw-alias-label-tertiary);opacity:.4;cursor:pointer}
[data-bili-row]:hover [data-bili-add],[data-bili-row]:focus-within [data-bili-add],[data-bili-add]:focus-visible,[data-bili-row] [data-bili-heart][data-on]{opacity:1}
[data-bili-row] [data-bili-heart][data-on]{color:#ec4141}
[data-bili-menu]{position:absolute;top:calc(100% + 6px);right:0;z-index:20;width:220px;max-width:min(220px,70vw);max-height:min(320px,70vh);overflow:auto;padding:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-base);box-shadow:0 16px 40px color-mix(in srgb,#000 28%,transparent);color:var(--dsw-alias-label-primary)}
[data-bili-menu]>header{padding:8px 10px 6px;color:var(--dsw-alias-label-tertiary);font-size:11px;font-weight:600;letter-spacing:.06em}
[data-bili-menu] button,[data-bili-menu] button:hover,[data-bili-menu] button:focus{display:grid;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:10px;width:100%;height:36px;min-height:36px;max-height:36px;padding:0 10px;border:0;border-radius:8px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;overflow:hidden}
[data-bili-menu] button:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary) 8%,transparent)}
[data-bili-menu] svg,[data-bili-menu] img,[data-bili-menu] [data-bili-ph]{width:20px;height:20px;max-width:20px;max-height:20px;padding:0;border-radius:4px;object-fit:cover;background:var(--dsw-alias-bg-layer-2);flex:none}
[data-bili-menu] span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
[data-bili-menu] em{color:var(--dsw-alias-label-tertiary);font-style:normal;font-size:11px;font-variant-numeric:tabular-nums}
[data-bili-menu] p{margin:0;padding:12px 10px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.5}
[data-bili-menu] button[data-liked] svg{color:#ec4141}
[data-bili-row][data-over]{box-shadow:inset 0 2px 0 var(--dsw-alias-brand-primary)}
[data-bili-handle]{width:16px;height:36px;display:inline-flex;align-items:center;justify-content:center;border:0;padding:0;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:grab}
[data-bili-handle]:active{cursor:grabbing}
[data-bili-del]{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;background:transparent;color:var(--dsw-alias-label-tertiary);opacity:.4;cursor:pointer}
[data-bili-row]:hover [data-bili-del],[data-bili-row]:focus-within [data-bili-del],[data-bili-del]:focus-visible{opacity:1}
[data-bili-del]:hover{color:var(--dsw-alias-state-error-primary)}
[data-bili-row]:hover{background:var(--dsw-alias-bg-layer-1)}
[data-bili-row][data-on]{background:var(--dsw-alias-bg-layer-1)}
[data-bili-row] img,[data-bili-row] [data-bili-ph]{width:48px;height:30px;border-radius:5px;object-fit:cover;background:var(--dsw-alias-bg-layer-2)}
[data-bili-row]>div{min-width:0}
[data-bili-row] b{display:block;font-weight:550;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-row][data-on] b{color:var(--dsw-alias-brand-text)}
[data-bili-row] span{display:block;margin-top:3px;color:var(--dsw-alias-label-secondary);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-row][data-on] span{color:var(--dsw-alias-brand-text)}
[data-bili-row] time{width:5.5ch;color:var(--dsw-alias-label-secondary);font-size:11px;font-variant-numeric:tabular-nums;text-align:right}
[data-bili-cmt]{display:grid;grid-template-columns:36px 1fr;gap:10px;padding:14px 6px;border-bottom:1px solid var(--dsw-alias-border-l2)}
[data-bili-cmt]:last-child{border-bottom:0}
[data-bili-cmt] img,[data-bili-cmt] [data-bili-ph]{width:36px;height:36px;border-radius:50%;object-fit:cover;background:var(--dsw-alias-bg-layer-2)}
[data-bili-cmt] [data-meta]{display:flex;align-items:baseline;gap:8px}
[data-bili-cmt] b{font-weight:550;font-size:12px;color:var(--dsw-alias-label-secondary)}
[data-bili-cmt] time{color:var(--dsw-alias-label-tertiary);font-size:11px}
[data-bili-cmt] em{margin-left:auto;color:var(--dsw-alias-label-tertiary);font-style:normal;font-size:11px}
[data-bili-cmt] p{margin:6px 0 0;color:var(--dsw-alias-label-primary);line-height:1.6;white-space:pre-wrap}
[data-bili-note]{padding:28px 8px;color:var(--dsw-alias-label-secondary)}
[data-bili-note][data-err]{color:var(--dsw-alias-state-error-primary)}
[data-bili-songcard]{display:flex;align-items:center;gap:12px;max-width:360px;margin:2px 0 6px;padding:10px 12px;border:0;border-radius:14px;background:var(--dsw-alias-bg-layer-1);color:inherit;font:inherit;text-align:left;cursor:pointer}
[data-bili-songcard] img,[data-bili-songcard] [data-bili-ph]{width:72px;height:45px;border-radius:8px;object-fit:cover;flex:0 0 72px;background:var(--dsw-alias-bg-layer-2)}
[data-bili-songcard] b{display:block;font-size:14px;font-weight:650;letter-spacing:-.02em}
[data-bili-songcard] span{display:block;margin-top:3px;color:var(--dsw-alias-label-secondary);font-size:12px}
[data-bili-songcard] em{display:block;margin-top:4px;color:var(--dsw-alias-label-tertiary);font-style:normal;font-size:11px}
[data-bili-songcard][data-on] b{color:var(--dsw-alias-brand-text)}
div:has(>[data-bili-mini]),div:has(>* >[data-bili-mini]){flex-wrap:wrap;width:100%}
[data-bili-mini]{display:grid;grid-template-columns:40px minmax(0,1fr) auto;grid-template-rows:auto auto;align-items:center;column-gap:10px;row-gap:2px;flex:1 1 100%;min-width:100%;width:100%;margin:0;padding:8px 8px 10px;box-sizing:border-box;background:transparent;color:var(--dsw-alias-label-primary);font:inherit}
[data-bili-mini] svg{display:block}
[data-bili-mini] button[data-bili-mini-cover]{all:unset;grid-column:1;grid-row:1;display:block;position:relative;width:40px;height:40px;margin:2px 0 4px;cursor:pointer;filter:drop-shadow(0 1px 1px rgba(0,0,0,.22)) drop-shadow(0 6px 12px rgba(0,0,0,.38))}
[data-bili-disc]{display:block;width:40px;height:40px;border-radius:50%;overflow:hidden;clip-path:circle(50%);background:#1a1a1a;position:relative}
[data-bili-disc] img{width:40px;height:40px;object-fit:cover;display:block;animation:bili-spin 8s linear infinite;animation-play-state:paused}
[data-bili-disc] svg{width:40px;height:40px;padding:8px;box-sizing:border-box;color:var(--dsw-alias-label-tertiary)}
[data-bili-disc]:has(img)::after{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;box-shadow:inset 0 1px 1px rgba(255,255,255,.34),inset 0 -2px 4px rgba(0,0,0,.4);background:radial-gradient(circle at 50% 50%,#0c0c0c 0 9%,#2a2a2a 10.5% 13.5%,rgba(0,0,0,.55) 15% 16.5%,transparent 18%),linear-gradient(145deg,rgba(255,255,255,.28),transparent 38%,transparent 58%,rgba(0,0,0,.22))}
[data-bili-mini][data-on] button[data-bili-mini-cover]{filter:drop-shadow(0 2px 2px rgba(0,0,0,.24)) drop-shadow(0 8px 16px rgba(0,0,0,.42))}
[data-bili-mini][data-on] [data-bili-disc] img{animation-play-state:running}
[data-bili-mini-info]{grid-column:2;grid-row:1;min-width:0;cursor:pointer}
[data-bili-mini-info] b{display:block;font-size:13px;font-weight:650;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-minilrc],[data-bili-minilrc-note]{display:block;margin:2px 0 0;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:650;letter-spacing:-.02em;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-minilrc-note]{font-weight:500}
[data-bili-minilrc] span{display:inline-block;font-size:inherit;opacity:0;animation:bili-lrc-ch .7s ease both}
@keyframes bili-lrc-ch{from{opacity:0;transform:translateY(.45em)}to{opacity:1;transform:none}}
[data-bili-mini-btns]{grid-column:3;grid-row:1;display:flex;align-items:center}
[data-bili-mini-btns] button{width:28px;height:28px;margin:0;padding:0;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:0;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
[data-bili-mini-btns] button:hover{color:var(--dsw-alias-label-primary)}
[data-bili-mini-btns] button[data-bili-play]{width:32px;height:32px;color:var(--dsw-alias-label-primary)}
[data-bili-mini] [data-bili-seek]{grid-column:1/-1;grid-row:2;height:14px;margin:0}
[data-bili-mini]:not([data-wide]){display:flex;align-items:center;justify-content:center;flex:none;min-width:0;width:auto;margin:0;padding:6px}
[data-bili-mini]:not([data-wide]) [data-bili-mini-info],[data-bili-mini]:not([data-wide]) [data-bili-mini-btns],[data-bili-mini]:not([data-wide]) [data-bili-seek]{display:none}
[data-bili-mini]:not([data-wide]) button[data-bili-mini-cover],[data-bili-mini]:not([data-wide]) [data-bili-disc],[data-bili-mini]:not([data-wide]) [data-bili-disc] img,[data-bili-mini]:not([data-wide]) [data-bili-disc] svg{width:36px;height:36px}
[data-bili-glyph]{display:inline-flex;width:18px;height:18px;align-items:center;justify-content:center}
[data-bili-glyph] img{width:18px;height:18px;object-fit:cover;border-radius:50%;animation:bili-spin 8s linear infinite;animation-play-state:paused}
[data-bili-glyph][data-on] img{animation-play-state:running}
@keyframes bili-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){[data-bili-disc] img,[data-bili-disc] svg,[data-bili-glyph] img{animation:none}[data-bili-minilrc] span{animation:none;opacity:1}[data-bili-lyricwrap]{transition:none}}
[data-bili-picks]{max-width:min(380px,100%);margin:4px 0 8px;padding:8px;border-radius:18px;background:var(--dsw-alias-bg-layer-1)}
[data-bili-pick-hero]{position:relative;display:block;width:100%;border:0;padding:0;border-radius:12px;overflow:hidden;background:#000;color:#fff;font:inherit;text-align:left;cursor:pointer}
[data-bili-pick-hero] img,[data-bili-pick-hero] [data-bili-ph]{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:var(--dsw-alias-bg-layer-2)}
[data-bili-pick-hero]>div{position:absolute;inset:auto 0 0;padding:36px 14px 12px;background:linear-gradient(transparent,rgba(0,0,0,.62))}
[data-bili-pick-hero] b{display:block;font-size:16px;font-weight:720;letter-spacing:-.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-pick-hero] span{display:block;margin-top:3px;color:rgba(255,255,255,.78);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-pick-hero][data-on] b{color:#fff}
[data-bili-pick]{display:grid;grid-template-columns:22px 56px minmax(0,1fr) auto;gap:10px;align-items:center;width:100%;min-height:48px;margin-top:2px;padding:6px 8px;border:0;border-radius:12px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
[data-bili-pick]:hover{background:var(--dsw-alias-bg-layer-2)}
[data-bili-pick][data-on]{background:var(--dsw-alias-bg-layer-2)}
[data-bili-pick] i{font-style:normal;font-size:12px;font-weight:750;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-tertiary);text-align:center}
[data-bili-pick][data-n="2"] i{color:#8a93a0}
[data-bili-pick][data-n="3"] i{color:#c47a4a}
[data-bili-pick] img,[data-bili-pick] [data-bili-ph]{width:56px;height:35px;border-radius:6px;object-fit:cover;background:var(--dsw-alias-bg-layer-2)}
[data-bili-pick] b{display:block;font-size:13px;font-weight:620;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-pick][data-on] b{color:var(--dsw-alias-brand-text)}
[data-bili-pick] span{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[data-bili-pick] time{color:var(--dsw-alias-label-tertiary);font-size:11px;font-variant-numeric:tabular-nums}
@media (max-width: 1100px){
  [data-bili-page]{grid-template-columns:minmax(260px,1fr) minmax(280px,40%)}
  [data-bili-lib]{display:none}
}
@media (max-width: 840px){
  [data-bili-page]{grid-template-columns:1fr;grid-template-rows:auto 1fr}
  [data-bili-stage],[data-bili-stage][data-mode=cover]{padding:12px 16px 12px}
  [data-bili-bill] [data-bili-title]{font-size:18px}
  [data-bili-lyrics] p[data-on]{font-size:18px}
  [data-bili-shelf]{padding:8px 16px 20px}
}
`
    const load = (key, fallback) => {
      try {
        const raw = localStorage.getItem("dsh-bili-" + key)
        return raw == null ? fallback : JSON.parse(raw)
      } catch {
        return fallback
      }
    }
    const save = (key, value) => localStorage.setItem("dsh-bili-" + key, JSON.stringify(value))
    const clamp = (n, a, b) => Math.min(b, Math.max(a, n))
    const fmt = (sec) => {
      sec = Math.max(0, Math.floor(sec || 0))
      return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0")
    }
    const nfmt = (n) => {
      n = Number(n) || 0
      if (n >= 10000) return (n / 10000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, "") + "万"
      return String(n)
    }
    const imgSrc = (url) => url ? ORIGIN + "/api/img?url=" + encodeURIComponent(url) : ""
    const sameTrack = (a, b) => a && b && a.bvid === b.bvid && String(a.cid || "") === String(b.cid || "")
    const sameSong = (a, b) => a && b && a.bvid === b.bvid && (!a.cid || !b.cid || String(a.cid) === String(b.cid))
    function listKind(name) {
      const q = String(name || "").trim()
      if (/^(我喜欢的|红心|喜欢(的歌单)?|liked)$/i.test(q)) return "liked"
      if (/^(听歌排行|排行榜?|最近常听|rank)$/i.test(q)) return "rank"
      if (/^(播放列表|队列|queue)$/i.test(q)) return "queue"
      return ""
    }
    function customLists() {
      return player.state.playlists.filter((list) => {
        if (list.id === "liked") return false
        const kind = listKind(list.id) || listKind(list.name)
        return kind !== "queue" && kind !== "rank" && kind !== "liked"
      })
    }
    function takeTrack(into, track) {
      if (!track || !track.bvid) return
      if (into.some((item) => sameTrack(item, track) || item.bvid === track.bvid)) return
      into.push(track)
    }
    function loadLibrary() {
      const raw = load("playlists", [{ id: "liked", name: "我喜欢的", tracks: [] }])
      const storedQueue = load("queue", [])
      const queue = (Array.isArray(storedQueue) ? storedQueue : []).slice()
      const liked = { id: "liked", name: "我喜欢的", tracks: [] }
      const custom = []
      const rows = Array.isArray(raw) ? raw : []
      for (let i = 0; i < rows.length; i++) {
        const list = rows[i]
        if (!list) continue
        const kind = list.id === "liked" ? "liked" : (listKind(list.id) || listKind(list.name))
        const tracks = Array.isArray(list.tracks) ? list.tracks : []
        if (kind === "liked") {
          for (let j = 0; j < tracks.length; j++) takeTrack(liked.tracks, tracks[j])
          continue
        }
        if (kind === "queue") {
          for (let j = 0; j < tracks.length; j++) takeTrack(queue, tracks[j])
          continue
        }
        if (kind === "rank") continue
        custom.push(Object.assign({}, list, { tracks: tracks }))
      }
      const playlists = [liked].concat(custom)
      save("playlists", playlists)
      save("queue", queue)
      return { playlists: playlists, queue: queue }
    }
    function loadUps() {
      const raw = load("ups", [])
      return (Array.isArray(raw) ? raw : []).map((row) => ({
        mid: Number(row && row.mid) || 0,
        name: String(row && row.name || "").trim()
      })).filter((row) => row.mid)
    }
    const PLAY_MODES = ["list", "one", "shuffle"]
    const MODE_LABEL = { list: "列表循环", one: "单曲循环", shuffle: "随机播放" }
    const ICONS = {
      prev: "M7 6.2h1.8v11.6H7zM17.4 6.4 10.2 12l7.2 5.6z",
      next: "M15.2 6.2H17v11.6h-1.8zM6.6 6.4v11.2L13.8 12z",
      pause: "M7 6h3.4v12H7zm6.6 0H17v12h-3.4z",
      play: "M9 6.75v10.5L18.25 12z",
      list: "M7.2 7h9.6V9.8L21 6l-4.2-3.8V5H5.2v6.4h2V7zm9.6 10H7.2v-2.8L3 18l4.2 3.8V19h11.6v-6.4h-2V17z",
      one: "M7.2 7h9.6V9.8L21 6l-4.2-3.8V5H5.2v6.4h2V7zm9.6 10H7.2v-2.8L3 18l4.2 3.8V19h11.6v-6.4h-2V17zM12.7 9.2h-1.1L10 10.4l.7.8 1-.9V15h1V9.2z",
      shuffle: "M14.5 4 16.54 6.04 4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13zM10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41z",
      grip: "M9 6.5h2v2H9zm4 0h2v2h-2zM9 11h2v2H9zm4 0h2v2h-2zM9 15.5h2v2H9zm4 0h2v2h-2z",
      close: "M6.7 6.7 12 12l5.3-5.3 1 1L13 13l5.3 5.3-1 1L12 14l-5.3 5.3-1-1L11 13 5.7 7.7z",
      plus: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z",
      toList: "M4 5h12v2H4zm0 6h9v2H4zm0 6h9v2H4zm14-7h-2v3h-3v2h3v3h2v-3h3v-2h-3z",
      rank: "M4 20h4V10H4zm6 0h4V4h-4zm6 0h4v-8h-4z",
      heart: "M12 20.4 10.6 19.1C5.4 14.4 2 11.3 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 3.8-3.4 6.9-8.6 11.6L12 20.4z",
      heartOff: "M16.5 3c-1.7 0-3.4.8-4.5 2.1C10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.5c0 3.8 3.4 6.9 8.6 11.6L12 21.4l1.4-1.3C18.6 15.4 22 12.3 22 8.5 22 5.4 19.6 3 16.5 3zm-4.4 15.3-.1.1-.1-.1C7.1 14 4 11.3 4 8.5 4 6.5 5.5 5 7.5 5c1.5 0 3 1 3.6 2.4h1.8C13.5 6 15 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.8-3.1 5.5-7.9 9.8z",
      vol: "M4.5 9.2h3.1L12 5.8v12.4L7.6 14.8H4.5a1 1 0 0 1-1-1V10.2a1 1 0 0 1 1-1z",
      back: "M15.4 5.4 8.8 12l6.6 6.6-1.4 1.4L6 12l8-8z",
      user: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.9 0-8 1.8-8 5.2V21h16v-1.8C20 15.8 15.9 14 12 14z"
    }
    const Icon = ({ d, size = 18, nudge = 0 }) => jsx("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      style: nudge ? { transform: "translateX(" + nudge + "px)" } : undefined,
      children: jsx("path", { d })
    })
    function useDismiss(open, close) {
      const ref = react.useRef(null)
      react.useEffect(() => {
        if (!open) return
        const onPtr = (event) => {
          if (ref.current && !ref.current.contains(event.target)) close()
        }
        const onKey = (event) => {
          if (event.key === "Escape") close()
        }
        document.addEventListener("pointerdown", onPtr)
        document.addEventListener("keydown", onKey)
        return () => {
          document.removeEventListener("pointerdown", onPtr)
          document.removeEventListener("keydown", onKey)
        }
      }, [open])
      return ref
    }
    const Disc = ({ size = 16 }) => jsx("svg", {
      width: size,
      height: size,
      viewBox: "0 0 262 252",
      fill: "#06b6f2",
      "aria-hidden": "true",
      children: [
        jsx("path", { d: "m 261.33887,64.278587 c -4.90288,-9.1782 -12.05188,-16.327523 -21.23072,-21.254858 -9.22608,-4.927227 -18.3083,-7.439147 -42.38894,-7.439147 h -2.89826 l 9.99896,-11.665965 c 5.2179,-6.06248 4.49334,-15.2648757 -1.56988,-20.4578077 -5.96556,-5.120487 -15.07088,-4.492477 -20.45784,1.569978 L 156.58616,35.608735 h -44.0796 L 86.155,4.8616923 c -5.21717,-5.893378 -14.32302,-6.521338 -20.28889,-1.37671 -6.06248,5.217096 -6.76289,14.3953057 -1.56988,20.4577867 l 9.99947,11.665966 h -3.23658 c -23.71858,0 -32.99338,2.51192 -41.85771,7.173475 l -0.53134,0.289825 C 19.49176,47.975216 12.34233,55.124539 7.43923,64.326891 2.51195,73.553395 0,82.659139 0,106.73947 v 74.87557 c 0.0483,23.23531 2.56027,32.38895 7.14941,41.18134 l 0.28982,0.53135 c 4.9031,9.17778 12.05253,16.32679 21.23084,21.25486 l 0.82117,0.43474 c 8.76771,4.54058 17.97007,7.00409 41.56788,7.00409 h 127.33635 c 23.21116,-0.0483 32.36584,-2.5601 41.1572,-7.14901 l 0.53134,-0.28982 c 9.17882,-4.90392 16.32784,-12.05293 21.2307,-21.25486 4.92808,-9.22714 7.43988,-18.33246 7.43988,-42.41309 v -74.17517 c 0,-23.742096 -2.5118,-33.01701 -7.15006,-41.881233 z m -22.1968,42.412583 v 74.51329 c 0,9.22607 -0.43472,15.9414 -1.28006,20.53029 l -0.0483,0.28983 c -0.55549,2.84994 -1.18344,4.61304 -2.60842,7.29392 -2.12538,3.98508 -5.09608,6.95578 -9.08222,9.08116 -2.65672,1.42601 -4.41982,2.05398 -7.26976,2.60948 -4.6372,0.89362 -11.56884,1.32835 -21.1341,1.32835 H 70.74514 c -9.22661,0 -15.9412,-0.43473 -20.50614,-1.28005 l -0.28993,-0.0483 c -2.85005,-0.5555 -4.61325,-1.18347 -7.27009,-2.60948 -3.98529,-2.12538 -6.9562,-5.09608 -9.08169,-9.08116 -1.42507,-2.65672 -2.05303,-4.41982 -2.60853,-7.29392 C 30.14334,197.6289 29.7086,191.2517 29.6603,182.50866 v -76.15562 c 0,-9.226085 0.43483,-15.940672 1.28016,-20.529773 l 0.0483,-0.289824 c 0.55549,-2.850152 1.18346,-4.637403 2.60853,-7.294339 2.12549,-3.985194 5.0964,-6.956107 9.08169,-9.081592 2.65683,-1.424971 4.42003,-2.053029 7.27009,-2.608527 4.37184,-0.845322 10.74829,-1.280164 19.49176,-1.328468 h 1.30431 127.31219 c 9.22714,0 15.9414,0.434842 20.50614,1.280164 l 0.28984,0.0483 c 2.84994,0.555498 4.61304,1.183556 7.26976,2.608526 3.98614,2.125486 6.95684,5.096398 9.08222,9.081592 1.42498,2.656936 2.05292,4.420036 2.60842,7.29434 0.89364,4.661556 1.32836,11.569358 1.32836,21.157731 z" }, "tv"),
        jsx("path", { d: "m 86.94781,106.28058 c 10.67574,0 19.32228,8.64644 19.32228,19.3227 v 36.22911 c 0,10.67626 -8.64654,19.32271 -19.32228,19.32271 -10.67573,0 -19.32269,-8.64645 -19.32269,-19.32271 v -36.22911 c 0,-10.67626 8.64696,-19.3227 19.32269,-19.3227 z" }, "e1"),
        jsx("path", { d: "m 183.56295,106.28058 c 10.67626,0 19.3227,8.64644 19.3227,19.3227 v 36.22911 c 0,10.67626 -8.64644,19.32271 -19.3227,19.32271 -10.6752,0 -19.3227,-8.64645 -19.3227,-19.32271 v -36.22911 c 0,-10.67626 8.6475,-19.3227 19.3227,-19.3227 z" }, "e2")
      ]
    })

    const savedPlayMode = load("playMode", "list")
    const lib = loadLibrary()
    const player = {
      listeners: new Set(),
      audio: null,
      state: {
        queue: lib.queue,
        index: load("index", -1),
        results: [],
        mode: "queue",
        chip: "",
        query: "",
        note: "",
        playing: false,
        currentTime: 0,
        duration: 0,
        volume: clamp(load("volume", 0.8), 0, 1),
        playMode: PLAY_MODES.includes(savedPlayMode) ? savedPlayMode : "list",
        shuffleHistory: [],
        shelf: "discover",
        discover: [],
        related: [],
        comments: [],
        relatedNote: "",
        commentNote: "",
        chips: (function () {
          const saved = load("chips", null)
          const words = (list) => (Array.isArray(list) ? list : []).map((word) => String(word || "").trim()).filter(Boolean)
          if (saved && saved.v === 2) return words(saved.items)
          return [...new Set(DEFAULT_CHIPS.concat(words(saved)))]
        })(),
        commentNext: "",
        commentAid: 0,
        commentHasMore: false,
        commentTotal: 0,
        commentLoadingMore: false,
        playlists: lib.playlists,
        rank: (function () {
          const rows = load("rank", [])
          return Array.isArray(rows) ? rows.filter((row) => row && row.key && row.track && row.track.bvid) : []
        })(),
        rankRange: load("rankRange", "week") === "all" ? "all" : "week",
        listId: "",
        lyrics: [],
        lyricNote: "",
        lyricMatch: null,
        upName: "",
        upMid: 0,
        upItems: [],
        upSets: [],
        upTab: "works",
        upSet: null,
        upNote: "",
        upPage: 1,
        upHasMore: false,
        upVideoTotal: 0,
        upLoadingMore: false,
        stageMode: load("stageMode", "cover") === "lyrics" ? "lyrics" : "cover",
        searchPage: 1,
        searchHasMore: false,
        searchLoadingMore: false,
        discoverNote: "",
        ups: loadUps()
      },
      get() { return this.state },
      track() { return this.state.queue[this.state.index] || null },
      emit() {
        const list = Array.from(this.listeners)
        for (let i = 0; i < list.length; i++) list[i]()
      },
      patch(next) {
        this.state = Object.assign({}, this.state, next)
        this.emit()
      },
      subscribe(fn) {
        this.listeners.add(fn)
        return () => this.listeners.delete(fn)
      }
    }

    let nowSig = ""
    function pushNow() {
      const s = player.state
      const t = player.track()
      const slim = (item) => item && item.bvid ? { bvid: item.bvid, cid: item.cid || 0, mid: item.mid || 0, title: item.title || "", owner: item.owner || "", duration: item.duration || 0 } : null
      const queue = (s.queue || []).slice(0, 60).map(slim).filter(Boolean)
      const lists = (s.playlists || []).filter((list) => {
        const kind = listKind(list.id) || listKind(list.name)
        return list.id === "liked" || (kind !== "queue" && kind !== "rank")
      }).slice(0, 40).map((list) => ({
        id: list.id,
        name: list.name,
        n: (list.tracks || []).length,
        tracks: (list.tracks || []).slice(0, 80).map(slim).filter(Boolean)
      }))
      const ups = (s.ups || []).slice(0, 40).map((up) => ({ mid: Number(up.mid) || 0, name: String(up.name || "") })).filter((up) => up.mid)
      const sig = [s.playing ? 1 : 0, s.index, t && t.bvid, queue.map((x) => x.bvid).join(), lists.map((list) => list.id + ":" + list.tracks.map((x) => x.bvid).join(",")).join("|"), ups.map((up) => up.mid).join()].join("/")
      if (sig === nowSig) return
      nowSig = sig
      fetch(ORIGIN + "/api/now", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ playing: !!s.playing, index: s.index, track: slim(t), queue: queue, lists: lists, ups: ups })
      }).catch(() => {})
    }

    function attachAudio(audio) {
      if (player.audio === audio) return
      player.audio = audio
      audio.volume = player.state.volume
      audio.loop = player.state.playMode === "one"
      audio.addEventListener("timeupdate", () => {
        player.patch({ currentTime: audio.currentTime || 0 })
        maybeCountListen()
      })
      audio.addEventListener("loadedmetadata", () => player.patch({ duration: audio.duration || 0 }))
      audio.addEventListener("play", () => player.patch({ playing: true }))
      audio.addEventListener("pause", () => player.patch({ playing: false }))
      audio.addEventListener("ended", onEnded)
      const track = player.track()
      if (track && track.cid) loadSrc(track, player.state.playing)
    }

    let seenCue = 0
    let srcReady = false
    let mediaGen = 0
    function srcMatches(track) {
      const audio = player.audio
      const src = (audio && (audio.currentSrc || audio.src)) || ""
      if (!audio || !track || !track.bvid || !src) return false
      try {
        const u = new URL(src, ORIGIN)
        if (u.searchParams.get("bvid") !== String(track.bvid)) return false
        if (track.cid && u.searchParams.get("cid") !== String(track.cid)) return false
        return true
      } catch {
        return false
      }
    }
    async function loadSrc(track, autoplay) {
      countedKey = ""
      srcReady = false
      const audio = player.audio
      if (!audio || !track || !track.bvid) return
      const gen = ++mediaGen
      player.patch({ currentTime: 0, duration: 0, playing: false })
      audio.pause()
      audio.removeAttribute("src")
      audio.load()
      let next = track
      if (!next.cid) {
        try {
          next = Object.assign({}, track, await api("/api/view?bvid=" + encodeURIComponent(track.bvid)), { title: track.title || "" })
        } catch {
          return
        }
      }
      if (gen !== mediaGen || !next.cid) return
      audio.src = ORIGIN + "/api/audio?bvid=" + encodeURIComponent(next.bvid) + "&cid=" + encodeURIComponent(next.cid) + "#t=0"
      audio.load()
      const pin = function () {
        if (gen !== mediaGen) return
        try { audio.currentTime = 0 } catch {}
      }
      audio.addEventListener("loadedmetadata", pin, { once: true })
      audio.addEventListener("playing", function () {
        if (gen !== mediaGen) return
        pin()
        srcReady = true
      }, { once: true })
      if (autoplay) {
        audio.play().then(pin).catch(function () {})
        audio.addEventListener("canplay", function () {
          if (gen !== mediaGen || !audio.paused) return
          audio.play().then(pin).catch(function () {})
        }, { once: true })
      }
    }

    const WEEK = 7 * 864e5
    let countedKey = ""
    function listenKey(track) {
      return track && track.bvid ? track.bvid + ":" + (track.cid || "") : ""
    }
    function slimTrack(track) {
      return {
        bvid: track.bvid,
        cid: track.cid || "",
        aid: track.aid,
        mid: track.mid,
        title: track.title,
        owner: track.owner,
        cover: track.cover,
        duration: track.duration
      }
    }
    function bumpRank(track) {
      const key = listenKey(track)
      if (!key) return
      const now = Date.now()
      let found = false
      let rank = player.state.rank.map((item) => {
        if (item.key !== key) return item
        found = true
        return {
          key: key,
          track: slimTrack(track),
          total: (item.total || 0) + 1,
          last: now,
          weekHits: (item.weekHits || []).filter((t) => now - t < WEEK).concat(now)
        }
      })
      if (!found) rank.push({ key: key, track: slimTrack(track), total: 1, last: now, weekHits: [now] })
      rank.sort((a, b) => b.total - a.total || b.last - a.last)
      if (rank.length > 200) rank = rank.slice(0, 200) // ponytail: drop cold tails; raise if 听歌排行 needs long history
      save("rank", rank)
      player.patch({ rank: rank })
    }
    function maybeCountListen() {
      const track = player.track()
      const key = listenKey(track)
      if (!key || countedKey === key) return
      const audio = player.audio
      const t = (audio && audio.currentTime) || 0
      const d = (audio && audio.duration) || (track && track.duration) || 0
      if (t < Math.min(30, d > 0 ? d * 0.5 : 30)) return
      countedKey = key
      bumpRank(track)
    }
    function rankRows(range) {
      const now = Date.now()
      return player.state.rank.map((row) => {
        const plays = range === "week" ? (row.weekHits || []).filter((t) => now - t < WEEK).length : row.total
        return plays ? Object.assign({}, row.track, { listens: plays }) : null
      }).filter(Boolean).sort((a, b) => b.listens - a.listens).slice(0, 100)
    }
    function openRank() {
      player.patch({ shelf: "rank", mode: "queue", query: "" })
    }
    function playRank() {
      const items = rankRows(player.state.rankRange)
      if (items.length) playSection(items)
    }
    function setRankRange(range) {
      save("rankRange", range)
      player.patch({ rankRange: range })
    }

    function pinCurrent(queue, index) {
      if (index < 0 || index >= queue.length) return { queue, index: -1 }
      if (index === 0) return { queue, index: 0 }
      const current = queue[index]
      return { queue: [current].concat(queue.slice(0, index), queue.slice(index + 1)), index: 0 }
    }

    function setIndex(index) {
      const pinned = pinCurrent(player.state.queue.slice(), index)
      if (pinned.index < 0) return
      writeQueue(pinned.queue, 0)
      const next = pinned.queue[0]
      loadSrc(next, true)
      loadExtras(next)
    }

    async function api(path) {
      const r = await fetch(ORIGIN + path)
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || "请求失败")
      return j
    }

    let extrasBvid = ""
    async function loadExtras(track) {
      if (!track || !track.bvid) return
      if (extrasBvid === track.bvid) return
      const at = track.bvid
      extrasBvid = at
      player.patch({ related: [], comments: [], lyrics: [], lyricMatch: null, relatedNote: "正在加载相关推荐", commentNote: "正在加载评论", lyricNote: "正在搜歌词", commentNext: "", commentAid: 0, commentHasMore: false, commentTotal: 0, commentLoadingMore: false })
      try {
        const data = await api("/api/related?bvid=" + encodeURIComponent(at))
        if (extrasBvid === at) player.patch({ related: data.items || [], relatedNote: "" })
      } catch (error) {
        if (extrasBvid === at) player.patch({ related: [], relatedNote: error.message })
      }
      let aid = track.aid
      let desc = track.desc || ""
      if (!aid || !track.mid || !desc) {
        try {
          const view = await api("/api/view?bvid=" + encodeURIComponent(at))
          aid = aid || view.aid
          desc = desc || view.desc || ""
          if (extrasBvid === at) {
            const queue = player.state.queue.map((item) => item.bvid === at ? Object.assign({}, item, { aid: view.aid, mid: view.mid, desc: view.desc, view: view.view, like: view.like, reply: view.reply, favorite: view.favorite, danmaku: view.danmaku }) : item)
            writeQueue(queue, player.state.index)
          }
        } catch {}
      }
      if (aid) {
        try {
          const data = await api("/api/comments?aid=" + encodeURIComponent(aid))
          if (extrasBvid === at) player.patch({
            comments: data.items || [],
            commentNote: data.closed ? "评论区关闭了。" : "",
            commentNext: data.next || "",
            commentAid: aid,
            commentHasMore: Boolean(data.hasMore),
            commentTotal: data.total || (data.items || []).length,
            commentLoadingMore: false
          })
        } catch (error) {
          if (extrasBvid === at) player.patch({ comments: [], commentNote: error.message, commentHasMore: false })
        }
      } else if (extrasBvid === at) {
        player.patch({ commentNote: "" })
      }
      try {
        const data = await api("/api/lyrics?title=" + encodeURIComponent(track.title || "") + "&owner=" + encodeURIComponent(track.owner || "") + "&duration=" + encodeURIComponent(track.duration || player.state.duration || 0) + "&desc=" + encodeURIComponent(desc || "") + "&bvid=" + encodeURIComponent(track.bvid || "") + "&cid=" + encodeURIComponent(track.cid || ""))
        if (extrasBvid === at) player.patch({
          lyrics: data.lines || [],
          lyricMatch: data.match || null,
          lyricNote: (data.lines || []).length ? "" : "没找到歌词"
        })
      } catch (error) {
        if (extrasBvid === at) player.patch({ lyrics: [], lyricMatch: null, lyricNote: error.message || "歌词搜索失败" })
      }
    }

    async function loadMoreComments() {
      const track = player.track()
      const aid = player.state.commentAid || (track && track.aid)
      if (player.state.commentLoadingMore || !player.state.commentHasMore || !aid) return
      const cursor = player.state.commentNext || ""
      if (!cursor) {
        player.patch({ commentHasMore: false })
        return
      }
      player.patch({ commentLoadingMore: true })
      try {
        const data = await api("/api/comments?aid=" + encodeURIComponent(aid) + "&next=" + encodeURIComponent(cursor))
        const seen = new Set(player.state.comments.map((item) => item.id))
        const more = (data.items || []).filter((item) => item.id && !seen.has(item.id))
        player.patch({
          comments: player.state.comments.concat(more),
          commentNext: data.next || "",
          commentHasMore: Boolean(data.hasMore) && Boolean(data.next) && data.next !== cursor,
          commentTotal: player.state.commentTotal || data.total || 0,
          commentLoadingMore: false
        })
      } catch (error) {
        player.patch({ commentLoadingMore: false })
      }
    }

    async function loadDiscover() {
      if (player.state.discover.some((item) => item && item.items)) return
      player.patch({ discoverNote: "正在加载发现" })
      try {
        const data = await api("/api/discover")
        const sections = data.sections || []
        player.patch({
          discover: sections,
          discoverNote: sections.length ? "" : (data.error || "发现暂时没有内容")
        })
      } catch (error) {
        if (!player.state.discover.length) player.patch({ discoverNote: error.message })
      }
    }

    async function playItem(item) {
      if (!item || !item.bvid) return
      player.patch({ note: "" })
      let next = item
      try {
        if (!item.cid || !item.aid || !item.mid) next = Object.assign({}, item, await api("/api/view?bvid=" + encodeURIComponent(item.bvid)), { title: item.title || "" })
      } catch (error) {
        player.patch({ note: error.message })
        return
      }
      if (sameSong(player.track(), next)) {
        if (player.audio && player.audio.paused) player.audio.play().catch(function () {})
        return
      }
      const queued = player.state.queue.findIndex((row) => sameSong(row, next))
      if (queued >= 0) {
        setIndex(queued)
        return
      }
      const extras = next.pages && next.pages.length > 1 && next.pages.length <= 12 && !item.cid
        ? next.pages.map((p) => ({
          bvid: next.bvid,
          aid: next.aid,
          mid: next.mid,
          cid: p.cid,
          title: next.title + " · " + p.part,
          owner: next.owner,
          cover: next.cover,
          duration: p.duration
        }))
        : [next]
      const from = player.state.index
      const queue = player.state.queue.slice()
      if (from >= 0 && from < queue.length) queue.splice(from, 1)
      let insertAt = Math.min(Math.max(from, 0), queue.length)
      for (let i = 0; i < extras.length; i++) {
        if (queue.some((x) => sameTrack(x, extras[i]))) continue
        queue.splice(insertAt, 0, extras[i])
        insertAt += 1
      }
      let at = queue.findIndex((x) => sameTrack(x, extras[0]))
      if (at < 0) {
        at = Math.min(Math.max(from, 0), queue.length)
        queue.splice(at, 0, extras[0])
      }
      const pinned = pinCurrent(queue, at)
      writeQueue(pinned.queue, pinned.index)
      loadSrc(pinned.queue[0], true)
      loadExtras(pinned.queue[0])
    }

    function writePlaylists(playlists) {
      save("playlists", playlists)
      player.patch({ playlists: playlists })
    }
    function writeUps(ups) {
      save("ups", ups)
      player.patch({ ups: ups })
    }
    function isFollowed(mid) {
      const id = Number(mid) || 0
      return !!(id && (player.state.ups || []).some((up) => Number(up.mid) === id))
    }
    function followUp(mid, name) {
      const id = Number(mid) || 0
      if (!id) return
      const label = String(name || "").trim() || String(id)
      writeUps([{ mid: id, name: label }].concat((player.state.ups || []).filter((up) => Number(up.mid) !== id)))
    }
    function toggleFollow(mid, name) {
      if (isFollowed(mid)) writeUps((player.state.ups || []).filter((up) => Number(up.mid) !== Number(mid)))
      else followUp(mid, name)
    }

    function createPlaylist(name) {
      name = String(name || "").trim()
      const kind = listKind(name)
      if (!name || kind === "queue" || kind === "rank") return ""
      if (kind === "liked") return "liked"
      const lists = player.state.playlists
      const hit = lists.find((list) => list.id === name || list.name === name)
      if (hit) return hit.id
      const id = Date.now().toString(36)
      writePlaylists(lists.concat([{ id: id, name: name, tracks: [] }]))
      return id
    }

    function deletePlaylist(listId) {
      if (!listId || listId === "liked" || listId === "queue") return
      writePlaylists(player.state.playlists.filter((list) => list.id !== listId))
      if (player.state.listId === listId) player.patch({ shelf: "list", listId: "liked" })
    }

    let pendingFlip = null
    function snapshotStage() {
      const stage = document.querySelector("[data-bili-stage]")
      if (!stage) return null
      const take = (sel) => {
        const el = stage.querySelector(sel)
        return el ? { el: el, r: el.getBoundingClientRect() } : null
      }
      return {
        cover: take("[data-bili-hero] [data-bili-cover]"),
        bill: take("[data-bili-bill]"),
        ctrl: take("[data-bili-ctrl]")
      }
    }
    function playStageFlip(shot) {
      const ease = "cubic-bezier(.22,.8,.24,1)"
      const move = (item, stagger) => {
        if (!item || !item.el.isConnected || typeof item.el.animate !== "function") return
        item.el.getAnimations().forEach((anim) => anim.cancel())
        const last = item.el.getBoundingClientRect()
        const a = item.r
        const dx = (a.left + a.width / 2) - (last.left + last.width / 2)
        const dy = (a.top + a.height / 2) - (last.top + last.height / 2)
        const sx = a.width / (last.width || 1)
        const sy = a.height / (last.height || 1)
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) return
        const from = { transformOrigin: "50% 50%", transform: "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")" }
        const to = { transformOrigin: "50% 50%", transform: "translate(0px,0px) scale(1,1)" }
        const frames = stagger
          ? [from, { transformOrigin: "50% 50%", transform: "translate(0px,0px) scale(" + sx + ",1)", offset: 0.46 }, to]
          : [from, to]
        item.el.animate(frames, { duration: stagger ? 560 : 480, easing: ease })
      }
      move(shot.cover, false)
      move(shot.bill, false)
      move(shot.ctrl, true)
    }
    let gsapWait = null
    function loadGsap() {
      if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return Promise.resolve(null)
      }
      if (window.gsap) return Promise.resolve(window.gsap)
      if (gsapWait) return gsapWait
      gsapWait = new Promise((resolve, reject) => {
        const tag = (src, fail) => {
          const s = document.createElement("script")
          s.src = src
          s.onload = () => window.gsap ? resolve(window.gsap) : fail()
          s.onerror = fail
          document.head.append(s)
        }
        tag(ORIGIN + "/gsap.min.js", () => {
          tag("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js", () => reject(new Error("gsap")))
        })
      })
      return gsapWait
    }
    function enterShelf(root) {
      const gsap = window.gsap
      if (!root || !gsap) return
      if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const mark = (nodes) => {
        const fresh = []
        for (let i = 0; i < nodes.length; i++) {
          const el = nodes[i]
          if (!el || el.nodeType !== 1 || el.dataset.biliIn) continue
          el.dataset.biliIn = "1"
          fresh.push(el)
        }
        return fresh
      }
      const heads = mark(root.querySelectorAll("[data-bili-chart] > header, :scope > [data-bili-sub], :scope > [data-bili-upbar]"))
      const cards = mark(root.querySelectorAll("[data-bili-rail] > *"))
      const rows = mark(root.querySelectorAll("[data-bili-rank], [data-bili-mosaic] > *, :scope > [data-bili-now], :scope > [data-bili-row], :scope > [data-bili-cmt], :scope > [data-bili-note], :scope > [data-bili-more]"))
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } })
      if (heads.length) tl.from(heads, { autoAlpha: 0, duration: 0.24, ease: "power2.out" }, 0)
      if (cards.length) tl.from(cards, { y: 16, scale: 0.9, autoAlpha: 0, duration: 0.4, stagger: 0.045, ease: "power3.out", clearProps: "transform" }, 0.04)
      if (rows.length) tl.from(rows, { x: -10, autoAlpha: 0, duration: 0.32, stagger: 0.018, ease: "power2.out", clearProps: "transform,visibility,opacity" }, cards.length ? 0.18 : 0.05)
    }
    function toggleStage() {
      const stageMode = player.state.stageMode === "lyrics" ? "cover" : "lyrics"
      save("stageMode", stageMode)
      const reduce = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches
      pendingFlip = reduce ? null : snapshotStage()
      player.patch({ stageMode: stageMode })
    }

    function isLiked(track) {
      const liked = player.state.playlists.find((list) => list.id === "liked")
      return Boolean(track && liked && liked.tracks.some((item) => sameSong(item, track)))
    }

    function toggleLike(track) {
      if (!track || !track.bvid) return
      const liked = player.state.playlists.find((list) => list.id === "liked") || { id: "liked", name: "我喜欢的", tracks: [] }
      const has = liked.tracks.some((item) => sameSong(item, track))
      const next = Object.assign({}, liked, {
        tracks: has ? liked.tracks.filter((item) => !sameSong(item, track)) : liked.tracks.concat([track])
      })
      writePlaylists(player.state.playlists.map((list) => list.id === "liked" ? next : list).concat(player.state.playlists.some((list) => list.id === "liked") ? [] : [next]))
    }

    function addToPlaylist(listId, track) {
      if (!track || !track.bvid) return
      if (listId === "liked") {
        if (!isLiked(track)) toggleLike(track)
        return
      }
      const playlists = player.state.playlists.map((list) => {
        if (list.id !== listId) return list
        if (list.tracks.some((item) => sameTrack(item, track))) return list
        return Object.assign({}, list, { tracks: list.tracks.concat([track]) })
      })
      writePlaylists(playlists)
    }

    async function enqueue(item) {
      if (!item || !item.bvid) return
      let next = item
      try {
        if (!item.cid || !item.aid || !item.mid) next = Object.assign({}, item, await api("/api/view?bvid=" + encodeURIComponent(item.bvid)), { title: item.title || "" })
      } catch {
        return
      }
      const queue = player.state.queue.slice()
      if (queue.some((row) => sameTrack(row, next) || row.bvid === next.bvid)) return
      queue.push(next)
      writeQueue(queue, player.state.index)
    }

    function removeFromPlaylist(listId, index) {
      const playlists = player.state.playlists.map((list) => {
        if (list.id !== listId) return list
        const tracks = list.tracks.slice()
        tracks.splice(index, 1)
        return Object.assign({}, list, { tracks: tracks })
      })
      writePlaylists(playlists)
    }

    function openPlaylist(listId) {
      player.patch({ shelf: "list", listId: listId, mode: "queue", query: "" })
    }

    function playPlaylist(listId) {
      const list = player.state.playlists.find((item) => item.id === listId)
      if (!list || !list.tracks.length) return
      writeQueue(list.tracks.slice(), 0)
      loadSrc(list.tracks[0], true)
      loadExtras(list.tracks[0])
      player.patch({ shelf: "list", listId: listId, mode: "queue" })
    }

    function playNamedList(name) {
      const key = String(name || "").trim()
      if (!key) return
      const kind = listKind(key)
      if (kind === "liked" || key === "liked") return playPlaylist("liked")
      if (kind === "rank" || key === "rank") return playRank()
      if (kind === "queue" || key === "queue") {
        player.patch({ shelf: "queue", mode: "queue" })
        return
      }
      const lists = player.state.playlists
      const hit = lists.find((list) => list.id === key || list.name === key) || lists.find((list) => list.name.includes(key) || key.includes(list.name))
      if (hit) playPlaylist(hit.id)
    }

    function playlistIdByName(name, create, exact) {
      const key = String(name || "").trim()
      const kind = listKind(key)
      if (!key || kind === "rank") return ""
      if (kind === "liked") return "liked"
      if (kind === "queue") return "queue"
      const lists = player.state.playlists
      const hit = lists.find((list) => list.id === key || list.name === key) || (exact ? null : lists.find((list) => list.name.includes(key) || key.includes(list.name)))
      if (hit) return hit.id
      return create ? createPlaylist(key) : ""
    }

    function addToQueue(track) {
      if (!track || !track.bvid) return
      const queue = player.state.queue
      if (queue.some((item) => sameTrack(item, track) || item.bvid === track.bvid)) return
      writeQueue(queue.concat([track]), player.state.index < 0 ? 0 : player.state.index)
    }

    function applyListEdit(action, data) {
      const kind = listKind(data.list) || (data.list === "queue" ? "queue" : "")
      if (action === "create") {
        if (!kind) createPlaylist(data.list)
        return
      }
      if (action === "delete") {
        if (kind === "queue" || kind === "liked" || kind === "rank") return
        const id = playlistIdByName(data.list, false, true)
        if (id) deletePlaylist(id)
        return
      }
      if (action === "clear") {
        if (!data.list || kind === "queue" || data.list === "queue") {
          clearQueue()
          return
        }
        const id = playlistIdByName(data.list, false)
        if (!id || id === "queue") return
        writePlaylists(player.state.playlists.map((list) => list.id === id ? Object.assign({}, list, { tracks: [] }) : list))
        return
      }
      const track = data.bvid ? data : player.track()
      if (kind === "queue") {
        if (!track || !track.bvid) return
        if (action === "add") addToQueue(track)
        else {
          const index = player.state.queue.findIndex((item) => sameTrack(item, track) || item.bvid === track.bvid)
          if (index >= 0) removeFromQueue(index)
        }
        return
      }
      const id = playlistIdByName(data.list, false)
      if (!id || id === "queue" || !track || !track.bvid) return
      if (id === "liked") {
        if (action === "add" && !isLiked(track)) toggleLike(track)
        if (action === "remove" && isLiked(track)) toggleLike(track)
        return
      }
      if (action === "add") {
        addToPlaylist(id, track)
        return
      }
      const list = player.state.playlists.find((item) => item.id === id)
      const index = list ? list.tracks.findIndex((item) => sameTrack(item, track) || item.bvid === track.bvid) : -1
      if (index >= 0) removeFromPlaylist(id, index)
    }

    function applyCue(data) {
      const action = data.action || data.op
      if (action === "follow") {
        followUp(data.mid, data.name)
        return
      }
      if (action === "unfollow") {
        if (data.mid) writeUps((player.state.ups || []).filter((up) => Number(up.mid) !== Number(data.mid)))
        return
      }
      if (action === "pause") {
        if (player.audio) player.audio.pause()
        return
      }
      if (action === "resume") {
        if (player.audio) player.audio.play().catch(function () {})
        return
      }
      if (action === "next") return skip(1)
      if (action === "prev") return skip(-1)
      if (action === "add" || action === "remove" || action === "clear" || action === "create" || action === "delete") return applyListEdit(action, data)
      if (data.list) return playNamedList(data.list)
      if (data.queue && data.queue.length) return playSection(data.queue)
      if (data.bvid) playItem(data)
    }

    async function openUp(mid, name) {
      if (!mid && !name) return
      player.patch({ shelf: "up", upName: name || "", upMid: Number(mid) || 0, upItems: [], upSets: [], upSet: null, upTab: "works", upNote: "正在加载投稿", mode: "queue", query: "" })
      try {
        let id = mid
        if (!id && player.track() && player.track().bvid) {
          try {
            const view = await api("/api/view?bvid=" + encodeURIComponent(player.track().bvid))
            id = view.mid
            if (view.mid) {
              const queue = player.state.queue.map((item) => item.bvid === player.track().bvid ? Object.assign({}, item, { mid: view.mid }) : item)
              writeQueue(queue, player.state.index)
            }
          } catch {}
        }
        const data = await api("/api/up?mid=" + encodeURIComponent(id || "") + "&name=" + encodeURIComponent(name || "") + "&pn=1")
        const items = data.items || []
        const sets = data.collections || []
        const uid = data.mid || id || 0
        const uname = name || data.name || ""
        player.patch({
          upItems: items,
          upSets: sets,
          upMid: uid,
          upNote: items.length || sets.length ? "" : "这个 UP 暂时没有稿件",
          upName: uname,
          upTab: items.length ? "works" : (sets.length ? "sets" : "works"),
          upPage: 1,
          upHasMore: Boolean(data.hasMore),
          upVideoTotal: data.videoTotal || items.length,
          upLoadingMore: false
        })
        if (isFollowed(uid)) followUp(uid, uname)
      } catch (error) {
        player.patch({ upItems: [], upSets: [], upNote: error.message })
      }
    }

    async function loadMoreUp() {
      if (player.state.upLoadingMore || !player.state.upHasMore) return
      const page = (player.state.upPage || 1) + 1
      player.patch({ upLoadingMore: true })
      try {
        const data = await api("/api/up?mid=" + encodeURIComponent(player.state.upMid || "") + "&name=" + encodeURIComponent(player.state.upName || "") + "&pn=" + page)
        const seen = new Set(player.state.upItems.map((item) => item.bvid))
        const more = (data.items || []).filter((item) => item.bvid && !seen.has(item.bvid))
        player.patch({
          upItems: player.state.upItems.concat(more),
          upPage: page,
          upHasMore: Boolean(data.hasMore),
          upVideoTotal: player.state.upVideoTotal || data.videoTotal || 0,
          upLoadingMore: false
        })
      } catch (error) {
        player.patch({ upLoadingMore: false, upNote: error.message })
      }
    }

    async function openUpSet(item) {
      if (!item || !player.state.upMid) return
      player.patch({ upSet: { id: item.id, type: item.type, name: item.name, items: [], note: "正在加载合集" } })
      try {
        const data = await api("/api/up/collection?mid=" + encodeURIComponent(player.state.upMid) + "&type=" + encodeURIComponent(item.type) + "&id=" + encodeURIComponent(item.id))
        player.patch({ upSet: { id: item.id, type: item.type, name: data.name || item.name, items: data.items || [], note: "" } })
      } catch (error) {
        player.patch({ upSet: { id: item.id, type: item.type, name: item.name, items: [], note: error.message } })
      }
    }

    function writeQueue(queue, index) {
      save("queue", queue)
      save("index", index)
      player.patch({ queue: queue, index: index })
    }

    function stopAudio() {
      const audio = player.audio
      if (audio) {
        audio.pause()
        audio.removeAttribute("src")
        audio.load()
      }
      player.patch({ playing: false, currentTime: 0, duration: 0 })
    }

    function removeFromQueue(index) {
      const queue = player.state.queue.slice()
      if (index < 0 || index >= queue.length) return
      const current = player.state.index
      const wasCurrent = index === current
      queue.splice(index, 1)
      let next = current
      if (index < current) next -= 1
      else if (wasCurrent) next = queue.length ? Math.min(index, queue.length - 1) : -1
      if (wasCurrent && next >= 0) {
        const pinned = pinCurrent(queue, next)
        writeQueue(pinned.queue, pinned.index)
        loadSrc(pinned.queue[0], player.state.playing)
        loadExtras(pinned.queue[0])
        return
      }
      writeQueue(queue, next)
      if (wasCurrent) stopAudio()
    }

    function moveInQueue(from, to) {
      const queue = player.state.queue.slice()
      if (from === to || from < 0 || to < 0 || from >= queue.length || to >= queue.length) return
      const item = queue.splice(from, 1)[0]
      queue.splice(to, 0, item)
      let index = player.state.index
      if (index === from) index = to
      else if (from < index && to >= index) index -= 1
      else if (from > index && to <= index) index += 1
      writeQueue(queue, index)
    }

    function moveUpcoming(from, to) {
      const at = player.state.index
      if (at < 0) return moveInQueue(from, to)
      const queue = player.state.queue.slice()
      const current = queue[at]
      const rest = queue.filter((_, i) => i !== at)
      if (from === to || from < 0 || to < 0 || from >= rest.length || to >= rest.length) return
      const item = rest.splice(from, 1)[0]
      rest.splice(to, 0, item)
      writeQueue([current].concat(rest), 0)
    }

    function clearQueue() {
      writeQueue([], -1)
      stopAudio()
    }

    function writeChips(chips, extra) {
      const next = [...new Set((chips || []).map((word) => String(word || "").trim()).filter(Boolean))]
      save("chips", { v: 2, items: next })
      player.patch(Object.assign({ chips: next }, extra || {}))
    }

    function addChip(word) {
      word = String(word || "").trim()
      if (!word) return
      writeChips(player.state.chips.concat([word]))
      search(word, word)
    }

    function removeChip(word) {
      writeChips(player.state.chips.filter((item) => item !== word), { chip: player.state.chip === word ? "" : player.state.chip })
    }

    function renameChip(from, to) {
      to = String(to || "").trim()
      if (!to || to === from) return
      writeChips(player.state.chips.map((word) => word === from ? to : word), { chip: player.state.chip === from ? to : player.state.chip })
    }

    function playSection(items) {
      if (!items || !items.length) return
      writeQueue(items.slice(), 0)
      loadSrc(items[0], true)
      loadExtras(items[0])
    }

    async function search(q, chip) {
      q = String(q || "").trim()
      player.patch({ query: q, chip: chip || "" })
      if (!q) {
        player.patch({ mode: "queue", note: "", results: [], searchPage: 1, searchHasMore: false })
        return
      }
      player.patch({ mode: "results", note: "正在搜索", results: [], searchPage: 1, searchHasMore: false })
      try {
        const data = await api("/api/search?q=" + encodeURIComponent(q) + "&page=1")
        player.patch({ results: data.items || [], note: "", searchPage: 1, searchHasMore: Boolean(data.hasMore) })
      } catch (error) {
        player.patch({ results: [], note: error.message, searchHasMore: false })
      }
    }

    async function loadMoreSearch() {
      const q = String(player.state.query || "").trim()
      if (player.state.searchLoadingMore || !player.state.searchHasMore || !q) return
      const page = (player.state.searchPage || 1) + 1
      player.patch({ searchLoadingMore: true })
      try {
        const data = await api("/api/search?q=" + encodeURIComponent(q) + "&page=" + page)
        const seen = new Set(player.state.results.map((item) => item.bvid + ":" + (item.cid || 0)))
        const more = (data.items || []).filter((item) => item && item.bvid && !seen.has(item.bvid + ":" + (item.cid || 0)))
        player.patch({
          results: player.state.results.concat(more),
          searchPage: page,
          searchHasMore: Boolean(data.hasMore) && more.length > 0,
          searchLoadingMore: false
        })
      } catch (error) {
        player.patch({ searchLoadingMore: false })
      }
    }

    function onEnded() {
      if (!srcReady) return
      countedKey = ""
      if (player.state.playMode === "one") {
        const audio = player.audio
        if (!audio) return
        audio.currentTime = 0
        audio.play().catch(function () {})
        return
      }
      skip(1)
    }

    function skip(dir) {
      const queue = player.state.queue.slice()
      const index = player.state.index
      if (!queue.length || index < 0) return
      if (dir < 0) {
        if (index > 0) setIndex(index - 1)
        return
      }
      // ponytail: 播放列表 consumes; liked/lists never splice here
      queue.splice(index, 1)
      if (!queue.length) {
        writeQueue([], -1)
        stopAudio()
        return
      }
      let next = Math.min(index, queue.length - 1)
      if (player.state.playMode === "shuffle") next = Math.floor(Math.random() * queue.length)
      if (next < 0 || next >= queue.length) {
        writeQueue(queue, -1)
        stopAudio()
        return
      }
      const pinned = pinCurrent(queue, next)
      writeQueue(pinned.queue, pinned.index)
      loadSrc(pinned.queue[0], true)
      loadExtras(pinned.queue[0])
    }

    function cyclePlayMode() {
      const playMode = PLAY_MODES[(PLAY_MODES.indexOf(player.state.playMode) + 1) % PLAY_MODES.length]
      save("playMode", playMode)
      if (player.audio) player.audio.loop = playMode === "one"
      player.patch({ playMode: playMode, shuffleHistory: playMode === "shuffle" ? player.state.shuffleHistory : [] })
    }

    function toggle() {
      const audio = player.audio
      const track = player.track()
      if (!audio || !track) return
      if (!srcMatches(track)) {
        loadSrc(track, true)
        return
      }
      if (audio.paused) audio.play().catch(function () {})
      else audio.pause()
    }

    function seek(ratio) {
      const audio = player.audio
      const track = player.track()
      if (!audio || !track) return
      if (!srcMatches(track)) {
        loadSrc(track, true)
        return
      }
      if (!audio.duration) return
      audio.currentTime = ratio * audio.duration
      player.patch({ currentTime: audio.currentTime })
    }

    function setVolume(volume) {
      volume = clamp(volume, 0, 1)
      if (player.audio) player.audio.volume = volume
      save("volume", volume)
      player.patch({ volume: volume })
    }

    function textOf(locale, key, fallback) {
      return (locale && locale.t && locale.t(NS, key)) || fallback
    }

    function usePlayer() {
      const [, bump] = react.useState(0)
      react.useEffect(() => player.subscribe(() => bump((n) => n + 1)), [])
      return player.state
    }

    function Seek() {
      const state = usePlayer()
      const track = player.track()
      const duration = state.duration || (track && track.duration) || 0
      return jsx("input", {
        "data-bili-seek": "",
        type: "range",
        min: 0,
        max: 1000,
        value: duration ? Math.round((state.currentTime / duration) * 1000) : 0,
        style: { "--p": (duration ? (state.currentTime / duration) * 100 : 0) + "%" },
        "aria-label": "进度",
        onInput: (event) => seek(event.target.value / 1000),
        onChange: (event) => seek(event.target.value / 1000)
      })
    }

    function ModeButton({ size = 18 }) {
      const state = usePlayer()
      const mode = state.playMode || "list"
      return jsx("button", {
        type: "button",
        "data-on": mode !== "list" ? "" : undefined,
        "aria-label": MODE_LABEL[mode],
        title: MODE_LABEL[mode],
        onClick: cyclePlayMode,
        children: jsx(Icon, { size: size, d: ICONS[mode] || ICONS.list })
      })
    }

    function PlaylistMenu({ lists, onPick }) {
      return jsx("div", {
        "data-bili-menu": "",
        role: "menu",
        onClick: (event) => event.stopPropagation(),
        children: [
          jsx("header", { children: "加入歌单" }),
          lists.length
            ? lists.map((list) => jsx("button", {
              type: "button",
              role: "menuitem",
              "data-liked": list.id === "liked" ? "" : undefined,
              onClick: () => onPick(list.id),
              children: [
                list.id === "liked"
                  ? jsx(Icon, { size: 14, d: ICONS.heart })
                  : jsx(Cover, { src: list.tracks[0] && list.tracks[0].cover }),
                jsx("span", { children: list.name }),
                jsx("em", { children: list.tracks.length })
              ]
            }, list.id))
            : jsx("p", { children: "先在左侧新建歌单" })
        ]
      })
    }

    function Volume() {
      const state = usePlayer()
      const [open, setOpen] = react.useState(false)
      const box = useDismiss(open, () => setOpen(false))
      return jsx("div", {
        ref: box,
        "data-bili-vol": "",
        children: [
          jsx("button", {
            type: "button",
            "data-on": open ? "" : undefined,
            "aria-label": "音量",
            title: "音量",
            onClick: () => setOpen(!open),
            children: jsx(Icon, { size: 16, d: ICONS.vol })
          }),
          open ? jsx("div", {
            "data-pop": "",
            children: jsx("input", {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(state.volume * 100),
              style: { "--p": (state.volume * 100) + "%" },
              "aria-label": "音量",
              onChange: (event) => setVolume(event.target.value / 100)
            })
          }) : null
        ]
      })
    }

    function Transport() {
      const state = usePlayer()
      const track = player.track()
      const duration = state.duration || (track && track.duration) || 0
      return jsx("div", {
        "data-bili-ctrl": "",
        children: [
          jsx("div", {
            "data-bili-seekline": "",
            children: [
              jsx("time", { children: fmt(state.currentTime) }),
              jsx(Seek, {}),
              jsx("time", { children: fmt(duration) })
            ]
          }),
          jsx("div", {
            "data-bili-buttons": "",
            children: [
              jsx(ModeButton, {}),
              jsx("button", { type: "button", "aria-label": "上一首", onClick: () => skip(-1), children: jsx(Icon, { d: ICONS.prev }) }),
              jsx("button", {
                type: "button",
                "data-bili-play": "",
                "aria-label": state.playing ? "暂停" : "播放",
                onClick: toggle,
                children: jsx(Icon, { size: 22, d: state.playing ? ICONS.pause : ICONS.play, nudge: state.playing ? 0 : 1 })
              }),
              jsx("button", { type: "button", "aria-label": "下一首", onClick: () => skip(1), children: jsx(Icon, { d: ICONS.next }) }),
              jsx(Volume, {})
            ]
          })
        ]
      })
    }

    function MiniGlyph({ size }) {
      return jsx("span", {
        "data-bili-glyph": "",
        children: jsx(Disc, { size: size })
      })
    }

    function MiniPlayer({ wide, openPanel }) {
      const state = usePlayer()
      const track = player.track()
      const line = activeLyric()
      return jsx("div", {
        "data-bili-mini": "",
        "data-wide": wide ? "" : undefined,
        "data-on": state.playing ? "" : undefined,
        children: [
          jsx("button", {
            type: "button",
            "data-bili-mini-cover": "",
            "aria-label": "打开播放器",
            onClick: wide ? openPanel : toggle,
            children: jsx("span", {
              "data-bili-disc": "",
              children: track && track.cover
                ? jsx("img", { src: imgSrc(track.cover), alt: "" })
                : jsx(Disc, { size: wide ? 28 : 18 })
            })
          }),
          wide ? jsx("div", {
            "data-bili-mini-info": "",
            onClick: openPanel,
            children: [
              jsx("b", { children: track ? track.title : "bilibili电台" }),
              line
                ? jsx("p", {
                  "data-bili-minilrc": "",
                  children: Array.from(line).map((ch, i) => jsx("span", {
                    style: { animationDelay: (i * 0.07) + "s" },
                    children: ch === " " ? "\u00a0" : ch
                  }, i))
                }, line)
                : jsx("span", { "data-bili-minilrc-note": "", children: (track && track.owner) || "点开搜歌" })
            ]
          }) : null,
          wide ? jsx("div", {
            "data-bili-mini-btns": "",
            children: [
              jsx("button", { type: "button", "aria-label": "上一首", onClick: () => skip(-1), children: jsx(Icon, { d: ICONS.prev, size: 16 }) }),
              jsx("button", {
                type: "button",
                "data-bili-play": "",
                "aria-label": state.playing ? "暂停" : "播放",
                onClick: toggle,
                children: jsx(Icon, { size: 18, d: state.playing ? ICONS.pause : ICONS.play, nudge: state.playing ? 0 : 1 })
              }),
              jsx("button", { type: "button", "aria-label": "下一首", onClick: () => skip(1), children: jsx(Icon, { d: ICONS.next, size: 16 }) })
            ]
          }) : null,
          wide ? jsx(Seek, {}) : null
        ]
      })
    }

    function QueueRow({ item, index, track, editable, sortable, onPlay, onRemove, onMove }) {
      usePlayer()
      const [over, setOver] = react.useState(false)
      const [menu, setMenu] = react.useState(false)
      const pop = useDismiss(menu, () => setMenu(false))
      const hold = (event) => event.stopPropagation()
      const liked = isLiked(item)
      const on = sameSong(item, track)
      return jsx("div", {
        "data-bili-row": "",
        "data-queue": sortable ? "" : undefined,
        "data-add": sortable ? undefined : "",
        "data-over": over ? "" : undefined,
        "data-on": on ? "" : undefined,
        role: "button",
        tabIndex: 0,
        draggable: Boolean(sortable),
        onClick: onPlay,
        onKeyDown: (event) => { if (event.key === "Enter") onPlay() },
        onDragStart: sortable ? (event) => {
          event.dataTransfer.setData("text/plain", String(index))
          event.dataTransfer.effectAllowed = "move"
        } : undefined,
        onDragOver: sortable ? (event) => {
          event.preventDefault()
          event.dataTransfer.dropEffect = "move"
          setOver(true)
        } : undefined,
        onDragLeave: sortable ? () => setOver(false) : undefined,
        onDrop: sortable ? (event) => {
          event.preventDefault()
          setOver(false)
          const from = Number(event.dataTransfer.getData("text/plain"))
          if (Number.isFinite(from)) (onMove || moveInQueue)(from, index)
        } : undefined,
        children: [
          sortable ? jsx("button", {
            type: "button",
            "data-bili-handle": "",
            "aria-label": "拖动排序",
            title: "拖动排序",
            onClick: hold,
            children: jsx(Icon, { size: 14, d: ICONS.grip })
          }) : null,
          item.cover ? jsx("img", { src: imgSrc(item.cover), alt: "", draggable: false }) : jsx("div", { "data-bili-ph": "" }),
          jsx("div", { children: [
            jsx("b", { children: item.title }),
            on && !sortable ? jsx("span", { children: "正在播放" }) : item.owner ? jsx("span", {
              children: item.owner,
              onClick: (event) => {
                event.stopPropagation()
                openUp(item.mid, item.owner)
              }
            }) : null
          ] }),
          jsx("time", { children: item.listens ? item.listens + "次" : (item.duration ? fmt(item.duration) : "") }),
          jsx("button", {
            type: "button",
            "data-bili-add": "",
            "data-bili-heart": "",
            "data-on": liked ? "" : undefined,
            "aria-label": liked ? "取消收藏" : "收藏",
            title: liked ? "取消收藏" : "收藏",
            onClick: (event) => { event.stopPropagation(); toggleLike(item) },
            children: jsx(Icon, { size: 14, d: liked ? ICONS.heart : ICONS.heartOff })
          }),
          sortable ? null : jsx("button", {
            type: "button",
            "data-bili-add": "",
            "aria-label": "添加到播放列表",
            title: "添加到播放列表",
            onClick: (event) => { event.stopPropagation(); enqueue(item) },
            children: jsx(Icon, { size: 14, d: ICONS.plus })
          }),
          jsx("div", {
            ref: pop,
            "data-bili-pop": "",
            onClick: hold,
            children: [
              jsx("button", {
                type: "button",
                "data-bili-add": "",
                "aria-label": "加入歌单",
                title: "加入歌单",
                "aria-expanded": menu ? "true" : "false",
                onClick: () => setMenu(!menu),
                children: jsx(Icon, { size: 14, d: ICONS.toList })
              }),
              menu ? jsx(PlaylistMenu, {
                lists: customLists(),
                onPick: (id) => {
                  addToPlaylist(id, item)
                  setMenu(false)
                }
              }) : null
            ]
          }),
          editable ? jsx("button", {
            type: "button",
            "data-bili-del": "",
            "aria-label": "移除",
            title: "移除",
            onClick: (event) => {
              event.stopPropagation()
              if (onRemove) onRemove(index)
              else removeFromQueue(index)
            },
            children: jsx(Icon, { size: 14, d: ICONS.close })
          }) : null
        ]
      })
    }

    function NowPlayingRow({ item, onRemove }) {
      usePlayer()
      const [menu, setMenu] = react.useState(false)
      const pop = useDismiss(menu, () => setMenu(false))
      const hold = (event) => event.stopPropagation()
      const liked = isLiked(item)
      return jsx("div", {
        "data-bili-now": "",
        onDragOver: (event) => {
          event.preventDefault()
          event.dataTransfer.dropEffect = "none"
        },
        onDrop: (event) => event.preventDefault(),
        children: [
          jsx("header", { children: "正在播放" }),
          jsx("div", {
            children: [
              item.cover ? jsx("img", { src: imgSrc(item.cover), alt: "", draggable: false }) : jsx("div", { "data-bili-ph": "" }),
              jsx("div", { children: [
                jsx("b", { children: item.title }),
                item.owner ? jsx("span", {
                  children: item.owner,
                  onClick: () => openUp(item.mid, item.owner)
                }) : null
              ] }),
              jsx("time", { children: item.duration ? fmt(item.duration) : "" }),
              jsx("button", {
                type: "button",
                "data-bili-add": "",
                "data-bili-heart": "",
                "data-on": liked ? "" : undefined,
                "aria-label": liked ? "取消收藏" : "收藏",
                title: liked ? "取消收藏" : "收藏",
                onClick: () => toggleLike(item),
                children: jsx(Icon, { size: 14, d: liked ? ICONS.heart : ICONS.heartOff })
              }),
              jsx("div", {
                ref: pop,
                "data-bili-pop": "",
                onClick: hold,
                children: [
                  jsx("button", {
                    type: "button",
                    "data-bili-add": "",
                    "aria-label": "加入歌单",
                    title: "加入歌单",
                    "aria-expanded": menu ? "true" : "false",
                    onClick: () => setMenu(!menu),
                    children: jsx(Icon, { size: 14, d: ICONS.toList })
                  }),
                  menu ? jsx(PlaylistMenu, {
                    lists: customLists(),
                    onPick: (id) => {
                      addToPlaylist(id, item)
                      setMenu(false)
                    }
                  }) : null
                ]
              }),
              jsx("button", {
                type: "button",
                "data-bili-del": "",
                "aria-label": "移除",
                title: "移除",
                onClick: onRemove,
                children: jsx(Icon, { size: 14, d: ICONS.close })
              })
            ]
          })
        ]
      })
    }

    function ago(ts) {
      const s = Math.max(0, Date.now() / 1000 - Number(ts || 0))
      if (!ts) return ""
      if (s < 3600) return Math.max(1, Math.floor(s / 60)) + "分钟前"
      if (s < 86400) return Math.floor(s / 3600) + "小时前"
      if (s < 86400 * 30) return Math.floor(s / 86400) + "天前"
      return new Date(ts * 1000).toLocaleDateString()
    }

    function SetRow({ item, onOpen }) {
      return jsx("div", {
        "data-bili-row": "",
        role: "button",
        tabIndex: 0,
        onClick: onOpen,
        onKeyDown: (event) => { if (event.key === "Enter") onOpen() },
        children: [
          item.cover ? jsx("img", { src: imgSrc(item.cover), alt: "" }) : jsx("div", { "data-bili-ph": "" }),
          jsx("div", { children: [
            jsx("b", { children: item.name }),
            item.count ? jsx("span", { children: String(item.count) }) : null
          ] })
        ]
      })
    }

    function CommentRow({ item }) {
      return jsx("div", {
        "data-bili-cmt": "",
        children: [
          item.avatar ? jsx("img", { src: imgSrc(item.avatar), alt: "" }) : jsx("div", { "data-bili-ph": "" }),
          jsx("div", {
            children: [
              jsx("div", {
                "data-meta": "",
                children: [
                  jsx("b", { children: item.name }),
                  jsx("time", { children: ago(item.time) }),
                  item.like ? jsx("em", { children: nfmt(item.like) }) : null
                ]
              }),
              jsx("p", { children: item.text })
            ]
          })
        ]
      }, item.id)
    }

    function lyricIndex() {
      const lines = player.state.lyrics || []
      const t = player.state.currentTime || 0
      let max = 0
      for (let i = 0; i < lines.length; i++) max = Math.max(max, Number(lines[i].from) || 0)
      if (max <= 0) {
        const d = player.state.duration || 0
        if (d > 1 && lines.length) return Math.min(lines.length - 1, Math.floor((t / d) * lines.length))
        return lines.length ? 0 : -1
      }
      let active = -1
      let best = -1
      for (let i = 0; i < lines.length; i++) {
        const from = Number(lines[i].from) || 0
        if (t >= from && from >= best) {
          active = i
          best = from
        }
      }
      return active
    }

    function activeLyric() {
      const lines = player.state.lyrics || []
      const i = lyricIndex()
      if (i < 0 || lines[i].song) return ""
      return String(lines[i].text || "").replace(/\s+/g, " ").trim()
    }

    function Lyrics() {
      const state = usePlayer()
      const box = react.useRef(null)
      const [shift, setShift] = react.useState(0)
      const lines = state.lyrics || []
      const active = lyricIndex()
      const pin = react.useCallback(() => {
        const wrap = box.current
        if (!wrap) return
        const on = wrap.querySelector("[data-on]") || wrap.querySelector("p")
        if (!on) return
        const next = wrap.clientHeight / 2 - (on.offsetTop + on.offsetHeight / 2)
        setShift((prev) => (Math.abs(prev - next) < 0.5 ? prev : next))
      }, [])
      react.useLayoutEffect(pin, [active, lines.length, pin])
      react.useEffect(() => {
        const el = box.current
        if (!el || typeof ResizeObserver !== "function") return
        const ro = new ResizeObserver(pin)
        ro.observe(el)
        return () => ro.disconnect()
      }, [pin])
      const match = state.lyricMatch
      const src = match && (match.source || match.name)
        ? [match.source, match.name, match.artist].filter(Boolean).join(" · ")
        : ""
      if (!lines.length) {
        const track = player.track()
        const note = !track ? "" : (state.lyricNote || "没找到歌词")
        return jsx("div", { "data-bili-lyrics": "", "data-empty": "", children: note ? jsx("p", { "data-note": "", children: note }) : null })
      }
      return jsx(react.Fragment, {
        children: [
          jsx("div", {
            ref: box,
            "data-bili-lyrics": "",
            children: jsx("div", {
              "data-bili-lyric-list": "",
              style: { transform: "translateY(" + shift + "px)" },
              children: lines.map((line, i) => jsx("p", {
                "data-on": i === active ? "" : undefined,
                "data-near": i === active - 1 || i === active + 1 ? "" : undefined,
                "data-song": line.song ? "" : undefined,
                children: line.text
              }, i + ":" + line.from))
            })
          }),
          src ? jsx("div", { "data-bili-lyric-src": "", children: src }) : null
        ]
      })
    }

    function songName(item) {
      const title = item.title || ""
      const cut = title.indexOf(" · ")
      return cut > 0 ? title.slice(0, cut) : title
    }

    function songBy(item) {
      const title = item.title || ""
      const cut = title.indexOf(" · ")
      return (cut > 0 ? title.slice(cut + 3) : "") || item.owner || ""
    }

    function Cover({ src }) {
      return src ? jsx("img", { src: imgSrc(src), alt: "" }) : jsx("div", { "data-bili-ph": "" })
    }

    function callArgs(block) {
      const raw = block && (("kind" in block) ? (block.call && block.call.argsRaw) : block.argsRaw)
      try { return JSON.parse(raw || "{}") } catch { return {} }
    }

    function songFromCall(call) {
      const block = call && call.block
      if (!block || call.phase !== "result") return null
      if (block.meta && (block.meta.bvid || block.meta.mode)) return block.meta
      if (Array.isArray(block.content)) {
        const text = block.content.map((part) => part && part.type === "text" ? part.text : "").join("\n")
        try {
          const parsed = JSON.parse(text)
          if (parsed && (parsed.bvid || parsed.mode)) return parsed
        } catch {}
      }
      return null
    }

    function isOn(item, now) {
      return !!(item && now && (sameTrack(item, now) || (!item.cid && item.bvid === now.bvid)))
    }

    function SongCard({ item, note, now }) {
      const on = isOn(item, now)
      return jsx("button", {
        type: "button",
        "data-bili-songcard": "",
        "data-on": on ? "" : undefined,
        onClick: () => { if (item && item.bvid) playItem(item) },
        children: [
          jsx(Cover, { src: item && item.cover }),
          jsx("div", {
            children: [
              jsx("b", { children: (item && item.title) || "没找到" }),
              jsx("span", { children: (item && item.owner) || "" }),
              note ? jsx("em", { children: note }) : (on ? jsx("em", { children: "正在播放" }) : null)
            ]
          })
        ]
      })
    }

    function PickSheet({ items, now }) {
      return jsx("div", {
        "data-bili-picks": "",
        children: items.map((item, i) => i === 0
          ? jsx("button", {
            type: "button",
            "data-bili-pick-hero": "",
            "data-on": isOn(item, now) ? "" : undefined,
            onClick: () => playItem(item),
            children: [
              jsx(Cover, { src: item.cover }),
              jsx("div", { children: [
                jsx("b", { children: songName(item) }),
                jsx("span", { children: songBy(item) || item.owner || "" })
              ] })
            ]
          }, (item.bvid || "h") + ":hero")
          : jsx("button", {
            type: "button",
            "data-bili-pick": "",
            "data-n": String(i + 1),
            "data-on": isOn(item, now) ? "" : undefined,
            onClick: () => playItem(item),
            children: [
              jsx("i", { children: String(i + 1).padStart(2, "0") }),
              jsx(Cover, { src: item.cover }),
              jsx("div", { children: [jsx("b", { children: songName(item) }), jsx("span", { children: songBy(item) })] }),
              jsx("time", { children: item.duration ? fmt(item.duration) : "" })
            ]
          }, (item.bvid || i) + ":" + i))
      })
    }

    function songsFromMeta(meta) {
      if (!meta) return []
      if (meta.mode === "suggest") return (meta.items || []).filter((item) => item && item.bvid)
      return meta.bvid ? [meta] : []
    }

    function isLiveMeta(meta, action) {
      if (action === "search" || action === "suggest") return false
      if (meta && meta.mode === "suggest") return false
      if (meta && (meta.mode === "now" || meta.mode === "play")) return true
      return action === "play" || action === "pause" || action === "resume" || action === "next" || action === "prev"
    }

    function SongPanel({ meta, failed, waiting, query, action }) {
      usePlayer()
      const now = player.track()
      if (action === "search" || action === "status" || (meta && (meta.mode === "search" || meta.mode === "status"))) return null
      if (action === "add" || action === "remove" || action === "clear" || action === "create" || action === "delete" || (meta && meta.mode === "edit")) {
        if (failed) return jsx(SongCard, { note: "这次没改成", now: now, item: { title: query || "没改成" } })
        return null
      }
      if (isLiveMeta(meta, action)) {
        if (failed) return jsx(SongCard, { note: "这次没放成", now: now, item: { title: query || "没找到" } })
        return null
      }
      const items = songsFromMeta(meta)
      if (waiting) return jsx(SongCard, { note: "正在找歌", now: now, item: { title: query || "正在找歌" } })
      if (failed || !items.length) return jsx(SongCard, { note: "这次没放成", now: now, item: { title: query || "没找到" } })
      if (items.length === 1) return jsx(SongCard, { item: items[0], now: now })
      return jsx(PickSheet, { items: items, now: now })
    }

    function PlaySongCard(owner) {
      const call = owner || {}
      const meta = songFromCall(call)
      const args = callArgs(call.block)
      const failed = call.phase === "result" && call.block && (call.block.isError || (meta && meta.ok === false))
      if (args.action === "search" || args.action === "status") return null
      return jsx(SongPanel, {
        meta: meta,
        failed: failed,
        waiting: call.phase !== "result",
        query: args.query || args.list || "",
        action: args.action || (call.block && call.block.name) || ""
      })
    }

    function BiliSongsNode({ node }) {
      const data = node && node.data || {}
      const meta = data.meta
      if (!meta) return null
      return jsx(SongPanel, {
        meta: meta,
        failed: data.error === true,
        waiting: false,
        query: ""
      })
    }

    function ChartRow({ item, n, track, onPlay }) {
      return jsx("div", {
        "data-bili-rank": "",
        "data-n": n <= 3 ? String(n) : undefined,
        "data-on": sameTrack(item, track) || (!item.cid && track && item.bvid === track.bvid) ? "" : undefined,
        role: "button",
        tabIndex: 0,
        onClick: onPlay,
        onKeyDown: (event) => { if (event.key === "Enter") onPlay() },
        children: [
          jsx("em", { children: String(n).padStart(2, "0") }),
          jsx(Cover, { src: item.cover }),
          jsx("div", { children: [jsx("b", { children: songName(item) }), jsx("span", { children: songBy(item) })] }),
          jsx("time", { children: item.listens ? item.listens + "次" : (item.duration ? fmt(item.duration) : "") })
        ]
      })
    }

    function DiscoverShelf() {
      const state = usePlayer()
      const track = player.track()
      const [open, setOpen] = react.useState({})
      react.useLayoutEffect(() => {
        const el = document.querySelector("[data-bili-page] [data-bili-list]")
        if (!el) return
        loadGsap().then(() => enterShelf(el)).catch(() => {})
      }, [open])
      const sections = (state.discover || []).filter((section) => section && section.items && section.items.length)
      if (!sections.length) return jsx("div", { "data-bili-note": "", children: state.discoverNote || "正在加载发现" })
      const meta = {
        hot: { tone: "hot", kind: "chart" },
        fresh: { tone: "fresh", kind: "chart" },
        rank: { tone: "rank", kind: "chart" },
        feed: { tone: "feed", kind: "mosaic", limit: 8 }
      }
      return jsx(react.Fragment, {
        children: sections.map((section) => {
          const conf = meta[section.id] || { tone: "rank", kind: "chart" }
          const items = section.items
          const top = conf.kind === "chart" ? items.slice(0, 5) : []
          const rest = conf.kind === "chart" ? items.slice(5) : items
          const shown = conf.kind === "mosaic" && !open[section.id] ? rest.slice(0, conf.limit) : rest
          const hidden = rest.length - shown.length
          return jsx("section", {
            "data-bili-chart": "",
            "data-tone": conf.tone,
            children: [
              jsx("header", {
                children: [
                  jsx("b", { children: section.title }),
                  jsx("button", {
                    type: "button",
                    "aria-label": "播放全部",
                    title: "播放全部",
                    onClick: () => playSection(items),
                    children: jsx(Icon, { size: 16, d: ICONS.play, nudge: 1 })
                  })
                ]
              }),
              top.length ? jsx("div", {
                "data-bili-rail": "",
                children: top.map((item, i) => jsx("button", {
                  type: "button",
                  onClick: () => playItem(item),
                  children: [
                    jsx(Cover, { src: item.cover }),
                    jsx("i", { children: i + 1 }),
                    jsx("b", { children: songName(item) })
                  ]
                }, item.bvid + ":" + i))
              }) : null,
              conf.kind === "mosaic" ? jsx("div", {
                "data-bili-mosaic": "",
                children: shown.map((item, i) => jsx("button", {
                  type: "button",
                  onClick: () => playItem(item),
                  children: [
                    jsx(Cover, { src: item.cover }),
                    jsx("b", { children: songName(item) })
                  ]
                }, item.bvid + ":" + i))
              }) : shown.map((item, i) => jsx(ChartRow, {
                item: item,
                n: i + 1 + top.length,
                track: track,
                onPlay: () => playItem(item)
              }, item.bvid + ":" + i)),
              hidden > 0 ? jsx("button", {
                type: "button",
                "data-bili-more": "",
                onClick: () => setOpen(Object.assign({}, open, { [section.id]: true })),
                children: "更多"
              }) : null
            ]
          }, section.id)
        })
      })
    }

    function RankShelf() {
      const state = usePlayer()
      const track = player.track()
      const range = state.rankRange || "week"
      const items = rankRows(range)
      return jsx(react.Fragment, {
        children: [
          jsx("div", {
            "data-bili-sub": "",
            children: [
              jsx("button", {
                type: "button",
                "data-on": range === "week" ? "" : undefined,
                onClick: () => setRankRange("week"),
                children: "最近一周"
              }),
              jsx("button", {
                type: "button",
                "data-on": range === "all" ? "" : undefined,
                onClick: () => setRankRange("all"),
                children: "所有时间"
              })
            ]
          }),
          items.map((item, i) => jsx(ChartRow, {
            item: item,
            n: i + 1,
            track: track,
            onPlay: () => playItem(item)
          }, item.bvid + ":" + (item.cid || i)))
        ]
      })
    }

    function FollowBtn({ mid, name }) {
      usePlayer()
      const on = isFollowed(mid)
      if (!mid) return null
      return jsx("button", {
        type: "button",
        "data-bili-follow": "",
        "data-on": on ? "" : undefined,
        onClick: (event) => {
          event.stopPropagation()
          toggleFollow(mid, name)
        },
        children: on ? "已收藏" : "收藏"
      })
    }

    function UpShelf() {
      const state = usePlayer()
      const set = state.upSet
      const head = jsx("div", {
        "data-bili-upbar": "",
        children: [
          jsx("b", { children: state.upName || "UP" }),
          jsx(FollowBtn, { mid: state.upMid, name: state.upName })
        ]
      })
      if (state.upNote && !state.upItems.length && !state.upSets.length) {
        return jsx(react.Fragment, {
          children: [
            head,
            jsx("div", { "data-bili-note": "", "data-err": /失败|挡住|找不到|没有/.test(state.upNote) ? "" : undefined, children: state.upNote })
          ]
        })
      }
      if (set) {
        return jsx(react.Fragment, {
          children: [
            jsx("div", {
              "data-bili-upbar": "",
              children: [
                jsx("button", { type: "button", "aria-label": "返回", onClick: () => player.patch({ upSet: null }), children: jsx(Icon, { size: 14, d: ICONS.back }) }),
                jsx("b", { children: set.name }),
                jsx(FollowBtn, { mid: state.upMid, name: state.upName }),
                set.items && set.items.length ? jsx("button", {
                  type: "button",
                  onClick: () => {
                    writeQueue(set.items.slice(), 0)
                    loadSrc(set.items[0], true)
                    loadExtras(set.items[0])
                  },
                  children: "播放全部"
                }) : null
              ]
            }),
            set.note
              ? jsx("div", { "data-bili-note": "", children: set.note })
              : (set.items || []).map((item, i) => jsx(QueueRow, { item: item, index: i, track: player.track(), onPlay: () => playItem(item) }, item.bvid + ":" + i))
          ]
        })
      }
      return jsx(react.Fragment, {
        children: [
          head,
          jsx("div", {
            "data-bili-sub": "",
            children: [
              jsx("button", {
                type: "button",
                "data-on": state.upTab === "works" ? "" : undefined,
                onClick: () => player.patch({ upTab: "works" }),
                children: "投稿 " + (state.upVideoTotal || state.upItems.length)
              }),
              jsx("button", {
                type: "button",
                "data-on": state.upTab === "sets" ? "" : undefined,
                onClick: () => player.patch({ upTab: "sets" }),
                children: "合集与序列 " + (state.upSets.length || 0)
              })
            ]
          }),
          state.upTab === "sets"
            ? (state.upSets.length
              ? state.upSets.map((item) => jsx(SetRow, { item: item, onOpen: () => openUpSet(item) }, item.type + ":" + item.id))
              : null)
            : (state.upItems.length
              ? jsx(react.Fragment, {
                children: [
                  state.upItems.map((item, i) => jsx(QueueRow, { item: item, index: i, track: player.track(), onPlay: () => playItem(item) }, item.bvid + ":" + i)),
                  state.upHasMore ? jsx("button", {
                    type: "button",
                    "data-bili-more": "",
                    onClick: loadMoreUp,
                    children: state.upLoadingMore ? "正在加载更多投稿" : "更多"
                  }) : null
                ]
              })
              : null)
        ]
      })
    }

    function Page({ ctx }) {
      const t = (key, fallback) => textOf(ctx.locale, key, fallback)
      const state = usePlayer()
      const track = player.track()
      const [draft, setDraft] = react.useState("")
      const [addMenu, setAddMenu] = react.useState(false)
      const actsRef = useDismiss(addMenu, () => setAddMenu(false))
      const [chipAdd, setChipAdd] = react.useState(false)
      const [chipDraft, setChipDraft] = react.useState("")
      const [chipEdit, setChipEdit] = react.useState("")
      const [chipEditDraft, setChipEditDraft] = react.useState("")
      const chipTap = react.useRef(0)
      react.useEffect(() => { loadDiscover() }, [])
      react.useEffect(() => { if (track && track.bvid) loadExtras(track) }, [track && track.bvid])
      const listRef = react.useRef(null)
      react.useLayoutEffect(() => {
        const shot = pendingFlip
        pendingFlip = null
        if (shot) playStageFlip(shot)
      }, [state.stageMode])
      const searching = state.mode === "results"
      const shelf = searching ? "search" : (state.shelf || "discover")
      const setShelf = (id) => player.patch({ shelf: id, mode: "queue" })
      const currentList = state.playlists.find((list) => list.id === state.listId)
      const rows = shelf === "search" ? state.results
        : shelf === "queue" ? state.queue
        : shelf === "related" ? state.related
        : shelf === "discover" ? []
        : shelf === "up" ? state.upItems
        : shelf === "list" ? ((currentList && currentList.tracks) || [])
        : []
      const note = searching ? state.note
        : shelf === "related" ? state.relatedNote
        : shelf === "comments" ? state.commentNote
        : shelf === "up" ? state.upNote
        : state.note
      const empty = searching ? t("none", "没有找到") : ""
      const queueAt = state.index
      const queueNow = shelf === "queue" && queueAt >= 0 ? state.queue[queueAt] : null
      const queueRest = shelf === "queue"
        ? (queueNow ? state.queue.filter((_, i) => i !== queueAt) : state.queue)
        : []
      react.useLayoutEffect(() => {
        const el = listRef.current
        if (!el) return
        let gone = false
        loadGsap().then(() => { if (!gone) enterShelf(el) }).catch(() => {})
        return () => { gone = true }
      }, [shelf, searching, rows.length, (state.discover || []).length, state.comments.length, state.rankRange, state.upTab, state.upSet && state.upSet.id, (state.upItems || []).length, (state.upSets || []).length, note])
      return jsx("div", {
        "data-bili-page": "",
        children: [
          jsx("aside", {
            "data-bili-lib": "",
            children: [
              jsx("form", {
                onSubmit: (event) => {
                  event.preventDefault()
                  if (createPlaylist(draft)) setDraft("")
                },
                children: jsx("input", {
                  value: draft,
                  placeholder: t("newList", "新建歌单"),
                  "aria-label": t("newList", "新建歌单"),
                  onChange: (event) => setDraft(event.target.value)
                })
              }),
              jsx("button", {
                type: "button",
                "data-bili-plist": "",
                "data-on": shelf === "rank" ? "" : undefined,
                "data-rank": "",
                onClick: openRank,
                onDoubleClick: playRank,
                children: [
                  jsx(Icon, { size: 18, d: ICONS.rank }),
                  jsx("div", { children: jsx("b", { children: t("rank", "听歌排行") }) })
                ]
              }),
              state.playlists.filter((list) => {
                if (list.id === "liked") return true
                const kind = listKind(list.id) || listKind(list.name)
                return kind !== "queue" && kind !== "rank" && kind !== "liked"
              }).map((list) => jsx("div", {
                "data-bili-plist-row": "",
                children: [
                  jsx("button", {
                    type: "button",
                    "data-bili-plist": "",
                    "data-on": shelf === "list" && state.listId === list.id ? "" : undefined,
                    "data-liked": list.id === "liked" ? "" : undefined,
                    onClick: () => openPlaylist(list.id),
                    onDoubleClick: () => playPlaylist(list.id),
                    children: [
                      list.id === "liked"
                        ? jsx(Icon, { size: 18, d: ICONS.heart })
                        : (list.tracks[0] && list.tracks[0].cover ? jsx("img", { src: imgSrc(list.tracks[0].cover), alt: "" }) : jsx("div", { "data-bili-ph": "" })),
                      jsx("div", { children: [
                        jsx("b", { children: list.name }),
                        jsx("span", { children: list.tracks.length + " 首" })
                      ] })
                    ]
                  }),
                  list.id !== "liked" ? jsx("button", {
                    type: "button",
                    "data-bili-plist-del": "",
                    "aria-label": t("deleteList", "删除歌单"),
                    title: t("deleteList", "删除歌单"),
                    onClick: (event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      deletePlaylist(list.id)
                    },
                    children: jsx(Icon, { size: 14, d: ICONS.close })
                  }) : null
                ]
              }, list.id)),
              (state.ups || []).length ? jsx("h3", { children: t("ups", "收藏的 UP") }) : null,
              (state.ups || []).map((up) => jsx("div", {
                "data-bili-plist-row": "",
                children: [
                  jsx("button", {
                    type: "button",
                    "data-bili-plist": "",
                    "data-up": "",
                    "data-on": shelf === "up" && Number(state.upMid) === Number(up.mid) ? "" : undefined,
                    onClick: () => openUp(up.mid, up.name),
                    children: [
                      jsx(Icon, { size: 18, d: ICONS.user }),
                      jsx("div", { children: jsx("b", { children: up.name || up.mid }) })
                    ]
                  }),
                  jsx("button", {
                    type: "button",
                    "data-bili-plist-del": "",
                    "aria-label": "取消收藏",
                    title: "取消收藏",
                    onClick: (event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      toggleFollow(up.mid, up.name)
                    },
                    children: jsx(Icon, { size: 14, d: ICONS.close })
                  })
                ]
              }, up.mid))
            ]
          }),
          jsx("aside", {
            "data-bili-stage": "",
            "data-mode": state.stageMode,
            children: (function () {
              const coverOn = state.stageMode === "cover"
              const marked = track && String(track.title || "").match(/[《「『]([^》」』]{1,40})[》」』]/)
              const headline = track ? (marked ? marked[1] : songName(track) || track.title) : "还没在听"
              const flip = () => { setAddMenu(false); toggleStage() }
              const lists = customLists()
              return [
                jsx("div", {
                  "data-bili-hero": "",
                  children: [
                    jsx("button", {
                      type: "button",
                      "data-bili-cover": "",
                      title: coverOn ? "查看歌词" : "查看封面",
                      onClick: flip,
                      children: track && track.cover
                        ? jsx("img", { src: imgSrc(track.cover), alt: "" })
                        : jsx(Disc, { size: 56 })
                    }),
                    jsx("div", {
                      "data-bili-bill": "",
                      children: [
                        jsx("div", {
                          "data-bili-meta": "",
                          children: [
                            jsx("div", { "data-bili-title": "", children: headline }),
                            track && track.owner
                              ? jsx("button", {
                                type: "button",
                                "data-bili-artist": "",
                                onClick: () => openUp(track.mid, track.owner),
                                children: track.owner
                              })
                              : null
                          ]
                        }, track && track.bvid),
                        track ? jsx("div", {
                          ref: actsRef,
                          "data-bili-acts": "",
                          children: [
                            jsx("button", {
                              type: "button",
                              "data-bili-heart": "",
                              "data-on": isLiked(track) ? "" : undefined,
                              "aria-label": isLiked(track) ? "取消喜欢" : "我喜欢",
                              title: isLiked(track) ? "取消喜欢" : "我喜欢",
                              onClick: () => toggleLike(track),
                              children: jsx(Icon, { size: 18, d: isLiked(track) ? ICONS.heart : ICONS.heartOff })
                            }),
                            jsx("button", {
                              type: "button",
                              "aria-label": "加入歌单",
                              title: "加入歌单",
                              "aria-expanded": addMenu ? "true" : "false",
                              onClick: () => setAddMenu(!addMenu),
                              children: jsx(Icon, { size: 18, d: ICONS.plus })
                            }),
                            addMenu ? jsx(PlaylistMenu, {
                              lists: lists,
                              onPick: (id) => {
                                addToPlaylist(id, track)
                                setAddMenu(false)
                              }
                            }) : null
                          ]
                        }) : null
                      ]
                    })
                  ]
                }, "hero"),
                jsx("div", {
                  "data-bili-lyricwrap": "",
                  inert: coverOn ? true : undefined,
                  children: jsx(Lyrics, {}, "lyrics")
                }, "lyrics"),
                jsx(Transport, {}, "ctrl")
              ]
            })()
          }),
          jsx("section", {
            "data-bili-shelf": "",
            children: [
              jsx("form", {
                "data-bili-search": "",
                onSubmit: (event) => {
                  event.preventDefault()
                  search(state.query)
                },
                children: jsx("input", {
                  type: "search",
                  value: state.query,
                  placeholder: t("hint", "搜歌曲、UP 或 BV 号"),
                  onChange: (event) => {
                    const q = event.target.value
                    if (!q.trim()) search("")
                    else player.patch({ query: q })
                  }
                })
              }),
              jsx("div", {
                "data-bili-chips": "",
                hidden: searching,
                children: state.chips.map((word) => chipEdit === word
                  ? jsx("form", {
                    onSubmit: (event) => {
                      event.preventDefault()
                      renameChip(word, chipEditDraft)
                      setChipEdit("")
                    },
                    children: jsx("input", {
                      autoFocus: true,
                      value: chipEditDraft,
                      "aria-label": "编辑关键词",
                      onChange: (event) => setChipEditDraft(event.target.value),
                      onBlur: (event) => {
                        if (event.target.dataset.skip) {
                          setChipEdit("")
                          return
                        }
                        renameChip(word, chipEditDraft)
                        setChipEdit("")
                      },
                      onKeyDown: (event) => {
                        if (event.key !== "Escape") return
                        event.preventDefault()
                        event.target.dataset.skip = "1"
                        setChipEdit("")
                      }
                    })
                  }, word)
                  : jsx("button", {
                    type: "button",
                    "data-on": state.chip === word ? "" : undefined,
                    title: "双击编辑",
                    onClick: () => {
                      clearTimeout(chipTap.current)
                      chipTap.current = setTimeout(() => search(word, word), 220)
                    },
                    onDoubleClick: (event) => {
                      event.preventDefault()
                      clearTimeout(chipTap.current)
                      setChipEdit(word)
                      setChipEditDraft(word)
                    },
                    children: [
                      word,
                      jsx("i", {
                        onClick: (event) => {
                          event.stopPropagation()
                          clearTimeout(chipTap.current)
                          removeChip(word)
                        },
                        children: "×"
                      })
                    ]
                  }, word)).concat(
                  chipAdd
                    ? jsx("form", {
                      onSubmit: (event) => {
                        event.preventDefault()
                        addChip(chipDraft)
                        setChipDraft("")
                        setChipAdd(false)
                      },
                      children: jsx("input", {
                        autoFocus: true,
                        value: chipDraft,
                        placeholder: "加个词",
                        onChange: (event) => setChipDraft(event.target.value),
                        onBlur: () => {
                          if (!chipDraft.trim()) setChipAdd(false)
                        }
                      })
                    })
                    : jsx("button", {
                      type: "button",
                      "data-plus": "",
                      "aria-label": "添加关键词",
                      title: "添加关键词",
                      onClick: () => setChipAdd(true),
                      children: jsx(Icon, { size: 14, d: ICONS.plus })
                    })
                )
              }),
              searching
                ? null
                : jsx("div", {
                  "data-bili-tabs": "",
                  children: [
                    jsx("button", { type: "button", "data-on": shelf === "discover" ? "" : undefined, onClick: () => setShelf("discover"), children: t("discover", "发现") }),
                    jsx("button", { type: "button", "data-on": shelf === "queue" ? "" : undefined, onClick: () => setShelf("queue"), children: t("queue", "播放列表") }),
                    jsx("button", { type: "button", "data-on": shelf === "related" ? "" : undefined, onClick: () => setShelf("related"), children: t("related", "相关推荐") }),
                    jsx("button", { type: "button", "data-on": shelf === "comments" ? "" : undefined, onClick: () => setShelf("comments"), children: t("comments", "评论") }),
                    shelf === "up" ? jsx("button", { type: "button", "data-on": "", children: state.upName || "UP" }) : null,
                    shelf === "list" && currentList ? jsx("button", { type: "button", "data-on": "", children: currentList.name }) : null,
                    shelf === "rank" ? jsx("button", { type: "button", "data-on": "", children: t("rank", "听歌排行") }) : null,
                    shelf === "queue" && state.queue.length ? jsx("button", { type: "button", "data-bili-clear": "", onClick: clearQueue, children: t("clear", "清空") }) : null,
                    shelf === "list" && currentList && currentList.tracks.length ? jsx("button", { type: "button", "data-bili-clear": "", onClick: () => playPlaylist(currentList.id), children: "播放全部" }) : null,
                    shelf === "list" && currentList && currentList.id !== "liked" ? jsx("button", { type: "button", "data-bili-clear": "", onClick: () => deletePlaylist(currentList.id), children: t("deleteList", "删除歌单") }) : null,
                    shelf === "rank" && rankRows(state.rankRange).length ? jsx("button", { type: "button", "data-bili-clear": "", onClick: playRank, children: "播放全部" }) : null
                  ]
                }),
              jsx("div", {
                ref: listRef,
                "data-bili-list": "",
                children: shelf === "up"
                  ? jsx(UpShelf, {})
                  : shelf === "discover"
                    ? jsx(DiscoverShelf, {})
                  : shelf === "rank"
                    ? jsx(RankShelf, {})
                  : note
                    ? jsx("div", { "data-bili-note": "", "data-err": /失败|挡住|找不到|没有/.test(note) ? "" : undefined, children: note })
                    : shelf === "comments"
                      ? (state.comments.length
                        ? jsx(react.Fragment, {
                          children: [
                            state.comments.map((item) => jsx(CommentRow, { item: item }, item.id)),
                            state.commentHasMore ? jsx("button", {
                              type: "button",
                              "data-bili-more": "",
                              onClick: loadMoreComments,
                              children: state.commentLoadingMore ? "正在加载更多评论" : "更多"
                            }) : null
                          ]
                        })
                        : (empty ? jsx("div", { "data-bili-note": "", children: empty }) : null))
                      : shelf === "queue"
                      ? (state.queue.length
                        ? jsx(react.Fragment, {
                          children: [
                            queueNow ? jsx(NowPlayingRow, {
                              item: queueNow,
                              onRemove: () => removeFromQueue(player.state.index)
                            }, "now:" + queueNow.bvid + ":" + (queueNow.cid || "")) : null,
                            queueRest.map((item, i) => jsx(QueueRow, {
                              item: item,
                              index: i,
                              track: track,
                              editable: true,
                              sortable: true,
                              onPlay: () => playItem(item),
                              onMove: queueNow ? moveUpcoming : moveInQueue,
                              onRemove: () => {
                                const cur = player.state.index
                                if (cur < 0) return removeFromQueue(i)
                                removeFromQueue(i < cur ? i : i + 1)
                              }
                            }, "up:" + item.bvid + ":" + (item.cid || i)))
                          ]
                        })
                        : (empty ? jsx("div", { "data-bili-note": "", children: empty }) : null))
                      : rows.length
                      ? jsx(react.Fragment, {
                        children: [
                          rows.map((item, i) => jsx(QueueRow, {
                            item: item,
                            index: i,
                            track: track,
                            editable: shelf === "list",
                            sortable: false,
                            onPlay: () => playItem(item),
                            onRemove: shelf === "list" ? (idx) => removeFromPlaylist(state.listId, idx) : undefined
                          }, item.bvid + ":" + (item.cid || i))),
                          searching && state.searchHasMore ? jsx("button", {
                            type: "button",
                            "data-bili-more": "",
                            onClick: loadMoreSearch,
                            children: state.searchLoadingMore ? "正在加载更多" : "更多"
                          }) : null
                        ]
                      })
                      : (empty ? jsx("div", { "data-bili-note": "", children: empty }) : null)
              })
            ]
          })
        ]
      })
    }

    exports.inject = ["slots", "locale", "layout"]
    exports.apply = (ctx) => {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), "bili-radio: locale")
      ctx.effect(() => {
        const style = document.createElement("style")
        style.textContent = css
        document.head.append(style)
        loadGsap().catch(() => {})
        return () => style.remove()
      }, "bili-radio: css")
      ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
        name: "sidebar.panellist",
        id: PANEL,
        order: 80,
        label: () => textOf(ctx.locale, "view.player", "bilibili电台"),
        locale: NS
      }, function BiliIcon(owner) {
        return jsx(MiniGlyph, { size: (owner && owner.size) || 16 })
      }))
      ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
        name: "sidebar.footer.action",
        id: PANEL,
        order: 80
      }, function BiliMini(owner) {
        return jsx(MiniPlayer, {
          wide: !!(owner && owner.wide),
          openPanel: () => { try { ctx.layout.selectPanel(PANEL) } catch {} }
        })
      }))
      ctx.slots.inject("main", () => ctx.slots.register({
        name: "main",
        key: PANEL,
        locale: NS
      }, function BiliMain() {
        return jsx(Page, { ctx: ctx })
      }))
      ctx.slots.inject("shell.overlay", () => ctx.slots.register({
        name: "shell.overlay",
        id: "dsh-bilibili-radio-audio",
        label: () => textOf(ctx.locale, "view.player", "bilibili电台")
      }, function BiliAudio() {
        const audioRef = react.useRef(null)
        react.useEffect(() => {
          if (audioRef.current) attachAudio(audioRef.current)
          let dead = false
          async function tick() {
            try {
              const data = await fetch(ORIGIN + "/api/cue").then((r) => r.json())
              if (dead || !data || !data.n || data.n === seenCue) return
              const ops = data.ops && data.ops.length ? data.ops : [data]
              for (let i = 0; i < ops.length; i++) {
                if (ops[i].n && ops[i].n <= seenCue) continue
                applyCue(ops[i])
              }
              seenCue = data.n
            } catch {}
          }
          const id = setInterval(tick, 800)
          tick()
          const onTrack = () => {
            const track = player.track()
            if (track && track.bvid) loadExtras(track)
          }
          const unsub = player.subscribe(() => { onTrack(); pushNow() })
          onTrack()
          pushNow()
          return () => { dead = true; clearInterval(id); unsub() }
        }, [])
        return jsx("audio", { ref: audioRef, preload: "none" })
      }))
      ctx.slots.inject("tool.call.toolview", () => {
        const radio = ctx.slots.register({
          name: "tool.call.toolview",
          key: "bilibili_radio"
        }, PlaySongCard)
        const music = ctx.slots.register({
          name: "tool.call.toolview",
          key: "bilibili_music"
        }, PlaySongCard)
        const play = ctx.slots.register({
          name: "tool.call.toolview",
          key: "play_song"
        }, PlaySongCard)
        const suggest = ctx.slots.register({
          name: "tool.call.toolview",
          key: "suggest_songs"
        }, PlaySongCard)
        return () => {
          if (typeof radio === "function") radio()
          if (typeof music === "function") music()
          if (typeof play === "function") play()
          if (typeof suggest === "function") suggest()
        }
      })
      ctx.inject(["uiConversation"], (inner) => {
        inner.uiConversation.events.register({
          kind: "bili-songs",
          target: "chat",
          match: (event) => {
            if (event.type !== "tool/result") return null
            const meta = event.data && event.data.meta
            const callId = event.data && event.data.message && event.data.message.source && event.data.message.source.callId
            if (!callId || !meta || meta.mode !== "suggest") return null
            return { id: String(callId), role: "start" }
          },
          start: (_context, match) => {
            const event = match.event
            if (event.type === "tool/call") return { name: event.data.name, callId: event.data.callId, meta: null, error: false }
            return {
              name: "",
              callId: event.data.message.source.callId,
              meta: event.data.meta || null,
              error: event.data.message && event.data.message.isError === true
            }
          },
          update: (context, match) => {
            if (match.event.type !== "tool/result") return context.state
            return {
              name: context.state.name,
              callId: context.state.callId,
              meta: match.event.data.meta || null,
              error: match.event.data.message && match.event.data.message.isError === true
            }
          },
          buildViewNode: (context) => {
            const state = context.state
            if (!state || !state.meta) return null
            const start = context.start
            const match0 = context.matches && context.matches[0]
            return {
              key: context.key,
              kind: "bili-songs",
              id: context.id,
              target: "chat",
              anchorSeq: (start && start.event && start.event.seq) || (match0 && match0.event && match0.event.seq) || 0,
              location: (start && start.location) || (match0 && match0.location) || { kind: "unresolved" },
              visibility: "visible",
              groupTree: "turn",
              data: state
            }
          }
        })
        inner.slots.inject("conversation.chat.node", () => inner.slots.register({
          name: "conversation.chat.node",
          key: "bili-songs"
        }, BiliSongsNode))
      })
    }

    return module.exports
  }
})
