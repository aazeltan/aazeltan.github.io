// src/components/NowPlaying.jsx
import React, { useEffect, useState, useRef } from 'react';
import querystring from 'querystring';
import { Buffer } from 'buffer';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { HiOutlineStatusOffline } from 'react-icons/hi';
import albumPlaceholder from '../assets/spotify/albumCover.png';
import soundbarGif from '../assets/spotify/soundbar.gif';
import './NowPlaying.css';

const NOW_PLAYING_EP     = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_EP = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const TOKEN_EP           = 'https://accounts.spotify.com/api/token';

const client_id     = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const res = await fetch(TOKEN_EP, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type:    'refresh_token',
      refresh_token
    })
  });
  return res.json();
}

async function fetchCurrentTrack() {
  const { access_token } = await getAccessToken();
  const headers = { Authorization: `Bearer ${access_token}` };

  let res = await fetch(NOW_PLAYING_EP, { headers });
  if (res.status === 204) {
    const rec = await fetch(RECENTLY_PLAYED_EP, { headers });
    if (!rec.ok) throw new Error();
    const { items } = await rec.json();
    if (!items.length) throw new Error();
    res = {
      json: async () => ({
        item:        items[0].track,
        is_playing:  false,
        progress_ms: 0
      })
    };
  } else if (res.status > 400) {
    throw new Error();
  }

  const data = await res.json();
  const t    = data.item;
  return {
    title:         t.name,
    artist:        t.artists.map(a => a.name).join(', '),
    albumImageUrl: t.album.images[0].url,
    songUrl:       t.external_urls.spotify,
    artistUrl:     t.artists[0].external_urls.spotify,
    isPlaying:     data.is_playing,
    timePlayed:    data.progress_ms,
    timeTotal:     t.duration_ms
  };
}

export default function NowPlaying() {
  const [lastSong, setLastSong]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('lastSong')); }
    catch { return null; }
  });
  const [nowPlaying, setNowPlaying]   = useState(null);
  const titleContainerRef = useRef(null);
  const titleSpanRef      = useRef(null);
  const [scrollDiff, setScrollDiff]   = useState(0);

  useEffect(() => {
    async function tick() {
      try {
        const track = await fetchCurrentTrack();
        setNowPlaying(track);
        setLastSong(track);
        localStorage.setItem('lastSong', JSON.stringify(track));
      } catch {
        setNowPlaying(null);
      }
    }
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const track = nowPlaying || lastSong || {
    title: 'Failed to',
    artist: 'fetch song',
    albumImageUrl: albumPlaceholder,
    isPlaying: false,
    timePlayed: 0,
    timeTotal: 0
  };
  const isOffline = !nowPlaying && !!lastSong;

  useEffect(() => {
    if (titleContainerRef.current && titleSpanRef.current) {
      const cw = titleContainerRef.current.clientWidth;
      const sw = titleSpanRef.current.scrollWidth;
      setScrollDiff(Math.max(0, sw - cw));
    }
  }, [track.title]);

  const shouldScroll = scrollDiff > 0;
  
  const pad = n => (n < 10 ? '0'+n : n);
  const sp = Math.floor(track.timePlayed/1000);
  const sm = Math.floor(sp/60), ss = sp % 60;
  const tp = Math.floor(track.timeTotal/1000);
  const tm = Math.floor(tp/60), ts = tp % 60;
  const played = `${pad(sm)}:${pad(ss)}`;
  const total  = `${pad(tm)}:${pad(ts)}`;

  return (
    <a className="nowPlayingCard"
       href={track.songUrl || undefined}
       target="_blank"
       rel="noopener noreferrer">

      <div className="nowPlayingImage">
        <img src={track.albumImageUrl} alt="Album art" />
      </div>

      <div id="nowPlayingDetails">
        {isOffline && <div className="offlineNote">Last listened:</div>}

        <div className="nowPlayingTitle" ref={titleContainerRef}>
          <span
            ref={titleSpanRef}
            className={shouldScroll ? 'marquee-content' : 'static-title'}
            style={shouldScroll ? { '--scroll-diff': `${scrollDiff}px` } : {}}
          >{track.title}</span>
        </div>

        <div className="nowPlayingArtist">
          {track.artistUrl ? (
            <a href={track.artistUrl} target="_blank" rel="noopener noreferrer">
              {track.artist}
            </a>
          ) : track.artist}
        </div>
        <div className="nowPlayingTime">{played} / {total}</div>
      </div>

      <div className="nowPlayingState">
        {nowPlaying && track.isPlaying ? (
          <img src={soundbarGif} alt="Now Listening" />
        ) : nowPlaying ? (
          <AiOutlinePauseCircle size={32} />
        ) : isOffline ? (
          <HiOutlineStatusOffline size={32} />
        ) : (
          <BiErrorCircle size={32} />
        )}
      </div>
    </a>
  );
}

